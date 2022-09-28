define(["require", "exports", "js/entity/VisibleEntity", "../util/container/DoubleGrid"], function (require, exports, VisibleEntity_1, DoubleGrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rules = exports.GolSpace = void 0;
    /**
     * Game of life Space
     * It can be a background of game, or be contained
     */
    class GolSpace extends VisibleEntity_1.VisibleEntity {
        constructor(kinematics, scale, visible_range, space, canvas, rule, type = "golSpace", render_centre = { x_offset: 0, y_offset: 0 }) {
            // golSpace uses its own code to render hence it doesn't need a renderer function.
            super(type, kinematics, space, false, canvas, render_centre);
            this.entities = new Set();
            this.scroll_counter = 0;
            this.grid = new DoubleGrid_1.DoubleGrid(scale.width, scale.height, (grid, x, y) => { return false; }, true, false);
            this.width = scale.width;
            this.height = scale.height;
            this.rule = rule;
            this.absolute_width = scale.absolute_width;
            this.absolute_height = scale.absolute_height;
            this.visible_range = visible_range;
            if (space != undefined) {
                this.absolute_x_pos = kinematics.x_pos;
                this.absolute_y_pos = kinematics.y_pos;
            }
            else {
                this.absolute_x_pos = -visible_range.min_x * (scale.absolute_width / (visible_range.max_x - visible_range.min_x));
                this.absolute_y_pos = -visible_range.min_y * (scale.absolute_height / (visible_range.max_y - visible_range.min_y));
            }
        }
        addEntity(ent) {
            this.entities.add(ent);
        }
        tick(time) {
            if (this.space !== undefined) {
                this.absolute_x_pos = Math.round(this.space.absolute_x_pos + this.x_pos * this.space.absolute_width / (this.space.visible_range.max_x - this.space.visible_range.min_x));
                this.absolute_y_pos = Math.round(this.space.absolute_y_pos + this.y_pos * this.space.absolute_height / (this.space.visible_range.max_y - this.space.visible_range.min_y));
            }
            else {
                this.canvas.beginPath();
                this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
            }
            super.tick(time);
            let currentRule = this.rule(this);
            this.grid.forEachPenetrated((grid, x, y) => {
                if (currentRule(grid, x, y)) {
                    if (this.visible_range.min_x <= x && x < this.visible_range.max_x &&
                        this.visible_range.min_y <= y && y < this.visible_range.max_y) {
                        var render_x = x + this.render_centre.x_offset;
                        var width = this.visible_range.max_x - this.visible_range.min_x;
                        var fill_x = Math.round(render_x * this.absolute_width / width + this.absolute_x_pos);
                        var side_x = Math.round((render_x + 1) * this.absolute_width / width + this.absolute_x_pos) - fill_x;
                        var render_y = y + this.render_centre.y_offset;
                        var height = this.visible_range.max_y - this.visible_range.min_y;
                        var fill_y = Math.round((render_y + 1) * this.absolute_height / height + this.absolute_y_pos);
                        var side_y = fill_y - Math.round((render_y) * this.absolute_height / height + this.absolute_y_pos);
                        fill_y = this.canvas_height - fill_y;
                        this.canvas.rect(fill_x, fill_y, side_x, side_y);
                    }
                    return true;
                }
                else {
                    return false;
                }
            });
            this.grid.flip();
            this.entities.forEach(entity => {
                if (!entity.is_dead) {
                    entity.tick(time);
                }
                else {
                    this.entities.delete(entity);
                }
            });
            if (this.space === undefined) {
                this.canvas.fill();
            }
        }
        isThisPosAlive(x, y) {
            return this.grid.get(x, y);
        }
        setThisPosAlive(x, y, data) {
            this.grid.set(x, y, data);
        }
    }
    exports.GolSpace = GolSpace;
    exports.rules = {
        scroll: function (grid, x, y) {
            return grid.get(x, y + 1);
        },
        stay: function (grid, x, y) {
            return grid.get(x, y);
        },
        b3s23: function (grid, x, y) {
            var numberOfCells = 0;
            if (grid.get(x - 1, y - 1)) {
                numberOfCells++;
            }
            if (grid.get(x - 1, y + 0)) {
                numberOfCells++;
            }
            if (grid.get(x - 1, y + 1)) {
                numberOfCells++;
            }
            if (grid.get(x + 0, y + 1)) {
                numberOfCells++;
            }
            if (grid.get(x + 1, y + 1)) {
                numberOfCells++;
            }
            if (grid.get(x + 1, y + 0)) {
                numberOfCells++;
            }
            if (grid.get(x + 1, y - 1)) {
                numberOfCells++;
            }
            if (grid.get(x + 0, y - 1)) {
                numberOfCells++;
            }
            switch (numberOfCells) {
                case 2:
                    return grid.get(x, y);
                case 3:
                    return true;
                default:
                    return false;
            }
        }
    };
});
