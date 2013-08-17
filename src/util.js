goog.provide('bq.util');

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

Array.method('contains', function(o) {
  for (var index in this) {
    if (index !== undefined && this[index] === o) {
	  return true;
	}
  }
  return false;
});

//console.log([3,4,5].contains(3));
