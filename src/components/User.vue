<template>
    <v-card flat>
        <v-card flat v-if="isLogin">
            <v-card-media v-if="isLogin" src="/src/img/me.png" height="200px">
                <v-layout column class="media">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn dark icon class="mr-3">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn dark icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-layout>
            </v-card-media>
            <v-card flat class="UserInfo" v-if="isLogin">
                <v-card-title>
                    <v-icon>account_box</v-icon>
                    <v-spacer></v-spacer>
                    <span>{{UserName}}</span>
                </v-card-title>
                <v-card-title>
                    <v-icon>school</v-icon>
                    <v-spacer></v-spacer>
                    <span>{{UserSchool}}</span>
                </v-card-title>
            </v-card>
            <v-divider insert></v-divider>
            <v-list flat style="padding-top:0">
                <v-list-tile ripple @click.native="routing('myPosts')">
                    <v-list-tile-action>
                        <v-icon>brush</v-icon>
                    </v-list-tile-action>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-list-tile-title>我的创作</v-list-tile-title>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider insert></v-divider>
                <v-list-tile ripple @click.native="routing('AllReplies')">
                    <v-list-tile-action>
                        <v-icon>speaker_notes</v-icon>
                    </v-list-tile-action>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-list-tile-title>回复我的</v-list-tile-title>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider insert></v-divider>
                <v-list-tile ripple @click.native="routing('MyCollections')">
                    <v-list-tile-action>
                        <v-icon>star</v-icon>
                    </v-list-tile-action>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-list-tile-title>我的收藏</v-list-tile-title>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list v-if="UserType === 'Admin'">
                <v-list-tile ripple :to="'/UserManager'">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-list-tile-title>用户管理</v-list-tile-title>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-spacer></v-spacer>
            <v-card-text class="text-xs-center">
                <v-btn error @click.native="logout">LOGOUT</v-btn>
            </v-card-text>
        </v-card>
        <v-card flat class="elevation-0" v-else>
            <v-card-media src="/src/img/beforelogin.png" height="200px">
            </v-card-media>
            <v-card-text class="text-xs-center">
                <v-btn primary @click.native="loginbtn">LOGIN</v-btn>
                <v-btn success @click.native="signupbtn">SIGNUP</v-btn>
            </v-card-text>
            <v-dialog v-model="logindialog" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">用户登录</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="用户名" required v-model="LoginName"></v-text-field>
                        <v-text-field label="密码" type="password" required v-model="LoginPass"></v-text-field>
                        <small>*为必填项</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text darken-1" flat @click.native="confirmLogin">登录</v-btn>
                        <v-btn class="blue--text darken-1" flat @click.native="logindialog = false">取消</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="signupdialog" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">新用户注册</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="姓名" required v-model="newUserName"></v-text-field>
                        <v-text-field label="密码" type="password" required v-model="newUserPass"></v-text-field>
                        <v-text-field label="密码" type="password" required v-model="newUserPassConfirm"></v-text-field>
                        <v-text-field label="学校" required v-model="newUserSchool"></v-text-field>
                        <small>*为必填项</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text darken-1" flat @click.native="confirmSignup" v-bind:disabled="SignUpConfirm">注册</v-btn>
                        <v-btn class="blue--text darken-1" flat @click.native="signupdialog = false">取消</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-card>
</template>

<script>
    export default {
        name:'User',
        data () {
            return {
                UserName:"",
                UserSchool:"",
                logindialog:false,
                signupdialog:false,
                newUserName:"",
                newUserPass:"",
                newUserPassConfirm:"",
                newUserSchool:"",
                LoginName:"",
                LoginPass:"",
                UserType:"",
                UserID:"",
            }
        },
        computed:{
            isLogin:{
                get:function() {
                    return this.$store.state.isLogin;
                },
                set:function(newValue) {
                    this.$store.commit("Login", newValue);
                    this.$store.commit("UserInfoUpdate",{
                        UserName:this.UserName,
                        UserSchool:this.UserSchool,
                        UserType:this.UserType,
                        UserID:this.UserID,
                    });
                }
            },
            SignUpConfirm(){
                return !((this.newUserPass === this.newUserPassConfirm)
                    && (this.newUserName.length > 0)
                    && (this.newUserPass.length > 0)
                    && (this.newUserPassConfirm.length > 0)
                    && (this.newUserSchool.length > 0));
            }
        },
        created(){
          if (localStorage.getItem("isLogin") === "true")
          {
              this.UserName = localStorage.getItem("UserName");
              this.UserSchool = localStorage.getItem("UserSchool");
              this.UserType = localStorage.getItem("UserType");
              this.UserID = localStorage.getItem("UserID");
              this.isLogin = true;
          }
        },
        methods:{
            loginbtn(){
                this.logindialog = true;
                this.$emit("subcloseNav");
            },
            signupbtn(){
                this.signupdialog = true;
                this.$emit("subcloseNav");
            },
            logout(){
                this.UserName = "";
                this.UserSchool = "";
                this.UserType = "";
                this.UserID = "";
                this.isLogin = false;
                localStorage.setItem("isLogin", "false");
                this.$router.push("/");
            },
            confirmLogin(){
                let tmpName=this.LoginName;
                let tmpPass=this.LoginPass;
                Promise.all([this.$http(
                    {
                        method:'POST',
                        url:'/userlogin',
                        body:{
                            name:tmpName,
                            password:tmpPass,
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
                        this.logindialog = false;
                        this.UserName = this.LoginName;
                        this.UserSchool = data.data['user_school'];
                        this.UserType = data.data['user_type'] > 0 ? "Admin" : "Ordinary";
                        this.UserID = data.data['user_id'];
                        this.isLogin = true;
                        localStorage.setItem("isLogin", "true");
                        localStorage.setItem("UserName", this.LoginName);
                        localStorage.setItem("UserSchool", this.UserSchool);
                        localStorage.setItem("UserType", this.UserType);
                        localStorage.setItem("UserID", this.UserID);
                    }
                    else{
                        this.logindialog = true;
                        this.LoginPass = "";
                    }
                })]);
            },
            confirmSignup(){
                let tmpName=this.newUserName;
                let tmpPass=this.newUserPass;
                let tmpSchool=this.newUserSchool;
                Promise.all([this.$http(
                    {
                        method:'POST',
                        url:'/userSignUp',
                        body:{
                            user_name:tmpName,
                            user_password:tmpPass,
                            user_school:tmpSchool
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
                        this.signupdialog = false;
                        this.UserName = this.newUserName;
                        this.UserSchool = this.newUserSchool;
                        this.UserType = 0;
                        this.UserID = data.user_id;
                        this.isLogin = true;
                        localStorage.setItem("isLogin", "true");
                        localStorage.setItem("UserName", this.LoginName);
                        localStorage.setItem("UserSchool", this.UserSchool);
                        localStorage.setItem("UserType", this.UserType);
                        localStorage.setItem("UserID", this.UserID);
                    }
                    else{
                        this.signupdialog = true;
                    }
                })]);
            },
            routing(path){
                this.$router.push('/user/' + this.UserID + '/' + path);
            }
        }
    }
</script>