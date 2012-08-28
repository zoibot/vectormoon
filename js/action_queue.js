(function () {
    var queue = [];
    action_queue = {
        enqueue: function (action) {
            queue.push(action);
            if (queue.length === 1) {
                queue[0].start();
            }
        },
        update: function () {
            if (queue.length === 0) return;
            queue[0].update();
            if (queue[0].done()) {
                queue.shift().end();
                if (queue.length > 0) {
                    queue[0].start();
                }
            }
        }
    };

    actions = {};

    actions.simultaneous = function (actions) {
        this.actions = actions;
    };
    actions.simultaneous.protoype.update = function () {
        this.actions.forEach(function (action) {
            action.update();
        });
    };
    actions.simultaneous.prototype.done = function () {
        return this.actions.every(function (a) { return a.done(); });
    };
})();
