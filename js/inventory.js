(function () {
    var inventory_contents = [];
    current_x = current_y = 0;

    inventory = {
        add_item: function (item) {
            inventory_contents.push(item);
        },
        remove_item: function (item) {
            inventory_contents.remove(item);
        },
        init: function () {

        }
    };
});
