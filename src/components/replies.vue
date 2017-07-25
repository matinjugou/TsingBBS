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
                <v-card flat>
                    <v-card-text>
                        <v-list two-line>
                            <template v-for="reply in replies">
                                <v-list-tile @click.native="routing(reply.id)">
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
            </v-tabs-content>
            <v-tabs-content :id="'privateMsg'">
                <v-card flat>
                    <v-card-text>
                        <!--v-container fluid style="padding-left: 0">
                            <v-layout row wrap>
                                <v-flex xs6 sm2 md2 lg2>
                                    <v-select
                                            v-bind:items="items"
                                            v-model="e1"
                                            label="Select"
                                            single-line
                                            bottom
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-spacer></v-spacer>
                        </v-container>
                        <v-divider></v-divider-->
                        <v-list two-line>
                            <template v-for="priMsg in priMsgs">
                                <v-list-tile :to="'/user/'+userID+'/privateMsg/'+priMsg.userID">
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
                priMsg:[],
                userID:"",
                activeTab:null,
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.userID = this.$store.state.userID;
                this.replies = [{
                    id:"m120",
                    replier:"Tom",
                    title:"test1 asf ",
                    text:"balalbasa",
                    index:0,
                },{
                    id:"m121",
                    replier:"Tom",
                    title:"test2",
                    text:"balabala",
                    index:1
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test3",
                    text:"balabala",
                    index:2,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test4",
                    text:"balabala",
                    index:3,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test5",
                    text:"balabala",
                    index:4,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test6",
                    text:"balabala",
                    index:5,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test7",
                    text:"balbala",
                    index:6,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test8",
                    text:"balabala",
                    index:7,
                },{
                    id:"m122",
                    replier:"Tom",
                    title:"test9",
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