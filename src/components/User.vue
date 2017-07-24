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
                LoginPass:""
            }
        },
        computed:{
            isLogin:{
                get:function() {
                    console.log("try get");
                    return this.$store.state.isLogin;
                },
                set:function(newValue) {
                    this.$store.commit("Login", newValue);
                }
            },
        },
        methods:{
            loginbtn(){
                this.logindialog = true;
            },
            signupbtn(){

            },
            confirmLogin(){
                if (this.LoginName === "matinjugou" && this.LoginPass === "123456")
                {   this.logindialog = false;
                    this.UserName = this.LoginName;
                    this.UserSchool = "School of Software";
                    this.isLogin = true;
                }
                else{
                    this.logindialog = true;
                    this.LoginPass = "";
                }
            }
        }
    }
</script>