<template>
	<div class="contest_statistics">
		<div class="head">
            <v-tabs :cur_tab="activeName" :tabs="[
                    { name: '获奖统计', type: 'awards'},
                    { name: '参赛统计', type: 'compete' }
                ]" :router="router" v-if="identity === '9'"></v-tabs>
			<v-tabs :cur_tab="activeName" :tabs="[
		      		{ name: '获奖统计', type: 'awards'},
		      		{ name: '参赛统计', type: 'compete' }
			  	]" :router="router" v-else></v-tabs>
			<!-- <v-tabs :tabs="[
		      		{ name: '获奖统计', type: 'awards'},
		      		{ name: '获奖排名', type: 'ranking' },
		      		{ name: '参赛统计', type: 'compete' }
			  	]" :router="router" v-else></v-tabs> -->
		</div>
		<div class="view-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
    import tabs from '@/components/common/tabs.vue'

    export default {
        name: 'contest_statistics',
        components: {
            'v-tabs': tabs
        },
        data() {
            return {
                identity: '',
                router: {
                    path: '/contest/manage/statistics'
                },
                ifLogin: false,
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
                this.identity = this.$ls.get('loginInfo').userInfo.identity
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss">
	.content-box {
        .el-table {
            .cell {
                padding-left: 0px;
                padding-right: 0px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .view-container {
        padding: 15px;
    }
</style>