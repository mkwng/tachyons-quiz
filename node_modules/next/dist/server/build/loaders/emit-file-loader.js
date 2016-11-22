'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  this.cacheable();

  var query = _loaderUtils2.default.parseQuery(this.query);
  var name = query.name || '[hash].[ext]';
  var context = query.context || this.options.context;
  var regExp = query.regExp;
  var opts = { context: context, content: content, regExp: regExp };
  var interpolatedName = _loaderUtils2.default.interpolateName(this, name, opts);

  this.emitFile(interpolatedName, content);

  return content;
};