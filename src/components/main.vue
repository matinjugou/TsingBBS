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
                                <v-card height="150px"
                                        light
                                        class = "BBSSection"
                                        :class="part.color"
                                        @click="routing(part.linker)">
                                        <div class="NameDiv">
                                            <span class="NameCell display-1 white--text">{{part.name}}</span>
                                        </div>
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
                    linker:"/hotposts",
                    color:"grey darken-3"
                },{
                    name:"十大热点",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"orange accent-3"
                },{
                    name:"你猜猜看",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"light-green darken-3"
                },{
                    name:"我就不猜",
                    bestArtical:[{name:"part1", id:1},{name:"part2", id:2}],
                    linker:"/hotposts",
                    color:"blue lighten-1"
                },];
                this.loading = false;
            },
            routing:function(path)
            {
                this.$router.push(path);
            }
        }
    }
</script>

<style lang="stylus">
    .NameDiv{
        height :100%;
        width :100%;
        display :table;
    }
    .NameCell {
        display :table-cell;
        vertical-align:middle;
        text-align :center;
    }
</style>