<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <v-bar-tab-chart :datas="distributeDatas" title="实践分布" :legend="['年级', '班级']" class="backend-content__middle backend-content__module echarts"></v-bar-tab-chart>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="" label="排名" show-overflow-tooltip>
                    <template scope="scope">
                        {{(pageParam.pageNum - 1) * pageParam.pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="实践数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="className" label="所在班级" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
    import barTabChart from '@/components/common/statis/bar-tab_chart.vue'
    import tabs from 'Common/classificationList/classification/tabs.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestPracticeDistributeByGrade, requestPracticeDistributeByClasz, requestPracticeDetail } from '@/service/statis_school.js'

    export default {
        name: 'statisticsWorksSchool', // 实践统计
        components: {
            'v-bar-tab-chart': barTabChart,
            'v-tabs': tabs,
            'v-pagination': pagination
        },
        data () {
            return {
                distributeDatas: [],
                items: [],
                params: {
                    endDate: ''
                },
                detailsIdentity: 0,
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
            typeParams: function() {
                return Object.assign( {}, this.params )
            },
            detailParams: function() {
                return Object.assign( {}, this.params, this.pageParam )
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
                requestPracticeDistributeByGrade(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `实践年级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，实践总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.distributeDatas, 0, _result)
                    }
                })
                requestPracticeDistributeByClasz(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `实践班级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，实践总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.distributeDatas, 1, _result)
                    }
                })
            },
            // 获取实践详细数据
            getDetailData() {
                requestPracticeDetail(this.detailParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.page, 'totalNum', _data.totalNum || 0)
                    }
                })
            },
            // 改变分页
            changePage(pageNum) {
                this.$set(this.pageParam, 'pageNum', pageNum);
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-stage__container {
    .echarts {
        box-sizing: border-box;
        width: 100%;
        height: 350px;
    }
}
</style>
