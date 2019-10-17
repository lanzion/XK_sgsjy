<template>
	<div id="compete_works_list" class="works-wrap">
		<!-- 榜单 -->
		<div class="list bgw pd15">
			<list-head :title="'榜单'" :subTitle="'List'"></list-head>
            <!-- 线上赛事榜单 -->
			<div class="list-wrap clearfix" v-if="$route.query.type == '1'">
				<!-- 浏览排行 -->
				<div class="list-box fl">
					<div class="list-item clearfix mt0">
						<div class="fl title">浏览排行</div>
						<div class="fr num">浏览数</div>
					</div>
					<ul class="" v-if="browseList.length">
						<li class="list-item clearfix" v-for="(item,index) in browseList">
							<div class="title ellipsis fl">
								<span class="sort" v-bind:class="{'bg-r': index === 0, 'bg-o': index === 1, 'bg-y': index === 2 }">{{index+1}}</span>
								<router-link :to="{ path: '/worksDetail/compete', query: { type: $route.query.type, id: $route.query.id, worksId: item.id } }">{{item.name}}</router-link>
							</div>
							<div class="fr num c-blue">{{item.browseNum || 0}}</div>
						</li>
					</ul>
					<div v-else class="empty-block">暂无数据</div>
				</div>
				<!-- 点赞排行 -->
				<div class="list-box fl">
					<div class="list-item clearfix mt0">
						<div class="fl title">点赞排行</div>
						<div class="fr num">点赞数</div>
					</div>
					<ul class="" v-if="praiseList.length">
						<li class="list-item clearfix" v-for="(item,index) in praiseList">
							<div class="title ellipsis fl">
								<span class="sort" v-bind:class="{'bg-r': index === 0, 'bg-o': index === 1, 'bg-y': index === 2 }">{{index+1}}</span>
								<router-link :to="{ path: '/worksDetail/compete', query: { type: $route.query.type, id: $route.query.id, worksId: item.id } }">{{item.name}}</router-link>
							</div>
							<div class="fr num c-blue">{{item.praiseNum || 0}}</div>
						</li>
					</ul>
					<div v-else class="empty-block">暂无数据</div>
				</div>
				<!-- 评分排行 -->
				<div class="list-box fl">
					<div class="list-item clearfix mt0">
						<div class="fl title">评分排行</div>
						<div class="fr num">评分</div>
					</div>
					<ul class="" v-if="scoreList.length">
						<li class="list-item clearfix" v-for="(item,index) in scoreList">
							<div class="title ellipsis fl">
								<span class="sort" v-bind:class="{'bg-r': index === 0, 'bg-o': index === 1, 'bg-y': index === 2 }">{{index+1}}</span>
								<router-link :to="{ path: '/worksDetail/compete', query: {type: $route.query.type, id: $route.query.id, worksId: item.id } }">{{item.name}}</router-link>
							</div>
							<div class="fr num c-blue">{{item.score}}</div>
						</li>
					</ul>
					<div v-else class="empty-block">暂无数据</div>
				</div>
			</div>
            <!-- 线下赛事榜单 -->
            <div class="offline-list-wrap clearfix" v-else>
                <!-- 浏览排行 -->
                <div class="list-box fl">
                    <div class="list-item clearfix mt0">
                        <div class="fl title">浏览排行</div>
                        <div class="fr num">浏览数</div>
                    </div>
                    <ul class="" v-if="offlineBrowse.length">
                        <li class="list-item clearfix" v-for="(item,index) in offlineBrowse">
                            <div class="title ellipsis fl">
                                <span class="sort" v-bind:class="{'bg-r': index === 0, 'bg-o': index === 1, 'bg-y': index === 2 }">{{index+1}}</span>
                                <router-link :to="{ path: '/worksDetail/compete', query: { type: $route.query.type, id: $route.query.id, worksId: item.id } }">{{item.name}}</router-link>
                                <!-- <span>{{item.name}}</span> -->
                            </div>
                            <div class="fr num c-blue">{{item.browseNum || 0}}</div>
                        </li>
                    </ul>
                    <div v-else class="empty-block">暂无数据</div>
                </div>
                <!-- 点赞排行 -->
                <div class="list-box fl">
                    <div class="list-item clearfix mt0">
                        <div class="fl title">点赞排行</div>
                        <div class="fr num">点赞数</div>
                    </div>
                    <ul class="" v-if="offlinePraise.length">
                        <li class="list-item clearfix" v-for="(item,index) in offlinePraise">
                            <div class="title ellipsis fl">
                                <span class="sort" v-bind:class="{'bg-r': index === 0, 'bg-o': index === 1, 'bg-y': index === 2 }">{{index+1}}</span>
                                <router-link :to="{ path: '/worksDetail/compete', query: { type: $route.query.type, id: $route.query.id, worksId: item.id } }">{{item.name}}</router-link>
                                <!-- <span>{{item.name}}</span> -->
                            </div>
                            <div class="fr num c-blue">{{item.praiseNum || 0}}</div>
                        </li>
                    </ul>
                    <div v-else class="empty-block">暂无数据</div>
                </div>
            </div>
		</div>
		<!-- 全部作品 -->
		<div class="all-works bgw pd15">
			<list-head :title="'全部参赛'" :subTitle="'All works'"></list-head>

			<section class="select-box" v-if="$route.query.type == '1'">
				<v-region @region="changeRegion" :regionParams="Object.values(region)" v-if="detail.matchGrade === '5'"></v-region>
				<dl class="period clearfix" v-if="cityVisible">
					<dt class="s-label fl"><i>地</i>市：</dt>
					<dd class="p-list fl">
						<ul class="clearfix">
							<li class="p-item fl" v-for="(item, index) in cityList" v-bind:class="{'active': region.cityId == item.code}" @click="changeCity(item.code)">{{item.name}}</li>
						</ul>
					</dd>
				</dl>
				<dl class="period clearfix" v-if="areaVisible">
					<dt class="s-label fl"><i>区</i>县：</dt>
					<dd class="p-list fl">
						<ul class="clearfix">
							<li class="p-item fl" v-for="(item, index) in areaList" v-bind:class="{'active': region.areaId == item.code}" @click="changeArea(item.code)">{{item.name}}</li>
						</ul>
					</dd>
				</dl>
				<dl class="school clearfix">
					<dt class="s-label fl"><i>学</i>校：</dt>
					<dd class="school-select fl">
						<el-select v-model="search.schoolId" placeholder="请选择学校" clearable>
						    <el-option
						      v-for="item in schoolList"
						      :key="item.id"
						      :label="item.schoolName"
						      :value="item.id">
						    </el-option>
						</el-select>
					</dd>
				</dl>
				<dl class="period clearfix">
					<dt class="s-label fl">参赛项目：</dt>
					<dd class="p-list fl">
						<ul class="clearfix">
							<li class="p-item fl" v-for="(item, index) in projectList" v-bind:class="{'active': search.projectId == item.id}" @click="changeSelect(item.id, 'projectId')">{{item.name}}</li>
						</ul>
					</dd>
				</dl>
				<dl class="period clearfix">
					<dt class="s-label fl">参赛分组：</dt>
					<dd class="p-list fl">
						<ul class="clearfix">
							<li class="p-item fl" v-for="(item, index) in actorGroupList" v-bind:class="{'active': search.actorGroup == item.id}" @click="changeSelect(item.id, 'actorGroup')">{{item.name}}</li>
						</ul>
					</dd>
				</dl>
				<dl class="period clearfix">
					<dt class="s-label fl">参赛形式：</dt>
					<dd class="p-list fl">
						<ul class="clearfix">
							<li class="p-item fl" v-for="(item, index) in actorWayList" v-bind:class="{'active': search.actorWay == item.id}" @click="changeSelect(item.id, 'actorWay')">{{item.name}}</li>
						</ul>
					</dd>
				</dl>
			</section>

            <section class="select-box" v-else>
                <dl class="period clearfix">
                    <dt class="s-label fl">项目类别：</dt>
                    <dd class="p-list fl">
                        <ul class="clearfix">
                            <li class="p-item fl" v-for="(item, index) in projectType" v-bind:class="{'active': offlineSearch.projectId == item.projectId}" @click="offlineChangeProject(index)">{{item.projectName}}</li>
                        </ul>
                    </dd>
                </dl>
                <dl class="period clearfix">
                    <dt class="s-label fl">申报组别：</dt>
                    <dd class="p-list fl">
                        <ul class="clearfix">
                            <li class="p-item fl" v-for="(item, index) in applyType" v-bind:class="{'active': offlineSearch.declareId == item.declareId}" @click="offlineChangeApply(item.declareId, 'declareId')">{{item.declareName}}</li>
                        </ul>
                    </dd>
                </dl>
            </section>

			<div class="sort-box">
				<sort-bar :sortBarData="sortBarData" :changeSort="changeSort"></sort-bar>
				<div class="search clearfix">
					<p class="total fl">共计<span class="num"> {{pageParam.totalNum}} </span>个作品</p>
					<v-search class="fl" :tips="'请输入作品名称'" @search="getSearch"></v-search>
				</div>
			</div>
			<div class="works-list">
				<v-list :listData="listData" :items.sync="allWorks" class="">
                    <template slot-scope="props">
                        <div class="list-item-img__box img-box">
                            <video ref="video" :src="getFileUrl(props.item.cover, { filetype: 'mp4' })" height="206" width="277" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" v-if="Number($route.query.type) === 2 && props.item.templateType == '114'"></video>
                            <div v-else class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                            <span class="praise-num">赞 {{props.item.praiseNum || 0}}</span>
                        </div>
                        <h6 class="list-item-title clearfix">
                            <span class="fl works-name ellipsis">{{props.item.name}}</span>
                            <span class="fr user-name ellipsis" v-if="Number($route.query.type) === 1">{{props.item.userName}}</span>
                            <span class="fr user-name ellipsis" v-else>{{props.item.projectName}}</span>
                        </h6>
                    </template>
                </v-list>
			</div>
			<v-pagination :param="pageParam" @callback="changePage"></v-pagination>
		</div>
	</div>
</template>

<script>
    import head from '@/components/works/list_head.vue'
    import region from '@/components/common/select/region.vue'
    import sortBar from '@/components/common/sortBar.vue'
    import search from '@/components/common/search.vue'
    import list from '@/components/common/list/list.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestSchoolList, requestLimitRegion } from '@/service/common.js'
    import { requestAllWorksList, requestScoreList, requestOfflineWorks } from '@/service/works.js'
    import { requestMatchProjectList } from '@/service/manage.js'
    import { requestProjectRelation, requestDeclareRelation } from '@/service/matchEntrance.js'
    import { mapState } from 'vuex'

    export default {
        name: 'compete_works_list',
        components: {
            'list-head': head,
            'v-region': region,
            'sort-bar': sortBar,
            'v-search': search,
            'v-list': list,
            'v-pagination': pagination
        },
        data() {
            return {
                matchId: this.$route.query.id, // 赛事id
                browseList: [], // 线上-浏览数排行
                praiseList: [], // 线上-点赞数排行
                scoreList: [], // 线上-评分排行

                offlineBrowse: [], // 线下-浏览排行
                offlinePraise: [], // 线下-点赞排行

                schoolList: [], // 学校数据
                region: {
                    provinceId: '',
                    cityId: '',
                    areaId: ''
                },
                sortBarData: [
                    { name: '全部', model: 'composite', default: true },
                    { name: '浏览数', model: 'browseNum' },
                    { name: '点赞数', model: 'praiseNum' },
                    { name: '评分', model: 'score' }
                ],
                pageParam: {
                    totalNum: 0,
                    pageSize: 16,
                    pageNum: 1
                },
                listData: {
                    col: 4,
                    pathUrl: '/worksDetail/compete',
                    paramsArr: [
                        { name: 'worksId', val: 'id' },
                        { name: 'id', val: 'route', key: 'id' } // val为route 时，从路由获取参数，要传key（获取路由参数的字段）
                    ]
                },
                allWorks: [],
                search: { // 列表查询条件
                    actorGroup: '', // 赛事分组
                    schoolId: '', // 学校
                    actorWay: '', // 参赛形式
                    projectId: '', // 参赛项目
                    phaseId: '' // 赛事阶段
                },
                offlineSearch: {
                    templateType: '',
                    projectId: '',
                    declareId: ''
                },
                keyWords: '',
                projectList: [], // 参赛项目数据
                actorGroupList: [ // 参赛分组数据
                    { name: '全部', id: '' },
                    { name: '小学组', id: 'primarySchool' },
                    { name: '初中组', id: 'middleSchool' },
                    { name: '高中组', id: 'highSchool' }
                ],
                actorWayList: [ // 参赛形式数据
                    { id: '', name: '全部' },
                    { id: '1', name: '个人' },
                    { id: '2', name: '团体' }
                ],
                listPageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
                cityList: [],
                areaList: [],
                cityVisible: false,
                areaVisible: false,
                projectType: [],
                applyType: [],
            }
        },
        created() {
            if (Number(this.$route.query.type) === 2) {
                this.sortBarData = [
                    { name: '全部', model: 'composite', default: true },
                    { name: '浏览数', model: 'browseNum' },
                    { name: '点赞数', model: 'praiseNum' }
                ]
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
        mounted() {
            if (Number(this.$route.query.type) === 1) {
                this.getBrowseList()
                this.getPraiseList()
                this.getScoreList()
                this.getProjectList()
                this.getAllworksList()
                if (Object.keys(this.detail).length) {
                    this.setArea(this.detail)
                }
            } else {
                this.getOfflineBrowseList()
                this.getOfflinePraiseList()
                this.getProjectRelation()
                this.getDeclareList()
                this.getOfflineAllWorks()
            }
        },
        watch: {
            search: {
                handler: function () {
                    this.getAllworksList()
                },
                deep: true
            },
            offlineSearch: {
                handler: function () {
                    this.getOfflineAllWorks()
                },
                deep: true
            },
            keyWords: {
                handler: function () {
                    if (Number(this.$route.query.type) === 2) {
                        this.getOfflineAllWorks()
                    } else {
                        this.getAllworksList()
                    }
                },
                deep: true
            },
            detail: {
                handler: function (val) {
                    this.setArea(val)
                },
                deep: true
            },
            region: {
                handler: function (val) {
                    this.getSchoolData(val)
                    this.getAllworksList()
                },
                deep: true
            }
        },
        methods: {
            /*
             * 获取省市县接口
             * 参数：{code: region.code}
             */
            getData: function (param) {
                return requestLimitRegion(param).then((response) => {
                    if (response.data.code === 200) {
                        return response.data.appendInfo.list || []
                    }
                })
            },
            // 获取地市/区县数据
            getRegionsList(code, type = '') {
                this.getData({ pcode: code }).then((res) => {
                    if (type === 'city') {
                        this.cityList = res
                        this.cityList.unshift({ name: '全部', code: '' })
                    } else {
                        this.areaList = res
                        this.areaList.unshift({ name: '全部', code: '' })
                    }
                })
            },
            setArea(detail) {
                if (detail.matchGrade === '10') {
                    this.cityVisible = true
                    this.getRegionsList(detail.provinceId, 'city')
                } else if (detail.matchGrade === '6') {
                    this.areaVisible = true
                    this.getRegionsList(detail.cityId)
                } else if (detail.matchGrade === '7') {
                    const _region = {
                        provinceId: Number(this.detail.provinceId),
                        cityId: Number(this.detail.cityId),
                        areaId: Number(this.detail.areaId)
                    }
                    this.getSchoolData(_region)
                }
            },
            changeCity(code) {
                const _region = {
                    provinceId: Number(this.detail.provinceId),
                    cityId: code,
                    areaId: ''
                }
                this.$set(this.$data, 'region', _region)
                if (code === '') {
                    this.areaVisible = false
                    this.areaList = []
                } else {
                    this.getRegionsList(code)
                    this.areaVisible = true
                }
            },
            changeArea(code) {
                const _region = {
                    provinceId: Number(this.detail.provinceId),
                    cityId: this.detail.cityId ? Number(this.detail.cityId) : this.region.cityId,
                    areaId: code
                }
                this.$set(this.$data, 'region', _region)
            },
            changePage(val) {
                this.pageParam.pageNum = val
                if (Number(this.$route.query.type) === 1) {
                    this.getAllworksList()
                } else {
                    this.getOfflineAllWorks()
                }
            },
            changeRegion(selectRegion) {
                if (selectRegion === undefined) {
                    return
                }
                const _region = {
                    provinceId: selectRegion[0],
                    cityId: selectRegion[1],
                    areaId: selectRegion[2]
                }
                this.$set(this.$data, 'region', _region)
            },
            // 获取学校数据
            getSchoolData(params) {
                requestSchoolList(params).then((res) => {
                    this.schoolList = res.data.appendInfo.comboxList
                })
            },
            // 获取参赛项目数据
            getProjectList() {
                requestMatchProjectList({ id: this.matchId }).then((res) => {
                    if (res.data.code === 200) {
                        this.projectList = res.data.entity
                        this.projectList.unshift({ name: '全部', id: '' })
                    }
                })
            },
            // 改变筛选条件
            changeSelect(id, key) {
                this.search[key] = id
            },
            offlineChangeApply(id, key) {
                this.offlineSearch[key] = id
            },
            offlineChangeProject(index) {
                this.offlineSearch.projectId = this.projectType[index].projectId
                this.offlineSearch.templateType = this.projectType[index].formType
            },
            changeSort(desc, index) {
                const sort = desc === 1 ? 0 : 1
                const sortType = {
                    1: 'broweSort',
                    2: 'praiseSort',
                    3: 'scoreSort'
                }
                if (Number(this.$route.query.type) === 1) {
                    this.getAllworksList({ [sortType[index]]: sort, composite: 1 })
                } else {
                    this.getOfflineAllWorks({ [sortType[index]]: sort, composite: 1 })
                }
            },
            getSearch(val) {
                this.keyWords = val
            },
            // 获取浏览数排行
            getBrowseList() {
                requestAllWorksList({ matchId: this.matchId, broweSort: 1, composite: 1 }, this.listPageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.browseList = res.data.entity.resultData
                    }
                })
            },
            getOfflineBrowseList() {
                requestOfflineWorks({ matchId: this.matchId, broweSort: 1, composite: 1 }, this.listPageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.offlineBrowse = res.data.entity.resultData
                    }
                })
            },
            // 获取点赞数排行
            getPraiseList() {
                requestAllWorksList({ matchId: this.matchId, praiseSort: 1, composite: 1 }, this.listPageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.praiseList = res.data.entity.resultData
                    }
                })
            },
            getOfflinePraiseList() {
                requestOfflineWorks({ matchId: this.matchId, praiseSort: 1, composite: 1 }, this.listPageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.offlinePraise = res.data.entity.resultData
                    }
                })
            },
            // 获取评分排行
            getScoreList() {
                requestScoreList({ matchId: this.matchId }, this.listPageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.scoreList = res.data.entity.resultData
                    }
                })
            },
            // 获取全部作品
            getAllworksList(sort = {}) {
                const params = Object.assign({}, { matchId: this.matchId }, this.search, { name: this.keyWords }, this.region, sort)
                requestAllWorksList(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.allWorks = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },

            async getProjectRelation() {
                const res = await requestProjectRelation({ businessId: this.$route.query.id })
                if (res.data.code === 200) {
                    this.projectType = res.data.entity || []
                    this.projectType.unshift({ projectName: '全部', projectId: '', formType: '' })
                }
            },
            async getDeclareList() {
                const res = await requestDeclareRelation({ businessId: this.$route.query.id })
                if (res.data.code === 200) {
                    this.applyType = res.data.entity || []
                    this.applyType.unshift({ declareName: '全部', declareId: '' })
                }
            },
            getOfflineAllWorks(sort = {}) {
                const params = Object.assign({}, { matchId: this.matchId }, this.offlineSearch, { name: this.keyWords }, sort)
                requestOfflineWorks(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.allWorks = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
	.all-works {
		.list-item__box {
			&:hover {
				.works-name {
					color: $theme-color;
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '~@/assets/css/scss/item_list.scss';
	@import '~@/assets/css/scss/works_list.scss';
    @import '~@/assets/css/scss/vars.scss';
	$space: 83px;
	.pd15{
		padding: 15px;
	}
	.c-blue {
		color: $theme-color;
	}
	.bg-r {
		background-color: #d00!important;
	}
	.bg-o {
		background-color: #ff8547!important;
	}
	.bg-y {
		background-color: #ffac38!important;
	}
	.mt0 {
		margin-top: 0px !important;
	}
	.works-wrap {
		margin-bottom: 20px;
		.list {
			margin-bottom: 20px;
			.list-wrap {
				padding: 10px;
                .list-box {
                    font-size: 14px;
                    width: 272px;
                    min-height: 314px;
                    padding-right: $space;
                    margin-right: $space;
                    border-right: 1px solid #dfdfdf;
                    &:last-child {
                        margin: 0;
                        padding: 0;
                        border:none;
                    }
                    .list-item {
                        margin-top: 15px;
                        .title {
                            width: 75%;
                            &:hover {
                                a {
                                    color: $theme-color;
                                }
                            }
                            .sort {
                                display: inline-block;
                                width: 15px;
                                font-size: 12px;
                                height: 15px;
                                line-height: 15px;
                                font-family: unset;
                                background-color: #bfbfbf;
                                color: #fff;
                                text-align: center;
                            }
                        }
                    }
                }
			}
            .offline-list-wrap {
                padding: 10px;
                .list-box {
                    width: 50%;
                    font-size: 14px;
                    padding: 0 50px;
                    box-sizing: border-box;
                    border-right: 1px solid #dfdfdf;
                    &:last-child {
                        margin: 0;
                        border:none;
                    }
                    .list-item {
                        margin-top: 15px;
                        .title {
                            width: 75%;
                            &:hover {
                                a {
                                    color: $theme-color;
                                }
                            }
                            .sort {
                                display: inline-block;
                                width: 15px;
                                font-size: 12px;
                                height: 15px;
                                line-height: 15px;
                                font-family: unset;
                                background-color: #bfbfbf;
                                color: #fff;
                                text-align: center;
                            }
                        }
                    }
                }
            }
		}

		.all-works {
			.select-box {
				margin-bottom: 30px;
				.period,.school {
					font-size: 14px;
				    white-space: nowrap;
				    overflow: hidden;
				    margin-bottom: 6px;
				}
				.s-label {
					width: 5.5em;
	    			font-weight: 600;
	    			line-height: 2em;
	    			i {
	    				margin-right: 28px;
	    			}
				}
				.p-list {
					width: 90%;
				}
				.period {
					width: 100%;
				    line-height: 2;
				    .p-item {
				    	padding: 0px 10px;
				    	margin-right: 8px;
				    	margin-bottom: 8px;
				    	&:hover {
				    		color: $theme-color;
				    	}
				    	&.active {
				    		background-color: $theme-color;
				    		color: #fff;
				    	}
				    }
				}
				.school {
					margin-bottom: 14px;
				}
			}
			.sort-box {
				position: relative;
				.search {
					position: absolute;
					top: 3px;
					right: 3px;
					.total {
						margin-right: 10px;
						line-height: 3em;
						.num {
							color: $theme-color;
						}
					}
				}
			}
		}
	}
</style>