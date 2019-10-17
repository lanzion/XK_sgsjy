<template>
    <div id="classHomePage">
        <div class="content_l bgw">
            <h2 class="title p15">动态</h2>
            <div v-if="listData.length > 0">
                <ul class="dynamic_ul clearfix">
                    <li v-for="(item, index) in listData" :key="item.id" class="dynamic_li fl">
                        <a class="head-face circle" :style='{backgroundImage: `url(${getFileUrl(item.userImage) || faceDefault})`}' @click.prevent="redirect(pages.detail[identity[item.identity]], { query: { uid: item.userId } })"></a>
                        <div class="dynamic_content">
                            <p>
                                <a class="name" @click.prevent="redirect(pages.detail[identity[item.identity]], { query: { uid: item.userId } })">{{item.userName}}</a>
                            </p>
                            <p>
                                <span>{{dynamicType[item.dynamicType]}}</span>
                                <a @click.prevent="redirect(dynamicPath(item.dynamicType, item)['url'], dynamicPath(item.dynamicType, item))" class="dynamicName" :title="item.title">{{ item.title | textOverflow(15) }}</a>
                                <!-- <v-del class="fr del"></v-del> -->
                            </p>
                            <p class="icon-i-time2"> {{ item.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </p>
                        </div>
                    </li>
                </ul>
                <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
            </div>
            <div v-else class="isNull-list">
                暂无动态
            </div>
        </div>
        <div class="content_r">
            <v-bulletinBoard :datas='bulletinData' class="bgw"></v-bulletinBoard>
            <div class="statistical bgw">
                <h2 class="title">学生光荣榜</h2>
                <v-person-list class="person-list-wrapper" :datas="personData" :pathUrl="sideBarUrl" :handle-request="requestClassGlory" :is-glory="true"></v-person-list>
            </div>
        </div>
    </div>
</template>

<script>
import bulletinBoard from 'Common/bulletinBoard.vue'
import { classGlory, classDynamicList } from '@/service/homePage.js'
import { requestNoticeList } from '@/service/space_clasz.js'
import tabs from 'Common/tabs.vue'
import personList from 'Common/list/text/personList.vue'
// import del_popover from 'Common/button/del_popover.vue'
import pagination from '@/components/common/pagination.vue'

export default {
    name: 'classHomePage',
    components: {
        'v-bulletinBoard': bulletinBoard,
        'v-tabs': tabs,
        'v-person-list': personList,
        // 'v-del': del_popover,
        'v-pagination': pagination
    },
    data() {
        return {
            identity: {
                0: 'student',
                1: 'teacher'
            },
            claszId: this.$route.query.id || this.$ls.get('baseInfo').student.classId,
            bulletinData: [],
            param: {
                pageSize: 10,
                pageNum: 1
            },
            personData: [],
            sideBarUrl: this.pages.detail.student,
            listData: [],
            pageParam: {
                pageNum: 1,
                pageSize: 10,
                totalNum: 0
            },
            dynamicType: {
                1: '发布了作品',
                2: '发表了话题',
                3: '上传了资源',
                4: '发布了课程',
                5: '发布了项目',
                6: '发布了活动',
                7: '分享了作品',
                8: '分享了资源',
                9: '分享了课程',
                10: '分享了项目',
                11: '分享了活动',
                12: '发布了需求',
                13: '发布了服务',
                14: '发布了商业策划',
                15: '发布了故事',
                16: '分享了需求',
                17: '分享了服务',
                18: '分享了商业策划',
                19: '分享了故事'
            }
        }
    },
    mounted() {
        // 资讯数据
        requestNoticeList({ noticeType: '1', title: '', busId: this.claszId }, { pageSize: 9999, pageNum: 1 }).then((res) => {
            if (res.data.code === 200 && res.data.entity !== null) {
                this.bulletinData = res.data.entity.resultData
            }
        })
        this.getDynamicList()
        this.requestClassGlory()
    },
    methods: {
        dynamicPath(val, item) {
            switch (val) {
                case '1':
                case '7':
                    return { url: this.pages.detail.works, query: { id: item.busId } }
                case '2':
                    return { url: this.pages.detail.clasz, query: { id: this.$route.query.id, topicId: item.busId }, path: '/topic/detail' }
                case '3':
                case '8':
                    return { url: this.pages.detail.resource, query: { id: item.busId } }
                case '4':
                case '9':
                    return { url: this.pages.detail.course, query: { id: item.busId } }
                case '5':
                case '10':
                    return { url: this.pages.detail.project, query: { id: item.busId } }
                case '6':
                case '11':
                    return { url: this.pages.detail.activity, query: { id: item.busId } }
                case '12':
                case '16':
                    return { url: this.pages.detail.lagou, query: { id: item.busId }, path: '/2/instruction' }
                    // return { url: '/street/lagou/detail/2/instruction', query: {id: item.busId} }
                case '13':
                case '17':
                    return { url: this.pages.detail.lagou, query: { id: item.busId }, path: '/1/instruction' }
                    // return { url: '/street/lagou/detail/1/instruction', query: {id: item.busId} }
                case '14':
                case '18':
                    return { url: this.pages.detail.plan, query: { id: item.busId } }
                    // return { url: '/street/co/plan/detail/info', query: {id: item.busId} }
                case '15':
                case '19':
                    return { url: this.pages.detail.story, query: { id: item.busId } }
                    // return { url: '/street/excellent/story/detail/info', query: {id: item.busId} }
            }
        },
        // 分页改变
        changePage(pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
            this.getDynamicList()
        },
        // 光荣榜数据
        requestClassGlory() {
            let userId = ''
            if (this.$ls.get('loginInfo')) {
                userId = this.$ls.get('loginInfo').userInfo.id
            }
            classGlory({ classId: this.claszId, userId: userId }).then((res) => {
                if (res.data.code === 200 && res.data.entity !== null) {
                    this.personData = res.data.entity
                }
            })
        },
        /*
         * 获取动态列表数据
         * classId: 班级id
         */
        getDynamicList() {
            classDynamicList({ classId: this.claszId }, { pageSize: this.pageParam.pageSize, pageNum: this.pageParam.pageNum }).then((res) => {
                if (res.data.code === 200) {
                    this.pageParam.totalNum = res.data.entity.totalNum
                    this.listData = res.data.entity.resultData
                }
            })
        }
    },
}
</script>

<style lang='scss'>
    .statistical {
        .person-list-wrapper {
            padding: 0 8px;
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$border-color: #c9c9c9;
$head-size: 72px;
.p15 {
    padding: 0 15px;
}
#classHomePage {
    .title {
        height: 40px;
        line-height: 40px;
        text-indent: .5em;
        font-size: 16px;
        border-bottom: 1px solid $border-color;
    }
    .content_l,
    .content_r {
        box-sizing: border-box;
    }
    .content_l {
        float: left;
        width: 75%;
        .dynamic_ul {
            padding: 15px;
            box-sizing: border-box;
            .dynamic_li {
                width: 50%;
                padding: 15px;
                box-sizing: border-box;
                .head-face {
                    float: left;
                    display: inline-block;
                    width: $head-size;
                    height: $head-size;
                    background-color: #ddd;
                    margin-right: 12px;
                }
                .dynamic_content {
                    overflow: hidden;
                    font-size: 16px;
                    .dynamicName:hover {
                        color: $theme-color;
                    }
                    p {
                        line-height: 1.5;
                        &:first-of-type {
                            font-size: 1.125em;
                            a:hover {
                                color: $theme-color;
                            }
                        }
                        &:nth-of-type(2) {
                            font-size: .875em;
                            span:first-of-type {
                                color: $border-color;
                            }
                        }
                        &:last-of-type {
                            font-size: .875em;
                            color: $border-color;
                        }
                    }
                }
                &:hover p:nth-of-type(2) .del {
                    display: inline-block;
                }
            }
        }
    }
    .content_r {
        float: right;
        width: 22.5%;
        .statistical {
            margin-top: 20px;
            .person-list-wrapper {
                padding: 0 16px;
            }
        }
    }
    .isNull-list {
        border: none;
    }
    .del {
        display: none;
    }
}

</style>
