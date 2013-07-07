(function () {
    // TODO organize this like menu.js
    var inventory_contents = [];
    var sprites = {};
    current_x = current_y = 0;

    inventory = {
        add_item: function (item) {
            inventory_contents.push(item);
        },
        remove_item: function (item) {
            inventory_contents.remove(item);
        },
        update: function () {
            // TODO handle input
            // draw
            // TODO move this to graphics somehow
            graphics.draw([{ draw: function (ctx) {
                ctx.fillStyle = writeColor([0,0,0,255]);
                ctx.fillRect(50, 50, 700, 500);
                ctx.beginPath();
                ctx.rect(50, 50, 700, 500);
                for (var i = 0; i < 7; i++)
                {
                    for (var j = 0; j < 5; j++)
                    {
                        ctx.rect(i * 100 + 60, j * 100 + 60, 80, 80);
                        if (i * 7 + j < inventory_contents.length)
                        {
                            item_db.get_sprite(inventory_contents[i*7+j].id).draw(ctx, i * 100 + 60, j * 100 + 60, 0, 'default');
                        }
                    }
                }
                ctx.strokeStyle = writeColor([255,255,255,255]);
                ctx.stroke();
                ctx.closePath();
            }}]);
        },
        init: function () {

        },
        start: function () {
            $(document).keyup(_keypress)
        },
        end: function () {
            $(document).unbind('keyup', _keypress)
        }
    };

    function _keypress(ev)
    {
        if (ev.keyCode === 27)
        {
            game.pop_state();
        }
    }
})();
