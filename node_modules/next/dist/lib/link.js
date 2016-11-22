'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function (_Component) {
  (0, _inherits3.default)(Link, _Component);

  function Link(props) {
    (0, _classCallCheck3.default)(this, Link);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call(this, props));

    _this.linkClicked = _this.linkClicked.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Link, [{
    key: 'linkClicked',
    value: function linkClicked(e) {
      var _this2 = this;

      if (e.target.nodeName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var _props = this.props,
          href = _props.href,
          scroll = _props.scroll;


      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      e.preventDefault();

      // straight up redirect
      this.context.router.push(null, href).then(function (success) {
        if (!success) return;
        if (scroll !== false) window.scrollTo(0, 0);
      }).catch(function (err) {
        if (_this2.props.onError) _this2.props.onError(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = _react.Children.map(this.props.children, function (child) {
        var props = {
          onClick: _this3.linkClicked
        };

        var isAnchor = child && child.type === 'a';

        // if child does not specify a href, specify it
        // so that repetition is not needed by the user
        if (!isAnchor || !('href' in child.props)) {
          props.href = _this3.props.href;
        }

        if (isAnchor) {
          return _react2.default.cloneElement(child, props);
        } else {
          return _react2.default.createElement(
            'a',
            props,
            child
          );
        }
      });

      return children[0];
    }
  }]);
  return Link;
}(_react.Component);

Link.contextTypes = {
  router: _react.PropTypes.object
};
exports.default = Link;


function isLocal(href) {
  var origin = window.location.origin;
  return !/^https?:\/\//.test(href) || origin === href.substr(0, origin.length);
}