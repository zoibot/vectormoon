(function () {
    var player = window.objects.player = function () {
        this.graphic = new graphics.sprite("gfx/player.json");
        this.x = this.y = 10;
        this.angle = 0;
    };
    player.prototype.draw = function (ctx) {
        this.graphic.draw(ctx, this.x, this.y, this.angle, 'stand');
    };
    player.prototype.update = function () {
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
        this.x += vx;
        this.y += vy;
        if (vx || vy)
            this.angle = Math.atan2(vy, vx);
        
        // interact with world
        var new_events = [new events.touch(this.x, this.y)];
        if (keyboard.pressed(32))
            new_events.push(new events.hit(this.x, this.y));

        return new_events;
    };
    player.prototype.hits = function (x, y) {
        return false;
    };
})();
