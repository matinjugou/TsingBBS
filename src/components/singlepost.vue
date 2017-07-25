<template>
    <main>
        <v-card>
            <v-card-title>
                这是一个ID为{{id}}的帖子，帖子的页面正在施工，所以你只能看到这些23333
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