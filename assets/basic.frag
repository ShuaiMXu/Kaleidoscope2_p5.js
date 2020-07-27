#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 iResolution;
uniform float iTime;

uniform float noise1;
uniform float noise2;
uniform vec2 iMouse;


const vec2 u_center = vec2(0.5, 0.5);
const float u_brightness = .5;
const float u_detailAngles = 2.0;
const float u_detailLayers = 10.0;
const float u_speed = 0.1;
const float u_colorContrast = 0.5;
const float u_turbulence = 3.14;

void main() {
	vec3 c;
	float l;
	float z = iTime;
	float brightness = u_brightness / noise1;
	float detailAngles = u_detailAngles / 2.0;

	for(int i=0;i<3;i++) {
		vec2 uv = gl_FragCoord.xy / iResolution.xy;
		vec2 p = uv;
		p.x -= u_center.x;
		p.y -= u_center.y;
		p.x *= iResolution.x / iResolution.y;

		z += (1.0 / 3.0) * u_colorContrast;

		l = length(p);
		l*=l;
		uv += p / l * (cos(z + ((u_center - p) + u_turbulence)) + detailAngles) * abs(cos(l * u_detailLayers - z * u_speed));
		c[i] = brightness / length(abs(mod(uv,1.0)-.5));
	}

	gl_FragColor = vec4(c * .5/l, iTime);
	}
