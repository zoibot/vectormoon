(function ()
{
    window.actions.teleport = function (destination, position, obj) {
        this.destination = destination;
        this.position = position;
    };

    window.actions.teleport.prototype.start = function () {
        // TODO this should wait for world load to finish
        world.load_stage(this.object);
        obj.x = pos[0];
        obj.y = pos[1];
    };

    window.actions.teleport.prototype.update = function () {
    };

    window.actions.teleport.prototype.end = function () {
    };

    window.actions.teleport.prototype.done = function () {
        return true;
    };

})();
