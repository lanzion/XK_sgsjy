<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.userName" @keyup.native.enter="changePage(1)" placeholder="请输入姓名"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel
        }"></v-admin-operate>
        <!-- 评审专家列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="userName" label="姓名" width="220" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="provinceName" label="所在区域" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="unit" label="所在单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="联系电话" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="联系地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        del: doDel
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
    import { requestContestExpert, delContestExpert } from '@/service/admin_contest.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'

    export default {
        name: 'contestExpertManage',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                search: {
                    userName: '',
                },
                items: [],
                checkedItems: [],            // 选中项
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.pageParam )
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            /*
             * 获取评审专家列表
             */
            getData() {
                requestContestExpert(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    } else {
                        this.showMessage('error',response.data.msg)
                    }
                })
            },
            // 评审专家删除
            doDel({data:item} = {data}){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该评审专家，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delContestExpert(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({message: res.data.msg})
                            };
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: '请选择要删除的评审专家' })
                }
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
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
        }
    }
</script>
