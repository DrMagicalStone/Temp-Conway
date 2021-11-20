define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stages_names = exports.Stage = void 0;
    /**
     * Complete stage object.
     */
    class Stage {
        constructor(name, bgm_path, bkimg_path, length, gen_method) {
            this.name = name;
            this.bgm = new Audio("../../bgm/" + bgm_path);
            this.bkimg = new Image();
            if (bkimg_path != null) {
                this.bkimg.src = "../../img/" + bkimg_path;
            }
            this.length = length;
            this.gen_method = gen_method; // TODO use name to load
        }
    }
    exports.Stage = Stage;
    // Load existed stage name from stageLib.json, and create stageLib to save these stages
    exports.stages_names = JSON.parse(sessionStorage.getItem("stageLib")).stages;
    console.log(exports.stages_names);
});
