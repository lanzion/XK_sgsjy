<template>
	<div class="contest_works">
		<div class="head">
			<v-tabs :tabs="[
		      		{ name: '待审作品', type: 'pending'},
		      		{ name: '审核通过作品', type: 'pass' },
		      		{ name: '审核不通过作品', type: 'noPass' }
			  	]" :router="router" v-if="identity === '9'" :cur_tab="activeName" class="tabs-bar-header"></v-tabs>
			<h4 class="head-tit" v-else>参赛作品</h4>
		</div>
		<div class="view-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
    import tabs from '@/components/common/tabs.vue'

    export default {
        name: 'contest_works',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                router: {
                    path: '/contest/manage/works',
                    query: {}
                },
                identity: '',
                activeName:'pending'
            }
        },
        watch:{
            '$route.meta'(val){
                this.activeName = val.type;
            }
        },
        created() {
            this.router.query = this.$route.query
            this.activeName = this.$route.meta.type
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
	.content-box {
        .el-table {
            .cell {
                padding-left: 2px;
                padding-right: 2px;
                font-size: 12px;
            }
        }
    }
</style>

<style lang="scss">
    .view-container {
        // margin-top: -10px;
    }
</style>
