<template>
    <v-card flat>
        <v-card flat v-if="isLogin">
            <v-card-media v-if="isLogin" src="/src/img/me.jpg" height="200px">
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
                    <v-list-tile-content>
                        <v-list-tile-title>我的创作</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider insert></v-divider>
                <v-list-tile ripple @click.native="routing('AllReplies')">
                    <v-list-tile-action>
                        <v-icon>speaker_notes</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>回复我的</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider insert></v-divider>
                <v-list-tile ripple @click.native="routing('MyCollections')">
                    <v-list-tile-action>
                        <v-icon>start</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>我的收藏</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list v-if="UserType === 'Admin'">
                <v-list-tile ripple>
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>用户管理</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile ripple>
                    <v-list-tile-action>
                        <v-icon>view_quilt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>帖子管理</v-list-tile-title>
                    </v-list-tile-content>
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
                        <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Name" required v-model="LoginName"></v-text-field>
                        <v-text-field label="Password" type="password" required v-model="LoginPass"></v-text-field>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text darken-1" flat @click.native="logindialog = false">Close</v-btn>
                        <v-btn class="blue--text darken-1" flat @click.native="confirmLogin">Login</v-btn>
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
                logindialog:"",
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
                if (this.LoginName === "matinjugou" && this.LoginPass === "123456")
                {   this.logindialog = false;
                    this.UserName = this.LoginName;
                    this.UserSchool = "School of Software";
                    this.UserType = "Admin";
                    this.UserID = "10000";
                    this.isLogin = true;
                    localStorage.setItem("isLogin", "true");
                    localStorage.setItem("UserName", this.LoginName);
                    localStorage.setItem("UserSchool", "School of Software");
                    localStorage.setItem("UserType", 'Admin');
                    localStorage.setItem("UserID", "10000");
                }
                else{
                    this.logindialog = true;
                    this.LoginPass = "";
                }
            },
            routing(path){
                this.$router.push('/user/' + this.UserID + '/' + path);
            }
        }
    }
</script>