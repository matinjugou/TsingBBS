<template>
    <main>
        <template v-if="loading">
            <v-card>
                <v-card-title>
                    Loading
                </v-card-title>
            </v-card>
        </template>
        <template v-else>
            <v-container fluid>
                <v-layout row wrap>
                    <template v-for="part in BBSSections">
                        <transition name = "fade">
                            <v-flex xs12 sm6 md6 lg4>
                                <v-card height="200px"
                                        light
                                        class = "BBSSection"
                                        >
                                    <div class="SectionHeadLine"
                                         :class="part.color"
                                         >
                                    </div>
                                    <v-layout row>
                                    <v-card-title class="SectionTitle">
                                            <span class="subheading">{{part.name}}</span>
                                    </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon :to="part.linker">
                                            <v-icon>more</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-card-text class="SectionText">
                                        <ul class="SectionList">
                                            <li v-for="article in part.bestArticle">
                                                <router-link :to="'/allPosts/'+article.id">{{article.name}}</router-link>
                                            </li>
                                        </ul>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </transition>
                    </template>
                </v-layout>
            </v-container>
        </template>
    </main>
</template>

<script>
    export default {
        name:"MainComp",
        data(){
            return{
                BBSSections:[],
                loading:false,
            }
        },
        created(){
            this.fetchData()
        },
        watch:{
            '$route':'fetchData'
        },
        methods:{
            fetchData(){
                this.loading = true;
                this.BBSSections = [{
                    name:"全站十大",
                    bestArticle:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"grey darken-3"
                },{
                    name:"帖子广场",
                    bestArticle:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"orange accent-3"
                },{
                    name:"近期公告",
                    bestArticle:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"light-green darken-3"
                },{
                    name:"其他地区",
                    bestArticle:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"blue lighten-1"
                },];
                this.loading = false;
            },
            routing:function(path)
            {
                this.$router.push(path);
            }
        }
    }
</script>

<style lang="stylus">
    .SectionHeadLine{
        height:4px;
        widht:100%;
    }
    .SectionTitle{
        padding :10px;
    }
    .SectionText{
        padding:16px 10px 10px 10px;
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

</style>