<template>
    <div class="statistics">
        <div class="header table-layout">
            <h3 class="table-cell header-title">总量</h3>
            <ul class="table-cell item-wrapper clearfix">
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
        <div class="header table-layout">
            <h3 class="table-cell header-title">本月统计<span class="header-title-exp">(同比上月)</span></h3>
            <ul class="table-cell item-wrapper clearfix">
                <li v-for="(val, key, index) in monthLabel" class="item fl" :style="{width: (100/Object.keys(totalLabel).length) + '%' }">
                    <el-progress type="circle" :width="48" :stroke-width="3" :percentage="month&&month[`${key}Tb`]?month[`${key}Tb`]:0" :class="{'increase': month[`${key}Tb`]>0, 'decline': month[`${key}Tb`]<0}"></el-progress>
                    <div class="content">
                        <p class="num ellipsis">{{ month[`${key}Num`] || 0 }}</p>
                        <p class="txt">{{ val }}</p>
                    </div>
                    <i :class="{'icon-i-increase': month[`${key}Tb`]>0, 'icon-i-decline': month[`${key}Tb`]<0}"></i>
                </li>
            </ul>
        </div>
        <div class="class-statis-detail">
            <h6 class="backend-module__title">统计详情</h6>
            <el-table class="data-table" border :data="items" style="width: 100%" ref="multipleTable" @sort-change="sortChange">
                <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="studyNum" label="学习次数" show-overflow-tooltip sortable align="center"></el-table-column>
                <el-table-column prop="practiceNum" label="实践次数" show-overflow-tooltip sortable align="center"></el-table-column>
                <el-table-column prop="workNum" label="作品个数" show-overflow-tooltip sortable align="center"></el-table-column>
                <el-table-column prop="resourceNum" label="资源个数" show-overflow-tooltip sortable align="center"></el-table-column>
                <el-table-column prop="topicNum" label="话题个数" show-overflow-tooltip sortable align="center"></el-table-column>
            </el-table>
            <v-pagination class="class-pagination" :param.sync="page" @callback="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
    import { requesClaszSurvey, requesClaszMonth, requestClaszCountDetail } from '@/service/statis_clasz.js'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'claszStatistics', // 班级统计
        data() {
            return {
                id: this.$route.query.id,
                pageParam: {
                    pageNum: 1,
                    pageSize: 5
                },
                page: {},
                total: {},
                month: {},
                totalColor: ['#f36f48', '#f19ec2', '#556fb5', '#009944', '#1fbcd4', '#3e50b4'],
                totalLabel: {
                    student: '学生(人)',
                    study: '学习(次)',
                    practice: '实践(个)',
                    work: '作品(个)',
                    resource: '资源(个)',
                    topic: '话题(个)'
                },
                monthLabel: {
                    study: '学习(次)',
                    activity: '实践(个)',
                    work: '作品(个)',
                    resource: '资源(个)',
                    topic: '话题(个)'
                },
                items: []
            }
        },
        mounted() {
            this.page = Object.assign({}, this.pageParam)
            this.getSurveyData()
            this.getDetailData()
        },
        components: {
            'v-pagination': pagination
        },
        methods: {
            getSurveyData() {
                // 总量
                requesClaszSurvey({ id: this.id }).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.entity || {}
                        for (const key in _data) {
                            if (_data[key] === null || _data[key] === '') {
                                delete _data[key]
                            }
                        }
                        this.total = _data
                    }
                })
                // 本月统计
                requesClaszMonth({ id: this.id }).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.entity || {}
                        for (const key in _data) {
                            if (_data[key] === null || _data[key] === '') {
                                delete _data[key]
                            } else if (key.includes('Tb')) {
                                _data[key] = Number(_data[key].slice(0, -1))
                            }
                        }
                        this.month = _data
                    }
                })
            },
            // 统计详情
            getDetailData({ order = {} } = {}) {
                const param = Object.assign(order, { id: this.id }, this.pageParam)
                requestClaszCountDetail(param).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.entity || {}
                        this.items = _data.resultData || []
                        this.$set(this.page, 'totalNum', _data.totalNum)
                    }
                })
            },
            // 改变分页
            changePage(pageNum) {
                this.$set(this.pageParam, 'pageNum', pageNum)
                this.getDetailData()
            },
            sortChange({ column, prop, order } = {}) {
                let param = {}
                if (column) {
                    param = {
                        [prop]: order === 'descending' ? 1 : 2
                    }
                }
                this.getDetailData({ order: param })
            }
        }
    }
</script>

<style lang='scss'>
    @import "~@/assets/css/scss/table.scss";
     .el-progress--circle {
        &.increase {
            .el-progress-circle__path {
                stroke: #00a9e0;
            }
            .el-progress__text {
                color: #00a9e0;
            }
        }
        &.decline {
            .el-progress-circle__path {
                stroke: #d65d54;
            }
            .el-progress__text {
                color: #d65d54;
            }
        }
    }
</style>
<style lang='scss' scoped>
    .header {
        width: 100%;
        margin-bottom: 16px;
        box-sizing: border-box;

        .header-title {
            width: 6em;
            background-color: #fff;
            font-size: 16px;
            line-height: 1.5;
            text-align: center;

            .header-title-exp {
                display: block;
                font-size: 14px;
                color: #999;
            }
        }

        .item {
            position: relative;
            box-sizing: border-box;
            width: 184px;
            padding: 18px 0;
            border-left: 1px solid #f4f4f4;
            background-color: #fff;
            text-align: center;

            &:last-child {
                border-radius: 0 3px 3px 0;
            }

            [class*="icon-i-"],
            [class*=" icon-i-"] {
                position: absolute;
                top: 10px;
                right: 2px;
                font-size: 20px;
            }
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
    .class-statis-detail {
        background-color: #fff;
        .backend-module__title {
            height: 42px;
            line-height: 42px;
            padding: 0 12px;
            margin-bottom: 16px;
            border-bottom: 1px solid #ccc;
            font-size: 18px;
            font-weight: bold;
        }
        .data-table {
            width: auto !important;
            margin: 0 12px;
        }

        .class-pagination {
            padding: 0 7px 20px;
            box-sizing: border-box;
        }
    }
</style>
