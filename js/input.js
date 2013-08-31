(function () {
    var _keys = {};
    $(document).keydown(function (e) {
        _keys[e.keyCode] = true;
    });
    $(document).keyup(function (e) {
        _keys[e.keyCode] = false;
    });
    keyboard = {
        disabled: false,
        disabled_keys: [],
        pressed: function (keycode) {
            return !!_keys[keycode] && !this.disabled && jQuery.inArray(keycode, this.disabled_keys) === -1;
        }
    };
})();
