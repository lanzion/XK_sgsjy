<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <v-bar-chart :datas="distributeDatas" title="实践分布" class="backend-content__middle backend-content__module echarts"></v-bar-chart>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column label="序号" show-overflow-tooltip>
                    <template scope="scope">
                        {{(pageParam.pageNum - 1) * pageParam.pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
                <el-table-column prop="practiceNum" label="实践数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resultNum" label="成果数" show-overflow-tooltip></el-table-column>
                <template v-if="orgInfo.identity!=='7'">
                    <el-table-column label="下级区域" fixed="right" show-overflow-tooltip v-if="orgInfo.orgId==params.orgId">
                        <template scope="scope">
                            <span class="item-detail" @click="changeOrgId(scope.row.orgId)">查看</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="上级区域" fixed="right" show-overflow-tooltip v-else>
                        <template scope="scope">
                            <span class="item-detail" @click="changeOrgId(params.orgId)">返回</span>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>

    import barChart from '@/components/common/statis/bar_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestPracticeDistribute, requestPracticeDetail } from '@/service/statis_edu.js'

    export default {
        name: 'statisticsPracticeEdu', // 实践统计
        components: {
            'v-bar-chart': barChart,
            'v-pagination': pagination
        },
        data () {
            return {
                distributeDatas: {},
                items: [],
                params: {
                    endDate: new Date(),
                },
                pageParam: {
                    pageNum: 1,
                    pageSize: 5
                },
                page: {}
            }
        },
        props: [
            'orgInfo'
        ],
        computed: {
            endDate: function() {
                let _endDate = new Date()
                if (this.params.endDate <= _endDate) {
                    _endDate = this.params.endDate
                }
                return this.dateFormatFun(_endDate, 'yyyy-MM-dd')
            },
            typeParams: function() {
                return Object.assign( {}, this.params, { endDate: this.endDate } )
            },
            detailParams: function() {
                return Object.assign( {}, this.params, { orgId: this.orgInfo.orgId, endDate: this.endDate }, this.pageParam )
            }
        },
        watch: {
            typeParams: {
                handler: function (val, oldVal) {
                    this.getDistributeData()
                },
                deep: true
            },
            detailParams: {
                handler: function (val, oldVal) {
                    this.getDetailData()
                },
                deep: true
            }
        },
        mounted () {
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
        },
        methods: {
            // 获取实践分布统计数据
            getDistributeData() {
                requestPracticeDistribute(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `实践分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，实践总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.distributeDatas = _result
                    }
                })
            },
            // 获取实践详细数据
            getDetailData() {
                requestPracticeDetail(this.detailParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.page, 'totalNum', _data.totalNum)
                    }
                })
            },
            // 改变分页
            changePage(pageNum) {
                this.$set(this.pageParam, 'pageNum', pageNum);
            },
            // 改变OrgId
            changeOrgId(orgId) {
                this.$set(this.orgInfo, 'orgId', orgId);
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-stage__container {
    .echarts {
        box-sizing: border-box;
        height: 350px;
    }
}
</style>
