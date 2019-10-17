<template>
    <div id="admin_plan" class="bgw admin-list-head">
        <div>
            <v-tabs :tabs="[
                    { name: '已审策划', type: 'audited' },
                    { name: '待审策划', type: 'pending' }
                ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="true" :btns="btns" :count="count"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'admin_plan',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                router: {
                    path: '/admin/plan',
                },
                btns: [
                    { url: '/admin/plan/publish', name: '发布策划' }
                ],
                count: {
                    name: '策划'
                },
                search: '',
                totalNum: 0
            }
        },
        methods: {
            searchParam(val) {
                this.search = val
            },
            total(val) {
                this.totalNum = val
            }
        }
    }
</script>

<style lang="scss" scoped>
#admin_plan{
    width: 100%;
}
</style>