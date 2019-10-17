<template>
    <div class="award_list">
        <h4 class="head-tit">评审专家</h4>
        <div class="content-box">
            <section class="option-box clearfix">
                <v-search class="fl" :tips="tips" @search="changeUserName"></v-search>
                <div class="fr">
                    <router-link tag="button" :to="{path: '/contest/manage/expert/add', query: $route.query}" class="bs-search-button i-form-button">添加</router-link>
                    <button class="bs-search-button i-form-button" @click="doDel">删除</button>
                </div>
            </section>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="userName" label="姓名" show-overflow-tooltip width="60"></el-table-column>
                <el-table-column prop="provinceName" label="区域" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                    </template>
                </el-table-column>
                <el-table-column prop="unit" label="所在单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="110"></el-table-column>
                <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="联系地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectListString" label="评审项目" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <ul class="cols-list b-gray">
                            <router-link tag="li" :to="{path: '/contest/manage/expert/edit', query: Object.assign({}, $route.query, { erId: scope.row.relationId})}" class="cols-item item-detail operate">编辑</router-link><li class="cols-item item-detail operate" @click="doDel({item: scope.row})">删除</li>
                        </ul>
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
    // import { loginInfo } from '@/assets/js/getUserInfo.js'
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestContestExpertList, delExpert } from '@/service/manage.js'

    // const phaseList = { // 阶段类型(身份: 类型) 1.校级评比2.区县评比3.市级评比4.省级评比5.国家级评比
    //     5: 5,
    //     10: 4,
    //     6: 3,
    //     7: 2,
    //     9: 1
    // }

    export default {
        name: 'expert_list',
        components: {
            'v-search': search,
            'v-pagination': pagination
        },
        data() {
            return {
                tips: '请输入姓名',
                items: [],
                checkedItems: [],
                screeningDropdown: false, // 高级搜索显示控制
                search: {
                    matchId: this.$route.query.id,
                    // phaseId: phaseList[loginInfo.userInfo.identity],
                    userName: ''
                },
                pageParam: {
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                requestContestExpertList(this.search, this.pageParam).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    }
                })
            },
            doDel({ item }) {
                const params = []
                const items = item === undefined ? this.checkedItems : [item]
                if (items.length) {
                    this.$confirm('此操作将删除该评审专家，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        items.forEach((x) => {
                            params.push({ id: x.relationId })
                        })
                        delExpert(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({ message: '删除成功', type: 'success' })
                                this.getData()
                            } else {
                                this.$message.error({ message: res.data.msg })
                            }
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({ message: '请选择要删除的评审专家' })
                }
            },
            // 地区改变
            changeRegion(items) {
                const _region = {}
                const [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
            },
            // 改变搜索框
            changeUserName(val) {
                this.$set(this.search, 'userName', val)
                this.getData()
            },
            // 改变分页
            changePage(val) {
                this.$set(this.pageParam, 'pageNum', val)
                this.getData()
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
        }
    }
</script>

<style lang="scss">
    .content-box {
        .el-table {
            .cell {
                padding-left: 0px;
                padding-right: 0px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/cols.scss';
    @import '~@/assets/css/scss/table.scss';
    .content-box {
        padding: 20px 15px 20px;
        .option-box {
            margin-bottom: 25px;
        }
    }
</style>