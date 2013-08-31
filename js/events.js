(function () {
    events = {
        touch: function (x, y, source) {
            this.type = "touch";
            this.x = x;
            this.y = y;
            this.source = source;
            return this;
        },
        hit: function (x, y, source) {
            this.type = "hit";
            this.x = x;
            this.y = y;
            this.source = source;
            return this;
        },
        use: function (item, x, y, source) {
            this.type = item;
            this.x = x;
            this.y = y;
            this.source = source;
        }
    };
})();
