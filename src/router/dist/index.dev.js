"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Logins = _interopRequireDefault(require("../views/Logins.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/logins',
  component: _Logins["default"]
}, {
  path: '/',
  redirect: "/logins"
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;