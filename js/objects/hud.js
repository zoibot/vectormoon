(function () {
    var hud = window.objects.hud = function () {
    };
    hud.prototype.draw = function (ctx) {
        var item1 = inventory.get_equipped();

        graphics.draw([{ draw: function (ctx) {
            // TODO draw this all to canvas and then blit
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
            ctx.strokeStyle = writeColor([255,255,255,255]);
            ctx.stroke();
            ctx.closePath();

            if (item1)
            {
                item_db.get_sprite(item1.id).draw(ctx, 660, 150, 0, 'default');
                ctx.font = "10pt Arial";
                ctx.fillText(item1.name, 660, 250);
            }
        }}]);

    };
    hud.prototype.update = function () {
        if(!this.player)
            this.player = world.find_by_type(objects.player)[0];
    };
})();

