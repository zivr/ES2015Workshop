var SliderView = function (board , $rootElement) {
    this._board = board;
    this._$rootEl = $rootElement;

    $(this._board).on(Board.EVENTS.SWAP, this.onSwapSquares.bind(this));
    $(this._board).on(Board.EVENTS.SHUFFEL, this.resetUI.bind(this));
};

SliderView.prototype.resetUI = function() {
    var rows = this._board.rowsCount;
    var self = this;

    this._$rootEl.addClass('board board--'+rows+'-in-row');

    this._board.squares.forEach(function (square) {
        var $squareEl = $('<div class="board__cell">' + (square.value || '&nbsp;') + '</div>');
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
        self._$rootEl.append($squareEl);
        if (!square.isBlank) {
            $squareEl.click(self.onSquareClicked.bind(self));
        }
    });
};


SliderView.prototype.onSquareClicked = function(e) {
    var $clickedSquare = $(e.currentTarget);
    this._board.moveSquare($clickedSquare.data('square'));
    $('.js-moves-countr').text(this._board.moves);
};

SliderView.prototype.onSwapSquares = function(e , data) {
    var $elA = this._$rootEl.find('div:nth-child('+(data.posA+1)+')');
    var $elB = this._$rootEl.find('div:nth-child('+(data.posB+1)+')');
    var $tmpEl = $('<span>').hide();
    $elA.before($tmpEl);
    $elB.before($elA);
    $tmpEl.replaceWith($elB);
};

