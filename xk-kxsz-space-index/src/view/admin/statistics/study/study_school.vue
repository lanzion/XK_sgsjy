<template>
    <div>
        <dl class="backend-content__middle backend-content__module">
            <dt class="el-form-item__label">截止日期</dt>
            <dd class="el-form-item__content">
                <el-date-picker type="date" placeholder="截止日期" v-model="params.endDate"></el-date-picker>
            </dd>
        </dl>
        <div class="table-layout">
            <v-bar-tab-chart :datas="distributeDatas" title="学习分布" :legend="['年级', '班级', '人群']" class="backend-content__module echart table-cell"></v-bar-tab-chart>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="typeDatas" title="学习分类" centerTitle="学习(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <section class="backend-content__middle">
            <v-tabs class="backend-module__tabs" title="详细数据" :tabs="tabs" :cur_tab="cur_tab" @cur_tab="setCurTab"></v-tabs>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="" label="排名" show-overflow-tooltip>
                    <template scope="scope">
                        {{(pageParam.pageNum - 1) * pageParam.pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="学习数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="className" label="所在班级" show-overflow-tooltip v-if="cur_tab==0"></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import barTabChart from '@/components/common/statis/bar-tab_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import tabs from 'Common/classificationList/classification/tabs.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestStudyDistributeByGrade, requestStudyDistributeByClasz, requestStudyDistributeByCrowd, requestStudyType, requestStudyDetail } from '@/service/statis_school.js'

    export default {
        name: 'statisticsStudySchool', // 学习统计
        components: {
            'v-bar-tab-chart': barTabChart,
            'v-pie-d-chart': pieDoughnutChart,
            'v-tabs': tabs,
            'v-pagination': pagination
        },
        data () {
            return {
                tabs: [
                    { name: '学生', type: 0},
                    { name: '教师', type: 1}
                ],
                cur_tab: 0,
                distributeDatas: [],
                typeDatas: {},
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
            ...mapState('dictionaryCommon', {
                identityDL (state) {
                    let dicList = (state['identityDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            typeParams: function() {
                return Object.assign( {}, this.params )
            },
            detailParams: function() {
                return Object.assign( {}, this.params, { identity: this.tabs[this.cur_tab].type }, this.pageParam )
            }
        },
        watch: {
            typeParams: {
                handler: function (val, oldVal) {
                    this.getTypeData()
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
            // 获取学习分类统计数据
            getTypeData() {
                requestStudyType(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.entity || {},
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
            // 获取学习分布统计数据
            getDistributeData() {
                requestStudyDistributeByGrade(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `学习年级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，学习总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.distributeDatas, 0, _result)
                    }
                })
                requestStudyDistributeByClasz(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `学习班级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，学习总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.distributeDatas, 1, _result)
                    }
                })
                requestStudyDistributeByCrowd(this.typeParams).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _result = {
                            subtext: `学习人群分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，学习总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.distributeDatas, 2, _result)
                    }
                })
            },
            // 获取学习详细数据
            getDetailData() {
                requestStudyDetail(this.detailParams).then(response => {
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
            },
            // 改变详细数据Tab
            setCurTab (index) {
                this.cur_tab = index;
            }
        }
    }
</script>
