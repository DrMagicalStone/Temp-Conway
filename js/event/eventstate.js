define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detainablestate = exports.judgementstate = void 0;
    /**
     * Use these classes's instances to cancel or detain events.
     */
    class judgementstate {
        constructor(event) {
            this.event = event;
        }
        getEvent() {
            return this.event;
        }
        isCanceled() {
            return this.canceled;
        }
        setCanceled(canceled) {
            this.canceled = canceled;
        }
    }
    exports.judgementstate = judgementstate;
    class detainablestate {
        constructor(event, callback = undefined) {
            /**
             * Detained times.
             */
            this.detainedTimes = 0;
            this.event = event;
            this.callback = callback;
        }
        getEvent() {
            return this.event;
        }
        /**
         * A simple asynchronous wait pipeline.
         * An event will do its action immediately when all its subscribers be invoked.
         * To delay the event's action, subscribers should "detain" the event.
         * And when a subscriber doesn't need action to be delayed, "release" it.
         * To detain the event, all subscribers can invoke the detain method, and the detainedTimes variable will increase.
         * When your code doesn't need to delay the event's action, invoke the release method to decrease the detainedTimes variable.
         * When all the subscribers released their detainment and when the event isn't canceled, the event will do its action.
         */
        detain() {
            this.detainedTimes++;
        }
        release() {
            if ((this.detainedTimes === 0) && (this.callback != undefined)) {
                this.callback();
            }
            else {
                this.detainedTimes--;
            }
        }
        doAction() {
            this.release();
        }
    }
    exports.detainablestate = detainablestate;
});
