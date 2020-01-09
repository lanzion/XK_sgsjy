<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox bgc_w">
            <v-cascade class="category-box" :changeCascade="changeCascade" model="project"></v-cascade>
            <v-classificationDictionary :changeDataDic="changeClassify"></v-classificationDictionary>
        </div>
        <!-- <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs> -->
        <el-row class="list-group__actiTrain" :gutter="20" v-if="items.length">
            <el-col :span="8" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item bgw" @click="redirect(pages.detail.actiTrain, { query: { id: item.id }})">
                    <div class="item-info clearfix">
                        <div class="date-box fl">
                            <p class="date day">{{item.startTime | dateFormat('dd')}}</p>
                            <p class="date year-month">{{item.startTime | dateFormat('yyyy.MM')}}</p>
                        </div>
                        <div class="info-box fl">
                            <h4 class="info-tit ellipsis" :title="item.theme">{{item.theme}}</h4>
                            <p class="info-item address ellipsis" :title="item.place">培训地点: {{item.place}}</p>
                            <p class="info-item time">
                                培训时间: {{item.startTime | dateFormat('yyyy.MM.dd HH:mm')}} - {{item.endTime | dateFormat('yyyy.MM.dd HH:mm')}}
                            </p>
                        </div>
                    </div>
                    <article class="item-content">{{item.content | handleContent(280)}}</article>
                    <div class="btn-box">
                        <button class="apply-btn" type="button">立即报名</button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import classificationDictionary from '@/components/activity_train/classificationDictionary.vue'
import cascade from '@/components/activity_train/cascade.vue'
import tabs from '@/components/common/tabs.vue'
import list from '@/components/common/list.vue'
import pagination from '@/components/common/pagination.vue'
import { requestActivityTrain } from '@/service/study.js'

export default {
    name: 'project',
    components: {
        'v-classificationDictionary': classificationDictionary,
        'v-cascade': cascade,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination': pagination
    },
    data() {
        return {
            id: this.$route.query.id,
            breadcrumb: [
                { path: '/education', name: '竞赛与培训' },
                { path: '', name: '竞赛与培训列表' }
            ],
            studySectionId: '',
            subject: '',
            classifyId: '',
            search: '',
            tabs: [
                { name: '全部项目', type: 0 },
                { name: '正在报名', type: 1, param: { enroll: 1 } },
                { name: '最多参与', type: 2, param: { partSort: 1 } }
            ],
            cur_tab: 0,
            is_search: true,
            count: { name: '培训', color: 'lightBlue' },
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            }
        }
    },
    mounted() {
        this.getData({ orgId: this.id, ...this.pageParam })
    },
    computed: {
        params: function () {
            const orderBy = this.tabs[this.cur_tab].param || {}
            return Object.assign(orderBy,
                { studySectionId: this.studySectionId },
                { subject: this.subject },
                { classifyId: this.classifyId },
                // { name: this.search },
            )
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index
        },
        getData(param) {
            requestActivityTrain(param, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                }
            })
        },
        searchParam(val) {
            this.search = val
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
        },
        changeCascade(data) {
            this.studySectionId = data[0].id
            this.subject = data[1].id
        },
        changeClassify(data) {
            this.$set(this.$data, 'classifyId', data.id)
        },
        changeApplyScope(data) {
            this.$set(this.$data, 'applyScope', data.id)
        },
    },
    watch: {
        params: {
            handler: function (val) {
                this.getData(val)
            },
            deep: true
        }
    },
    filters: {
        // 处理内容字段，字段包括HTML标签内容
        handleContent(txt = '', len = 260, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/vars.scss';
$box-radiu: 5px;
$face-size: 24px;


.list-group__actiTrain {
    margin-top: 20px;
    .list-group__item {
        position: relative;
        padding: 15px;
        height: 494px;
        box-sizing: border-box;
        border-radius: 0px!important;
        margin-bottom: 20px;
        cursor: pointer;
        .item-info {
            margin-bottom: 20px;
            .date-box {
                width: 84px;
                height: 88px;
                border: 1px solid $theme-color;
                .date {
                    width: 84px;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 16px;
                    color: $theme-color;
                }
                .year-month {
                    color: #fff;
                    background-color: $theme-color;
                }
            }

            .info-box {
                width: 260px;
                padding-left: 10px;
                .info-tit {
                    font-size: 20px;
                    color: #000;
                    line-height: 1.2;
                    margin-bottom: 10px;
                    cursor: pointer;
                }
                .info-item {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #bfbfbf;
                }
            }
        }

        .item-content {
            height: 290px;
            overflow: hidden;
            font-size: 16px;
            line-height: 1.4;
            text-indent: 2em;
            color: #333333;
        }

        .btn-box {
            position: absolute;
            bottom: 15px;
            left: 0;
            right: 0;
            text-align: center;
            .apply-btn {
                width: 140px;
                height: 40px;
                color: $theme-color;
                border: 1px solid $theme-color;
                border-radius: 10px;
                font-size: 18px;
                &:hover {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }

        &:hover {
            .info-box .info-tit {
                color: $theme-color;
            }
        }
    }
}
</style>
