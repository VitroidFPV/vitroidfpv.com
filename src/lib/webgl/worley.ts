import { createProgram } from "./gl"
import vertexShader from "./shaders/fullscreen.vert.glsl?raw"
import fragmentShader from "./shaders/worley.frag.glsl?raw"

export type WorleyMode = "f1" | "f2" | "cellular" | "inverted"

const MODE_TO_UNIFORM: Record<WorleyMode, number> = {
	f1: 0,
	f2: 1,
	cellular: 2,
	inverted: 3
}

export type WorleyOptions = {
	scale?: number
	noiseScale?: number
	threshold?: number
	speed?: number
	mode?: WorleyMode
	enabled?: boolean
	pixelRatioCap?: number
	mouseFalloff?: number
	mouseScaleBoost?: number
	mouseNoiseBoost?: number
	indicatorFill?: number
	indicatorRing?: number
	indicatorAlpha?: number
	lightBackground?: boolean
	onFrame?: (stats: FrameStats) => void
}

export type MouseState = {
	/** Aspect-corrected x in the same space as the shader's aspectUv */
	x: number
	/** y in [-0.5, 0.5] with WebGL's bottom-up orientation */
	y: number
	active: boolean
}

export type FrameStats = {
	/** Milliseconds since the previous frame */
	frameTime: number
	/** Exponentially smoothed frames per second */
	fps: number
	/** Milliseconds spent issuing the draw call on the CPU */
	drawTime: number
	/** GPU draw duration in milliseconds, when timer queries are available */
	gpuTime?: number
	/** Device pixel ratio used for the render target */
	pixelRatio: number
	/** Current render target width */
	width: number
	/** Current render target height */
	height: number
}

export type WorleyMetricSummary = {
	samples: number
	gpuSamples: number
	averageFrameTime: number | null
	p95FrameTime: number | null
	worstFrameTime: number | null
	averageFps: number | null
	averageDrawTime: number | null
	p95DrawTime: number | null
	averageGpuTime: number | null
	p95GpuTime: number | null
	pixelRatio: number | null
	width: number | null
	height: number | null
}

type WorleyMetricStore = {
	frames: FrameStats[]
	reset: () => void
	summary: () => WorleyMetricSummary
}

type TimerQueryExtension = {
	TIME_ELAPSED_EXT: number
	GPU_DISJOINT_EXT: number
}

declare global {
	interface Window {
		__worleyMetrics?: WorleyMetricStore
	}
}

const MAX_METRIC_FRAMES = 3600
const METRIC_SUMMARY_INTERVAL = 15

function average(values: number[]) {
	if (values.length === 0) return null
	return values.reduce((total, value) => total + value, 0) / values.length
}

function percentile(values: number[], p: number) {
	if (values.length === 0) return null
	const sorted = [...values].sort((a, b) => a - b)
	const index = Math.min(
		sorted.length - 1,
		Math.max(0, Math.ceil(sorted.length * p) - 1)
	)
	return sorted[index]
}

function shouldCollectMetrics() {
	return (
		typeof window !== "undefined" &&
		new URLSearchParams(window.location.search).has("worley-metrics")
	)
}

function metricsEnabled() {
	return shouldCollectMetrics() || window.__worleyMetrics !== undefined
}

function getMetricStore() {
	window.__worleyMetrics ??= {
		frames: [],
		reset() {
			this.frames = []
		},
		summary() {
			const frames = this.frames.filter((frame) => frame.frameTime > 0)
			const frameTimes = frames.map((frame) => frame.frameTime)
			const drawTimes = frames.map((frame) => frame.drawTime)
			const gpuTimes = frames
				.map((frame) => frame.gpuTime)
				.filter((time): time is number => time !== undefined)
			const latestFrame = frames[frames.length - 1]

			return {
				samples: frames.length,
				gpuSamples: gpuTimes.length,
				averageFrameTime: average(frameTimes),
				p95FrameTime: percentile(frameTimes, 0.95),
				worstFrameTime: frameTimes.length ? Math.max(...frameTimes) : null,
				averageFps: average(frames.map((frame) => frame.fps)),
				averageDrawTime: average(drawTimes),
				p95DrawTime: percentile(drawTimes, 0.95),
				averageGpuTime: average(gpuTimes),
				p95GpuTime: percentile(gpuTimes, 0.95),
				pixelRatio: latestFrame?.pixelRatio ?? null,
				width: latestFrame?.width ?? null,
				height: latestFrame?.height ?? null
			}
		}
	}

	return window.__worleyMetrics
}

function recordMetrics(stats: FrameStats) {
	const metrics = getMetricStore()
	metrics.frames.push({ ...stats })

	if (metrics.frames.length > MAX_METRIC_FRAMES) {
		metrics.frames.splice(0, metrics.frames.length - MAX_METRIC_FRAMES)
	}

	if (metrics.frames.length % METRIC_SUMMARY_INTERVAL === 0) {
		document.documentElement.dataset.worleyMetrics = JSON.stringify(
			metrics.summary()
		)
	}
}

export class WorleyRenderer {
	private gl: WebGL2RenderingContext
	private program: WebGLProgram
	private vao: WebGLVertexArrayObject
	private timerQueryExtension: TimerQueryExtension | null = null
	private pendingTimerQueries: WebGLQuery[] = []
	private latestGpuTime: number | undefined
	private collectMetrics = shouldCollectMetrics()
	private uniforms: {
		resolution: WebGLUniformLocation
		time: WebGLUniformLocation
		scale: WebGLUniformLocation
		noiseScale: WebGLUniformLocation
		threshold: WebGLUniformLocation
		mode: WebGLUniformLocation
		mouse: WebGLUniformLocation
		mouseActive: WebGLUniformLocation
		mouseFalloff: WebGLUniformLocation
		mouseScaleBoost: WebGLUniformLocation
		mouseNoiseBoost: WebGLUniformLocation
		indicatorFill: WebGLUniformLocation
		indicatorRing: WebGLUniformLocation
		indicatorAlpha: WebGLUniformLocation
		lightBackground: WebGLUniformLocation
	}
	private animationId = 0
	private running = false
	private startTime = performance.now()
	private pixelRatio = 1
	private pixelRatioCap = 2
	private scale = 86.9
	private noiseScale = 0.8
	private threshold = 0.214
	private speed = 0
	private mode: WorleyMode = "f1"
	private mouseX = 0
	private mouseY = 0
	private mouseActive = 0
	private targetMouseX = 0
	private targetMouseY = 0
	private targetMouseActive = 0
	private mouseFalloff = 5
	private mouseScaleBoost = 2.8
	private mouseNoiseBoost = 1.4
	private indicatorFill = 0.35
	private indicatorRing = 1
	private indicatorAlpha = 0.92
	private lightBackground = false
	private onFrame?: (stats: FrameStats) => void
	private lastFrameTime = 0
	private smoothedFps = 0

	constructor(private canvas: HTMLCanvasElement) {
		const gl = canvas.getContext("webgl2", {
			antialias: false,
			alpha: true,
			premultipliedAlpha: false
		})
		if (!gl) throw new Error("WebGL2 is not supported")

		this.gl = gl
		this.timerQueryExtension = gl.getExtension(
			"EXT_disjoint_timer_query_webgl2"
		) as TimerQueryExtension | null
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
		this.program = createProgram(gl, vertexShader, fragmentShader)

		const resolution = gl.getUniformLocation(this.program, "u_resolution")
		const time = gl.getUniformLocation(this.program, "u_time")
		const scale = gl.getUniformLocation(this.program, "u_scale")
		const noiseScale = gl.getUniformLocation(this.program, "u_noise_scale")
		const threshold = gl.getUniformLocation(this.program, "u_threshold")
		const mode = gl.getUniformLocation(this.program, "u_mode")
		const mouse = gl.getUniformLocation(this.program, "u_mouse")
		const mouseActive = gl.getUniformLocation(this.program, "u_mouse_active")
		const mouseFalloff = gl.getUniformLocation(this.program, "u_mouse_falloff")
		const mouseScaleBoost = gl.getUniformLocation(
			this.program,
			"u_mouse_scale_boost"
		)
		const mouseNoiseBoost = gl.getUniformLocation(
			this.program,
			"u_mouse_noise_boost"
		)
		const indicatorFill = gl.getUniformLocation(
			this.program,
			"u_indicator_fill"
		)
		const indicatorRing = gl.getUniformLocation(
			this.program,
			"u_indicator_ring"
		)
		const indicatorAlpha = gl.getUniformLocation(
			this.program,
			"u_indicator_alpha"
		)
		const lightBackground = gl.getUniformLocation(
			this.program,
			"u_light_background"
		)

		if (
			!resolution ||
			!time ||
			!scale ||
			!noiseScale ||
			!threshold ||
			!mode ||
			!mouse ||
			!mouseActive ||
			!mouseFalloff ||
			!mouseScaleBoost ||
			!mouseNoiseBoost ||
			!indicatorFill ||
			!indicatorRing ||
			!indicatorAlpha ||
			!lightBackground
		) {
			throw new Error("Missing shader uniforms")
		}

		this.uniforms = {
			resolution,
			time,
			scale,
			noiseScale,
			threshold,
			mode,
			mouse,
			mouseActive,
			mouseFalloff,
			mouseScaleBoost,
			mouseNoiseBoost,
			indicatorFill,
			indicatorRing,
			indicatorAlpha,
			lightBackground
		}

		const vao = gl.createVertexArray()
		const buffer = gl.createBuffer()
		if (!vao || !buffer) throw new Error("Failed to create WebGL buffers")

		gl.bindVertexArray(vao)
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW
		)

		const position = gl.getAttribLocation(this.program, "a_position")
		gl.enableVertexAttribArray(position)
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
		gl.bindVertexArray(null)

		this.vao = vao
	}

	private pollGpuTimers() {
		const { gl, timerQueryExtension } = this
		if (!timerQueryExtension) return

		const disjoint = gl.getParameter(timerQueryExtension.GPU_DISJOINT_EXT) as
			boolean | number

		while (this.pendingTimerQueries.length > 0) {
			const query = this.pendingTimerQueries[0]
			const available = gl.getQueryParameter(
				query,
				gl.QUERY_RESULT_AVAILABLE
			) as boolean

			if (!available) return

			this.pendingTimerQueries.shift()

			if (!disjoint) {
				const elapsedNs = gl.getQueryParameter(query, gl.QUERY_RESULT) as number
				this.latestGpuTime = elapsedNs / 1_000_000
			}

			gl.deleteQuery(query)
		}
	}

	private beginGpuTimer() {
		const { gl, timerQueryExtension } = this
		if (!timerQueryExtension || this.pendingTimerQueries.length > 8) return null

		const query = gl.createQuery()
		if (!query) return null

		gl.beginQuery(timerQueryExtension.TIME_ELAPSED_EXT, query)
		return query
	}

	private endGpuTimer(query: WebGLQuery | null) {
		const { gl, timerQueryExtension } = this
		if (!timerQueryExtension || !query) return

		gl.endQuery(timerQueryExtension.TIME_ELAPSED_EXT)
		this.pendingTimerQueries.push(query)
	}

	setOptions({
		scale,
		noiseScale,
		threshold,
		speed,
		mode,
		enabled,
		pixelRatioCap,
		mouseFalloff,
		mouseScaleBoost,
		mouseNoiseBoost,
		indicatorFill,
		indicatorRing,
		indicatorAlpha,
		lightBackground,
		onFrame
	}: WorleyOptions) {
		if (scale !== undefined) this.scale = scale
		if (noiseScale !== undefined) this.noiseScale = noiseScale
		if (threshold !== undefined) this.threshold = threshold
		if (speed !== undefined) this.speed = speed
		if (mode !== undefined) this.mode = mode
		if (pixelRatioCap !== undefined) {
			this.pixelRatioCap = Math.max(0.5, pixelRatioCap)
		}
		if (mouseFalloff !== undefined) this.mouseFalloff = mouseFalloff
		if (mouseScaleBoost !== undefined) this.mouseScaleBoost = mouseScaleBoost
		if (mouseNoiseBoost !== undefined) this.mouseNoiseBoost = mouseNoiseBoost
		if (indicatorFill !== undefined) this.indicatorFill = indicatorFill
		if (indicatorRing !== undefined) this.indicatorRing = indicatorRing
		if (indicatorAlpha !== undefined) this.indicatorAlpha = indicatorAlpha
		if (lightBackground !== undefined) this.lightBackground = lightBackground
		if (onFrame !== undefined) this.onFrame = onFrame
		if (enabled !== undefined) this.setEnabled(enabled)
	}

	set options(options: WorleyOptions) {
		this.setOptions(options)
	}

	setEnabled(enabled: boolean) {
		if (enabled) {
			this.start()
		} else {
			this.stop()
		}
	}

	setMouse(mouse: MouseState) {
		this.targetMouseX = mouse.x
		this.targetMouseY = mouse.y
		this.targetMouseActive = mouse.active ? 1 : 0
	}

	resize() {
		const { clientWidth, clientHeight } = this.canvas
		if (clientWidth === 0 || clientHeight === 0) return

		const dpr = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap)
		const width = Math.floor(clientWidth * dpr)
		const height = Math.floor(clientHeight * dpr)
		this.pixelRatio = dpr

		if (this.canvas.width !== width || this.canvas.height !== height) {
			this.canvas.width = width
			this.canvas.height = height
		}
	}

	private draw() {
		const { gl } = this
		this.pollGpuTimers()
		const drawStart = performance.now()
		const timerQuery = this.beginGpuTimer()
		const elapsed = ((performance.now() - this.startTime) / 1000) * this.speed
		const mouseLerp = this.targetMouseActive > 0 ? 0.18 : 0.08

		this.mouseX += (this.targetMouseX - this.mouseX) * mouseLerp
		this.mouseY += (this.targetMouseY - this.mouseY) * mouseLerp
		this.mouseActive += (this.targetMouseActive - this.mouseActive) * 0.28

		gl.viewport(0, 0, this.canvas.width, this.canvas.height)
		gl.clearColor(0, 0, 0, 0)
		gl.clear(gl.COLOR_BUFFER_BIT)
		gl.useProgram(this.program)
		gl.bindVertexArray(this.vao)

		gl.uniform2f(
			this.uniforms.resolution,
			this.canvas.width,
			this.canvas.height
		)
		gl.uniform1f(this.uniforms.time, elapsed)
		gl.uniform1f(this.uniforms.scale, this.scale)
		gl.uniform1f(this.uniforms.noiseScale, this.noiseScale)
		gl.uniform1f(this.uniforms.threshold, this.threshold)
		gl.uniform1i(this.uniforms.mode, MODE_TO_UNIFORM[this.mode])
		gl.uniform2f(this.uniforms.mouse, this.mouseX, this.mouseY)
		gl.uniform1f(this.uniforms.mouseActive, this.mouseActive)
		gl.uniform1f(this.uniforms.mouseFalloff, this.mouseFalloff)
		gl.uniform1f(this.uniforms.mouseScaleBoost, this.mouseScaleBoost)
		gl.uniform1f(this.uniforms.mouseNoiseBoost, this.mouseNoiseBoost)
		gl.uniform1f(this.uniforms.indicatorFill, this.indicatorFill)
		gl.uniform1f(this.uniforms.indicatorRing, this.indicatorRing)
		gl.uniform1f(this.uniforms.indicatorAlpha, this.indicatorAlpha)
		gl.uniform1f(this.uniforms.lightBackground, this.lightBackground ? 1 : 0)

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
		this.endGpuTimer(timerQuery)

		return performance.now() - drawStart
	}

	start() {
		if (this.running) return
		this.running = true
		this.lastFrameTime = 0
		this.smoothedFps = 0
		this.startTime = performance.now()

		const loop = (now: DOMHighResTimeStamp) => {
			if (!this.running) return

			const frameTime = this.lastFrameTime > 0 ? now - this.lastFrameTime : 0
			this.lastFrameTime = now

			if (frameTime > 0) {
				const instantFps = 1000 / frameTime
				this.smoothedFps =
					this.smoothedFps === 0
						? instantFps
						: this.smoothedFps * 0.9 + instantFps * 0.1
			}

			this.resize()
			const drawTime = this.draw()
			const stats = {
				frameTime,
				fps: this.smoothedFps,
				drawTime,
				gpuTime: this.latestGpuTime,
				pixelRatio: this.pixelRatio,
				width: this.canvas.width,
				height: this.canvas.height
			}

			this.onFrame?.(stats)
			if (this.collectMetrics || metricsEnabled()) recordMetrics(stats)

			this.animationId = requestAnimationFrame(loop)
		}

		this.animationId = requestAnimationFrame(loop)
	}

	stop() {
		if (!this.running) return
		this.running = false
		cancelAnimationFrame(this.animationId)
		this.animationId = 0
		this.lastFrameTime = 0
		this.smoothedFps = 0
	}

	destroy() {
		this.stop()
		const { gl } = this
		for (const query of this.pendingTimerQueries) {
			gl.deleteQuery(query)
		}
		this.pendingTimerQueries = []
		gl.deleteProgram(this.program)
		gl.deleteVertexArray(this.vao)
	}
}
