"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _request = _interopRequireDefault(require("../utils/request"));

var _router = _interopRequireDefault(require("@/router"));

var _AuthRouter = _interopRequireDefault(require("@/router/AuthRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var userInfo = localStorage.getItem("userInfo");

try {
  userInfo = JSON.parse(userInfo) || {};
} catch (err) {
  userInfo = {};
}

var store = new _vuex["default"].Store({
  state: {
    userInfo: userInfo
  },
  getters: {
    isLogin: function isLogin(state) {
      return !!state.userInfo._id;
    }
  },
  mutations: {
    login: function login(state, payload) {
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    logout: function logout(state) {
      state.userInfo = {};
      localStorage.removeItem('userInfo');
    },
    addRoute: function addRoute() {
      _router["default"].addRoute(_AuthRouter["default"]);
    }
  },
  actions: {
    login: function login(ctx, payload) {
      var _ref, data;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_request["default"].post("/user/login", payload));

            case 2:
              _ref = _context.sent;
              data = _ref.data;

              // console.log("请求结果",data);
              if (data.code === 200) {
                ctx.commit('login', data.info[0]);
                ctx.commit('addRoute');
              }

              return _context.abrupt("return", data);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
}); // 刷新时动态添加权限路由

if (store.getters.isLogin) {
  store.commit('addRoute');
}

var _default = store;
exports["default"] = _default;