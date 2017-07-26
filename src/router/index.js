import Vue from 'vue'
import Router from 'vue-router'
import MainComp from '../components/main.vue'
import HotPosts from '../components/hotposts.vue'
import SinglePost from '../components/singlepost.vue'
import MyPosts from '../components/myPosts.vue'
import AllReplies from '../components/replies.vue'
import MyCollections from '../components/myCollection.vue'
import AllSections from '../components/AllSections.vue'
import Section from '../components/Section.vue'
import SubSection from '../components/subSection.vue'
import UserInfo from '../components/UserInfo.vue'
import UserManager from '../components/userManager.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/main',
            component : MainComp,
            alias: '/'
        },
        {
            path: '/hotPosts',
            component: HotPosts,
        },
        {
            path:'/user/:userID',
            component: UserInfo,
        },
        {
            path:'/user/:userID/myPosts',
            component:MyPosts,
        },
        {
            path:'/user/:userID/AllReplies',
            component:AllReplies
        },
        {
            path:'/user/:userID/MyCollections',
            component:MyCollections
        },
        {
            path:'/allSections',
            component:AllSections,
        },
        {
            path:'/allSections/:Section',
            component:Section
        },
        {
            path:'/allSections/:Section/:subSection',
            component:SubSection
        },
        {
            path:'/allSections/:Section/:subSection/:postid',
            component:SinglePost
        },
        {
            path:'/userManager',
            component:UserManager,
        }]
})
