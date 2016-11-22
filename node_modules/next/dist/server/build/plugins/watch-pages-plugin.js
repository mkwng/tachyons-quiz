'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WatchPagesPlugin = function () {
  function WatchPagesPlugin(dir) {
    (0, _classCallCheck3.default)(this, WatchPagesPlugin);

    this.dir = (0, _path.resolve)(dir, 'pages');
    this.prevFileDependencies = null;
  }

  (0, _createClass3.default)(WatchPagesPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('emit', function (compilation, callback) {
        // watch the pages directory
        compilation.contextDependencies = compilation.contextDependencies.concat([_this.dir]);

        _this.prevFileDependencies = compilation.fileDependencies;

        callback();
      });

      var isPageFile = this.isPageFile.bind(this);
      var getEntryName = function getEntryName(f) {
        return (0, _path.join)('bundles', (0, _path.relative)(compiler.options.context, f));
      };
      var errorPageName = (0, _path.join)('bundles', 'pages', '_error.js');

      compiler.plugin('watch-run', function (watching, callback) {
        (0, _keys2.default)(compiler.fileTimestamps).filter(isPageFile).filter(function (f) {
          return _this.prevFileDependencies.indexOf(f) < 0;
        }).forEach(function (f) {
          var name = getEntryName(f);
          if (name === errorPageName) {
            compiler.removeEntry(name);
          }

          if (compiler.hasEntry(name)) return;

          var entries = ['webpack/hot/dev-server', f];
          compiler.addEntry(entries, name);
        });

        compiler.removedFiles.filter(isPageFile).forEach(function (f) {
          var name = getEntryName(f);
          compiler.removeEntry(name);

          if (name === errorPageName) {
            compiler.addEntry(['webpack/hot/dev-server', (0, _path.join)(__dirname, '..', '..', '..', 'pages', '_error.js')], name);
          }
        });

        callback();
      });
    }
  }, {
    key: 'isPageFile',
    value: function isPageFile(f) {
      return f.indexOf(this.dir) === 0 && (0, _path.extname)(f) === '.js';
    }
  }]);
  return WatchPagesPlugin;
}();

exports.default = WatchPagesPlugin;