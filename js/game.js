var Game = function (elementsInRow) {
    this._board = new Board(elementsInRow);
    this._view = new SliderView(this._board , $('.js-board'));
    $(this._board).on(Board.EVENTS.WIN, this._onGameWon.bind(this));
};

Game.startGame = function(elementsInRow) {
    var g = new Game(elementsInRow);
    g.shuffle();
    return g;
};

Game.prototype.shuffle = function() {
    this._board.shuffle();
};

Game.prototype._onGameWon = function() {
    alert('congratulation');
};





