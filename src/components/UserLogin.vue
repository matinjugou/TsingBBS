<template>
    <v-navigation-drawer
            temporary
            :mini-variant="miniVariant"
            :clipped="clipped"
    >
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
        <v-card-media v-else src="/src/img/beforelogin.png" height="200px">
        </v-card-media>
        <v-card-title>
            <v-icon>account_box</v-icon>
            <v-spacer></v-spacer>
            <span>UserName</span>
        </v-card-title>
        <v-card-title>
            <v-icon>school</v-icon>
            <v-spacer></v-spacer>
            <span>School</span>
        </v-card-title>
        <v-divider insert></v-divider>
        <v-list>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name:'UserLogin',
        data () {
            return {
                clipped: false,
                fixed: false,
                miniVariant: false,
                transitionName:"slide-right",
            }
        },
        props:['drawer'],
        computed:{
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        watch:{
            drawer(){
                console.log("child", this.drawer);
            }
        }
    }
</script>