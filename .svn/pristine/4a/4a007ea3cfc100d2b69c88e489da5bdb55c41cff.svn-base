<template>
    <div id="adminActivity" class="activity bgw admin-list-head">
        <div>
            <v-tabs :tabs="[
                    { name: '已审活动', type: 'audited'},
                    { name: '待审活动', type: 'pending'}
                ]" :cur_tab="cur_tab" :router="router" :is_search="true" :btns="btns" :count="count" @cur_tab="setCurTab" @searchVal="searchParam" :total="totalNum"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'adminActivity',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                search: '',
                id: '',
                cur_tab: 0,
                router: {
                    path: '/admin/activity',
                },
                btns: [{ url: '/admin/activity/publish', name: '发布活动' }],
                count: { name: '活动' },
                totalNum: 0
            }
        },
        created() {
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
    #adminActivity{
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