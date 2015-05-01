/**
 * Created by rodik on 3/2/15.
 */


/*
 TODO:
 draw grid on real whole X and Y
 draw crosshair at 0/0 and at middle of view
 make better zoom function
 dynamic fidelity on zoom
 */
(function () {


    function Mandelbrot(graph, options) {
        var self = this;
        if (options === undefined) {
            options = {};
        }
        this.graph = graph;
        this.maxIterations = 50;
        this.verbose = true || options.verbose;

        gui.add(this, 'maxIterations').onFinishChange(function () {
            graph.trigger('view')
        });

        graph.addEvent('view', this.runSet.bind(this));
        graph.addEvent('zoom', function (evt) {
            var f = Math.sqrt(0.001+2.0 * evt.detail);
            self.maxIterations = Math.floor(223.0/f);
        });
        this.runSet();
    }

    Mandelbrot.prototype.runSet = function () {

        var iteration = 0;

        graph.clear();

          for (var row = 0; row < graph.cheight; row++) {
            for (var col = 0; col < graph.cwidth; col++) {
                iteration = this.iterate(row, col, this.maxIterations);
                if (iteration < this.maxIterations) {
                    graph.putPixel(col, row, iteration / this.maxIterations * 255);
                } else {
                    graph.putPixel(col, row, 0);
                }
            }
        }
        graph.updateCanvas();
    };

    Mandelbrot.prototype.iterate = function (row, col, max) {
        var cx = this.graph.getComplexX(col),
            cy = this.graph.getComplexY(row);

        var x = 0,
            y = 0,
            iteration = 0,
            escapeRadius = 4;

        while (x * x + y * y <= escapeRadius && iteration < max) {
            var x_new = x * x - y * y + cx;
            y = 2 * x * y + cy;
            x = x_new;
            iteration++;
        }
        return iteration;
    };

    window.Mandelbrot = Mandelbrot;
}());
