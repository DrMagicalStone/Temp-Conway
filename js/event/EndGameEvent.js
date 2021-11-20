define(["require", "exports", "js/event/event", "js/event/eventbus", "js/event/VictoryGameEvent", "js/event/OverGameEvent"], function (require, exports, event_1, eventbus_1, VictoryGameEvent_1, OverGameEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndGameEvent = void 0;
    /**
     * While the player can go next stage, or dead, this event is called.
     */
    class EndGameEvent extends event_1.event {
        constructor(is_victory, sst, the_stage) {
            super("game_end", (g) => {
                if (is_victory) {
                    eventbus_1.event_bus.post(new VictoryGameEvent_1.VictoryGameEvent(), undefined, () => { });
                }
                else {
                    eventbus_1.event_bus.post(new OverGameEvent_1.OverGameEvent(), undefined, () => { });
                }
            });
        }
    }
    exports.EndGameEvent = EndGameEvent;
});
