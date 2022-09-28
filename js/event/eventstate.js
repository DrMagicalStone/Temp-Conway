define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detainablestate = exports.callbackedstate = exports.judgementstate = exports.eventstate = void 0;
    class eventstate {
        constructor(event) {
            this.event = event;
        }
        getEvent() {
            return this.event;
        }
    }
    exports.eventstate = eventstate;
    /**
     * Use these classes's instances to cancel or detain events.
     */
    class judgementstate extends eventstate {
        constructor(event) {
            super(event);
        }
        isCanceled() {
            return this.canceled;
        }
        setCanceled(canceled) {
            this.canceled = canceled;
        }
    }
    exports.judgementstate = judgementstate;
    class callbackedstate extends eventstate {
        constructor(event, callback = undefined) {
            super(event);
            this.callback = callback;
        }
        doAction() {
            this.callback();
        }
    }
    exports.callbackedstate = callbackedstate;
    class detainablestate extends callbackedstate {
        constructor(event, callback = undefined) {
            super(event, callback);
            /**
             * Detained times.
             */
            this.detainedTimes = 0;
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
                super.doAction();
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
