<template>
    <div id="apply" class="apply backend-content__middle" style="padding-top: 10px;">
        <div class="search-box clearfix">
            <v-search :tips="tips" @search="getSearch" style="float:left;"></v-search>
        </div>
        <section class="list-box">
            <el-table class="data-table back-stage-table" :data="applyList" style="width: 100%">
                <el-table-column prop="multName" label="众创空间" show-overflow-tooltip>
                    <template slot-scope='scope'>
                        <router-link :to="{ path: `${host}/multSpace/detail`,query: { id: scope.row.multId } }">{{scope.row.multName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.applyDate | dateFormat('yyyy.MM.dd') }}</template>
                </el-table-column>
                <el-table-column prop="linkMan" label="联系人"></el-table-column>
                <el-table-column prop="mobile" label="联系电话" show-overflow-tooltip></el-table-column>
                <el-table-column prop="content" label="入驻说明" show-overflow-tooltip></el-table-column>
                <el-table-column prop="businessPlan" label="商业策划书" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a :href="downloadUrl(scope.row.businessPlan, scope.row.businessPlan)" :download="scope.row.businessPlan" class="business-plan">{{scope.row.businessPlan}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="状态" width="80">
                    <template slot-scope="scope">
                        <div>{{statusType[scope.row.auditStatus]}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
    import vSearch from 'Common/search.vue'
    import vPagination from 'Common/pagination.vue'
    import { requestEnterApplyList } from '@/service/mult.js'

    export default {
        name: 'apply',
        components: {
            vSearch,
            vPagination
        },
        data() {
            return {
                tips: '请输入众创空间',
                applyList: [],
                pageParam: {
                    totalNum: 0,
                    pageNum: 1,
                    pageSize: 5
                },
                statusType: {
                    0: '申请中',
                    1: '同意入驻',
                    2: '拒绝入驻'
                },
                multName: ''
            }
        },
        mounted() {
            this.getapplyList()
        },
        methods: {
            getSearch(val) {
                this.multName = val
                this.getapplyList()
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getapplyList()
            },
            // 获取邀约列表
            getapplyList() {
                const params = {
                    applyId: this.$ls.get('loginUId'),
                    multName: this.multName
                }
                requestEnterApplyList(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.applyList = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .apply{
        .head{
            font-size: 18px;
            margin-bottom: 20px;
        }
        .search-box{
            margin-bottom: 20px;
        }
        .business-plan{
            &:hover{
                color: $theme_color;
            }
        }
    }
</style>