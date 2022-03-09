"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _request = _interopRequireWildcard(require("./utils/request.js"));

var _elementUi = _interopRequireWildcard(require("element-ui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi["default"], {
  size: 'small',
  zIndex: 3000
});

_vue["default"].config.productionTip = false;

_vue["default"].use(_elementUi.Pagination);

_vue["default"].use(_elementUi.Dialog);

_vue["default"].use(_elementUi.Autocomplete);

_vue["default"].use(_elementUi.Dropdown);

_vue["default"].use(_elementUi.DropdownMenu);

_vue["default"].use(_elementUi.DropdownItem);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].use(_elementUi.MenuItemGroup);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.InputNumber);

_vue["default"].use(_elementUi.Radio);

_vue["default"].use(_elementUi.RadioGroup);

_vue["default"].use(_elementUi.RadioButton);

_vue["default"].use(_elementUi.Checkbox);

_vue["default"].use(_elementUi.CheckboxButton);

_vue["default"].use(_elementUi.CheckboxGroup);

_vue["default"].use(_elementUi.Switch);

_vue["default"].use(_elementUi.Select);

_vue["default"].use(_elementUi.Option);

_vue["default"].use(_elementUi.OptionGroup);

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.ButtonGroup);

_vue["default"].use(_elementUi.Table);

_vue["default"].use(_elementUi.TableColumn);

_vue["default"].use(_elementUi.DatePicker);

_vue["default"].use(_elementUi.TimeSelect);

_vue["default"].use(_elementUi.TimePicker);

_vue["default"].use(_elementUi.Popover);

_vue["default"].use(_elementUi.Tooltip);

_vue["default"].use(_elementUi.Breadcrumb);

_vue["default"].use(_elementUi.BreadcrumbItem);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Tabs);

_vue["default"].use(_elementUi.TabPane);

_vue["default"].use(_elementUi.Tag);

_vue["default"].use(_elementUi.Tree);

_vue["default"].use(_elementUi.Alert);

_vue["default"].use(_elementUi.Slider);

_vue["default"].use(_elementUi.Icon);

_vue["default"].use(_elementUi.Row);

_vue["default"].use(_elementUi.Col);

_vue["default"].use(_elementUi.Upload);

_vue["default"].use(_elementUi.Progress);

_vue["default"].use(_elementUi.Spinner);

_vue["default"].use(_elementUi.Badge);

_vue["default"].use(_elementUi.Card);

_vue["default"].use(_elementUi.Rate);

_vue["default"].use(_elementUi.Steps);

_vue["default"].use(_elementUi.Step);

_vue["default"].use(_elementUi.Carousel);

_vue["default"].use(_elementUi.CarouselItem);

_vue["default"].use(_elementUi.Collapse);

_vue["default"].use(_elementUi.CollapseItem);

_vue["default"].use(_elementUi.Cascader);

_vue["default"].use(_elementUi.ColorPicker);

_vue["default"].use(_elementUi.Transfer);

_vue["default"].use(_elementUi.Container);

_vue["default"].use(_elementUi.Header);

_vue["default"].use(_elementUi.Aside);

_vue["default"].use(_elementUi.Main);

_vue["default"].use(_elementUi.Footer);

_vue["default"].use(_elementUi.Timeline);

_vue["default"].use(_elementUi.TimelineItem);

_vue["default"].use(_elementUi.Link);

_vue["default"].use(_elementUi.Divider);

_vue["default"].use(_elementUi.Image);

_vue["default"].use(_elementUi.Calendar);

_vue["default"].use(_elementUi.Backtop);

_vue["default"].use(_elementUi.PageHeader);

_vue["default"].use(_elementUi.CascaderPanel);

_vue["default"].use(_elementUi.Loading.directive);

_vue["default"].prototype.$loading = _elementUi.Loading.service;
_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert;
_vue["default"].prototype.$confirm = _elementUi.MessageBox.confirm;
_vue["default"].prototype.$prompt = _elementUi.MessageBox.prompt;
_vue["default"].prototype.$notify = _elementUi.Notification;
_vue["default"].prototype.$message = _elementUi.Message;
_vue["default"].prototype.$request = _request["default"];
_vue["default"].prototype.$host = _request.host;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app'); // 路由守卫
// router.beforeEach((to,from,next)=>{
//   if(to.matched.some(item=>item.meta.requiresAuth)){
//     if(store.getters.isLogin){
//         next()
//         router.app.$request.get('/user/verify',{
//           headers:{
//             Authorization:store.state.userInfo.authorization
//           }
//         }).then(({data})=>{
//           if(data.code===400){
//             router.push({path:'/login',query:{targetUrl:to.fullPath}})
//           }
//         })
//     }else{
//       router.push({path:'/login',query:{targetUrl:to.fullPath}})
//     }
//   }else{
//     next()
//   }
// })

_router["default"].beforeEach(function (to, from, next) {
  // console.log('to',to);
  // if (to.meta.requiresAuth) {
  if (to.matched.some(function (item) {
    return item.meta.requiresAuth;
  })) {
    // 判断是否登录
    // 登录:放行
    if (_store["default"].getters.isLogin) {
      next();

      _router["default"].app.$request.get('/user/verify', {
        headers: {
          Authorization: _store["default"].state.userInfo.Authorization
        }
      }).then(function (_ref) {
        var data = _ref.data;

        if (data.code === 400) {
          // token已失效或被篡改
          _router["default"].push({
            path: '/logins',
            query: {
              targetUrl: to.fullPath
            }
          });
        }
      });
    } else {
      // 没有登录：跳到登录页面
      _router["default"].push({
        path: '/logins',
        query: {
          targetUrl: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});