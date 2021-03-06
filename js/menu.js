(function () {
    main_menu = { "new game": new_game,
                  "load game": function () { switch_menu() },
                  "options": function () { switch_menu() } };

    function new_game() {
        game.load_initial_save().then(function () { 
            game.push_state(world);
        });
    }
    
    options_menu = { "back": up }
    
    function load_game_menu() {
        return { "back": up }
    }
    
    var cur_game;
    var cur_menus = [];
    var cur_option = 0;
    var last_move = 0;
    var option_text = [];
    var active = false;

    function switch_menu() {
        cur_menus.append(menu);
        start();
    }

    function up() {
        cur_menus.pop();
        start();
    }

    function init(game) {
        current_game = game;
        cur_menus.push(main_menu);
    }

    function start() {
        active = true;
        option_text = [];
        cur_option = 0;
        y = 400;
        for (var key in cur_menus[cur_menus.length-1]) {
            option_text.push(new graphics.text(key, 100, y, null, null, "20pt arial"));
            y += 40;
        }
        select(0);
        $(document).keyup(_keypress);
    }

    function end() {
        active = false;
        cur_menus = [];
        option_text = [];
        cur_option = 0;
        $(document).unbind("keyup", _keypress);
    }

    function select(option) {
        option_text[cur_option].color = [255,255,255,255];
        cur_option = option;
        option_text[cur_option].color = [0,255,0,255];
    }

    function _keypress(ev) {
        if (ev.keyCode === 38) {
            select((cur_option - 1).mod(option_text.length));
        } else if (ev.keyCode === 40) {
            select((cur_option + 1).mod(option_text.length));
        } else if (ev.keyCode === 13) {
            var menu = cur_menus.last();
            menu[Object.keys(menu)[cur_option]]();
        }
    }

    function update() {
        if (!active) return; 
        var d = new Date().getTime();
        graphics.draw(option_text);
    }

    menu = {
        "init": init,
        "start": start,
        "end": end,
        "update": update
    };

})();
