"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Goods = _interopRequireDefault(require("@/views/manager/Goods.vue"));

var _Add = _interopRequireDefault(require("@/views/manager/goods/Add.vue"));

var _Edit = _interopRequireDefault(require("@/views/manager/goods/Edit.vue"));

var _List = _interopRequireDefault(require("@/views/manager/goods/List.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  path: "goods",
  component: _Goods["default"],
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: _List["default"]
  }, {
    path: 'add',
    component: _Add["default"]
  }, {
    path: 'edit',
    component: _Edit["default"]
  }]
};
exports["default"] = _default;