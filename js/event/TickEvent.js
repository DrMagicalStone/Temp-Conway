define(["require", "exports", "js/event/event", "pages/game/the_space"], function (require, exports, event_1, the_space_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TickEvent = void 0;
    /**
     * News and posts it every tick. (- _- )
     */
    class TickEvent extends event_1.event {
        constructor(current_time = new Date().getTime() / 1000) {
            super("tick", (ev, space) => {
                the_space_1.the_space.tick(current_time);
            });
            this.current_time = current_time;
        }
        getCurrentTime() {
            return this.current_time;
        }
    }
    exports.TickEvent = TickEvent;
});
