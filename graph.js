/**
 * Created by rodik on 3/4/15.
 */
(function () {

    const COMPLEX = 2.0;

    function Graph(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cwidth = this.canvas.width;
        this.cheight = this.canvas.height;
        this.canvasData = this.ctx.getImageData(0, 0, this.cwidth, this.cheight);;
        this.gridData = this.ctx.getImageData(0, 0, this.cwidth, this.cheight);

        this.view = {x: 0, y: 0, zoom: 4};

        gui.add(this.view, 'x').step(0.00001);
        gui.add(this.view, 'y').step(0.00001);
        gui.add(this.view, 'zoom').step(0.000001);
        gui.add(this.settings, 'colorFn', Object.keys(colorFns)).onFinishChange(function () {
            graph.trigger('view')
        });
        this.configureInput();
    }

    Graph.prototype.addEvent = function (name, cb) {
        this.canvas.addEventListener('custom-' + name, cb);
    };

    Graph.prototype.trigger = function (name, args) {
        console.log('args', args);
        var event = new CustomEvent('custom-' + name, {detail: args});
        this.canvas.dispatchEvent(event);
    };

    Graph.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.cwidth, this.cheight);
        this.canvasData = this.ctx.getImageData(0, 0, this.cwidth, this.cheight);
    };

    Graph.prototype.drawPixel = function (x, y, r, g, b, a) {
        var index = (x + y * this.cwidth) * 4;

        this.canvasData.data[index] = r;
        this.canvasData.data[index + 1] = g;
        this.canvasData.data[index + 2] = b;
        this.canvasData.data[index + 3] = a;
    };

    Graph.prototype.putPixel = function (x, y, c) {
        if (c === 0) {
            return this.drawPixel(x, y, 0, 0, 0, 255);
        }

        c = colorFns[this.settings.colorFn](c);
        this.drawPixel(x, y, c.r, c.g, c.b, 255);
    };

    Graph.prototype.updateCanvas = function () {
        this.ctx.putImageData(this.canvasData, 0, 0);
        for (var i in gui.__controllers) {
            gui.__controllers[i].updateDisplay();
        }
    };

    Graph.prototype.drawGrid = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ff2222';
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(300, 150);
        this.ctx.stroke();
    };

    Graph.prototype.getComplexX = function (x) {
        return this.view.x + ((x - this.cwidth / 2) / this.cwidth * this.view.zoom );
    };
    Graph.prototype.getComplexY = function (y) {
        return this.view.y + ((y - this.cheight / 2) / this.cwidth * this.view.zoom);
    };

    Graph.prototype.resetView = function () {
        this.view = {x: 0, y: 0, zoom: 1};
    };

    Graph.prototype.zoom = function (multiplier, x, y) {
        var self = this;
        //this.animateZoom(multiplier, x, y, function () {
        self.view.zoom = multiplier;

        if (x !== undefined) {
            self.view.x = x;
        }
        if (y !== undefined) {
            self.view.y = y;
        }

        self.trigger('zoom', self.view.zoom);
        self.trigger('view', self.view);
        //});
    };

    Graph.prototype.panUp = function () {
        this.view.y -= 0.1 * this.view.zoom;
        this.trigger('view', this.view);
    };
    Graph.prototype.panDown = function () {
        this.view.y += 0.1 * this.view.zoom;
        this.trigger('view', this.view);
    };
    Graph.prototype.panLeft = function () {
        this.view.x -= 0.1 * this.view.zoom;
        this.trigger('view', this.view);
    };
    Graph.prototype.panRight = function () {
        this.view.x += 0.1 * this.view.zoom;
        this.trigger('view', this.view);
    };

    var colorFns = {
        grayscale: function (c) {
            return {r: c, g: c, b: c};
        },
        red: function (c) {
            return {r: c, g: 0, b: 0};
        },

        default: function (c) {
            if (c === 0) {
                return this.drawPixel(x, y, 0, 0, 0, 255);
            }
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

            return {r: r, g: g, b: b};
        }
    };

    Graph.prototype.settings = {
        colorFn: 'grayscale'
    };

    window.Graph = Graph;
}());
