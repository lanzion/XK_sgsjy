<template>
    <div class="award_list">
        <h4 class="head-tit">名额分配</h4>
        <div class="content-box">
            <section class="option-box clearfix">
                <!-- <v-search class="fl" :tips="tips" @search="changeUserName"></v-search> -->
                <div class="fr">
                    <button class="bs-search-button i-form-button" @click="doQuota({isBatch: true})">批量分配</button>
                    <button class="bs-search-button i-form-button" @click="doQuota">分配</button>
                </div>
            </section>
            <el-table class="data-table back-stage-table" border :data.sync="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="orgName" label="区域" show-overflow-tooltip></el-table-column>
                <el-table-column v-for="column in projectColumn" :label="column.name" :key="column.id">
                    <template slot-scope="scope">
                        <template v-for="item in scope.row.mqaid" v-if="item.projectId==column.id">{{item.quotaNum}}</template>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                        <ul class="cols-list b-gray">
                            <li class="cols-item item-detail operate" @click="doQuota({item: scope.row})">修改</li>
                        </ul>
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination :param.sync="pageParam" :changePage="changePage"></v-pagination>
        </div>
        <el-dialog :visible.sync="isVisible" size="small" :title="`上报作品数${isBatch?'批量':''}分配`">
            <v-quota :datas.sync="checkedItems" :project.sync="projectColumn" :isBatch.sync="isBatch" :close="close" :callback="getData"></v-quota>
        </el-dialog>
    </div>
</template>

<script>
    import { loginInfo } from '@/assets/js/getUserInfo.js'
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'
    import quota from '@/components/manage/quota/quota_subLevel_works.vue'
    import { requestQuotaList } from '@/service/manage.js'

    const phaseList = { // 阶段类型(身份: 类型) 1.校级评比2.区县评比3.市级评比4.省级评比5.国家级评比
        5: 5,
        10: 4,
        6: 3,
        7: 2,
        9: 1
    }

    export default {
        name: 'expert_list',
        components: {
            'v-search': search,
            'v-pagination': pagination,
            'v-quota': quota
        },
        data() {
            return {
                tips: '请输入姓名',
                projectColumn: [],
                items: [],
                search: {
                    matchId: this.$route.query.id,
                    phaseId: phaseList[loginInfo.userInfo.identity],
                    userName: ''
                },
                pageParam: {
                    pageSize: 10,
                    pageNum: 1
                },
                isVisible: false,
                isBatch: false,
                disabled: false,
                checkedItems: []
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                requestQuotaList(this.search, this.pageParam).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data || {}
                        this.items = _data.entity.resultData || []
                        this.projectColumn = _data.appendInfo.project || []
                        // curPhaseStatus: 阶段状态 (1. 未开始 2.进行中 3.已结束)
                        this.disabled = Number(_data.appendInfo.curPhaseStatus) === 3
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    }
                })
            },
            doQuota({ item, isBatch = false }) {
                if (this.disabled) {
                    this.$message('当前赛程阶段已结束，不能进行名额分配')
                    return
                }
                this.isBatch = isBatch
                this.isVisible = true
                this.checkedItems = []
                if (item) {
                    this.checkedItems = [item]
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
            close() {
                this.isVisible = false
            }
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