define(["require", "exports", "js/entity/VisibleEntity", "pages/game/canvas"], function (require, exports, VisibleEntity_1, canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bullet = void 0;
    var r = canvas_1.block_length / 2;
    class Bullet extends VisibleEntity_1.VisibleEntity {
        /**
         * Create a new flying bullet according to player's speed and position.
         * @param ply The player who shoot the bullet
         */
        constructor(ply) {
            super("bullet", { x_pos: ply.x_pos, y_pos: ply.y_pos, x_velocity: ply.x_velocity, y_velocity: ply.y_velocity + 1 }, ply.space, true, ply.canvas);
        }
        tick(time) {
            super.tick(time);
            if (this.y_pos < 0) {
                this.is_dead = true;
            }
            else {
                if (this.y_pos > this.space.height) {
                    this.is_dead = true;
                }
            }
            // Project it in to grid
            // If there is a block in front of it, bullet will placed in there.
            // Else, it will move continuously
            var project_x = Math.floor(this.x_pos);
            var project_y = Math.floor(this.y_pos);
            if (this.space.isThisPosAlive(project_x, project_y)) {
                this.space.setThisPosAlive(project_x, project_y, false);
                this.is_dead = true;
            }
        }
        render() {
            super.render();
            var y = this.convertY(this.y_pos);
            var x = this.convertX(this.x_pos);
            this.canvas.moveTo(x + r, y);
            this.canvas.arc(x, y, r, 0, Math.PI * 2);
        }
    }
    exports.Bullet = Bullet;
});
