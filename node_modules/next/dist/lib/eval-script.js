'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = evalScript;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _link = require('../lib/link');

var _link2 = _interopRequireDefault(_link);

var _css = require('../lib/css');

var Css = _interopRequireWildcard(_css);

var _head = require('../lib/head');

var _head2 = _interopRequireDefault(_head);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = new _map2.default([['react', _react2.default], ['react-dom', _reactDom2.default], ['next/app', _app2.default], ['next/link', _link2.default], ['next/css', Css], ['next/head', _head2.default]]);

/**
 * IMPORTANT: This module is compiled *without* `use strict`
 * so that when we `eval` a dependency below, we don't enforce
 * `use strict` implicitly.
 *
 * Otherwise, modules like `d3` get `eval`d and forced into
 * `use strict` where they don't work (at least in current versions)
 *
 * To see the compilation details, look at `gulpfile.js` and the
 * usage of `babel-plugin-transform-remove-strict-mode`.
 */

function evalScript(script) {
  var module = { exports: {} };
  var require = function require(path) {
    // eslint-disable-line no-unused-vars
    return modules.get(path);
  };
  // don't use Function() here since it changes source locations
  eval(script); // eslint-disable-line no-eval
  return module.exports;
}