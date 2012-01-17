load_config = function () {
    $.getJSON("config.json");
}

game = function() {
    g = {};
    g.init = function () {
        graphics.init();
        $.getJSON("config.json", function (cfg) {
            g.config = cfg;
            world.load_stage(g.config.firststage);
            g.gameloop();
        });
    };
    g.gameloop = function () {
        world.update();
        graphics.draw(world.objects);
        graphics.update();
        // run as fast as possible, but don't overflow the stack
        //setTimeout(function () { g.gameloop(); }, 0);
    }
    return g;
}();

$(document).ready(function () {
    game.init();
});
