<template>
    <main>
        <v-card>
            <v-card-title>
                {{id}}
            </v-card-title>
        </v-card>
    </main>
</template>

<script>
    export default {
        name:"SinglePost",
        data(){
            return {
                id:this.$route.params.postid,
            }
        }
    }
</script>