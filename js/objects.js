(function () {

objects = function () {
    var objs = {};
    o = {};
    o.register_object = function (name, constructor) {
        objs[name] = constructor;
    }
    o.construct_object = function (description) {
        name = description[0];
        args = description.slice(1);
        if(typeof objs[name] !== 'function') {
            throw 'crap no object';
        }
        return objs[name].apply(null, args);
    }
    return o;
}();

// These should all be split out into separate files eventually

objects.register_object('player', function () {
    var graphic = new graphics.sprite("gfx/player.json");
    var x = y = 10;
    var angle = 0;
    return {
        draw: function (ctx) {
            graphic.draw(ctx, x, y, angle, 'stand');
        },
        update: function () {
            // move player
            var vx = 0;
            var vy = 0;
            if (keyboard.pressed(37))
                vx -= 2;
            if (keyboard.pressed(38))
                vy -= 2;
            if (keyboard.pressed(39))
                vx += 2;
            if (keyboard.pressed(40))
                vy += 2;
            x += vx;
            y += vy;
            if (vx || vy)
                angle = Math.atan2(vy, vx);
            
            // interact with world
            var new_events = [new events.touch(x, y)];
            if (keyboard.pressed(32))
                new_events.push(new events.hit(x, y));

            return new_events;
        },
        hits: function (x, y) {
            return false;
        }
    };
});

objects.register_object('fixed', function (pos, name, sprite_str) {
    console.log(sprite_str);
    var graphic = new graphics.sprite(sprite_str);
    var x = pos[0];
    var y = pos[1];
    var name = name;
    var angle = 0;
    return {
        draw: function (ctx) {
            graphic.draw(ctx, x, y, angle, 'default');
        },
        update: function () {
        },
        hits: function (ex, ey) {
            return Math.abs(ex - x) + Math.abs(ey - y) < 20;
        },
        handle: function (ev) {
            if (ev.type === 'touch') {
                console.log(name + ' got touched!!!!');
            }
        }
    };
});


// Background
objects.register_object('background', function (pos, name, sprite_str) {
    var graphic = new graphics.sprite(sprite_str);
    var x = pos[0];
    var y = pos[1];
    return {
        draw: function (ctx) {
            graphic.draw(ctx, x, y, 0, 'default');
        },
        update: function () {
        },
        hits: function (ex, ey) {
            return x === ex && y === ey;
        }
    };
});

// HUD
var hud_gfx = graphics.hud();
objects.register_object('hud', function () {
    return {
        draw: function (ctx) {
            hud_gfx(ctx);
        }
    };
});

})();
