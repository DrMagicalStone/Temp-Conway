define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatternLib = void 0;
    /**
     * All legal patterns from patternLib.json will be loaded into con-way.patternLib.
     * The method genPattern needs a string as the pattern's name and generate that pattern into the grid.
     * All patterns' name will be made one item of con-way.patternLib.
     */
    exports.PatternLib = new Map();
    function onInit() {
        var data = JSON.parse(sessionStorage.getItem("patternLib"));
        for (var key in data) {
            var original_pattern = data[key];
            let pattern = [];
            for (var dy = 0; dy < original_pattern.length; dy++) {
                var o_line = original_pattern[dy];
                pattern[dy] = [];
                for (var dx = 0; dx < o_line.length; dx++) {
                    pattern[dy][dx] = (o_line[dx] != 0);
                }
            }
            function gen(grid, x, y) {
                for (var dy = 0; dy < pattern.length; dy++) {
                    var line = pattern[dy];
                    for (var dx = 0; dx < line.length; dx++) {
                        grid.set(x + dx, y - dy, line[dx]);
                    }
                }
            }
            ;
            exports.PatternLib.set(key, gen);
        }
    }
    onInit();
});
