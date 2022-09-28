define(["require", "exports", "js/util/gameclock/clock"], function (require, exports, clock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdjustableClock = void 0;
    class AdjustableClock extends clock_1.clock {
        constructor(source, scale) {
            super(source);
            this.timeout_tasks = new Map();
            this.interval_tasks = new Map();
            this.current_scale = scale;
            this.last_recorded_time = 0;
            this.last_recorded_reference_time = source.getTime();
        }
        setTimeRate(scale) {
            let current_reference_time = this.reference.getTime();
            let current_time = (current_reference_time - this.last_recorded_reference_time) * this.current_scale + this.last_recorded_time;
            this.last_recorded_reference_time = current_reference_time;
            this.last_recorded_time = current_time;
            this.current_scale = scale;
            let new_timeout_tasks = new Map();
            for (let [task_id, value] of this.timeout_tasks) {
                let task_reference_timeout = (value.invoke_time - current_time) / scale;
                clearTimeout(task_id);
                task_id = this.reference.setTimeout((...args) => {
                    this.timeout_tasks.delete(task_id);
                    value.task.call(args);
                }, task_reference_timeout, value.args);
                new_timeout_tasks.set(task_id, value);
            }
            this.timeout_tasks = new_timeout_tasks;
            for (let [task_id_old, value] of this.interval_tasks) {
                let task_timeout = (value.interval - ((current_time - value.register_time) % value.interval)) / scale;
                super.clearInterval(task_id_old);
                let wrapped_task = (...args) => {
                    value.task.call(args);
                    let task_id_new = this.reference.setInterval(value.task, value.interval / scale, value.args);
                    this.interval_tasks.set(task_id_new, value);
                };
                let task_id_mid = this.reference.setTimeout((...args) => {
                    this.timeout_tasks.delete(task_id_mid);
                    wrapped_task(args);
                }, task_timeout, value.args);
                new_timeout_tasks.set(task_id_mid, {
                    task: wrapped_task, invoke_time: task_timeout, args: value.args
                });
            }
            this.interval_tasks.clear();
        }
        getTime() {
            let current_reference_time = this.reference.getTime();
            return (current_reference_time - this.last_recorded_reference_time) * this.current_scale + this.last_recorded_time;
        }
        setTimeout(task, timeout = 0, ...args) {
            let current_time = this.getTime();
            let task_timeout = timeout / this.current_scale;
            let invoke_time = current_time + timeout;
            let task_id = this.reference.setTimeout((...args) => {
                this.timeout_tasks.delete(task_id);
                task(args);
            }, task_timeout, args);
            this.timeout_tasks.set(task_id, { task: task, invoke_time: invoke_time, args: args });
            return task_id;
        }
        clearTimeout(task_id) {
            super.clearTimeout(task_id);
            this.timeout_tasks.delete(task_id);
        }
        setInterval(task, interval = 0, ...args) {
            let current_time = this.getTime();
            let reference_interval = interval / this.current_scale;
            let task_id = this.reference.setInterval(task, reference_interval, args);
            this.interval_tasks.set(task_id, { task: task, register_time: current_time, interval: interval, args: args });
            return task_id;
        }
        clearInterval(task_id) {
            super.clearInterval(task_id);
            this.interval_tasks.delete(task_id);
        }
        getCurrentTimeRate() {
            return this.current_scale;
        }
    }
    exports.AdjustableClock = AdjustableClock;
});
