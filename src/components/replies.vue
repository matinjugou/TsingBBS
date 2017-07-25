<template>
    <main light style="padding-top:32px">
        <v-card flat >
            <v-card-text>
                <v-container fluid>
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
                    <v-divider></v-divider>
                    <v-spacer></v-spacer>
                    <v-layout row wrap>
                        <template v-for="reply in replies">
                            <v-flex xs12>
                                <v-card
                                        class="reply_card elevation-1"
                                        @click="routing(reply.id)"
                                        style="margin-bottom:1px">
                                    <v-card-title>
                                        <div>
                                            <div class="blue--text">{{reply.replier}}回复了你：</div>
                                            <h3 class="headline mb-0">{{reply.title}}</h3>
                                            <div>{{reply.text}}</div>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </main>
</template>

<script>
    export default {
        name:'AllReplies',
        data(){
            return{
                e1:null,
                items:[
                    { text: '回复' },
                    { text: '私信' },
                ],
                replies:[]
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
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