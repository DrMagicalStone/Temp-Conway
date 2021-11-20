define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoopGrid = void 0;
    /**
     * A virtual looping straight 2-dimensional space.
     * It contains its data by a normal 2d array, but you shouldn't access the array directly.
     * When accessing to it by its function, coordinates will be transformed to their modulus to its inner 2d array.
     * The factory function which the forEach method needs should looks like this: factory(this, x, y){ } and have return value,
     * because its return value will be the new value of that position.
     */
    class LoopGrid {
        constructor(x, y, factory, horizonal_loop, vertical_loop) {
            this.inner_array = new Array();
            this.width = x;
            this.height = y;
            this.initialize = factory;
            this.horizonal_loop = horizonal_loop;
            this.vertical_loop = vertical_loop;
            for (var dx = 0; dx < x; dx++) {
                var column = [];
                this.inner_array[dx] = column;
                for (var dy = 0; dy < y; dy++) {
                    column[dy] = factory(this, dx, dy);
                }
            }
        }
        getWidth() {
            return this.width;
        }
        getHeight() {
            return this.height;
        }
        set(x, y, data) {
            if (x < 0 || this.width <= x) {
                if (!this.horizonal_loop) {
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
            this.inner_array[x][y] = data;
        }
        getAndSet(x, y, data) {
            if (x < 0 || this.width <= x) {
                if (!this.horizonal_loop) {
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
            var re = this.inner_array[x][y];
            this.inner_array[x][y] = data;
            return re;
        }
        get(x, y) {
            if (x < 0 || this.width <= x) {
                if (!this.horizonal_loop) {
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
            return this.inner_array[x][y];
        }
        getPropoties() {
            return this.width, this.height;
        }
        forEach(factory) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.inner_array[x][y] = factory(this, x, y);
                }
            }
        }
    }
    exports.LoopGrid = LoopGrid;
});
