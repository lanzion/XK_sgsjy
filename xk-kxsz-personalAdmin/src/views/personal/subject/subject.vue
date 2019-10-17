<template>
    <div id="admin_subject" class="admin-list-head bgw">
        <div>
            <v-tabs :tabs="[
                    { name: '在研课题', type: 'audited' },
                    { name: '待审课题', type: 'pending' }
                ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="true" :btns="btns" :count="count"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'admin_subject',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                router: {
                    path: '/admin/subject',
                },
                btns: [
                    { url: '/admin/subject/apply', name: '课题申报' }
                ],
                count: {
                    name: '课题'
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
*{
    box-sizing: border-box;
}
#admin_subject{
    width: 100%;
}
</style>