'use strict';

require('react-hot-loader/patch');

require('./webpack-dev-client?http://localhost:3030');

var _next = require('./next');

var next = _interopRequireWildcard(_next);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = next;

window.next = next;