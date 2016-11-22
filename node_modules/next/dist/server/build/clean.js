'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clean;

var _path = require('path');

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean(dir) {
  return (0, _del2.default)((0, _path.resolve)(dir, '.next'));
}