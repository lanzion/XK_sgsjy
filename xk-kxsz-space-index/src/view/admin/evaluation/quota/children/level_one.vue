<template>
    <div class="quota-level-one">
        <v-admin-operate :items="headBtnGroup" v-bind="{add: showDialog, del: showMessageBox}" btnType="head"></v-admin-operate>
        <!-- 课程列表 -->
        <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border class="data-table back-stage-table" style="width: 100%">
            <el-table-column type="selection" width="40" :selectable="isOperate" />
            <el-table-column prop="name" label="一级指标" sortable show-overflow-tooltip/>
            <el-table-column prop="evaluationPoint" label="指标说明" sortable show-overflow-tooltip/>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-admin-operate v-bind="{
                        edit: { callback: showDialog, isActive: isOperate },
                        del: { callback: deleteItem, isActive: isOperate },
                        items: listBtnGroup,
                        data: scope.row,
                        index: scope.$index}"/>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <add-quota v-if="dialog.isVisible" v-bind="{dialog, handleRequest: requestList, curEditingItem, isLevelOne: true}"/>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestLevelOneQuota, deleteQuota, groupDeleteQuota } from '@/service/admin_evaluation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import addQuota from 'components/admin/admin_evaluation/add_quota_dialog.vue'

    export default {
        name: 'levelOne', // 一级指标
        inheritAttrs: false,
        mixins: [subPermission, setPage],
        data () {
            return {
                curEditingItem: {},
                dialog: {isVisible: false},
                items: [],
                selectedItems: [],
                userId: '' // 登录人id
            }
        },
        created () {
            if (this.$ls.get('loginInfo')) {
                this.userId = this.$ls.get('loginInfo').userInfo.id
            }
            this.requestList()
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'del-popover': delPopover,
            addQuota
        },
        methods: {
            async requestList () { // 获取列表
                let res = await requestLevelOneQuota({...this.pageParam, pId: 'a1'})
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
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
            // 分页改变
            changePage(val) {
                this.setPageNum(val)
                this.requestList()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.requestList()
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
            // 判断可不可以编辑和删除
            isOperate(item) {
                return item.createId === this.userId
            }
        }
    }
</script>
