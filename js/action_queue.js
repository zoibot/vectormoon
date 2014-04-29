(function () {
    var queue = [];
    window.action_queue = {
        enqueue: function (action) {
            queue.push(action);
            if (queue.length === 1) {
                queue[0].start();
            }
        },
        enqueue_encoded: function (encoded_actions, source) {
            var actions = window.action_queue.decode_actions(encoded_actions, source);
            actions.forEach(function (action) {
                window.action_queue.enqueue(action);
            });
        },
        decode_actions: function (encoded_actions, source) {
            var actions = [];
            for (var i = 0; i < encoded_actions.length; i++) {
                var encoded_action = encoded_actions[i];
                var action = create_from_args(window.actions, encoded_action);
                action.set_source(source);
                actions.push(action);
            }
            return actions;
        },
        update: function () {
            var new_events = [];
            if (queue.length === 0) return;
            new_events = queue[0].update();
            if (queue[0].done()) {
                queue.shift().end();
                if (queue.length > 0) {
                    queue[0].start();
                }
            }
            return new_events;
        }
    };

    actions = {};

    actions.simultaneous = function (actions) {
        this.actions = actions;
    };
    actions.simultaneous.prototype.update = function () {
        this.actions.forEach(function (action) {
            action.update();
        });
    };
    actions.simultaneous.prototype.done = function () {
        return this.actions.every(function (a) { return a.done(); });
    };
})();
