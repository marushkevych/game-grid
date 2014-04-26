var _ = require('underscore');
var Cell = require('./Cell');
module.exports = GridModel;

function GridModel(size){
    this.size = size;
    this.cells = [];
    this.cols = [];
    for(var i = 1; i <= size; i++){
        var col = [];
        this.cols[i] = col;
        for(var j = 1; j <= size; j++){
            col[j] = new Cell(i,j);
            this.cells.push(col[j]);
        }
    }
}

GridModel.prototype.eachCell = function(f){
    this.cells.forEach(f);
};

GridModel.prototype.getCell = function(x,y){
    var cell = this.cols[x][y];
    return cell;
};

GridModel.prototype.getNeighbors = function(x,y){
    var allNeighbors = [
        this.getNextCellNorthWest(x,y),
        this.getNextCellUp(x,y),
        this.getNextCellNorthEast(x,y),
        this.getNextCellRight(x,y),
        this.getNextCellSouthEast(x,y),
        this.getNextCellDown(x,y),
        this.getNextCellSouthWest(x,y),
        this.getNextCellLeft(x,y)
    ];
    
    // filter non null
    return _.filter(allNeighbors, function(cell){
        return cell != null;
    });
};

// returns its next cell in diagonal row in north west direction, or null if this is the last cell in the row
GridModel.prototype.getNextCellNorthWest = function(x,y)
{
  if (y - 1 == 0 || x - 1 == 0) 
    return null;
  return this.getCell(x - 1, y - 1);
};

// returns its upper neigbour, or null if this is the top cell on the board
GridModel.prototype.getNextCellUp = function(x,y)
{
  if (y - 1 == 0) 
    return null;
  return this.getCell(x, y - 1);
};

// returns its next cell in diagonal row in north east direction, or null if this is the last cell in the row
GridModel.prototype.getNextCellNorthEast = function(x,y)
{
  if (x + 1 > this.size || y - 1 == 0) 
    return null;
  return this.getCell(x + 1, y - 1);
};

// returns its next cell on the right, or null if this is the last cell in the row
GridModel.prototype.getNextCellRight = function(x,y)
{
  if (x + 1 > this.size) 
    return null;
  return this.getCell(x + 1, y);
};

// returns its next cell in diagonal row in south east direction, or null if this is the last cell in the row
GridModel.prototype.getNextCellSouthEast = function(x,y)
{
  if (y + 1 > this.size || x + 1 > this.size) 
    return null;
  return this.getCell(x + 1, y + 1);
};

// returns its next neigbour below, or null if this is the bottom cell on the board
GridModel.prototype.getNextCellDown = function(x,y)
{
  if (y + 1 > this.size) 
    return null;
  return this.getCell(x, y + 1);
};

// returns its next cell in diagonal row in south west direction, or null if this is the last cell in the row
GridModel.prototype.getNextCellSouthWest = function(x,y)
{
  if (x - 1 == 0 || y + 1 > this.size) 
    return null;
  return this.getCell(x - 1, y + 1);
};

// returns its next cell on the left, or null if this is the first cell in the row
GridModel.prototype.getNextCellLeft = function(x,y)
{
  if (x - 1 == 0) 
    return null;
  return this.getCell(x -1, y);
};



