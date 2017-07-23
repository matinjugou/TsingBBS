<template>
    <main class = "grey lighten-3">
        <v-container fluid>
            <v-layout row wrap>
                <template v-for="spost in posts">
                    <transition name="slide-right">
                        <v-flex v-if="spost.level === 12" xs12 sm12 md12 lg12>
                            <v-card class = "white--text postcard red lighten-1">
                                <v-card-title>
                                    <div>
                                        <h3 class="headline mb-0 white--text">{{spost.title}}</h3>
                                        <div>{{spost.text}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn dark flat v-bind:to="spost.id">Learn More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 9" xs9 sm9 md9 lg9>
                            <v-card class = "white--text postcard amber lighten-1" >
                                <v-card-title>
                                    <div>
                                        <h3 class="headline mb-0 white--text">{{spost.title}}</h3>
                                        <div>{{spost.text}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn dark flat v-bind:to="spost.id">Learn More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 6" xs6 sm6 md6 lg6>
                            <v-card class = "white--text postcard green lighten-1" >
                                <v-card-title>
                                    <div>
                                        <h3 class="headline mb-0 white--text">{{spost.title}}</h3>
                                        <div>{{spost.text}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn dark flat v-bind:to="spost.id">Learn More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 3" xs3 sm3 md3 lg3>
                            <v-card class = "white--text postcard blue-grey lighten-1" >
                                <v-card-title>
                                    <div>
                                        <h3 class="headline mb-0 white--text">{{spost.title}}</h3>
                                        <div>{{spost.text}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn dark flat v-bind:to="spost.id">Learn More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </transition>
                </template>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:'HotPosts',
        data(){
            return{
                postCount: 0,
                posts:[
                ],

            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            '$route':'fetchData'
        },
        methods:{
            fetchData(){
                this.posts = [{
                    id:"m120",
                    title:"test1",
                    text:"balabala",
                    level:12,
                },{
                    id:"m121",
                    title:"test2",
                    text:"balabala",
                    level:3,
                },{
                    id:"m122",
                    title:"test3",
                    text:"balabala",
                    level:6,
                },{
                    id:"m122",
                    title:"test4",
                    text:"balabala",
                    level:3,
                },{
                    id:"m122",
                    title:"test5",
                    text:"balabala",
                    level:9,
                },{
                    id:"m122",
                    title:"test6",
                    text:"balabala",
                    level:3,
                },{
                    id:"m122",
                    title:"test7",
                    text:"balabalabalabalabalabalabalabala",
                    level:3,
                },{
                    id:"m122",
                    title:"test8",
                    text:"balabala",
                    level:3,
                },{
                    id:"m122",
                    title:"test9",
                    text:"balabala",
                    level:6,
                }
                ];
            }
        }
    }
</script>

<style lang="stylus">
    .postcard
    {
        margin-bottom:7px;
    }

    div
    {
        word-wrap: break-word;
        word-break: normal;
    }
</style>