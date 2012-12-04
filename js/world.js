world = (function () {
    w = {};
    var local_objects = [];
    var event_queue = [];
    var last_update = 0;

    function resolve(ev) {
        ev.targets = [];
        for (var i = 0; i < local_objects.length; i++) {
            if (local_objects[i].hits && local_objects[i].hits(ev.x, ev.y)) {
                ev.targets.push(local_objects[i]);
            }
        }
    }

    function fire(ev) {
        for (var i = 0; i < ev.targets.length; i++) {
            ev.targets[i].handle && ev.targets[i].handle(ev);
        }
    }

    w.init = function (game) {
        $.getJSON("config.json", function (cfg) {
            game.config = cfg;
            world.load_stage(game.config.firststage);
        });
    }

    w.start = w.end = function () {};

    w.load_stage = function (name) {
        $.getJSON(name+".json",
            function (data) {
                local_objects = $.map(data.objects, objects.construct_object);
                this.stage = data;
                console.log('loaded stage '+name);
                console.log(local_objects);
            });
    };
    w.update = function (timing) {
    	graphics.draw(local_objects);
        var ev;
        for (var i = 0; i < local_objects.length; i++) {
            ev = local_objects[i].update();
            if (ev) {
                event_queue.push.apply(event_queue, ev);
            }
        }
        for (var i = 0; i < event_queue.length; i++) {
            resolve(event_queue[i]);
            fire(event_queue[i]);
        }
        event_queue = [];
    };
    w.objects = function () {
        return local_objects;
    };
    return w;
})();
