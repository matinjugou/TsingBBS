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
                                        class="BBSSection"
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
                                    <v-card-text v-if="part.direction" style="padding-bottom: 0;padding-top: 9px;padding-left: 14px">
                                        {{part.direction}}
                                    </v-card-text>
                                    <v-card-text v-if="part.bestArticle" class="SectionText">
                                        <ul class="SectionList" style="padding-left: 0">
                                            <li v-for="article in part.bestArticle">
                                                <router-link :to="'/allSections/'+article.SectionID+'/'+article.SubSectionID+'/'+article.id">{{article.name}}</router-link>
                                            </li>
                                        </ul>
                                    </v-card-text>
                                    <v-card-text v-if="part.bestSection" class="SectionText">
                                        <ul class="SectionList" style="padding-left: 0">
                                            <li v-for="section in part.bestSection">
                                                <router-link :to="'/allSections/'+section.id">{{section.name}}</router-link>
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
                    direction:"当前最热门的内容",
                    bestArticle:[{name:"part1", id:1, SectionID:'s12321',SubSectionID:"b1232314"},
                        {name:"part2", id:2,SectionID:'s12321',SubSectionID:"b1232314"}],
                    linker:"/hotposts",
                    color:"grey darken-3"
                },{
                    name:"帖子广场",
                    direction:'汇集了最有用的信息的地方',
                    linker:"/hotposts",
                    color:"orange accent-3"
                },{
                    name:"全部板块",
                    direction:"想要的这里都有～",
                    bestSection:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/allSections",
                    color:"light-green darken-3"
                },{
                    name:"近期公告",
                    direction:"打滚求关注",
                    bestArticle:[{name:"part1", id:1, SectionID:'s12321',SubSectionID:"b1232314"},
                        {name:"part2", id:2,SectionID:'s12321',SubSectionID:"b1232314"}],
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
    .BBSSection{
        margin-bottom :7px;
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

</style>