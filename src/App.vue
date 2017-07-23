<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
    >
      <v-card-media src="/src/img/me.jpg" height="200px">
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
    <v-toolbar dark fixed class = "blue darken-1">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: '清乎',
        transitionName:"slide-right",
      }
    },
    watch:{
        '$route'(to,from){
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
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
