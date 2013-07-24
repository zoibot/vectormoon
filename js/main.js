(function () {

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            function (f) { setTimeout(f, 32); };
states = [];

game = {
    // dealing with state
    push_state: function(state) {
        var last = states.last();
        last && last.end();
        states.push(state);
        states.last().init(game);
        states.last().start();
    },
    pop_state: function() {
        states.pop().end();
        states.last().start();
    },

    // saving/loading
    save_state: {},
    load_initial_save: function () {
        var deferred = $.Deferred();
        var _this = this;
        $.getJSON("initial_save.json").done(function (save_state) {
            _this.save_state = save_state;
            deferred.resolve();
        });
        return deferred.promise();
    },
    load_save: function (playername) {
    },

    // game structure
    init: function () {
        graphics.init();
        game.push_state(menu);
        requestAnimationFrame(function (time) { game.gameloop(time) });
    },
    gameloop: function (time) {
    	graphics.update();
        keyboard.disabled = true;
        for (var i = 0; i < states.length - 1; i++)
        {
            states[i].update();
        }
        keyboard.disabled = false;
        states.last().update();

        requestAnimationFrame(function (time) { game.gameloop(time) });
    }
};
})();

$(document).ready(function () {
    game.init();
});
