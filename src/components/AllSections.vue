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
                    <template v-for="section in Sections">
                        <transition name = "fade">
                            <v-flex xs12 sm6 md6 lg4>
                                <v-card height="200px"
                                        light
                                        class="BBSSection"
                                >
                                    <div class="SectionHeadLine"
                                         :class="section.color"
                                    >
                                    </div>
                                    <v-layout row>
                                        <v-card-title class="SectionTitle">
                                            <span class="subheading">{{section.name}}</span>
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon :to="'/allSections/' + section.id">
                                            <v-icon>more</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-card-text v-if="section.direction" style="padding-bottom: 0;padding-top: 9px;padding-left: 14px">
                                        {{section.direction}}
                                    </v-card-text>
                                    <v-card-text v-if="section.bestSubSections" class="SectionText">
                                        <ul class="SectionList" style="padding-left: 0">
                                            <li v-for="subSection in section.bestSubSections">
                                                <router-link :to="'/allSections/'+section.id + '/' + subSection.id">{{subSection.name}}</router-link>
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
        name:"AllSections",
        data(){
            return {
                SectionsNum:0,
                Sections:[],
                loading:true,
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.Sections=[{
                    id:"m123312",
                    name:"Section1",
                    direction:"SectionDirec",
                    bestSubSections:[{
                        id:"m1232",
                        name:"Section1"},{
                        id:"m12312",
                        name:"Section1"}],
                    color:"grey darken-3",
                },{
                    id:"m123312",
                    name:"Section1",
                    direction:"SectionDirec",
                    bestSubSections:[{
                        id:"m1232",
                        name:"Section1"},{
                        id:"m12312",
                        name:"Section1"}],
                    color:"orange accent-3"
                },{
                    id:"m123312",
                    name:"Section1",
                    direction:"SectionDirec",
                    bestSubSections:[{
                        id:"m1232",
                        name:"Section1"},{
                        id:"m12312",
                        name:"Section1"}],
                    color:"light-green darken-3"
                },{
                    id:"m123312",
                    name:"Section1",
                    direction:"SectionDirec",
                    bestSubSections:[{
                        id:"m1232",
                        name:"Section1"},{
                        id:"m12312",
                        name:"Section1"}],
                    color:"blue lighten-1"
                },{
                    id:"m123312",
                    name:"Section1",
                    direction:"SectionDirec",
                    bestSubSections:[{
                        id:"m1232",
                        name:"Section1"},{
                        id:"m12312",
                        name:"Section1"}],
                    color:"yellow lighten-1"
                }];
                this.loading = false;
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
