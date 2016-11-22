'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var loadConfig = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var path, data, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = (0, _path.join)(dir, 'package.json');
            data = void 0;
            _context.prev = 2;
            _context.next = 5;
            return (0, _fs.readFile)(path, 'utf8');

          case 5:
            data = _context.sent;
            _context.next = 15;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](2);

            if (!(_context.t0.code === 'ENOENT')) {
              _context.next = 14;
              break;
            }

            data = '{}';
            _context.next = 15;
            break;

          case 14:
            throw _context.t0;

          case 15:

            // no try-cache, it must be a valid json
            config = JSON.parse(data).next || {};
            return _context.abrupt('return', (0, _assign2.default)({}, defaultConfig, config));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8]]);
  }));

  return function loadConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getConfig;

var _path = require('path');

var _fs = require('mz/fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new _map2.default();

var defaultConfig = { cdn: true };

function getConfig(dir) {
  if (!cache.has(dir)) {
    cache.set(dir, loadConfig(dir));
  }
  return cache.get(dir);
}