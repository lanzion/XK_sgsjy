<template>
    <div class="contest_manage">
        <h4 class="head-tit">赛程详情</h4>
        <!-- 赛程详情列表 -->
        <div class="detailList">
            <el-table
                class="data-table back-stage-table"
                border
                :data="phaseList"
                style="width: 100%"
                ref="multipleTable"
                @row-click="handleSelectionChange"
            >
                <el-table-column prop="name" label="赛程" show-overflow-tooltip></el-table-column>
                <el-table-column prop="startDate" label="评比时间" show-overflow-tooltip>
                    <template
                        slot-scope="scope"
                    >{{scope.row.startDate | dateFormat('yyyy.MM.dd')}} -- {{scope.row.endDate | dateFormat('yyyy.MM.dd')}}</template>
                </el-table-column>
                <el-table-column prop="status" label="评比状态">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status | translate(scheduleOptions) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="操作" width="300">
                    <template slot-scope="scope">
                        <button
                            type="button"
                            v-if="userId!==detail.createId || scope.row.status==='3'"
                            class="btn span"
                            @click.stop
                        >结束评比</button>
                        <button
                            type="button"
                            v-else
                            class="btn"
                            @click="handle='endAppraisal';endOfAppraisal(scope.row)"
                        >结束评比</button> |
                        <!-- <button type="button" v-if="identity===scope.row.identity && scope.row.status!=='3'" class="btn" @click="handle='allocation';allocationPopop = true">评审分配</button> -->
                        <button
                            type="button"
                            v-if="identity===scope.row.identity && scope.row.status!=='3'"
                            class="btn"
                            @click.stop="selectEvalDistribute(scope.row)"
                        >评审分配</button>
                        <button type="button" v-else class="btn span" @click.stop="handle=''">评审分配</button> |
                        <button
                            type="button"
                            class="btn"
                            @click="openRatePop(scope.row.identity)"
                        >评审进度</button> |
                        <button type="button" class="btn" @click="resultsPopop.show = true">评审结果</button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分配作品（手动） -->
            <el-dialog title="分配作品" :visible.sync="manualPopop" size="small" class="handle">
                <div class="content-box">
                    <div class="mb15">
                        <span style="margin-right: 8px;">专家：</span>
                        <el-tag
                            v-for="(i, k) in ExpertList"
                            @click.native="selectExpert(i, k)"
                            :class="{ active: activeNum === k }"
                            :key="k"
                        >{{ i.userName }}</el-tag>
                    </div>
                    <el-form :inline="true" :model="manualForm" ref="manualForm">
                        <el-form-item label="分类：" prop="projectId">
                            <el-select
                                v-model="manualForm.projectId"
                                placeholder="请选择分类"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="(item, k) in detail.projectRelationList"
                                    :key="k"
                                    :label="item.projectName"
                                    :value="item.projectId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="分组：" prop='actorGroup'>
                            <el-select v-model="manualForm.actorGroup" placeholder="请选择分组" filterable clearable>
                                <el-option v-for="item in periodKeyDicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="形式：" prop="actorWay">
                            <el-select
                                v-model="manualForm.actorWay"
                                placeholder="请选择形式"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="item in actorWayDicList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域：" v-if="!ifSchool">
                            <xk-region-select
                                @region="changeRegion"
                                ref="region"
                                :isAdmin="true"
                                :clearable="true"
                            ></xk-region-select>
                        </el-form-item>
                        <el-form-item label="学校：" v-if="!ifSchool" prop="schoolId">
                            <el-select
                                v-model="manualForm.schoolId"
                                placeholder="请选择学校"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="item in schoolOptions"
                                    :key="item.id"
                                    :label="item.schoolName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <p class="manual-total">
                        还有
                        <span class="num">{{ manualPageParam.totalNum }}</span> 个待分配作品
                    </p>
                    <!-- 手动分配列表 -->
                    <el-table
                        class="data-table back-stage-table"
                        border
                        :data="manualList"
                        style="width: 100%"
                        ref="multipleTable"
                        @selection-change="changeSelection"
                        height="200"
                    >
                        <el-table-column type="selection" width="40"></el-table-column>
                        <el-table-column prop="worksName" label="作品名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="userName" label="作者" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="uploadDate" label="上传时间" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.uploadDate | dateFormat('yyyy-MM-dd HH:mm') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="projectName" label="分类" show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column prop="actorGroup" label="分组" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.actorGroup | translate(periodKeyDicList, { key: 'id' }) }}</span>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="actorWay" label="形式" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.actorWay | translate(actorWayDicList) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="区域" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.provinceName }}{{ scope.row.cityName }}{{ scope.row.areaName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="auditStatus" label="学校" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.schoolName }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div
                        class="moreData"
                        @click="manualPageParam.pageNum++;getManualList('more')"
                        v-if="manualPageParam.totalNum > manualPageParam.pageNum * manualPageParam.pageSize"
                    >
                        <i class="icon-status-open">更多数据</i>
                    </div>
                    <div class="btn_groups clearfix">
                        <button
                            type="button"
                            class="group_button cancel fr ml15"
                            @click="closeManualForm"
                        >取消</button>
                        <button
                            type="button"
                            class="group_button sure fr"
                            @click="requestManual"
                        >{{requestManualBtnTxt}}</button>
                    </div>
                </div>
            </el-dialog>
            <!-- 分配方式 -->
            <el-dialog
                title="选择分配方式"
                :visible.sync="allocationPopop"
                size="tiny"
                class="allocation"
            >
                <el-row>
                    <el-col :span="6" style="text-align:center;">分配方式:</el-col>
                    <el-col :span="16">
                        <el-radio-group v-model="mode" style="width:100%;">
                            <el-radio :label="1">自动分配</el-radio>
                            <el-radio :label="2">手动分配</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-form
                    :model="autoForm"
                    :rules="autoRules"
                    ref="autoForm"
                    label-width="150px"
                    v-if="mode === 1"
                    class="autoForm"
                >
                    <el-form-item label="单个作品评审次数:" prop="worksReviewNum">
                        <el-input v-model.num="autoForm.worksReviewNum"></el-input>
                    </el-form-item>
                </el-form>
                <div class="pt20 clearfix">
                    <button
                        type="button"
                        class="group_button cancel ml15 fr"
                        @click="closeAllocation"
                    >关闭</button>
                    <button
                        type="button"
                        class="group_button sure fr"
                        @click="selectedAllocation"
                    >确定</button>
                </div>
            </el-dialog>
            <!-- 评审进度 -->
            <area-rate
                :phasePopop.sync="phasePopop"
                :currentRow="currentRow"
                @callback="popCallback"
            ></area-rate>
            <audit-rate
                :rateVisible.sync="rateVisible"
                :currentRow="currentRow"
                :orgId="orgId"
                @callback="popCallback"
            ></audit-rate>
            <!-- 评审结果 -->
            <audit-result :resultsPopop.sync="resultsPopop" :currentRow="currentRow"></audit-result>
        </div>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue' // 分页组件
import {
    requestExpertListByPhase,
    requestPhaseList,
    requestAutoAllocation,
    requestWorksListByPhase,
    requestManualAllocation,
    requestEndEvaluation,
    requestSureSumit
} from '@/service/manage.js'
import { mapState } from 'vuex'
// import region from '@/components/common/select/region_select.vue' // 省市区下拉
import { requestSchoolList } from '@/service/common.js'
import search from '@/components/common/search.vue'
import areaRate from '@/components/manage/schedule_detail/area_rate.vue' // 评审进度弹窗
import auditRate from '@/components/manage/schedule_detail/audit_rate.vue'
import auditResult from '@/components/manage/schedule_detail/audit_result.vue' // 评审结果弹窗

export default {
    components: {
        'v-pagination': pagination,
        // 'v-region-select': region,
        'v-search': search,
        'area-rate': areaRate,
        'audit-rate': auditRate,
        'audit-result': auditResult
    },
    data() {
        return {
            handle: null,
            identity:
                this.$ls.get('loginInfo').userInfo.identity.indexOf('_') > 0
                    ? this.$ls.get('loginInfo').userInfo.identity.split('_')[0]
                    : this.$ls.get('loginInfo').userInfo.identity,
            userId: this.$ls.get('loginUId'),
            // 评审结果弹框开关
            resultsPopop: {
                show: false
            },
            // 评审进度弹框开关
            phasePopop: {
                show: false
            },
            rateVisible: {
                show: false
            },
            // 分配方式方式， 1.自动 2.手动
            // mode: null,
            mode: 2,
            // 审核状态
            scheduleOptions: [
                { id: '1', name: '未开始', code: '1' },
                { id: '2', name: '评比中', code: '2' },
                { id: '3', name: '已结束', code: '3' }
            ],
            allocationPopop: false,
            // 自动表单
            autoForm: {
                worksReviewNum: ''
            },
            autoRules: {
                worksReviewNum: {
                    required: true,
                    message: '请选择活动资源',
                    trigger: 'change'
                }
            },
            // 赛程详情列表
            phaseList: [],
            // 手动分配弹窗
            manualPopop: false,
            // 专家列表
            ExpertList: [],
            // 手动数据参数
            manualForm: {
                projectId: '',
                expertId: '',
                actorGroup: '',
                actorWay: '',
                schoolId: ''
            },
            // 当前行
            currentRow: {},
            // 手动分配列表
            manualList: [],
            manualPageParam: {
                pageNum: 1,
                pageSize: 50,
                totalNum: 0
            },
            projectIdArr: [],
            // 如果是学校， true是，false不是
            ifSchool: this.$ls.get('userIdentity') === 'school',
            // 学校数据
            schoolOptions: [],
            // 区域
            region: {
                provinceId: null,
                cityId: null,
                areaId: null
            },
            // 手动分配列表选中项
            checkedItems: [],
            // 选中专家
            activeNum: 0,
            orgId: '',
            requestManualAllocationLodin: true,
            requestManualBtnTxt: '确定'
        }
    },
    methods: {
        endOfAppraisal(item) {
            this.$confirm(`此操作将结束${item.name}赛程，是否继续？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            })
                .then(() => {
                    requestEndEvaluation({ id: item.id }).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: res.data.msg
                            })
                        } else if (res.data.code === 209) {
                            this.$confirm(res.data.msg, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            })
                                .then(() => {
                                    requestSureSumit({}).then(response => {
                                        if (res.data.code === 200) {
                                            this.$message({
                                                type: 'success',
                                                message: response.data.msg
                                            })
                                        } else {
                                            this.$message({
                                                message: response.data.msg
                                            })
                                        }
                                    })
                                })
                                .catch(() => {})
                        } else {
                            this.$message({
                                message: res.data.msg
                            })
                        }
                    })
                })
                .catch(() => {})
        },
        // 关闭手动列表
        closeManualForm() {
            this.manualPopop = false
            // this.region = {}
            this.$refs.manualForm.resetFields()
        },
        // 选中专家
        selectExpert(i, k) {
            if (this.checkedItems.length) {
                this.$message({
                    message: '您尚未提交，请先提交再切换专家'
                })
            } else {
                this.manualForm.expertId = i.id
                this.activeNum = k
            }
        },
        // 发送手动分配的作品
        requestManual() {
            const param = {
                id: this.currentRow.id
            }
            param.list = [
                {
                    expertId: this.manualParam.expertId
                }
            ]
            param.list[0].worksId = this.checkedItems.map(i => i.id)
            if (!this.requestManualAllocationLodin) return
            this.requestManualAllocationLodin = false
            this.requestManualBtnTxt = '分配中'
            requestManualAllocation(param).then(res => {
                try {
                    if (res.data.code === 200) {
                        this.getManualList()
                        this.$message({
                            type: 'success',
                            message: '分配成功'
                        })
                    } else {
                        this.$message.error(res.data.msg)
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    this.requestManualAllocationLodin = true
                    this.requestManualBtnTxt = '确定'
                }
            })
        },
        // 手动分配列表
        getManualList(str) {
            requestWorksListByPhase(
                Object.assign({}, this.region, this.manualParam),
                this.manualPageParam
            ).then(res => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    if (str === 'more') {
                        this.manualList.push(..._data.resultData)
                    } else {
                        this.manualPageParam.pageNum = 1
                        this.manualList = _data.resultData || []
                    }
                    this.$set(
                        this.manualPageParam,
                        'totalNum',
                        _data.totalNum || 0
                    )
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 评审分配
        selectEvalDistribute(selection) {
            this.handle = 'allocation'
            this.handleSelectionChange(selection)
            this.getExpertList().then(result => {
                if (result) {
                    this.manualPopop = true
                }
            })
        },
        // 获取专家列表
        getExpertList() {
            return requestExpertListByPhase(
                { matchId: this.$route.query.id, phaseId: this.currentRow.id },
                { pageNum: 1, pageSize: 999 }
            ).then(res => {
                let result = false
                if (res.data.code === 200) {
                    const _data = res.data.appendInfo || {}
                    this.ExpertList = _data.list || []
                    this.manualForm.expertId =
                        this.ExpertList[0] && this.ExpertList[0].id
                    result = true
                } else {
                    this.$message.error(res.data.msg)
                }
                return result
            })
        },
        // 选择分配方式
        selectedAllocation() {
            if (this.mode === 1) {
                this.autoForm.id = this.currentRow.id
                console.log(this.currentRow)
                console.log(this.autoForm)
                requestAutoAllocation(this.autoForm).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '分配成功'
                        })
                        this.allocationPopop = false
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.data.msg,
                            duration: 2500
                        })
                    }
                })
            } else if (this.mode === 2) {
                this.allocationPopop = false
                this.getExpertList()
                setTimeout(() => {
                    this.manualPopop = true
                }, 300)
            } else {
                this.allocationPopop = false
            }
            this.mode = null
        },
        // 赛程详情列表
        getPhaseList() {
            requestPhaseList({ matchId: this.$route.query.id }).then(res => {
                if (res.data.code === 200) {
                    this.phaseList = res.data.appendInfo.list
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 关闭自动列表
        closeAllocation() {
            this.allocationPopop = false
            if (this.$refs.autoForm) {
                this.$refs.autoForm.resetFields()
            }
            this.mode = null
        },
        // 点击保存当期行
        handleSelectionChange(selection) {
            this.currentRow = selection
        },
        // 改变选中项 - 手动分配列表
        changeSelection(checked) {
            this.checkedItems = checked
        },
        // 设置手动列表分页
        changeManualPage(val) {
            this.$set(this.manualPageParam, 'pageNum', val)
        },
        // 地区改变
        changeRegion(items) {
            console.log(items)
            const _region = {}
            const [_province, _city, _area] = items
            _region.provinceId = _province
            _region.cityId = _city
            _region.areaId = _area
            this.region = _region
            if (this.identity !== '7') {
                this.getSchoolData()
            }
        },
        // 请求学校列表数据
        getSchoolData() {
            if (Object.values(this.region).filter(x => x).length) {
                // if ((this.region.provinceId != null) || (this.region.cityId != null) || (this.region.areaId != null)) {
                requestSchoolList(this.region).then(response => {
                    if (response.data.code === 200) {
                        this.schoolOptions =
                            response.data.appendInfo.comboxList || []
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            }
        },
        // 按区域查看评审进度弹窗回调
        // flag 默认打开按区域查看弹窗时传true，打开评审进度弹窗时进度传 false
        popCallback(params = { flag: false, orgId: '' }) {
            this.phasePopop.show = !params.flag
            this.rateVisible.show = params.flag
            if (params.orgId) {
                this.orgId = params.orgId
            }
        },
        // 打开评审进度弹窗
        openRatePop(identity) {
            if (this.identity === identity) {
                this.orgId = ''
                this.rateVisible.show = true
            } else {
                this.phasePopop.show = true
            }
        }
    },
    mounted() {
        this.getPhaseList()
    },
    computed: {
        ...mapState({
            detail: state => state.matchDetail.detail,
            periodKeyDicList: state =>
                state.dictionaryCommon.periodKeyDicList.dicList,
            actorWayDicList: state =>
                state.dictionaryCommon.actorWayDicList.dicList
        }),
        manualParam() {
            return Object.assign({}, this.manualForm, {
                id: this.currentRow.id
            })
        }
    },
    watch: {
        manualParam: {
            handler: function(val, oldVal) {
                if (val.id === oldVal.id && this.handle === 'allocation') {
                    this.getManualList()
                }
            },
            deep: true
        }
        // manualPopop: {
        //     handler: function (val) {
        //         if (val) {
        //             this.getManualList()
        //         }
        //     }
        // }
    }
}
</script>


<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.detailList {
    .allocation {
        .el-dialog--tiny {
            width: 450px;
            .el-radio {
                width: 50%;
                margin: 0;
                text-align: center;
            }
        }
    }
    .audit_rate,
    .audit_result,
    .handle {
        .el-dialog {
            width: 750px;
        }
    }
    span.el-tag {
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
        & + .el-tag {
            margin-left: 5px;
        }
        &.active {
            background-color: nth($default-color, 3);
            border-color: nth($default-color, 1);
            color: nth($default-color, 1);
            &::before {
                content: '\2713\0020';
                font-weight: bold;
            }
        }
    }
}
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.pt20 {
    padding-top: 20px;
}
.detailList {
    padding: 20px;
    .btn {
        border: none;
        color: #0594e8;
        font-size: inherit;
        &.span {
            color: #333;
            cursor: default;
        }
    }
    .allocation {
        .el-dialog--tiny {
            width: 300px !important;
        }
        .autoForm {
            margin-top: 20px;
        }
    }
    .btn_groups {
        margin: 15px 0;
    }
    .moreData {
        text-align: center;
        height: 30px;
        line-height: 30px;
        background: #f4f4f4;
        cursor: pointer;
    }
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
    .manual-total {
        line-height: 2;
        text-align: right;
        .num {
            color: #d00;
        }
    }
}
</style>