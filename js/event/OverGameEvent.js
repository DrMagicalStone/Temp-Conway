define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OverGameEvent = void 0;
    /**
     * While the player can go next stage, or dead, this event is called.
     */
    class OverGameEvent extends event_1.event {
        constructor() {
            super("game_over", default_action);
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.OverGameEvent = OverGameEvent;
    var default_action;
});
