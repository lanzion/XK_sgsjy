<template>
	<div id="pending_works" class="content-box">
		<section class="option-box clearfix">
			<v-search class="fl" :tips="tips" @search="getSearch"></v-search>
            <button class="bs-search-button i-form-button fr" @click="openAuditDialog">批量审核</button>
			<button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="分类">
                        <el-select v-model="search.projectId" placeholder="请选择分类" filterable clearable>
                            <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="分组">
                        <el-select v-model="search.actorGroup" placeholder="请选择分组" filterable clearable>
                            <el-option v-for="item in actorGroupDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="形式">
                        <el-select v-model="search.actorWay" placeholder="请选择参赛形式" filterable clearable>
                            <el-option v-for="item in actorWayDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-if="identity != 9">
                        <xk-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></xk-region-select>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组别">
                        <el-select v-model="search.groupDisDetailId" placeholder="请选择组别" filterable clearable>
                            <el-option v-for="item in zbList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学科">
                        <el-select v-model="search.subjectDisDetailId" placeholder="请选择学科" filterable clearable>
                            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click="getWorksList">确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
		</section>
		<!-- 参赛人员列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="作品名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link class="a-btn" :to="{path: '/contest/manage/works/audit', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }">{{scope.row.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="分类"></el-table-column>
            <!-- <el-table-column prop="actorGroup" label="分组">
                <template slot-scope="scope">
                    <span>{{scope.row.actorGroup | translate(actorGroupDL, { key: 'id' })}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="groupDisDetailName" label="组别"></el-table-column>
            <el-table-column prop="subjectDisDetailName" label="学科"></el-table-column>
            <el-table-column prop="actorWay" label="形式">
                <template slot-scope="scope">
                    <span>{{scope.row.actorWay | translate(actorWayDL, { key: 'id' })}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>学校
            <el-table-column prop="auditStatus" label="审核状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{auditType[scope.row.auditStatus]}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="72">
                <template slot-scope="scope">
                    <router-link class="audit-btn" :to="{path: '/contest/manage/works/audit', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }">审核</router-link>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
        <v-audit :visible.sync="visible" @auditSubmit="audit"></v-audit>
	</div>
</template>

<script>
    import search from '@/components/common/search.vue'
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import pagination from '@/components/common/pagination.vue'
    import audit from '@/components/common/dialog/audit.vue'
    import { requestSchoolList, requestDictComb } from '@/service/common.js'
    import { requestManageWorksList, contestWorksBatchAudit } from '@/service/manage.js'
    import { projectList } from '@/mixin/projectList.js'
    import { mapState } from 'vuex'

    export default {
        name: 'pending_works',
        mixins: [projectList],
        components: {
            'v-search': search,
            // 'v-region-select': region,
            'v-pagination': pagination,
            'v-audit': audit
        },
        data() {
            return {
                tips: '请输入作品名称',
                items: [],
                checkedItems: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    name: '', // 作品名称
                    schoolId: '',
                    actorGroup: '', // 分组
                    actorWay: '', // 参赛形式
                    projectId: '',
                    groupDisDetailId: '',
                    subjectDisDetailId: ''
                },
                schoolOptions: [], // 学校数据
                region: {},
                auditType: {
                    0: '待审核',
                    1: '审核通过',
                    2: '审核不通过'
                },
                pageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
                visible: {
                    show: false
                },
                identity: '',
                subjectList: [],
                zbList: [],
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
            })
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
            }
        },
        mounted() {
            this.getWorksList()
            this.dictComb()
        },
        watch: {
            // search: {
            //     handler: function () {
            //         this.getWorksList()
            //     },
            //     deep: true
            // }
        },
        methods: {
            dictComb() {
                requestDictComb({
                    groupCode: 'zb'
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.zbList = res.data.entity.dicList
                    }
                })
                requestDictComb({
                    groupCode: 'subjects'
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.subjectList = res.data.entity.dicList
                    }
                })
            },
            getSearch(val) {
                this.search.name = val
                const param = {
                    matchId: this.$route.query.id,
                    auditStatus: 0
                }
                requestManageWorksList(Object.assign({}, param, this.search, this.region), this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            // 地区改变
            changeRegion(items) {
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
                this.search.schoolId = ''
                this.getSchoolData()
            },
            // 请求学校列表数据
            getSchoolData() {
                if ((this.region.provinceId != null) || (this.region.cityId != null) || (this.region.areaId != null)) {
                    requestSchoolList(this.region).then((response) => {
                        if (response.data.code === 200) {
                            this.schoolOptions = response.data.appendInfo.comboxList || []
                        }
                    })
                }
            },
            // 重置筛选
            resetSearchForm() {
                this.search = Object.assign({}, { schoolId: '', actorGroup: '', actorWay: '', projectId: '' }, { name: this.search.name })
                this.screeningDropdown = false
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getWorksList()
            },
            getWorksList() {
                const param = {
                    matchId: this.$route.query.id,
                    auditStatus: 0
                }
                requestManageWorksList(Object.assign({}, param, this.search, this.region), this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            openAuditDialog() {
                if (this.checkedItems.length) {
                    this.visible.show = true
                } else {
                    this.showMessage('info', '请选择要批量审核的作品')
                }
            },
            // 参赛作品审核
            audit(params) {
                const param = []
                const auditStatus = params.result === '1' ? 1 : 2
                this.checkedItems.forEach((x) => {
                    param.push({
                        id: x.id,
                        auditStatus: auditStatus,
                        auditOpinion: params.explain
                    })
                })
                contestWorksBatchAudit(param).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '审核成功')
                        this.visible.show = false
                        this.getWorksList()
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    #pending_works {
        .el-dialog {
            width: 564px;
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .content-box {
    	padding: 20px 15px 20px;
    	.option-box {
    		margin-bottom: 25px;
    	}
        .audit-btn {
            color: $theme-color;
            &:hover{
                color: $theme-color;
            }
        }
        .a-btn {
            color: $theme-color;
        }
    }
</style>
