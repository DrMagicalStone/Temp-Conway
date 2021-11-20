define(["require", "exports", "js/entity/VisibleEntity", "js/entity/Bullet", "js/event/eventbus", "js/event/OverGameEvent"], function (require, exports, VisibleEntity_1, Bullet_1, eventbus_1, OverGameEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setViscosity = exports.Player = void 0;
    /**
     * The plane that player controls
     */
    class Player extends VisibleEntity_1.VisibleEntity {
        constructor(engine, space, pos = { x_pos: space.width / 2, y_pos: space.height * 0.05 }) {
            super("player", { x_pos: pos.x_pos, y_pos: pos.y_pos, x_velocity: 0, y_velocity: 0 }, space, true, space.canvas);
            this.bullet_shoot_rate = 20;
            /**
             * The buffer which contains the key: effect, and value : remaining tick it have.
             */
            this.effect_buffer = new Map();
            this.invoke_count = 0;
            this.engine_vector = engine;
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
                // event_bus.post(new endgameevent());
            }
            {
                var x_int = Math.round(this.x_pos - 0.5);
                var y_int = Math.round(this.y_pos);
                if (this.space.isThisPosAlive(x_int, y_int) || this.space.isThisPosAlive(x_int + 1, y_int)) {
                    eventbus_1.event_bus.post(new OverGameEvent_1.OverGameEvent(), undefined, () => { });
                }
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
            var y = this.convertY(this.y_pos);
            var x = this.convertX(this.x_pos);
            this.canvas.moveTo(x, y - 5);
            this.canvas.lineTo(x - 10, y + 5);
            this.canvas.lineTo(x + 10, y + 5);
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
