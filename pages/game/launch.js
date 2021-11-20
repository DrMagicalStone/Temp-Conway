define(["require", "exports", "pages/game/game_process", "pages/game/the_stage", "pages/game/game_process"], function (require, exports, game_process_1, the_stage, game_process) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function subscribeEvents() {
        the_stage.subscribeEvents();
        game_process.subscribeEvents();
    }
    /**
     * Entry of the game
     */
    /**
     *
     */
    game_process_1.initializeEventActions();
    console.log("event action initialized.");
    subscribeEvents();
    console.log("event subscriber initialized.");
    game_process_1.processBegin();
    console.log("process began.");
});
