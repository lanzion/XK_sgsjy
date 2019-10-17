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
            <v-bar-chart :datas="distributeDatas" :isSimple="false" title="等级分布" class="backend-content__module echart table-cell"></v-bar-chart>
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
                <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
                <el-table-column prop="evaluationNum" label="评价数" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="项目学习">
                    <el-table-column v-for="(project, p) in detailColumn.project" :label="project" :key="p">
                        <template scope="scope">
                            {{scope.row.projectList[p].num}}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="课程学习">
                    <el-table-column v-for="(course, c) in detailColumn.course" :label="course" :key="c">
                        <template scope="scope">
                            {{scope.row.courseList[c].num}}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="实训">
                    <el-table-column v-for="(activity, a) in detailColumn.activity" :label="activity" :key="a">
                        <template scope="scope">
                            {{scope.row.activityList[a].num}}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="作品">
                    <el-table-column v-for="(work, w) in detailColumn.work" :label="work" :key="w">
                        <template scope="scope">
                            {{scope.row.workList[w].num}}
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
    import { requestEvaluateDistribute, requestEvaluateType, requestEvaluateDetail } from '@/service/statis_edu.js'
    import { requestTermList } from '@/service/admin_evaluation.js'

    export default {
        name: 'statisticsEvaluateEdu', // 评价统计
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
                    project: [],
                    course: [],
                    activity: [],
                    work: []
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
                return Object.assign( {}, this.params )
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
                requestEvaluateDistribute(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `评价分布: ${_data.xAxisData ? _data.xAxisData.length : 0}个`,
                            xAxis: _data.xAxisData || [],
                            data: _data.legendData || [],
                            legend: _data.legendName || []
                        }
                        this.distributeDatas = _result
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

                        let _projectColumn = [],
                            _courseColumn = [],
                            _activityColumn = [],
                            _workColumn = []
                        if (_data.resultData.length) {
                            _data.resultData[0].projectList.forEach(x => {
                                _projectColumn.push(x.lineName)
                            })
                            _data.resultData[0].courseList.forEach(x => {
                                _courseColumn.push(x.lineName)
                            })
                            _data.resultData[0].activityList.forEach(x => {
                                _activityColumn.push(x.lineName)
                            })
                            _data.resultData[0].workList.forEach(x => {
                                _workColumn.push(x.lineName)
                            })
                            this.$set(this.detailColumn, 'project', _projectColumn)
                            this.$set(this.detailColumn, 'course', _courseColumn)
                            this.$set(this.detailColumn, 'activity', _activityColumn)
                            this.$set(this.detailColumn, 'work', _workColumn)
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
