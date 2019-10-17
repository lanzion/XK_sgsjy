<template>
	<div class="my_review clearfix">
		<div class="section_l bgw fl">
			<side-tabs :title="'我的评审'" :navItem="navItem" :query="query"></side-tabs>
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
                    { url: '/contest/review/pending', name: '待我评审' },
                    { url: '/contest/review/audited', name: '经我评审' }
                ],
                query: {} // 路由参数
            }
        },
        created() {
            this.query = this.$route.query
        }
    }
</script>

<style lang="scss" scoped>
	.my_review {
		margin-bottom: 40px;
		.section_l {

		}
		.section_r {
			width: 978px;
		}
	}
</style>