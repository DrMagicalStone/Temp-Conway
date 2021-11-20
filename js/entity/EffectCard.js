define(["require", "exports", "js/entity/VisibleEntity"], function (require, exports, VisibleEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EffectCard = void 0;
    /**
     * The card that give players special effect.
     */
    class EffectCard extends VisibleEntity_1.VisibleEntity {
        constructor(effect_inside, duration, kinematics, space, canvas) {
            super("effectcard", kinematics, space, true, canvas);
            this.inside = effect_inside;
            this.remaining_tick = duration;
        }
        tick(time) {
            super.tick(time);
            this.remaining_tick -= 1;
            if (this.remaining_tick <= 0) {
                this.is_dead = true;
            }
        }
        render() {
        }
        /**
         * If a card was picked, what should it do
         */
        picked() {
            this.is_dead = true;
        }
    }
    exports.EffectCard = EffectCard;
});
