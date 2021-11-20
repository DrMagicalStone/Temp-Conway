var is_mouse_down = false;
var w1 = $("#w1")[0];
var layerX;
var layerY;
function mousedown(ev) {
    is_mouse_down = true;
    layerX = ev.offsetX;
    layerY = ev.offsetY;
}
function mouseup() {
    is_mouse_down = false;
}
function mousemove(ev) {
    if (is_mouse_down) {
        move(ev.clientX, ev.clientY);
    }
}
function move(clientX, clientY) {
    w1.style.left = (clientX - layerX) + "px";
    w1.style.top = (clientY - layerY) + "px";
}
function touchmove(ev) {
    if (is_mouse_down) {
        move(Math.round(ev.touches[0].clientX), Math.round(ev.touches[0].clientY));
    }
    else {
        is_mouse_down = true;
        layerX = Math.round(ev.touches[0].clientX);
        layerY = Math.round(ev.touches[0].clientY);
    }
}
function tryItYourself() {
    window.location.href = "../game/game.html";
}
