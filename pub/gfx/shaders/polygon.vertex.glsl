attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 mvMatrix;
uniform mat4 pMatrix;

varying highp vec2 vTextureCoord;

void main(void) {
    gl_Position = pMatrix * mvMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
}
