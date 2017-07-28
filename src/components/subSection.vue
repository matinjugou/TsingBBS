<template>
    <main style="padding-top: 48px">
        <v-alert
                success
                :value="successAlert"
                style="position: fixed;top: 48px;z-index: 100;width: 100%"
                transition="scale-transition"
        >
            收藏成功
        </v-alert>
        <v-alert
                error
                :value="failAlert"
                style="position: fixed;top: 48px;z-index: 100;width: 100%"
                transition="scale-transition"
        >
            收藏失败
        </v-alert>
        <v-container fluid style="padding-left: 2px;padding-right: 2px">
            <v-layout row>
                <v-flex xs12>
                    <v-card>
                        <div class="SectionHeadLine red darken-1"
                        >
                        </div>
                        <v-card-title class="display-1">
                            <router-link class="returnSection" :to="'/allSections/'+SectionID">返回所在版块</router-link>

                            <v-card-text style="padding-left: 0">
                                <span class="display-1">{{this.SubSectionName}}</span>
                            </v-card-text>
                        </v-card-title>
                        <v-tabs light v-model="activeTab" fixed>
                            <v-tabs-bar slot="activators" class="white" fixed>
                                <v-tabs-item :href="'#AllPosts'"
                                             ripple>
                                    全部帖子
                                </v-tabs-item>
                                <v-tabs-item :href="'#StarPosts'"
                                             ripple>
                                    精华区
                                </v-tabs-item>
                                <v-tabs-slider class="red darken-1"></v-tabs-slider>
                            </v-tabs-bar>
                            <v-tabs-content :id="'AllPosts'">
                                <v-card v-if="postsCount===0">
                                    <v-card-text class="text-xs-center">
                                        这里什么都没有哦，快来发帖吧～
                                    </v-card-text>
                                </v-card>
                                <v-card flat light>
                                    <v-card-text>
                                        <v-list dense>
                                            <template v-for="post in posts">
                                                <v-list-tile>
                                                    <v-list-tile-content>
                                                        <v-list-tile-title>
                                                            <router-link class="SSectionName subh-eading"
                                                                         :to="'/allSections'+'/'+SectionID+'/'+SubSectionID+'/'+post.id">
                                                                {{post.name}}</router-link>
                                                        </v-list-tile-title></v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-icon>perm_identity</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-action>
                                                        <router-link class="postAuthor"
                                                                     :to="'/user/'+post.authorID">
                                                            {{post.authorName}}
                                                        </router-link>
                                                    </v-list-tile-action>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <v-list-tile-action>
                                                        <div class="dropdown">
                                                            <v-icon>more_vert</v-icon>
                                                            <div class="dropdown-content">
                                                                <a @click="collectPost(post.id)">收藏</a>
                                                                <a @click="deletePost(post.id)"
                                                                   v-if="$store.state.UserType==='Admin'">删除</a>
                                                                <a @click="setStarPost(post.id, 1)"
                                                                   v-if="$store.state.UserType==='Admin'">设置为精华</a>
                                                            </div>
                                                        </div>
                                                    </v-list-tile-action>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                            </template>
                                        </v-list>
                                    </v-card-text>
                                    <v-card height="100px"></v-card>
                                </v-card>
                            </v-tabs-content>
                            <v-tabs-content :id="'StarPosts'">
                                <v-card v-if="starPostsCount===0">
                                    <v-card-text class="text-xs-center">
                                        这里什么都没有哦，快去找管理员大大申精～
                                    </v-card-text>
                                </v-card>
                                <v-card flat light>
                                    <v-card-text>
                                        <v-list dense>
                                            <template v-for="post in posts" v-if="post.stared==='true'">
                                                <v-list-tile >
                                                    <v-list-tile-content>
                                                        <v-list-tile-title>
                                                            <router-link class="SSectionName subh-eading"
                                                                         :to="'/allSections'+'/'+SectionID+'/'+SubSectionID+'/'+post.id">
                                                                {{post.name}}</router-link>
                                                        </v-list-tile-title>
                                                    </v-list-tile-content>
                                                    <v-list-tile-action>
                                                        <v-icon>perm_identity</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-action>
                                                        <router-link class="postAuthor"
                                                                     :to="'/user/'+post.authorID">
                                                            {{post.authorName}}
                                                        </router-link>
                                                    </v-list-tile-action>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <v-list-tile-action>
                                                        <div class="dropdown">
                                                            <v-icon>more_vert</v-icon>
                                                            <div class="dropdown-content">
                                                                <a @click="collectPost(post.id)">收藏</a>
                                                                <a @click="deletePost(post.id)"
                                                                   v-if="$store.state.UserType==='Admin'">删除</a>
                                                                <a @click="setStarPost(post.id, 0)"
                                                                   v-if="$store.state.UserType==='Admin'">取消精华</a>
                                                            </div>
                                                        </div>
                                                    </v-list-tile-action>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                            </template>
                                        </v-list>
                                    </v-card-text>
                                </v-card>
                                <v-card height="100px"></v-card>
                            </v-tabs-content>
                        </v-tabs>
                        <v-layout row >
                            <v-flex xs12>
                                <v-text-field
                                        name="title"
                                        label="请输入标题"
                                        single-line
                                        v-model="newPostTitle"
                                        v-bind:disabled="!$store.state.isLogin"
                                        style="margin-left: 8px">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                        name="content"
                                        label="请输入内容"
                                        multi-line
                                        v-model="newPostContent"
                                        v-bind:disabled="!$store.state.isLogin"
                                        style="margin-left: 8px">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs2>
                                <v-btn primary @click.native="addnewpost" v-bind:disabled="!$store.state.isLogin || checkEmpty">发帖</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:"SubSection",
        data(){
            return{
                successAlert:false,
                failAlert:false,
                newPostTitle:'',
                newPostContent:'',
                activeTab:null,
                SubSectionID:this.$route.params.subSection,
                SectionID:this.$route.params.Section,
                SubSectionName:"",
                posts:[],

            }
        },
        computed:{
            checkEmpty(){
                return (this.newPostTitle === "" || this.newPostContent === "");
            },
            postsCount()
            {
                return this.posts.length;
            },
            starPostsCount()
            {
                let count = 0;
                for (let post of this.posts){
                    if (post.stared === 'true'){
                        count++;
                    }
                }
                return count;
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.posts = [];
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/loadSubSectionTitle',
                        body:{
                            SubSection_id:this.SubSectionID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data);
                    if (data.code === "M200") {
                        this.SubSectionName = data.subsection_title[0].subsection_name;
                    }
                });
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/loadSubSection',
                        body:{
                            SubSection_id:this.SubSectionID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data);
                    if (data.code === "M200") {
                        for (let post of data.data){
                            this.posts.push({
                                id:post.post_id,
                                name:post.post_title,
                                authorName:post.author_name,
                                authorID:post.author_id,
                                stared:post.essence === 0 ? "false" : "true"
                            });
                        }
                    }
                });
            },
            addnewpost(){
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/addPost',
                        body:{
                            post_title:this.newPostTitle,
                            author_id:this.$store.state.UserID,
                            author_name:this.$store.state.UserName,
                            content:this.newPostContent,
                            Section_id:this.SectionID,
                            SubSection_id:this.SubSectionID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.posts.push({
                            id:data.post_id,
                            name:this.newPostTitle,
                            authorName:this.$store.state.UserName,
                            authorID:this.$store.state.UserID,
                            stared:"false"
                        });
                        this.newPostTitle='';
                        this.newPostContent='';
                    }
                });
            },
            collectPost(PostID) {
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/collectPost',
                        body:{
                            user_id:this.$store.state.UserID,
                            section_id:PostID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.successAlert = true;
                        setTimeout(()=>{this.successAlert=false},1500);
                    }
                    else{
                        this.failAlert = true;
                        setTimeout(()=>{this.failAlert=false},1500);
                    }
                });
            },
            deletePost(PostID){
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/deletePost',
                        body:{
                            user_id:this.$store.state.UserID,
                            post_id:PostID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.fetchData();
                    }
                    else{
                    }
                });
            },
            setStarPost(postID, type){
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/setStarPost',
                        body:{
                            post_id:postID,
                            essence:type
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.fetchData();
                    }
                });
            }
        }
    }
</script>

<style name="stylus">
    a.returnSection{
        text-decoration: none;
        font-size: 14px;
    }
    a.returnSection:hover{
        text-decoration: underline;
    }
    a.postAuthor{
        color:gray;
        text-decoration:none;
    }
    a.postAuthor:hover{
        text-decoration:underline;
    }
    .SectionHeadLine{
        height:4px;
        widht:100%;
    }
    .SectionTitle{
        padding :10px;
    }
    .SectionText{
        padding:1px 10px 10px 14px;
    }
    .SectionList{
        list-style-type :none;
        padding-left :5px;
    }
    .SectionList a{
        font-size :12px;
        color:black;
        text-decoration:none;
    }
    .SectionList a:hover{
        color:black;
        text-decoration :underline;
    }
    .dropdown-content {
        right:0;
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        z-index:100;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {background-color: #f1f1f1}
    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>