var _ = require('underscore');

module.exports = GridView;
function GridView(canvas, userConfig) {
    var self = this;
    // TODO make border width configurable

    var config = {
        size: 10,
        scale: 10,
        gridStyle: "#eee",
        borderStyle: "#bbb"
    };
    // aply user config
    _.extend(config, userConfig);

    this.config = config;
    this.canvas = canvas;


    // init canvas
    this.length = config.size * config.scale;
    canvas.width = this.length + 1;
    canvas.height = this.length + 1;

    canvas.addEventListener("click", canvasClick, false);

    function canvasClick(e) {
        // get cell object and call onCellClick handler
        if (self.onCellClickHandler)
            self.onCellClickHandler(getClickedCell(e));
    }

    function getClickedCell(e) {
        var x;
        var y;
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        }
//        else {
//            x = e.clientX + document.body.scrollLeft +
//                    document.documentElement.scrollLeft;
//            y = e.clientY + document.body.scrollTop +
//                    document.documentElement.scrollTop;
//        }

//    x -= canvas.offsetLeft;
//    y -= canvas.offsetTop;
//      console.log(canvas.offsetLeft)
//      console.log(canvas.offsetTop)

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;


        // ajust for border
//    if(x>0) x-=1;
//    if(y>0) y-=1;

        var cellX = Math.floor(x / config.scale);
        var cellY = Math.floor(y / config.scale);
        if (cellX < config.size)
            cellX += 1;
        if (cellY < config.size)
            cellY += 1;
        return {x: cellX, y: cellY};
    }
}

GridView.prototype.onCellClick = function(handler) {
    this.onCellClickHandler = handler;
};

GridView.prototype.fillCell = function(cell) {
    var context = this.canvas.getContext("2d");
    var s = this.config.scale;
    context.fillRect(cell.x * s - s + 1, cell.y * s - s + 1, s - 1, s - 1);
};

GridView.prototype.clearCell = function(cell) {
    var context = this.canvas.getContext("2d");
    var s = this.config.scale;
    context.clearRect(cell.x * s - s + 1, cell.y * s - s + 1, s - 1, s - 1);
};


GridView.prototype.paintGrid = function(style) {
    var context = this.canvas.getContext("2d");


    // vertical
    for (var x = this.config.scale; x <= this.length - this.config.scale; x += this.config.scale) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, this.length);
    }

    // horisontal
    for (var y = this.config.scale; y <= this.length - this.config.scale; y += this.config.scale) {
        context.moveTo(0, y + 0.5);
        context.lineTo(this.length, y + 0.5);
    }

    context.strokeStyle = style || this.config.gridStyle;
    context.stroke();

    // border
    this.paintBorder(style || this.config.gridStyle);
};

GridView.prototype.paintBorder = function(style){
    var context = this.canvas.getContext("2d");
    
    context.beginPath();
    context.moveTo(0.5, 0);
    context.lineTo(0.5, this.length);
    context.moveTo(this.length + 0.5, 0);
    context.lineTo(this.length + 0.5, this.length);

    context.moveTo(0, 0.5);
    context.lineTo(this.length, 0.5);
    context.moveTo(0, this.length + 0.5);
    context.lineTo(this.length, this.length + 0.5);


    context.strokeStyle = style || this.config.borderStyle;
    context.stroke();
    
}