<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input v-model.trim="keyWords" class="fl bs-search-input" placeholder="请输入学年学期" :maxlength="10" @keyup.native.enter="changePage(1)"></el-input>
            <button @click="changePage(1)" class="fl bs-search-button i-form-button is-plain">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{add: addItem, del: showMessageBox}"></v-admin-operate>
        <el-table @select="handleSelect" @select-all="handleSelect" :data="items" class="data-table back-stage-table" border style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="schoolYear" label="学年学期" sortable>
            </el-table-column>
            <el-table-column prop="startDate" label="开始时间" sortable>
                <template scope="scope">
                    <span>{{scope.row.startDate | dateFormat('yyyy-MM-dd')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="结束时间" sortable>
                <template scope="scope">
                    <span>{{scope.row.endDate | dateFormat('yyyy-MM-dd')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{time: editItem, del: deleteItem}"/>
                    <!-- <a @click.stop="editItem(scope.row)" href="javascript:;" class="set-date__btn">设置起止日期</a> -->
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <set-date-dialog v-if="dialog.isVisible" v-bind="{dialog, curEditingTerm, handleRequest: requestList}"/>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestTermList, deleteTerms, deleteTerm } from '@/service/admin_system.js'
    import pagination from '@/components/common/admin_pagination.vue'
    import setDateDialog from '@/components/system/set_date_dialog.vue'
    import adminOperate from '@/components/common/operate.vue'

    export default {
        name: 'sysTerm', // 后台系统管理-学期管理
        mixins: [subPermission, setPage],
        data () {
            return {
                curEditingTerm: {}, // 当前编辑的学期信息
                dialog: {isVisible: false},
                items: [], // 列表
                keyWords: '', // 搜索关键词
            }
        },
        computed: {},
        created () {
            this.requestList()
            this.selectedItems = [] // 选中的学年学期数组
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            setDateDialog
        },
        methods: {
            async requestList () { // 获取学年学期列表
                let res = await requestTermList({...this.pageParam, schoolYear: this.keyWords || undefined})
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
            },
            async deleteItem ({data} = {}) { // 删除学年学期
                try {
                    this.$confirm('确定该删除该学期吗？', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        deleteTerm({id: data.id}).then(res => {
                            if (res.data.code === 200) {
                                this.$message({type: 'success', message: '成功删除学年学期', duration: 1500})
                                this.requestList()
                                return
                            }
                            this.$message.error(res.data.msg || '删除学年学期失败，请重试')
                        })
                    }).catch(() => {})
                } catch (e) {
                    this.$message.error('删除学年学期失败，请重试')
                }
            },
            async deleteItems () { // 批量删除学年学期
                try {
                    this.$confirm('确定该删除该学期吗？', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        deleteTerms(this.selectedItems).then(res => {
                            if (res.data.code === 200) {
                                this.$message({type: 'success', message: '成功删除学年学期', duration: 1500})
                                this.requestList()
                                this.selectedItems.splice(0)
                                return
                            }
                            this.$message.error(res.data.msg || '删除学年学期失败，请重试')
                        })
                    }).catch(() => {})
                } catch (e) {
                    this.$message.error('删除学年学期失败，请重试')
                }
            },
            addItem () {
                this.dialog.isVisible = true
                this.curEditingTerm = {}
            },
            editItem ({data} = {}) {
                this.dialog.isVisible = true
                this.curEditingTerm = {...data, action: 'edit'}
            },
            handleSelect (selectedArr) { // 选中学年学期，加入删除的数组
                this.selectedItems = selectedArr.map(item => ({id: item.id})) || []
            },
            search () { // 搜索学年学期列表
                if (this.keyWords === '') {
                    this.$message('请输入学年学期名称')
                    return
                }
                this.requestList()
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
            showMessageBox () { // 显示批量删除提示框
                if (this.selectedItems.length === 0) {
                    this.$message({type: 'info', message: '请先选择需要删除的学年学期', duration: 1500})
                    return
                }
                this.$confirm('您确定要删除选中的学年学期吗？', '提示', {
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    this.deleteItems()
                }).catch(e => {})
            }
        }
    }
</script>
