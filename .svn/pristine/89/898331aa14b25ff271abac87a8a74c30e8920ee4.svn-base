<template>
	<el-dialog title="评审进度" :visible.sync="rateVisible.show" size="small" class="audit_rate" @close="close">
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="setPhaseSearch"></v-search>
                    <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': phaseDropdown }" @click="phaseDropdown=!phaseDropdown" v-if="showTable === 1" style="border-bottom-width: 2px;"></button>
                    <div class="fr tab">
                        <button type="button" class="tab_btn" :class="{ active: showTable === 1 }" @click="showTable = 1">按作品查看</button>
                        <button type="button" class="tab_btn" :class="{ active: showTable === 2 }" @click="showTable = 2">按专家查看</button>
                    </div>
                <div v-show="phaseDropdown" class="bs-screening_wrap" v-if="showTable === 1">
                    <el-form :inline="true" :model="phaseForm" class="bs-screening_box" label-width="80px" ref="phaseForm">
                        <el-form-item label="分类" prop='projectId'>
                            <el-select v-model="phaseForm.projectId" placeholder="请选择分类" filterable clearable>
                                <el-option v-for="item in detail.projectRelationList" :key="item.id" :label="item.projectName" :value="item.projectId"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="分组" prop='actorGroup'>
                            <el-select v-model="phaseForm.actorGroup" placeholder="请选择分组" filterable clearable>
                                <el-option v-for="item in periodKeyDicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="形式" prop='actorWay'>
                            <el-select v-model="phaseForm.actorWay" placeholder="请选择参赛形式" filterable clearable>
                                <el-option v-for="item in actorWayDicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域" v-if="!ifSchool">
                            <xk-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></xk-region-select>
                        </el-form-item>
                        <el-form-item label="学校" v-if="!ifSchool" prop='schoolId'>
                            <el-select v-model="phaseForm.schoolId" placeholder="请选择学校" filterable clearable>
                                <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="bs-screening-btn">
                        <button type="button" @click="confirmSearch">确定</button> | <button type="button" @click="clearPhaseForm">取消</button>
                    </div>
                </div>
            </section>
            <!-- 评审进度列表 -->
            <!-- 作品查看 -->
            <div v-if="showTable === 1" class="planByWorks">
                <el-table class="data-table back-stage-table" border :data="planByWorksList" style="width: 100%" height="300">
                    <el-table-column prop="worksName" label="作品名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectName" label="分类" width="50"></el-table-column>
                    <!-- <el-table-column prop="actorGroup" label="分组" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.actorGroup | translate(periodKeyDicList, { key: 'id' })}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="actorWay" label="形式" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.actorWay | translate(actorWayDicList, { key: 'id' })}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
                    <el-table-column label="评审进度" width="190">
                        <template slot-scope="scope">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt((scope.row.reviewNum/scope.row.expertNum) * 100)" style="margin: 0px 15px;"></el-progress>
                        </template>
                    </el-table-column>
                </el-table>
                <v-pagination :param="planByWorksPageParam" @callback="setPlanByWorksPageParam"></v-pagination>
            </div>
            <!-- 专家查看 -->
            <div v-if="showTable === 2">
                <el-table class="data-table back-stage-table" border :data="planByExpertList" style="width: 100%" height="300">
                    <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userName" label="区域" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="schoolName" label="所在单位"></el-table-column>
                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                    <el-table-column prop="email" label="电子邮箱"></el-table-column>
                    <el-table-column prop="provinceName" label="评审进度" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt((scope.row.reviewNum/scope.row.worksNum) * 100)" style="margin: 0px 15px;"></el-progress>
                        </template>
                    </el-table-column>
                </el-table>
                <v-pagination :param="planByExpertPageParam" @callback="setPlanByExpertPageParam"></v-pagination>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'  // 分页组件
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { requestSchoolList } from '@/service/common.js'
    import { requestPlanByExpert, requestPlanByWorks } from '@/service/manage.js'

    export default {
        name: 'audit_rate',
        components: {
            'v-pagination': pagination,
            // 'v-region-select': region,
            'v-search': search
        },
        data() {
            return {
                // 显示的表格， 1、作品查看 2、专家查看
                showTable: 1,
                tips: '请输入作品名称',
                // 高级筛选的显示
                phaseDropdown: false,
                // 请求表单参数
                phaseForm: {
                    worksName: '',
                    projectId: '',
                    actorGroup: '',
                    actorWay: '',
                    schoolId: ''
                },
                // 按作品查询
                planByWorksList: [],
                // 按专家查询
                planByExpertList: [],
                // 作品查询分页
                planByWorksPageParam: {
                    pageNum: 1,
                    pageSize: 5,
                    totalNum: 1
                },
                // 专家查询分页
                planByExpertPageParam: {
                    pageNum: 1,
                    pageSize: 10,
                    totalNum: 1
                },
                // 如果是学校， true是，false不是
                ifSchool: this.$ls.get('userIdentity') === 'school',
                // 学校数据
                schoolOptions: [],
                // 区域
                region: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                }
            }
        },
        props: {
            rateVisible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            currentRow: {
                type: Object,
                default() {
                    return {}
                }
            },
            orgId: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapState({
                detail: state => state.matchDetail.detail,
                periodKeyDicList: state => state.dictionaryCommon.periodKeyDicList.dicList,
                actorWayDicList: state => state.dictionaryCommon.actorWayDicList.dicList,
            })
        },
        watch: {
            rateVisible: {
                handler: function (val) {
                    if (val.show) {
                        this.getMatchPhase()
                        this.getMatchPhase('work', this.orgId)
                        // if (this.$ls.get('userIdentity') && this.$ls.get('userIdentity') === 'school') {
                        //     this.getMatchPhase('work')
                        // }
                    }
                },
                deep: true
            },
            // region: {
            //     handler: function () {
            //         // this.getMatchPhase('work')
            //     }
            // },
            showTable: {
                handler: function (val) {
                    this.tips = val === 1 ? '请输入作品名称' : '请输入专家名称'
                },
                deep: true
            }
        },
        methods: {
            changeOrgId(identity) {
                let orgId
                switch (identity) {
                    case '7':
                        orgId = this.region.areaId || this.orgId
                        break
                    case '6':
                        orgId = this.region.cityId || this.orgId
                        break
                    case '9':
                        orgId = this.phaseForm.schoolId || this.orgId
                        break
                    default:
                        orgId = this.orgId
                        break
                }
                return orgId
            },
            // 筛选确定
            confirmSearch() {
                const orgId = this.changeOrgId(this.currentRow.identity)
                this.getMatchPhase('work', orgId)
            },
            // 清除进度请求参数
            clearPhaseForm() {
                this.phaseDropdown = false
                this.$refs.phaseForm.resetFields()
                const orgId = this.changeOrgId(this.currentRow.identity)
                this.getMatchPhase('work', orgId)
            },
            // 设置作品查看翻页
            setPlanByWorksPageParam(val) {
                this.$set(this.planByWorksPageParam, 'pageNum', val)
                const orgId = this.changeOrgId(this.currentRow.identity)
                this.getMatchPhase('work', orgId)
            },
            // 设置专家查看翻页
            setPlanByExpertPageParam(val) {
                this.$set(this.planByExpertPageParam, 'pageNum', val)
                this.getMatchPhase()
            },
            // 设置阶段搜索
            setPhaseSearch(val) {
                this.phaseForm.worksName = val
                if (this.showTable === 1) {
                    const orgId = this.changeOrgId(this.currentRow.identity)
                    this.getMatchPhase('work', orgId)
                } else {
                    this.getMatchPhase()
                }
            },
            // 进度列表
            getMatchPhase(method, orgId) {
                if (Object.keys(this.currentRow).length > 0) {
                    if (method === 'work') {
                        const param = Object.assign({}, this.phaseForm, this.region, { id: this.currentRow.id, orgId: orgId })
                        requestPlanByWorks(param, this.planByWorksPageParam).then((res) => {
                            if (res.data.code === 200) {
                                const _data = res.data.entity || {}
                                this.planByWorksList = _data.resultData || {}
                                this.$set(this.planByWorksPageParam, 'totalNum', _data.totalNum)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        requestPlanByExpert({ id: this.currentRow.id, orgId: this.orgId, userName: this.phaseForm.worksName }, this.planByExpertPageParam).then((res) => {
                            if (res.data.code === 200) {
                                const _data = res.data.entity || {}
                                this.planByExpertList = _data.resultData || {}
                                this.$set(this.planByExpertPageParam, 'totalNum', _data.totalNum)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                }
            },
            // 地区改变
            changeRegion(items) {
                // console.log(items)
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
                this.getSchoolData()
            },
            // 请求学校列表数据
            getSchoolData() {
                if (Object.values(this.region).filter(x => x).length) {
                    requestSchoolList(this.region).then((response) => {
                        if (response.data.code === 200) {
                            this.schoolOptions = response.data.appendInfo.comboxList || []
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                }
            },
            // 关闭弹窗
            close() {
                if (this.orgId) {
                    this.$emit('callback', { flag: false, orgId: '' })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .audit_rate {
        .tab {
            display: flex;
            width: 200px;
            height: 30px;
            border: 1px solid $theme-color;
            box-sizing: border-box;
            .tab_btn {
                width: 50%;
                line-height: 30px;
                padding: 0;
                border: none;
                color: $theme-color;
                &.active {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }
    }
</style>