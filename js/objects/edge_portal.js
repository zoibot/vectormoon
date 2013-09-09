(function () {
    var edge_portal = window.objects.edge_portal = function (edge, destination_map) {
        this.edge = edge;
        this.destination_map = destination_map;
    };

    edge_portal.prototype.update = function () {};
    edge_portal.prototype.draw = function () {};

    edge_portal.prototype.hits = function (x, y) {
        if (this.edge === "top" && y < 10) return true;
        else if (this.edge === "bottom" && y > 590) return true;
        if (this.edge === "left" && x < 10) return true;
        else if (this.edge === "right" && x > 640) return true;
        else return false;
    };

    edge_portal.prototype.handle = function (ev) {
        if (ev.type === "touch") {
            ev.source.location = this.destination_map;
            world.load_stage(this.destination_map);

            switch (this.edge) {
                case "top":
                    ev.source.y = 585;
                    break;
                case "bottom":
                    ev.source.y = 15;
                    break;
                case "left":
                    ev.source.x = 635;
                    break;
                case "right":
                    ev.source.x = 15;
                    break;
            }
        }
    };
})();
