define(["require", "exports", "pages/game/moveconverter", "pages/game/game_clock"], function (require, exports, moveconverter_1, game_clock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSubscribers = exports.releaseKey = exports.pressKey = exports.isGamePaused = exports.resumeGame = exports.pauseGame = void 0;
    function pauseGame(callback = undefined) {
        game_clock_1.game_clock.setTimeRate(0);
        $("body")[0].innerHTML = $("body")[0].innerHTML + " ";
        $("#pause_background, #pause_tip").trigger("click", resumeGame);
        if (callback !== undefined) {
            callback();
        }
        return;
    }
    exports.pauseGame = pauseGame;
    function resumeGame(callback = undefined) {
        game_clock_1.game_clock.setTimeRate(1);
        $("#pause_background, #pause_tip").remove();
        if (callback !== undefined) {
            callback();
        }
        return;
    }
    exports.resumeGame = resumeGame;
    function isGamePaused() {
        return game_clock_1.game_clock.getCurrentTimeRate() === 0;
    }
    exports.isGamePaused = isGamePaused;
    function pressKey(event) {
        if (needPauseFromUserKeybooard(event)) {
            if (isGamePaused()) {
                resumeGame();
            }
            else {
                pauseGame();
            }
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
