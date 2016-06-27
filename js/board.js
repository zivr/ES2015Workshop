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

        let squaresNum = [...Array(amountOfSquare)].map((x, i) => i+ 1);
        squaresNum[amountOfSquare - 1] = null;

        this.squares.clean();
        for (let i = 1; i <= amountOfSquare; i++) {
            const num = Math.floor(Math.random() * squaresNum.length);
            this.squares.add(new Square(squaresNum[num]));
            squaresNum.splice(num, 1);
        }
        this._checkIsSolvable().then(()=> {
            $(this).trigger(Board.EVENTS.SHUFFEL);
        }, () => {
            this.shuffle();
        });
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
        var isWinning = this.squares.every((square, index) =>{
            return square.isBlank || square.value === (index + 1);
        });
        if (isWinning) {
            $(this).trigger(Board.EVENTS.WIN);
        }
    }

    _checkIsSolvable() {
        return new Promise((resolve, reject) => {
            let inversions = 0;
            this.squares.every((squareI, idx) => {
                for(const squareJ in this.squares){
                    if (squareJ.isBlank || squareI.value > squareJ.value) {
                        inversions++;
                    }
                }
                if (squareI.isBlank && idx % 2 === 1) {
                    inversions++;
                }
            });
            inversions % 2 == 0 ? resolve() : reject();
        });
    };
}
