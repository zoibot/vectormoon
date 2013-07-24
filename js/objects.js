(function () {

objects = function () {
    o = {};
    obj = {};
    o.construct_object = function (description) {
        var name = description[0];
        var args = description.slice(1);
        if(typeof window.objects[name] !== 'function') {
            throw 'crap no object '+name;
        }
        // Hacks to new up arbitrary objects
        var obj = function () {};
        var constructor = window.objects[name];
        obj.prototype = constructor.prototype; 
        var instance = new obj;
        constructor.apply(instance, args)
        return instance;
    }
    return o;
}();

})();
