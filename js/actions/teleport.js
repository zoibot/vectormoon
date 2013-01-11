(function ()
{
    window.actions.teleport = function (destination, position, obj) {
        this.destination = destination;
        this.position = position;
    };

    window.actions.textbox.prototype.start = function () {
        // TODO this should wait for world load to finish
        world.load_stage(this.object);
        obj.x = pos[0];
        obj.y = pos[1];
    };

    window.actions.textbox.prototype.update = function () {
    };

    window.actions.textbox.prototype.end = function () {
    };

    window.actions.textbox.prototype.done = function () {
        return true;
    };

})();
