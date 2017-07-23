import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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