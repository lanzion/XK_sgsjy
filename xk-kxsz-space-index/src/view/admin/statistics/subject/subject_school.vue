<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <div class="table-layout">
            <v-bar-chart :datas="typeDatas" title="课题领域" class="backend-content__module echart table-cell"></v-bar-chart>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="statusDatas" title="课题状态" centerTitle="课题(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="课题" show-overflow-tooltip></el-table-column>
                <el-table-column prop="subjectLevel" label="级别" show-overflow-tooltip>
                    <template scope="scope">
                        {{scope.row.subjectLevel | translate(subjectLevelDL, {key: 'id'})}}
                    </template>
                </el-table-column>
                <el-table-column prop="memberNum" label="成员数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taskNum" label="任务数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="activityNum" label="活动数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resultNum" label="成果数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="discussNum" label="讨论数" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import barChart from '@/components/common/statis/bar_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestSubjectType, requestSubjectStatus, requestSubjectDetail } from '@/service/statis_school.js'

    export default {
        name: 'statisticsSubjectSchool', // 课题统计
        components: {
            'v-bar-chart': barChart,
            'v-pie-d-chart': pieDoughnutChart,
            'v-pagination': pagination
        },
        data () {
            return {
                typeDatas: {},
                statusDatas: {},
                items: [],
                params: {
                    endDate: ''
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
            ...mapState('dictionaryCommon', {
                subjectLevelDL (state) {
                    let dicList = (state['subjectLevelDicList'] || {}).dicList || []
                    return dicList
                }
            }),
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
                    this.getTypeData()
                    this.getStatusData()
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
            // 获取课题分类统计数据
            getTypeData() {
                requestSubjectType(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `课题领域: ${_data.dataAxis ? _data.dataAxis.length : 0}，课题总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.typeDatas = _result
                    }
                })
            },
            // 获取课题状态统计数据
            getStatusData() {
                requestSubjectStatus(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i] })
                        })

                        let _result = {
                            legend: _data.dataAxis || [],
                            data: _yAxis || [],
                            center: _data.total || 0
                        }
                        this.statusDatas = _result
                    }
                })
            },
            // 获取课题详细数据
            getDetailData() {
                requestSubjectDetail(this.detailParams).then(response => {
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
            }
        }
    }
</script>
