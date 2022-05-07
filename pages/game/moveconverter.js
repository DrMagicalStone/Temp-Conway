define(["require", "exports", "pages/game/the_player"], function (require, exports, the_player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSubscribers = exports.upKey = exports.downKey = exports.moveTouch = exports.upTouch = exports.downTouch = exports.moveMouse = exports.upMouse = exports.downMouse = void 0;
    /**
     * Export kinematics data to lead the player's plane's movement.
     * move.x_move stands for move offset in pixels, as well as move.y_move
     */
    function downMouse(move_src) {
        console.log("down");
        the_player_1.engine_vector.mouse_down = true;
        moveScreen(move_src.clientX, move_src.clientY);
    }
    exports.downMouse = downMouse;
    function upMouse(move_src) {
        console.log("up");
        the_player_1.engine_vector.mouse_down = false;
    }
    exports.upMouse = upMouse;
    function moveMouse(move_src) {
        if (the_player_1.engine_vector.mouse_down) {
            moveScreen(move_src.clientX, move_src.clientY);
        }
    }
    exports.moveMouse = moveMouse;
    function downTouch(src) {
        the_player_1.engine_vector.mouse_down = true;
        var move_src = src.originalEvent;
        var touch = move_src.touches[0];
        moveScreen(touch.clientX, touch.clientY);
    }
    exports.downTouch = downTouch;
    function upTouch(src) {
        the_player_1.engine_vector.mouse_down = false;
    }
    exports.upTouch = upTouch;
    function moveTouch(src) {
        var move_src = src.originalEvent;
        var touch = move_src.touches[0];
        moveScreen(touch.clientX, touch.clientY);
    }
    exports.moveTouch = moveTouch;
    function moveScreen(x_pos, y_pos) {
        the_player_1.engine_vector.x_from_screen = x_pos;
        the_player_1.engine_vector.y_from_screen = y_pos;
    }
    function downKey(move_src) {
        switch (move_src.key) {
            case "w":
            case "W":
            case "ArrowUp":
                if (!key_down_state.up) {
                    key_down_state.up = true;
                    the_player_1.engine_vector.y_from_key++;
                }
                break;
            case "a":
            case "A":
            case "ArrowLeft":
                if (!key_down_state.left) {
                    key_down_state.left = true;
                    the_player_1.engine_vector.x_from_key--;
                }
                break;
            case "s":
            case "S":
            case "ArrowDown":
                if (!key_down_state.down) {
                    key_down_state.down = true;
                    the_player_1.engine_vector.y_from_key--;
                }
                break;
            case "d":
            case "D":
            case "ArrowRight":
                if (!key_down_state.right) {
                    key_down_state.right = true;
                    the_player_1.engine_vector.x_from_key++;
                }
                break;
            case " ":
                $("body")[0].innerHTML = $("body")[0].innerHTML +
                `
                        <div id="pause_background" onclick="(()=>{$('#pause_background').remove()})()"
                            style="background-color: #00000030; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 100;" >
                            <div style="background-color: #ffffff; position: absolute; left: 50%; top: 50%;
                                        -webkit-transform: translate(-50%,-50%);
                                        -moz-transform: translate(-50%,-50%);
                                        transform:translate(-50%,-50%);" onclick="(()=>$('#pause_background').remove())()">
                                Game paused, press "space to start again"
                            </div>
                        </div >
                `
                break;
        }
    }
    exports.downKey = downKey;
    function upKey(move_src) {
        switch (move_src.key) {
            case "w":
            case "W":
            case "ArrowUp":
                if (key_down_state.up) {
                    key_down_state.up = false;
                    the_player_1.engine_vector.y_from_key--;
                }
                break;
            case "a":
            case "A":
            case "ArrowLeft":
                if (key_down_state.left) {
                    key_down_state.left = false;
                    the_player_1.engine_vector.x_from_key++;
                }
                break;
            case "s":
            case "S":
            case "ArrowDown":
                if (key_down_state.down) {
                    key_down_state.down = false;
                    the_player_1.engine_vector.y_from_key++;
                }
                break;
            case "d":
            case "D":
            case "ArrowRight":
                if (key_down_state.right) {
                    key_down_state.right = false;
                    the_player_1.engine_vector.x_from_key--;
                }
                break;
        }
    }
    exports.upKey = upKey;
    var key_down_state = {
        left: false,
        down: false,
        right: false,
        up: false
    };
    function registerSubscribers() {
        $(document).on("mousedown", downMouse);
        $(document).on("mouseup", upMouse);
        $(document).on("mousemove", moveMouse);
        $(document).on("keydown", downKey);
        $(document).on("keyup", upKey);
        $(document).on("touchstart", downTouch);
        $(document).on("touchend", upTouch);
        $(document).on("touchmove", moveTouch);
        console.log("move converter is registered");
    }
    exports.registerSubscribers = registerSubscribers;
});
