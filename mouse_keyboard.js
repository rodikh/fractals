/**
 * Created by RODIK on 02/03/2015.
 */
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

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

canvas.addEventListener('mousedown', function (evt) {
    var x = evt.x - canvas.offsetLeft, y = evt.y - canvas.offsetTop;
    if (evt.button === 2) {
        zoom(0.5);
    } else {
        //view.zoom /= 2;
        //console.log('y', y);
        //view.x += (x - cwidth / 2.0) * view.zoom / cwidth * 2;
        //view.y += (y - cheight / 2.0) * view.zoom / cwidth * 2;
        zoom(2, x, y);
    }


    runSet();
});

