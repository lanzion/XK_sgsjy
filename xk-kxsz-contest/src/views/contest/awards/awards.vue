<template>
	<div class="awards-wrap bgw">
        <div class="" v-if="Object.keys(awardsList).length">
            <div class="first-award works-list" v-for="(item, key, index) in awardsList" :key="key">
                <div v-if="key == '一等奖'">
                    <list-head :title="key"></list-head>
                    <div class="more-box" v-if="item.length">
                        <router-link :to="{ path: 'awards/more', query:{ id: $route.query.id, type: $route.query.type, awardsId: item[0].awardsId, name: key } }">更多></router-link>
                    </div>
                    <v-list :listData="listData" :items.sync="item" class="">
                        <template slot-scope="props">
                            <div class="list-item-img__box img-box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                                <span class="praise-num">赞 {{props.item.praiseNum || 0}}</span>
                            </div>
                            <h6 class="list-item-title clearfix">
                                <span class="fl works-name ellipsis">{{props.item.name || props.item.opusName}}</span>
                                <span class="fr user-name ellipsis">{{props.item.userName || props.item.authorName}}</span>
                            </h6>
                        </template>
                    </v-list>
                </div>
            </div>
        </div>
        <div class="empty-block" v-else>暂无数据</div>
	</div>
</template>

<script>
    import head from '@/components/works/list_head.vue'
    import list from '@/components/common/list/list.vue'
    import { requestAwardsWorksList, requestAwardsWorksOfflineList } from '@/service/works.js'

    export default {
        name: 'awards',
        components: {
            'list-head': head,
            'v-list': list
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
                awardsList: {},
                test: []
            }
        },
        mounted() {
            // if (Number(this.$route.query.type) === 1) {
            this.getFirstAwards()
            // }
        },
        methods: {
            getFirstAwards() {
                const params = { matchId: this.$route.query.id }
                switch (this.$route.query.type) {
                    case '2':
                        requestAwardsWorksOfflineList(params).then((res) => {
                            if (res.data.code === 200) {
                                const _data = res.data.entity || []
                                const result = {}
                                _data.forEach((x) => {
                                    const _list = x.pagerList.resultData
                                    if (_list.length) {
                                        result[_list[0].awardsName] = _list
                                    }
                                })
                                this.awardsList = result
                                // console.log(this.awardsList)
                            }
                        })
                        break
                    default:
                        requestAwardsWorksList(params).then((res) => {
                            if (res.data.code === 200) {
                                this.awardsList = res.data.entity
                                // console.log(this.awardsList)
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
    @import '~@/assets/css/scss/vars.scss';
	.awards-wrap {
		padding: 20px 15px;
		margin-bottom: 40px;
		.works-list {
			.more-box {
				text-align: right;
				a:hover {
					color: $theme-color;
				}
			}
		}
	}
</style>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
	.awards-wrap {
		.list-head {
			margin-bottom: 10px !important;
		}
		.list-item__box {
			&:hover {
				.works-name {
					color: $theme-color;
				}
			}
		}
	}
</style>
