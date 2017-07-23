<template>
    <main>
        <v-container fluid>
            <v-layout row wrap>
                <template v-for="spost in posts">
                    <v-flex xs12 sm6 md6 lg4>
                        <v-card>
                            <v-card-title>
                                <router-link v-bind:to="spost.id">{{spost.title}}</router-link>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </template>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:'HotPosts',
        data(){
            return{
                postCount: 0,
                posts:[{
                    id:"m120",
                    title:"test1",
                },{
                    id:"m121",
                    title:"test2",
                },{
                    id:"m122",
                    title:"test3",
                },],

            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            '$route':'fetchData'
        },
        methods:{
            fetchData(){

            }
        }
    }
</script>