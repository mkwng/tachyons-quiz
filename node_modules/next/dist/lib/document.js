'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _htmlescape = require('htmlescape');

var _htmlescape2 = _interopRequireDefault(_htmlescape);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var head = _ref.head,
      css = _ref.css,
      html = _ref.html,
      data = _ref.data,
      dev = _ref.dev,
      staticMarkup = _ref.staticMarkup,
      cdn = _ref.cdn;

  return _react2.default.createElement(
    'html',
    null,
    _react2.default.createElement(
      'head',
      null,
      (head || []).map(function (h, i) {
        return _react2.default.cloneElement(h, { key: i });
      }),
      _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: css } })
    ),
    _react2.default.createElement(
      'body',
      null,
      _react2.default.createElement('div', { id: '__next', dangerouslySetInnerHTML: { __html: html } }),
      staticMarkup ? null : _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: '__NEXT_DATA__ = ' + (0, _htmlescape2.default)(data) } }),
      staticMarkup ? null : createClientScript({ dev: dev, cdn: cdn })
    )
  );
};

function createClientScript(_ref2) {
  var dev = _ref2.dev,
      cdn = _ref2.cdn;

  if (dev) {
    return _react2.default.createElement('script', { type: 'text/javascript', src: '/_next/next-dev.bundle.js' });
  }

  if (!cdn) {
    return _react2.default.createElement('script', { type: 'text/javascript', src: '/_next/next.bundle.js' });
  }

  return _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: '\n    (function () {\n      load(\'https://cdn.zeit.co/next.js/' + _package2.default.version + '/next.min.js\', function (err) {\n        if (err) load(\'/_next/next.bundle.js\')\n      })\n\n      function load (src, fn) {\n        fn = fn || function () {}\n        var script = document.createElement(\'script\')\n        script.src = src\n        script.onload = function () { fn(null) }\n        script.onerror = fn\n        script.crossorigin = \'anonymous\'\n        document.head.appendChild(script)\n      }\n    })()\n  ' } });
}