define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clock = void 0;
    class clock {
        constructor(reference) {
            this.reference = reference;
        }
        clearTimeout(task_id) {
            this.reference.clearTimeout(task_id);
        }
        clearInterval(task_id) {
            this.reference.clearInterval(task_id);
        }
    }
    exports.clock = clock;
});
