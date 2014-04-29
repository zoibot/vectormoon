(function () {

objects = function () {
    o = {};
    obj = {};
    o.construct_object = function (description) {
        return create_from_args(window.objects, description);
    }
    return o;
}();

})();
