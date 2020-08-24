varying vec3 pos;

void main() {
    float pi = 3.141592653589793;
    float radius = sqrt(pos.x * pos.x + pos.y * pos.y);
    if (radius <= 1.0) {
        float opacity = sin(radius * pi);
        if (opacity < 0.0) {
            opacity = 0.0;
        }
        gl_FragColor = vec4(1.0, 0.0, 0.0, opacity);
    }
    else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
