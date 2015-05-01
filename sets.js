/**
 * Created by rodik on 3/2/15.
 */


/*
 TODO:
 Show coord at mouse
 draw grid on real whole X and Y
 draw crosshair at 0/0 and at middle of view
 make better zoom function
 dynamic fidelity on zoom
 */
var settings = {maxIterations: 400};
gui.add(settings, 'maxIterations');
function runSet() {

    var iteration = 0;

    graph.clear();

    //var columns = [graph.view.y];
    //for (var col = 1; col < graph.cwidth; col++) {
    //    columns[col] = (col / graph.view.zoom) + graph.view.x;
    //}

    for (var row = 0; row < graph.cheight; row++) {
        //var runx = (row / graph.view.zoom) + graph.view.y;
        for (var col = 0; col < graph.cwidth; col++) {
            iteration = mandelbrot(row, col, settings.maxIterations);
            if (iteration < settings.maxIterations) {
                graph.putPixel(col, row, iteration);
            } else {
                graph.putPixel(col, row, 0);
            }
        }
    }
    graph.updateCanvas();
}

function mandelbrot(row, col, max) {
    var cx = graph.getComplexX(col),
        cy = graph.getComplexY(row);

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

graph.addEvent('view', runSet);

runSet();

