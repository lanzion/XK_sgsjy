<template>
    <div class="contest_manage">
        <h4 class="head-tit">参赛管理</h4>
        <div class="content-box">
            <ul class="contest-type-box">
                <li v-for="(item, index) in projectOptions" class="contest-type-item" :class="{ active: index==activeProjectIndex }" @click="changeProject(index)">{{item.projectName}}</li>
            </ul>
            <section class="option-box clearfix">
                <v-search class="fl" tips="请输入名称关键字" @search="getSearch" ref="input"></v-search>
                <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
                <div v-show="screeningDropdown" class="bs-screening_wrap">
                    <el-form :inline="true" :model="search" class="bs-screening_box" label-width="80px" ref="search">
                        <el-form-item label="申报组别">
                            <el-select v-model="search.declareId" placeholder="请选择申报组别" filterable clearable>
                                <el-option v-for="item in declareList" :key="item.id" :label="item.declareName" :value="item.declareId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属阶段">
                            <el-select v-model="search.phaseId" placeholder="请选择所属阶段" filterable clearable>
                                <el-option v-for="item in phaseDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="bs-screening-btn">
                        <button type="button" @click="getContestOpus">确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                    </div>
                </div>
            </section>
            <section class="btn-group clearfix">
                <!-- <button type="button" class="btn-primary fl">导出</button> -->
                <div class="fr">
                    <button type="button" class="btn-primary" @click="riseOperate">晋级</button>
                    <button type="button" class="btn-primary" @click="openAwardDialog">评奖</button>
                    <button type="button" class="btn-primary" @click="awardOperate">撤销评奖</button>
                </div>
            </section>
            <!-- 列表 -->
            <component v-bind="{ items, openAwardDialog, awardOperate, riseOperate }" @checked="changeSelection"
                :is="`v-table-type-${projectOptions[activeProjectIndex] ? projectOptions[activeProjectIndex].formType : '111'}`"></component>
            <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
            <award-dialog :awardVisi.sync="awardVisi" :params="params" @callback="getContestOpus"></award-dialog>
        </div>
    </div>
</template>

<script>
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'
    import competeRecord from '@/components/common/dialog/compete_record.vue'
    import awardsRecord from '@/components/common/dialog/award_record.vue'
    import awards from '@/components/common/dialog/awards.vue'
    import table111 from '@/components/manage/competition_manage/table_formType111.vue'
    import table112 from '@/components/manage/competition_manage/table_formType112.vue'
    import table113 from '@/components/manage/competition_manage/table_formType113.vue'
    import table114 from '@/components/manage/competition_manage/table_formType114.vue'
    import {
        requestOfflineDeclareList,
        requestOfflineOpus,
        requestOfflinePhaseList,
        doRiseOpus,
        doAwardsOpus,
        cancelAwardsOpus,
    } from '@/service/manage.js'
    import { projectList } from '@/mixin/projectList.js'
    import { mapState } from 'vuex'

    export default {
        name: 'cpmpetitionManage',  // 参赛管理
        mixins: [projectList],
        components: {
            'v-search': search,
            'compete-record': competeRecord,
            'award-dialog': awards,
            'v-pagination': pagination,
            'awards-record': awardsRecord,
            'v-table-type-111': table111,
            'v-table-type-112': table112,
            'v-table-type-113': table113,
            'v-table-type-114': table114
        },
        data() {
            return {
                matchId: this.$route.query.id,
                awardVisi: {
                    show: false // 评奖弹窗显示
                },
                items: [],
                checkedItems: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    name: '', // 作品名称
                    declareId: '', // 申报组别
                    phaseId: '', // 阶段
                    projectId: '', // 项目
                    templateType: '', // 模板类型
                },
                activeProjectIndex: 0,  // 竞赛类别选中项
                declareList: [], // 竞赛组别列表
                auditId: '', // 审核id
                auditIdx: null, // 审核数据索引
                recordList: [], // 参赛记录数据
                awardRecord: [], // 获奖记录数据
                phaseDL: [],
                params: [],
                identity: '',
                countList: [], // 待上报作品数
                pageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
            }
        },
        computed: {
            ...mapState('matchDetail', {
                matchDetail(state) {
                    const detail = state.detail || {}
                    return detail
                }
            }),
            condition: function () {
                const curProjectItem = this.projectOptions[this.activeProjectIndex]
                return Object.assign({},
                    this.search,
                    { matchId: this.matchId },
                    { projectId: curProjectItem && curProjectItem.projectId },
                    { templateType: curProjectItem && curProjectItem.formType },
                    { pageSize: this.pageParam.pageSize },
                    { pageNum: this.pageParam.pageNum }
                )
            }
        },
        watch: {
            condition: {
                handler: function () {
                    this.getContestOpus()
                },
                deep: true,
                // immediate: true
            },
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity
            }
        },
        mounted() {
            this.getDeclareList()
            this.getPhaseList()
        },
        methods: {
            getSearch(val) {
                this.$set(this.search, 'name', val)
            },
            getContestOpus() {
                requestOfflineOpus(this.condition).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                    }
                })
            },
            getDeclareList() {
                requestOfflineDeclareList({ businessId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || []
                        this.declareList = _data
                    }
                })
            },
            // 获取赛程阶段数据
            getPhaseList() {
                requestOfflinePhaseList({ matchId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo || {}
                        this.phaseDL = _data.phaseList || []
                    }
                })
            },
            resetSearchForm() {
                const _search = {
                    phaseId: '',
                    declareId: '',
                    projectId: '',
                    templateType: ''
                }
                Object.assign(this.search, _search)
                this.screeningDropdown = false
            },
            changeSelection(checked) {
                this.checkedItems = checked
            },
            changePage(val) {
                this.pageParam.pageNum = val
            },
            changeProject(index) {
                this.activeProjectIndex = index
                this.changePage(1)
                this.$refs.input.routeChange()
                this.$refs.input.getSearch()
            },
            // 打开评奖弹窗
            openAwardDialog({ item = {} }) {
                this.params = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (this.params.length) {
                    this.awardVisi.show = true
                } else {
                    this.$message({ message: '请选择要评奖的作品' })
                }
            },
            // 评奖/撤回评奖
            awardOperate({ item = {}, model = 'cancel' }) {
                let handle
                const params = []
                const items = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                const tips = model === 'do' ? '评奖' : '撤回评奖'
                if (items.length) {
                    this.$confirm(`此操作将${tips}该作品，是否继续？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        if (model === 'cancel') {
                            handle = cancelAwardsOpus
                            items.forEach((x) => {
                                params.push({ opusId: x.id })
                            })
                        } else {
                            handle = doAwardsOpus
                        }
                        handle(params).then((res) => {
                            if (res.data.code === 200) {
                                // this.items[index].isReport = type
                                this.showMessage('success', `${tips}成功`)
                                this.getContestOpus()
                            } else {
                                this.showMessage('error', res.data.msg)
                            }
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: `请选择要${tips}的作品` })
                }
            },
            riseOperate({ item = {} }) {
                const params = []
                const items = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (items.length) {
                    this.$confirm('此操作将晋级该作品，晋级后不可撤销，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        items.forEach((x) => {
                            params.push({ opusId: x.id })
                        })
                        doRiseOpus(params).then((res) => {
                            if (res.data.code === 200) {
                                // this.items[index].isReport = type
                                this.showMessage('success', '晋级成功')
                            } else {
                                this.showMessage('error', res.data.msg)
                            }
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: '请选择要晋级的作品' })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .dis_ib {
        display: inline-block;
    }
    .content-box {
        padding: 20px 15px 20px;

        .contest-type-box {
            $h: 32px;
            margin-bottom: 20px;
            cursor: pointer;
            overflow: hidden;

            .contest-type-item {
                display: inline-block;
                height: $h;
                line-height: $h;
                padding: 0 1em;
                margin-right: 8px;
                border: 1px solid $theme-color;
                font-size: 14px;
                font-weight: 400;
                color: $theme-color;

                &:hover,
                &.active {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }

        .option-box {
            margin-bottom: 12px;
            font-size: 12px;
            color: $theme-color;
            .works-count {
                display: inline-block;
                height: 36px;
                line-height: 36px;
                font-size: 12px;
                margin-left: 8px;
                .tip {
                    color: #999;
                    margin-right: 15px;
                    i {
                        font-size: 14px;
                        margin-right: 5px;
                    }
                }
                .list-box {
                    max-width: 440px;
                    height: 36px;
                    overflow: auto;
                    .count-list {
                        margin-right: 25px;
                        &:last-child {
                            margin-right: 0px;
                        }
                        .tit {
                            color: #333;
                        }
                        .num {
                            color: #0594e8;
                        }
                    }
                }
            }
            .auto-report {
                display: inline-block;
                width: 84px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                color: #fff;
                background-color: $theme-color;
                font-size: 14px;
                vertical-align: top;
                &:hover {
                    opacity: 0.75;
                }
            }
        }

        .btn-group {
            margin-bottom: 12px;
            .btn-primary {
                $h: 24px;
                display: inline-block;
                height: $h;
                line-height: $h;
                padding: 0 1em;
                border-radius: $h;
                background-color: $theme-color;
                color: #fff;
            }
        }
    }
</style>

<style lang="scss">
    .content-box {
        .el-dialog {
            width: 500px;
        }
    }
</style>