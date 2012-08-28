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
