"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Users = _interopRequireDefault(require("@/views/manager/Users.vue"));

var _AddUser = _interopRequireDefault(require("@/views/manager/user/AddUser.vue"));

var _EditUser = _interopRequireDefault(require("@/views/manager/user/EditUser.vue"));

var _ListUser = _interopRequireDefault(require("@/views/manager/user/ListUser.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  path: "user",
  component: _Users["default"],
  children: [{
    path: '',
    redirect: "listUser"
  }, {
    path: 'listUser',
    component: _ListUser["default"]
  }, {
    path: 'addUser',
    component: _AddUser["default"]
  }, {
    path: 'editUser',
    component: _EditUser["default"]
  }]
};
exports["default"] = _default;