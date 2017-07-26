<template>
    <main style="padding-top: 48px">
        <v-container fluid style="padding-left: 2px;padding-right: 2px">
            <v-flex xs12>
                <v-card class="elevation-1">
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
                            <strong>性别：</strong>{{userGender}}
                        </v-card-text>
                        <v-card-text class="body-1">
                            <strong>院系：</strong>{{userSchool}}
                        </v-card-text>
                        <v-card-text class="body-1">
                            <strong>邮箱：</strong>{{userEmail}}
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card class="elevation-0">
                        <v-card-title class="subheading">
                            <b>自我介绍</b>
                        </v-card-title>
                        <v-card-text class="body-1">
                            {{userIntro}}
                        </v-card-text>
                    </v-card>
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
                userGender:"",
                userEmail:"",
                userIntro:"",
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.userName="matinjugou";
                this.userSchool="软件学院";
                this.userGender="男";
                this.userEmail="thss15_huangc@163.com";
                this.userIntro="我就是我，从绝境中来，到黎明中去";
            },
        }
    }

</script>

<style name="stylus">

</style>