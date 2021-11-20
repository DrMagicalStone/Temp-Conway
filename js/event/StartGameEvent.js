define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartGameEvent = void 0;
    /**
     * Begin game ticking (game loop).
     */
    class StartGameEvent extends event_1.event {
        constructor(sst, the_stage) {
            super("game_start", default_action);
            this.sst = sst;
            this.the_stage = the_stage;
        }
        static setDefaultAction(action) {
            default_action = action;
        }
    }
    exports.StartGameEvent = StartGameEvent;
    var default_action;
});
