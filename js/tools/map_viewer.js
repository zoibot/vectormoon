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
    var local_object_map = {};

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
        local_objects = $.map(data.objects, function (desc, name) {
            var obj = objects.construct_object(desc)
            obj.name = name || JSON.stringify(obj);
            load_promises.push(obj.loaded);
            promise_names.push(obj.name);
            local_object_map[name] = obj;
            return obj;
        });

        $.when.apply($, load_promises).then(function () {
            stage = data;
            local_objects.forEach(function (obj) {
                $("#objects").append($("<option>").text(obj.name));
            });
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

        var selected_item = null;

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
            var x = event.clientX - $("canvas").offset().left;
            var y = event.clientY - $("canvas").offset().top;
            for (var i = 0; i < local_objects.length; i++) {
                if (local_objects[i].hits(x,y)) {
                    console.log("clicked on something", local_objects[i]);
                    selected_item = local_objects[i];
                    // get bounding box
                }
            }
        });

        var objs = $("#objects");
        objs.click(function (event) {
            var v = objs.val();
            alert(v);
        });


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
