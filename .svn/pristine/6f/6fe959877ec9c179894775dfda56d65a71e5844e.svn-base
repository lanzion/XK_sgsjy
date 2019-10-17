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
            <figure class="backend-content__module echart table-cell">
                <v-echarts :options="worksDistributeDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="resourceTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="table-layout">
            <figure class="backend-content__module echart table-cell third-module">
                <v-echarts :options="courseTypeDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="table-cell third-module">
                <figure class="backend-content__module echart">
                    <v-echarts :options="projectTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="subjectStatusDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="table-layout">
            <figure class="backend-content__module echart table-cell">
                <v-echarts :options="activityPublishDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="resourceTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="backend-content__middle">
            <h6 class="backend-module__title">学生创客统计</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="兴趣组" show-overflow-tooltip></el-table-column>
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
    import { requesSchoolSurvey, requestWorksDistributeByGrade, requestWorksDistributeByClasz, requestResourceType, requestCourseType, requestProjectType, requestResearchSubjectStatus, requestActivityNum, requestStudent } from '@/service/statis_school.js'
    import chart from 'vue-echarts'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'statisticsOverview', // 统计概况
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
                worksDistributeSubText: [],
                worksDistributeXAxis: [],
                worksDistributeDatas: {
                    title: {
                        text: '作品分布',
                        subtext: ''
                    },
                    legend: {
                        top: '26',
                        left: 'right',
                        selectedMode: 'single',
                        data: ['年级', '班级']
                    },
                    tooltip: {},
                    grid: {
                        left: 20,
                        right: 20,
                        bottom: 20,
                        containLabel: true
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {
                        minInterval: 1
                    },
                    series: [{
                        name: '年级',
                        type: 'bar',
                        data: []
                    }, {
                        name: '班级',
                        type: 'bar',
                        data: []
                    }]
                },
                resourceTypeDatas: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        top: '26',
                        data: []
                    },
                    title: [{
                        text: '资源分类'
                    }, {
                        text: 0,
                        left: '49.5%',
                        top: '49%',
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        textStyle: {
                            color: '#333',
                            fontWeight: 'normal',
                            fontSize: 28
                        }
                    }, {
                        text: '资源(个)',
                        left: '49.5%',
                        top: '51%',
                        textAlign: 'center',
                        textBaseline: 'top',
                        textStyle: {
                            color: '#999',
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    }],
                    series: [
                        {
                            name: '资源分类',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            data:[]
                        }
                    ]
                },
                courseTypeDatas: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        top: '26',
                        data: []
                    },
                    title: [{
                        text: '课程分布'
                    }, {
                        text: 0,
                        left: '49.5%',
                        top: '49%',
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        textStyle: {
                            color: '#333',
                            fontWeight: 'normal',
                            fontSize: 28
                        }
                    }, {
                        text: '课程(个)',
                        left: '49.5%',
                        top: '51%',
                        textAlign: 'center',
                        textBaseline: 'top',
                        textStyle: {
                            color: '#999',
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    }],
                    series: [
                        {
                            name: '课程分布',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            data:[]
                        }
                    ]
                },
                projectTypeDatas: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        top: '26',
                        data: []
                    },
                    title: {
                        text: '项目分布'
                    },
                    series: [
                        {
                            name: '项目分布',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: '50%',
                            data:[]
                        }
                    ]
                },
                subjectStatusDatas: {
                    title: {
                        text: '在研课题状态分布',
                        subtext: ''
                    },
                    tooltip: {},
                    grid: {
                        left: 20,
                        right: 20,
                        bottom: 20,
                        containLabel: true
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {
                        minInterval: 1
                    },
                    series: [{
                        name: '在研课题状态',
                        type: 'bar',
                        data: []
                    }]
                },
                activityPublishDatas: {
                    title: {
                        text: '近一周活动发布'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        left: '20',
                        right: '20',
                        bottom: '20',
                        containLabel: true
                    },
                    xAxis: {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    },
                    yAxis: {
                        minInterval: 1
                    },
                    series: [
                        {
                            name: '发布活动',
                            type: 'line',
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:[]
                        }
                    ]
                },
                items: []
            }
        },
        props: [
            'orgInfo'
        ],
        mounted () {
            this.page = Object.assign({}, this.pageParam)
            this.$set(this.params, 'orgId', this.orgInfo.orgId)
            this.getData()
        },
        components: {
            'v-echarts': chart,
            'v-pagination': pagination
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
                        let _subtext = `作品分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，作品总数: ${_data.total || 0}个`

                        this.$set(this.worksDistributeDatas.xAxis, 'data', _data.dataAxis)
                        this.$set(this.worksDistributeDatas.title, 'subtext', _subtext)
                        this.$set(this.worksDistributeDatas.series[0], 'data', _data.data)
                        this.$set(this.worksDistributeXAxis, 0, _data.dataAxis)
                        this.$set(this.worksDistributeSubText, 0, _subtext)
                    }
                })
                // 作品分布 - 班级
                requestWorksDistributeByClasz(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.data || {}
                        let _subtext = `作品分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，作品总数: ${_data.total || 0}个`

                        this.$set(this.worksDistributeDatas.series[1], 'data', _data.data)
                        this.$set(this.worksDistributeXAxis, 1, _data.dataAxis)
                        this.$set(this.worksDistributeSubText, 1, _subtext)
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

                        this.$set(this.resourceTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.resourceTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.resourceTypeDatas.title[1], 'text', _data.total || 0)
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

                        this.$set(this.courseTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.courseTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.courseTypeDatas.title[1], 'text', _data.total || 0)
                    }
                })
                // 项目分布
                requestProjectType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.entity || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        let _subtext = `项目分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，项目总数: ${_data.total || 0}个`

                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        this.$set(this.projectTypeDatas.title, 'subtext', _subtext)
                        this.$set(this.projectTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.projectTypeDatas.series[0], 'data', _yAxis)
                    }
                })
                // 在研课题状态
                requestResearchSubjectStatus(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        // let _subtext = `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`

                        // this.$set(this.subjectStatusDatas.title, 'subtext', _subtext)
                        this.$set(this.subjectStatusDatas.xAxis, 'data', _data.dataAxis || [])
                        this.$set(this.subjectStatusDatas.series[0], 'data', _data.data)
                    }
                })
                // 近一周活动发布
                let d = new Date()
                let today = new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())
                let lastWeek = new Date(today - (3600 * 1000 * 24 * 7))
                let activityTime = {"startDate": lastWeek, "endDate": today}
                console.log(activityTime)
                requestActivityNum(Object.assign({}, this.params, activityTime)).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        let _subtext = `本周发布活动数: ${_data.total || 0}个`

                        this.$set(this.activityPublishDatas.title, 'subtext', _subtext)
                        this.$set(this.activityPublishDatas.xAxis, 'data', _data.dataAxis || [])
                        this.$set(this.activityPublishDatas.series[0], 'data', _data.data)
                    }
                })
                requestStudent(this.params).then(response => {
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
        }
        .item {
            box-sizing: border-box;
            width: 184px;
            padding: 20px 0;
            text-align: center;
            background-color: #fff;
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
</style>
