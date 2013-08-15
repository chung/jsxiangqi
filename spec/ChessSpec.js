describe("Chessboard", function() {
  var board;

  beforeEach(function() {
    board = new bq.Chessboard();
    board.render();
    board.newGame();
  });

  it("should have its grid initialized", function() {
    expect(board.grid_).toNotEqual(undefined);
  });

  it("should have the pieces placed correctly", function() {
    var blackChe1 = board.at(0, 0);
    var redChe2 = board.at(8, 9);
    var blackJiang = board.at(4, 0);
    var redJiang = board.at(4, 9);
    expect(blackChe1.getFace()).toEqual(bq.Chesspiece.Face.CHE);
    expect(blackChe1.getColor()).toEqual(bq.Chesspiece.Color.BLACK);
    expect(redChe2.getFace()).toEqual(bq.Chesspiece.Face.CHE);
    expect(redChe2.getColor()).toEqual(bq.Chesspiece.Color.RED);
    expect(blackJiang.getFace()).toEqual(bq.Chesspiece.Face.JIANG);
    expect(blackJiang.getColor()).toEqual(bq.Chesspiece.Color.BLACK);
    expect(redJiang.getFace()).toEqual(bq.Chesspiece.Face.JIANG);
    expect(redJiang.getColor()).toEqual(bq.Chesspiece.Color.RED);
  });

  it("should allow Red to move first", function() {
    var redChe1 = board.at(0, 9);
    board.click(0, 9); // click on first red Che
    board.click(0, 8); // try to move forward
    expect(board.at(0, 9)).toEqual(null);
    expect(board.at(0, 8)).toEqual(redChe1);
  });

  it("should not allow Black to move first", function() {
    var blackChe1 = board.at(0, 0);
    board.click(0, 0); // click on first black Che
    board.click(0, 1); // try to move forward
    expect(board.at(0, 1)).toEqual(null);
    expect(board.at(0, 0)).toEqual(blackChe1);
  });

  it("should not allow Red to make 2 moves consecutively", function() {
    var redChe1 = board.at(0, 9);
    board.click(0, 9); // click on first red Che
    board.click(0, 8); // try to move forward
    expect(board.at(0, 9)).toEqual(null);
    expect(board.at(0, 8)).toEqual(redChe1);
    board.click(0, 8); // now select this piece again
    board.click(1, 8); // try to move side way
    expect(board.at(1, 8)).toEqual(null);
    expect(board.at(0, 8)).toEqual(redChe1);
  });

});