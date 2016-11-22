'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  this.cacheable();

  var route = getRoute(this);

  return content + '\n    if (module.hot) {\n      module.hot.accept()\n\n      var Component = module.exports.default || module.exports\n      Component.__route = ' + (0, _stringify2.default)(route) + '\n\n      if (module.hot.status() !== \'idle\') {\n        var components = next.router.components\n        for (var r in components) {\n          if (!components.hasOwnProperty(r)) continue\n\n          if (components[r].Component.__route === ' + (0, _stringify2.default)(route) + ') {\n            next.router.update(r, Component)\n          }\n        }\n      }\n    }\n  ';
};

var nextPagesDir = (0, _path.resolve)(__dirname, '..', '..', '..', 'pages');

function getRoute(loaderContext) {
  var pagesDir = (0, _path.resolve)(loaderContext.options.context, 'pages');
  var resourcePath = loaderContext.resourcePath;

  var dir = [pagesDir, nextPagesDir].find(function (d) {
    return resourcePath.indexOf(d) === 0;
  });
  var path = (0, _path.relative)(dir, resourcePath);
  return '/' + path.replace(/((^|\/)index)?\.js$/, '');
}