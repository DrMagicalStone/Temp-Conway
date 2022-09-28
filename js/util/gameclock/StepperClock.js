define(["require", "exports", "js/util/gameclock/clock", "node_modules/typescript-collections/dist/lib/Heap"], function (require, exports, clock_1, Heap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RelativeClock = void 0;
    class RelativeClock extends clock_1.clock {
        constructor(start_time) {
            super(undefined);
            this.timeout_tasks = new Heap_1.default((a, b) => a.invoke_time - b.invoke_time);
            this.interval_tasks = new Heap_1.default();
            this.last_id = 0;
            this.current_time = start_time;
        }
        step(interval) {
        }
        getTime() {
            return this.current_time;
        }
        setTimeout(task, timeout = 0, ...args) {
            let id = ++this.last_id;
            let call_time = this.current_time + timeout;
            this.timeout_tasks.add({ id: id, task: task, invoke_time: call_time, args: args });
            return id;
        }
        clearTimeout(task_id) {
        }
        setInterval(task, interval = 0, ...args) {
            return 0;
        }
        clearInterval(task_id) {
        }
    }
    exports.RelativeClock = RelativeClock;
});
