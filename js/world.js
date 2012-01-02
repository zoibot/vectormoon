world = (function () {
    w = {};
    var local_objects = [];
    var last_update = 0;
    w.load_stage = function (name) {
        $.getJSON(name+".json",
            function (data) {
                local_objects = $.map(data.objects, objects.construct_object);
                this.stage = data;
                console.log('loaded stage '+name);
                console.log(this.stage);
            });
    };
    w.update = function (timing) {
        for (var i = 0; i < objects.length; i++) {
            objects[i].update();
        }
    };
    return w;
})();
