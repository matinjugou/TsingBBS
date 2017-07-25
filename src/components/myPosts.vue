<template>
    <main>
        <v-card flat>
            <v-card-text>
                <v-container fluid>
                    <v-layout row wrap>
                        <v-flex xs2>
                            <v-select
                                    v-bind:items="items"
                                    v-model="e1"
                                    label="Select"
                                    single-line
                                    bottom
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-list two-line>
                        <template v-for="post in posts">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{post.title}}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{post.text}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-container>
            </v-card-text>
        </v-card>
    </main>
</template>

<script>
    export default {
        name:'MyPosts',
        data(){
            return{
                e1:null,
                items:[
                    { text: '按照时间排序' },
                    { text: '按照热度排序' },
                ],
                posts:[]
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.posts = [{
                    id:"m120",
                    title:"test1 asf ",
                    text:"balalbasdfsasdafafa",
                    index:0,
                },{
                    id:"m121",
                    title:"test2",
                    text:"balabala",
                    index:1
                },{
                    id:"m122",
                    title:"test3",
                    text:"balabala",
                    index:2,
                },{
                    id:"m122",
                    title:"test4",
                    text:"balabala",
                    index:3,
                },{
                    id:"m122",
                    title:"test5",
                    text:"balabala",
                    index:4,
                },{
                    id:"m122",
                    title:"test6",
                    text:"balabala",
                    index:5,
                },{
                    id:"m122",
                    title:"test7",
                    text:"balbala",
                    index:6,
                },{
                    id:"m122",
                    title:"test8",
                    text:"balabala",
                    index:7,
                },{
                    id:"m122",
                    title:"test9",
                    text:"balabala",
                    index:8,
                }
                ];
            }
        }

    }
</script>