export const vert = /* glsl */`
uniform float currTime;

varying float distance;

void main() {
    distance = sqrt(position.x * position.x + position.y * position.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
export const frag = /* glsl */`
uniform float currTime;
uniform vec3 ringColor;
uniform float ringCount;
uniform float ringFreq;

varying float distance;

const float PI = 3.141592653589793;

void main() {
    float intensity = clamp(cos(distance * PI), 0.0, 1.0)
        * clamp(cos(2.0 * PI * (distance * 2.0 * ringCount - ringFreq * currTime)), 0.0, 1.0);
    gl_FragColor = vec4(ringColor * intensity, intensity);
}
`;
