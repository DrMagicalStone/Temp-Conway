define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TickBeginEvent = void 0;
    /**
     * Begin game ticking (game loop).
     */
    class TickBeginEvent extends event_1.event {
        constructor() {
            super("tick_begin", default_action);
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.TickBeginEvent = TickBeginEvent;
    var default_action;
});
