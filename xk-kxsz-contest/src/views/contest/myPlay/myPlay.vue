<template>
    <div class="myPlay clearfix">
        <div class="section_l bgw fl">
            <side-tabs :title="'我的参赛'" :navItem="navItem" :query="query"></side-tabs>
        </div>
        <div class="section_r fr">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import sideTabs from '@/components/common/side_tabs.vue'

    export default {
        name: 'my_review',
        components: {
            sideTabs
        },
        data() {
            return {
                navItem: [
                    { url: '/contest/myPlay/uploadWork', name: '上传作品' },
                    { url: '/contest/myPlay/myWorks', name: '我的作品' }
                ],
                query: {}
            }
        },
        created() {
            this.query = this.$route.query
        }
    }
</script>

<style lang='scss' scoped>
.myPlay {
    margin-bottom: 40px;
    .section_l {

    }
    .section_r {
        width: 978px;
    }
}
</style>