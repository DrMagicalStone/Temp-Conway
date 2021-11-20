define(["require", "exports", "js/foe_gen/mode/mode"], function (require, exports, mode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScanningMode = void 0;
    class ScanningMode extends mode_1.mode {
        constructor(name, interval, data, patterns, succ) {
            super(name, interval, data, patterns, succ);
            this.offset = data.offset;
            this.initial_place = data.initial_place;
            this.current_place = data.initial_place;
        }
        place() {
            this.current_place = this.current_place + this.offset;
            if (this.current_place > 1) {
                this.current_place -= 1;
            }
            else {
                if (this.current_place < 0) {
                    this.current_place += 1;
                }
            }
            return this.current_place;
        }
        finish() {
            this.current_place = this.initial_place;
            return super.finish();
        }
    }
    exports.ScanningMode = ScanningMode;
});
