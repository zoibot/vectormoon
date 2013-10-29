(function () {
    var sprite_name = location.search.slice(1);
    console.log("sprite: " + sprite_name);
    var state = "default";
    var x = 0;
    var y = 0;
    var scale = 1.0;

    var sprite = new graphics.sprite(sprite_name);
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
