define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VictoryGameEvent = void 0;
    /**
     * While the player can go next stage, or dead, this event is called.
     */
    class VictoryGameEvent extends event_1.event {
        constructor() {
            super("game_victory", default_action);
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.VictoryGameEvent = VictoryGameEvent;
    var default_action;
});
