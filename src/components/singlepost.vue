<template>
    <main style="padding-top: 48px">
       <v-container fluid style="padding-left: 2px;padding-right: 2px">
            <v-layout row>
                <v-flex xs12>
                    <v-card class="elevation-0">
                        <div class="HeadLine" style="height:5px;width:100%;background-color: #3e92ff">
                        </div>
                        <v-card-title>
                            <router-link class="returnSubSection" :to="'/allSections/'+SectionID+'/'+SubSectionID">返回所在版面</router-link>
                            <v-card-text style="padding-left: 0">
                                <span class="display-1">{{title}}</span>
                                <br/>
                                <router-link class="userName" :to="'/user/'+authorID">{{authorName}}</router-link>
                            </v-card-text>
                        </v-card-title>
                    </v-card>
                    <v-card class="elevation-0">
                        <v-card-text>
                            <div class="replyContent">
                                {{content}}
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-card class="orange lighten-3" height="7px">
                    </v-card>
                    <template v-for="(reply, index) in replies">
                        <v-card class="elevation-0">
                            <v-card-title class="userInfo">
                                <router-link class="userName" :to="'/user/'+reply.userID">{{reply.userName}}</router-link>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <div class="replyContent">
                                    {{reply.content}}
                                </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions style="padding-top: 2px;padding-bottom: 2px">
                                <v-spacer></v-spacer>
                                <v-btn icon @click.native="reply.showreply=(reply.showreply + 300) % 600">
                                    <v-icon>keyboard_arrow_down</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-divider class="blue" v-if="reply.showreply>0"></v-divider>
                            <div class="inreplyDraw" v-bind:style="{'max-height':reply.showreply + 'px'}">
                                <div class="inreplyInnerDraw">
                                    <template v-for="inreply in reply.inreplies">
                                        <v-card class="elevation-0">
                                            <v-card-text style="padding-top:2px;padding-bottom:2px">
                                                <router-link class="userName" :to="'/user/'+inreply.userID">{{inreply.userName}}</router-link>
                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <div class="replyContent">
                                                    {{inreply.content}}
                                                </div>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                        </v-card>
                                    </template>
                                </div>
                                <div dense>
                                        <v-container fluid style="padding-top: 10px;padding-bottom: 0">
                                        <v-layout row>
                                            <v-flex xs10>
                                                <v-text-field
                                                        name="input-1"
                                                        label="请输入评论"
                                                        v-model="reply.newreply"
                                                        v-bind:disabled="!useful"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex xs2>
                                                <v-btn icon @click.native="addreply(index)" v-bind:disabled="!useful">
                                                    <v-icon>message</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                        </v-container>
                                </div>
                            </div>
                        </v-card>
                        <v-card class="orange lighten-3" height="7px">
                        </v-card>
                    </template>
                    <div style="margin-top: 20px">
                    </div>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                    name="input-1"
                                    label="请输入回复"
                                    multi-line
                                    v-model="newreply"
                                    v-bind:disabled="!useful"
                                    style="margin-left: 8px">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs2>
                            <v-btn primary @click.native="addmainreply" v-bind:disabled="!useful">回复</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:"SinglePost",
        data(){
            return {
                id:this.$route.params.postid,
                SubSectionID:"",
                SectionID:"",
                title:"",
                authorName:"",
                authorID:"",
                newreply:"",
                content:"",
                replies:[],
            }
        },
        computed:{
            useful(){
                return this.$store.state.isLogin;
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.SubSectionID='b1231234';
                this.SectionID='s1324';
                this.title="asdfsad";
                this.authorName="matinjugou";
                this.authorID="u1241234";
                this.content="heheh";
                this.replies = [{
                    userID:"u2341324",
                    userName:"asdf",
                    newreply:"",
                    content:"asdfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsda",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadfsadddddddddddddddddddddddfsadfsadfsadfsadfsadasssssssssssssssssssssssssssf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    showreply:0,
                    newreply:"",
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    newreply:"",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    newreply:"",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    newreply:"",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    newreply:"",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },{
                    userID:"u2341324",
                    userName:"asdf",
                    content:"asdfsda",
                    newreply:"",
                    showreply:0,
                    inreplies:[{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },{
                        userID:"u1324",
                        userName:"asd",
                        content:"sadf"
                    },]
                },];
            },
            addreply(inputid){
                //TODO server confirm
                if (this.replies[inputid].newreply==="")
                    return;
                this.replies[inputid].inreplies.push({
                    userID:this.$store.state.UserID,
                    userName:this.$store.state.UserName,
                    content:this.replies[inputid].newreply});
                this.replies[inputid].newreply = "";
            },
            addmainreply(){
                if (this.newreply==="")
                    return;
                this.replies.push({
                    userID:this.$store.state.UserID,
                    userName:this.$store.state.UserName,
                    content:this.newreply,
                    newreply:"",
                    showreply:0,
                    inreplies:[]
                });
                this.newreply="";
            }
        }
    }
</script>

<style name="stylus">
    a.returnSubSection{
        text-decoration: none;
    }
    a.returnSubSection:hover{
        text-decoration: underline;
    }
    a.userName{
        text-decoration: none;
        color: gray;
    }
    a.userName:hover{
        text-decoration: underline;
    }
    .userInfo{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .replyContent{
        word-wrap: break-word;
        word-break: normal;
    }
    .inreplyDraw
    {
        overflow: auto;
    }
    .inreplyInnerDraw
    {
        max-height: 180px;
        word-wrap: break-word;
        word-break: normal;
        overflow: auto;
    }
</style>