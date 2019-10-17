<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input v-model.trim="keyWords" class="fl bs-search-input" placeholder="请输入评价标签" :maxlength="10" @keyup.native.enter="changePage(1)"></el-input>
            <button @click="changePage(1)" class="fl bs-search-button i-form-button is-plain">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{del: showMessageBox}"></v-admin-operate>
        <el-table @select="handleSelect" @select-all="handleSelect" :data="items" class="data-table back-stage-table" border style="width: 100%">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="评价标签" width="180" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="labelType" label="分类" sortable>
                <template scope="scope">
                    <span>{{handleTagType(scope.row.labelType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createName" label="发布人" sortable></el-table-column>
            <el-table-column prop="createDate" label="发布时间" sortable show-overflow-tooltip width="180">
                <template scope="scope">
                    <span>{{scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="评价数" sortable>
                <template scope="scope">
                    <span>{{scope.row.num || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{del: deleteItem}"/>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestAdminTagList, deleteTags, deleteTag } from '@/service/admin_system.js'
    import pagination from '@/components/common/admin_pagination.vue'
    import adminOperate from '@/components/common/operate.vue'

    export default {
        name: 'sysTag', // 后台系统管理-标签管理
        mixins: [subPermission, setPage],
        data () {
            return {
                items: [], // 列表
                labelTypes: [
                    {name: '课程评价', val: '1'},
                    {name: '项目评价', val: '2'},
                    {name: '实训评价', val: '3'},
                    {name: '资源评价', val: '4'},
                    {name: '微课评价', val: '5'}
                ], // 标签类型
                keyWords: '', // 搜索关键词
            }
        },
        computed: {},
        created () {
            this.requestList()
            this.selectedItems = [] // 选中的标签数组
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
        },
        methods: {
            async requestList () { // 获取标签列表
                let res = await requestAdminTagList({...this.pageParam, name: this.keyWords || undefined})
                if (res.status === 200 && res.data.code === 200) {
                    let entity = res.data.entity || {}
                    this.items = entity.resultData || []
                    this.$set(this.pageParam, 'totalNum', entity.totalNum || 0)
                }
            },
            async deleteItem ({data} = {}) { // 删除标签
                try {
                    let res = await deleteTag({id: data.id})
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除标签', duration: 1500})
                        this.requestList()
                        return
                    }
                    this.$message.error(res.data.msg || '删除标签失败，请重试')
                } catch (e) {
                    this.$message.error('删除标签失败，请重试')
                }
            },
            async deleteItems () { // 批量删除标签
                try {
                    let res = await deleteTags(this.selectedItems)
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除您选择的标签', duration: 1500})
                        this.requestList()
                        this.selectedItems.splice(0)
                        return
                    }
                    this.$message.error(res.data.msg || '删除标签失败，请重试')
                } catch (e) {
                    this.$message.error('删除标签失败，请重试')
                }
            },
            handleSelect (selectedArr) { // 选中标签，加入删除的数组
                this.selectedItems = selectedArr.map(item => ({id: item.id})) || []
            },
            handleTagType (type) { // 处理标签类型
                let source = {
                    1: '课程评价',
                    2: '项目评价',
                    3: '实训评价',
                    4: '资源评价',
                    5: '微课评价'
                }
                return source[type]
            },
            search () { // 搜索标签列表
                if (this.keyWords === '') {
                    this.$message('请输入标签名称')
                    return
                }
                this.requestList()
            },
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
                    this.$message({type: 'info', message: '请先选择需要删除的标签', duration: 1500})
                    return
                }
                this.$confirm('您确定要删除选中的标签吗？', '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    this.deleteItems()
                }).catch(e => {})
            }
        }
    }
</script>
