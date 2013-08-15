describe("Chess piece", function() {
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

  it("should allow Red to move first", function() {
    $(4, 6).canCanMove(4, 5); // red Bing
  });

  it("should not allow Black to move first", function() {
    $(0, 3).canNotMove(0, 4); // black Bing
  });

  it("should not allow Red to make 2 moves consecutively", function() {
    $(4, 6).canCanMove(4, 5); // red Bing move first
    $(4, 5).canNotMove(4, 4); // red Bing can not move gain
  });

  it("BING should only move ahead one step at a time before the River", function() {
    $(4, 6).canCanMove(4, 5);
    $(0, 3).canNotMove(0, 5);
    $(0, 3).canCanMove(0, 4);
    $(0, 6).canNotMove(0, 4);
    $(0, 6).canNotMove(1, 6);
  });

  it("BING can never move backward", function() {
    $(4, 6).canNotMove(4, 7);
  });

  it("BING can move side way after the River, but still one step at a time", function() {
    $(4, 6).canCanMove(4, 5);
    $(0, 3).canCanMove(0, 4);
    $(4, 5).canCanMove(4, 4);
    $(0, 4).canNotMove(1, 4);
  });

});