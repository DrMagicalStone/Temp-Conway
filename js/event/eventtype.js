define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eventtype = void 0;
    class eventtype {
        constructor(type_name, cancelable, detainable, eventSource) {
            this.type_name = type_name;
            this.cancelable = cancelable;
            this.detainable = detainable;
            this.eventSource = eventSource;
            this.nonSourceLaunchable = eventSource !== undefined;
        }
    }
    exports.eventtype = eventtype;
});
