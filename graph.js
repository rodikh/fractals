/**
 * Created by rodik on 3/4/15.
 */
(function () {

    function Graph(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cwidth = this.canvas.width;
        this.cheight = this.canvas.height;

        this.cratio = this.cwidth / this.cheight;
        this.canvasData;
        this.gridData = this.ctx.getImageData(0, 0, this.cwidth, this.cheight);

        this.view = {x: 0, y: 0, zoom: 4.0};

        this.configureInput();
    }

    Graph.prototype.addEvent = function (name, cb) {
        this.canvas.addEventListener('custom-' + name, cb);
    };

    Graph.prototype.trigger = function (name, args) {
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

        this.drawPixel(x, y, r, g, b, 255);
    };

    Graph.prototype.updateCanvas = function () {
        this.ctx.putImageData(this.canvasData, 0, 0);
    };

    Graph.prototype.drawGrid = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ff2222';
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(300, 150);
        this.ctx.stroke();
    };

    Graph.prototype.getComplexX = function (x) {
        return this.view.x + ((x - this.cwidth / 2.0) * this.view.zoom / this.cwidth);
    };
    Graph.prototype.getComplexY = function (y) {
        return this.view.y + ((y - this.cheight / 2.0) * this.view.zoom / this.cwidth);
    };
    Graph.prototype.getRealX = function (cx) {
        var rfc = ((cx + 2) * this.cwidth / 4);
        var rfviewx = ((this.view.x + 2) * this.cwidth / 4);
        var ztr = (this.cwidth * this.view.zoom / 4);
        var offset = rfviewx - (ztr / 2);
        //console.log('offset', offset, rfc);
        return Math.round((rfc - offset) / this.view.zoom * 4);
    };
    Graph.prototype.getRealY = function (cy) {
        var rfc = ((cy ) * this.cwidth / 4);
        ///////////
        ////////// CONTINUE HERE
        //////////
        var rfviewy = ((this.view.y + 1.5) * this.cheight / 3);
        var ztr = (this.cheight * this.view.zoom / 4);
        var offset = rfviewy - (ztr / 2);
        console.log('rfc', ztr, cy);
        return Math.round((rfc - offset) / this.view.zoom * 4);
    };
    Graph.prototype.resetView = function () {
        this.view = {x: 0, y: 0, zoom: 4.0};
    };

    Graph.prototype.zoom = function (multiplier, x, y) {
        this.view.zoom /= multiplier || 2;
        if (x === undefined) {

        }
        this.view.x += (x - this.cwidth / 2.0) * this.view.zoom / this.cwidth * 2;
        this.view.y += (y - this.cheight / 2.0) * this.view.zoom / this.cwidth * 2;

        this.trigger('view', this.view);
    };

    window.Graph = Graph;
}());
