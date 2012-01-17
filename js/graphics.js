gl = null;

graphics = function() {
    var g = {};
    g.pMatrix = mat4.create();
    g.mvMatrix = mat4.create();
    var fbo = null;
    g.init = function () {
        var cv = $("<canvas>", {"width": 300, "height": 300});
        $(document).append(cv);
        gl = cv[0].getContext("experimental-webgl");
        if(gl === null) {
            gl = cv[0].getContext("webgl");
        }
        this.pMatrix = mat4.ortho(0, 300, 300, 0, -1, 1);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.shaders.load_shader('polygon');
        this.shaders.load_shader('fixed');
        this.shaders.set_matrix_uniforms();
        var fbo = gl.createFramebuffer();
        console.log('graphics initialized '+gl);
    };
    g.draw = function (objects) {

    };
    g.update = function () {
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.identity(g.mvMatrix);
    };
    return g;
}();

graphics.textures = function() {
    var t = {};
    var textures = {};
    t.load_texture = function(id, surface) {
        if(typeof textures[id] !== 'undefined') {
            return;
        }
    }
    t.unload_texture = function(id) {
        tex = textures[id];
        delete textures[id];
        gl.freeTextures(tex.texture);
    }
    return t;
}();
graphics.shaders = function() {
    var s = {};
    var program;
    var shaders = {};
    s.load_shader = function(id){
        jQuery.when($.get('gfx/shaders/'+id+'.vertex.glsl'),
                    $.get('gfx/shaders/'+id+'.fragment.glsl'))
            .done(function (vert, frag) {
                var vertex = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vertex, vert[2].responseText);
                gl.compileShader(vertex);
                if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
                    console.log('Failed');
                    console.log(gl.getShaderInfoLog(vertex));
                }
                var fragm = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragm, frag[2].responseText);
                gl.compileShader(fragm);
                if(!gl.getShaderParameter(fragm, gl.COMPILE_STATUS)) {
                    console.log('Failed');
                    console.log(gl.getShaderInfoLog(fragm));
                }

                shaders[id] = gl.createProgram();
                gl.attachShader(shaders[id], vertex);
                gl.attachShader(shaders[id], fragm);
                gl.linkProgram(shaders[id]);
                if(!gl.getProgramParameter(shaders[id], gl.LINK_STATUS)) {
                    console.log('Unabled to initialize shaders');
                    console.log(gl.getProgramInfoLog(shaders[id]));
                }
                console.log('loaded shader '+id);
            });
    }
    s.set_matrix_uniforms = function() {
        var p_uniform = gl.getUniformLocation(program, 'pMatrix');
        gl.uniformMatrix4fv(p_uniform, false, graphics.pMatrix);
        var mv_uniform = gl.getUniformLocation(program, 'mvMatrix');
        gl.uniformMatrix4fv(mv_uniform, false, graphics.mvMatrix);
    }
    return s;
}();

// Graphics related objects
graphics.polygon = function (points, color) {
    this.color = color || [1.0,1.0,1.0];
    this.points = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.points);
    gl.bufferData(gl.ARRAY_BUFFER, $.map(points, function (x) { return x;}), gl.STATIC_DRAW);
    var xs = $.map(points, function (p) { return p[0]; });
    var ys = $.map(points, function (p) { return p[1]; });
    this.left = Math.min.apply(Math, xs);
    this.right = Math.max.apply(Math, xs);
    this.top = Math.min.apply(Math, ys);
    this.bot = Math.max.apply(Math, ys);
    this.len = points.length;
    this.texture = gl.genTextures(1);
    gl.enable(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 300, 300, 0, gl.RGBA,
            gl.UNSIGNED_INT, null);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.disable(gl.TEXTURE_2D);
}

graphics.polygon.prototype.draw = function () {
    gl.enable(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.bindTexture(gl.TEXTURE_2D, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    //checkFramebufferStatus()
    gl.pushAttrib(gl.VIEWPORT_BIT);
    gl.viewport(0, 0, 300, 300);
    mat4.identity(graphics.mvMatrix);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.points);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
    mat4.translate(graphics.mvMatrix)
}

graphics.sprite = function (obj) {

}

