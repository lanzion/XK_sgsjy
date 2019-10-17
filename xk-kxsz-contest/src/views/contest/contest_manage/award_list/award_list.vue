<template>
	<div class="award_list">
		<h4 class="head-tit">获奖名单</h4>
		<div class="content-box">
			<section class="option-box">
                <button class="export-btn" v-if="items.length > 0" @click="exportList">导出</button>
                <button class="export-btn" v-else @click="exportNoDatas">导出</button>
				<button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
	            <div v-show="screeningDropdown" class="bs-screening_wrap">
	                <el-form :inline="true" :model="search" class="bs-screening_box" label-width="68px">
	                    <el-form-item label="学校" v-if="identity === '7'">
	                        <el-select v-model="area" placeholder="请选择学校" multiple filterable clearable>
                                <el-option v-for="item in options" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                            </el-select>
	                    </el-form-item>
                        <el-form-item label="区域" v-else-if="identity === '6' || identity === '10'">
                            <el-select v-model="area" placeholder="请选择区域" multiple  filterable clearable>
                                <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="参赛分类">
                            <el-select v-model="search.projectId" placeholder="请选择分类" filterable clearable>
                                <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="参赛分组">
                            <el-select v-model="search.actorGroup" placeholder="请选择分组" filterable clearable>
                                <el-option v-for="item in actorGroupDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="参赛形式">
                            <el-select v-model="search.actorWay" placeholder="请选择参赛形式" filterable clearable>
                                <el-option v-for="item in actorWayDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="获奖级别">
                            <el-select v-model="search.winLevel" placeholder="请选择获奖级别" filterable>
                                <el-option v-for="item in awardLevelDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
	                </el-form>
	                <div class="bs-screening-btn">
	                    <button type="button" @click="getAwardsList">确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
	                </div>
	            </div>
			</section>
			<el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
	            <el-table-column prop="score" label="序号" show-overflow-tooltip width="50">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="cityName" label="所在区域" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.cityName}}{{scope.row.areaName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolName" label="所在学校" show-overflow-tooltip></el-table-column>
                <el-table-column prop="worksName" label="作品名称"></el-table-column>
                <el-table-column prop="projectName" label="参赛分类"></el-table-column>
                 <el-table-column prop="authorName" label="作者及团队成员" show-overflow-tooltip width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.authorName}}{{scope.row.teamMembers}}</span>
                    </template>
                </el-table-column>
	            <el-table-column prop="awardsName" label="获奖等级" show-overflow-tooltip></el-table-column>
	            <el-table-column prop="phaseName" label="获奖级别"></el-table-column>
	            <el-table-column prop="actorWay" label="参赛形式" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.actorWay | translate(actorWayDL, {key: 'id'})}}
                    </template>
                </el-table-column>
	            <!-- <el-table-column prop="actorGroup" label="分组" show-overflow-tooltip width="50">
                    <template slot-scope="scope">
                        {{scope.row.actorGroup | translate(actorGroupDL, {key: 'id'})}}
                    </template>
                </el-table-column> -->
	            <el-table-column prop="instructor" label="指导教师" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.instructor || '暂无'}}</span>
                    </template>
                </el-table-column>
	        </el-table>
            <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
		</div>
	</div>
</template>

<script>
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'
    import { projectList } from '@/mixin/projectList.js'
    import { requestSchoolList, requestLimitRegionByIdentity } from '@/service/common.js'
    import { requestAwardsList } from '@/service/manage.js'
    import { mapState } from 'vuex'
    import { exportDatas } from '@/mixin/exportDatas.js'
    import { setWinLevel } from '@/mixin/setWinLevel.js'

    export default {
        name: 'award_list',
        mixins: [projectList, exportDatas, setWinLevel],
        components: {
            'v-search': search,
            'v-pagination': pagination
        },
        data() {
            return {
                tips: '请输入作品名称',
                items: [],
                checkedItems: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    projectId: '',
                    actorGroup: '',
                    actorWay: '',
                    winLevel: ''
                },
                label: '区域',
                area: [], // 学校/区域
                options: [], // 学校或区域数据
                region: {},
                identity: '', // 用户身份
                token: '',
                areaIds: '',
                schoolIds: '',
                cityIds: '',
                areaParams: {},
                awardLevelDL: [], // 获奖级别数据
                pageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                actorGroupDL(state) {
                    const dicList = (state.periodKeyDicList || {}).dicList || []
                    return dicList
                },
                actorWayDL(state) {
                    const dicList = (state.actorWayDicList || {}).dicList || []
                    return dicList
                }
            }),
            ...mapState('matchDetail', {
                detail(state) {
                    const details = state.detail || {}
                    return details
                }
            }),
            params: function () {
                return Object.assign({}, { matchId: this.$route.query.id }, this.search, this.areaParams)
            }
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                if(this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0) this.identity = this.$ls.get('loginInfo').userInfo.identity.split('_')[0]
                else  this.identity = this.$ls.get('loginInfo').userInfo.identity
                this.search.winLevel = this.identity
                this.token = this.$ls.get('loginInfo').token
            }
        },
        mounted() {
            if (this.identity === '7') {
                this.getSchoolList()
                this.label = '学校'
            } else if (this.identity === '6' || this.identity === '10') {
                this.getAreaList()
                this.label = '区域'
            }
            this.getAwardsList()
            if (Object.keys(this.detail).length) {
                this.awardLevelDL = this.setLevel(this.detail, this.identity)
            }
        },
        watch: {
            area: {
                handler: function (val) {
                    const _val = JSON.stringify(val)
                    let _area = {}
                    switch (this.identity) {
                        case '6':
                            this.areaIds = _val
                            _area = { areaIds: val }
                            break
                        case '7':
                            this.schoolIds = _val
                            _area = { schoolIds: val }
                            break
                        case '10':
                            this.cityIds = _val
                            _area = { cityIds: val }
                            break
                        default:
                            break
                    }
                    this.areaParams = _area
                },
                deep: true
            },
            detail: {
                handler: function (val) {
                    if (Object.keys(val).length) {
                        this.awardLevelDL = this.setLevel(val, this.identity)
                    }
                },
                deep: true
            }
        },
        methods: {
            changePage(val) {
                this.pageParam.pageNum = val
                this.getAwardsList()
            },
            resetSearchForm() {
                this.search = Object.assign({}, { projectId: '', actorGroup: '', actorWay: '', winLevel: '' })
                this.area = []
                this.screeningDropdown = false
            },
            // 获取学校数据
            getSchoolList() {
                requestSchoolList({ areaId: this.$ls.get('baseInfo').baseInfo.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.options = res.data.appendInfo.comboxList
                    }
                })
            },
            // 获取市或区县数据
            getAreaList() {
                requestLimitRegionByIdentity({ pcode: this.$ls.get('baseInfo').baseInfo.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.options = res.data.appendInfo.list
                    }
                })
            },
            // 获取获奖名单数据
            getAwardsList() {
                requestAwardsList(this.params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            },
            exportList() {
                // 创建input节点，存放导出参数
                const input1 = $('<input>')
                input1.attr('type', 'hidden')
                input1.attr('name', 'matchId')
                input1.attr('value', this.$route.query.id)

                const input2 = $('<input>')
                input2.attr('type', 'hidden')
                input2.attr('name', 'projectId')
                input2.attr('value', this.search.projectId)

                const input3 = $('<input>')
                input3.attr('type', 'hidden')
                input3.attr('name', 'token')
                input3.attr('value', this.token)

                const input4 = $('<input>')
                input4.attr('type', 'hidden')
                input4.attr('name', 'actorGroup')
                input4.attr('value', this.search.actorGroup)

                const input5 = $('<input>')
                input5.attr('type', 'hidden')
                input5.attr('name', 'actorWay')
                input5.attr('value', this.search.actorWay)

                const input6 = $('<input>')
                input6.attr('type', 'hidden')
                input6.attr('name', 'winLevel')
                input6.attr('value', this.search.winLevel)

                const input7 = $('<input>')
                input7.attr('type', 'hidden')
                input7.attr('name', 'areaIds')
                input7.attr('value', this.areaIds)

                const input8 = $('<input>')
                input8.attr('type', 'hidden')
                input8.attr('name', 'schoolIds')
                input8.attr('value', this.schoolIds)

                const input9 = $('<input>')
                input9.attr('type', 'hidden')
                input9.attr('name', 'cityIds')
                input9.attr('value', this.cityIds)

                const inputs = [input1, input2, input3, input4, input5, input6, input7, input8, input9]
                const url = '/kxsz/maker/matchResult/selectExportList'
                this.exportCommon(url, inputs)
            }
        }
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
    .content-box {
    	padding: 20px 15px 20px;
    	.option-box {
    		margin-bottom: 25px;
    	}
    }
</style>
