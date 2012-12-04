(function () {
    events = {
        touch: function (x, y) {
            this.type = "touch";
            this.x = x;
            this.y = y;
            return this;
        },
        hit: function (x, y) {
            this.type = "hit";
            this.x = x;
            this.y = y;
            return this;
        }
    };
})();
