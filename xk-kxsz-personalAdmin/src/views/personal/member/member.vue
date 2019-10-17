<template>
    <div id="admin_member" class="bgw admin-list-head">
        <div>
            <v-tabs :tabs="[
                    { name: '我的成员', type: 'mine' },
                    { name: '入驻申请', type: 'apply' },
                    { name: '入驻邀请', type: 'invite' }
                ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="isSearch" :count="count"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'admin_member',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                router: {
                    path: '/admin/member',
                },
                isSearch: true,
                count: {
                    name: '成员'
                },
                search: '',
                totalNum: 0
            }
        },
        mounted() {
            this.routeChange()
        },
        watch: {
            $route: 'routeChange'
        },
        methods: {
            routeChange() {
                if (this.$route.path.includes('mine')) {
                    this.isSearch = true
                    this.count = {
                        name: '成员'
                    }
                } else {
                    this.isSearch = false
                    this.count = undefined
                }
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

<style lang="scss" scoped>
#admin_member{
    width: 100%;
}
</style>