'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socket;

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var retries = 0;
var sock = null;

function socket(url, handlers) {
  sock = new _sockjsClient2.default(url);

  sock.onopen = function () {
    retries = 0;
  };

  sock.onclose = function () {
    if (retries === 0) handlers.close();

    // Try to reconnect.
    sock = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;

      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  };

  sock.onmessage = function (e) {
    // This assumes that all data sent via the websocket is JSON.
    var msg = JSON.parse(e.data);
    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  };
}