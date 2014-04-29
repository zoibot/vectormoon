(function () {
    // TODO make these more generic
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
        use: function (type, properties, x, y, source) {
            this.type = type;
            this.props = properties;
            this.x = x;
            this.y = y;
            this.source = source;
        }
    };
})();
