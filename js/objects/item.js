(function () {
    var item = window.objects.item = function (pos, item_id) {
        this.item_details = item_db.lookup_item(item_id);
        this.graphic = item_db.get_sprite(item_id);
        this.loaded = this.graphic.loaded;
        this.x = pos[0];
        this.y = pos[1];
        this.name = name;
        this.angle = 0;
        this.description = this.item_details.description;
    };
    item.prototype.draw = function (ctx) {
        this.graphic.draw(ctx, this.x, this.y, this.angle, 'default');
    };
    item.prototype.update = function () {
    };
    item.prototype.hits = function (ex, ey) {
        return Math.abs(ex - this.x) + Math.abs(ey - this.y) < 20;
    };
    item.prototype.handle = function (ev) {
        if (ev.type === "hit" && this.description) {
            if (this.item_details.grabbable)
            {
                // get item
                action_queue.enqueue(new actions.textbox(this.description));
                world.remove_object(this);
                inventory.add_item(this.item_details);
            }
        }
        else if (this.item_details.handlers && ev.type in this.item_details.handlers)
        {
            // TODO how to encode these better
            action_queue.enqueue(new actions.textbox(this.item_details.handlers[ev.type]));
        }
    };
    item.prototype.activate = function (x, y, player) {
        var ev = {};
        ev.type = this.item_details.activate[0];
        ev.x = x;
        ev.y = y;
        return ev;
    };
})();

