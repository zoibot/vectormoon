varying highp vec2 vTextureCoord;

uniform sampler2D tex;

#if __VERSION__ < 130
int abs(int x) {
    if(x < 0) 
        return -x;
    else
        return x;
}
#endif

highp float blurSize = 1.0/300.0;
void main() {
   highp vec4 sum = vec4(0.0);
 
   // blur in y (vertical)
   // take nine samples, with the distance blurSize between them
   for(int x = -3; x < 4; x++) {
       for(int y = -3; y < 4; y++) {
           sum += texture2D(tex, vec2(vTextureCoord.s + float(x)*blurSize, vTextureCoord.t + float(y)*blurSize)) * 1.0/(float(abs(x)*abs(y))*5.0);
       }
   }
   gl_FragColor = sum + texture2D(tex, vTextureCoord.st);
}
