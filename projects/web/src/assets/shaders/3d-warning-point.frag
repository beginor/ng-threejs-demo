precision highp float;
uniform float u_current_time;
varying vec2 v_offset;

const float PI = 3.14159;
const float N_RINGS = 3.0;
const vec3 COLOR = vec3(0.23, 0.43, 0.70);
const float FREQ = 1.0;

void main() {
    float l = length(v_offset);
    float intensity = clamp(cos(l * PI), 0.0, 1.0) * clamp(cos(2.0 * PI * (l * 2.0 *N_RINGS - FREQ *  u_current_time)), 0.0, 1.0);

    gl_FragColor = vec4(COLOR * intensity, intensity);
}
