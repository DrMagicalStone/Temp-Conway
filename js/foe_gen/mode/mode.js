define(["require", "exports", "js/lifegame/PatternLib"], function (require, exports, PatternLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mode = void 0;
    class mode {
        constructor(name, interval, data, patterns, succ) {
            /**
             * From pattern libs, choose one pattern.
             */
            this.patterns = [];
            this.name = name;
            this.interval = interval;
            var lastTop = 0;
            for (var i = 0; i < patterns.length; i++) {
                this.patterns[i] = {
                    pattern: PatternLib_1.PatternLib.get(patterns[i].type),
                    top: lastTop = patterns[i].weight + lastTop
                };
            }
        }
        getName() { return this.name; }
        getInterval() { return this.interval; }
        getPattern() {
            var currentPattern;
            var random = Math.random() * this.patterns[this.patterns.length - 1].top;
            for (var pattern of this.patterns) {
                if (random < pattern.top) {
                    currentPattern = pattern.pattern;
                    break;
                }
            }
            return currentPattern;
        }
        finish() {
            return this.succ;
        }
    }
    exports.mode = mode;
});
