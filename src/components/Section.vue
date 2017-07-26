<template>
    <main style="padding-top: 48px">
        <v-container fluid style="padding-left: 4px;padding-right: 4px">
            <v-layout row>
                <v-flex xs12>
                    <v-card flat class="blue-grey lighten-1" style="margin-bottom: 7px">
                        <v-card-text class="white--text">
                            热门版面
                        </v-card-text>
                    </v-card>
                    <template v-for="subsection in hotSubSections">
                        <v-card class="subsection elevation-1">
                            <div class="SectionHeadLine"
                                 :class="subsection.color"
                            >
                            </div>
                            <v-layout row>
                                <v-card-title class="SectionTitle">
                                    <span class="subheading">{{subsection.name}}</span>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-btn icon :to="'/allSections/'+SectionID+'/'+subsection.id">
                                    <v-icon>more</v-icon>
                                </v-btn>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-text v-if="subsection.direction" style="padding-bottom: 0;padding-top: 9px;padding-left: 14px">
                                {{subsection.direction}}
                            </v-card-text>
                        </v-card>
                    </template>
                    <v-card flat class="blue-grey lighten-1" style="margin-bottom: 7px">
                        <v-card-text class="white--text">
                            所有版面
                        </v-card-text>
                    </v-card>
                    <template v-for="subtype in allSubSections" >
                        <v-card flat
                                class="blue-grey lighten-3 body-1"
                        >
                            <v-card-text height="10px" style="padding-top: 0;padding-bottom: 0">
                                {{subtype.type}}
                            </v-card-text>
                        </v-card>
                        <v-list dense style="margin-bottom: 15px">
                            <template v-for="subsection in subtype.subSections">
                                <v-list-tile :to="'/allSections/'+SectionID+'/'+subsection.id">
                                    {{subsection.name}}
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>
                    </template>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:"Section",
        data(){
            return{
                SectionID:"",
                hotSubSections:[],
                allSubSections:[]
            }
        },
        created(){
            this.fetchData();
            this.SectionID = this.$route.params.Section;
        },
        methods:{
            fetchData(){
                this.hotSubSections=[{
                    id:"m12331",
                    name:"SubSection1",
                    direction:"bablab",
                    color:"blue lighten-1",
                },{
                    id:"m12312",
                    name:"SubSection2",
                    direction:"bablab",
                    color:"yellow lighten-1"
                },{
                    id:"m12321",
                    name:"SubSection3",
                    direction:"bablab",
                    color:"light-green darken-3"
                }];
                this.allSubSections=[{
                    type:"sadfs",
                    subSections:[{
                        id:"m12331",
                        name:"SubSection1",
                    },{
                        id:"m12312",
                        name:"SubSection2",
                    },{
                        id:"m12321",
                        name:"SubSection3"
                    }]
                },{
                    type:"sadfs2",
                    subSections:[{
                        id:"m12331",
                        name:"SubSection1",
                    },{
                        id:"m12312",
                        name:"SubSection2",
                    },{
                        id:"m12321",
                        name:"SubSection3"
                    }]
                },{
                    type:"sadfs3",
                    subSections:[{
                        id:"m12331",
                        name:"SubSection1",
                    },{
                        id:"m12312",
                        name:"SubSection2",
                    },{
                        id:"m12321",
                        name:"SubSection3"
                    }]
                }];
            }
        }
    }
</script>

<style lang="stylus">
    .subsection{
        margin-bottom :14px;
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
