'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('./build/webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _read = require('./read');

var _read2 = _interopRequireDefault(_read);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HotReloader = function () {
  function HotReloader(dir) {
    var dev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck3.default)(this, HotReloader);

    this.dir = dir;
    this.dev = dev;
    this.server = null;
    this.initialized = false;
    this.stats = null;
    this.compilationErrors = null;
    this.prevAssets = null;
    this.prevChunkNames = null;
    this.prevFailedChunkNames = null;
  }

  (0, _createClass3.default)(HotReloader, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.prepareServer();

              case 2:
                _context.next = 4;
                return this.waitUntilValid();

              case 4:
                this.stats = _context.sent;
                _context.next = 7;
                return this.listen();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'prepareServer',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this = this;

        var compiler;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _webpack2.default)(this.dir, { hotReload: true, dev: this.dev });

              case 2:
                compiler = _context2.sent;


                compiler.plugin('after-emit', function (compilation, callback) {
                  var assets = compilation.assets;


                  if (_this.prevAssets) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(assets)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var f = _step.value;

                        deleteCache(assets[f].existsAt);
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(_this.prevAssets)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _f = _step2.value;

                        if (!assets[_f]) {
                          deleteCache(_this.prevAssets[_f].existsAt);
                        }
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }
                  }
                  _this.prevAssets = assets;

                  callback();
                });

                compiler.plugin('done', function (stats) {
                  var compilation = stats.compilation;

                  var chunkNames = new _set2.default(compilation.chunks.map(function (c) {
                    return c.name;
                  }));
                  var failedChunkNames = new _set2.default(compilation.errors.map(function (e) {
                    return e.module.reasons;
                  }).reduce(function (a, b) {
                    return a.concat(b);
                  }, []).map(function (r) {
                    return r.module.chunks;
                  }).reduce(function (a, b) {
                    return a.concat(b);
                  }, []).map(function (c) {
                    return c.name;
                  }));

                  if (_this.initialized) {
                    // detect chunks which have to be replaced with a new template
                    // e.g, pages/index.js <-> pages/_error.js
                    var added = diff(chunkNames, _this.prevChunkNames);
                    var removed = diff(_this.prevChunkNames, chunkNames);
                    var succeeded = diff(_this.prevFailedChunkNames, failedChunkNames);

                    // reload all failed chunks to replace the templace to the error ones,
                    // and to update error content
                    var failed = failedChunkNames;

                    var rootDir = (0, _path.join)('bundles', 'pages');

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = (0, _getIterator3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(added), (0, _toConsumableArray3.default)(removed), (0, _toConsumableArray3.default)(failed), (0, _toConsumableArray3.default)(succeeded)))), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var n = _step3.value;

                        var route = toRoute((0, _path.relative)(rootDir, n));
                        _this.send('reload', route);
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  }

                  _this.initialized = true;
                  _this.stats = stats;
                  _this.compilationErrors = null;
                  _this.prevChunkNames = chunkNames;
                  _this.prevFailedChunkNames = failedChunkNames;
                });

                this.server = new _webpackDevServer2.default(compiler, {
                  publicPath: '/',
                  hot: true,
                  noInfo: true,
                  clientLogLevel: 'warning',
                  stats: {
                    assets: false,
                    children: false,
                    chunks: false,
                    color: false,
                    errors: true,
                    errorDetails: false,
                    hash: false,
                    modules: false,
                    publicPath: false,
                    reasons: false,
                    source: false,
                    timings: false,
                    version: false,
                    warnings: false
                  }
                });

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prepareServer() {
        return _ref2.apply(this, arguments);
      }

      return prepareServer;
    }()
  }, {
    key: 'waitUntilValid',
    value: function waitUntilValid() {
      var _this2 = this;

      return new _promise2.default(function (resolve) {
        _this2.server.middleware.waitUntilValid(resolve);
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        _this3.server.listen(3030, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  }, {
    key: 'getCompilationErrors',
    value: function getCompilationErrors() {
      if (!this.compilationErrors) {
        this.compilationErrors = new _map2.default();

        if (this.stats.hasErrors()) {
          var _stats$compilation = this.stats.compilation,
              compiler = _stats$compilation.compiler,
              errors = _stats$compilation.errors;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {

            for (var _iterator4 = (0, _getIterator3.default)(errors), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var err = _step4.value;
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = (0, _getIterator3.default)(err.module.reasons), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var r = _step5.value;
                  var _iteratorNormalCompletion6 = true;
                  var _didIteratorError6 = false;
                  var _iteratorError6 = undefined;

                  try {
                    for (var _iterator6 = (0, _getIterator3.default)(r.module.chunks), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                      var c = _step6.value;

                      // get the path of the bundle file
                      var path = (0, _path.join)(compiler.outputPath, c.name);
                      var _errors = this.compilationErrors.get(path) || [];
                      this.compilationErrors.set(path, _errors.concat([err]));
                    }
                  } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                      }
                    } finally {
                      if (_didIteratorError6) {
                        throw _iteratorError6;
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      }

      return this.compilationErrors;
    }
  }, {
    key: 'send',
    value: function send(type, data) {
      this.server.sockWrite(this.server.sockets, type, data);
    }
  }]);
  return HotReloader;
}();

exports.default = HotReloader;


function deleteCache(path) {
  delete require.cache[path];
  delete _read2.default.cache[path];
}

function diff(a, b) {
  return new _set2.default([].concat((0, _toConsumableArray3.default)(a)).filter(function (v) {
    return !b.has(v);
  }));
}

function toRoute(file) {
  var f = _path.sep === '\\' ? file.replace(/\\/g, '/') : file;
  return ('/' + f).replace(/(\/index)?\.js$/, '') || '/';
}