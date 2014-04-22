(function () {
    var hud = window.objects.hud = function () {
        this.hp = new graphics.sprite("gfx/hp.json", [255, 100, 100, 255]);
        this.energy = new graphics.sprite("gfx/e.json", [100, 100, 255, 255]);
        this.loaded = jQuery.when(this.hp.loaded, this.energy.loaded);
    };

    hud.prototype.draw = function (ctx) {
        var _this = this;

        var item1 = inventory.get_equipped();

        // TODO come up with a better API for direct drawing like this
        graphics.draw([{ draw: function (ctx) {
            ctx.save();
            // TODO draw this all to canvas and then blit (way faster)
            ctx.font = "10pt Arial";
            ctx.beginPath();
            // draw right status
            ctx.rect(650, 0, 150, 600);
            // draw selected item boxes
            ctx.rect(660, 150, 60, 60);
            ctx.rect(730, 150, 60, 60);
            // draw stat bars
            ctx.rect(690, 50, 100, 20);
            ctx.rect(690, 80, 100, 20);
            // text stats?
            ctx.fillStyle = writeColor([0,0,0,255]);
            ctx.fill();
            ctx.strokeStyle = writeColor([255,255,255,255]);
            ctx.stroke();
            ctx.closePath();

            _this.hp.draw(ctx, 670, 50, 0, 'default');
            _this.energy.draw(ctx, 670, 80, 0, 'default');

            // everything below here is dynamic
            // player name
            ctx.strokeText("Name", 700, 15);

            // hp
            ctx.strokeText("100", 700, 65);
            // energy
            ctx.strokeText("100", 700, 95);

            if (item1)
            {
                item_db.get_sprite(item1.id).draw(ctx, 660, 150, 0, 'default');
                ctx.strokeText(item1.name, 660, 230);
            }
            ctx.restore();
        }}]);

    };

    hud.prototype.update = function () {
        if(!this.player)
            this.player = world.find_by_type(objects.player)[0];
    };
})();

