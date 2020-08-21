varying vec3 vNormal;
uniform float time;

void main() {
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y * time, position.z, 1.0 );
}
