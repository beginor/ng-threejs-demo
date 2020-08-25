precision highp float;
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;

uniform mat3 u_transform;
uniform mat3 u_display;
attribute vec2 a_offset;
varying vec2 v_offset;
const float SIZE = 70.0;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vec3 transformedNormal = normalize(uNormalMatrix * aVertexNormal);

    float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);

    gl_PointSize = 10.0;
    v_offset = a_offset;
}
