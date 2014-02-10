(function () {
    var sprite_name = location.search.slice(1);
    console.log("sprite: " + sprite_name);
    var state = "default";
    var x = 0;
    var y = 0;

    var sprite_filename = "../gfx/" + sprite_name + ".json";

    var sprite = new graphics.sprite(sprite_filename);
    var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            function (f) { setTimeout(f, 32); };

    $(function () {
        graphics.init();

        $("#scale").change(function () {
            sprite.scale = parseFloat($("#scale").val());
        });
        $("#xoff").change(function () {
            x = parseFloat($("#xoff").val());
        });
        $("#yoff").change(function () {
            y = parseFloat($("#yoff").val());
        });
        $("#save").click(function () {
            $.post("edit_sprite.py", {
                file: sprite_name,
                scale: sprite.scale,
                xoff: x,
                yoff: y
            }).then(function (results) {
                alert(results);
            });
        });

        sprite.loaded.then(function () {
            loop();
        });
    });

    function loop() {
        graphics.update();
        graphics.draw([{
            draw: function (ctx) {
                sprite.draw(ctx, x, y, 0, state);
            }
        }]);
        requestAnimationFrame(loop);
    }
})();
