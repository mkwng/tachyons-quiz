'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _react = require('react');

var _reactDom = require('react-dom');

var _headManager = require('./head-manager');

var _headManager2 = _interopRequireDefault(_headManager);

var _css = require('../lib/css');

var _router = require('../lib/router');

var _router2 = _interopRequireDefault(_router);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _evalScript = require('../lib/eval-script');

var _evalScript2 = _interopRequireDefault(_evalScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _window = window,
    _window$__NEXT_DATA__ = _window.__NEXT_DATA__,
    component = _window$__NEXT_DATA__.component,
    props = _window$__NEXT_DATA__.props,
    ids = _window$__NEXT_DATA__.ids,
    err = _window$__NEXT_DATA__.err;


var Component = (0, _evalScript2.default)(component).default;

var router = exports.router = new _router2.default(window.location.href, { Component: Component, ctx: { err: err } });

var headManager = new _headManager2.default();
var container = document.getElementById('__next');
var appProps = { Component: Component, props: props, router: router, headManager: headManager };

(0, _css.rehydrate)(ids);
(0, _reactDom.render)((0, _react.createElement)(_app2.default, appProps), container);