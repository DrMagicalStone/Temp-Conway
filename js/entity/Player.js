define(["require", "exports", "js/entity/GolSpace", "js/entity/Bullet", "js/event/eventbus", "pages/game/canvas", "../lifegame/PatternLib"], function (require, exports, GolSpace_1, Bullet_1, eventbus_1, canvas_1, PatternLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setViscosity = exports.Player = void 0;
    /**
     * The plane that player controls
     */
    class Player extends GolSpace_1.GolSpace {
        constructor(engine, space, pos = { x_pos: space.width / 2, y_pos: space.height * 0.30 }) {
            super({ x_pos: pos.x_pos, y_pos: pos.y_pos, x_velocity: 0, y_velocity: 0 }, { width: 7, height: 7, absolute_width: 7 * canvas_1.block_length, absolute_height: 7 * canvas_1.block_length }, { min_x: 0, max_x: 7, min_y: 0, max_y: 7 }, space, space.canvas, () => ((grid, x, y) => {
                if (grid.get(x, y)) {
                    if (this.space.isThisPosAlive(Math.round(this.x_pos + x - 3.5), Math.round(this.y_pos + y - 3.5))) {
                        console.log(x, y, this.hp);
                        this.hp--;
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }), "player", { x_offset: -3.5, y_offset: -3.5 });
            this.hp = 17;
            this.bullet_shoot_rate = 20;
            /**
             * The buffer which contains the key: effect, and value : remaining tick it have.
             */
            this.effect_buffer = new Map();
            this.invoke_count = 0;
            this.engine_vector = engine;
            PatternLib_1.PatternLib.get("plane")(this.grid, 0, 7);
        }
        tick(time) {
            var acc;
            if (this.engine_vector.mouse_down) {
                acc =
                    {
                        x: this.deConvertX(this.engine_vector.x_from_screen) - this.x_pos,
                        y: this.deConvertY(this.engine_vector.y_from_screen) - this.y_pos
                    };
                let mod = Math.sqrt(acc.x * acc.x + acc.y * acc.y);
                if (mod != 0) {
                    let power = (acceleration_coefficient - acceleration_coefficient_times_three /
                        (mod + acceleration_coefficient_times_two)) / mod;
                    acc.x = acc.x * power;
                    acc.y = acc.y * power;
                }
            }
            else {
                acc =
                    {
                        x: this.engine_vector.x_from_key,
                        y: this.engine_vector.y_from_key
                    };
                let mod = Math.sqrt(acc.x * acc.x + acc.y * acc.y);
                if (mod != 0) {
                    let power = acceleration_coefficient / mod;
                    acc.x = acc.x / mod * power;
                    acc.y = acc.y / mod * power;
                }
            }
            this.x_velocity = this.x_velocity * speed_reserve_rate + acc.x;
            this.y_velocity = this.y_velocity * speed_reserve_rate + acc.y;
            super.tick(time);
            // Check if the player is already dead
            if (this.hp <= 0) {
                eventbus_1.event_bus.launchEvent("game_over", undefined);
            }
            // Subtract remaining effect tick
            for (var ef of this.effect_buffer) {
                this.effect_buffer.set(ef[0], ef[1] - 1);
            }
            // Shoot bullet part
            if (this.invoke_count % this.bullet_shoot_rate === 0) {
                this.shootAccordingTo(time);
                this.invoke_count = 1;
            }
            else {
                this.invoke_count += 1;
            }
        }
        shootAccordingTo(time) {
            new Bullet_1.Bullet(this);
        }
        render() {
            super.render();
        }
    }
    exports.Player = Player;
    var speed_reserve_rate;
    var acceleration_coefficient;
    var acceleration_coefficient_times_two;
    var acceleration_coefficient_times_three;
    function setViscosity(viscosity, max_velocity) {
        if ((viscosity >= 0) && (max_velocity >= 0)) {
            speed_reserve_rate = 1 - viscosity;
            acceleration_coefficient = max_velocity * viscosity;
            acceleration_coefficient_times_two = acceleration_coefficient * acceleration_coefficient;
            acceleration_coefficient_times_three = acceleration_coefficient_times_two * acceleration_coefficient;
        }
        else {
            throw "The viscosity and max_velocity shouldn't be negative.";
        }
    }
    exports.setViscosity = setViscosity;
    setViscosity(0.2, 5);
});
