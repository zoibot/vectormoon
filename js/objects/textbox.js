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

        var _this = this;

        $(document).keyup(function (e) { _keypress(_this, e); });
    };

    function _keypress(_this, e) {
        var code = e.keyCode;
        if (code === 32) {
            if (!_this.to_place) {
                _this.dismiss();
            }
            if (_this.waiting) {
                _this.lines = [];
                _this.waiting = false;
            } else {
                // skip ahead 
                _this.placed += _this.to_place;
                _this.to_place = "";
            }
        }
    }

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
                high = split;
            } else if (measured_width < width) {
                low = split;
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
        return low;
    }

    textbox.prototype.update = function () {
        if (this.to_place && !this.waiting && !this.dismissed) {
            if (this.frame_counter === 0) {
                this.frame_counter = 1; // TODO config
                var next_char = this.to_place.charAt(0);
                this.to_place = this.to_place.substr(1);
                this.placed += next_char;
            }
            this.frame_counter--;
        }

    };

    textbox.prototype.draw = function (ctx) {
        if (this.dismissed) {
            return;
        }
        // TODO make this not hardcoded and move into graphics?
        ctx.save();
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.strokeRect(10, 460, 780, 130);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(10, 460, 780, 130);
        ctx.fillStyle = "rgb(255,255,255)";
        this.lines.forEach(function (line, index) {
            ctx.fillText(line, 30, 490 + index * 30);
        });
        while (ctx.measureText(this.placed).width > 740)
        {
            var line_split = get_line(this.placed, 740, ctx);
            var new_line = this.placed.substr(0, line_split);
            if (this.lines.length >= 3)
            {
                this.waiting = true;
                this.to_place += this.placed.substr(line_split);
                this.placed = "";
            }
            else
            {
                this.placed = this.placed.substr(line_split);
            }
            this.lines.push(new_line);
        }
        ctx.fillText(this.placed, 30, 490 + this.lines.length * 30);
        ctx.restore();
    };

    textbox.prototype.dismiss = function () {
        this.dismissed = true;
    }

})();
