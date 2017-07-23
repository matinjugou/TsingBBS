import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'

Vue.use(Vuetify);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
