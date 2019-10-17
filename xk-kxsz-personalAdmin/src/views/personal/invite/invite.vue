<template>
    <div id="invite" class="invite backend-content__middle">
        <header class="head">邀约列表</header>
        <div class="search-box clearfix">
            <v-search :tips="tips" @search="getSearch" style="float:left;"></v-search>
        </div>
        <section class="list-box">
            <el-table class="data-table back-stage-table" :data="inviteList" style="width: 100%">
                <el-table-column prop="name" label="商业策划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userName" label="发布人"></el-table-column>
                <el-table-column prop="seduceDate" label="邀约时间" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.seduceDate | dateFormat('yyyy.MM.dd') }}</template>
                </el-table-column>
                <el-table-column prop="realMoney" label="融资金额(元)" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.realMoney != null ? scope.row.realMoney.toFixed(2) : '0.00'}} 元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                        <div>{{inviteStatus[scope.row.status]}}</div>
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
    import { requestInviteList } from '@/service/invite.js'

    export default {
        name: 'invite',
        components: {
            vSearch,
            vPagination
        },
        data() {
            return {
                visible: {
                    show: false
                },
                type: 3,

                tips: '请输入商业策划',
                inviteList: [],
                selected: {
                    linkMan: '',
                    seduceId: '',
                    status: null
                },
                pageParam: {
                    totalNum: 0,
                    pageNum: 1,
                    pageSize: 5
                },
                inviteStatus: {
                    1: '邀约中',
                    2: '洽谈中',
                    3: '邀约成功',
                    4: '邀约失败'
                },
                inviteId: ''
            }
        },
        mounted() {
            this.getInviteList()
        },
        computed: {
            params: function () {
                return Object.assign({}, this.selected)
            }
        },
        watch: {

        },
        methods: {
            getSearch(val) {
                this.selected.linkMan = val
                this.getInviteList()
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.getInviteList()
            },
            // 获取邀约列表
            getInviteList() {
                const params = {
                    seduceId: this.$ls.get('loginUId'),
                    name: this.selected.linkMan,
                    status: this.selected.status
                }
                requestInviteList(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.inviteList = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // /*scope.$index*/
            // modifyInvite(id, status, index) {
            //     modifyInvite({ id: id, status: status }).then((res) => {
            //         if (res.data.code === 200) {
            //             this.inviteList[index].status = status
            //             if (status === 2) {
            //                 this.showMessage('success', '已同意邀约')
            //             } else if (status === 4) {
            //                 this.showMessage('success', '已拒绝邀约')
            //             }
            //         } else {
            //             this.showMessage('error', res.data.msg)
            //         }
            //     })
            // }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .invite{
        .head{
            font-size: 18px;
            margin-bottom: 20px;
        }
        .search-box{
            margin-bottom: 20px;
        }
        .btn-box{
            margin-top: 20px;
            text-align: right;
            .close-btn{
                border: none;
                padding: 6px 15px;
                font-size: 14px;
                color: #fff;
                &:hover{
                    opacity: 0.75;
                }
            }
        }
    }
</style>