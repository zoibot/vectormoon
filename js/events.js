(function () {
    events = {
        touch: function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        hit: function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
    };
})();
