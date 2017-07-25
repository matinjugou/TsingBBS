import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLogin: false,
        UserName:"",
        UserSchool:"",
        UserType:"",
        UserID:"",
    },
    mutations:{
        Login(state, InorOut){
            state.isLogin = InorOut;
            console.log("state login", state.isLogin);
        },
        UserInfoUpdate(state, payload){
            state.UserName = payload.UserName;
            state.UserSchool = payload.UserSchool;
            state.UserType = payload.UserType;
            state.UserID = payload.UserID;
        }
    }
});