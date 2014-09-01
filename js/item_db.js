item_db = (function () {
    i = {};
    var db = {};
    var sprites = {};
    i.loaded = jQuery.Deferred();
    i.populate = function ()
    {
        return $.getJSON("items/itemsdb.json", function (items)
        {
            for (var i = 0; i < items.length; i++)
            {
                db[items[i].id] = items[i];
            }
        }).fail(function (x, errortype, error) {
            console.log(errortype);
            console.log(error);
        });
    };
    i.lookup_item = function (item_id) {
        if (item_id in db) {
            return db[item_id];
        } else {
            // explode
        }
    };
    i.get_sprite = function (item_id) {
        if (!(item_id in sprites)) {
            sprites[item_id] = new graphics.sprite(db[item_id].sprite_name);
        }
        return sprites[item_id];
    };
    return i;
})();
