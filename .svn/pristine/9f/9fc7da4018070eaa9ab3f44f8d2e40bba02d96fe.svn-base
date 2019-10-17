<template>
	<div class="offline-manage-detail">
		<offline-detail></offline-detail>
		<button class="back-btn" @click="$router.go(-1)">返回</button>
	</div>
</template>

<script>
    import offlineDetail from '@/components/works/offline_worksDetail.vue'

    export default {
        components: {
            'offline-detail': offlineDetail
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
	.offline-manage-detail {
		padding: 20px;
		.back-btn {
			width: 60px;
			height: 32px;
			line-height: 32px;
			margin-top: 20px;
			border-radius: 10px;
			border: none;
			text-align: center;
			color: #fff;
			background-color: $theme-color;
			&:hover {
				opacity: 0.75;
			}
		}
	}
</style>