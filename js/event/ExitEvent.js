define(["require", "exports", "js/event/event"], function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExitEvent = void 0;
    /**
     * Save user's state before exit
     */
    class ExitEvent extends event_1.event {
        constructor() {
            super("exit", undefined);
        }
    }
    exports.ExitEvent = ExitEvent;
});
