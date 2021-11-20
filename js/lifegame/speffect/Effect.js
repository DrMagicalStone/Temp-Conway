// import { entity } from "../../entity/entity"
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Effect = void 0;
    class Effect {
        constructor(name, action, duration_in_tick) {
            this.name = name;
            this.action = action;
            this.duration = duration_in_tick;
        }
    }
    exports.Effect = Effect;
});
