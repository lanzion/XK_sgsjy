<template>
    <div id="adminContest" class="contest bgw admin-list-head">
        <div>
            <v-tabs v-if="identity === 'teacher'" :tabs="[
                    { name: '我的参赛', type: 'mine'},
                    { name: '待我评审', type: 'review'}
                ]" :cur_tab="cur_tab" :router="router" :is_search="true" :count="count" @cur_tab="setCurTab" @searchVal="searchParam" :total="totalNum"></v-tabs>
            <v-tabs v-if="identity === 'student'" :tabs="[
                    { name: '我的参赛', type: 'mine'}
                ]" :cur_tab="cur_tab" :router="router" :is_search="true" :count="count" @cur_tab="setCurTab" @searchVal="searchParam" :total="totalNum"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'adminContest',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                search: '',
                id: '',
                cur_tab: 0,
                router: {
                    path: '/admin/contest',
                },
                count: { name: '赛事' },
                totalNum: 0,
                identity: ''
            }
        },
        created() {
            if (this.$ls.get('userIdentity')) {
                this.identity = this.$ls.get('userIdentity')
            }
        },
        methods: {
            setCurTab: function () {
            },
            searchParam(val) {
                this.search = val
            },
            total(val) {
                this.totalNum = val
            }
        }
    }
</script>

<style lang='scss' scoped>
    *{
        box-sizing: border-box;
    }
    #adminContest{
        width: 100%;
    }
</style>

<style lang="scss">
    .admin-list-head{
        padding-top: 10px;
        .tabs-bar-header{
            .tabs-right{
                top:-1px;
                right: 18px;
            }
        }
    }
</style>