<template>
    <main>
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
                                            <router-link class="SectionName subheading" :to="'/allSections/' + section.id">{{section.name}}</router-link>
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-card-actions>
                                            <div class="dropdown">
                                                <v-icon>more_vert</v-icon>
                                                <div class="dropdown-content">
                                                    <a @click="collectSection(section.id)">收藏</a>
                                                    <a @click="deleteSection(section.id)"
                                                       v-if="$store.state.UserType==='Admin'">删除</a>
                                                </div>
                                            </div>
                                        </v-card-actions>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-card-text v-if="section.direction" style="padding-bottom: 0;padding-top: 9px;padding-left: 14px">
                                        {{section.direction}}
                                    </v-card-text>
                                    <v-card-text v-if="section.bestSubSections" class="SectionText">
                                        <!--ul class="SectionList" style="padding-left: 0"-->
                                            <span v-for="subSection in section.bestSubSections">
                                                <router-link class="SectionList" :to="'/allSections/'+section.id + '/' + subSection.id">[{{subSection.name}}]</router-link>
                                            </span>
                                        <!--/ul-->
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                    </template>
                    <v-flex v-if="$store.state.UserType==='Admin'" xs12 sm6 md6 lg4>
                        <v-card height="200px"
                                light
                                class="BBSSection"
                                @click="addNewSectionDialog=true"
                        >
                            <div class="NameDiv grey lighten-4">
                                <span class="NameCell display-1 grey--text">新增板块</span>
                            </div>
                        </v-card>
                        <v-dialog v-model="addNewSectionDialog" persistent>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">添加版块</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="版块名称" required v-model="newSectionName"></v-text-field>
                                    <v-text-field label="版块描述" multi-line required v-model="newSectionDirection"></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="blue--text darken-1" flat @click.native="addNewSection">添加</v-btn>
                                    <v-btn class="blue--text darken-1" flat @click.native="addNewSectionDialog = false">取消</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
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
                addNewSectionDialog:false,
                successAlert:false,
                failAlert:false,
                newSectionName:"",
                newSectionDirection:"",
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
                this.Sections=[];
                this.$http.get('/loadAllSections')
                    .then(function(res){
                    let data = res.data;
                    console.log(data.data);
                    if (data.code === "M200") {
                        for (let Section of data.data){
                            let tmpbestSubSections = [];
                            this.$http({
                                method:'POST',
                                url:'/loadSectionInfo',
                                body:{
                                    section_id:Section.section_id,
                                },
                                headers:{
                                    "X-Requested-With":"XMLHttpRequest",
                                },
                                emulateJSON:true
                            }).then((res2)=>{
                                let data2=res2.data;
                                if (data2.code === "M200") {
                                    for (let index = 0; index < data2.data.length; index++) {
                                        if (index < 10) {
                                            tmpbestSubSections.push({
                                                id:data2.data[index].subsection_id,
                                                name:data2.data[index].subsection_name
                                            })
                                        }
                                        else{
                                            break;
                                        }
                                    }
                                }
                            });
                            this.Sections.push({
                                id:Section.section_id,
                                name:Section.section_name,
                                direction:Section.section_comment,
                                bestSubSections:tmpbestSubSections,
                                color:Section.section_color,
                            })
                        }
                    }
                });
                this.loading = false;
            },
            addNewSection(){
                this.$http(
                    {
                        method:'POST',
                        url:'/addSection',
                        body:{
                            section_comment:this.newSectionDirection,
                            section_name:this.newSectionName,
                            section_color:"red",
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
                        this.Sections.push({
                            id:data.section_id,
                            name:this.newSectionName,
                            direction:this.newSectionDirection,
                            bestSubSections:[],
                            color:"red",
                        });
                        this.newSectionName="";
                        this.newSectionDirection="";
                        this.addNewSectionDialog=false;
                    }
                    this.fetchData();
                });
            },
            collectSection(SectionID) {
                this.$http(
                    {
                        method:'POST',
                        url:'/collectSection',
                        body:{
                            user_id:this.$store.state.UserID,
                            section_id:SectionID
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
            deleteSection(SectionID){
                this.$http(
                    {
                        method:'POST',
                        url:'/deleteSection',
                        body:{
                            user_id:this.$store.state.UserID,
                            section_id:SectionID
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
                });
            }
        }
    }
</script>

<style lang="stylus">
    a.SectionName{
        color:black;
        text-decoration:none;
    }
    a.SectionName:hover{
        text-decoration:underline;
    }
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
        color:#ff5765;
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
    .NameDiv{
        height :100%;
        width :100%;
        display :table;
    }
    .NameCell {
        display :table-cell;
        vertical-align:middle;
        text-align :center;
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
