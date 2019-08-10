precision highp float;

uniform float time;
varying vec2 vUv;
varying vec3 vColor;

void main() {
	vec4 texel = vec4(vColor, 1.0);
	gl_FragColor = texel;
}
