<template>
	<div id="more_list">
		<el-breadcrumb separator=">">
    		<el-breadcrumb-item :to="{ path: '/contest/awards', query: { id: $route.query.id, type: $route.query.type } }">获奖作品</el-breadcrumb-item>
    		<el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="works-list bgw">
			<v-list :listData="listData" :items.sync="worksItems" class="">
                <template slot-scope="props">
                    <div class="list-item-img__box img-box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        <span class="praise-num">赞 {{props.item.praiseNum || 0}}</span>
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span class="fl works-name ellipsis">{{props.item.name}}</span>
                        <span class="fr user-name ellipsis">{{props.item.userName}}</span>
                    </h6>
                </template>
            </v-list>
            <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
		</div>
	</div>
</template>
<script>
    import list from '@/components/common/list/list.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestScoreList, requestAwardsWorksOfflineList } from '@/service/works.js'

    export default {
        name: 'more_list',
        components: {
            'v-list': list,
            'v-pagination': pagination
        },
        data() {
            return {
                listData: {
                    col: 4,
                    pathUrl: '/worksDetail/awards',
                    paramsArr: [
                        { name: 'worksId', val: 'id' },
                        { name: 'id', val: 'route', key: 'id' } // val为route 时，从路由获取参数，要传key（获取路由参数的字段）
                    ]
                },
                worksItems: [],
                pageParams: {
                    pageSize: 20,
                    pageNum: 1,
                    totalNum: 0
                }
            }
        },
        mounted() {
            this.getAwardsList()
        },
        methods: {
            changePage(val) {
                this.pageParams.pageNum = val
                this.getAwardsList()
            },
            getAwardsList() {
                const params = { matchId: this.$route.query.id, awardsId: this.$route.query.awardsId }
                switch (this.$route.query.type) {
                    case '2':
                        requestAwardsWorksOfflineList(params, this.pageParams).then((res) => {
                            if (res.data.code === 200) {
                                const _data = res.data.entity[0].pagerList || []
                                this.worksItems = _data.resultData || []
                                this.pageParams.totalNum = _data.totalNum || 0
                            }
                        })
                        break
                    default:
                        requestScoreList(params, this.pageParams).then((res) => {
                            if (res.data.code === 200) {
                                const _data = res.data.entity || {}
                                this.worksItems = _data.resultData || []
                                this.pageParams.totalNum = _data.totalNum
                            }
                        })
                        break
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/css/scss/item_list.scss';
	@import '~@/assets/css/scss/works_list.scss';
	#more_list {
		.works-list {
			padding: 0px 15px 10px;
			margin-bottom: 40px;
		}
	}
</style>

<style lang="scss">
	#more_list {
		#list {
			margin-top: 15px;
			.list {
				padding-top: 5px;
			}
		}
	}
</style>
