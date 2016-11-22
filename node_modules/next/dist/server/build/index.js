'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webpack = require('./webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _clean = require('./clean');

var _clean2 = _interopRequireDefault(_clean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var _ref2, _ref3, compiler;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _promise2.default.all([(0, _webpack2.default)(dir), (0, _clean2.default)(dir)]);

          case 2:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray3.default)(_ref2, 1);
            compiler = _ref3[0];
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              compiler.run(function (err, stats) {
                if (err) return reject(err);

                var jsonStats = stats.toJson();
                if (jsonStats.errors.length > 0) {
                  var error = new Error(jsonStats.errors[0]);
                  error.errors = jsonStats.errors;
                  error.warnings = jsonStats.warnings;
                  return reject(error);
                }

                resolve();
              });
            }));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function build(_x) {
    return _ref.apply(this, arguments);
  }

  return build;
}();