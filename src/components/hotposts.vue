<template>
    <main class = "grey lighten-3">
        <v-container fluid>
            <v-layout row wrap>
                <template v-for="spost in posts">
                        <v-flex v-if="spost.level === 12" xs12>
                            <transition name="fade">
                                <v-card class = "white--text postcard red lighten-1"
                                        @click="routing('/allSections/'+spost.Section+'/'+spost.subSection+'/'+spost.id)"
                                        v-show="spost.index < postIndex">
                                    <v-card-title class = "headline" style="padding-bottom: 0">
                                        {{spost.title}}
                                    </v-card-title>
                                    <v-card-text style="padding-top: 0">
                                        {{spost.text}}
                                    </v-card-text>
                                </v-card>
                            </transition>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 9" xs9>
                            <transition name="fade">
                                <v-card  class = "white--text postcard amber lighten-1"
                                         @click="routing('/allSections/'+spost.Section+'/'+spost.subSection+'/'+spost.id)"
                                         v-show="spost.index < postIndex">
                                    <v-card-title class = "headline" style="padding-bottom: 0">
                                        {{spost.title}}
                                    </v-card-title>
                                    <v-card-text style="padding-top: 0">
                                        {{spost.text}}
                                    </v-card-text>
                                </v-card>
                            </transition>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 6" xs6>
                            <transition name="fade">
                                <v-card class = "white--text postcard green lighten-1"
                                        @click="routing('/allSections/'+spost.Section+'/'+spost.subSection+'/'+spost.id)"
                                        v-show="spost.index < postIndex">
                                    <v-card-title class = "headline" style="padding-bottom: 0">
                                        {{spost.title}}
                                    </v-card-title>
                                    <v-card-text style="padding-top: 0">
                                        {{spost.text}}
                                    </v-card-text>
                                </v-card>
                            </transition>
                        </v-flex>
                        <v-flex v-else-if="spost.level === 3" xs3>
                            <transition name="fade">
                                <v-card  class = "white--text postcard blue-grey lighten-1"
                                         @click="routing('/allSections/'+spost.Section+'/'+spost.subSection+'/'+spost.id)"
                                         v-show="spost.index < postIndex">
                                    <v-card-title class = "headline" style="padding-bottom: 0">
                                        {{spost.title}}
                                    </v-card-title>
                                    <v-card-text style="padding-top: 0">
                                        {{spost.text}}
                                    </v-card-text>
                                </v-card>
                            </transition>
                        </v-flex>
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
                show:true,
                postIndex: 0,
                posts:[
                ],
                postTot:0,

            }
        },
        created(){
            this.fetchData();
            this.addPost();
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
                    Section:"Section1",
                    subSection:"subSection1",
                    level:12,
                    index:0,
                },{
                    id:"m121",
                    title:"test2",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:3,
                    index:1
                },{
                    id:"m122",
                    title:"test3",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:6,
                    index:2,
                },{
                    id:"m122",
                    title:"test4",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:3,
                    index:3,
                },{
                    id:"m122",
                    title:"test5",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:9,
                    index:4,
                },{
                    id:"m122",
                    title:"test6",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:3,
                    index:5,
                },{
                    id:"m122",
                    title:"test7",
                    text:"balbala",
                    level:3,
                    index:6,
                },{
                    id:"m122",
                    title:"test8",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:3,
                    index:7,
                },{
                    id:"m122",
                    title:"test9",
                    text:"balabala",
                    Section:"Section1",
                    subSection:"subSection1",
                    level:6,
                    index:8,
                }
                ];
                this.postTot = 9;
            },
            addPost(){
                if (this.postIndex < this.postTot) {
                    this.postIndex++;
                    setTimeout(this.addPost.bind(this), 100);
                }
            },
            routing(path)
            {
                //this.$router.push(path);
            }
        }
    }
</script>

<style lang="stylus">
    .postcard
    {
        margin-bottom:7px;
    }

    .postcard::hover{
        background-color: aliceblue;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>