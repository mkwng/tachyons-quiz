'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _url = require('url');

var _send = require('send');

var _send2 = _interopRequireDefault(_send);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _render2 = require('./render');

var _hotReloader = require('./hot-reloader');

var _hotReloader2 = _interopRequireDefault(_hotReloader);

var _resolve = require('./resolve');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  function Server(_ref) {
    var _this = this;

    var _ref$dir = _ref.dir,
        dir = _ref$dir === undefined ? '.' : _ref$dir,
        _ref$dev = _ref.dev,
        dev = _ref$dev === undefined ? false : _ref$dev,
        _ref$hotReload = _ref.hotReload,
        hotReload = _ref$hotReload === undefined ? false : _ref$hotReload;
    (0, _classCallCheck3.default)(this, Server);

    this.dir = (0, _path.resolve)(dir);
    this.dev = dev;
    this.hotReloader = hotReload ? new _hotReloader2.default(this.dir, this.dev) : null;
    this.router = new _router2.default();

    this.http = _http2.default.createServer(function (req, res) {
      _this.run(req, res).catch(function (err) {
        console.error(err);
        res.status(500);
        res.end('error');
      });
    });

    this.defineRoutes();
  }

  (0, _createClass3.default)(Server, [{
    key: 'start',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(port) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.hotReloader) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.hotReloader.start();

              case 3:
                _context.next = 5;
                return new _promise2.default(function (resolve, reject) {
                  _this2.http.listen(port, function (err) {
                    if (err) return reject(err);
                    resolve();
                  });
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x) {
        return _ref2.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'defineRoutes',
    value: function defineRoutes() {
      var _this3 = this;

      this.router.get('/_next/:path+', function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  p = _path.join.apply(undefined, [__dirname, '..', 'client'].concat((0, _toConsumableArray3.default)(params.path || [])));
                  _context2.next = 3;
                  return _this3.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }));

        return function (_x2, _x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());

      this.router.get('/static/:path+', function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, params) {
          var p;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  p = _path.join.apply(undefined, [_this3.dir, 'static'].concat((0, _toConsumableArray3.default)(params.path || [])));
                  _context3.next = 3;
                  return _this3.serveStatic(req, res, p);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }));

        return function (_x5, _x6, _x7) {
          return _ref4.apply(this, arguments);
        };
      }());

      this.router.get('/:path+.json', function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _this3.renderJSON(req, res);

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this3);
        }));

        return function (_x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());

      this.router.get('/:path*', function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return _this3.render(req, res);

                case 2:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this3);
        }));

        return function (_x10, _x11) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'run',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res) {
        var fn;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                fn = this.router.match(req, res);

                if (!fn) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 4;
                return fn();

              case 4:
                _context6.next = 8;
                break;

              case 6:
                _context6.next = 8;
                return this.render404(req, res);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function run(_x12, _x13) {
        return _ref7.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'render',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res) {
        var dir, dev, _parse, pathname, query, ctx, opts, html, err, _err;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dir = this.dir, dev = this.dev;
                _parse = (0, _url.parse)(req.url, true), pathname = _parse.pathname, query = _parse.query;
                ctx = { req: req, res: res, pathname: pathname, query: query };
                opts = { dir: dir, dev: dev };
                html = void 0;
                err = this.getCompilationError(req.url);

                if (!err) {
                  _context7.next = 13;
                  break;
                }

                res.statusCode = 500;
                _context7.next = 10;
                return (0, _render2.render)('/_error-debug', (0, _extends3.default)({}, ctx, { err: err }), opts);

              case 10:
                html = _context7.sent;
                _context7.next = 33;
                break;

              case 13:
                _context7.prev = 13;
                _context7.next = 16;
                return (0, _render2.render)(req.url, ctx, opts);

              case 16:
                html = _context7.sent;
                _context7.next = 33;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7['catch'](13);
                _err = this.getCompilationError('/_error');

                if (!_err) {
                  _context7.next = 29;
                  break;
                }

                res.statusCode = 500;
                _context7.next = 26;
                return (0, _render2.render)('/_error-debug', (0, _extends3.default)({}, ctx, { err: _err }), opts);

              case 26:
                html = _context7.sent;
                _context7.next = 33;
                break;

              case 29:
                if (_context7.t0.code === 'ENOENT') {
                  res.statusCode = 404;
                } else {
                  console.error(_context7.t0);
                  res.statusCode = 500;
                }
                _context7.next = 32;
                return (0, _render2.render)('/_error', (0, _extends3.default)({}, ctx, { err: _context7.t0 }), opts);

              case 32:
                html = _context7.sent;

              case 33:

                sendHTML(res, html);

              case 34:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[13, 19]]);
      }));

      function render(_x14, _x15) {
        return _ref8.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'renderJSON',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res) {
        var dir, opts, json, err, _err, data;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                dir = this.dir;
                opts = { dir: dir };
                json = void 0;
                err = this.getCompilationError(req.url);

                if (!err) {
                  _context8.next = 12;
                  break;
                }

                res.statusCode = 500;
                _context8.next = 8;
                return (0, _render2.renderJSON)('/_error-debug.json', opts);

              case 8:
                json = _context8.sent;

                json = (0, _extends3.default)({}, json, { err: (0, _render2.errorToJSON)(err) });
                _context8.next = 33;
                break;

              case 12:
                _context8.prev = 12;
                _context8.next = 15;
                return (0, _render2.renderJSON)(req.url, opts);

              case 15:
                json = _context8.sent;
                _context8.next = 33;
                break;

              case 18:
                _context8.prev = 18;
                _context8.t0 = _context8['catch'](12);
                _err = this.getCompilationError('/_error.json');

                if (!_err) {
                  _context8.next = 29;
                  break;
                }

                res.statusCode = 500;
                _context8.next = 25;
                return (0, _render2.renderJSON)('/_error-debug.json', opts);

              case 25:
                json = _context8.sent;

                json = (0, _extends3.default)({}, json, { err: (0, _render2.errorToJSON)(_err) });
                _context8.next = 33;
                break;

              case 29:
                if (_context8.t0.code === 'ENOENT') {
                  res.statusCode = 404;
                } else {
                  console.error(_context8.t0);
                  res.statusCode = 500;
                }
                _context8.next = 32;
                return (0, _render2.renderJSON)('/_error.json', opts);

              case 32:
                json = _context8.sent;

              case 33:
                data = (0, _stringify2.default)(json);

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Length', Buffer.byteLength(data));
                res.end(data);

              case 37:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[12, 18]]);
      }));

      function renderJSON(_x16, _x17) {
        return _ref9.apply(this, arguments);
      }

      return renderJSON;
    }()
  }, {
    key: 'render404',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res) {
        var dir, dev, _parse2, pathname, query, ctx, opts, html, err;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dir = this.dir, dev = this.dev;
                _parse2 = (0, _url.parse)(req.url, true), pathname = _parse2.pathname, query = _parse2.query;
                ctx = { req: req, res: res, pathname: pathname, query: query };
                opts = { dir: dir, dev: dev };
                html = void 0;
                err = this.getCompilationError('/_error');

                if (!err) {
                  _context9.next = 13;
                  break;
                }

                res.statusCode = 500;
                _context9.next = 10;
                return (0, _render2.render)('/_error-debug', (0, _extends3.default)({}, ctx, { err: err }), opts);

              case 10:
                html = _context9.sent;
                _context9.next = 17;
                break;

              case 13:
                res.statusCode = 404;
                _context9.next = 16;
                return (0, _render2.render)('/_error', ctx, opts);

              case 16:
                html = _context9.sent;

              case 17:

                sendHTML(res, html);

              case 18:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function render404(_x18, _x19) {
        return _ref10.apply(this, arguments);
      }

      return render404;
    }()
  }, {
    key: 'serveStatic',
    value: function serveStatic(req, res, path) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        (0, _send2.default)(req, path).on('error', function (err) {
          if (err.code === 'ENOENT') {
            _this4.render404(req, res).then(resolve, reject);
          } else {
            reject(err);
          }
        }).pipe(res).on('finish', resolve);
      });
    }
  }, {
    key: 'getCompilationError',
    value: function getCompilationError(url) {
      if (!this.hotReloader) return;

      var errors = this.hotReloader.getCompilationErrors();
      if (!errors.size) return;

      var p = (0, _url.parse)(url || '/').pathname.replace(/\.json$/, '');
      var id = (0, _path.join)(this.dir, '.next', 'bundles', 'pages', p);
      var path = (0, _resolve.resolveFromList)(id, errors.keys());
      if (path) return errors.get(path)[0];
    }
  }]);
  return Server;
}();

exports.default = Server;


function sendHTML(res, html) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}