import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import VueCookies from 'vue-cookies';
import Login from './views/Login';
import moment from 'moment'

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = '';

Vue.prototype.$axios = function () {
  return axios.create({
    baseURL: 'http://app1:57723/',
    timeout: 1000,
    headers: {
      'Authorization': 'Bearer ' + VueCookies.get("jwt")
    }
  });
};

Vue.prototype.$authBucket = function(authBucket) {
  this.$axios().get("/auth")
    .then(j => authBucket(j.data));
};

Vue.use(BootstrapVue);
Vue.use(VueCookies);

Vue.component('login-form', Login)

VueCookies.config("1d");

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

