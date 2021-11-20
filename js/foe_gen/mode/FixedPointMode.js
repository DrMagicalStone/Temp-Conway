define(["require", "exports", "js/foe_gen/mode/mode"], function (require, exports, mode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FixedPointMode = void 0;
    /**
     * Put patterns currectly at the fixed point.
     */
    class FixedPointMode extends mode_1.mode {
        constructor(name, interval, data, patterns, succ) {
            super(name, interval, data, patterns, succ);
            this.index = 0;
            this.plan = data;
        }
        place() {
            if (this.index < this.plan.length) {
                return this.plan[this.index];
            }
        }
    }
    exports.FixedPointMode = FixedPointMode;
});
