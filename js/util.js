Array.prototype.last = function () {
    return this[this.length-1];
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index !== -1) {
        this.splice(index, 1);
    }
};

Number.prototype.mod = function (n) {
    return ((this%n)+n)%n;
};

function clamp(val, max) {
    if (val < 0) return 0;
    if (val > max) return max;
    return val;
}

$(function () {
    // TODO make a class
    $debug = $("<div></div>").appendTo(document.body);
    watches = {};
});

function watch(name, val)
{
    var $watch = watches[name] = watches[name] || $("<div>").appendTo($debug);
    $watch.text(name + ": " + val);
}

