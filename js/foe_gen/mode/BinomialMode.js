define(["require", "exports", "js/foe_gen/mode/mode"], function (require, exports, mode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinomialMode = void 0;
    /**
     * Use binomial curve to calculate the position of generate place of enermy
     */
    class BinomialMode extends mode_1.mode {
        constructor(name, interval, data, patterns, succ) {
            super(name, interval, data, patterns, succ);
            this.expectation = data.expectation;
            this.deviation = data.deviation;
        }
        place() {
            return this.expectation + (this.place0() - 0.5) * this.deviation;
        }
        place0() {
            var u = 0, v = 0;
            while (u === 0) {
                u = Math.random();
            }
            while (v === 0) {
                v = Math.random();
            }
            let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            num = num / 10.0 + 0.5;
            if (num > 1 || num < 0) {
                return this.place0();
            }
            else {
                return num;
            }
        }
    }
    exports.BinomialMode = BinomialMode;
});
