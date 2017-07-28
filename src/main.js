import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store'
import router from './router'
import Vueresource from 'vue-resource'

Vue.use(Vuetify);
Vue.use(Vueresource);

Vue.http.options.xhr={withCredentials:true};
Vue.http.options.emulateJSON=true;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});