(function ()
{
    window.actions.textbox = function (text, choices) {
        this.object = new objects.textbox(text, choices);
    };

    window.actions.textbox.prototype.start = function () {
        world.add_object(this.object);
        keyboard.disabled = true;
    };

    window.actions.textbox.prototype.update = function () {

    };

    window.actions.textbox.prototype.end = function () {
        world.remove_object(this.object);
        keyboard.disabled = false;
    };

    window.actions.textbox.prototype.done = function () {
        return this.object.dismissed;
    };

})();
