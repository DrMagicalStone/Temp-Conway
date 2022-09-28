define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initializeCanvas = exports.resize = exports.canvas = exports.block_length = void 0;
    exports.block_length = 10;
    function resize(ev) {
        console.log("Page resizing canvas...");
        setCanvas(exports.canvas, ev.currentTarget.innerWidth, ev.currentTarget.innerHeight);
    }
    exports.resize = resize;
    /**
     * Set a canvas's width and height to the width and the height.
     */
    function setCanvas(canvas, width, height) {
        console.log("Original canvas: " + canvas.width + ", " + canvas.height);
        console.log("Setting canvas at " + width + ", " + height);
        canvas.width = width;
        canvas.height = height;
        console.log("Setting colour to white...");
        canvas.getContext("2d").fillStyle = "#ffffff";
    }
    /**
     * Invoke before posting tickbeginevent.
     */
    function initializeCanvas() {
        // Create canvas and element on canvas based on user's device's width
        exports.canvas = ($("#cwf")[0]);
        setCanvas(exports.canvas, window.innerWidth, window.innerHeight);
        // Init the canvas and its context.
        var context = exports.canvas.getContext("2d");
        context.fillStyle = "#ffffff";
    }
    exports.initializeCanvas = initializeCanvas;
    initializeCanvas();
    $(document).on("resize", resize);
    console.log("canvas initialized");
});
