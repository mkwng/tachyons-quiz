'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// watch and trigger file remove event
// see: https://github.com/webpack/webpack/issues/1533

var WatchRemoveEventPlugin = function () {
  function WatchRemoveEventPlugin() {
    (0, _classCallCheck3.default)(this, WatchRemoveEventPlugin);

    this.removedFiles = [];
  }

  (0, _createClass3.default)(WatchRemoveEventPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.removedFiles = [];

      compiler.plugin('environment', function () {
        if (!compiler.watchFileSystem) return;

        var watchFileSystem = compiler.watchFileSystem;
        var watch = watchFileSystem.watch;


        watchFileSystem.watch = function (files, dirs, missing, startTime, options, callback, callbackUndelayed) {
          var result = watch.call(watchFileSystem, files, dirs, missing, startTime, options, function () {
            compiler.removedFiles = _this.removedFiles;
            _this.removedFiles = [];
            callback.apply(undefined, arguments);
          }, callbackUndelayed);

          var watchpack = watchFileSystem.watcher;
          watchpack.fileWatchers.forEach(function (w) {
            w.on('remove', _this.onRemove.bind(_this, watchpack, w.path));
          });
          return result;
        };
      });
    }
  }, {
    key: 'onRemove',
    value: function onRemove(watchpack, file) {
      this.removedFiles.push(file);
      watchpack.emit('remove', file);
      watchpack._onChange(file);
    }
  }]);
  return WatchRemoveEventPlugin;
}();

exports.default = WatchRemoveEventPlugin;