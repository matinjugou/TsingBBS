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
                                <v-list-tile avatar :to="'/allSections/' + post.SectionID + '/' + post.SubSectionID + '/' + post.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{post.title}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{post.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-action>
                                        <v-icon>thumb_up</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        {{post.honors}}
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        <v-icon>chat</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        {{post.reply}}
                                    </v-list-tile-action>
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
                                <v-list-tile avatar :to="'/allSections/' + post.SectionID + '/' + post.SubSectionID + '/' + post.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{post.title}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{post.text}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-action>
                                        <v-icon>thumb_up</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        {{post.honors}}
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        <v-icon>chat</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        {{post.reply}}
                                    </v-list-tile-action>
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
                this.posts=[];
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/userposts',
                        body:{
                            user_id:this.$store.state.UserID,
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data);
                    if (data.code === "M200") {
                        for (let post of data.data) {
                            this.posts.push({
                                id:post.post_id,
                                SectionID:post.fatherSection_id,
                                SubSectionID:post.fatherSubsection_id,
                                title:post.post_title,
                                text:post.content,
                                honors:0,
                                reply:0,
                            })
                        }
                    }
                });
                /*
                this.posts = [{
                    id:"m120",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    title:"test1 asf ",
                    text:"balalbasa",
                    honors:10,
                    reply:10,
                },{
                    id:"m121",
                    title:"test2",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test3",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test4",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test5",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test6",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test7",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balbala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test8",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                },{
                    id:"m122",
                    title:"test9",
                    SectionID:"s123321",
                    SubSectionID:"b12341234",
                    text:"balabala",
                    honors:10,
                    reply:10,
                }
                ];
                */
            },
        }

    }
</script>

<style name="stylus">
    .list__tile__action{
        min-width: 28px;
    }
</style>