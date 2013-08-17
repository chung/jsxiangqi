goog.provide('bq.util');

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

Array.method('contains', function(o) {
  for (var index in this) {
    if (this[index] === o) {
      return true;
    }
  }
  return false;
});

var middle = function(x1, x2) {
  var m = Math.floor((x1 + x2)/2);
  return (x1 > x2) ? (m + x1 + x2 - 2*m) : m;
}

var countPiecesInBetween = function(board, a1, b1, a2, b2) {
  var c = 0;
  if (a1 == a2) {
    var inc = (b1 < b2) ? 1 : -1;
    for (var b = b1 + inc; b !== b2; b += inc) {
      if (board.at(a1, b)) { c += 1; }
    }
  }
  else if (b1 == b2) {
    var inc = (a1 < a2) ? 1 : -1;
    for (var a = a1 + inc; a !== a2; a += inc) {
      if (board.at(a, b1)) { c += 1; }
    }
  }
  return c;
};