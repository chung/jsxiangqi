describe("Chess piece", function() {
  var board, _ = function(x, y) { return {x: x, y: y, board: board}; };
  beforeEach(function() {
    board = new bq.Chessboard();
    board.render();
    board.newGame();
  });

  it("BING should only move ahead one step at a time before the River", function() {
    expect(_(4, 6)).canMove(4, 5);
    expect(_(0, 3)).notMove(0, 5);
    expect(_(0, 3)).canMove(0, 4);
    expect(_(0, 6)).notMove(0, 4);
    expect(_(0, 6)).notMove(1, 6);
  });

  it("BING can never move backward", function() {
    expect(_(4, 6)).notMove(4, 7);
  });

  it("BING can move side way after the River, but still one step at a time", function() {
    expect(_(4, 6)).canMove(4, 5);
    expect(_(0, 3)).canMove(0, 4);
    expect(_(4, 5)).canMove(4, 4);
    expect(_(0, 4)).notMove(1, 4);
  });

  it("JIANG should only move one step at a time", function() {
    expect(_(4, 9)).canMove(4, 8);
    expect(_(4, 0)).notMove(5, 1);
    expect(_(4, 0)).canMove(4, 1);
    expect(_(4, 8)).notMove(5, 7);
    expect(_(4, 8)).canMove(5, 8);
  });

  it("JIANG should only move within the palace", function() {
    expect(_(4, 9)).canMove(4, 8);
    expect(_(4, 0)).canMove(4, 1);
    expect(_(4, 8)).canMove(5, 8);
    expect(_(4, 1)).canMove(4, 2);
    expect(_(5, 8)).notMove(6, 8);
    expect(_(4, 2)).notMove(4, 3);
  });

  it("MA should only move in L shape", function() {
    expect(_(1, 9)).canMove(0, 7);
    expect(_(1, 0)).canMove(2, 2);
    expect(_(0, 7)).canMove(1, 9);
    expect(_(2, 2)).canMove(1, 0);
    expect(_(1, 9)).notMove(2, 8);
    expect(_(1, 0)).notMove(3, 2);
  });

});