#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scale;
uniform float u_noise_scale;
uniform float u_threshold;
uniform int u_mode;
uniform vec2 u_mouse;
uniform float u_mouse_active;
uniform float u_mouse_falloff;
uniform float u_mouse_scale_boost;
uniform float u_mouse_noise_boost;
uniform float u_indicator_fill;
uniform float u_indicator_ring;
uniform float u_indicator_alpha;

out vec4 outColor;

vec4 fade4(vec4 t) {
	return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float hash41(vec4 p) {
	return fract(sin(dot(p, vec4(127.1, 311.7, 74.7, 269.5))) * 43758.5453123);
}

vec4 gradient4(vec4 p) {
	vec4 g = vec4(
		hash41(p + vec4(0.0, 0.0, 0.0, 0.0)),
		hash41(p + vec4(19.1, 0.0, 0.0, 0.0)),
		hash41(p + vec4(0.0, 47.2, 0.0, 0.0)),
		hash41(p + vec4(0.0, 0.0, 83.3, 0.0))
	);

	return normalize(g * 2.0 - 1.0);
}

float gradientDot(vec4 lattice, vec4 offset) {
	return dot(gradient4(lattice), offset);
}

float perlin4d(vec4 p) {
	vec4 cell = floor(p);
	vec4 local = fract(p);
	vec4 blend = fade4(local);

	float n0000 = gradientDot(cell + vec4(0.0, 0.0, 0.0, 0.0), local - vec4(0.0, 0.0, 0.0, 0.0));
	float n1000 = gradientDot(cell + vec4(1.0, 0.0, 0.0, 0.0), local - vec4(1.0, 0.0, 0.0, 0.0));
	float n0100 = gradientDot(cell + vec4(0.0, 1.0, 0.0, 0.0), local - vec4(0.0, 1.0, 0.0, 0.0));
	float n1100 = gradientDot(cell + vec4(1.0, 1.0, 0.0, 0.0), local - vec4(1.0, 1.0, 0.0, 0.0));
	float n0010 = gradientDot(cell + vec4(0.0, 0.0, 1.0, 0.0), local - vec4(0.0, 0.0, 1.0, 0.0));
	float n1010 = gradientDot(cell + vec4(1.0, 0.0, 1.0, 0.0), local - vec4(1.0, 0.0, 1.0, 0.0));
	float n0110 = gradientDot(cell + vec4(0.0, 1.0, 1.0, 0.0), local - vec4(0.0, 1.0, 1.0, 0.0));
	float n1110 = gradientDot(cell + vec4(1.0, 1.0, 1.0, 0.0), local - vec4(1.0, 1.0, 1.0, 0.0));
	float n0001 = gradientDot(cell + vec4(0.0, 0.0, 0.0, 1.0), local - vec4(0.0, 0.0, 0.0, 1.0));
	float n1001 = gradientDot(cell + vec4(1.0, 0.0, 0.0, 1.0), local - vec4(1.0, 0.0, 0.0, 1.0));
	float n0101 = gradientDot(cell + vec4(0.0, 1.0, 0.0, 1.0), local - vec4(0.0, 1.0, 0.0, 1.0));
	float n1101 = gradientDot(cell + vec4(1.0, 1.0, 0.0, 1.0), local - vec4(1.0, 1.0, 0.0, 1.0));
	float n0011 = gradientDot(cell + vec4(0.0, 0.0, 1.0, 1.0), local - vec4(0.0, 0.0, 1.0, 1.0));
	float n1011 = gradientDot(cell + vec4(1.0, 0.0, 1.0, 1.0), local - vec4(1.0, 0.0, 1.0, 1.0));
	float n0111 = gradientDot(cell + vec4(0.0, 1.0, 1.0, 1.0), local - vec4(0.0, 1.0, 1.0, 1.0));
	float n1111 = gradientDot(cell + vec4(1.0, 1.0, 1.0, 1.0), local - vec4(1.0, 1.0, 1.0, 1.0));

	float nx00 = mix(n0000, n1000, blend.x);
	float nx10 = mix(n0100, n1100, blend.x);
	float nx01 = mix(n0010, n1010, blend.x);
	float nx11 = mix(n0110, n1110, blend.x);
	float nxy0 = mix(nx00, nx10, blend.y);
	float nxy1 = mix(nx01, nx11, blend.y);
	float nxyz0 = mix(nxy0, nxy1, blend.z);

	float mx00 = mix(n0001, n1001, blend.x);
	float mx10 = mix(n0101, n1101, blend.x);
	float mx01 = mix(n0011, n1011, blend.x);
	float mx11 = mix(n0111, n1111, blend.x);
	float mxy0 = mix(mx00, mx10, blend.y);
	float mxy1 = mix(mx01, mx11, blend.y);
	float nxyz1 = mix(mxy0, mxy1, blend.z);

	return clamp(mix(nxyz0, nxyz1, blend.w) * 0.5 + 0.5, 0.0, 1.0);
}

float fbm4(vec4 p) {
	float value = 0.0;
	float amplitude = 0.5;
	float weight = 0.0;

	for (int octave = 0; octave < 2; octave++) {
		value += perlin4d(p) * amplitude;
		weight += amplitude;
		p *= 2.0;
		amplitude *= 0.5;
	}

	return value / weight;
}

vec3 random3(vec3 p) {
	return fract(
		sin(
			vec3(
				dot(p, vec3(127.1, 311.7, 74.7)),
				dot(p, vec3(269.5, 183.3, 246.1)),
				dot(p, vec3(113.5, 271.9, 124.6))
			)
		) * 43758.5453123
	);
}

vec2 voronoi3(vec3 p) {
	vec3 cell = floor(p);
	vec3 local = fract(p);

	float f1 = 8.0;
	float f2 = 8.0;

	for (int z = -1; z <= 1; z++) {
		for (int y = -1; y <= 1; y++) {
			for (int x = -1; x <= 1; x++) {
				vec3 neighbor = vec3(float(x), float(y), float(z));
				vec3 feature = random3(cell + neighbor);
				vec3 delta = neighbor + feature - local;
				float distSq = dot(delta, delta);

				if (distSq < f1) {
					f2 = f1;
					f1 = distSq;
				} else if (distSq < f2) {
					f2 = distSq;
				}
			}
		}
	}

	return sqrt(vec2(f1, f2));
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution;
	vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

	float mouseDist = length(aspectUv - u_mouse);
	float mouseInfluence = u_mouse_active * exp(-mouseDist * mouseDist * u_mouse_falloff);
	float localNoiseScale = u_noise_scale * mix(1.0, u_mouse_noise_boost, mouseInfluence);
	float localScale = u_scale * mix(1.0, u_mouse_scale_boost, mouseInfluence);

	float noiseFactor = fbm4(vec4(aspectUv * localNoiseScale, 0.0, u_time * 0.08));
	vec3 voronoiInput = vec3(noiseFactor) * localScale;
	vec2 distances = voronoi3(voronoiInput);
	float value;

	if (u_mode == 0) {
		value = distances.x;
	} else if (u_mode == 1) {
		value = distances.y;
	} else if (u_mode == 2) {
		value = distances.y - distances.x;
	} else {
		value = 1.0 - distances.x;
	}

	value = clamp(value, 0.0, 1.0);
	float edgeWidth = max(fwidth(value) * 0.5, 0.0005);
	value = smoothstep(u_threshold - edgeWidth, u_threshold + edgeWidth, value);
	float inverted = 1.0 - value;

	// Cursor influence indicator — soft fill + bright ring at falloff boundary
	float influenceRadius = sqrt(2.0 / u_mouse_falloff);
	float ringThickness = max(fwidth(mouseDist) * 3.0, 0.006);
	float ring = u_mouse_active
		* (1.0 - smoothstep(0.0, ringThickness, abs(mouseDist - influenceRadius)))
		* u_indicator_ring;
	float fill = u_mouse_active * mouseInfluence * u_indicator_fill;
	float indicator = clamp(fill + ring, 0.0, 1.0);
	vec3 indicatorRgb = vec3(0.71, 1, 0.08); // rgb(180, 255, 20)

	vec3 voronoiRgb = vec3(inverted * 0.1);
	float voronoiAlpha = inverted;
	vec3 rgb = mix(voronoiRgb, indicatorRgb, indicator);
	float alpha = max(voronoiAlpha, indicator * u_indicator_alpha);
	outColor = vec4(rgb, alpha);
}
