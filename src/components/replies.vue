<template>
    <main light style="padding-top:48px">
        <v-tabs dark v-model="activeTab" fixed centered >
            <v-tabs-bar slot="activators" class="cyan" fixed dense>
                <v-tabs-item :href="'#postReply'"
                             ripple>
                    回复我的帖子
                </v-tabs-item>
                <v-tabs-item :href="'#privateMsg'"
                             ripple>
                    私信
                </v-tabs-item>
                <v-tabs-slider class="yellow"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-content :id="'postReply'">
                <v-card v-if="replyHave" flat>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="reply in replies">
                                <v-list-tile :to="'/allSections/'+reply.SectionID +'/' + reply.SubSectionID + '/' +reply.id">
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title class="blue--text">{{reply.title}}在问题《{{reply.title}}》中回复了你：</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{reply.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-card v-else>
                    <v-card-text class="text-xs-center">暂时没有人回复你哦～</v-card-text>
                </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'privateMsg'">
                <v-card v-if="msgHave" flat>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="priMsg in priMsgs">
                                <v-list-tile :to="'/user/' + priMsg.userID">
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title class="blue--text">{{priMsg.userName}}发了私信给你：</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{priMsg.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-card v-else>
                    <v-card-text class="text-xs-center">暂时没有人给你发私信哦～</v-card-text>
                </v-card>
            </v-tabs-content>
        </v-tabs>
    </main>
</template>

<script>
    export default {
        name:'AllReplies',
        data(){
            return{
                e1:null,
                replies:[],
                priMsgs:[],
                userID:"",
                activeTab:null,
            }
        },
        computed:{
            replyHave(){
                return this.replies.length > 0;
            },
            msgHave(){
                return this.priMsgs.length > 0;
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.replies=[];
                this.priMsgs=[];
                this.userID = this.$store.state.userID;
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/userinform',
                        body:{
                            user_id:this.$store.state.UserID
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
                        for (let msg of data.data){
                            console.log(msg);
                            this.$http(
                                {
                                    method:'POST',
                                    url:'http://localhost:23333/userinfo',
                                    body:{
                                        user_id:msg.sender_id
                                    },
                                    headers:{
                                        "X-Requested-With":"XMLHttpRequest",
                                    },
                                    emulateJSON:true
                                }
                            ).then(function(res2){
                                let data2 = res2.data;
                                console.log(data2.data);
                                if (data2.code === "M200") {
                                    if (msg.message_type === 0)
                                    {
                                        this.priMsgs.push({
                                            userID:msg.sender_id,
                                            userName:data2.data[0].user_name,
                                            text:msg.content,
                                        });
                                    }
                                    else{
                                        this.$http({
                                            method:'POST',
                                            url:'http://localhost:23333/getPostInfo',
                                            body:{
                                                post_id:msg.post_id
                                            },
                                            headers:{
                                                "X-Requested-With":"XMLHttpRequest",
                                            },
                                            emulateJSON:true
                                        }).then((res3)=>{
                                            let data3 = res3.data;
                                            console.log(data3);
                                            if (data3.code === "M200"){
                                                this.replies.push({
                                                    id:msg.post_id,
                                                    replier:data2.data[0].user_name,
                                                    title:data3.data[0].post_title,
                                                    SectionID:data3.data[0].fatherSection_id,
                                                    SubSectionID:data3.data[0].fatherSubsection_id,
                                                    text:"点击以查看详情",
                                                    index:0,
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                    else{

                    }
                });


                /*
                this.replies = [{
                    id:"m120",
                    replier:"Tom",
                    title:"test1 asf ",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balalbasa",
                    index:0,
                },{
                    id:"m121",
                    replier:"Tom",
                    title:"test2",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:1
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test3",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:2,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test4",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:3,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test5",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:4,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test6",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:5,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test7",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balbala",
                    index:6,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test8",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:7,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test9",
                    SectionID:"s123123",
                    SubSectionID:"b123213",
                    text:"balabala",
                    index:8,
                }
                ];
                this.priMsgs=[{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },{
                    userID:"m1234",
                    userName:"papapa",
                    text:"balbalbalb"
                },];
                */
            },
            routing(path){
                this.$router.push('/allPosts/'+path);
            }
        }

    }
</script>

<style name="stylus">
    .reply_card:hover{
        background-color: aliceblue;
    }
</style>