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

// These should all be split out into separate files eventually
// HUD
/*var hud_gfx = graphics.hud();
objects.register_object('hud', function () {
    return {
        draw: function (ctx) {
            hud_gfx(ctx);
        }
    };
});*/

})();
