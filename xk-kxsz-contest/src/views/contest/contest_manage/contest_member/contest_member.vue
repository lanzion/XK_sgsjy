<template>
    <div class="contest_member">
        <h4 class="head-tit">参赛人员</h4>
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="getSearch"></v-search>
                <button class="bs-search-button i-form-button fr" @click="openBatchDialog">批量审核</button>
                <button
                    class="bs-screening-button bs-handle-button"
                    :class="{'isDropdowm': screeningDropdown }"
                    @click="screeningDropdown=!screeningDropdown"
                ></button>
                <div v-show="screeningDropdown" class="bs-screening_wrap">
                    <el-form :inline="true" :model="search" class="bs-screening_box">
                        <el-form-item label="分类">
                            <el-select
                                v-model="search.projectId"
                                placeholder="请选择分类"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="item in projectOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="分组">
                            <el-select v-model="search.actorGroup" placeholder="请选择分组" filterable clearable>
                                <el-option v-for="item in actorGroupDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="形式">
                            <el-select
                                v-model="search.actorWay"
                                placeholder="请选择参赛形式"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="item in actorWayDL"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域" v-if="['6', '7', '10'].includes(identity)">
                            <xk-region-select
                                @region="changeRegion"
                                ref="region"
                                :isAdmin="true"
                                :clearable="true"
                            ></xk-region-select>
                        </el-form-item>
                        <el-form-item label="学校" v-if="['6', '7', '10'].includes(identity)">
                            <el-select
                                v-model="search.schoolId"
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
                    <div class="bs-screening-btn">
                        <button type="button" @click="screeningDropdown = false">确定</button> |
                        <button type="button" @click="resetSearchForm">取消</button>
                    </div>
                </div>
            </section>
            <!-- 参赛人员列表 -->
            <el-table
                class="data-table back-stage-table"
                border
                :data="items"
                style="width: 100%"
                ref="multipleTable"
                @selection-change="changeSelection"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="userName" label="参赛人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="provinceName" label="所在地区" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolName" label="所在学校"></el-table-column>
                <el-table-column prop="projectName" label="参赛分类"></el-table-column>
                <el-table-column prop="actorWay" label="参赛形式">
                    <template slot-scope="scope">
                        <span>{{scope.row.actorWay | translate(actorWayDL, { key: 'id' })}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="actorGroup" label="参赛分组" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.actorGroup | translate(actorGroupDL, { key: 'id' })}}</span>
                    </template>
                </el-table-column>-->
                <el-table-column prop="slogan" label="参赛宣言" show-overflow-tooltip></el-table-column>
                <el-table-column prop="auditStatus" label="操作">
                    <template slot-scope="scope">
                        <a
                            v-if="scope.row.auditStatus === 0"
                            class="audit-btn"
                            href="javaScript:;"
                            @click="openDialog(scope.row.id, scope.$index)"
                        >审核</a>
                        <span v-else-if="scope.row.auditStatus === 1">审核通过</span>
                        <span v-else>审核不通过</span>
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
            <member-audit :visible.sync="visible" @auditSubmit="audit" :close="resetAuditMethod"></member-audit>
        </div>
    </div>
</template>

<script>
import search from '@/components/common/search.vue'
// import region from '@/components/common/select/region_select.vue' // 省市区下拉
import memberAudit from '@/components/common/dialog/audit.vue'
import pagination from '@/components/common/pagination.vue'
import { requestSchoolList } from '@/service/common.js'
import {
    requestMatchActorList,
    contestMemberBatchAudit
} from '@/service/manage.js'
import { projectList } from '@/mixin/projectList.js'
import { mapState } from 'vuex'

export default {
    name: 'contest_member',
    mixins: [projectList],
    components: {
        'v-search': search,
        // 'v-region-select': region,
        'member-audit': memberAudit,
        'v-pagination': pagination
    },
    data() {
        return {
            identity: '',
            visible: {
                show: false
            },
            tips: '请输入参赛人员',
            items: [],
            checkedItems: [],
            screeningDropdown: false, // 高级搜索显示控制
            search: {
                schoolId: '',
                userName: '',
                actorGroup: '',
                actorWay: '',
                projectId: ''
            },
            schoolOptions: [], // 学校数据
            region: {},
            auditId: '',
            auditIdx: null,
            pageParam: {
                pageSize: 10,
                pageNum: 1,
                totalNum: 0
            },
            isBatch: false // 是否批量操作
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
        search: {
            handler: function() {
                this.getMemberList()
            },
            deep: true
        }
    },
    created() {
        if (this.$ls.get('loginInfo')) {
            this.identity =
                this.$ls.get('loginInfo').userInfo.identity.indexOf('_') > 0
                    ? this.$ls.get('loginInfo').userInfo.identity.split('_')[0]
                    : this.$ls.get('loginInfo').userInfo.identity
        }
    },
    mounted() {
        this.getMemberList()
    },
    methods: {
        changePage(val) {
            this.pageParam.pageNum = val
            this.getMemberList()
        },
        getSearch(val) {
            this.search.userName = val
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
            console.log(this.region)
            this.getSchoolData()
        },
        // 请求学校列表数据
        getSchoolData() {
            // if ((this.region.provinceId != null) || (this.region.cityId != null) || (this.region.areaId != null)) {
            requestSchoolList(this.region).then(response => {
                if (response.data.code === 200) {
                    this.schoolOptions =
                        response.data.appendInfo.comboxList || []
                }
            })
            // }
        },
        // 重置筛选
        resetSearchForm() {
            this.search = Object.assign(
                {},
                { schoolId: '', actorGroup: '', actorWay: '', projectId: '' },
                { userName: this.search.userName }
            )
            this.screeningDropdown = false
        },
        getMemberList() {
            const param = {
                matchId: this.$route.query.id
            }
            requestMatchActorList(
                Object.assign({}, param, this.search, this.region),
                this.pageParam
            ).then(res => {
                if (res.data.code === 200) {
                    this.items = res.data.entity.resultData
                    this.pageParam.totalNum = res.data.entity.totalNum
                }
            })
        },
        // 打开审核弹窗
        openDialog(id, idx) {
            this.visible.show = true
            this.auditId = id
            this.auditIdx = idx
        },
        openBatchDialog() {
            if (this.checkedItems.length) {
                const flag = this.checkedItems.some(
                    x => Number(x.auditStatus) === 0
                )
                if (flag) {
                    this.visible.show = true
                    this.isBatch = true
                } else {
                    this.showMessage('info', '没有待审核参赛人员')
                }
            } else {
                this.showMessage('info', '请选择要批量审核的参赛人员')
            }
        },
        resetAuditMethod() {
            this.isBatch = false
        },
        // 参赛人员审核
        audit(params) {
            const items = this.isBatch
                ? this.checkedItems
                : [this.items[this.auditIdx]]
            const param = []
            items.forEach(x => {
                param.push({
                    id: x.id,
                    auditStatus: Number(params.result),
                    auditOpinion: params.explain
                })
            })
            contestMemberBatchAudit(param).then(res => {
                if (res.data.code === 200) {
                    this.showMessage('success', '审核成功')
                    this.visible.show = false
                    this.resetAuditMethod()
                    items.forEach(x => {
                        x.auditStatus = Number(params.result)
                    })
                    this.$refs.multipleTable.clearSelection()
                    // this.items[this.auditIdx].auditStatus = Number(params.result)
                } else {
                    this.showMessage('error', res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.contest_member {
    .el-dialog {
        width: 564px;
    }
}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.contest_member {
    .content-box {
        padding: 20px 15px 20px;
        .option-box {
            margin-bottom: 25px;
        }
        .audit-btn {
            color: $theme-color;
            &:hover {
                color: #d00;
            }
        }
    }
}
</style>