/**
 * Created by rodik on 3/2/15.
 */

var canvasData;
var maxiterations = 50;
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
        r = (c - 28) * 10;
    }

    drawPixel(x, y, r, g, b, 255);
}

var view = {x:0,y:0,zoom:4.0};
function resetView() {
    view = {x:0,y:0,zoom:4.0};
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
    var cx = view.x + (col - cwidth / 2.0) * view.zoom / cwidth,
        cy = view.y + (row - cheight / 2.0) * view.zoom / cwidth;

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

canvas.onclick = onclick;
function onclick(evt) {
    console.log('evt', evt);
    var x = evt.x, y = evt.y;

    view.zoom /= 2;
    console.log('calc (x - cwidth / 2.0)', (x - cwidth / 2.0));
    console.log('calc (x - cwidth / 2.0) * view.zoom', (x - cwidth / 2.0) * view.zoom);
    console.log('calc (x - cwidth / 2.0) * view.zoom / cwidth', (x - cwidth / 2.0) * view.zoom / cwidth);
    view.x += (x - cwidth / 2.0) * view.zoom / cwidth;
    view.y += (y - cheight / 2.0) * view.zoom / cwidth;

    runSet();
}

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // Left
            view.x -= 0.01 * view.zoom;
            runSet();
            break;

        case 38: // Up
            view.y -= 0.01 * view.zoom;
            runSet();
            break;

        case 39: // Right
            view.x += 0.01 * view.zoom;
            runSet();
            break;

        case 40: // Down
            view.y += 0.01 * view.zoom;
            runSet();
            break;
    }
}, false);
