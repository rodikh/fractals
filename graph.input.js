/**
 * Created by RODIK on 02/03/2015.
 */

window.Graph.prototype.configureInput = function() {
    var self = this;
    this.canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    this.canvas.addEventListener('mousedown', function (evt) {
        var x = evt.x - self.canvas.offsetLeft, y = evt.y - self.canvas.offsetTop;
        if (evt.button === 2) {
            self.zoom(0.5);
        } else {
            //view.zoom /= 2;
            //console.log('y', y);
            //view.x += (x - cwidth / 2.0) * view.zoom / cwidth * 2;
            //view.y += (y - cheight / 2.0) * view.zoom / cwidth * 2;
            self.zoom(2, x, y);
        }
    });

    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // Left
                self.view.x -= 0.01 * self.view.zoom;
                self.trigger('view', self.view);
                break;

            case 38: // Up
                self.view.y -= 0.01 * self.view.zoom;
                self.trigger('view', self.view);
                break;

            case 39: // Right
                self.view.x += 0.01 * self.view.zoom;
                self.trigger('view', self.view);
                break;

            case 40: // Down
                self.view.y += 0.01 * self.view.zoom;
                self.trigger('view', self.view);
                break;
        }
    }, false);

    this.canvas.addEventListener('mousemove', function (evt) {
        var x = evt.x - self.canvas.offsetLeft, y = evt.y - self.canvas.offsetTop;

        document.querySelector('.console .mouse').innerText = x+'/'+y;
        document.querySelector('.console .mouse-complex').innerText = graph.getComplexX(x)+'/'+graph.getComplexY(y);
        document.querySelector('.console .data1').innerText = graph.getRealX(graph.getComplexX(x))+'/'+ graph.getRealY(graph.getComplexY(y));

    });
};
