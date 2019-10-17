<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <div class="table-layout">
            <v-bar-chart :datas="distributeDatas" title="课程分布" class="backend-content__module echart table-cell"></v-bar-chart>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="typeDatas" title="课程分类" centerTitle="课程(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column label="序号" width="80" show-overflow-tooltip>
                    <template scope="scope">
                        {{(pageParam.pageNum - 1) * pageParam.pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
                <el-table-column prop="courseNum" label="课程数" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="courseMemberNum" label="课程学员数" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="分类">
                    <el-table-column v-for="(type, t) in detailColumn.type" :label="type" :key="t">
                        <template scope="scope">
                            {{scope.row.typeList[t].countNum}}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="级别">
                    <el-table-column v-for="(status, s) in detailColumn.status" :label="status" :key="s">
                        <template scope="scope">
                            {{scope.row.gradeList[s].countNum}}
                        </template>
                    </el-table-column>
                </el-table-column>
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
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestCourseDistribute, requestCourseType, requestCourseDetail } from '@/service/statis_edu.js'

    export default {
        name: 'statisticsCourseEdu', // 课程统计
        components: {
            'v-bar-chart': barChart,
            'v-pie-d-chart': pieDoughnutChart,
            'v-pagination': pagination
        },
        data () {
            return {
                distributeDatas: {},
                typeDatas: {},
                items: [],
                detailColumn: {
                    type: [],
                    status: []
                },
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
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
        },
        methods: {
            // 获取课程分布统计数据
            getDistributeData() {
                requestCourseDistribute(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `课程分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.distributeDatas = _result
                    }
                })
            },
            // 获取课程分类统计数据
            getTypeData() {
                requestCourseType(this.typeParams).then(response => {
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
            // 获取课程详细数据
            getDetailData() {
                requestCourseDetail(this.detailParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}

                        let _typeColumn = []
                        let _statusColumn = []
                        if (_data.resultData.length) {
                            _data.resultData[0].typeList.forEach(x => {
                                _typeColumn.push(x.lineName)
                            })
                            _data.resultData[0].gradeList.forEach(x => {
                                _statusColumn.push(x.lineName)
                            })
                            this.$set(this.detailColumn, 'type', _typeColumn)
                            this.$set(this.detailColumn, 'status', _statusColumn)
                        }

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
