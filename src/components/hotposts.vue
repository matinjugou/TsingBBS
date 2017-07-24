<template>
    <main class = "grey lighten-3">
        <v-container fluid>
            <v-layout row wrap>
                <template v-for="spost in posts">
                    <transition name="slide-right">
                        <v-flex v-if="spost.level === 12" xs12 sm12 md12 lg12>
                            <v-card class = "white--text postcard red lighten-1" @click="routing(spost.id)">
                                <v-card-title class = "headline" style="padding-bottom: 0">
                                    {{spost.title}}
                                </v-card-title>
                                <v-card-text style="padding-top: 0">
                                    {{spost.text}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 9" xs9 sm9 md9 lg9>
                            <v-card class = "white--text postcard amber lighten-1" @click="routing(spost.id)">
                                <v-card-title class = "headline" style="padding-bottom: 0">
                                    {{spost.title}}
                                </v-card-title>
                                <v-card-text style="padding-top: 0">
                                    {{spost.text}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 6" xs6 sm6 md6 lg6>
                            <v-card class = "white--text postcard green lighten-1" @click="routing(spost.id)">
                                <v-card-title class = "headline" style="padding-bottom: 0">
                                    {{spost.title}}
                                </v-card-title>
                                <v-card-text style="padding-top: 0">
                                    {{spost.text}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 3" xs3 sm3 md3 lg3>
                            <v-card class = "white--text postcard blue-grey lighten-1" @click="routing(spost.id)">
                                <v-card-title class = "headline" style="padding-bottom: 0">
                                    {{spost.title}}
                                </v-card-title>
                                <v-card-text style="padding-top: 0">
                                    {{spost.text}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </transition>
                </template>
                <v-flex xs12 sm12 md12 lg12>
                    <v-card>
                    </v-card>
                </v-flex>
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
            '$route':'fetchData',
        },
        methods:{
            fetchData(){
                this.posts = [{
                    id:"m120",
                    title:"test1",
                    text:"balalba",
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
                    text:"balbala",
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
                this.postTot = 9;
            },
            routing:function(path)
            {
                this.$router.push(path);
            }
        }
    }
</script>

<style lang="stylus">
    .postcard
    {
        margin-bottom:7px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>