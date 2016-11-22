'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('glamor');

/**
 * Expose style as default and the whole object as properties
 * so it can be used as follows:
 *
 * import css, { merge } from 'next/css'
 * css({ color: 'red' })
 * merge({ color: 'green' })
 * css.merge({ color: 'blue' })
 */

css.default = css.style;
(0, _keys2.default)(css).forEach(function (key) {
  if (key !== 'default') {
    css.default[key] = css[key];
  }
});

module.exports = css;