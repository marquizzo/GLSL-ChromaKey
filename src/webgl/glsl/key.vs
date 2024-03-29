precision highp float;

attribute vec3 position;
attribute vec3 offset;
attribute vec3 color;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;
varying vec3 vColor;

void main() {
	vUv = uv;
	vColor = color;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position + offset, 1.0 );
}