(function () {
    var player = window.objects.player = function () {
        this.graphic = new graphics.sprite("gfx/player.json");
        this.loaded = this.graphic.loaded;
        this.location = "maps/farm";
        this.x = this.y = 10;
        this.angle = 0;
        this.name = "player";
        this.just_used = false;
    };
    player.prototype.draw = function (ctx) {
        this.graphic.draw(ctx, this.x, this.y, this.angle, 'stand');
    };
    player.prototype.update = function (other_objects) {
        // move player
        var vx = 0;
        var vy = 0;
        if (keyboard.pressed(37)) // left
            vx -= 4;
        if (keyboard.pressed(38)) // up
            vy -= 4;
        if (keyboard.pressed(39)) // right
            vx += 4;
        if (keyboard.pressed(40)) // down
            vy += 4;
        var newx = this.x + vx;
        var newy = this.y + vy;
        newx = clamp(newx, 650);
        newy = clamp(newy, 600);

        var bad_pos;
        for (var i = 3; i > 0; i--) {
            bad_pos = false;
            var tryx = i & 1 ? newx : this.x;
            var tryy = i & 2 ? newy : this.y;
            other_objects.forEach(function (obj) {
                if (obj.solid && obj.contains) {
                    if (obj.contains(tryx, tryy)) {
                        bad_pos = true;
                        return false;
                    }
                }
            });
            if (!bad_pos) {
                newx = tryx;
                newy = tryy;
                break;
            }
        }

        if (!bad_pos) {
            this.x = newx;
            this.y = newy;
            if (vx || vy)
                this.angle = Math.atan2(vy, vx);
        }
        
        // interact with world
        var new_events = [new events.touch(this.x, this.y, this)];
        if (keyboard.pressed(32)) // space
            new_events.push(new events.hit(this.x, this.y, this));

        if (keyboard.pressed(73)) // i
            // open inventory menu
            game.push_state(inventory);

        if (keyboard.pressed(90)) { // z
            if (!this.just_used)
            {
                // TODO Problem- some events need to have current X, Y
                var equipped_item = inventory.get_equipped();
                if (equipped_item && equipped_item.handlers && equipped_item.handlers.use) {
                    action_queue.enqueue_encoded(equipped_item.handlers.use, this);
                }
                this.just_used = true;
            }
        }
        else
        {
            this.just_used = false;
        }

        return new_events;
    };
    player.prototype.hits = function (x, y) {
        return false;
    };
})();
