import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLogin: false,
        UserName:"",
        UserSchool:""
    },
    mutations:{
        Login(state, InorOut){
            state.isLogin = InorOut;
            console.log("state login", state.isLogin);
        },
        UserInfoUpdate(state, payload){
            state.UserName = payload.UserName;
            state.UserSchool = payload.UserSchool;
        }
    }
});