graphics = function() {
    var g = {};
    var ctx;
    g.init = function () {
        var cv = $("<canvas>");
        cv.attr({"width": 800, "height": 600});
        $("#cv_wrap").append(cv);
        $("#cv_wrap").css({"margin-left": "auto", "margin-right": "auto", "width": "800px"});
        ctx = cv[0].getContext("2d");
        ctx.lineJoin = "round";
        console.log('graphics initialized '+ctx);
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
    this.len = points.length;
};

graphics.polygon.prototype.box = function (pos_x, pos_y, scale, deg) {
    var rotated_points = [];
    var cos = Math.cos(Math.PI * (deg/180));
    var sin = Math.sin(Math.PI * (deg/180));
    // foreach point, rotate it, then push the edge on to a list
    var points = this.points;
    for (var i = 0, length = points.length; i < length; i++) {
        rotated_points.push([
                                pos_x + scale * (points[i][0] * cos - points[i][1] * sin),
                                pos_y + scale * (points[i][0] * sin + points[i][1] * cos)
                            ]);
    }

    var xs = $.map(rotated_points, function (p) { return p[0] * scale; });
    var ys = $.map(rotated_points, function (p) { return p[1] * scale; });
    var left = Math.min.apply(Math, xs);
    var right = Math.max.apply(Math, xs);
    var top = Math.min.apply(Math, ys);
    var bot = Math.max.apply(Math, ys);

    return [top, right, bot, left];
};

function writeColor(color) {
    var result = 'rgba(';
    result += color.join(',');
    result += ')';
    return result;
}

graphics.polygon.prototype.draw = function (ctx, scale) {
    var points = this.points;
    scale = scale || 1;
    ctx.strokeStyle = writeColor(this.color);

    var width = 5;
    while (width > 0)
    {
        ctx.globalAlpha = 1/(width);
        ctx.lineWidth = width;

        ctx.beginPath();
        ctx.moveTo(points[0][0] * scale, points[0][1] * scale);
        for(var i = 1, length = this.points.length; i < length; i++) {
            ctx.lineTo(points[i][0] * scale, points[i][1] * scale);
        }
        ctx.lineTo(points[0][0] * scale, points[0][1] * scale);
        ctx.stroke();

        width--;
    }
};

graphics.polygon.prototype.contains = function (x, y, pos_x, pos_y, scale, deg) {
    var rotated_points = [];
    var cos = Math.cos(Math.PI * (deg/180));
    var sin = Math.sin(Math.PI * (deg/180));
    // foreach point, rotate it, then push the edge on to a list
    var points = this.points;
    for (var i = 0, length = points.length; i < length; i++) {
        rotated_points.push([
                                pos_x + scale * (points[i][0] * cos - points[i][1] * sin),
                                pos_y + scale * (points[i][0] * sin + points[i][1] * cos)
                            ]);
    }
    var crossing_number = 0;
    var considered = 0;
    // foreach edge, determine if it hits
    for (var i = 0, length = rotated_points.length; i < length; i++) {
        var start = rotated_points[i];
        var end = i+1 === length ? rotated_points[0] : rotated_points[i+1];
        if((end[1]-start[1] < 0 /* upward */ && start[1] >= y && end[1] < y)
           || (end[1]-start[1] > 0 /* downward */ && start[1] < y && end[1] >= y)) {
            considered++;
            var xcross;
            if (end[0]-start[0] === 0) { 
                xcross = end[0];
            } else {
                xcross = start[0] + ((end[0] - start[0])/(end[1]-start[1])) * (y - start[1]);
            }
            if (x < xcross)
            {
                crossing_number++;
            }
        }
    }

    return crossing_number & 1;
};

graphics.rectangle = function (wh, color) {
    this.color = color || [255,255,255,255];
    var h = wh[1];
    var w = wh[0];
    this.points = [[0,0], [0,h], [w,h], [w,0]];
    this.len = 4;
};

graphics.rectangle.prototype = $.extend({}, graphics.polygon.prototype);

graphics.sprite = function (anims, color, imgs) {
    this.anims = null;
    this.load_anims(anims);
    this.loaded = $.Deferred();
    this.color = color || [255,255,255,255];
    this.imgs = imgs || [];
    this.frame = 0;
};

graphics.sprite.prototype.box = function (x, y, deg, state) {
    var graphic = this.anims[state][this.frame];
    // TODO scale
    return graphic.box && graphic.box(x, y, this.scale, deg);
};

graphics.sprite.prototype.draw = function (ctx, x, y, deg, state) {
    if (this.anims) {
        ctx.save();
        ctx.translate(x+0.5, y+0.5);
        ctx.rotate(deg);
        this.anims[state][this.frame].draw(ctx, this.scale);
        ctx.restore();
    } else {
        console.log("Loading...");
    }
};

graphics.sprite.prototype.contains = function (x, y, x_pos, y_pos, deg, state) {
    var graphic = this.anims[state][this.frame];
    return graphic.contains && graphic.contains(x, y, x_pos, y_pos, this.scale, deg);
};

graphics.sprite.prototype.list_anims = function () {
    return Object.keys(this.anims);
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
        _this.loaded.resolve();
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

