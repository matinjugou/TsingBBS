import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store'
import router from './router'
import MainComp from './components/main.vue'
import HotPosts from './components/hotposts.vue'
import SinglePost from './components/singlepost.vue'

Vue.use(Vuetify);

Vue.component('MainComp', MainComp);
Vue.component('HotPosts', HotPosts);
Vue.component('SinglePost', SinglePost);



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});