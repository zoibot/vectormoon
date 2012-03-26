ctx = null;

graphics = function() {
    var g = {};
    g.init = function () {
        var cv = $("<canvas>", {"width": 300, "height": 300});
        $(document).append(cv);
        ctx = cv[0].getContext("2d");
        console.log('graphics initialized '+ctx);
    };
    g.draw = function (objects) {
        for(var i = 0; i < objects.length; i++) {
            objects[i]
        }
    };
    g.update = function () {
    };
    return g;
}();

// Graphics related objects
graphics.polygon = function (points, color) {
    this.color = color || [1.0,1.0,1.0];
    this.points = gl.createBuffer();
    var xs = $.map(points, function (p) { return p[0]; });
    var ys = $.map(points, function (p) { return p[1]; });
    this.left = Math.min.apply(Math, xs);
    this.right = Math.max.apply(Math, xs);
    this.top = Math.min.apply(Math, ys);
    this.bot = Math.max.apply(Math, ys);
    this.len = points.length;
}

graphics.polygon.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for(var i = 0, length = this.points.length; i < length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fill();
}

graphics.sprite = function (obj) {

}

