(function () {
    var query_map_name = location.search.slice(1);
    if (query_map_name) {
        load_stage(name);
    }


    var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            function (f) { setTimeout(f, 32); };

    var loading = jQuery.Deferred().resolve();
    var stage = null;
    var stage_cache = {};
    var local_objects = [];

    function load_stage(name) {
        var oldLoading =loading;
        loading = $.Deferred()
        oldLoading.then(function () {
            if (name in stage_cache) {
                end_load_stage(stage_cache[name]);
            } else {
                $.getJSON("maps/"+name+".json",
                    function (data) {
                        stage_cache[name] = data;
                        end_load_stage(data);
                    });
            }
        });
        return loading.promise();
    };
    function end_load_stage(data) {
        var load_promises = [];

        var promise_names = [];
        
        // load objects local to this map
        local_objects = $.map(data.objects, objects.construct_object);
        local_objects.forEach(function (obj) {
            load_promises.push(obj.loaded);
            promise_names.push(obj.name || JSON.stringify(obj));
        });

        $.when.apply($, load_promises).then(function () {
            stage = data;
            loading.resolve();
            loop();
        });
    };

    function update(timing) {
        if (loading && !loading.isResolved())
        {
            return;
        }
        document.title="vectormoon";
        graphics.draw(local_objects);
    };

    $(function () {
        graphics.init();
        item_db.populate()

        var select = $("#level_selector");
        $.get("tools/list_maps.py").then(function (maps) {
            for (var i = 0; i < maps.length; i++) {
                select.append($("<option>"+maps[i]+"</option>"));
            }

            load_stage(select.val());
        });
        select.change(function () {
            load_stage(select.val());
        });

        $("canvas").click(function (event) {
            for (var i = 0; i < local_objects.length; i++) {

            }
        })

        // $("#save").click(function () {
        //     $.post("edit_sprite.py", {
        //         file: sprite_name,
        //         scale: sprite.scale,
        //         xoff: x,
        //         yoff: y
        //     }).then(function (results) {
        //         alert(results);
        //     });
        // });

    });

    function loop() {
        graphics.update();
        update();
    }
})();
