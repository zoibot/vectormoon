(function () {
    var fixed = window.objects.fixed = function (pos, name, sprite_str, desc) {
        this.graphic = new graphics.sprite(sprite_str);
        this.x = pos[0];
        this.y = pos[1];
        this.name = name;
        this.angle = 0;
        this.description = desc;
    };
    fixed.prototype.draw = function (ctx) {
        this.graphic.draw(ctx, this.x, this.y, this.angle, 'default');
    },
    fixed.prototype.update = function () {
    },
    fixed.prototype.hits = function (ex, ey) {
        return Math.abs(ex - this.x) + Math.abs(ey - this.y) < 20;
    },
    fixed.prototype.handle = function (ev) {
        if (ev.type === "hit" && this.description) {
            action_queue.enqueue(new actions.textbox(this.description));
        }
    }
})();

