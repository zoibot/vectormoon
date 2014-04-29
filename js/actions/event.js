(function ()
{
    window.actions.event = function (event_name, event_params) {
        var args = [event_name, event_params];
        this.event = create_from_args(window.events, args);
        this.source_set = false;
    };

    window.actions.event.prototype.set_source = function (source) {
        this.event.x = source.x;
        this.event.y = source.y;
        this.event.source = source;
        this.source_set = true;
    };

    window.actions.event.prototype.start = function () {
    };

    window.actions.event.prototype.update = function () {
        if (!this.source_set) {
            throw new Error("need to set source of event action");
        }
        return [this.event];
    };

    window.actions.event.prototype.end = function () {
    };

    window.actions.event.prototype.done = function () {
        // event doesn't have anything ongoing
        return true;
    };

})();
