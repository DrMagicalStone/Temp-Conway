define(["require", "exports", "js/event/eventbus", "js/event/TickEvent", "pages/game/the_space"], function (require, exports, eventbus_1, TickEvent_1, the_space_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setInterval = exports.tickStop = exports.tickBegin = exports.tick_per_second = void 0;
    var ticker = {
        ticking: false,
        last_time: 0,
        delay: 0,
        /**
         * The tick function.
         */
        tick: () => {
            let now = new Date().getTime();
            eventbus_1.event_bus.post(new TickEvent_1.TickEvent(now / 1000.0), the_space_1.the_space, () => {
                if (ticker.ticking) {
                    let sleep = ticker.delay - now + ticker.last_time;
                    if (sleep >= 0) {
                        if (sleep <= ticker.delay) {
                            ticker.last_time += ticker.delay;
                        }
                    }
                    else {
                        ticker.last_time = now;
                        sleep = ticker.delay;
                    }
                    setTimeout(ticker.tick, sleep);
                }
            });
        }
    };
    function tickBegin() {
        console.log("tick_begin action.");
        ticker.ticking = true;
        setTimeout(ticker.tick);
    }
    exports.tickBegin = tickBegin;
    function tickStop() {
        console.log("tick_stop action.");
        ticker.ticking = false;
    }
    exports.tickStop = tickStop;
    function setInterval(interval) {
        ticker.delay = interval;
        exports.tick_per_second = 1000 / ticker.delay;
    }
    exports.setInterval = setInterval;
    setInterval(50);
});
