precision highp float;

uniform float hsbMix;
varying vec2 vUv;
varying vec3 vColor;

// HSB -> RGB
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
	vec3 rgb = vColor;
	vec3 hsb = hsb2rgb(rgb);
	vec3 texel = mix(rgb, hsb, hsbMix);
	gl_FragColor = vec4(texel, 1.0);
}
