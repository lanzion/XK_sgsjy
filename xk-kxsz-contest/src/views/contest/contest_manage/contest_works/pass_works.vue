<template>
	<div class="content-box">
		<section class="option-box clearfix">
            <div class="btnBox">
                <button class="export-btn" v-if="items.length > 0" @click="exportList">导出</button>
                <button class="export-btn" v-else @click="exportNoDatas">导出</button>
                <button class="export-btn" :class="{'score_btn':!scoreBtnFlag}" @click="automaticAwards" style="vertical-align: middle;">自动评奖</button>
                <span class="score_btn_tis">当前赛程评比结束后，才能自动评奖</span>
            </div>
			<v-search class="fl" :tips="tips" @search="getSearch"></v-search>
			<button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div class="works-count clearfix" v-if="identity != matchDetail.matchGrade">
                <span class="tip fl"><i class="icon-form-tip"></i>待上报作品数</span>
                <div class="list-box dis_ib" v-if="countList.length">
                    <dl class="count-list dis_ib" v-for="(item, index) in countList" :key="index">
                        <dt class="tit dis_ib">{{item.projectName}}：</dt>
                        <dd class="num dis_ib">{{item.quotaNum || 0}}</dd>
                    </dl>
                </div>
                <div class="list-box" v-else>暂无</div>
            </div>
            <button class="export-btn fr" @click="batchWorksOperate(1)">批量上报</button>
            <button class="export-btn fr" @click="batchWorksOperate(0)">批量撤回</button>
            <!-- <a href="javaScript:;" class="auto-report fr" @click="autoReport" v-if="identity != matchDetail.matchGrade">自动上报</a> -->
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box" label-width="80px" ref="search">
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
                    <el-form-item label="学校" v-if="identity != 9">
                        <el-select v-model="search.schoolId" placeholder="请选择学校" filterable clearable>
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当前赛程">
                        <el-select v-model="search.phaseId" placeholder="请选择参赛形式" filterable clearable>
                            <el-option v-for="item in phaseDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                    <el-form-item label="作者" style="width:280px">
                        <el-input v-model="search.userName" placeholder="请输入作者姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="导师">
                        <el-input v-model="search.instructor" placeholder="请输入导师姓名"></el-input>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click="getWorksList">确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
		</section>
		<!-- 参赛人员列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column  label="编号" width="100" show-overflow-tooltip prop="workNo"></el-table-column>
            <el-table-column prop="name" label="作品名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link class="a-btn" :to="{path: '/contest/manage/works/audit', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }">{{scope.row.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="作者" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="分类" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="groupDisDetailName" label="组别"></el-table-column>
            <el-table-column prop="subjectDisDetailName" label="学科"></el-table-column>
            <!-- <el-table-column prop="actorGroup" label="分组" width="50">
                <template slot-scope="scope">
                    <span>{{scope.row.actorGroup | translate(actorGroupDL, { key: 'id' })}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="actorWay" label="形式" width="50">
                <template slot-scope="scope">
                    <span>{{scope.row.actorWay | translate(actorWayDL, { key: 'id' })}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>
            <el-table-column prop="instructor" label="指导教师" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phaseName" label="当前赛程" width="60" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.phaseName || '校级评比'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="得分" show-overflow-tooltip width="50"></el-table-column>
            <el-table-column prop="browseNum" label="浏览数" show-overflow-tooltip width="50"></el-table-column>
            <el-table-column prop="praiseNum" label="点赞数" show-overflow-tooltip width="50"></el-table-column>
            <el-table-column label="操作" width="235" fixed="right">
                <template slot-scope="scope">
                    <a href="javaScript:;" class="option-btn" @click="delData(scope.row)">删除</a> |
                    <router-link :to="{ path: '/contest/manage/works/reviewRecord', query: { id: $route.query.id, worksId: scope.row.id, type: $route.query.type } }" class="option-btn">评审记录</router-link> |
                    <a href="javaScript:;" class="option-btn" @click="openCompeteDialog(scope.row.id)">参赛记录</a> |
                    <a v-if="scope.row.isPrize === '1'" class="option-btn" @click="openAwardRecord(scope.row.id)">已评奖</a>
                    <a href="javaScript:;" class="option-btn" v-else @click="openAwardDialog(scope.row.phaseId,scope.row.phaseName,scope.row.id,scope.row.createId)">评奖</a>
                    <div class="dis_ib" v-if="identity != matchDetail.matchGrade"> |
                        <a href="javaScript:;" class="option-btn" v-if="scope.row.isReport == null || scope.row.isReport == 0" @click="worksOperate(1, scope.row.id, scope.row.phaseId, scope.$index)">上报</a>
                        <a href="javaScript:;" class="option-btn" v-else @click="worksOperate(0, scope.row.id, scope.row.phaseId, scope.$index)">撤回</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
        <compete-record :visible.sync="visible" :recordList="recordList"></compete-record>
        <awards-record :awardVisible.sync="awardVisible" :awardRecord="awardRecord"></awards-record>
        <award-dialog :awardVisi.sync="awardVisi" :param="params" @callback="getWorksList"></award-dialog>
	</div>
</template>

<script>
    import search from '@/components/common/search.vue'
    // import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import pagination from '@/components/common/pagination.vue'
    import competeRecord from '@/components/common/dialog/compete_record.vue'
    import awardsRecord from '@/components/common/dialog/award_record.vue'
    import awards from '@/components/common/dialog/awards.vue'
    import { requestSchoolList, requestDictComb } from '@/service/common.js'
    import {
        requestManageWorksList,
        requestWorksCompeteRecord,
        requestAwardRecord,
        worksReport,
        // worksAutoReport,
        worksCancel,
        delByMatchIdAndId,
        requestWorksPhaseList,
        reportWorksNum,
        automaticAwards,
        requestPhaseList,
        batchManualWorksReport,//批量上报
        batchCancelWorksReport,//批量撤回
    } from '@/service/manage.js'
    import { projectList } from '@/mixin/projectList.js'
    import { mapState } from 'vuex'
    import { exportDatas } from '@/mixin/exportDatas.js'

    export default {
        name: 'pass_works',
        mixins: [projectList, exportDatas],
        components: {
            'v-search': search,
            // 'v-region-select': region,
            'compete-record': competeRecord,
            'award-dialog': awards,
            'v-pagination': pagination,
            'awards-record': awardsRecord
        },
        data() {
            return {
                matchId: this.$route.query.id,
                visible: {
                    show: false // 参赛记录显示
                },
                // 获奖记录弹窗显示
                awardVisible: {
                    show: false
                },
                awardVisi: {
                    show: false // 评奖弹窗显示
                },
                tips: '请输入作品名称',
                items: [],
                checkedItems: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    name: '', // 作品名称
                    schoolId: '',
                    phaseId: '', // 阶段
                    actorGroup: '', // 分组
                    actorWay: '', // 参赛形式
                    projectId: '', // 分类id
                    groupDisDetailId: '',
                    subjectDisDetailId: ''
                },
                schoolOptions: [], // 学校数据
                region: {},
                auditId: '', // 审核id
                auditIdx: null, // 审核数据索引
                recordList: [], // 参赛记录数据
                awardRecord: [], // 获奖记录数据
                phaseDL: [],
                params: {},
                identity: '',
                countList: [], // 待上报作品数
                pageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
                subjectList: [],
                zbList: [],
                scoreBtnFlag:false,
                multipleSelection:[],//选中的作品
                phaseId:''
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
                matchDetail(state) {
                    const detail = state.detail || {}
                    return detail
                }
            })
        },
        watch: {
            // search: {
            //     handler: function () {
            //         this.getWorksList()
            //     },
            //     deep: true
            // },
            // region: {
            //     handler: function () {
            //         this.getWorksList()
            //     },
            //     deep: true
            // }
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.identity = this.$ls.get('loginInfo').userInfo.identity.indexOf('_')>0?this.$ls.get('loginInfo').userInfo.identity.split('_')[0]:this.$ls.get('loginInfo').userInfo.identity
                this.token = this.$ls.get('loginInfo').token
            }
        },
        mounted() {
            // if (this.$ls.get('userIdentity') || this.$ls.get('userIdentity') === 'school') {
            //     this.getWorksList()
            // }
            // this.getWorksList()
            this.getPhaseList()
            this.getReportWorksNum()
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
                const param = {
                    matchId: this.matchId,
                    auditStatus: 1
                }
                requestManageWorksList(Object.assign({}, param, this.search, this.region), this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
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
                this.getWorksList()
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
            // 获取赛程阶段数据
            getPhaseList() {
                requestWorksPhaseList({ matchId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.phaseDL = res.data.appendInfo.phaseList
                        for (let i = 0; i < this.phaseDL.length; i++) {
                            if (this.identity === this.phaseDL[i].identity) {
                                this.search.phaseId = this.phaseDL[i].id
                                this.phaseId = this.phaseDL[i].id
                                this.automaticAwardFlag(this.search.phaseId)
                                break
                            }
                        }
                        this.getWorksList()
                    }
                })
            },
            resetSearchForm() {
                // this.search = Object.assign({}, { schoolId: '', phaseId: '', actorGroup: '', actorWay: '', projectId: '' }, { name: this.search.name })
                // this.$refs.search.resetFields()
                this.search.schoolId = ''
                this.search.actorGroup = ''
                this.search.actorWay = ''
                this.search.projectId = ''
                this.screeningDropdown = false
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getWorksList()
            },
            // 获取作品列表
            getWorksList() {
                const param = {
                    matchId: this.matchId,
                    auditStatus: 1
                }
                // console.log('90', this.search)
                requestManageWorksList(Object.assign({}, param, this.search, this.region), this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.items = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // 获取参赛作品-参赛记录
            getCompeteRecord(worksId) {
                const params = {
                    matchId: this.matchId,
                    worksId: worksId
                }
                requestWorksCompeteRecord(params).then((res) => {
                    if (res.data.code === 200) {
                        this.recordList = res.data.appendInfo.matchRecordsList
                    }
                })
            },
            // 打开参赛记录弹窗
            openCompeteDialog(worksId) {
                this.visible.show = true
                this.getCompeteRecord(worksId)
            },
            // 删除作品
            delData(data) {
                this.$confirm('是否确认删除，数据删除后不可以恢复？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    const params = {
                        matchId: data.matchId,
                        id: data.id
                    }
                    delByMatchIdAndId(params).then((response) => {
                        if (response.data.code === 200) {
                            this.getWorksList()
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            })
                        }
                    })
                }).catch(() => {})
            },
            // 获取参赛作品-获奖记录
            getAwarRecord(worksId) {
                const params = {
                    matchId: this.matchId,
                    worksId: worksId
                }
                requestAwardRecord(params).then((res) => {
                    if (res.data.code === 200) {
                        this.awardRecord = res.data.appendInfo.matchAwardsRecordsList
                    }
                })
            },
            // 打开参赛获奖弹窗
            openAwardRecord(worksId) {
                this.awardVisible.show = true
                this.getAwarRecord(worksId)
            },
            // 打开评奖弹窗
            openAwardDialog(phaseId, phaseName, worksId, authorId) {
                this.awardVisi.show = true
                this.params = Object.assign({}, { phaseId: phaseId, phaseName: phaseName, worksId: worksId, authorId: authorId })
            },
            // 上报作品-撤回作品
            worksOperate(type, worksId, phaseId, index) {
                let tips
                let handle
                if (type === 1) {
                    tips = '上报'
                    handle = worksReport
                } else {
                    tips = '撤回'
                    handle = worksCancel
                }
                this.$confirm(`此操作将${tips}该作品，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    const params = {
                        matchId: this.matchId,
                        id: worksId,
                        phaseId: phaseId
                    }
                    handle(params).then((res) => {
                        if (res.data.code === 200) {
                            this.items[index].isReport = type
                            this.showMessage('success', `${tips}成功`)
                            this.getReportWorksNum()
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {})
            },
            // 带上报作品数
            getReportWorksNum() {
                const params = {
                    matchId: this.$route.query.id
                }
                reportWorksNum(params).then((res) => {
                    if (res.data.code === 200) {
                        this.countList = res.data.appendInfo.reportList
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
                input4.attr('name', 'actorWay')
                input4.attr('value', this.search.actorWay)

                const input5 = $('<input>')
                input5.attr('type', 'hidden')
                input5.attr('name', 'schoolId')
                input5.attr('value', this.search.schoolId)

                const input7 = $('<input>')
                input7.attr('type', 'hidden')
                input7.attr('name', 'phaseId')
                input7.attr('value', this.search.phaseId)

                const input8 = $('<input>')
                input8.attr('type', 'hidden')
                input8.attr('name', 'groupDisDetailId')
                input8.attr('value', this.search.groupDisDetailId)

                const input9 = $('<input>')
                input9.attr('type', 'hidden')
                input9.attr('name', 'subjectDisDetailId')
                input9.attr('value', this.search.subjectDisDetailId)

                const input10 = $('<input>')
                input10.attr('type', 'hidden')
                input10.attr('name', 'region')
                input10.attr('value', this.region)

                const input11 = $('<input>')
                input11.attr('type', 'hidden')
                input11.attr('name', 'auditStatus')
                input11.attr('value', 1)

                const inputs = [input1, input2, input3, input4, input5, input7, input8, input9, input10, input11]
                const url = '/kxsz/maker/matchWorks/workExport'
                this.exportCommon(url, inputs)
            },
            // 判断是否可以自动评奖
            automaticAwardFlag(id){
                requestPhaseList({matchId:this.$route.query.id}).then(res=>{
                    let data = res.data;
                    if(data.code==200){
                        data.appendInfo.list.forEach(v => {
                           if(v.id==id){
                               if(v.status==3){
                                   this.scoreBtnFlag = true;
                               }
                           } 
                        });
                    }
                })
            },
            // 自动评奖
            automaticAwards(){
                if(!this.scoreBtnFlag) return false
                let matchId = this.$route.query.id;
                automaticAwards({matchId:matchId,phaseId:this.phaseId}).then(res=>{
                    let data = res.data;
                    console.log(data);
                    if(data.code==200){
                        this.$message({
                            type: 'success',
                             message: '自动评奖成功'
                        })
                    }else{
                        this.$message({
                            type: 'error',
                             message: res.data.msg
                        }) 
                    }
                    
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // // 批量上报 - 批量撤回
            batchWorksOperate(type){
                /**
                 * @type  1上报  0撤回
                 * 
                 * */ 
                let tips
                let handle
                if(!this.multipleSelection.length){
                    this.$message({
                        type: 'error',
                        message: '请选择作品'
                    })
                    return
                }
                if(type){
                   tips = "批量上报";
                   handle = batchManualWorksReport;

                }else{
                   tips = "批量撤回"; 
                   handle = batchCancelWorksReport
                }
                let param = {
                    matchId: this.matchId,
                    phaseId: this.multipleSelection[0].phaseId,
                    worksIds:[]
                }
                this.multipleSelection.forEach(v => {
                    param.worksIds.push(v.id)
                }); 
                this.$confirm(`此操作将${tips}该作品，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(()=>{
                    handle(param).then(res=>{
                        if (res.data.code === 200) {
                            this.multipleSelection.forEach(v => {
                                v.isReport = type;
                            });
                            this.showMessage('success', `${tips}成功`)
                            this.$refs.multipleTable.clearSelection();
                            this.getReportWorksNum()
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                })   
            }
            // autoReport() {
            //     this.$confirm('此操作将自动上报作品，是否继续？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning',
            //         customClass: '__custom-msg-box'
            //     }).then(() => {
            //         const params = {
            //             matchId: this.$route.query.id,
            //             phaseId: this.items[0].phaseId
            //         }
            //         worksAutoReport(params).then((res) => {
            //             if (res.data.code === 200) {
            //                 this.$message({
            //                     type: 'success',
            //                     message: '自动上报成功'
            //                 })
            //             } else {
            //                 this.$message({
            //                     type: 'error',
            //                     message: res.data.msg
            //                 })
            //             }
            //         })
            //     }).catch(() => {})
            // }
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
    	.option-box {
    		margin-bottom: 25px;
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
        .option-btn {
            color: $theme-color;
            font-size: 12px;
            // &:hover{
            //     color: #d00;
            // }
        }
        .a-btn {
            color: $theme-color;
        }
    }
    .btnBox {
        padding-bottom: 20px;
    }
    .score_btn_tis{
        color: #666;
        font-size: 12px;
        padding-left: 20px;
    }
    .score_btn{
        background: darkgrey;
    }
</style>

<style lang="scss">
    .content-box {
        .el-dialog {
            width: 500px;
        }
    }
</style>
