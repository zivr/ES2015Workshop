class SliderView {
    constructor(board, $rootElement) {
        this._board = board;
        this._$rootEl = $rootElement;

        $(this._board).on(Board.EVENTS.SWAP, this.onSwapSquares.bind(this));
        $(this._board).on(Board.EVENTS.SHUFFEL, this.resetUI.bind(this));
    }

    resetUI() {
        const rows = this._board.rowsCount;

        this._$rootEl.addClass('board board--' + rows + '-in-row');

        for (let square of this._board.squares) {
            const $squareEl = $('<div class="board__cell">' + (square.value || '&nbsp;') + '</div>');
            $squareEl.data('square', square);
            if (square.isBlank) {
                $squareEl.addClass('board__empty-cell');
            }
            else if (square.value % 2) {
                $squareEl.addClass('board__cell--odd');
            }
            else {
                $squareEl.addClass('board__cell--even');
            }
            this._$rootEl.append($squareEl);
            if (!square.isBlank) {
                $squareEl.click(this.onSquareClicked.bind(this));
            }
        }
    }

    onSquareClicked(e) {
        const $clickedSquare = $(e.currentTarget);
        this._board.moveSquare($clickedSquare.data('square'));
        $('.js-moves-countr').text(this._board.moves);
    }

    onSwapSquares(e, data) {
        const $elA = this._$rootEl.find('div:nth-child(' + (data.posA + 1) + ')');
        const $elB = this._$rootEl.find('div:nth-child(' + (data.posB + 1) + ')');
        const $tmpEl = $('<span>').hide();
        $elA.before($tmpEl);
        $elB.before($elA);
        $tmpEl.replaceWith($elB);
    }
}

