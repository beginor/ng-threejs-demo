export const uniforms = {
    time: {
        value: 1.0
    }
};

export const vertexShader = /* glsl */`
uniform float time;

varying vec3 vNormal;

void main() {
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y * time, position.z, 1.0 );
}
`;

export const fragmentShader = /* glsl */`
uniform float time;
varying vec3 vNormal;

void main() {
    float pr = (vNormal.x + 1.0) / 2.0;
    float pg = (vNormal.y + 1.0) / 2.0;
    float pb = (vNormal.z + 1.0) / 2.0;
    gl_FragColor=vec4(pr, pg, pb, 1.0);
}
`;
