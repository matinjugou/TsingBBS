<template>
    <main style="padding-top: 48px">
        <v-container fluid style="padding-left: 2px;padding-right: 2px">
            <v-flex xs12>
                <v-card v-if="failSearch === false" class="elevation-1">
                    <div class="HeadLine" style="height:5px;width:100%;background-color: #a200ff">
                    </div>
                    <v-card-title>
                        <v-card-text class="display-1" v-text="userName"></v-card-text>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card class="elevation-0">
                        <v-card-title class="subheading">
                            <b>基本信息</b>
                        </v-card-title>
                        <v-card-text class="body-1">
                            <strong>院系：</strong>{{userSchool}}
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card class="elevation-0">
                        <v-card-title class="subheading">
                            <b>用户类型</b>
                        </v-card-title>
                        <v-card-text class="body-1">
                            {{userType}}
                        </v-card-text>
                    </v-card>
                </v-card>
                <v-card v-else>
                    <div class="HeadLine" style="height:5px;width:100%;background-color: #a200ff">
                    </div>
                    <v-card-title>
                        <v-card-text class="display-1">未找到相关用户</v-card-text>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:"UserInfo",
        data() {
            return{
                userID:this.$route.params.userID,
                userName:"",
                userSchool:"",
                userType:"",
                failSearch:false,
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.$http(
                    {
                        method:'POST',
                        url:'/userinfo',
                        body:{
                            user_id:this.userID
                        },
                        headers:{
                            "X-Requested-With":"XMLHttpRequest",
                        },
                        emulateJSON:true
                    }
                ).then(function(res){
                    let data = res.data;
                    console.log(data.data);
                    if (data.code === "M200") {
                        this.userName=data.data[0].user_name;
                        this.userSchool=data.data[0].user_school;
                        this.userType=data.data[0].user_type === 1 ? "管理员" : "普通用户";
                    }
                    else{
                        this.failSearch = true;
                    }
                });
            },
        }
    }

</script>

<style name="stylus">

</style>