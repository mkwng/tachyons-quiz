'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHotLoader = require('react-hot-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.state = propsToState(props);
    _this.close = null;
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = propsToState(nextProps);
      try {
        this.setState(state);
      } catch (err) {
        console.error(err);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var router = this.props.router;


      this.close = router.subscribe(function (data) {
        var props = data.props || _this2.state.props;
        var state = propsToState((0, _extends3.default)({}, data, {
          props: props,
          router: router
        }));

        try {
          _this2.setState(state);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.close) this.close();
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          router = _props.router,
          headManager = _props.headManager;

      return { router: router, headManager: headManager };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          Component = _state.Component,
          props = _state.props;


      if (typeof window === 'undefined') {
        // workaround for https://github.com/gaearon/react-hot-loader/issues/283
        return _react2.default.createElement(Component, props);
      }

      return _react2.default.createElement(
        _reactHotLoader.AppContainer,
        null,
        _react2.default.createElement(Component, props)
      );
    }
  }]);
  return App;
}(_react.Component);

App.childContextTypes = {
  router: _react.PropTypes.object,
  headManager: _react.PropTypes.object
};
exports.default = App;


function propsToState(props) {
  var Component = props.Component,
      router = props.router;
  var route = router.route;

  var url = {
    query: router.query,
    pathname: router.pathname,
    back: function back() {
      return router.back();
    },
    push: function push(url) {
      return router.push(route, url);
    },
    pushTo: function pushTo(url) {
      return router.push(null, url);
    },
    replace: function replace(url) {
      return router.replace(route, url);
    },
    replaceTo: function replaceTo(url) {
      return router.replace(null, url);
    }
  };

  return {
    Component: Component,
    props: (0, _extends3.default)({}, props.props, { url: url })
  };
}