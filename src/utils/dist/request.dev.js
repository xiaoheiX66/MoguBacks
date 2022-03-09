"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.apiUrl = exports.host = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var host = 'http://10.3.133.37:8082';
exports.host = host;
var apiUrl = host + '/api'; // 创建axios实例:创建一个类似与axios的对象

exports.apiUrl = apiUrl;

var instance = _axios["default"].create({
  baseURL: apiUrl
});

var _default = instance;
exports["default"] = _default;