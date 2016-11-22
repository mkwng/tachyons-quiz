'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  }
  // Fall back to getting all scripts in the document.
  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];
  if (currentScript) {
    return currentScript.getAttribute('src');
  }
  // Fail as there was no script to use.
  throw new Error('[WDS] Failed to get current script source');
} /* global __resourceQuery, next */

// Based on 'webpack-dev-server/client'

var urlParts = void 0;
if (typeof __resourceQuery === 'string' && __resourceQuery) {
  // If this bundle is inlined, use the resource query to get the correct url.
  urlParts = _url2.default.parse(__resourceQuery.substr(1));
} else {
  // Else, get the url from the <script> this file was called with.
  var scriptHost = getCurrentScriptSource();
  scriptHost = scriptHost.replace(/\/[^\/]+$/, '');
  urlParts = _url2.default.parse(scriptHost || '/', false, true);
}

var _hot = false;
var initial = true;
var currentHash = '';
var _logLevel = 'info';

function log(level, msg) {
  if (_logLevel === 'info' && level === 'info') {
    return console.log(msg);
  }
  if (['info', 'warning'].indexOf(_logLevel) >= 0 && level === 'warning') {
    return console.warn(msg);
  }
  if (['info', 'warning', 'error'].indexOf(_logLevel) >= 0 && level === 'error') {
    return console.error(msg);
  }
}

var onSocketMsg = {
  hot: function hot() {
    _hot = true;
    log('info', '[WDS] Hot Module Replacement enabled.');
  },
  invalid: function invalid() {
    log('info', '[WDS] App updated. Recompiling...');
  },
  hash: function hash(_hash) {
    currentHash = _hash;
  },

  'still-ok': function stillOk() {
    log('info', '[WDS] Nothing changed.');
  },
  'log-level': function logLevel(level) {
    _logLevel = level;
  },
  ok: function ok() {
    if (initial) {
      initial = false;
      return;
    }
    reloadApp();
  },
  warnings: function warnings(_warnings) {
    log('info', '[WDS] Warnings while compiling.');
    for (var i = 0; i < _warnings.length; i++) {
      console.warn((0, _stripAnsi2.default)(_warnings[i]));
    }
    if (initial) {
      initial = false;
      return;
    }
    reloadApp();
  },
  errors: function errors(_errors) {
    log('info', '[WDS] Errors while compiling.');
    for (var i = 0; i < _errors.length; i++) {
      console.error((0, _stripAnsi2.default)(_errors[i]));
    }
    if (initial) {
      initial = false;
      return;
    }
    reloadApp();
  },

  'proxy-error': function proxyError(errors) {
    log('info', '[WDS] Proxy error.');
    for (var i = 0; i < errors.length; i++) {
      log('error', (0, _stripAnsi2.default)(errors[i]));
    }
    if (initial) {
      initial = false;
      return;
    }
  },
  reload: function reload(route) {
    if (route === '/_error') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(next.router.components)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var r = _step.value;
          var Component = next.router.components[r].Component;

          if (Component.__route === '/_error-debug') {
            // reload all '/_error-debug'
            // which are expected to be errors of '/_error' routes
            next.router.reload(r);
          }
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

      return;
    }

    next.router.reload(route);
  },
  close: function close() {
    log('error', '[WDS] Disconnected!');
  }
};

var hostname = urlParts.hostname;
var protocol = urlParts.protocol;

if (urlParts.hostname === '0.0.0.0') {
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (window.location.hostname && !!~window.location.protocol.indexOf('http')) {
    hostname = window.location.hostname;
  }
}

// `hostname` can be empty when the script path is relative. In that case, specifying
// a protocol would result in an invalid URL.
// When https is used in the app, secure websockets are always necessary
// because the browser doesn't accept non-secure websockets.
if (hostname && (window.location.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
  protocol = window.location.protocol;
}

var socketUrl = _url2.default.format({
  protocol: protocol,
  auth: urlParts.auth,
  hostname: hostname,
  port: urlParts.port === '0' ? window.location.port : urlParts.port,
  pathname: urlParts.path == null || urlParts.path === '/' ? '/sockjs-node' : urlParts.path
});

(0, _socket2.default)(socketUrl, onSocketMsg);

function reloadApp() {
  if (_hot) {
    log('info', '[WDS] App hot update...');
    window.postMessage('webpackHotUpdate' + currentHash, '*');
  } else {
    log('info', '[WDS] App updated. Reloading...');
    window.location.reload();
  }
}