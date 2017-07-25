<template>
    <main>
        <v-card>
            <div class="SectionHeadLine red darken-1"
            >
            </div>
            <v-card-title class="display-1">
                {{this.SubSectionName}}
            </v-card-title>
            <v-tabs light v-model="activeTab" fixed>
                <v-tabs-bar slot="activators" class="white" fixed>
                    <v-tabs-item :href="'#AllPosts'"
                                 ripple>
                        全部帖子
                    </v-tabs-item>
                    <v-tabs-item :href="'#StarPosts'"
                                 ripple>
                        精华区
                    </v-tabs-item>
                    <v-tabs-slider class="red darken-1"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-content :id="'AllPosts'">
                    <v-card v-if="postsCount===0">
                        <v-card-text class="text-xs-center">
                            这里什么都没有哦，快来发帖吧～
                        </v-card-text>
                    </v-card>
                    <v-card flat light>
                        <v-card-text>
                            <v-list dense>
                                <template v-for="post in posts">
                                    <v-list-tile :to="'/allSections'+'/'+SectionID+'/'+SubSectionID+'/'+post.id">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{post.name}}</v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>perm_identity</v-icon>
                                        </v-list-tile-action>
                                        {{post.author}}
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                </template>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-tabs-content>
                <v-tabs-content :id="'StarPosts'">
                    <v-card v-if="starPostsCount===0">
                        <v-card-text class="text-xs-center">
                            这里什么都没有哦，快去找管理员大大申精～
                        </v-card-text>
                    </v-card>
                    <v-card flat light>
                        <v-card-text>
                            <v-list dense>
                                <template v-for="post in posts" v-if="post.stared==='true'">
                                    <v-list-tile :to="post.id">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{post.name}}</v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>perm_identity</v-icon>
                                        </v-list-tile-action>
                                        {{post.author}}
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                </template>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-tabs-content>
            </v-tabs>
        </v-card>
    </main>
</template>

<script>
    export default {
        name:"SubSection",
        data(){
            return{
                activeTab:null,
                SubSectionID:this.$route.params.subSection,
                SectionID:this.$route.params.Section,
                SubSectionName:"",
                posts:[],
                postsCount:0,
                starPostsCount:0,

            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.SubSectionName = "hahaahahaha";
                this.posts=[{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"false",
                },{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"true",
                },{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"false",
                },{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"false",
                },{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"true",
                },{
                    id:"p123213",
                    name:"safsadf",
                    author:"asdf",
                    stared:"false",
                }];
                this.postsCount = 6;
                this.starPostsCount = 2;
            }
        }
    }
</script>

<style name="stylus">
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