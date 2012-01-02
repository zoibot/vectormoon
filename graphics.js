
graphics = function() {
    g = {};
    g.pMatrix = mat4.create();
    g.mvMatrix = null;
    var gl = null;
    g.init = function () {
        var cv = $("<canvas>", {"width": 300, "height": 300});
        $(document).append(cv);
        gl = cv[0].getContext("experimental-webgl");
        if(gl === null) {
            gl = cv[0].getContext("webgl");
        }
        this.pMatrix = mat4.ortho(0, 300, 300, 0, -1, 1);
        console.log('graphics initialized '+gl);
    };
    g.draw = function (objects) {
    };
    g.update = function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    return g;
}();

// Graphics related objects
graphics.polygon = function (points, color) {
    this.color = color || [1.0,1.0,1.0];
    this.points = points;
}

graphics.polygon.prototype.draw = function () {
}

graphics.sprite = function (obj) {

}

