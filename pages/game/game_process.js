define(["require", "exports", "js/event/eventbus", "js/event/NewGameEvent", "js/event/OverGameEvent", "js/event/VictoryGameEvent", "js/event/StartGameEvent", "js/event/TickBeginEvent", "js/event/TickStopEvent", "pages/game/game_cycle", "./moveconverter"], function (require, exports, eventbus_1, NewGameEvent_1, OverGameEvent_1, VictoryGameEvent_1, StartGameEvent_1, TickBeginEvent_1, TickStopEvent_1, game_cycle_1, moveconverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subscribeEvents = exports.initializeEventActions = exports.processBegin = void 0;
    //This ts file controls the game's life cycle from initialize to the end.
    /**
     * This is the entry of the game and it will be invoked just after the completeinitevent in game.ts.
     */
    function processBegin() {
        let game_new = new NewGameEvent_1.NewGameEvent();
        eventbus_1.event_bus.post(game_new, undefined, () => {
            console.log("game_new complete.");
            eventbus_1.event_bus.post(new StartGameEvent_1.StartGameEvent(game_new.sst, game_new.the_stage), undefined, () => {
                console.log("game_start complete.");
                eventbus_1.event_bus.post(new TickBeginEvent_1.TickBeginEvent(), undefined, () => {
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
    function initializeEventActions() {
        NewGameEvent_1.NewGameEvent.setDefaultAction(onNewGame);
        StartGameEvent_1.StartGameEvent.setDefaultAction(onStartGame);
        TickBeginEvent_1.TickBeginEvent.setDefaultAction(game_cycle_1.tickBegin);
        TickStopEvent_1.TickStopEvent.setDefaultAction(game_cycle_1.tickStop);
        OverGameEvent_1.OverGameEvent.setDefaultAction(() => {
            eventbus_1.event_bus.post(new TickStopEvent_1.TickStopEvent(), undefined, undefined);
            setTimeout(() => { location.replace("/"); }, 2500);
        });
        VictoryGameEvent_1.VictoryGameEvent.setDefaultAction(() => { });
    }
    exports.initializeEventActions = initializeEventActions;
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
    }
    exports.subscribeEvents = subscribeEvents;
});
