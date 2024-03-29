define(["require", "exports", "js/event/eventbus", "js/event/NewGameEvent", "js/event/OverGameEvent", "js/event/VictoryGameEvent", "js/event/StartGameEvent", "js/event/TickBeginEvent", "js/event/TickStopEvent", "pages/game/game_cycle", "./moveconverter", "../../js/event/ExitEvent", "./game"], function (require, exports, eventbus_1, NewGameEvent_1, OverGameEvent_1, VictoryGameEvent_1, StartGameEvent_1, TickBeginEvent_1, TickStopEvent_1, game_cycle_1, moveconverter_1, ExitEvent_1, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subscribeEvents = exports.initializeEvents = exports.processBegin = void 0;
    //This ts file controls the game's life cycle from initialize to the end.
    /**
     * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
     */
    function processBegin() {
        eventbus_1.event_bus.launchEvent("game_new", undefined, (event) => {
            console.log("game_new complete.");
            eventbus_1.event_bus.post(new StartGameEvent_1.StartGameEvent(event.sst, event.the_stage), undefined, () => {
                console.log("game_start complete.");
                eventbus_1.event_bus.launchEvent("tick_begin", undefined, () => {
                    console.log("tick_begin complete.");
                });
            });
        });
    }
    exports.processBegin = processBegin;
    /**
     * The default_action of the newgameevent.
     */
    function onNewGame() {
        console.log("game_new action.");
    }
    /**
     * The default_action of the startgameevent.
     */
    function onStartGame() {
        console.log("game_start action.");
    }
    function initializeEvents() {
        NewGameEvent_1.NewGameEvent.setDefaultAction(onNewGame);
        eventbus_1.event_bus.registerEventType("game_new", () => new NewGameEvent_1.NewGameEvent(), true);
        StartGameEvent_1.StartGameEvent.setDefaultAction(onStartGame);
        eventbus_1.event_bus.registerEventType("game_start", undefined);
        eventbus_1.event_bus.registerEventType("tick", undefined, true);
        TickBeginEvent_1.TickBeginEvent.setDefaultAction(game_cycle_1.tickBegin);
        eventbus_1.event_bus.registerEventType("tick_begin", () => new TickBeginEvent_1.TickBeginEvent(), true);
        TickStopEvent_1.TickStopEvent.setDefaultAction(game_cycle_1.tickStop);
        eventbus_1.event_bus.registerEventType("tick_stop", () => new TickStopEvent_1.TickStopEvent(), true);
        OverGameEvent_1.OverGameEvent.setDefaultAction(() => {
            eventbus_1.event_bus.post(new TickStopEvent_1.TickStopEvent(), undefined, undefined);
            setTimeout(() => { location.replace("/"); }, 2500);
        });
        eventbus_1.event_bus.registerEventType("game_over", () => new OverGameEvent_1.OverGameEvent());
        VictoryGameEvent_1.VictoryGameEvent.setDefaultAction(() => { });
        eventbus_1.event_bus.registerEventType("game_victory", () => new VictoryGameEvent_1.VictoryGameEvent());
        eventbus_1.event_bus.registerEventType("exit", () => new ExitEvent_1.ExitEvent());
    }
    exports.initializeEvents = initializeEvents;
    function subscribeEvents() {
        eventbus_1.event_bus.subscribePostAction("game_start", (ev, ent) => {
            let the_foegen = ev.event.the_stage.gen_method;
            let foegen_begin = (ev) => {
                the_foegen.tick(ev.event);
            };
            eventbus_1.event_bus.subscribePostAction("tick", foegen_begin);
            let foegen_stop = (ev) => {
                eventbus_1.event_bus.desubscribePostAction("tick", foegen_begin);
                eventbus_1.event_bus.desubscribePreAction("game_end", foegen_stop);
            };
            eventbus_1.event_bus.subscribePreAction("game_end", foegen_stop);
        });
        eventbus_1.event_bus.subscribePostAction("game_start", (ev, ent) => {
            ev.event.the_stage.bgm.play();
        });
        eventbus_1.event_bus.subscribePostAction("game_end", (ev, ent) => {
            ev.event.the_stage.bgm.pause();
        });
        moveconverter_1.registerSubscribers();
        game_1.registerSubscribers();
    }
    exports.subscribeEvents = subscribeEvents;
});
