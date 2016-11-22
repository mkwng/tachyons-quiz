'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.detachable = detachable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetachPlugin = function () {
  function DetachPlugin() {
    (0, _classCallCheck3.default)(this, DetachPlugin);
  }

  (0, _createClass3.default)(DetachPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.pluginDetachFns = new _map2.default();
      compiler.plugin = plugin(compiler.plugin);
      compiler.apply = _apply;
      compiler.detach = detach;
      compiler.getDetachablePlugins = getDetachablePlugins;
    }
  }]);
  return DetachPlugin;
}();

exports.default = DetachPlugin;
function detachable(Plugin) {
  var apply = Plugin.prototype.apply;


  Plugin.prototype.apply = function (compiler) {
    var fns = [];

    var plugin = compiler.plugin;

    compiler.plugin = function (name, fn) {
      fns.push(plugin.call(this, name, fn));
    };

    // collect the result of `plugin` call in `apply`
    apply.call(this, compiler);

    compiler.plugin = plugin;

    return fns;
  };
}

function plugin(original) {
  return function (name, fn) {
    var _this = this;

    original.call(this, name, fn);

    return function () {
      var names = Array.isArray(name) ? name : [name];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(names), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var n = _step.value;

          var plugins = _this._plugins[n] || [];
          var i = plugins.indexOf(fn);
          if (i >= 0) plugins.splice(i, 1);
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
    };
  };
}

function _apply() {
  for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(plugins), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var p = _step2.value;

      var fn = p.apply(this);
      if (!fn) continue;

      var fns = this.pluginDetachFns.get(p) || new _set2.default();

      var _fns = Array.isArray(fn) ? fn : [fn];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(_fns), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var f = _step3.value;
          fns.add(f);
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

      this.pluginDetachFns.set(p, fns);
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

function detach() {
  for (var _len2 = arguments.length, plugins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    plugins[_key2] = arguments[_key2];
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, _getIterator3.default)(plugins), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var p = _step4.value;

      var fns = this.pluginDetachFns.get(p) || new _set2.default();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)(fns), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var fn = _step5.value;

          if (typeof fn === 'function') fn();
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

      this.pluginDetachFns.delete(p);
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

function getDetachablePlugins() {
  return new _set2.default(this.pluginDetachFns.keys());
}