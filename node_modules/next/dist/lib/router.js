'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _evalScript = require('./eval-script');

var _evalScript2 = _interopRequireDefault(_evalScript);

var _shallowEquals = require('./shallow-equals');

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function () {
  function Router(url, initialData) {
    (0, _classCallCheck3.default)(this, Router);

    var parsed = (0, _url.parse)(url, true);

    // represents the current component key
    this.route = toRoute(parsed.pathname);

    // set up the component cache (by route keys)
    this.components = (0, _defineProperty3.default)({}, this.route, initialData);

    this.pathname = parsed.pathname;
    this.query = parsed.query;
    this.subscriptions = new _set2.default();
    this.componentLoadCancel = null;
    this.onPopState = this.onPopState.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', this.onPopState);
    }
  }

  (0, _createClass3.default)(Router, [{
    key: 'onPopState',
    value: function onPopState(e) {
      var _this = this;

      this.abortComponentLoad();

      var _parse = (0, _url.parse)(window.location.href, true),
          pathname = _parse.pathname,
          query = _parse.query;

      var route = (e.state || {}).route || toRoute(pathname);

      _promise2.default.resolve().then((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var data, ctx, props;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.fetchComponent(route);

              case 2:
                data = _context.sent;
                ctx = (0, _extends3.default)({}, data.ctx, { pathname: pathname, query: query });
                _context.next = 6;
                return _this.getInitialProps(data.Component, ctx);

              case 6:
                props = _context.sent;


                _this.route = route;
                _this.set(getURL(), (0, _extends3.default)({}, data, { props: props }));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))).catch(function (err) {
        if (err.cancelled) return;

        // the only way we can appropriately handle
        // this failure is deferring to the browser
        // since the URL has already changed
        window.location.reload();
      });
    }
  }, {
    key: 'update',
    value: function update(route, Component) {
      var data = this.components[route] || {};
      var newData = (0, _extends3.default)({}, data, { Component: Component });
      this.components[route] = newData;

      if (route === this.route) {
        this.notify(newData);
      }
    }
  }, {
    key: 'reload',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(route) {
        var _parse2, pathname, query, data, props, ctx;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                delete this.components[route];

                if (!(route !== this.route)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return');

              case 3:
                _parse2 = (0, _url.parse)(window.location.href, true), pathname = _parse2.pathname, query = _parse2.query;
                data = void 0;
                props = void 0;
                _context2.prev = 6;
                _context2.next = 9;
                return this.fetchComponent(route);

              case 9:
                data = _context2.sent;
                ctx = (0, _extends3.default)({}, data.ctx, { pathname: pathname, query: query });
                _context2.next = 13;
                return this.getInitialProps(data.Component, ctx);

              case 13:
                props = _context2.sent;
                _context2.next = 21;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](6);

                if (!_context2.t0.cancelled) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt('return', false);

              case 20:
                throw _context2.t0;

              case 21:

                this.notify((0, _extends3.default)({}, data, { props: props }));

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 16]]);
      }));

      function reload(_x) {
        return _ref2.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: 'back',
    value: function back() {
      window.history.back();
    }
  }, {
    key: 'push',
    value: function push(route, url) {
      return this.change('pushState', route, url);
    }
  }, {
    key: 'replace',
    value: function replace(route, url) {
      return this.change('replaceState', route, url);
    }
  }, {
    key: 'change',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(method, route, url) {
        var _parse3, pathname, query, data, props, ctx;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _parse3 = (0, _url.parse)(url, true), pathname = _parse3.pathname, query = _parse3.query;


                if (!route) route = toRoute(pathname);

                this.abortComponentLoad();

                data = void 0;
                props = void 0;
                _context3.prev = 5;
                _context3.next = 8;
                return this.fetchComponent(route);

              case 8:
                data = _context3.sent;
                ctx = (0, _extends3.default)({}, data.ctx, { pathname: pathname, query: query });
                _context3.next = 12;
                return this.getInitialProps(data.Component, ctx);

              case 12:
                props = _context3.sent;
                _context3.next = 20;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](5);

                if (!_context3.t0.cancelled) {
                  _context3.next = 19;
                  break;
                }

                return _context3.abrupt('return', false);

              case 19:
                throw _context3.t0;

              case 20:

                if (getURL() !== url) {
                  window.history[method]({ route: route }, null, url);
                }

                this.route = route;
                this.set(url, (0, _extends3.default)({}, data, { props: props }));
                return _context3.abrupt('return', true);

              case 24:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 15]]);
      }));

      function change(_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: 'set',
    value: function set(url, data) {
      var parsed = (0, _url.parse)(url, true);

      if (this.urlIsNew(parsed)) {
        this.pathname = parsed.pathname;
        this.query = parsed.query;
        this.notify(data);
      }
    }
  }, {
    key: 'urlIsNew',
    value: function urlIsNew(_ref4) {
      var pathname = _ref4.pathname,
          query = _ref4.query;

      return this.pathname !== pathname || !(0, _shallowEquals2.default)(query, this.query);
    }
  }, {
    key: 'fetchComponent',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(url) {
        var _this2 = this;

        var route, data;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                route = toRoute((0, _url.parse)(url).pathname);
                data = this.components[route];

                if (data) {
                  _context5.next = 4;
                  break;
                }

                return _context5.delegateYield(_regenerator2.default.mark(function _callee4() {
                  var cancel, componentUrl;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          cancel = void 0;
                          componentUrl = toJSONUrl(route);
                          _context4.next = 4;
                          return new _promise2.default(function (resolve, reject) {
                            _this2.componentLoadCancel = cancel = function cancel() {
                              if (xhr.abort) xhr.abort();
                            };

                            var xhr = loadComponent(componentUrl, function (err, data) {
                              if (err) return reject(err);
                              resolve({
                                Component: data.Component,
                                ctx: { xhr: xhr, err: data.err }
                              });
                            });
                          });

                        case 4:
                          data = _context4.sent;


                          if (cancel === _this2.componentLoadCancel) {
                            _this2.componentLoadCancel = null;
                          }

                          _this2.components[route] = data;

                        case 7:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                })(), 't0', 4);

              case 4:
                return _context5.abrupt('return', data);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchComponent(_x5) {
        return _ref5.apply(this, arguments);
      }

      return fetchComponent;
    }()
  }, {
    key: 'getInitialProps',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(Component, ctx) {
        var cancelled, cancel, props, err;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                cancelled = false;

                cancel = function cancel() {
                  cancelled = true;
                };

                this.componentLoadCancel = cancel;

                _context6.next = 5;
                return Component.getInitialProps ? Component.getInitialProps(ctx) : {};

              case 5:
                props = _context6.sent;


                if (cancel === this.componentLoadCancel) {
                  this.componentLoadCancel = null;
                }

                if (!cancelled) {
                  _context6.next = 11;
                  break;
                }

                err = new Error('Cancelled');

                err.cancelled = true;
                throw err;

              case 11:
                return _context6.abrupt('return', props);

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getInitialProps(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: 'abortComponentLoad',
    value: function abortComponentLoad() {
      if (this.componentLoadCancel) {
        this.componentLoadCancel();
        this.componentLoadCancel = null;
      }
    }
  }, {
    key: 'notify',
    value: function notify(data) {
      this.subscriptions.forEach(function (fn) {
        return fn(data);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(fn) {
      var _this3 = this;

      this.subscriptions.add(fn);
      return function () {
        return _this3.subscriptions.delete(fn);
      };
    }
  }]);
  return Router;
}();

exports.default = Router;


function getURL() {
  return window.location.pathname + (window.location.search || '') + (window.location.hash || '');
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

function toJSONUrl(route) {
  return (route === '/' ? '/index' : route) + '.json';
}

function loadComponent(url, fn) {
  return loadJSON(url, function (err, data) {
    if (err) return fn(err);

    var module = void 0;
    try {
      module = (0, _evalScript2.default)(data.component);
    } catch (err) {
      return fn(err);
    }

    var Component = module.default || module;
    fn(null, { Component: Component, err: data.err });
  });
}

function loadJSON(url, fn) {
  var xhr = new window.XMLHttpRequest();
  xhr.onload = function () {
    var data = void 0;

    try {
      data = JSON.parse(xhr.responseText);
    } catch (err) {
      fn(new Error('Failed to load JSON for ' + url));
      return;
    }

    fn(null, data);
  };
  xhr.onerror = function () {
    fn(new Error('XHR failed. Status: ' + xhr.status));
  };
  xhr.onabort = function () {
    var err = new Error('XHR aborted');
    err.cancelled = true;
    fn(err);
  };
  xhr.open('GET', url);
  xhr.send();

  return xhr;
}