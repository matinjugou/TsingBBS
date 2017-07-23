<template>
    <main>
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
                    <template v-for="part in BBSSections">
                        <transition name = "fade">
                            <v-flex xs12 sm6 md6 lg4>
                                <v-card light class = "BBSSection">
                                    <!--TODO:添加一个v-card-media,为板块增加图片-->
                                    <v-card-title><router-link v-bind:to="part.linker">{{part.name}}</router-link></v-card-title>
                                    <v-list>
                                        <template v-for="subpart in part.bestArtical"
                                        >
                                            <v-divider insert></v-divider>
                                            <v-list-tile class="postListTile">
                                                <v-list-tile-content class="postListTileContent">
                                                    {{subpart.name}}
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </transition>
                    </template>
                </v-layout>
            </v-container>
        </template>
    </main>
</template>

<script>
    export default {
        name:"Main",
        data(){
            return{
                BBSSections:[],
                loading:false,
            }
        },
        created(){
            this.fetchData()
        },
        watch:{
            '$route':'fetchData'
        },
        methods:{
            fetchData(){
                this.loading = true;
                this.BBSSections = [{
                    name:"全部版面",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts"
                },{
                    name:"十大热点",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts"
                },{
                    name:"你猜猜看",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts"
                },{
                    name:"我就不猜",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts"
                },];
                this.loading = false;
            }
        }
    }
</script>