"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _OrderGoods = _interopRequireDefault(require("@/views/manager/OrderGoods.vue"));

var _OrGoods = _interopRequireDefault(require("@/views/manager/ordergoods/OrGoods.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  path: 'order',
  component: _OrderGoods["default"],
  children: [{
    path: '',
    redirect: 'manas'
  }, {
    path: 'manas',
    component: _OrGoods["default"]
  }]
};
exports["default"] = _default;