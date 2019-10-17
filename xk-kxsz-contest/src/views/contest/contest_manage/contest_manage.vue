<template>
	<div class="contest_manage clearfix">
		<div class="section_l bgw fl">
			<side-tabs :title="'赛事管理'" :navItem="navItem" :query="query"></side-tabs>
		</div>
		<div class="section_r bgw manage_content fr">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
    import sideTabs from '@/components/common/side_tabs.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'contest_manage',
        components: {
            sideTabs
        },
        data() {
            return {
                navItem: [],
                query: this.$route.query, // 路由参数
                userId: '',
                identity: null
            }
        },
        computed: {
            ...mapState('matchDetail', {
                detail(state) {
                    const details = state.detail || {}
                    return details
                }
            })
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.userId = this.$ls.get('loginInfo').userInfo.id
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
            }
        },
        mounted() {
            if (Object.keys(this.detail).length) {
                this.setNav()
                this.changeRoute()
            }
        },
        watch: {
            detail: {
                handler: function () {
                    this.setNav()
                    this.changeRoute()
                },
                deep: true
            },
            '$route.path': {
                handler: function () {
                    this.changeRoute()
                },
                deep: true
            }
        },
        methods: {
            setNav() {
                const type = Number(this.query.type)
                if (type === 1) {
                    if (this.identity === '9') {
                        this.navItem = [
                            { url: '/contest/manage/evaluate', name: '评奖设定' },
                            { url: '/contest/manage/member', name: '参赛人员' },
                            { url: '/contest/manage/works', name: '参赛作品' },
                            { url: '/contest/manage/expert', name: '评审专家' },
                            { url: '/contest/manage/detail', name: '赛程详情' },
                            { url: '/contest/manage/awards', name: '获奖名单' },
                            { url: '/contest/manage/statistics', name: '竞赛统计' }
                        ]
                        return
                    }
                    if (this.identity === '6' || this.identity === '7' || this.identity === '10') {
                        this.navItem = [
                            { url: '/contest/manage/quota', name: '名额分配' },
                            { url: '/contest/manage/evaluate', name: '评奖设定' },
                            { url: '/contest/manage/member', name: '参赛人员' },
                            { url: '/contest/manage/works/pass', name: '参赛作品' },
                            { url: '/contest/manage/expert', name: '评审专家' },
                            { url: '/contest/manage/detail', name: '赛程详情' },
                            { url: '/contest/manage/awards', name: '获奖名单' },
                            { url: '/contest/manage/statistics', name: '竞赛统计' }
                        ]
                        if (this.userId === this.detail.createId) {
                            this.navItem.unshift({ url: '/contest/manage/dynamic', name: '竞赛动态' })
                        }
                        return
                    }
                    this.navItem = [
                        { url: '/contest/manage/quota', name: '名额分配' },
                        { url: '/contest/manage/evaluate', name: '评奖设定' },
                        { url: '/contest/manage/member', name: '参赛人员' },
                        { url: '/contest/manage/works', name: '参赛作品' },
                        { url: '/contest/manage/expert', name: '评审专家' },
                        { url: '/contest/manage/detail', name: '赛程详情' },
                        { url: '/contest/manage/awards', name: '获奖名单' },
                        { url: '/contest/manage/statistics', name: '竞赛统计' }
                    ]
                    if (this.userId === this.detail.createId) {
                        this.navItem.unshift({ url: '/contest/manage/dynamic', name: '竞赛动态' })
                    }
                } else {
                    this.navItem = [
                        { url: '/contest/manage/dynamic', name: '竞赛动态' },
                        { url: '/contest/manage/evaluate', name: '奖项设定' },
                        { url: '/contest/manage/entry', name: '参赛管理' },
                    ]
                    if (this.userId === this.detail.createId) {
                        this.navItem.unshift({ url: '/contest/manage/dynamic', name: '竞赛动态' })
                    }
                }
            },
            changeRoute() {
                const _router = this.$route.path
                if (_router) {
                    const _index = this.navItem.findIndex(x => _router.includes(x.url))
                    // if (_index < 0) {
                    if (_index < -1) {
                        this.$router.replace({ path: this.navItem[0].url, query: this.query })
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/contest_manage.scss';
@import '~@/assets/css/scss/vars.scss';
.head-tit {
    font-size: 16px;
    padding: 15px 15px 10px;
    border-bottom: 1px solid #ddd;
}
.export-btn {
    display: inline-block;
	width: 78px;
    height: 34px;
    line-height: 34px;
    text-align: center;
	font-size: 14px;
	color: #fff;
	background-color: $theme-color;
	vertical-align: top;
	&:hover {
		opacity: 0.75;
	}
}
.contest_manage {
    .el-table {
        .cell {
            padding-left: 3px;
            padding-right: 3px;
            font-size: 12px;
        }
    }
}
.a-btn {
    color: $theme-color;
}
</style>

<style lang="scss" scoped>
	.contest_manage {
		margin-bottom: 40px;
		.section_l {

		}
		.section_r {
			width: 978px;
		}
	}
</style>
