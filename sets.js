/**
 * Created by rodik on 3/2/15.
 */


/*
 TODO:
     Show coord at mouse
     draw grid on real whole X and Y
     draw crosshair at 0/0 and at middle of view
     make better zoom function
 */

var canvasData;
var maxiterations = 200;
function drawPixel(x, y, r, g, b, a) {
    var index = (x + y * cwidth) * 4;

    canvasData.data[index] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}


gridData = ctx.getImageData(0, 0, cwidth, cheight);
function updateGrid() {

}
function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = '#ff2222';
    ctx.moveTo(0,0);
    ctx.lineTo(300,150);
    ctx.stroke();
}

function putpixel(x, y, c) {
    var r = 0,
        g = 0,
        b = 0;

    if (c < 10) {
        b = 100 + c * 10;
    } else {
        b = 200;
    }

    if (c > 9 && c < 30) {
        g = (c - 9) * 10
    } else if (c > 29) {
        g = 200;
    }

    if (c > 29) {
        r = (c - 29) * 5;
    }

    drawPixel(x, y, r, g, b, 255);
}

function getComplexX(x) {
    return view.x + ((x - cwidth / 2.0) * view.zoom / cwidth);
}
function getComplexY(y) {
    return view.y + ((y - cheight / 2.0) * view.zoom / cwidth);
}
function getRealX(cx) {

}
function getRealY(cy) {

}

var view = {x:0,y:0,zoom:4.0};
function resetView() {
    view = {x:0,y:0,zoom:4.0};
}

function zoom(multiplier, x, y) {
    view.zoom /= multiplier || 2;
    if (x === undefined) {

    }
    view.x += (x - cwidth / 2.0) * view.zoom / cwidth * 2;
    view.y += (y - cheight / 2.0) * view.zoom / cwidth * 2;
}

function runSet() {
    var iteration = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasData = ctx.getImageData(0, 0, cwidth, cheight);

    for (var row = 0; row < cheight; row++) {
        for (var col = 0; col < cwidth; col++) {
            iteration = mandelbrot(row, col, maxiterations);

            if (iteration < maxiterations) {
                putpixel(col, row, iteration);
            }
        }
    }
    updateCanvas();
}

function mandelbrot(row, col, max) {
    var cx = getComplexX(col),
        cy = getComplexY(row);

    var x = 0,
        y = 0,
        iteration = 0;

    while (x * x + y * y <= 4 && iteration < max) {
        var x_new = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = x_new;
        iteration++;
    }
    return iteration;
}

runSet();

