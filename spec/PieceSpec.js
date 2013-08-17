describe("Chess piece", function() {
  var board, _ = function(x, y) { return {x: x, y: y, board: board}; };
  beforeEach(function() {
    board = new bq.Chessboard();
    board.render();
    board.newGame();
  });

  it("BING should only move ahead one step at a time before the River", function() {
    expect(_(4, 6)).movable(4, 5);
    expect(_(0, 3)).not.movable(0, 5);
    expect(_(0, 3)).movable(0, 4);
    expect(_(0, 6)).not.movable(0, 4);
    expect(_(0, 6)).not.movable(1, 6);
  });

  it("BING can never move backward", function() {
    expect(_(4, 6)).not.movable(4, 7);
  });

  it("BING can move side way after the River, but still one step at a time", function() {
    expect(_(4, 6)).movable(4, 5);
    expect(_(0, 3)).movable(0, 4);
    expect(_(4, 5)).movable(4, 4);
    expect(_(0, 4)).not.movable(1, 4);
  });

  it("JIANG should only move one step at a time", function() {
    expect(_(4, 9)).movable(4, 8);
    expect(_(4, 0)).not.movable(5, 1);
    expect(_(4, 0)).movable(4, 1);
    expect(_(4, 8)).not.movable(5, 7);
    expect(_(4, 8)).movable(5, 8);
  });

  it("JIANG should only move within the palace", function() {
    expect(_(4, 9)).movable(4, 8);
    expect(_(4, 0)).movable(4, 1);
    expect(_(4, 8)).movable(5, 8);
    expect(_(4, 1)).movable(4, 2);
    expect(_(5, 8)).not.movable(6, 8);
    expect(_(4, 2)).not.movable(4, 3);
  });

  it("MA should only move in L shape", function() {
    expect(_(1, 9)).movable(0, 7);
    expect(_(1, 0)).movable(2, 2);
    expect(_(0, 7)).movable(1, 9);
    expect(_(2, 2)).movable(1, 0);
    expect(_(1, 9)).not.movable(2, 8);
    expect(_(1, 0)).not.movable(3, 2);
  });

});