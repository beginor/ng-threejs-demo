varying vec3 vNormal;
uniform float time;

void main() {
    float pr = (vNormal.x + 1.0) / 2.0;
    float pg = (vNormal.y + 1.0) / 2.0;
    float pb = (vNormal.z + 1.0) / 2.0;
    gl_FragColor=vec4(pr, pg, pb, 1.0);
}
