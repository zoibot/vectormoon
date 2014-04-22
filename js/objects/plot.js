(function () {
    var plot = window.objects.plot = function (pos, name) {
        this.graphic = new graphics.sprite("gfx/weed.json");
        this.x = pos[0];
        this.y = pos[1];
        this.name = name;
        this.angle = 0;
        //this.description = desc;
    };
    plot.prototype.draw = function (ctx) {
        this.graphic.draw(ctx, this.x, this.y, this.angle, 'default');
    };
    plot.prototype.update = function () {
    };
    plot.prototype.hits = function (ex, ey) {
        return Math.abs(ex - this.x) + Math.abs(ey - this.y) < 20;
    };
    plot.prototype.handle = function (ev) {
        if (ev.type === "plant") {
            this.item_id = ev.props.plant;
            this.graphic = item_db.get_sprite(this.item_id);
            action_queue.enqueue(new actions.textbox("you planted some stuff"));
        }
    };
})();

