import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import MainComp from './components/main.vue'
import HotPosts from './components/hotposts.vue'
import SinglePost from './components/singlepost.vue'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(Vuetify);

Vue.component('MainComp', MainComp);
Vue.component('HotPosts', HotPosts);
Vue.component('SinglePost', SinglePost);

const store = new Vuex.Store({
    state:{
        isLogin:false
    },
    mutations:{
        Login(state, InorOut){
            state.isLogin = InorOut;
        }
    }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
