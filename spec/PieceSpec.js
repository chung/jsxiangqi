describe("Chess piece", function() {
  var board;
  var $ = function(x, y) { return {x: x, y: y, board: board}; };
  beforeEach(function() {
    board = new bq.Chessboard();
    board.render();
    board.newGame();
  });

  it("BING should only move ahead one step at a time before the River", function() {
    expect($(4, 6)).canMove(4, 5);
    expect($(0, 3)).notMove(0, 5);
    expect($(0, 3)).canMove(0, 4);
    expect($(0, 6)).notMove(0, 4);
    expect($(0, 6)).notMove(1, 6);
  });

  it("BING can never move backward", function() {
    expect($(4, 6)).notMove(4, 7);
  });

  it("BING can move side way after the River, but still one step at a time", function() {
    expect($(4, 6)).canMove(4, 5);
    expect($(0, 3)).canMove(0, 4);
    expect($(4, 5)).canMove(4, 4);
    expect($(0, 4)).notMove(1, 4);
  });

});