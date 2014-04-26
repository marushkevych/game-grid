var init = require('../js/GridView').init;

describe("GridView", function() {
    // canvas html element mock
    var canvas;

    beforeEach(function() {
        canvas = {
            style: {},
            eventHandlers: {},
            addEventListener: function(event, handler){
                this.eventHandlers[event] = handler;
            }
        };
    });

    describe("init", function() {
        it("should set canvas size properties", function() {
            init(canvas, {size:20, scale:10});
            expect(canvas.width).toBe(201);
            expect(canvas.width).toBe(201);
        });
        it("should use default canvas size properties: {size:10, scale:10}", function() {
            init(canvas);
            expect(canvas.width).toBe(101);
            expect(canvas.width).toBe(101);
        });
        it("should set canvas position properties", function() {
            init(canvas, {positionLeft:'50px', positionTop:'30px'});
            expect(canvas.style.left).toBe('50px');
            expect(canvas.style.top).toBe('30px');
            expect(canvas.style.position).toBe('absolute');
        });
        it("should use default canvas position properties: {positionLeft:'0px', positionTop:'0px'}", function() {
            init(canvas);
            expect(canvas.style.left).toBe('0px');
            expect(canvas.style.top).toBe('0px');
            expect(canvas.style.position).toBe('absolute');
        });
    });
    describe("onCellClik event", function() {
        var grid;
        var clickedCell;
        beforeEach(function(){
            grid = init(canvas, {size:20, scale:10});
            clickedCell = null;
            grid.onCellClick(function(cell) {
                clickedCell = cell;
            });
        });
        it("should pass correct cell coordinates when top left corner is clicked", function() {
            canvas.offsetLeft = 0;
            canvas.offsetTop = 0;
            
            // fire click event
            canvas.eventHandlers.click({pageX:0, pageY:0});
            expect(clickedCell).toEqual({x:1,y:1});
        });
        it("should pass correct cell coordinates when grid has offset and top left corner is clicked", function() {
            canvas.offsetLeft = 10;
            canvas.offsetTop = 10;
            
            // fire click event
            canvas.eventHandlers.click({pageX:10, pageY:10});
            expect(clickedCell).toEqual({x:1,y:1});
        });
        it("should pass correct cell coordinates when bottom right corner is clicked", function() {
            canvas.offsetLeft = 0;
            canvas.offsetTop = 0;
            
            // fire click event
            canvas.eventHandlers.click({pageX:201, pageY:201});
            expect(clickedCell).toEqual({x:20,y:20});
        });
        it("should pass correct cell coordinates when grid has offset and bottom right corner is clicked", function() {
            canvas.offsetLeft = 10;
            canvas.offsetTop = 10;
            
            // fire click event
            canvas.eventHandlers.click({pageX:211, pageY:211});
            expect(clickedCell).toEqual({x:20,y:20});
        });
        
        it("should pass correct cell coordinates when top left corner of bottom right cell is clicked", function() {
            canvas.offsetLeft = 10;
            canvas.offsetTop = 10;
            
            // fire click event
            canvas.eventHandlers.click({pageX:200, pageY:200});
            expect(clickedCell).toEqual({x:20,y:20});
        });
        it("should pass correct cell coordinates when bottom right corner of top left cell is clicked", function() {
            canvas.offsetLeft = 10;
            canvas.offsetTop = 10;
            
            // fire click event
            canvas.eventHandlers.click({pageX:19, pageY:19});
            expect(clickedCell).toEqual({x:1,y:1});
        });
        it("should pass correct cell coordinates when top left corner of (2, 2) cell is clicked", function() {
            canvas.offsetLeft = 10;
            canvas.offsetTop = 10;
            
            // fire click event
            canvas.eventHandlers.click({pageX:20, pageY:20});
            expect(clickedCell).toEqual({x:2,y:2});
        });
    });
});

