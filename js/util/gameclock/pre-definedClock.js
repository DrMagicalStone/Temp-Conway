define(["require", "exports", "js/util/gameclock/clock", "js/util/gameclock/FixedClock"], function (require, exports, clock_1, FixedClock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.frozen_clock = exports.invert_system_clock = exports.system_clock = void 0;
    class systemclock extends clock_1.clock {
        getTime() {
            return new Date().getTime() / 1000;
        }
        setTimeout(task, timeout = 0, ...args) {
            let milli_timeout = Math.round(timeout * 1000);
            if (Number.isFinite(milli_timeout)) {
                return setTimeout(task, milli_timeout, ...args);
            }
            else {
                return undefined;
            }
        }
        clearTimeout(fid) {
            clearTimeout(fid);
        }
        setInterval(task, interval = 0, ...args) {
            let milli_interval = Math.round(interval * 1000);
            if (Number.isFinite(milli_interval) && (milli_interval >= 0)) {
                return setInterval(task, milli_interval, ...args);
            }
            else {
                return undefined;
            }
        }
        clearInterval(fid) {
            clearInterval(fid);
        }
    }
    exports.system_clock = new systemclock(undefined);
    {
        let negate_function = (source) => -source;
        exports.invert_system_clock = new FixedClock_1.FixedClock(exports.system_clock, negate_function, negate_function);
    }
    {
        let zero_function = (source) => 0;
        let invert_zero_function = (source) => source / 0;
        exports.frozen_clock = new FixedClock_1.FixedClock(exports.system_clock, zero_function, invert_zero_function);
    }
});
