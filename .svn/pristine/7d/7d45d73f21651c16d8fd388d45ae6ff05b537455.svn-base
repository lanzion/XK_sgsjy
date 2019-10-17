<template>
    <div class="evalutaion-tmpl backend-content__middle">
        <section class="option-box clearfix">
            <el-input v-model="selected.name" @keyup.native.enter="changePage(1)" class="fl bs-search-input" placeholder="请输入模板名称"></el-input>
            <button @click="changePage(1)" class="fl bs-search-button i-form-button is-plain">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{isDropdowm: screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-if="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="selected" class="bs-screening_box">
                    <el-form-item label="学期">
                        <term-select :selected.sync="selected.termId" :if-all="false" :clearable="true"></term-select>
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
        <v-admin-operate :items="headBtnGroup" v-bind="{del: showMessageBox}" btnType="head"></v-admin-operate>
        <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border class="data-table back-stage-table"
                            style="width: 100%">
            <el-table-column type="selection" width="40"/>
            <el-table-column prop="schoolYear" label="学年学期" sortable show-overflow-tooltip/>
            <el-table-column prop="name" label="模板名称" sortable show-overflow-tooltip/>
            <el-table-column prop="remark" label="评价类型" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{handleEvalTypes(scope.row.target || 1)}}
                </template>
            </el-table-column>
            <el-table-column label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" sortable show-overflow-tooltip/>
            <el-table-column label="操作" fixed="right">
                <template scope="scope">
                    <v-admin-operate v-bind="{copy: copyItem, del: deleteItem, edit: true, detail: true, items: listBtnGroup, data: scope.row}"/>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestTmplList, deleteTmpl, copyTmpl, groupDeleteTmpl } from '@/service/admin_evaluation.js'
    import { requestSchoolList } from '@/service/common.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import region from '@/components/common/select/region_select.vue'
    import termSelect from 'Common/select/term_select.vue'

    export default {
        name: 'evaluationTmpl', // 评价模板
        inheritAttrs: false,
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
                    name: '',
                    schoolId: null,
                    target: null,
                    termId: null,
                },
                selectedItems: []
            }
        },
        created () {
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
                let res = await requestTmplList({...this.pageParam, ...this.selected})

                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
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
            copyItem ({data = {}} = {}) { // 复制模板
                const errMsg = '复制模板失败，请重试'
                copyTmpl({id: data.id}).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功复制模板', duration: 1000})
                        this.requestList()
                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            deleteItem ({data = {}} = {}) { // 删除模板
                const errMsg = '删除模板失败，请重试'
                deleteTmpl({id: data.id}).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除模板', duration: 1000})
                        this.requestList()
                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            deleteItems () { // 批量删除模板
                const errMsg = '删除模板失败，请重试'
                groupDeleteTmpl(this.selectedItems).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除模板', duration: 1000})
                        this.requestList()
                        this.selectedItems.splice(0)
                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            getSchoolData () {
                requestSchoolList(this.region).then(res => {
                    if (res.data.code === 200) {
                        this.schoolOptions = (res.data.appendInfo || {}).comboxList || []
                    }
                })
            },
            handleEvalTypes (num) {
                let source = ['课程学习', '项目学习', '作品', '实践', '实训学习']
                return source[num - 1]
            },
            handleSelect (selectedArr) { // 选中某一行，加入删除的数组
                this.selectedItems = selectedArr.map(item => ({id: item.id})) || []
            },
            resetSearchForm () { // 重置搜索表单
                const obj = {
                    schoolId: null,
                    target: null,
                    termId: null,
                }
                this.$refs.region.checkedItems = []
                this.selected = {...this.selected, ...obj}
                this.screeningDropdown = false
            },
            showMessageBox () { // 显示批量删除提示框
                if (this.selectedItems.length === 0) {
                    this.$message({type: 'info', message: '请先选择需要删除的模板', duration: 1500})
                    return
                }

                this.$confirm('您确定要删除选中的模板吗？', '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    this.deleteItems()
                }).catch(e => {})
            }
        },
        watch: {}
    }
</script>
<style>
    .evalutaion-tmpl .el-message-box__title {
        line-height: 36px;
    }
</style>
