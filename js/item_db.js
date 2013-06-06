item_db = (function () {
    i = {};
    var db = {};
    i.loaded = jQuery.Deferred();
    i.populate = function ()
    {
        return $.getJSON("items/itemsdb.json", function (items)
        {
            for (var i = 0; i < items.length; i++)
            {
                db[items[i].id] = items[i];
            }
        });
    };
    i.lookup_item = function (item_id)
    {
        if (item_id in db)
        {
            return db[item_id];
        }
        else
        {
            // explode
        }
    };
    return i;
})();
