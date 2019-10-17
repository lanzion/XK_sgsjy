<template>
    <div id="adminResource" class="resource admin-list-head bgw">
        <div>
            <v-tabs :tabs="[
                      { name: '已审资源', type: 'audited'},
                      { name: '待审资源', type: 'pending'}
                ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="true" :btns="btns" :count="count"></v-tabs>
        </div>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'adminResource',
        components: {
            'v-tabs': tabs,
        },
        data() {
            return {
                search: '',
                totalNum: 0,
                router: {
                    path: '/admin/resource',
                },
                btns: [{ url: '/admin/resource/upload', name: '上传资源' }],
                count: { name: '资源' }
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

<style lang='scss' scoped>
    *{
        box-sizing: border-box;
    }
    #adminResource{
        width: 100%;
    }
</style>