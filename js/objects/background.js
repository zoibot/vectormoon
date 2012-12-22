(function () {
// Background
var background = window.objects.background = function (pos, name, sprite_str) {
    this.graphic = new graphics.sprite(sprite_str);
    this.x = pos[0];
    this.y = pos[1];

};

background.prototype.draw = function (ctx) {
    this.graphic.draw(ctx, this.x, this.y, 0, 'default');
};
background.prototype.update = function () {
};
background.prototype.hits = function (ex, ey) {
    return this.x === ex && this.y === ey;
};

})();


