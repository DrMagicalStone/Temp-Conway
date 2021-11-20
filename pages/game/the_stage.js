define(["require", "exports", "js/lifegame/Stage", "pages/game/savestate", "js/foe_gen/FoeGen", "pages/game/the_space", "js/event/eventbus"], function (require, exports, Stage_1, savestate_1, FoeGen_1, the_space_1, eventbus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.subscribeEvents = void 0;
    function onNewGame(ev) {
        var e = ev.event;
        var sst = e.sst;
        ev.detain();
        $.ajax("/js/lifegame/stages/" + sst.stage + ".json", {
            dataType: "json"
        }).done((data) => {
            FoeGen_1.FoeGen.loadFoegenFromJSON(data.mode, the_space_1.the_space.grid, gen => {
                let the_stage = e.the_stage = new Stage_1.Stage(data.name, data.bgm, data.bkimg, data.length, gen);
                e.the_stage.bgm.loop = true;
                let playBgm = () => { the_stage.bgm.play(); };
                let pauseBgm = () => {
                    the_stage.bgm.pause();
                    eventbus_1.event_bus.desubscribePostAction("game_start", playBgm);
                    eventbus_1.event_bus.desubscribePostAction("game_end", pauseBgm);
                };
                eventbus_1.event_bus.subscribePostAction("game_start", playBgm);
                eventbus_1.event_bus.subscribePostAction("game_end", pauseBgm);
                console.log("stage loaded.");
                ev.release();
            });
        });
    }
    function beforeNewGame(ev) {
        let sst = new savestate_1.savestate(localStorage.getItem("name"), localStorage.getItem("stage"), Number(localStorage.getItem("score")));
        ev.event.sst = sst;
        console.log("sst loaded: ", sst);
    }
    function subscribeEvents() {
        eventbus_1.event_bus.subscribePreAction("game_new", beforeNewGame);
        eventbus_1.event_bus.subscribePostAction("game_new", onNewGame);
    }
    exports.subscribeEvents = subscribeEvents;
});
