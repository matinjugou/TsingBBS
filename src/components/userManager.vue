<template>
    <main style="padding-top: 48px">
        <v-container fluid style="padding-left: 2px;padding-right: 2px">
            <div style="height:5px;width:100%;background-color: cadetblue">
            </div>
            <v-flex xs12>
                <v-card class="elevation-1" style="padding-left: 15px;padding-right: 15px; padding-top: 15px;padding-bottom: 20px">
                    <v-layout row>
                        <v-flex xs6 sm4 md4 lg4>
                            <v-text-field
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    v-model="search"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-data-table
                            v-bind:headers="tableheaders"
                            v-bind:search="search"
                            v-bind:items="users"
                            hide-actions
                            class="elevation-1"
                    >
                        <template slot="items" scope="props">
                            <td>{{ props.item.userID }}</td>
                            <td class="text-xs-left">{{ props.item.userName }}</td>
                            <td class="text-xs-left">{{ props.item.userSchool }}</td>
                            <td>
                                <v-edit-dialog
                                        class="text-xs-right"
                                        @open="props.item._userType = props.item.userType"
                                        @cancel="props.item.userType = props.item._userType || props.item.userType"
                                        large
                                        lazy
                                >
                                    <div class="text-xs-right">{{ props.item.userType }}</div>
                                    <div slot="input" class="mt-3 title">修改用户类型</div>
                                    <v-text-field
                                            slot="input"
                                            label="Edit"
                                            v-model="props.item.userType"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </v-edit-dialog>
                            </td>
                            <td class="text-xs-left">{{ props.item.userPost }}</td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-container>
    </main>
</template>

<script>
    export default {
        name:'UserManager',
        data(){
            return {
                search: '',
                users:[],
                tableheaders: [
                    {
                        text: '用户ID',
                        align: 'left',
                        sortable: true,
                        value: 'userID'
                    },
                    {
                        text: '用户名',
                        align: 'left',
                        value: 'userName',
                        sortable: false,
                    },
                    {
                        text: '所在院系',
                        align: 'left',
                        value: 'userSchool',
                        sortable: false,
                    },
                    {
                        text: '用户种类',
                        align: 'left',
                        value: 'userType',
                        sortable: true,
                    },
                    {
                        text: '发帖总数',
                        align: 'left',
                        value: 'userPost',
                        sortable: true,
                    },
                ],
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.$http.get('http://localhost:23333/getAllUser').then(res=>{
                    console.log(res);
                    for (let user of res.data.data){
                        this.users.push({
                            userID:user.user_id,
                            userName:user.user_name,
                            userSchool:user.user_school,
                            userType:user.user_type === 1 ? "Admin" : "Ordinary",
                            userPost:user.num_totalPosts,
                        })
                    }
                });
            }
        }
    }
</script>

<style name="stylus">

</style>