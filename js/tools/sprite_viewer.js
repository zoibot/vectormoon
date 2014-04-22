(function () {
    var state = "default";
    var x = 0;
    var y = 0;

    var query_sprite_name = location.search.slice(1);
    if (query_sprite_name) {
        load_sprite(name);
    }

    var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            function (f) { setTimeout(f, 32); };

    function load_sprite(name) {
        console.log("sprite: " + name);
        sprite_name = name
        x = 0;
        y = 0;
        sprite_filename = "../gfx/" + sprite_name + ".json";
        sprite = new graphics.sprite(sprite_filename);
        sprite.loaded.then(function () {
            var select = $("#anim_selector").empty();
            var animations = sprite.list_anims();
            state = animations[0];
            for (var i = 0; i < animations.length; i++) {
                select.append($("<option>"+animations[i]+"</option>"));
            }
            requestAnimationFrame(loop);
        });
    }

    $(function () {
        graphics.init();

        var select = $("#sprite_selector");
        $.get("list_sprites.py").then(function (sprites) {
            for (var i = 0; i < sprites.length; i++) {
                select.append($("<option>"+sprites[i]+"</option>"));
            }

            load_sprite(select.val());
        });
        select.change(function () {
            load_sprite(select.val());
        });
        $("#anim_selector").change(function () {
            state = $(this).val();
        });

        $("#scale").change(function () {
            sprite.scale = parseFloat($("#scale").val());
            requestAnimationFrame(loop);
        });
        $("#xoff").change(function () {
            x = parseFloat($("#xoff").val());
            requestAnimationFrame(loop);
        });
        $("#yoff").change(function () {
            y = parseFloat($("#yoff").val());
            requestAnimationFrame(loop);
        });
        $("#save").click(function () {
            $.post("edit_sprite.py", {
                file: sprite_name + ".json",
                scale: sprite.scale,
                xoff: x,
                yoff: y
            }).then(function (results) {
                alert(results);
            });
        });

    });

    function loop() {
        graphics.update();
        graphics.draw([{
            draw: function (ctx) {
                sprite.draw(ctx, x, y, 0, state);
            }
        }]);
    }
})();
