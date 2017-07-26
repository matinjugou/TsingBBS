<template>
    <main style="padding-top: 48px">
        <v-tabs dark v-model="activeTab" fixed centered >
            <v-tabs-bar slot="activators" class="cyan" fixed>
                <v-tabs-item :href="'#BBSSection'"
                             ripple>
                    版块
                </v-tabs-item>
                <v-tabs-item :href="'#SubSections'"
                             ripple>
                    版面
                </v-tabs-item>
                <v-tabs-item :href="'#Posts'"
                             ripple>
                    帖子
                </v-tabs-item>
                <v-tabs-slider class="yellow"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-content :id="'BBSSection'">
                <v-card v-if="sectionsNum===0">
                    <v-card-text class="text-xs-center">
                        这里什么都没有哦，快去找找你喜欢的版块吧～
                    </v-card-text>
                </v-card>
                <v-card flat light>
                    <v-card-text>
                        <v-list dense>
                            <template v-for="section in sections">
                                <v-list-tile :to="/allSections/+ section.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{section.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'SubSections'">
                <v-card v-if="subsectionNum===0">
                    <v-card-text class="text-xs-center">
                        这里什么都没有哦，快去找找你喜欢的版面吧～
                    </v-card-text>
                </v-card>
                <v-card flat light>
                    <v-card-text>
                        <v-list dense>
                            <template v-for="subsection in subsections">
                                <v-list-tile :to="/allSections/+subsection.SectionID+'/'+subsection.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{subsection.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'Posts'">
                <v-card v-if="postsNum===0">
                    <v-card-text class="text-xs-center">
                        这里什么都没有哦，快去找找你喜欢的帖子吧～
                    </v-card-text>
                </v-card>
                <v-card flat light>
                    <v-card-text>
                        <v-list dense>
                            <template v-for="post in posts">
                                <v-list-tile :to="'/allSections/' + post.SectionID + '/' + post.SubSectionID + '/' + post.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{post.title}}</v-list-tile-title>
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
        name:"MyCollections",
        data(){
            return{
                activeTab:null,
                posts:[],
                subsections:[],
                sections:[],
                postsNum:0,
                subsectionNum:0,
                sectionsNum:0,
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.posts=[{
                    id:'m1223',
                    SectionID:'s124213',
                    SubSectionID:'b123123',
                    title:'隔壁又在黑我们了'
                }, {
                    id:'m1234',
                    SectionID:'s124213',
                    SubSectionID:'b123123',
                    title:'我们去黑隔壁吧'
                }];
                this.postsNum = 2;
            }
        }
    }
</script>

<style name="stylus">

</style>