define(["require", "exports", "js/entity/GolSpace", "pages/game/canvas"], function (require, exports, GolSpace_1, canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.the_space = void 0;
    function initializeSpace() {
        var width = Math.round(canvas_1.canvas.width / canvas_1.block_length);
        var height = Math.round(canvas_1.canvas.height * 2 / canvas_1.block_length);
        let count = 1;
        exports.the_space = new GolSpace_1.GolSpace({ x_pos: 0, y_pos: 0, x_velocity: 0, y_velocity: 0 }, { width: width, height: height, absolute_width: canvas_1.canvas.width, absolute_height: canvas_1.canvas.height }, { min_x: 0, max_x: width, min_y: Math.round(height / 4), max_y: Math.round(height * 3 / 4) + 1 }, undefined, canvas_1.canvas.getContext("2d"), (that) => { if (count === 10) {
            count = 1;
            return GolSpace_1.rules.scroll;
        }
        else {
            count++;
            return GolSpace_1.rules.b3s23;
        } });
    }
    initializeSpace();
    console.log("the_space initialized");
});
