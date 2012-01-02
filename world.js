world = (function () {
    w = {};
    var objects = [];
    var last_update = 0;
    w.load_stage = function (name) {
        $.getJSON(name+".json",
            function (data) {
                data.objects = $.map(data.objects, function (obj) {
                        objects[obj[0]].apply();
                    });
                this.stage = data;
                console.log('loaded stage '+name);
                console.log(this.stage);
            })
            .error(function (xhr,error,message) { 
                console.log('ERROR LOADING STAGE');
            });
    };
    w.update = function (timing) {
        for (var i = 0; i < objects.length; i++) {
            objects[i].update();
        }
    };
    return w;
})();
