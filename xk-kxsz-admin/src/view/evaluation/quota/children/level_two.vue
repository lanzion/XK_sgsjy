<template>
    <div class="quota-level-one">
        <el-form :inline="true" :model="selected" class="option-box clearfix">
            <el-form-item label="一级指标">
                <el-select v-model="selected.pId" @change="requestList" placeholder="请选择" class="select">
                    <el-option v-for="(item, i) in levelOneList" :label="item.name" :value="item.id" :key="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="button" class="bs-screening-button bs-handle-button" :class="{isDropdowm: screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            </el-form-item>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <div class="bs-screening_box">
                    <el-form-item label="区域">
                        <region @region="changeRegion" :isAdmin="true" ref="region" :clearable="true"></region>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select v-model="selected.schoolIds" placeholder="选择学校" filterable clearable class="select-school">
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </el-form>
        <v-admin-operate :items="headBtnGroup" v-bind="{add: showDialog, del: showMessageBox}" btnType="head"></v-admin-operate>
        <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border class="data-table back-stage-table" style="width: 100%">
            <el-table-column type="selection" width="50" :selectable="isOperate"/>
            <el-table-column prop="name" label="二级指标" sortable show-overflow-tooltip/>
            <el-table-column prop="evaluationPoint" label="测评点" sortable show-overflow-tooltip width="400">
                <template scope="scope">
                    <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
                </template>
            </el-table-column>
            <el-table-column label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.eduProvinceId}}{{scope.row.eduCityId}}{{scope.row.eduAreaId}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolId" label="学校" show-overflow-tooltip/>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate v-bind="{
                        edit: { callback: showDialog, isActive: isOperate },
                        del: { callback: deleteItem, isActive: isOperate },
                        items: listBtnGroup,
                        data: scope.row,
                        index: scope.$index
                    }" />
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <add-quota v-if="dialog.isVisible" v-bind="{dialog, handleRequest: requestList, curEditingItem, propLevelOneList}"/>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestPlainLevelOneQuota, requestLevelTwoQuota, deleteQuota, groupDeleteQuota } from '@/service/admin_evaluation.js'
    import { requestSchoolList } from '@/service/common.js'
    import adminOperate from '@/components/common/operate.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import addQuota from '@/components/evaluation/add_quota_dialog.vue'
    import region from '@/components/common/select/region_select.vue'

    export default {
        name: 'levelTwo', // 二级指标
        mixins: [subPermission, setPage],
        data () {
            return {
                curEditingItem: {},
                dialog: {isVisible: false},
                items: [],
                levelOneList: [],
                propLevelOneList: [],
                region: {},
                screeningDropdown: false, // 高级筛选
                schoolOptions: [],
                selected: {
                    pId: undefined,
                    schoolIds: null
                },
                selectedItems: [],
                userId: '' // 登录人id
            }
        },
        created () {
            if (this.$ls.get('loginInfo')) {
                this.userId = this.$ls.get('loginInfo').userInfo.id
            }
            this.requestList()
            this.requestLevelOneList()
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            addQuota,
            region
        },
        methods: {
            async requestLevelOneList () { // 获取一级指标列表
                let res = await requestPlainLevelOneQuota()
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.appendInfo || {}
                    this.propLevelOneList = entity.list || []
                    this.levelOneList = [{name: '全部', id: null}, ...this.propLevelOneList]
                }
            },
            async requestList () { // 获取二级指标列表
                let res = await requestLevelTwoQuota({...this.pageParam, ...this.selected})
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
            },
            changeRegion ([provinceId = null, cityId = null, areaId = null] = []) {
                this.region = {provinceCode: provinceId, cityCode: cityId, areaCode: areaId}
                this.selected = {...this.selected, ...this.region}
                this.getSchoolData()
                this.selected.schoolIds = null
            },
            deleteItem ({data = {}} = {}) { // 删除指标
                this.$confirm('您确定要删除该指标吗？', '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    deleteQuota({id: data.id}).then(res => {
                        if (res.status === 200 && res.data.code === 200) {
                            this.$message({type: 'success', message: '成功删除指标', duration: 1000})
                            this.requestList()
                            return
                        }
                        this.$message.error(res.data.msg || '删除指标失败，请重试')
                    }, () => {
                        this.$message.error('删除指标失败，请重试')
                    })
                }).catch(e => {})
            },
            deleteItems () { // 批量删除模板
                groupDeleteQuota(this.selectedItems).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除指标', duration: 1000})
                        this.requestList()
                        this.selectedItems.splice(0)
                        return
                    }
                    this.$message.error(res.data.msg || '删除指标失败，请重试')
                }, () => {
                    this.$message.error('删除指标失败，请重试')
                })
            },
            getSchoolData () {
                requestSchoolList(this.region).then(res => {
                    if (res.data.code === 200) {
                        this.schoolOptions = (res.data.appendInfo || {}).comboxList || []
                    }
                })
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
            handleEvaluationPoint (txt) {
                return !txt ? '' : txt.replace(/\n/g, '</br>')
            },
            handleSelect (selectedArr) { // 选中某一行，加入删除的数组
                this.selectedItems = selectedArr.map(item => ({id: item.id})) || []
            },
            showDialog (options = {}) {
                this.curEditingItem = options.model === 'edit' ? {...options.data, type: 'edit'} : {}
                this.dialog.isVisible = true
            },
            showMessageBox () { // 显示批量删除提示框
                if (this.selectedItems.length === 0) {
                    this.$message({type: 'info', message: '请先选择需要删除的指标', duration: 1500})
                    return
                }
                this.$confirm('您确定要删除选中的指标吗？', '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    this.deleteItems()
                }).catch(e => {})
            },
            resetSearchForm() { // 重置搜索表单
                const obj = {
                    schoolIds: null,
                }
                this.$refs.region.checkedItems = []
                this.selected = {...this.selected, ...obj}
                this.screeningDropdown = false
            },
            // 判断可不可以编辑和删除
            isOperate(item) {
                return item.createId === this.userId
            }
        },
    }
</script>

<style lang="scss" scoped>
    .evaluation-point {
        text-align: left;
        padding: 5px 30px;
    }
</style>
