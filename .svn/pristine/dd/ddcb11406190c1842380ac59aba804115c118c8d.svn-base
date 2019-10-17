<template>
    <div class="evalutaion-tmpl backend-content__middle">
        <section class="option-box clearfix">
            <el-input v-model="selected.name" @keyup.native.enter="changePage(1)" class="fl bs-search-input" placeholder="请输入学生姓名"></el-input>
            <button @click="changePage(1)" class="fl bs-search-button i-form-button is-plain">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{isDropdowm: screeningDropdown }" @click="screeningDropdown = !screeningDropdown"></button>
            <div v-if="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="selected" class="bs-screening_box">
                    <el-form-item label="学期">
                        <term-select :selected.sync="selected.termId" :if-all="false" :clearable="true"></term-select>
                    </el-form-item>
                    <el-form-item label="阶段">
                        <el-select v-model="selected.status" :clearable="true" placeholder="请选择评价阶段">
                            <el-option v-for="item in status" :key="item.val" :label="item.name" :value="item.val"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评价类型">
                        <el-select v-model="selected.target" :clearable="true" placeholder="请选择评价类型">
                            <el-option v-for="item in evaluationTypes" :key="item.val" :label="item.name" :value="item.val"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域">
                        <region @region="changeRegion" :isAdmin="true" ref="region" :clearable="true"></region>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="selected.schoolId" placeholder="选择学校" filterable clearable class="select-school">
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" v-bind="{add: null}" btnType="head"></v-admin-operate>
        <el-table :data="items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
            <!--<el-table-column type="selection" width="50"/>-->
            <el-table-column prop="name" label="姓名" sortable class="name" show-overflow-tooltip/>
            <el-table-column prop="schoolYear" label="学年学期" sortable show-overflow-tooltip/>
            <el-table-column prop="target" label="评价类型" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{handleEvalTypes(scope.row.target || 1)}}
                </template>
            </el-table-column>
            <el-table-column prop="busName" label="评价对象" show-overflow-tooltip/>
            <el-table-column label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" sortable show-overflow-tooltip/>
            <el-table-column prop="status" label="评价阶段" sortable>
                <template scope="scope">
                    {{handleStatus(scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        evalDetail: { callback: goEvalDetail, isDirect: false },
                        finalEval: { callback: goEvalDetail, isActive: checkFinalStatus, isDirect: false }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestEvalRecordList } from '@/service/admin_evaluation.js'
    import { requestSchoolList } from '@/service/common.js'
    import adminOperate from '@/components/common/operate.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import region from '@/components/common/select/region_select.vue'
    import termSelect from '@/components/common/select/term_select.vue'

    export default {
        name: 'evaluationRecord', // 评价记录
        mixins: [subPermission, setPage],
        data () {
            return {
                evaluationTypes: [
                    {name: '学生课程学习', val: 1},
                    {name: '学生项目学习', val: 2},
                    {name: '学生实训学习', val: 5},
                    {name: '学生作品', val: 3},
                    {name: '学生实践', val: 4},
                ],
                items: [],
                region: {},
                screeningDropdown: false, // 高级筛选
                schoolOptions: [],
                selected: {
                    orgId: '',
                    name: '',
                    status: null,
                    schoolId: null,
                    target: null,
                    termId: null,
                },
                status: [
                    {name: '评论中', val: 1},
                    {name: '待终评', val: 2},
                    {name: '已终评', val: 3},
                ],
            }
        },
        created () {
            const loginInfo = this.$ls.get('loginInfo')
            this.selected.orgId = loginInfo ? loginInfo.userInfo.baseId : ''
            this.requestList()
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            region,
            termSelect
        },
        methods: {
            async requestList () { // 获取列表
                let res = await requestEvalRecordList({...this.pageParam, ...this.selected})
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
            },
            checkFinalStatus ({status = 1} = {}) { // 根据评价阶段判断是否可以点击终评。status 评价状态 1评论中，2待终评，3已终评
                const isFinalStatus = 2
                return status === isFinalStatus
            },
            changeRegion ([provinceId = null, cityId = null, areaId = null] = []) {
                this.region = {provinceId, cityId, areaId}
                this.selected = {...this.selected, ...this.region}
                this.getSchoolData()
                this.selected.schoolId = null
            },
            // 分页改变
            changePage(val) {
                this.setPageNum(val)
                this.requestList()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.requestList()
            },
            getSchoolData () {
                requestSchoolList(this.region).then(res => {
                    if (res.data.code === 200) {
                        this.schoolOptions = (res.data.appendInfo || {}).comboxList || []
                    }
                })
            },
            goEvalDetail ({data = {}, model} = { data, model }) { // 查看评价详情，或者进行终评
                const {busId, busName, beCommentedId, target, createTime} = data
                let options = {
                    busId,
                    busName,
                    beCommentedId,
                    createTime,
                    resultList: [],
                    target: target,
                    _isFinal: model === 'finalEval', // _isFinal为true时，表示点击终评按钮、并进行终评
                }

                this.$ls.set('curEvaluatingItem', options)
                this.$router.push('/cqe/record/detail')
            },
            handleEvalTypes (num) { // 处理评价类型
                let source = ['课程学习', '项目学习', '作品', '实践', '实训学习']
                return source[num - 1]
            },
            handleStatus (status) { // 处理评价状态
                let source = ['评论中', '待终评', '已终评']
                return source[status - 1]
            },
            resetSearchForm() { // 重置搜索表单
                const obj = {
                    status: null,
                    schoolId: null,
                    target: null,
                    termId: null,
                }
                this.$refs.region.checkedItems = []
                this.selected = {...this.selected, ...obj}
                this.screeningDropdown = false
            },
            search () { // 搜索
                const firstPageNum = 1
                this.pageParam.pageNum === firstPageNum ? this.requestList() : this.pageParam.pageNum = firstPageNum
            },
        },
    }
</script>
