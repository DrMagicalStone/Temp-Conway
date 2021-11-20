define(["require", "exports", "js/event/eventbus", "js/event/TickStopEvent", "pages/game/moveconverter"], function (require, exports, eventbus_1, TickStopEvent_1, moveconverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSubscribers = exports.releaseKey = exports.pressKey = exports.resumeGame = exports.pauseGame = void 0;
    function pauseGame(callback) {
        eventbus_1.event_bus.post(new TickStopEvent_1.TickStopEvent(), undefined, callback);
        return;
    }
    exports.pauseGame = pauseGame;
    function resumeGame(callback) {
        eventbus_1.event_bus.post(new TickStopEvent_1.TickStopEvent(), undefined, callback);
        return;
    }
    exports.resumeGame = resumeGame;
    function pressKey(event) {
        if (needPauseFromUserKeybooard(event)) {
            pauseGame(() => { });
        }
        else {
            moveconverter_1.downKey(event);
        }
    }
    exports.pressKey = pressKey;
    function releaseKey(event) {
        moveconverter_1.upKey(event);
    }
    exports.releaseKey = releaseKey;
    function needPauseFromUserKeybooard(event) {
        let should_pause_key = [" ", "Escape"];
        if (should_pause_key.indexOf(event.key) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    function registerSubscribers() {
        $(document).on("keydown", pressKey);
        $(document).on("keyup", releaseKey);
    }
    exports.registerSubscribers = registerSubscribers;
});
