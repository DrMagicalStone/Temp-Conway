define(["require", "exports", "js/foe_gen/mode/mode"], function (require, exports, mode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleRandomMode = void 0;
    /**
     * Use simple random function to calculate the position of generate place of enermy
     */
    class SimpleRandomMode extends mode_1.mode {
        constructor(name, interval, data, patterns, succ) {
            super(name, interval, data, patterns, succ);
            this.expectation = data.expectation;
            this.deviation = data.deviation;
        }
        place() {
            return this.expectation + (Math.random() - 0.5) * this.deviation;
        }
    }
    exports.SimpleRandomMode = SimpleRandomMode;
});
