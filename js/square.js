var Square = function(value) {
    this._val = value;
};

Object.defineProperty(Square.prototype, "value", {
    get: function() {
        return this._val;
    }
});

Object.defineProperty(Square.prototype, "isBlank", {
    get: function() {
        return this._val === null || isNaN(this._val);
    }
});


var SquareCollection = function() {
    this.squares = [];
};

SquareCollection.prototype.add = function(square) {
    this.squares.push(square);
};

SquareCollection.prototype.clean = function() {
    this.squares = [];
};

SquareCollection.prototype.getBlankSquare = function() {
    //We don't use find because it is not supported by IE
    var i = 0, len = this.squares.length;
    var square;
    do {
        square = this.squares[i++];
    } while (i < len && !square.isBlank);
    return square;
};

SquareCollection.prototype.indexOf = function(square) {
    return this.squares.indexOf(square);
};

SquareCollection.prototype.swap = function(squareA, squareB) {
    var squareAPos = this.indexOf(squareA);
    var squareBPos = this.indexOf(squareB);
    this.squares[squareAPos] = squareB;
    this.squares[squareBPos] = squareA;
};

SquareCollection.prototype._convertTo2D = function(square) {
    var numOfCols = Math.sqrt(this.squares.length);
    var index = this.squares.indexOf(square);
    return { x: Math.floor(index / numOfCols), y: index % numOfCols }
};

SquareCollection.prototype.isNeighbors = function(squareA, squareB) {
    var squareAPos = this._convertTo2D(squareA);
    var squareBPos = this._convertTo2D(squareB);

    return ((squareAPos.x === squareBPos.x && Math.abs(squareAPos.y - squareBPos.y) === 1) ||
    (squareAPos.y === squareBPos.y && Math.abs(squareAPos.x - squareBPos.x) === 1));
};

SquareCollection.prototype.forEach = function (callback) {
    this.squares.forEach(callback);
};

SquareCollection.prototype.every = function (callback) {
    return this.squares.every(callback);
};

