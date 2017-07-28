<template>
    <main style="padding-top: 48px">
        <v-alert
                success
                :value="successAlert"
                style="position: fixed;top: 48px;z-index: 100;width: 100%"
                transition="scale-transition"
        >
            收藏成功
        </v-alert>
        <v-alert
                error
                :value="failAlert"
                style="position: fixed;top: 48px;z-index: 100;width: 100%"
                transition="scale-transition"
        >
            收藏失败
        </v-alert>
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
                                    <router-link class="SSectionName subh-eading" :to="'/allSections/'+SectionID+'/'+subsection.id">{{subsection.name}}</router-link>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-actions>
                                    <div class="dropdown">
                                        <v-icon>more_vert</v-icon>
                                        <div class="dropdown-content">
                                            <a @click="collectSubSection(subsection.id)">收藏</a>
                                            <a @click="deleteSubSection(subsection.id)"
                                               v-if="$store.state.UserType==='Admin'">删除</a>
                                        </div>
                                    </div>
                                </v-card-actions>

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
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <router-link class="SSectionName subh-eading" :to="'/allSections/'+SectionID+'/'+subsection.id">{{subsection.name}}</router-link>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <div class="dropdown">
                                            <v-icon>more_vert</v-icon>
                                            <div class="dropdown-content">
                                                <a @click="collectSubSection(subsection.id)">收藏</a>
                                                <a @click="deleteSubSection(subsection.id)"
                                                   v-if="$store.state.UserType==='Admin'">删除</a>
                                            </div>
                                        </div>
                                    </v-list-tile-action>
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
                successAlert:false,
                failAlert:false,
                hotSubSections:[],
                allSubSections:[]
            }
        },
        created(){
            this.SectionID = this.$route.params.Section;
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.$http({
                    method:'POST',
                    url:'http://localhost:23333/loadSectionInfo',
                    body:{
                        section_id:this.SectionID
                    },
                    headers:{
                        "X-Requested-With":"XMLHttpRequest",
                    },
                    emulateJSON:true
                }).then((res)=>{
                    let data = res.data;
                    console.log(data);
                    if (data.code==="M200"){
                        let tmpHotSub=[];
                        let tmpTotSub={};
                        for (let subsection of data.data){
                            if (subsection.hot === 1) {
                                tmpHotSub.push({
                                    id:subsection.subsection_id,
                                    name:subsection.subsection_name,
                                    direction:subsection.subsection_comment,
                                    color:subsection.subsection_color,
                                })
                            }
                            if (tmpTotSub[subsection.subsection_type]== undefined){
                                tmpTotSub[subsection.subsection_type]=[];

                            }
                            tmpTotSub[subsection.subsection_type].push({
                                id:subsection.subsection_id,
                                name:subsection.subsection_name,
                            });
                        }
                        this.hotSubSections=tmpHotSub;
                        this.allSubSections=[];
                        for (let type in tmpTotSub){
                            this.allSubSections.push({
                                type:type,
                                subSections:tmpTotSub[type]
                            })
                        }
                    }
                });
            },
            collectSubSection(SubSectionID) {
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/collectSubSection',
                        body:{
                            user_id:this.$store.state.UserID,
                            section_id:SubSectionID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.successAlert = true;
                        setTimeout(()=>{this.successAlert=false},1500);
                    }
                    else{
                        this.failAlert = true;
                        setTimeout(()=>{this.failAlert=false},1500);
                    }
                });
            },
            deleteSubSection(SubSectionID){
                this.$http(
                    {
                        method:'POST',
                        url:'http://localhost:23333/deleteSubSection',
                        body:{
                            user_id:this.$store.state.UserID,
                            section_id:SubSectionID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.code);
                    if (data.code === "M200") {
                        this.fetchData();
                    }
                    else{
                    }
                });
            }
        }
    }
</script>

<style lang="stylus">
    .subsection{
        margin-bottom :14px;
    }
    a.SSectionName{
        color:black;
        text-decoration:none;
    }
    a.SSectionName:hover{
        text-decoration:underline;
    }
    .SectionHeadLine{
        height:4px;
        widht:100%;
    }
    .SectionTitle{
        padding :10px;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        right:0;
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        z-index:100;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {background-color: #f1f1f1}
    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>
