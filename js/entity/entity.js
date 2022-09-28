define(["require", "exports", "pages/game/game_cycle", "pages/game/game_clock"], function (require, exports, game_cycle_1, game_clock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.entity = void 0;
    /**
    * Special object on a golSpace, which has a position and a velocity and has its specific behaviour.
    */
    class entity {
        constructor(type, kinematics, space) {
            this.type = type;
            this.x_pos = kinematics.x_pos;
            this.y_pos = kinematics.y_pos;
            this.x_velocity = kinematics.x_velocity;
            this.y_velocity = kinematics.y_velocity;
            if (!(space === undefined)) {
                this.space = space;
                space.addEntity(this);
            }
            this.last_update_time = game_clock_1.game_clock.getTime();
        }
        getPos(time) {
            var delta = time - this.last_update_time;
            return this.x_pos + delta * this.x_velocity, this.y_pos + delta * this.y_velocity;
        }
        tick(time) {
            if (!(this.space === undefined)) {
                {
                    if (this.y_pos < 0) {
                        if (this.y_velocity < 0) {
                            this.y_velocity = -this.y_velocity;
                        }
                    }
                    else {
                        if (this.y_pos > this.space.height) {
                            if (this.y_velocity > 0) {
                                this.y_velocity = -this.y_velocity;
                            }
                        }
                    }
                }
                var delta = (time - this.last_update_time) * game_cycle_1.tick_per_second;
                this.x_pos = this.x_pos + delta * this.x_velocity;
                this.y_pos = this.y_pos + delta * this.y_velocity;
                this.last_update_time = time;
                {
                    var space_width = this.space.width;
                    if (this.x_pos < 0) {
                        this.x_pos += space_width;
                    }
                    else {
                        if (this.x_pos > space_width) {
                            this.x_pos -= space_width;
                        }
                    }
                }
            }
        }
    }
    exports.entity = entity;
});
