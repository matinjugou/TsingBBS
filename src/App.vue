<template>
  <v-app light>
    <UserLogin :drawer="mydrawer"></UserLogin>
    <v-toolbar dark fixed class="blue darken-1">
      <v-toolbar-side-icon @click.native.stop="mydrawer = !mydrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <transition name = "fade" mode="out-in">
        <router-view></router-view>
    </transition>

    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import UserLogin from './components/UserLogin.vue'
  export default {
    data () {
      return {
        mydrawer: true,
        fixed: false,
        title: '清乎',
      }
    },
    components:{
        UserLogin
    },
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        }
    },
    watch:{
        mydrawer(){
            console.log("father", this.mydrawer)
        }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .BBSSection{
      margin-bottom:7px;
  }

  .postListTile a{
      height:27px;
  }

  .postListTileContent{
      font-size:smaller;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
