attribute vec3 aVertexPosition;

uniform mat4 mvMatrix;
uniform mat4 pMatrix;
uniform vec4 Color;

varying lowp vec4 vColor;

void main(void) {
    gl_Position = pMatrix * mvMatrix * vec4(aVertexPosition, 1.0);
    vColor = Color;
}
