'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _unlinkFilePlugin = require('./plugins/unlink-file-plugin');

var _unlinkFilePlugin2 = _interopRequireDefault(_unlinkFilePlugin);

var _watchPagesPlugin = require('./plugins/watch-pages-plugin');

var _watchPagesPlugin2 = _interopRequireDefault(_watchPagesPlugin);

var _watchRemoveEventPlugin = require('./plugins/watch-remove-event-plugin');

var _watchRemoveEventPlugin2 = _interopRequireDefault(_watchRemoveEventPlugin);

var _dynamicEntryPlugin = require('./plugins/dynamic-entry-plugin');

var _dynamicEntryPlugin2 = _interopRequireDefault(_dynamicEntryPlugin);

var _detachPlugin = require('./plugins/detach-plugin');

var _detachPlugin2 = _interopRequireDefault(_detachPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var _ref3;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$hotReload = _ref2.hotReload,
        hotReload = _ref2$hotReload === undefined ? false : _ref2$hotReload,
        _ref2$dev = _ref2.dev,
        dev = _ref2$dev === undefined ? false : _ref2$dev;

    var pages, entry, defaultEntries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, nextPagesDir, errorEntry, defaultErrorPath, errorDebugEntry, errorDebugPath, nodeModulesDir, plugins, babelRuntimePath, loaders, interpolateNames;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = (0, _path.resolve)(dir);

            _context.next = 3;
            return (0, _globPromise2.default)('pages/**/*.js', { cwd: dir });

          case 3:
            pages = _context.sent;
            entry = {};
            defaultEntries = hotReload ? ['webpack/hot/dev-server'] : [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = (0, _getIterator3.default)(pages); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              p = _step.value;

              entry[(0, _path.join)('bundles', p)] = defaultEntries.concat(['./' + p]);
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            nextPagesDir = (0, _path.join)(__dirname, '..', '..', 'pages');
            errorEntry = (0, _path.join)('bundles', 'pages', '_error.js');
            defaultErrorPath = (0, _path.join)(nextPagesDir, '_error.js');

            if (!entry[errorEntry]) {
              entry[errorEntry] = defaultEntries.concat([defaultErrorPath]);
            }

            errorDebugEntry = (0, _path.join)('bundles', 'pages', '_error-debug.js');
            errorDebugPath = (0, _path.join)(nextPagesDir, '_error-debug.js');

            entry[errorDebugEntry] = errorDebugPath;

            nodeModulesDir = (0, _path.join)(__dirname, '..', '..', '..', 'node_modules');
            plugins = [new _writeFileWebpackPlugin2.default({
              exitOnErrors: false,
              log: false,
              // required not to cache removed files
              useHashIndex: false
            })];


            if (!dev) {
              plugins.push(new _webpack2.default.DefinePlugin({
                'process.env.NODE_ENV': (0, _stringify2.default)('production')
              }), new _webpack2.default.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                sourceMap: false
              }));
            }

            if (hotReload) {
              plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _detachPlugin2.default(), new _dynamicEntryPlugin2.default(), new _unlinkFilePlugin2.default(), new _watchRemoveEventPlugin2.default(), new _watchPagesPlugin2.default(dir));
            }

            babelRuntimePath = require.resolve('babel-runtime/package').replace(/[\\\/]package\.json$/, '');
            loaders = [{
              test: /\.js$/,
              loader: 'emit-file-loader',
              include: [dir, nextPagesDir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              query: {
                name: 'dist/[path][name].[ext]'
              }
            }].concat(hotReload ? [{
              test: /\.js$/,
              loader: 'hot-self-accept-loader',
              include: [(0, _path.join)(dir, 'pages'), nextPagesDir]
            }] : []).concat([{
              loader: 'babel',
              include: nextPagesDir,
              query: {
                plugins: [[require.resolve('babel-plugin-module-resolver'), {
                  alias: {
                    'ansi-html': require.resolve('ansi-html')
                  }
                }]]
              }
            }, {
              test: /\.js$/,
              loader: 'babel',
              include: [dir, nextPagesDir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              query: {
                presets: ['es2015', 'react'],
                plugins: [require.resolve('babel-plugin-transform-async-to-generator'), require.resolve('babel-plugin-transform-object-rest-spread'), require.resolve('babel-plugin-transform-class-properties'), require.resolve('babel-plugin-transform-runtime'), [require.resolve('babel-plugin-module-resolver'), {
                  alias: {
                    'babel-runtime': babelRuntimePath,
                    react: require.resolve('react'),
                    'next/link': require.resolve('../../lib/link'),
                    'next/css': require.resolve('../../lib/css'),
                    'next/head': require.resolve('../../lib/head')
                  }
                }]]
              }
            }]);
            interpolateNames = new _map2.default([[defaultErrorPath, 'dist/pages/_error.js'], [errorDebugPath, 'dist/pages/_error-debug.js']]);
            return _context.abrupt('return', (0, _webpack2.default)({
              context: dir,
              entry: entry,
              output: {
                path: (0, _path.join)(dir, '.next'),
                filename: '[name]',
                libraryTarget: 'commonjs2',
                publicPath: hotReload ? 'http://localhost:3030/' : null
              },
              externals: ['react', 'react-dom', (_ref3 = {}, (0, _defineProperty3.default)(_ref3, require.resolve('react'), 'react'), (0, _defineProperty3.default)(_ref3, require.resolve('../../lib/link'), 'next/link'), (0, _defineProperty3.default)(_ref3, require.resolve('../../lib/css'), 'next/css'), (0, _defineProperty3.default)(_ref3, require.resolve('../../lib/head'), 'next/head'), _ref3)],
              resolve: {
                root: [nodeModulesDir, (0, _path.join)(dir, 'node_modules')].concat((process.env.NODE_PATH || '').split(process.platform === 'win32' ? ';' : ':'))
              },
              resolveLoader: {
                root: [nodeModulesDir, (0, _path.join)(__dirname, 'loaders')]
              },
              plugins: plugins,
              module: {
                preLoaders: [{ test: /\.json$/, loader: 'json-loader' }],
                loaders: loaders
              },
              customInterpolateName: function customInterpolateName(url, name, opts) {
                return interpolateNames.get(this.resourcePath) || url;
              }
            }));

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));

  function createCompiler(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return createCompiler;
}();