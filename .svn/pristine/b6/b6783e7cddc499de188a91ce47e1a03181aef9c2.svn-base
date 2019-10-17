<template>
    <div class="contest_manage">
        <h4 class="head-tit">竞赛动态</h4>
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="getSearch"></v-search>
                <button type="button" class="group_button sure fr ml15" @click.prevent="del()">删除</button>
                <router-link :to="{ path: 'dynamicAdd', query: $route.query  }">
                    <button type="button" class="group_button sure fr">新增</button>
                </router-link>
            </section>
            <!-- 竞赛动态列表 -->
            <el-table class="data-table back-stage-table" border :data="dataList" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createName" label="发布人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createDate" label="发布时间">
                    <template slot-scope="scope">
                        {{ scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <button type="button" class="btn" @click="modify(scope.row.id)">编辑</button> |
                        <button type="button" class="btn" @click="del(scope.row)">删除</button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import search from '@/components/common/search.vue'
import { requestDynamicList, requestDynamicDel } from '@/service/manage.js'

export default {
    data() {
        return {
            tips: '请输入标题',
            dataList: [],
            title: '',
            requestParam: {
                matchId: this.$route.query.id,
                title: ''
            },
            checkedItems: []
        }
    },
    methods: {
        del(item) {
            if (this.checkedItems.length || typeof item === 'object') {
                this.$confirm('此操作将该删除该动态，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    if (typeof item === 'object' && Object.keys(item).length > 0) {
                        this.checkedItems = [item]
                    }
                    const delArr = this.checkedItems.map(i => ({
                        id: i.id
                    }))
                    requestDynamicDel(delArr).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getDataList()
                        } else {
                            this.$message({
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                    this.showMessage('info', '已取消删除')
                })
            } else {
                this.showMessage('info', '请选择要删除的动态')
            }
        },
        modify(id) {
            this.$router.push({ path: 'dynamicAdd', query: { id: this.$route.query.id, dynamicId: id, type: this.$route.query.type } })
        },
        getDataList() {
            requestDynamicList(this.requestParam).then((res) => {
                if (res.data.code === 200) {
                    this.dataList = res.data.entity.resultData
                }
            })
        },
        // 设置搜索
        getSearch(val) {
            this.requestParam.title = val
            this.getDataList()
        },
        // 改变选中项
        changeSelection(checked) {
            this.checkedItems = checked
        }
    },
    components: {
        'v-search': search,
    },
    mounted() {
        this.getDataList()
    }
}
</script>

<style lang='scss' scpoed>
@import '~@/assets/css/scss/vars.scss';
.content-box {
    padding: 20px 15px 20px;
    .btn {
        border: none;
        color: $theme-color;
    }
}
</style>