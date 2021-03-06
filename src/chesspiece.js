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

/**
 * @fileoverview Chesspiece
 */

goog.provide('bq.Chesspiece');

goog.require('goog.ui.Control');
goog.require('bq.util');
goog.require('bq.ChesspieceRenderer');

/**
 * Class representing a chesspiece.
 *
 * @param {bq.Chesspiece.Face} face Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {bq.Chesspiece.Color} color The color of this piece.
 * @param {bq.ChesspieceRenderer=} opt_renderer Optional renderer.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @constructor
 * @extends {goog.ui.Control}
 */
bq.Chesspiece = function(face, color, opt_renderer, opt_domHelper) {
    goog.ui.Control.call(this, undefined, opt_renderer ||
        bq.ChesspieceRenderer.getInstance(), opt_domHelper);
    this.setFace(face);
    this.setColor(color);
    this.setSupportedState(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(bq.Chesspiece, goog.ui.Control);

/**
 * @enum {number}
 */
bq.Chesspiece.Color = {
  RED: 0,
  BLACK: 1
};

bq.Chesspiece.Face = {
  CHE: 0,
  MA: 1,
  XIANG: 2,
  SHI: 3,
  JIANG: 4,
  PAO: 5,
  BING: 6
};

bq.Chesspiece.FaceStr = ['Che', 'Ma', 'Xiang', 'Shi', 'Jiang', 'Pao', 'Bing'];

/**
 * @type {number} The color of this piece.
 */
bq.Chesspiece.prototype.color_ = undefined;

bq.Chesspiece.prototype.face_ = undefined;

bq.Chesspiece.prototype.setColor = function(color) {
  if(this.isInDocument())
    this.getRenderer().setColor(color);
  this.color_ = color;
};

bq.Chesspiece.prototype.getColor = function() {
  return this.color_;
};

bq.Chesspiece.prototype.setFace = function(face) {
  if(this.isInDocument())
    this.getRenderer().setFace(face);
  this.face_ = face;
};

bq.Chesspiece.prototype.getFace = function() {
  return this.face_;
};

bq.Chesspiece.prototype.getFaceStr = function() {
  return bq.Chesspiece.FaceStr[this.face_];
};

bq.Chesspiece.prototype.getWidth = function() {
  return bq.ChesspieceRenderer.Width;
};

/**
 * @param {number} left
 * @param {number} top
 */
bq.Chesspiece.prototype.setPosition = function(left, top) {
  if (this.isInDocument()) {
    this.getRenderer().setPosition(this.getElement(), left, top);
  }
};

bq.Chesspiece.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
  this.setPosition(this.getOffset(x), this.getOffset(y));
};

bq.Chesspiece.prototype.getPosition = function(offset) {
  var pieceWidth = bq.ChesspieceRenderer.Width;
  return Math.floor((offset - bq.ChessboardRenderer.X + pieceWidth/2) / bq.ChessboardRenderer.Step);
};

bq.Chesspiece.prototype.getOffset = function(x) {
  var pieceWidth = bq.ChesspieceRenderer.Width;
  return bq.ChessboardRenderer.X + x * bq.ChessboardRenderer.Step - pieceWidth / 2;
};

bq.Chesspiece.prototype.movableWithoutMateCheck = function(x, y) {
  var board = this.parent_;
  var sign = this.getColor() * 2 - 1 // Red = -1, Black = 1
  var movex = Math.pow(this.x - x, 2);
  var movey = Math.pow(this.y - y, 2);
  var oneStepOnly = (movex+movey) === 1;
  var threeStepsL = (movex+movey) === 5;
  var bigDiagonal = (movex+movey) === 8;
  var smallDiagonal = (movex+movey) === 2;
  var withinPalace = [3,4,5].contains(x) && [0,1,2,7,8,9].contains(y);
  var blockingPiece = board.at(middle(this.x, x), middle(this.y, y));
  var behindRiver = sign * (y - 4.5) < 0;
  var straightLine = movex === 0 || movey === 0;
  var countInBetween = countPiecesInBetween(board, this.x, this.y, x, y);

  if (this.getFace() === bq.Chesspiece.Face.BING) {
    var forwardOnly = sign * (this.y - y) <= 0;
    var sidewayOkAfterRiver = sign * (this.y - 4.5) * movex >= 0;
    return oneStepOnly && forwardOnly && sidewayOkAfterRiver;
  }
  else if (this.getFace() === bq.Chesspiece.Face.JIANG) {
    return oneStepOnly && withinPalace;
  }
  else if (this.getFace() === bq.Chesspiece.Face.MA) {
    return threeStepsL && !blockingPiece;
  }
  else if (this.getFace() === bq.Chesspiece.Face.XIANG) {
    return bigDiagonal && !blockingPiece && behindRiver;
  }
  else if (this.getFace() === bq.Chesspiece.Face.SHI) {
    return smallDiagonal && withinPalace;
  }
  else if (this.getFace() === bq.Chesspiece.Face.CHE) {
    return straightLine && countInBetween === 0;
  }
  else if (this.getFace() === bq.Chesspiece.Face.PAO) {
    // capturing: PAO jumps over 1 piece to capture
    if (board.at(x, y) && board.at(x, y).getColor() !== this.getColor()) {
      return straightLine && countInBetween === 1;
    }
    // otherwise move like CHE
    return straightLine && countInBetween === 0;
  }
  return false;
};

bq.Chesspiece.prototype.movable = function(x, y) {
  var board = this.parent_;
  if (this.movableWithoutMateCheck(x, y)) {
    var piece = board.at(x, y);
    var ox = this.x, oy = this.y;
    board.movePiece(ox, oy, x, y); // suppose we move the piece
    var j1 = board.jiang(1-board.turn_);
    var j2 = board.jiang();
    var canMove = true;
    // we need to check if any move from opponent can capture the JIANG
    if (j1.x === j2.x && countPiecesInBetween(board, j1.x, j1.y, j2.x, j2.y) === 0) {
      console.log("JIANGs facing directly not allowed");
      canMove = false;
    } else {
      board.pieces().forEach(function(p) {
        if (p.movableWithoutMateCheck(j1.x, j1.y)) {
          canMove = false;
        }
      });
    }
    board.movePiece(x, y, ox, oy); // undo the move
    board.grid_[y][x] = piece;
    return canMove;
  }
  return false;
};
