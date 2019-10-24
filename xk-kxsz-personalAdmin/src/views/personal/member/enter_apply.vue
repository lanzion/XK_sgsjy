<template>
    <div id="enter_invite" class="enter_invite backend-content__middle" style="padding-top: 10px;">
        <div class="search-box clearfix">
            <v-search :tips="tips" @search="getSearch" style="float:left;"></v-search>
        </div>
        <section class="list-box">
            <el-table class="data-table back-stage-table" :data="applyList" style="width: 100%">
                <el-table-column prop="linkMan" label="申请人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="applyDate" label="申请时间" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.applyDate | dateFormat('yyyy.MM.dd') }}</template>
                </el-table-column>
                <el-table-column prop="linkMan" label="联系人"></el-table-column>
                <el-table-column prop="mobile" label="联系电话" show-overflow-tooltip></el-table-column>
                <el-table-column prop="content" label="入驻说明" show-overflow-tooltip></el-table-column>
                <el-table-column prop="businessPlan" label="商业策划书">
                    <template slot-scope="scope">
                        <!-- <a :href="downloadUrl(scope.row.businessPlan, scope.row.businessPlan)" :download="scope.row.businessPlan" :title="scope.row.businessPlan" class="business-plan">{{scope.row.businessPlan}}</a> -->
                        <a href="javascript:;" @click="downloadUrl(scope.row.businessPlan, scope.row.businessPlan)" :title="scope.row.businessPlan" class="business-plan">{{scope.row.businessPlan}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="状态" width="120">
                    <template slot-scope="scope">
                        <div>{{statusType[scope.row.auditStatus]}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <div v-if="scope.row.auditStatus === 0">
                            <a href="javaScript:;" class="invite-btn" @click="modifyApply(scope.row.id,1,scope.$index)">同意入驻</a>
                            <a href="javaScript:;" class="invite-btn" @click="modifyApply(scope.row.id,2,scope.$index)">拒绝入驻</a>
                        </div>
                        <div v-else>无操作</div>
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
    import { requestEnterApplyList, modifyApply } from '@/service/mult.js'

    export default {
        name: 'enter_invite',
        components: {
            vSearch,
            vPagination
        },
        data() {
            return {
                tips: '请输入姓名',
                applyList: [],
                multId: '',
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
                search: ''
            }
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.multId = this.$ls.get('loginInfo').userInfo.baseId
            }
        },
        mounted() {
            this.getapplyList()
        },
        methods: {
            getSearch(val) {
                this.search = val
                this.getapplyList()
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getapplyList()
            },
            // 获取邀约列表
            getapplyList() {
                const params = {
                    multId: this.multId,
                    userName: this.search
                }
                requestEnterApplyList(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.applyList = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // 同意或拒绝入驻
            modifyApply(id, status, index) {
                const msg = status === 1 ? '同意入驻' : '拒绝入驻'
                this.$confirm(`此操作将${msg}，是否继续？`, '温馨提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  customClass: '__custom-msg-box'
                }).then(() => {
                    const params = {
                        id: id,
                        auditId: this.$ls.get('loginUId'),
                        auditStatus: status
                    }
                    modifyApply(params).then((res) => {
                        if (res.data.code === 200) {
                            this.$set(this.$data.applyList[index], 'auditStatus', status)
                            this.showMessage('success', '已' + msg)
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                  this.showMessage('info', '已取消操作')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .enter_invite{
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
        .invite-btn{
            border: 1px solid #ddd;
            padding: 1px 3px;
            border-radius: 3px;
            &:hover{
                border-color: $theme_color;
                color: $theme_color;
            }
        }
    }
</style>