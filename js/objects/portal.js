(function () {
    var portal = window.objects.portal = function (pos, name, sprite_str, destination_map, destination_pos) {
        objects.fixed.call(this, pos, name, sprite_str);
        this.destination_map = destination_map;
        this.destination_pos = destination_pos;
    };

    portal.prototype = $.extend({}, objects.fixed.prototype);

    portal.prototype.handle = function (ev) {
        if (ev.type === "touch") {
            ev.source.location = this.destination_map;
            world.load_stage(this.destination_map).then(function () {
                ev.source.x = this.destination_pos[0];
                ev.source.y = this.destination_pos[1];
            });
        }
    };
})();
