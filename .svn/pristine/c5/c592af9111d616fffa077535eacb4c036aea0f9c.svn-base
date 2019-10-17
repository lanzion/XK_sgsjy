<template>
    <div class="backend-content__middle">
        <el-form :inline="true" :model="search" class="option-box clearfix">
            <el-form-item label="岗位名称">
                <el-input class="bs-search-input" v-model="search.positionName" @keyup.native.enter="changePage(1)" placeholder="请输入岗位名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="search.status" placeholder="请选择岗位状态" clearable>
                    <el-option v-for="item in recruitStatusDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            </el-form-item>
        </el-form>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: { callback: del }
        }"></v-admin-operate>
        <!-- 招聘列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="工作职位" show-overflow-tooltip prop="positionName">
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/configure/recruit/detail', query: {id: scope.row.id} }">{{scope.row.positionName}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="部门" show-overflow-tooltip prop="department" width="120"></el-table-column>
            <el-table-column label="发布日期" show-overflow-tooltip prop="120">
                <template scope="scope">
                    {{ scope.row.createTime | dateFormat('yyyy-MM-dd') }}
                </template>
            </el-table-column>
            <el-table-column prop="money" label="薪资待遇" show-overflow-tooltip></el-table-column>
            <el-table-column prop="education" label="学历" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workYear" label="工作年限" show-overflow-tooltip></el-table-column>
            <el-table-column prop="recruitNum" label="招聘人数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" width="80" show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success" v-if="Number(scope.row.status)">启用</el-tag>
                    <el-tag class="__color-hot" v-else>停用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        start: { callback: startOperate, isActive: isStart },
                        stop: { callback: startOperate, isActive: isStop },
                        del: { callback: del }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestRecruitList, deleteRecruit, modifyRecruitStatus } from '@/service/admin_configure.js'
    import { requestDictComb } from '@/service/common.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'recruit',
        components: {
            'v-pagination': pagination,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage], // 混入
        data() {
            return {
                search: {
                    positionName: '',
                    status: ''
                }, // 搜索
                _search: {},
                items: [], // 列表数据
                checkedItems: [],            // 选中项
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                recruitStatusDL (state) {
                    let dicList = (state['recruitStatusDicList'] || {}).dicList || []
                    return dicList
                }
            })
        },
        mounted() {
            this.getData()
        },
        methods: {
            // 删除
            del ({ data: item } = { data }) {
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    this.$confirm('确定要删除该招聘信息吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        deleteRecruit(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({ message: res.data.msg })
                            };
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({message: '请选择要删除的招聘信息'})
                }
            },
            /*
             * 获取列表
             */
            getData() {
                requestRecruitList(this.search, this.pageParam ).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    }
                })
            },
            /*
             * 启用/停用操作
             * id: ''
             * status：状态(1: 启用, 0: 停用)
             */
            startOperate({data: item, model} = {data, model}){
                let params = []
                let text = model == 'start' ? '启用' : '停用'
                let status = model == 'start' ? 1 : 0
                let form = { id: item.id, status: status }

                this.$confirm(`此操作将${text}该招聘信息，是否继续？`, text, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    modifyRecruitStatus(form).then((res) => {
                        if(res.data.code === 200){
                            this.$message({type: 'success', message: `${text}成功` })
                            item.status = status
                        }else{
                            this.$message.error(res.data.msg)
                        }
                        this.$refs.multipleTable.clearSelection()
                    })
                }).catch(() => {})
            },
            // 判断是否启用
            isStart(item) {
                return !Number(item.status)
            },
            // 判断是否停用
            isStop(item) {
                return Number(item.status)
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            },
        }
    }
</script>
