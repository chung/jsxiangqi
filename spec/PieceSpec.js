describe("Chesspiece", function() {
  var board;
  var $ = function(x, y) {
    var that = {};
    that.canCanMove = function(i, j) {
      var piece = board.at(x, y);
	  board.click(x, y);
	  board.click(i, j);
      expect(board.at(i, j)).toEqual(piece);
	};
    that.canNotMove = function(i, j) {
      var piece = board.at(x, y);
	  board.click(x, y);
	  board.click(i, j);
      expect(board.at(i, j)).toNotEqual(piece);
	};
	return that;
  };

  beforeEach(function() {
    board = new bq.Chessboard();
    board.render();
    board.newGame();
  });

  it("BING should only move ahead one step at a time before the River", function() {
    $(0, 3).canCanMove(0, 4);
    $(0, 4).canNotMove(0, 7);
    $(0, 4).canNotMove(0, 3);
    $(0, 4).canNotMove(1, 4);
  });

  it("BING can move side way after the River, but still one step at a time", function() {
    $(0, 3).canCanMove(0, 4);
    $(0, 4).canCanMove(0, 5);
    $(0, 5).canCanMove(1, 5);
    $(1, 5).canNotMove(1, 7);
    $(1, 5).canCanMove(1, 6);
  });

});