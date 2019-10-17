<template>
    <div class="admin-list-head bgw">
        <v-tabs :tabs="[
                    { name: '我关注的', type: 'myFocus' },
                    { name: '关注我的', type: 'toMyFocus' },
                    { name: '我的好友', type: 'myFriend' }
                ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="true" :count="count"></v-tabs>
        <router-view :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
    // import focus_myFocus from 'components/my/focus_myFocus.vue'
    // import focus_myFriend from 'components/my/focus_myFriend.vue'
    // import focus_ToMyFocus from 'components/my/focus_ToMyFocus.vue'
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'admin_subject',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                // tabs: [
                //     { name: '我关注的', type: 'myFocus' },
                //     { name: '关注我的', type: 'toMyFocus' },
                //     { name: '我的好友', type: 'myFriend' }
                // ],
                router: {
                    path: '/admin/focus',
                },
                count: {
                    name: '人'
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

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .sub-nav {
            .sub-nav-item {
                &.is-active {
                    border-bottom: 2px solid $color-value;
                }
            }
        }
    }
}
.sub-nav {
    font-size: 16px;
    margin-bottom: -1px;
    border-bottom: 1px solid #c9c9c9;
    .sub-nav-item {
        display: inline-block;
        line-height: 40px;
        padding: 0 1em;
        margin: 0 -1px -1px;
    }
    .func {
        line-height: 34px;
        font-size: .875em;
        .totalNum {
            margin-right: 10px;
        }
    }
}
</style>
