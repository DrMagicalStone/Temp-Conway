define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.savestate = void 0;
    class savestate {
        constructor(name = "User", stage = "meadow", score = 0) {
            if (name === null) {
                this.name = "User";
            }
            else {
                this.name = name;
            }
            if (stage === null) {
                this.stage = "meadow";
            }
            else {
                this.stage = stage;
            }
            this.score = score;
        }
    }
    exports.savestate = savestate;
});
