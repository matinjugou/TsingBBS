<template>
  <v-app light>
    <v-navigation-drawer
              temporary
              :mini-variant="miniVariant"
              :clipped="clipped"
              v-model="drawer"
      >
        <User v-on:subcloseNav="closeNav"></User>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="blue darken-1 elevation-1">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <transition name = "fade" mode="out-in">
        <router-view ></router-view>
    </transition>

    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import User from './components/User.vue'
  export default {
    data () {
      return {
        fixed: false,
        title: '清乎',
        clipped: false,
        drawer: true,
        miniVariant: false,
      }
    },
    components:{
        User
    },
    methods:{
        closeNav(){
            this.drawer = false;
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
