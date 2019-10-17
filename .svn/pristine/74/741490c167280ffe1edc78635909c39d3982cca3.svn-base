<template>
    <div class="fb-statistics">
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
            <v-bar-chart :datas="schoolSpaceDatas" title="学校创客空间统计" class="backend-content__module echart table-cell"></v-bar-chart>
            <div class="small-module table-cell echart">
                <v-bar-chart :datas="subjectTypeDatas" title="课题分布" class="backend-content__module"></v-bar-chart>
            </div>
        </div>
        <div class="table-layout">
            <v-pie-d-chart :datas="worksTypeDatas" title="作品分布" centerTitle="作品(个)" class="backend-content__module echart table-cell third-module"></v-pie-d-chart>
            <div class="table-cell third-module">
            <v-pie-chart :datas="courseTypeDatas" title="活动分布" centerTitle="活动(个)" class="backend-content__module echart"></v-pie-chart>
            </div>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="projectTypeDatas" title="项目分类" centerTitle="项目(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <div class="table-layout">
            <v-pie-d-chart :datas="resourceTypeDatas" title="资源分布" centerTitle="资源(个)" class="backend-content__module echart table-cell third-module"></v-pie-d-chart>
            <div class="table-cell third-module">
                <v-pie-chart :datas="activityTypeDatas" title="活动分布" centerTitle="活动(个)" class="backend-content__module echart"></v-pie-chart>
            </div>
            <div class="small-module table-cell echart">
                <v-pie-d-chart :datas="interestTypeDatas" title="兴趣组分布" centerTitle="兴趣组(个)" class="backend-content__module"></v-pie-d-chart>
            </div>
        </div>
        <div class="backend-content__middle">
            <h6 class="backend-module__title">区域详情</h6>
            <div class="table-box">
                <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                    <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="schoolNum" label="学校数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="classNum" label="班级数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="teacherNum" label="教师数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="studentNum" label="学生数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="productionNum" label="作品数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="courseNum" label="课程数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectNum" label="项目数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="activityNum" label="活动数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="resourceNum" label="资源个数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="subjectNum" label="课题数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="interestsNum" label="兴趣组数" show-overflow-tooltip></el-table-column>
                </el-table>
                <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import barChart from '@/components/common/statis/bar_chart.vue'
    import pieSimpleChart from '@/components/common/statis/pie-simple_chart.vue'
    import pieDoughnutChart from '@/components/common/statis/pie-doughnut_chart.vue'
    import { requesEduSurvey, requesAreaSchoolSpace, requestSubjectType, requestWorksType, requestCourseType, requestProjectType, requestResourceType, requestActivityType, requestInterestType, requesAreaDetail } from '@/service/statis_edu.js'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'statisticsOverview', // 统计概况
        components: {
            'v-bar-chart': barChart,
            'v-pie-chart': pieSimpleChart,
            'v-pie-d-chart': pieDoughnutChart,
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
                schoolSpaceDatas: {},
                subjectTypeDatas: {},
                worksTypeDatas: {},
                courseTypeDatas: {},
                projectTypeDatas: {},
                resourceTypeDatas: {},
                activityTypeDatas: {},
                interestTypeDatas: {},
                items: []
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
            this.$set(this.params, 'endDate', this.dateFormatFun(new Date(), 'yyyy-MM-dd'))
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
            this.getData()
        },
        methods: {
            getData() {
                // 总量概况
                requesEduSurvey(this.params).then(response => {
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
                // 学校创客空间统计
                requesAreaSchoolSpace(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            subtext: `区域: ${_data.dataAxis ? _data.dataAxis.length : 0}，创客空间总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.schoolSpaceDatas = _result
                    }
                })
                // 课题领域
                requestSubjectType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _result = {
                            // subtext: `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`,
                            xAxis: _data.dataAxis || [],
                            data: [_data.data || []]
                        }
                        this.subjectTypeDatas = _result
                    }
                })
                // 作品分布
                requestWorksType(this.params).then(response => {
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
                        this.worksTypeDatas = _result
                    }
                })
                // 课程分布
                requestCourseType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        let _result = {
                            subtext: `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`,
                            legend: _data.dataAxis || [],
                            data: _yAxis || []
                        }
                        this.courseTypeDatas = _result
                    }
                })
                // 项目分布
                requestProjectType(this.params).then(response => {
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
                        this.projectTypeDatas = _result
                    }
                })
                // 资源分布
                requestResourceType(this.params).then(response => {
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
                        this.resourceTypeDatas = _result
                    }
                })
                // 活动分布
                requestActivityType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        let _result = {
                            subtext: `活动分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，活动总数: ${_data.total || 0}个`,
                            legend: _data.dataAxis || [],
                            data: _yAxis || []
                        }
                        this.activityTypeDatas = _result
                    }
                })
                // 兴趣组分布
                requestInterestType(this.params).then(response => {
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
                        this.interestTypeDatas = _result
                    }
                })
                // 区域详情
                requesAreaDetail(this.params).then(response => {
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
    @import "~@/asset/scss/table.scss";
    @import "~@/asset/scss/admin_back-stage_content.scss";
    .fb-statistics .echarts {
        width: auto!important;
        height: 100%;
    }
</style>
<style lang="scss" scoped>
    .header {
        margin-bottom: 15px;

        .item-wrapper {
            overflow: hidden;
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
            border-left: 1px solid #eee;
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
    .backend-content__module {
        padding: 15px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .backend-content__middle {
        padding: 0 0 15px;
        .table-box {
            padding: 0 15px;
        }
    }
    .table-layout {
        margin-bottom: 15px;
    }
</style>
