(function () {
    var plot = window.objects.plot = function (pos, name) {
        this.graphic = null;
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
        if (ev.type === "plant") {
            this.item_id = ev.item_id;
            this.graphic = item_db.get_sprite(this.item_id);
            action_queue.enqueue(new actions.textbox("you planted some stuff");
        }
    }
})();

