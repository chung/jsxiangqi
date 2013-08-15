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
    var blackChe1 = board.grid_[0][0];
    var redChe2 = board.grid_[9][8];
    var blackJiang = board.grid_[0][4];
    var redJiang = board.grid_[9][4];
    expect(blackChe1.getFace()).toEqual(bq.Chesspiece.Face.CHE);
    expect(blackChe1.getColor()).toEqual(bq.Chesspiece.Color.BLACK);
    expect(redChe2.getFace()).toEqual(bq.Chesspiece.Face.CHE);
    expect(redChe2.getColor()).toEqual(bq.Chesspiece.Color.RED);
    expect(blackJiang.getFace()).toEqual(bq.Chesspiece.Face.JIANG);
    expect(blackJiang.getColor()).toEqual(bq.Chesspiece.Color.BLACK);
    expect(redJiang.getFace()).toEqual(bq.Chesspiece.Face.JIANG);
    expect(redJiang.getColor()).toEqual(bq.Chesspiece.Color.RED);
  });

});