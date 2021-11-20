define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NewGameEvent = void 0;
    /**
     * While the player can go next stage, or dead, this event is called.
     */
    class NewGameEvent extends event_1.event {
        constructor() {
            super("game_new", default_action);
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.NewGameEvent = NewGameEvent;
    var default_action;
});
