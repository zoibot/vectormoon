(function () {
    var _keys = {};
    $(document).keydown(function (e) {
        _keys[e.keyCode] = true;
    });
    $(document).keyup(function (e) {
        _keys[e.keyCode] = false;
    });
    keyboard = {
        pressed: function (keycode) {
            return !!_keys[keycode];
        }
    };
})();
