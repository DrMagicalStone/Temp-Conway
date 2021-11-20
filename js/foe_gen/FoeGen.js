define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FoeGen = void 0;
    /**
     *
     */
    class FoeGen {
        constructor() {
            this.initialized = false;
            this.modes = [];
            this.invokeTimes = 0;
        }
        bind(mode, duration, weight) {
            if (this.initialized) {
                return;
            }
            this.modes.push({
                mode: mode,
                gen_limit: duration,
                interval: mode.getInterval(),
                top: weight + ((this.modes[this.modes.length - 1] || {}).top || 0),
                weight: weight
            });
        }
        finish(space) {
            this.space = space;
            this.height = this.space.getHeight() - 1;
            this.initialized = true;
            this.currentMode = this.modes[0];
        }
        /**
         * One tick is the minimum time unit of the game.
         *
         * @param {event} ev The event
         */
        tick(ev) {
            if (this.currentMode === undefined) {
                console.log("Undefined interval");
            }
            // When "tick" function done "interval" times
            if (this.invokeTimes % this.currentMode.interval === 0) {
                var mode = this.currentMode.mode;
                // Init postion and gen func, by getting two return values from place()
                var position = mode.place();
                var currentPattern = mode.getPattern();
                currentPattern(this.space, Math.round(position * this.space.getWidth()), this.height);
                // If reach the max limit of generation in one mode
                if (this.invokeTimes == this.currentMode.gen_limit) {
                    // Tell the next mode to change
                    var parameter = mode.finish();
                    var currentMode;
                    switch (typeof parameter) {
                        // Using weight, choose next mode
                        case "undefined":
                            var random = Math.random() * this.modes[this.modes.length - 1].top;
                            for (var theMode of this.modes) {
                                if (random < theMode.top) {
                                    currentMode = theMode;
                                    break;
                                }
                            }
                            break;
                        // Change to the mode in the object
                        case "object":
                            // If it is array, choose from it randomly
                            if (Array.isArray(parameter)) {
                                var totalWeight = 0.0;
                                for (var i of parameter) {
                                    totalWeight += i.weight;
                                }
                                for (var i of parameter) {
                                    if (Math.random() < i.weight / totalWeight) {
                                        currentMode = i;
                                        break;
                                    }
                                    else {
                                        totalWeight -= i.weight;
                                    }
                                }
                            }
                            // If not array, it will be the next mode
                            else {
                                currentMode = parameter;
                            }
                            break;
                    }
                    this.currentMode = currentMode;
                    this.invokeTimes = 0;
                }
            }
            this.invokeTimes++;
        }
        /**
         * A tool function. Initialize a foegen from input data (usually loaded from a JSON file).
         * @param structs The fixed structured array which contains information of each mode of the foegen.
         * @param grid The loopgrid (usually doublegrid) where the foegen generate gol structs.
         * @param cb The callback function which is called when the foegen is completely initialized.
         */
        static loadFoegenFromJSON(structs, grid, cb) {
            let mode_classes = new Map();
            let the_foegen = new FoeGen();
            let remaining_items = 1;
            for (let struct of structs) {
                let type = struct.type;
                if (mode_classes.has(type)) {
                    let mode_class;
                    mode_class = mode_classes.get(type);
                    the_foegen.bind(new mode_class(struct.name, struct.interval, struct.data, struct.pattern, struct.succ), struct.duration, struct.weight);
                }
                else {
                    remaining_items++;
                    new Promise((resolve_1, reject_1) => { require(["./mode/" + type], resolve_1, reject_1); }).then((clazz) => {
                        mode_classes.set(type, clazz[type]);
                        the_foegen.bind(new clazz[type](struct.name, struct.interval, struct.data, struct.pattern, struct.succ), struct.duration, struct.weight);
                        remaining_items--;
                        if (remaining_items === 0) {
                            the_foegen.finish(grid);
                            cb(the_foegen);
                        }
                    });
                }
            }
            remaining_items--;
            if (remaining_items === 0) {
                the_foegen.finish(grid);
                cb(the_foegen);
            }
        }
    }
    exports.FoeGen = FoeGen;
});
