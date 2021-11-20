define(["require", "exports", "js/entity/Player", "pages/game/the_space"], function (require, exports, Player_1, the_space_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.engine_vector = exports.the_player = void 0;
    exports.engine_vector = {
        x_from_key: 0,
        y_from_key: 0,
        x_from_screen: 0,
        y_from_screen: 0,
        mouse_down: false
    };
    exports.the_player = new Player_1.Player(exports.engine_vector, the_space_1.the_space);
    console.log("the_player initialized");
});
