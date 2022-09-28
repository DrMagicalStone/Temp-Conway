define(["require", "exports", "js/util/gameclock/pre-definedClock", "js/util/gameclock/AdjustableClock"], function (require, exports, pre_definedClock_1, AdjustableClock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.game_clock = void 0;
    exports.game_clock = new AdjustableClock_1.AdjustableClock(pre_definedClock_1.system_clock, 1);
});
