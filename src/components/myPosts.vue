<template>
    <main light style="padding-top:48px">
        <v-tabs dark v-model="activeTab" fixed centered >
            <v-tabs-bar slot="activators" class="cyan" fixed>
                <v-tabs-item :href="'#timeBase'"
                             ripple>
                    按照时间排序
                </v-tabs-item>
                <v-tabs-item :href="'#hotBase'"
                             ripple>
                    按照热度排序
                </v-tabs-item>
                <v-tabs-slider class="yellow"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-content :id="'timeBase'">
                <v-card flat light>
                    <v-card-text>
                        <v-list dense>
                            <template v-for="post in posts">
                                <v-list-tile avatar @click.native="routing(post.id)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{post.title}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{post.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-avatar>
                                        <v-icon>thumb_up</v-icon>
                                        {{post.honors}}
                                        <v-icon>chat</v-icon>
                                        {{post.reply}}
                                    </v-list-tile-avatar>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
            <v-tabs-content :id="'hotBase'">
                <v-card flat light>
                    <v-card-text>
                        <v-list dense>
                            <template v-for="post in posts">
                                <v-list-tile avatar @click.native="routing(post.id)">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{post.title}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{post.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-avatar>
                                        <v-icon>thumb_up</v-icon>
                                        {{post.honors}}
                                        <v-icon>chat</v-icon>
                                        {{post.reply}}
                                    </v-list-tile-avatar>
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
        name:'MyPosts',
        data(){
            return{
                e1:null,
                posts:[],
                activeTab:null,
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
                    text:"balalbasa",
                    honors:10,
                    reply:10,
                },{
                    id:"m121",
                    title:"test2",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test3",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test4",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test5",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test6",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test7",
                    text:"balbala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test8",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test9",
                    text:"balabala",
                    honors:10,
                    reply:10,
                }
                ];
            },
            routing(path){
                this.$router.push('/allPosts/'+path);
            }
        }

    }
</script>