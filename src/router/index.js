import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main.vue'
import HotPosts from '../components/hotposts.vue'
import SinglePost from '../components/singlepost.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/main',
            component : Main,
            alias: '/'
        },
        {
            path: '/hotPosts',
            component: HotPosts,
        },
        {
            path:'/:postid',
            component: SinglePost
        }
    ]
})
