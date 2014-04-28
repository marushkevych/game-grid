game-grid
============

Reusable grid model and grid canvas view for 2D board games.

This initial version contains basic canvas grid view and model able to identify cell neighbors.
See http://github.com/marushkevych/game-of-life for usage examples.

```js
var grid = require('game-grid');
var canvas = document.getElementById("canvas");

var view = new grid.GridView(canvas, {size: 10, scale: 7});
var model = new grid.GridModel(10);

view.onCellClick(function(cell) {
    var modelCell = model.getCell(cell.x, cell.y);
    // react to cell click
});

view.paintGrid();
```