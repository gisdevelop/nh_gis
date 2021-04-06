import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery  from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
var Cesium = require('cesium/Cesium');
var widgets = require('cesium/Widgets/widgets.css');
var glbalVar=require("../public/globalVar.js");
Vue.prototype.glbalVar=glbalVar
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets

new Vue({
  router,
  jquery,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
