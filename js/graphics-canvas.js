graphics = function() {
    var g = {};
    var ctx;
    g.init = function () {
        var cv = $("<canvas>");
        cv.attr({"width": 800, "height": 600});
        $("#cv_wrap").append(cv);
        $("#cv_wrap").css({"margin-left": "auto", "margin-right": "auto", "width": "800px"});
        ctx = cv[0].getContext("2d");
        console.log('graphics initialized '+ctx);
        //cv.css('border', '2px solid red');
    };
    g.draw = function (objects) {
        for(var i = 0; i < objects.length; i++) {
            objects[i].draw(ctx);
        }
    };
    g.update = function () {
        ctx.clearRect(0,0,800,600);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0,0,800,600);
    };
    return g;
}();

// Graphics related objects
graphics.polygon = function (points, color) {
    this.color = color || [255,255,255,255];
    this.points = points;
    var xs = $.map(points, function (p) { return p[0]; });
    var ys = $.map(points, function (p) { return p[1]; });
    /*this.left = Math.min.apply(Math, xs);
    this.right = Math.max.apply(Math, xs);
    this.top = Math.min.apply(Math, ys);
    this.bot = Math.max.apply(Math, ys);*/
    this.len = points.length;
};

function writeColor(color) {
    var result = 'rgba(';
    result += color.join(',');
    result += ')';
    return result;
}

graphics.polygon.prototype.draw = function (ctx) {
    var points = this.points;
    ctx.strokeStyle = writeColor(this.color);
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for(var i = 1, length = this.points.length; i < length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();
};

graphics.sprite = function (anims, color, imgs) {
    this.anims = null;
    this.load_anims(anims);
    this.color = color || [255,255,255,255];
    this.imgs = imgs || [];
    this.frame = 0;
};

graphics.sprite.prototype.draw = function (ctx, x, y, deg, state) {
    if (this.anims) {
        ctx.save();
        ctx.translate(x+0.5, y+0.5);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(deg);
        this.anims[state][this.frame].draw(ctx);
        ctx.restore();
    } else {
        console.log("Loading...");
    }
};

graphics.sprite.prototype.load_anims = function (filename) {
    var _this = this;
    $.getJSON(filename, function (data) {
        var anims_file = data;
        var anims = {};
        cls = eval(anims_file['type']); // DANGER
        _this.scale = anims_file['scale'] || 1;
        for(var key in anims_file['animations']) {
            anims[key] = [];
            var lastcolor = [255,255,255,255];
            $.each(anims_file['animations'][key], function (i, frame) {
                if (frame[0].length === 4) {
                    anims[key].push(new cls(frame.slice(1), frame[0]));
                    lastcolor = frame[0];
                } else {
                    anims[key].push(new cls(frame, lastcolor));
                }
            });
        };
        _this.anims = anims;
    });
};

graphics.text = function (text, x, y, deg, color, font) {
    this.text = text;
    this.color = color || [255,255,255,255];
    this.x = x;
    this.y = y;
    this.font = font || "12pt arial";
};

graphics.text.prototype.draw = function (ctx) {
    // TODO repeated
    ctx.save();
    ctx.font = this.font;
    ctx.fillStyle = writeColor(this.color);
    ctx.fillText(this.text, this.x, this.y);
};

graphics.hud = function () {
};

