define(["require", "exports", "./LoopGrid"], function (require, exports, LoopGrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DoubleGrid = void 0;
    /**
     * A modified loopgrid. It has two looping spaces. One is its facial space, and the other is a hidden space.
     * By invoking its methods extended from loopgrid, you can modify its facial space.
     * By invoking its own methods which are penetrated versions of loopgrid's methods,
     * you can modify its hidden space. A constant rule is: you SHOULD NOT get any data from or modify its hidden space.
     * By invoking the flip method, you can switch its facial and hidden space.
     */
    class DoubleGrid extends LoopGrid_1.LoopGrid {
        constructor(x, y, factory, horizonal_loop, vertical_loop) {
            super(x, y, factory, horizonal_loop, vertical_loop);
            this.hidden_array = [];
            for (var dx = 0; dx < x; dx++) {
                var column = [];
                this.hidden_array[dx] = column;
                for (var dy = 0; dy < y; dy++) {
                    column[dy] = factory(this, dx, dy);
                }
            }
        }
        flip() {
            var mid = this.inner_array;
            this.inner_array = this.hidden_array;
            this.hidden_array = mid;
        }
        setPenetrated(x, y, data) {
            if (x < 0 || this.width <= x) {
                if (!this.horizontal_loop) {
                    return;
                }
                else {
                    x = x % this.width;
                    if (x < 0) {
                        x += this.width;
                    }
                }
            }
            if (y < 0 || this.height <= y) {
                if (!this.vertical_loop) {
                    return;
                }
                else {
                    y = y % this.height;
                    if (y < 0) {
                        y += this.height;
                    }
                }
            }
            this.hidden_array[x][y] = data;
        }
        getAndSetPenetrated(x, y, data) {
            if (x < 0 || this.width <= x) {
                if (!this.horizontal_loop) {
                    return this.initialize(this, x, y);
                }
                else {
                    x = x % this.width;
                    if (x < 0) {
                        x += this.width;
                    }
                }
            }
            if (y < 0 || this.height <= y) {
                if (!this.vertical_loop) {
                    return this.initialize(this, x, y);
                }
                else {
                    y = y % this.height;
                    if (y < 0) {
                        y += this.height;
                    }
                }
            }
            this.hidden_array[x][y] = data;
            return this.inner_array[x][y];
        }
        forEachPenetrated(factory) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.hidden_array[x][y] = factory(this, x, y);
                }
            }
        }
    }
    exports.DoubleGrid = DoubleGrid;
});
