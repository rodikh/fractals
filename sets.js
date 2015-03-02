/**
 * Created by rodik on 3/2/15.
 */

var canvasData = ctx.getImageData(0, 0, cwidth, cheight);

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * cwidth) * 4;

    canvasData.data[index] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

function putpixel(x, y, c) {
    var r = 0,
        g = 0,
        b = 0;

    if (c < 10) {
        b = 100 + c * 10;
    }

    if (c > 9 && c < 30) {
        g = (c - 9) * 10
    }

    if (c > 29) {
        r = (c - 28) * 10;
    }

    drawPixel(x, y, r, g, b, 255);
}

var xcorner = 0;
var ycorner = 0;
var zoom = 4.0;

function runSet() {
    var max = 50,
        iteration = 0;
    for (var row = 0; row < cheight; row++) {
        for (var col = 0; col < cwidth; col++) {
            iteration = mandelbrot(row, col, max);

            if (iteration < max) {
                putpixel(col, row, iteration);
            }
        }
    }
    updateCanvas();
}

function mandelbrot(row, col, max) {
    var cx = xcorner + (col - cwidth / 2.0) * zoom / cwidth,
        cy = ycorner + (row - cheight / 2.0) * zoom / cwidth;

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