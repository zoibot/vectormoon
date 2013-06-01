(function () {
// Background
var background = window.objects.background = function (pos, name, solid, sprite_str) {
    this.graphic = new graphics.sprite(sprite_str);
    this.loaded = this.graphic.loaded;
    this.x = pos[0];
    this.y = pos[1];
    this.solid = solid;
};

background.prototype.draw = function (ctx) {
    this.graphic.draw(ctx, this.x, this.y, 0, 'default');
};
background.prototype.update = function () {
};
background.prototype.hits = function (ex, ey) {
    return this.x === ex && this.y === ey;
};
background.prototype.contains = function (x, y)
{
    return this.graphic.contains(x, y, this.x, this.y, 0, 'default');
};

})();


