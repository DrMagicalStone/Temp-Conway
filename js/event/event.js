define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.event = void 0;
    /**
     * An event object is acts as an event.
     *
     * Events can be anything, but it must clearly happens inside its action.
     *
     * Event happend when its action is invoked but still didn't returned.
     *
     * Some abstract types of events, like events of periods (onload, onfinish, etc.),
     * have no action (which means their actions are empty or just logs).
     */
    class event {
        constructor(name, action) {
            this.name = name;
            this.defaultAction = this.currentAction = action;
        }
        getName() {
            return this.name;
        }
        getDefaultAction() {
            return this.defaultAction;
        }
        getCurrentAction() {
            return this.currentAction;
        }
        setCurrentAction(action) {
            this.currentAction = action;
        }
        resetCurrentAction() {
            this.currentAction = this.defaultAction;
        }
    }
    exports.event = event;
});
