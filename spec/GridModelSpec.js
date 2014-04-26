var GridModel = require('../js/GridModel');
var Cell = require('../js/Cell');

describe("GridModel", function() {
    describe("getNeighbors()", function() {
        it("should get all the neighbors of middle cell", function(){
            var model = new GridModel(3);
            var neighbors = model.getNeighbors(2,2);
            expect(neighbors[0]).toEqual(new Cell(1,1));
            expect(neighbors[1]).toEqual(new Cell(2,1));
            expect(neighbors[2]).toEqual(new Cell(3,1));
            expect(neighbors[3]).toEqual(new Cell(3,2));
            expect(neighbors[4]).toEqual(new Cell(3,3));
            expect(neighbors[5]).toEqual(new Cell(2,3));
            expect(neighbors[6]).toEqual(new Cell(1,3));
            expect(neighbors[7]).toEqual(new Cell(1,2));
        });
        it("should get only existing neighbors for top left cell", function(){
            var model = new GridModel(3);
            var neighbors = model.getNeighbors(1,1);
            expect(neighbors[0]).toEqual(new Cell(2,1));
            expect(neighbors[1]).toEqual(new Cell(2,2));
            expect(neighbors[2]).toEqual(new Cell(1,2));
        });
        it("should get only existing neighbors for top right cell", function(){
            var model = new GridModel(3);
            var neighbors = model.getNeighbors(3,1);
            expect(neighbors[0]).toEqual(new Cell(3,2));
            expect(neighbors[1]).toEqual(new Cell(2,2));
            expect(neighbors[2]).toEqual(new Cell(2,1));
        });
        it("should get only existing neighbors for bottom right cell", function(){
            var model = new GridModel(3);
            var neighbors = model.getNeighbors(3,3);
            expect(neighbors[0]).toEqual(new Cell(2,2));
            expect(neighbors[1]).toEqual(new Cell(3,2));
            expect(neighbors[2]).toEqual(new Cell(2,3));
        });
        it("should get only existing neighbors for bottom left cell", function(){
            var model = new GridModel(3);
            var neighbors = model.getNeighbors(1,3);
            expect(neighbors[0]).toEqual(new Cell(1,2));
            expect(neighbors[1]).toEqual(new Cell(2,2));
            expect(neighbors[2]).toEqual(new Cell(2,3));
        });
    });
});

