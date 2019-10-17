<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">学年学期</dt>
            <dd class="el-form-item__content">
                <el-select v-model="params.termId" placeholder="请选择学年学期">
                    <el-option v-for="item in termList" :key="item.id" :label="item.schoolYear" :value="item.id"></el-option>
                </el-select>
            </dd>
        </dl>
        <div class="table-layout">
            <section class="backend-content__module echart table-cell">
                <ul class="chart-tab">
                    <li class="chart-tab-item" v-for="(item, index) in distributeLegend" :class="{'active': distributeChecked==index}" @click="distributeChecked=index">
                        <b class="chart-tab-block"></b>
                        <span class="chart-tab-txt">{{item}}</span>
                    </li>
                </ul>
                <v-bar-chart v-if="distributeChecked==0" :datas="distributeDatasByGrade" title="评价分布" :isSimple="false" class="full-box"></v-bar-chart>
                <v-bar-chart v-else :datas="distributeDatasByClasz" title="评价分布" :isSimple="false" class="full-box"></v-bar-chart>
            </section>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="typeDatas" title="评价分类" centerTitle="评价(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data.sync="items" style="width: 100%" ref="multipleTable">
                <el-table-column label="序号" width="80" show-overflow-tooltip>
                    <template scope="scope">
                        {{(pageParam.pageNum - 1) * pageParam.pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectGrade" label="项目学习" show-overflow-tooltip></el-table-column>
                <el-table-column prop="courseGrade" label="课程学习" show-overflow-tooltip></el-table-column>
                <el-table-column prop="practiceGrade" label="实训" show-overflow-tooltip></el-table-column>
                <el-table-column prop="activityGrade" label="实践学习" show-overflow-tooltip></el-table-column>
                <el-table-column prop="workGrade" label="作品" show-overflow-tooltip></el-table-column>
                <el-table-column prop="className" label="所在班级" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>

    import barChart from '@/components/common/statis/bar_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestEvaluateDistributeByGrade, requestEvaluateDistributeByClasz, requestEvaluateType, requestEvaluateDetail } from '@/service/statis_school.js'
    import { requestTermList } from '@/service/admin_evaluation.js'

    export default {
        name: 'statisticsStudySchool', // 评价统计
        components: {
            'v-bar-chart': barChart,
            'v-pie-d-chart': pieDoughnutChart,
            'v-pagination': pagination
        },
        data () {
            return {
                distributeSubText: [],
                distributeXAxis: [],
                distributeLegend: ['年级', '班级'],
                distributeChecked: 0,
                distributeDatasByGrade: {},
                distributeDatasByClasz: {},
                typeDatas: {},
                items: [],
                detailColumn: {
                    type: [],
                    status: []
                },
                termList: [],   // 学年学期列表
                params: {
                    termId: '',
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
            typeParams: function() {
                return Object.assign( {}, this.params)
            },
            detailParams: function() {
                return Object.assign( {}, this.params, { orgId: this.orgInfo.orgId }, this.pageParam )
            }
        },
        watch: {
            typeParams: {
                handler: function (val, oldVal) {
                    this.getDistributeData()
                    this.getTypeData()
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
            this.getTermList()
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
        },
        methods: {
            // 获取学年学期数据
            getTermList() {
                requestTermList().then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo || {}
                        this.termList = _data.termList || []
                        // this.$set(this.params, 'termId', _data.termList[0].id || '')
                    }
                })
            },
            // 获取评价分布统计数据
            getDistributeData() {
                requestEvaluateDistributeByGrade(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            xAxis: _data.xAxisData || [],
                            data: _data.legendData || [],
                            legend: _data.legendName || []
                        }
                        this.distributeDatasByGrade = _result
                    }
                })
                requestEvaluateDistributeByClasz(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        // let _subtext = `评价班级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，评价总数: ${_data.total || 0}个`
                        let _result = {
                            xAxis: _data.xAxisData || [],
                            data: _data.legendData || [],
                            legend: _data.legendName || []
                        }
                        this.distributeDatasByClasz = _result
                    }
                })
            },
            // 获取评价分类统计数据
            getTypeData() {
                requestEvaluateType(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        let _result = {
                            legend: _data.dataAxis || [],
                            data: _yAxis || [],
                            center: _data.total || 0
                        }
                        this.typeDatas = _result
                    }
                })
            },
            // 获取评价详细数据
            getDetailData() {
                requestEvaluateDetail(this.detailParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        this.$set(this.$data, 'items', _data.resultData)
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
<style lang='scss' scoped>
    .backend-content__module.echart {
        position: relative;
        .chart-tab {
            position: absolute;
            top: 46px;
            left: 18px;
            color: #ccc;
            z-index: 999;
            .chart-tab-item {
                display: inline-block;
                margin-right: 12px;
                cursor: pointer;
                &:hover {
                    .chart-tab-block {
                        background-color: #e0e0e0;
                    }
                }
                &.active {
                    .chart-tab-txt {
                        color: #3e3e3e;
                    }
                    .chart-tab-block {
                        background-color: #324157;
                    }

                    &:hover {
                        .chart-tab-block {
                            background-color: #365374;
                        }
                    }
                }
            }
            .chart-tab-block {
                display: inline-block;
                width: 26px;
                height: 14px;
                border-radius: 3px;
                background-color: #ccc;
                vertical-align: text-bottom;
            }
        }
        .full-box {
            width: 100%;
            height: 100%;
        }
    }
</style>