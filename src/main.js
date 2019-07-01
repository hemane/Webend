import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = '';

Vue.prototype.$axios = function () {
  return axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
    headers: {
      'Authorization': VueCookies.get("jwt")
    }
  });
};

Vue.use(BootstrapVue);
Vue.use(VueCookies);

VueCookies.config("1d");

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
