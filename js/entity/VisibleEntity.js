define(["require", "exports", "js/entity/entity", "pages/game/canvas"], function (require, exports, entity_1, canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VisibleEntity = void 0;
    /**
     * A visible entity.
     */
    class VisibleEntity extends entity_1.entity {
        constructor(type, kinematics, space, que_auto_render, canvas, render_centre = { x_offset: 0, y_offset: 0 }) {
            super(type, kinematics, space);
            this.canvas = canvas;
            this.canvas_height = canvas.canvas.height;
            this.will_auto_render = que_auto_render;
            this.render_centre = render_centre;
        }
        tick(time) {
            super.tick(time);
            if ((!this.is_dead) && this.will_auto_render) {
                this.render();
            }
        }
        render() { }
        convertX(x) {
            return x * canvas_1.block_length + this.space.absolute_x_pos;
        }
        convertY(y) {
            return this.canvas_height - (y * canvas_1.block_length + this.space.absolute_y_pos);
        }
        deConvertX(x) {
            return (x - this.space.absolute_x_pos) / canvas_1.block_length;
        }
        deConvertY(y) {
            return (this.canvas_height - this.space.absolute_y_pos - y) / canvas_1.block_length;
        }
    }
    exports.VisibleEntity = VisibleEntity;
});
