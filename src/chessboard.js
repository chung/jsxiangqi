/**
 * Copyright 2010 BQ Luan. All Rights Reserved.
 *
 * This file is part of JsXiangqi.
 *
 * JsXiangqi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * JsXiangqi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with JsXiangqi.  If not, see http://www.gnu.org/license.
 */

goog.provide('bq.Chessboard');

goog.require('goog.ui.Control');
goog.require('bq.ChessboardRenderer');
goog.require('bq.Chesspiece');

/**
 * Class representing a chessboard.
 *
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {bq.ChessboardRenderer=} opt_renderer Optional renderer.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @constructor
 * @extends {goog.ui.Control}
 */
bq.Chessboard = function(content, opt_renderer, opt_domHelper) {
  goog.ui.Control.call(this, content, opt_renderer ||
      bq.ChessboardRenderer.getInstance(), opt_domHelper);
  this.grid_ = [
    [
      new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.JIANG, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK),
      new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK)
    ],
    [null, null, null, null, null, null, null, null, null],
    [
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK),
      null, null, null, null, null,
      new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK),
      null
    ],
    [
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK)
    ],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED),
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED)
    ],
    [
      null,
      new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED),
      null, null, null, null, null,
      new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED),
      null
    ],
    [null, null, null, null, null, null, null, null, null],
    [
      new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.JIANG, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED),
      new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED)
    ]
  ];
};
goog.inherits(bq.Chessboard, goog.ui.Control);

bq.Chessboard.prototype.grid_ = undefined;

bq.Chessboard.prototype.at = function(x, y) { return this.grid_[y][x]; };

/**
 * @type {number} The coordinate of selected piece.
 */
bq.Chessboard.prototype.x_ = -1;
bq.Chessboard.prototype.y_ = -1;

bq.Chessboard.prototype.newGame = function() {
  if(!this.isInDocument()) {
    throw new Error('Call Chessboard.render() first.');
  }
  // Red to move first
  this.turn_ = bq.Chesspiece.Color.RED;
  var elem = this.getElement();
  for (var j = 0; j < this.grid_.length; j++) {
    var row = this.grid_[j];
    for (var i = 0; i < row.length; i++) {
      var piece = row[i];
      if (piece) {
        piece.render(elem);
        this.addChild(piece);
        this.movePiece(i, j, i, j);
      }
    }
  }
};

bq.Chessboard.prototype.pieces = function(color) {
  var turn = color !== undefined ? color: this.turn_;
  var result = new Array();
  for (var j = 0; j < this.grid_.length; j++) {
    var row = this.grid_[j];
    for (var i = 0; i < row.length; i++) {
      var piece = row[i];
      if (piece && piece.getColor() === turn) {
        result.push(piece);
      }
    }
  }
  return result;
};

// Return the Jiang piece for the color
// if not specified, the current turn
bq.Chessboard.prototype.jiang = function(color) {
  var turn = color !== undefined ? color: this.turn_;
  for (var j = 0; j < this.grid_.length; j++) {
    var row = this.grid_[j];
    for (var i = 0; i < row.length; i++) {
      var piece = row[i];
      if (piece && piece.getColor() === turn &&
          piece.getFace() === bq.Chesspiece.Face.JIANG) {
        return piece;
      }
    }
  }
};

/**
 * @param {number} i
 * @param {number} j
 * @param {number} x
 * @param {number} y
 */
bq.Chessboard.prototype.movePiece = function(i, j, x, y) {
  var piece = this.grid_[j][i];
  piece.move(x, y);
  if (i !== x || j !== y) {
    this.grid_[y][x] = piece;
    this.grid_[j][i] = null;
    this.turn_ = 1 - this.turn_; // take turn
  }
};

/**
 * Sets up event handling.  Overrides {@link goog.ui.Component#enterDocument}.
 * @override
 */
bq.Chessboard.prototype.enterDocument = function() {
  bq.Chessboard.superClass_.enterDocument.call(this);
  this.getHandler().listen(
      this.getElement(), goog.events.EventType.CLICK, this.handleClick_);
};

bq.Chessboard.prototype.getSelectedPiece = function() {
  return (this.x_ === -1 || this.y_ === -1) ? null : this.grid_[this.y_][this.x_];
};

bq.Chessboard.prototype.click = function(x, y) {
  var elem; // What element you clicked at?
  var clickedPiece = this.grid_[y][x];
  if (clickedPiece === null) {
    elem = this.element_; // No piece? you must clicked at the board element
  } else {
    elem = clickedPiece.getElement();
  }
  var e = {
    offsetX: bq.Chesspiece.prototype.getOffset(x),
    offsetY: bq.Chesspiece.prototype.getOffset(y),
    target: elem
  };
  this.handleClick_(e);
};

bq.Chessboard.prototype.handleClick_ = function(e) {
  var selectedPiece = this.getSelectedPiece();
  // If the chessboard is clicked
  if (e.target === this.element_) {
    if (selectedPiece) {
      var x = selectedPiece.getPosition(e.offsetX);
      var y = selectedPiece.getPosition(e.offsetY);
      if (this.turn_ === selectedPiece.getColor() && selectedPiece.movable(x, y)) {
        console.log(selectedPiece.getFaceStr() + "\t (" + this.x_ + ", " + this.y_ + ") to (" + x + ", " + y + ")");
        this.movePiece(this.x_, this.y_, x, y);
      }
      this.x_ = -1;
      this.y_ = -1;
      selectedPiece.setSelected(false);
    }
    return;
  }

  var x, y, clickedPiece;
  for (y = 0; y < 10; y++) {
    var found = false;
    for (x = 0; x < 9; x++) {
      clickedPiece = this.grid_[y][x];
      if (clickedPiece && clickedPiece.getElement() === e.target) {
        found = true;
        break;
      }
    }
    if (found) {
      //console.log("found a piece at: x=" + x + ", y=" + y);
      break;
    }
  }

  // If there is no piece selected, mark the clicked piece as selected.
  if (!selectedPiece) {
    this.x_ = x;
    this.y_ = y;
    clickedPiece.setSelected(true);
    return;
  }
  
  if (selectedPiece === clickedPiece) {
    clickedPiece.setSelected(false);
    this.x_ = -1;
    this.y_ = -1;
    return;
  }

  // If the clicked piece is not the one already selected, remove the
  // clicked piece and move the selected one to its position.
  if (clickedPiece.getColor() !== selectedPiece.getColor() && selectedPiece.movable(x, y)) {
    clickedPiece.dispose();
    clickedPiece = null;
    this.grid_[y][x] = null;
    this.movePiece(this.x_, this.y_, x, y);
    this.x_ = -1;
    this.y_ = -1;
  } else {
    this.x_ = x;
    this.y_ = y;
    clickedPiece.setSelected(true);
  }
  selectedPiece.setSelected(false);
};