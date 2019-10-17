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
                <v-echarts :options="worksTypeDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="subjectTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="table-layout">
            <figure class="backend-content__module echart table-cell third-module">
                <v-echarts :options="worksTypeDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="table-cell third-module">
                <figure class="backend-content__module echart">
                    <v-echarts :options="courseTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="projectTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="table-layout">
            <figure class="backend-content__module echart table-cell third-module">
                <v-echarts :options="resourceTypeDatas" theme="lightblue" auto-resize></v-echarts>
            </figure>
            <div class="table-cell third-module">
                <figure class="backend-content__module echart">
                    <v-echarts :options="activityTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
            <div class="small-module table-cell echart">
                <figure class="backend-content__module">
                    <v-echarts :options="interestTypeDatas" theme="lightblue" auto-resize></v-echarts>
                </figure>
            </div>
        </div>
        <div class="backend-content__middle">
            <h6 class="backend-module__title">区域详情</h6>
            <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
                <el-table-column prop="schoolNum" label="学校数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="classNum" label="班级数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="teacherNum" label="教师数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="studentNum" label="学生数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="activityNum" label="作品数" show-overflow-tooltip></el-table-column>
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
</template>

<script>
    import { requesEduSurvey, requestSubjectType, requestWorksType, requestCourseType, requestProjectType, requestResourceType, requestActivityType, requestInterestType, requesAreaDetail } from '@/service/statis_edu.js'
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
                subjectTypeDatas: {
                    title: {
                        text: '课题分布',
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
                        name: '课题分布',
                        type: 'bar',
                        data: []
                    }]
                },
                worksTypeDatas: {
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
                        text: '作品分布'
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
                        text: '作品(个)',
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
                            name: '作品分布',
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
                    title: {
                        text: '课程分布'
                    },
                    series: [
                        {
                            name: '课程分布',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: '50%',
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
                    title: [{
                        text: '项目分布'
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
                        text: '项目(个)',
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
                            name: '项目分布',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            data:[]
                        }
                    ]
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
                        text: '资源分布'
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
                            name: '资源分布',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            data:[]
                        }
                    ]
                },
                activityTypeDatas: {
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
                        text: '活动分布'
                    },
                    series: [
                        {
                            name: '活动分布',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: '50%',
                            data:[]
                        }
                    ]
                },
                interestTypeDatas: {
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
                        text: '兴趣组分布'
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
                        text: '兴趣组(个)',
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
                            name: '兴趣组分布',
                            type: 'pie',
                            radius: ['40%', '50%'],
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
            this.$set(this.params, 'endDate', this.dateFormatFun(new Date(), 'yyyy-MM-dd'))
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
                // 课题领域
                requestSubjectType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.item || {}
                        // let _subtext = `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`

                        // this.$set(this.subjectTypeDatas.title, 'subtext', _subtext)
                        this.$set(this.subjectTypeDatas.xAxis, 'data', _data.dataAxis || [])
                        this.$set(this.subjectTypeDatas.series[0], 'data', _data.data)
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

                        this.$set(this.worksTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.worksTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.worksTypeDatas.title[1], 'text', _data.total || 0)
                    }
                })
                // 课程分布
                requestCourseType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        let _subtext = `课程分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，课程总数: ${_data.total || 0}个`

                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        this.$set(this.courseTypeDatas.title, 'subtext', _subtext)
                        this.$set(this.courseTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.courseTypeDatas.series[0], 'data', _yAxis)
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

                        this.$set(this.projectTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.projectTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.projectTypeDatas.title[1], 'text', _data.total || 0)
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

                        this.$set(this.resourceTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.resourceTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.resourceTypeDatas.title[1], 'text', _data.total || 0)
                    }
                })
                // 活动分布
                requestActivityType(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data  = response.data.appendInfo.item || {},
                            _datas = _data.data || [],
                            _yAxis = []
                        let _subtext = `活动分类: ${_data.dataAxis ? _data.dataAxis.length : 0}，活动总数: ${_data.total || 0}个`

                        _datas.forEach( (x, i) => {
                            _yAxis.push({ value: x, name: _data.dataAxis[i]})
                        })

                        this.$set(this.activityTypeDatas.title, 'subtext', _subtext)
                        this.$set(this.activityTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.activityTypeDatas.series[0], 'data', _yAxis)
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

                        this.$set(this.interestTypeDatas.legend, 'data', _data.dataAxis || [])
                        this.$set(this.interestTypeDatas.series[0], 'data', _yAxis)
                        this.$set(this.interestTypeDatas.title[1], 'text', _data.total || 0)
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
