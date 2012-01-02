
objects = function () {
    var objs = {};
    o = {};
    o.register_object = function (name, constructor) {
        objs[name] = constructor;
    }
    o.construct_object = function (description) {
        name = description[0];
        args = description.slice(1);
        if(typeof objs[name] !== 'function') {
            throw 'crap no object';
        }
        return objs[name].apply(null, args);
    }
    return o;
}();

objects.register_object('player', function () {
    return {};
})
objects.register_object('background', function () {
    return {};
})
