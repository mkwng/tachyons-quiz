'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

var _SingleEntryPlugin2 = _interopRequireDefault(_SingleEntryPlugin);

var _MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');

var _MultiEntryPlugin2 = _interopRequireDefault(_MultiEntryPlugin);

var _detachPlugin = require('./detach-plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _detachPlugin.detachable)(_SingleEntryPlugin2.default);
(0, _detachPlugin.detachable)(_MultiEntryPlugin2.default);

var DynamicEntryPlugin = function () {
  function DynamicEntryPlugin() {
    (0, _classCallCheck3.default)(this, DynamicEntryPlugin);
  }

  (0, _createClass3.default)(DynamicEntryPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.entryNames = getInitialEntryNames(compiler);
      compiler.addEntry = addEntry;
      compiler.removeEntry = removeEntry;
      compiler.hasEntry = hasEntry;

      compiler.plugin('emit', function (compilation, callback) {
        compiler.cache = compilation.cache;
        callback();
      });
    }
  }]);
  return DynamicEntryPlugin;
}();

exports.default = DynamicEntryPlugin;


function getInitialEntryNames(compiler) {
  var entryNames = new _set2.default();
  var entry = compiler.options.entry;


  if (typeof entry === 'string' || Array.isArray(entry)) {
    entryNames.add('main');
  } else if ((typeof entry === 'undefined' ? 'undefined' : (0, _typeof3.default)(entry)) === 'object') {
    (0, _keys2.default)(entry).forEach(function (name) {
      entryNames.add(name);
    });
  }

  return entryNames;
}

function addEntry(entry) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'main';
  var context = this.options.context;

  var Plugin = Array.isArray(entry) ? _MultiEntryPlugin2.default : _SingleEntryPlugin2.default;
  this.apply(new Plugin(context, entry, name));
  this.entryNames.add(name);
}

function removeEntry() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(this.getDetachablePlugins()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;

      if (!(p instanceof _SingleEntryPlugin2.default || p instanceof _MultiEntryPlugin2.default)) continue;
      if (p.name !== name) continue;

      if (this.cache) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(this.cache)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var id = _step2.value;

            var m = this.cache[id];
            if (m.name === name) {
              // cache of `MultiModule` is based on `name`,
              // so delete it here for the case
              // a new entry is added with the same name later
              delete this.cache[id];
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

      this.detach(p);
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

  this.entryNames.delete(name);
}

function hasEntry() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';

  return this.entryNames.has(name);
}