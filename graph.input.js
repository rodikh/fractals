/**
 * Created by RODIK on 02/03/2015.
 */

window.Graph.prototype.configureInput = function () {
    var self = this;
    this.canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    this.canvas.addEventListener('mousedown', function (evt) {
        var x = evt.x - self.canvas.offsetLeft, y = evt.y - self.canvas.offsetTop;
        if (evt.button === 2) {
            self.zoom(self.view.zoom * 2);
        } else {
            self.zoom(self.view.zoom / 2, self.getComplexX(x), self.getComplexY(y));
        }
    });

    window.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37: // Left
                self.panLeft();
                break;

            case 38: // Up
                self.panUp();
                break;

            case 39: // Right
                self.panRight();
                break;

            case 40: // Down
                self.panDown();
                break;
        }
    }, false);

    //this.canvas.addEventListener('mousemove', function (evt) {
    //    var x = evt.x - self.canvas.offsetLeft, y = evt.y - self.canvas.offsetTop;
    //document.querySelector('.console .mouse').innerText = x+'/'+y;
    //document.querySelector('.console .mouse-complex').innerText = graph.getComplexX(x)+'/'+graph.getComplexY(y);
    //document.querySelector('.console .data1').innerText = graph.getRealX(graph.getComplexX(x))+'/'+ graph.getRealY(graph.getComplexY(y));
    //});
};
