<template>
	<div class="content-box">
		<section class="option-box clearfix">
			<v-search class="fl" :tips="tips" @search="getSearch"></v-search>
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
		<!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column prop="name" label="作品名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link class="a-btn" :to="{path: '/contest/manage/works/audit', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }">{{scope.row.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="分类"></el-table-column>
            <!-- <el-table-column prop="actorGroup" label="分组"></el-table-column> -->
            <el-table-column prop="groupDisDetailName" label="组别"></el-table-column>
            <el-table-column prop="subjectDisDetailName" label="学科"></el-table-column>
            <el-table-column prop="actorWay" label="形式"></el-table-column>
            <el-table-column prop="provinceName" label="区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="审核状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{auditType[scope.row.auditStatus]}}
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
	</div>
</template>

<script>
    import search from '@/components/common/search.vue'
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import pagination from '@/components/common/pagination.vue'
    import { requestSchoolList, requestDictComb } from '@/service/common.js'
    import { requestManageWorksList } from '@/service/manage.js'
    import { projectList } from '@/mixin/projectList.js'
    import { mapState } from 'vuex'

    export default {
        name: 'noPass_works',
        mixins: [projectList],
        components: {
            'v-search': search,
            // 'v-region-select': region,
            'v-pagination': pagination
        },
        data() {
            return {
                tips: '请输入作品名称',
                items: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    schoolId: '',
                    name: '', // 作品名称
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
        watch: {
            // search: {
            //     handler: function () {
            //         this.getWorksList()
            //     },
            //     deep: true
            // }
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
                this.getWorksList()
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
            resetSearchForm() {
                // this.search = Object.assign({}, { schoolId: '', actorGroup: '', actorWay: '', projectId: '' }, { name: this.search.name })
                this.screeningDropdown = false
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getWorksList()
            },
            // 获取作品列表
            getWorksList() {
                const param = {
                    matchId: this.$route.query.id,
                    auditStatus: 2
                }
                requestManageWorksList(Object.assign({}, param, this.search, this.region), this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .content-box {
    	padding: 20px 15px 20px;
    	.option-box {
    		margin-bottom: 25px;
    	}
        .a-btn {
            color: $theme-color;
        }
    }
</style>
