"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Manager = _interopRequireDefault(require("@/views/manager/Manager.vue"));

var _GoodsRoute = _interopRequireDefault(require("@/router/GoodsRoute.js"));

var _Home = _interopRequireDefault(require("@/views/manager/Home.vue"));

var _UserRouter = _interopRequireDefault(require("@/router/UserRouter.js"));

var _OrderGoods = _interopRequireDefault(require("@/router/OrderGoods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 动态配置权限路由
var _default = {
  path: '/manager',
  component: _Manager["default"],
  meta: {
    requiresAuth: true
  },
  children: [{
    path: 'home',
    component: _Home["default"]
  }, _GoodsRoute["default"], _UserRouter["default"], _OrderGoods["default"]]
};
exports["default"] = _default;