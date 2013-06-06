world = (function () {
    var w = {};

    var local_objects = [];
    var world_objects = [];
    var last_update = 0;

    var event_queue = [];
    var event_history = {};

    var stage_cache = {};

    function resolve(ev) {
        ev.targets = [];
        var new_history = {};
        for (var i = 0; i < local_objects.length; i++) {
            if (local_objects[i].hits && local_objects[i].hits(ev.x, ev.y)) {
                if (!event_history[ev.type+":"+ev.source.name+"->"+local_objects[i].name]) {
                    ev.targets.push(local_objects[i]);
                }
                new_history[ev.type+":"+ev.source.name+"->"+local_objects[i].name] = true;
            }
        }
        event_history = new_history;
    }

    function fire(ev) {
        for (var i = 0; i < ev.targets.length; i++) {
            ev.targets[i].handle && ev.targets[i].handle(ev);
        }
    }

    w.init = function (game) {
        var state = game.save_state;
        item_db.populate().then(function ()
        {
            world_objects = $.map(state.world_objects, objects.construct_object);
            world.load_stage(state.stage);
        });
    }

    w.start = w.end = function () {};

    w.load_stage = function (name) {
        // TODO need to save old stage here
        this.loading = $.Deferred()
        if (name in stage_cache) {
            w.end_load_stage(stage_cache[name]);
            this.loading.resolve();
        } else {
            $.getJSON(name+".json",
                function (data) {
                    stage_cache[name] = data;
                    w.end_load_stage(data);
                });
        }
        return this.loading.promise();
    };
    w.end_load_stage = function (data) {
        var load_promises = [];

        var promise_names = [];
        
        // load objects local to this map
        local_objects = $.map(data.objects, objects.construct_object);
        local_objects.forEach(function (obj) {
            load_promises.push(obj.loaded);
            promise_names.push(obj.name || JSON.stringify(obj));
        });

        // load world objects that happen to be on this map
        world_objects.forEach(function (obj) {
            if (obj.location === data.name) {
                local_objects.push(obj);
                load_promises.push(obj.loaded);
                promise_names.push(obj.name || JSON.stringify(obj));
            }
        });

        function watch_promises()
        {
            var string = "";
            for (var i = 0; i < load_promises.length; i++)
            {
                if (load_promises[i] && !load_promises[i].isResolved())
                {
                    string += promise_names[i] + " ";
                }
            }
            watch("loading", string);
        }

        for (var i = 0; i < load_promises.length; i++)
        {
            var promise = load_promises[i];
            promise && promise.then(watch_promises);
        }
        watch_promises();

        var _this = this;
        console.log(load_promises);
        console.log(promise_names);

        $.when.apply($, load_promises).then(function () {
            _this.stage = data;
            console.log('loaded stage '+data.name);
            console.log(local_objects);
            _this.loading.resolve();
        });
    };
    w.stage_name = function () {
        return this.stage.name;
    };

    w.update = function (timing) {
        if (this.loading && !this.loading.isResolved())
        {
            document.title="loading-v";
            return;
        }
        document.title="vectormoon";
    	graphics.draw(local_objects);
        action_queue.update();
        var ev;
        for (var i = 0; i < local_objects.length; i++) {
            ev = local_objects[i].update(local_objects);
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
    w.world_objects = function () {
        return world_objects;
    };
    w.add_object = function (object) {
        world_objects.push(object);
        if (object.location === this.stage || !object.location) {
            local_objects.push(object);
        }
    };
    w.remove_object = function (object) {
        var i = local_objects.indexOf(object);
        if (i !== -1) {
            local_objects.splice(i, 1);
        }
        var i = world_objects.indexOf(object);
        if (i !== -1) {
            world_objects.splice(i, 1);
        }
    };
    return w;
})();
