(function () {

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
        game.gameloop();
    },
    gameloop: function () {
    	graphics.update();
        states.forEach(function (s) { s.update(); });

        // run at a slow speed, and don't overflow the stack
        // this sucks but whatever
        setTimeout(function () { game.gameloop(); }, 32);
    }
};
})();

$(document).ready(function () {
    game.init();
});
