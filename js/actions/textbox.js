(function ()
{
    window.actions.textbox = function (text, choices) {
        this.object = new objects.textbox(text, choices);
    };

    window.actions.textbox.prototype.start = function () {
        world.add_object(this.object);
    };

    window.actions.textbox.prototype.update = function () {

    };

    window.actions.textbox.prototype.done = function () {
        return false;
    };

})();
