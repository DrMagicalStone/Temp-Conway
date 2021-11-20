define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TickStopEvent = void 0;
    /**
     * Stop game ticking (game loop).
     */
    class TickStopEvent extends event_1.event {
        constructor() {
            super("tick_stop", default_action);
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.TickStopEvent = TickStopEvent;
    var default_action;
});
