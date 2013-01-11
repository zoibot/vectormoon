(function () {
    var portal = window.objects.portal = function (pos, name, sprite_str, destination_map, destination_pos) {
        objects.fixed.call(this, pos, name, sprite_str);
        this.destination_map 
    };

    // TODO make utility function
    function temp(){};
    temp.prototype = objects.fixed.prototype;
    portal.prototype = new temp();
    portal.prototype.constructor = portal;

    portal.prototype.hits = function (x, y) {
        if (y < 10) return true;
        else return false;
    };

    portal.prototype.handle = function (ev) {
        if (ev.type === "touch") {
            world.load_stage("maps/path");
        }
    };
})();
