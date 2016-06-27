class Board {
    constructor(elementsInRow) {
        this._elementsInRow = elementsInRow;
        this.squares = new SquareCollection();
        this._movesCount = 0;
    }

    static get EVENTS() {
        return {
            SHUFFEL: 'SHUFFEL',
            SWAP: 'SWAP',
            WIN: 'WIN'
        };
    }

    get rowsCount() {
        return this._elementsInRow;
    }

    get colsCount() {
        return this._elementsInRow;
    }

    get moves() {
        return this._movesCount;
    }

    shuffle() {
        const amountOfSquare = this.colsCount * this.rowsCount;

        let squaresNum = [];
        for (let i = 0; i < amountOfSquare; i++) {
            squaresNum[i] = i + 1;
        }
        squaresNum[amountOfSquare - 1] = null;

        this.squares.clean();
        for (let i = 1; i <= amountOfSquare; i++) {
            const num = Math.floor(Math.random() * squaresNum.length);
            this.squares.add(new Square(squaresNum[num]));
            squaresNum.splice(num, 1);
        }
        if (!this._isSolvable()){
            this.shuffle();
            return;
        }
        $(this).trigger(Board.EVENTS.SHUFFEL);
    }

    moveSquare(square) {
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
    }

    _checkIsWinning() {
        var isWinning = this.squares.every(function(square, index) {
            return square.isBlank || square.value === (index + 1);
        });
        if (isWinning) {
            $(this).trigger(Board.EVENTS.WIN);
        }
    }

    _isSolvable() {
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
}
