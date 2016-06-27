var Board = function(elementsInRow) {
    this._elementsInRow = elementsInRow;
    this.squares = new SquareCollection();
    this._movesCount = 0;
};

Board.EVENTS = {
    SHUFFEL: 'SHUFFEL',
    SWAP: 'SWAP',
    WIN: 'WIN'
};

Object.defineProperty(Board.prototype, "rowsCount", {
    get: function() {
        return this._elementsInRow;
    }
});

Object.defineProperty(Board.prototype, "colsCount", {
    get: function() {
        return this._elementsInRow;
    }
});

Object.defineProperty(Board.prototype, "moves", {
    get: function() {
        return this._movesCount;
    }
});

//Create a new location for each square on the board.
Board.prototype.shuffle = function() {
    var amountOfSquare = this.colsCount * this.rowsCount;
    var squaresNum = [];
    var i;

    for (i = 0; i < amountOfSquare; i++) {
        squaresNum[i] = i + 1;
    }
    squaresNum[amountOfSquare - 1] = null;

    this.squares.clean();
    for (i = 1; i <= amountOfSquare; i++) {
        var num = Math.floor(Math.random() * squaresNum.length);
        this.squares.add(new Square(squaresNum[num]));
        squaresNum.splice(num, 1);
    }
    if (!this._isSolvable()){
        this.shuffle();
        return;
    }
    $(this).trigger(Board.EVENTS.SHUFFEL);
};

Board.prototype.moveSquare = function(square) {
    var blankSquare = this.squares.getBlankSquare();
    if (this.squares.isNeighbors(square, blankSquare)) {
        this.squares.swap(blankSquare, square);
        $(this).trigger(Board.EVENTS.SWAP, {
            squareA: square,
            posA: this.squares.indexOf(square),
            squareB: blankSquare,
            posB: this.squares.indexOf(blankSquare)
        });
        this._movesCount++;
        this._checkIsWinning();
    }
};

Board.prototype._checkIsWinning = function() {
    var isWinning = this.squares.every(function(square, index) {
        return square.isBlank || square.value === (index + 1);
    });
    if (isWinning) {
        $(this).trigger(Board.EVENTS.WIN);
    }
};

Board.prototype._isSolvable = function() {
    var inversions = 0;
    var squares = this.squares;
    squares.every(function(squareI, idx) {
        squares.every(function(squareJ) {
            if (squareJ.isBlank || squareI.value > squareJ.value){
                inversions++;
            }
        });
        if (squareI.isBlank && idx % 2 === 1) {
            inversions++;
        }
    });
    return (inversions % 2 == 0);
};
