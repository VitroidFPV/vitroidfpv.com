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
}

export class WorleyRenderer {
	private gl: WebGL2RenderingContext
	private program: WebGLProgram
	private vao: WebGLVertexArrayObject
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
	private startTime = performance.now()
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
		const mouseScaleBoost = gl.getUniformLocation(this.program, "u_mouse_scale_boost")
		const mouseNoiseBoost = gl.getUniformLocation(this.program, "u_mouse_noise_boost")
		const indicatorFill = gl.getUniformLocation(this.program, "u_indicator_fill")
		const indicatorRing = gl.getUniformLocation(this.program, "u_indicator_ring")
		const indicatorAlpha = gl.getUniformLocation(this.program, "u_indicator_alpha")
		const lightBackground = gl.getUniformLocation(this.program, "u_light_background")

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

	setOptions({
		scale,
		noiseScale,
		threshold,
		speed,
		mode,
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
		if (mouseFalloff !== undefined) this.mouseFalloff = mouseFalloff
		if (mouseScaleBoost !== undefined) this.mouseScaleBoost = mouseScaleBoost
		if (mouseNoiseBoost !== undefined) this.mouseNoiseBoost = mouseNoiseBoost
		if (indicatorFill !== undefined) this.indicatorFill = indicatorFill
		if (indicatorRing !== undefined) this.indicatorRing = indicatorRing
		if (indicatorAlpha !== undefined) this.indicatorAlpha = indicatorAlpha
		if (lightBackground !== undefined) this.lightBackground = lightBackground
		if (onFrame !== undefined) this.onFrame = onFrame
	}

	setMouse(mouse: MouseState) {
		this.targetMouseX = mouse.x
		this.targetMouseY = mouse.y
		this.targetMouseActive = mouse.active ? 1 : 0
	}

	resize() {
		const { clientWidth, clientHeight } = this.canvas
		if (clientWidth === 0 || clientHeight === 0) return

		const dpr = Math.min(window.devicePixelRatio || 1, 2)
		const width = Math.floor(clientWidth * dpr)
		const height = Math.floor(clientHeight * dpr)

		if (this.canvas.width !== width || this.canvas.height !== height) {
			this.canvas.width = width
			this.canvas.height = height
		}
	}

	private draw() {
		const { gl } = this
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

		gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height)
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
	}

	start() {
		const loop = (now: DOMHighResTimeStamp) => {
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
			this.draw()
			this.onFrame?.({ frameTime, fps: this.smoothedFps })

			this.animationId = requestAnimationFrame(loop)
		}

		this.lastFrameTime = 0
		this.smoothedFps = 0
		this.animationId = requestAnimationFrame(loop)
	}

	stop() {
		cancelAnimationFrame(this.animationId)
	}

	destroy() {
		this.stop()
		const { gl } = this
		gl.deleteProgram(this.program)
		gl.deleteVertexArray(this.vao)
	}
}
