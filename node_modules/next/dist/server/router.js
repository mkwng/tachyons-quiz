'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _pathMatch = require('path-match');

var _pathMatch2 = _interopRequireDefault(_pathMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = (0, _pathMatch2.default)();

var Router = function () {
  function Router() {
    (0, _classCallCheck3.default)(this, Router);

    this.routes = new _map2.default();
  }

  (0, _createClass3.default)(Router, [{
    key: 'get',
    value: function get(path, fn) {
      this.add('GET', path, fn);
    }
  }, {
    key: 'add',
    value: function add(method, path, fn) {
      var routes = this.routes.get(method) || new _set2.default();
      routes.add({ match: route(path), fn: fn });
      this.routes.set(method, routes);
    }
  }, {
    key: 'match',
    value: function match(req, res) {
      var _this = this;

      var routes = this.routes.get(req.method);
      if (!routes) return;

      var _parse = (0, _url.parse)(req.url),
          pathname = _parse.pathname;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var r = _step.value;

          var params = r.match(pathname);
          if (params) {
            return {
              v: function () {
                var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt('return', r.fn(req, res, params));

                        case 1:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function v() {
                  return _ref.apply(this, arguments);
                };
              }()
            };
          }
        };

        for (var _iterator = (0, _getIterator3.default)(routes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
    }
  }]);
  return Router;
}();

exports.default = Router;