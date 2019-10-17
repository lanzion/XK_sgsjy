<template>
    <div class="statistics">
        <div class="header">
            <ul class="item-wrapper clearfix">
                <li v-for="(val, key, index) in totalLabel" class="item fl" :style="{width: (100/Object.keys(totalLabel).length) + '%' }">
                    <figure class="avatar" :style="{backgroundColor: totalColor[index]}">
                        <i :class="['icon-admin-i-statis-' + key]"></i>
                    </figure>
                    <div class="content">
                        <p class="num ellipsis">{{ total[`${key}Num`] || 0 }}</p>
                        <p class="txt">{{ val }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="table-layout">
            <v-bar-tab-chart :datas="worksDistributeDatas" title="作品分布" :legend="['年级', '班级']" class="backend-content__module echart table-cell"></v-bar-tab-chart>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="resourceTypeDatas" title="资源分类" centerTitle="资源(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <div class="table-layout">
            <v-pie-d-chart :datas="courseTypeDatas" title="课程分布" centerTitle="课程(个)" class="backend-content__module echart table-cell third-module"></v-pie-d-chart>
            <div class="table-cell third-module">
                <v-pie-chart :datas="projectTypeDatas" title="项目分布" centerTitle="项目(个)" class="backend-content__module echart"></v-pie-chart>
            </div>
            <div class="small-module table-cell echart">
                <v-bar-chart :datas="subjectStatusDatas" title="在研课题状态分布" class="backend-content__module"></v-bar-chart>
            </div>
        </div>
        <div class="table-layout">
            <v-line-chart :datas="activityPublishDatas" title="近一周活动发布" class="backend-content__module echart table-cell"></v-line-chart>
            <!-- <figure class="backend-content__module echart table-cell">
                <v-echarts :options="activityPublishDatas" theme="lightblue" auto-resize></v-echarts>
            </figure> -->
            <div class="small-module table-cell echart">
                <v-pie-chart :datas="interestTypeDatas" title="兴趣组分布" centerTitle="兴趣组(个)" class="backend-content__module"></v-pie-chart>
            </div>
        </div>
        <div class="backend-content__middle">
            <h6 class="backend-module__title">学生创客统计</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="studyNum" label="学习数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="activityNum" label="实践数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="workNum" label="作品个数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resourceNum" label="资源个数" show-overflow-tooltip></el-table-column>
            </el-table>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>

    import barChart from '@/components/common/statis/bar_chart.vue'
    import barTabChart from '@/components/common/statis/bar-tab_chart.vue'
    import pieSimpleChart from '@/components/common/statis/pie-simple_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import lineChart from '@/components/common/statis/line_chart.vue'
    import { requesSchoolSurvey, requestWorksDistributeByGrade, requestWorksDistributeByClasz, requestResourceType, requestCourseType, requestProjectType, requestResearchSubjectStatus, requestActivityNum, requestInterestType, requestStudent } from '@/service/statis_school.js'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'statisticsOverview', // 统计概况
        components: {
            'v-bar-chart': barChart,
            'v-bar-tab-chart': barTabChart,
            'v-pie-chart': pieSimpleChart,
            'v-pie-d-chart': pieDoughnutChart,
            'v-line-chart': lineChart,
            'v-pagination': pagination
        },
        data () {
            return {
                params: {
                    orgId: '',
                    endDate: ''
                },
                pageParam: {
                    pageNum: 1,
                    pageSize: 5
                },
                page: {},
                total: {
                    teacherNum: 0,
                    studentNum: 0,
                    classNum: 0,
                    productionNum: 0,
                    courseNum: 0,
                    projectNum: 0,
                    activityNum: 0,
                    resourceNum: 0,
                    subjectNum: 0,
                    interestsNum: 0
                },
                totalColor: ['#f85959', '#ea68a2', '#009688', '#009944', '#1bbc9d', '#fe9700', '#e9941a', '#3e50b4', '#2095f2', '#1fbcd4'],
                totalLabel: {
                    teacher: '教师(人)',
                    student: '学生(人)',
                    class: '班级',
                    production: '作品(个)',
                    course: '课程(个)',
                    project: '项目(个)',
                    activity: '活动(个)',
                    resource: '资源(个)',
                    subject: '课题(个)',
                    interests: '兴趣组(个)'
                },
                worksDistributeDatas: [],
                resourceTypeDatas: {},
                courseTypeDatas: {},
                projectTypeDatas: {},
                subjectStatusDatas: {},
                activityPublishDatas: {},
                interestTypeDatas: {},
                items: []
            }
        },
        computed: {
            detailParams: function() {
                return Object.assign( {}, this.params, this.pageParam )
            }
        },
        props: {
            'orgInfo': {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted () {
            if (this.$route.query.id) {
                this.$set(this.orgInfo, 'orgId', this.$route.query.id)
            }
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
            this.getData()
        },
        watch: {
            detailParams: {
                handler: function (val, oldVal) {
                    this.getDetailData()
                },
                deep: true
            }
        },
        methods: {
            getData() {
                // 总量概况
                requesSchoolSurvey(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        Object.keys(_data).forEach(x => {
                            if (_data[x] === null || _data[x] === '') {
                                delete _data[x]
                            }
                        })
                        this.total = _data
                    }
                })
                // 作品分布 - 年级
                requestWorksDistributeByGrade(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.data || {}
                        let _result = {
                            subtext: `作品年级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，作品总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.worksDistributeDatas, 0, _result)
                    }
                })
                // 作品分布 - 班级
                requestWorksDistributeByClasz(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.data || {}
                        let _result = {
                            subtext: `作品班级分布: ${_data.dataAxis ? _data.dataAxis.length : 0}，作品总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: _data.data || []
                        }
                        this.$set(this.worksDistributeDatas, 1, _result)
                    }
                })
                // 资源分类
                requestResourceType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.data || {},
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
                        this.resourceTypeDatas = _result
                    }
                })
                // 课程分布
                requestCourseType(this.params).then(response => {
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
                        this.courseTypeDatas = _result
                    }
                })
                // 项目分布
                requestProjectType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.entity || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        let _result = {
                            subtext: `项目分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，项目总数: ${_data.total || 0}个`,
                            legend: _data.dataAxis || [],
                            data: _yAxis || []
                        }
                        this.projectTypeDatas = _result
                    }
                })
                // 在研课题状态
                requestResearchSubjectStatus(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            // subtext: `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.subjectStatusDatas = _result
                    }
                })
                // 近一周活动发布
                let d = new Date()
                let today = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())
                let lastWeek = new Date(today - (3600 * 1000 * 24 * 7))
                let activityTime = {"startDate": lastWeek, "endDate": today}
                requestActivityNum(Object.assign({}, this.params, activityTime)).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `本周发布活动数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.activityPublishDatas = _result
                    }
                })
                // 兴趣组分布
                requestInterestType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.entity || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        let _result = {
                            subtext: `兴趣组分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，兴趣组总数: ${_data.total || 0}个`,
                            legend: _data.dataAxis || [],
                            data: _yAxis || []
                        }
                        this.interestTypeDatas = _result
                    }
                })
            },
            getDetailData() {
                // 学生创客统计
                requestStudent(this.detailParams).then(response => {
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

<style lang="scss">
    @import "~@/assets/css/scss/table.scss";
    @import "~@/assets/css/scss/admin_back-stage_content.scss";
</style>
<style lang="scss" scoped>
    .header {
        margin-bottom: 16px;

        .item-wrapper {
            border-radius: 5px;
            overflow: hidden;
            .content {
                min-width: 80px;
            }
        }
        .item {
            box-sizing: border-box;
            width: 184px;
            padding: 20px 0;
            text-align: center;
            background-color: #fff;

            &:first-child {
                padding-left: 1px;
            }
        }
        .item + .item {
            border-left: 1px solid #ebf2f4;
        }
        .avatar, .content {
            display: inline-block;
            text-align: center;
            vertical-align: top;
        }
        .avatar {
            $size: 48px;
            width: $size;
            height: $size;
            border-radius: 50%;
            text-align: center;
            overflow: hidden;
            [class*="icon-admin-i-statis-"] {
                color: #fff;
                font-size: 26px;
                line-height: $size;
            }
        }
        .num {
            width: 80px;
            line-height: 1.4;
            font-size: 20px;
            color: #626262;
        }
        .txt {
            font-size: 12px;
            color: #999;
        }
    }
    .echarts {
        width: auto!important;
    }
</style>
