beforeEach(function() {
  this.addMatchers({
	canMove: function(x, y) {
	  var origin = this.actual;
	  console.log(origin.board);
	  var board = origin.board;
	  var piece = board.at(origin.x, origin.y);
	  board.click(origin.x, origin.y);
	  board.click(x, y);
	  return board.at(x, y) === piece;
	},
	notMove: function(x, y) {
	  var origin = this.actual;
	  var board = origin.board;
	  var piece = board.at(origin.x, origin.y);
	  board.click(origin.x, origin.y);
	  board.click(x, y);
	  return board.at(x, y) !== piece;
	}
  });
});
