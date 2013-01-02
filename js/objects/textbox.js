(function ()
{
    var textbox = window.objects.textbox = function (text, choices)
    {
        this.placed = "";
        this.to_place = text;
        this.lines = [];
        this.frame_counter = 0;
        this.text = text;
        this.next_word;
        this.waiting = false;
    };

    function get_line(text, width, ctx) {
        if (ctx.measureText(text.substr(0, split)).width <= width)
        {
            return text.length;
        }
        var high = text.length;
        var split = text.length-1;
        var low = 0;
        while (true) {
            var measured_width = ctx.measureText(text.substr(0, split)).width;
            if (measured_width > width) {
                low = split;
            } else if (measured_width < width) {
                high = split;
            } else {
                return split;
            }

            if (high - low <= 2)
            {
                break;
            }
            split = low + ((high-low)/2);
        }
        for (var i = low; i < high; i++) {
            var measured_width = ctx.measureText(text.substr(0, i)).width;
            if (measured_width > width) {
                return i - 1;
            }
        }
    }

    textbox.prototype.update = function () {
        if (this.to_place && !this.waiting) {
            if (this.frame_counter === 0) {
                this.frame_counter = 1; // TODO config
                var next_char = this.to_place.charAt(0);
                this.to_place = this.to_place.substr(1);
                this.placed += next_char;
            }
            this.frame_counter--;
        }

        if (keyboard.pressed(32)) {
            if (this.waiting) {
                this.waiting = false
            } else {
                // skip ahead 
            }
        }
    };

    textbox.prototype.draw = function (ctx) {
        // TODO make this not hardcoded
        ctx.save();
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.strokeRect(10, 460, 780, 130);
        ctx.fillStyle = "rgb(255,255,255)";
        this.lines.forEach(function (line, index) {
            ctx.fillText(line, 30, 490 + index * 30);
        });
        if (ctx.measureText(this.placed).width > 740)
        {
            var new_line = this.placed.substr(0, this.placed.length-1);
            if (this.lines.length >= 3)
            {
                // TODO should wait for user
                this.waiting = true;
            }
            else
            {
                this.lines.push(new_line);
                this.placed = this.placed.substr(this.placed.length-1);
            }
        }
        ctx.fillText(this.placed, 30, 490 + this.lines.length * 30);
        ctx.restore();
    };

})();
