(function () {
    // TODO organize this like menu.js
    var inventory_contents = [];
    var sprites = {};
    var current_x = 0, current_y = 0;
    var equipped = null;

    inventory = {
        add_item: function (item) {
            inventory_contents.push(item);
        },
        remove_item: function (item) {
            inventory_contents.remove(item);
        },
        get_equipped: function () {
            return equipped;
        },
        update: function () {
            // draw
            // TODO move this to graphics somehow
            graphics.draw([{ draw: function (ctx) {
                // draw background rect
                ctx.fillStyle = writeColor([0,0,0,0.8]);
                ctx.fillRect(50, 50, 700, 500);
                // draw background squares
                ctx.beginPath();
                ctx.rect(50, 50, 700, 500);
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 5; j++) {
                        ctx.rect(i * 100 + 60, j * 100 + 60, 80, 80);
                    }
                }
                ctx.strokeStyle = writeColor([255,255,255,255]);
                ctx.stroke();

                for (var k = 0; k < inventory_contents.length; k++) {
                    var x = k % 7;
                    var y = Math.floor(k / 7);
                    item_db.get_sprite(inventory_contents[k].id).draw(ctx, x * 100 + 60, y * 100 + 60, 0, 'default');
                }
                // draw selected
                ctx.closePath();
                ctx.strokeStyle = writeColor([0,255,0,255]);
                ctx.strokeRect(current_x * 100 + 60, current_y * 100 + 60, 80, 80);
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
        switch (ev.keyCode)
        {
            case 90: // z
                var index = current_x + current_y * 7;
                equipped = inventory_contents[index];
                break;
            case 27: // esc
                game.pop_state();
                break;
            case 37: // left
                current_x = clamp(current_x - 1, 7);
                break;
            case 38: // up
                current_y = clamp(current_y - 1, 5);
                break;
            case 39: // right
                current_x = clamp(current_x + 1, 7);
                break;
            case 40: // down
                current_y = clamp(current_y + 1, 5);
                break;
        }
    }
})();
