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

function hash32shift(key) {
    key = key | 0;
    key = -key + (key << 15);
    key = key ^ (key >> 12);
    key = key + (key << 2);
    key = key ^ (key >> 4);
    key = key * 2057;
    key = key ^ (key >> 16);
    return key;
}

function noise(x, y, seed) {
    return hash32shift(seed+hash32shift(x+hash32shift(y)));
}

$(function () {
    // TODO make a class
    $debug = $("<div></div>").appendTo(document.body);
    watches = {};
});

function watch(name, val)
{
    var $watch = watches[name] = watches[name] || $("<div>", { class: "watch" }).appendTo($debug);
    $watch.text(name + ": " + val);
}

function create_from_args(type, args) {
        var name = args[0];
        var args = args.slice(1);
        if(typeof type[name] !== 'function') {
            throw 'crap no object '+name;
        }
        // Hacks to new up arbitrary objects
        var obj = function () {};
        var constructor = type[name];
        obj.prototype = constructor.prototype; 
        var instance = new obj;
        constructor.apply(instance, args)
        return instance;
}

