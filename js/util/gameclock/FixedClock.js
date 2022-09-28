define(["require", "exports", "js/util/gameclock/clock"], function (require, exports, clock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FixedClock = void 0;
    class FixedClock extends clock_1.clock {
        constructor(source, transformation, invert_transformation) {
            super(source);
            this.transformation = transformation;
            this.invert_transformation = invert_transformation;
        }
        getTime() {
            return this.transformation(this.reference.getTime());
        }
        setTimeout(task, timeout = 0, ...args) {
            let current_time = this.reference.getTime();
            let interval = this.invert_transformation(current_time + timeout) - this.invert_transformation(current_time);
            return this.reference.setTimeout(task, interval, ...args);
        }
        setInterval(task, timeout = 0, ...args) {
            let current_time = this.reference.getTime();
            let interval = this.invert_transformation(current_time + timeout) - this.invert_transformation(current_time);
            return this.reference.setInterval(task, interval, ...args);
        }
    }
    exports.FixedClock = FixedClock;
});
