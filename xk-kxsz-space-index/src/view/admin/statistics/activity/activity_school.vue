<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <div class="table-layout">
            <v-bar-chart :datas="typeDatas" title="活动分类" class="backend-content__module echart table-cell"></v-bar-chart>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="statusDatas" title="活动状态" centerTitle="活动(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <section class="backend-content__middle">
            <h6 class="backend-module__title">详细数据</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="title" label="活动名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userName" label="负责人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="memberNum" label="参与人数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resultNum" label="成果数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="discussNum" label="讨论数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="活动状态" show-overflow-tooltip>
                    <template scope="scope" show-overflow-tooltip>
                        {{scope.row.status | translate(activeStateDL)}}
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import barChart from '@/components/common/statis/bar_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestActivityType, requestActivityStatus, requestActivityDetail } from '@/service/statis_school.js'

    export default {
        name: 'statisticsActivitySchool', // 活动统计
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
                activeStateDL (state) {
                    let dicList = (state['activeStateDicList'] || {}).dicList || []
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
            // 获取活动分类统计数据
            getTypeData() {
                requestActivityType(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `活动分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，活动总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.typeDatas = _result
                    }
                })
            },
            // 获取活动状态统计数据
            getStatusData() {
                requestActivityStatus(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.entity || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: this.translateFun(_data.dataAxis[i], this.activeStateDL) })
                        })

                        let _result = {
                            legend: this.activeStateDL || [],
                            data: _yAxis || [],
                            center: _data.total || 0
                        }
                        this.statusDatas = _result
                    }
                })
            },
            // 获取活动详细数据
            getDetailData() {
                requestActivityDetail(this.detailParams).then(response => {
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
