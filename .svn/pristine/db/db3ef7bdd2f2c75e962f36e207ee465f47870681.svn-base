<template>
    <div id="classHomePage">
        <div class="content_l bgw">
            <h2 class="title p15">动态</h2>
            <div v-if="listData.length > 0">
                <ul class="dynamic_ul clearfix">
                    <li v-for="(item, index) in listData" :key="item.id" class="dynamic_li fl">
                        <router-link class="head-face circle" :style='{backgroundImage: "url(" + getFileUrl(item.face) + ")"}' :to="{path: `/space/${item.identity == '0' ? 'student' : 'teacher'}/dynamic`, query: { uid: item.userId}}"></router-link>
                        <div class="dynamic_content">
                            <p><router-link class="name" :to="{path: `/space/${item.identity == '0' ? 'student' : 'teacher'}/dynamic`, query: { uid: item.userId}}">{{item.userName}}</router-link></p>
                            <p>
                                <span>{{dynamicType[item.dynamicType]}}</span>
                                <router-link :to="detailPath(item.dynamicType, item)" class="dynamicName" :title="item.title">{{ item.title | textOverflow(15) }}</router-link>
                                <!-- <v-del class="fr del"></v-del> -->
                            </p>
                            <p class="icon-i-time2"> {{ item.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </p>
                        </div>
                    </li>
                </ul>
                <v-pagination :param.sync="pageParam" :changePage="changePage"></v-pagination>
            </div>
            <div v-else class="isNull-list">
                暂无动态
            </div>
        </div>
        <div class="content_r">
            <v-bulletinBoard :datas='bulletinData' class="bgw"></v-bulletinBoard>
            <div class="statistical bgw">
                <h2 class="title">最近访客</h2>
                <v-visitor-list :datas="visitorDatas"></v-visitor-list>
            </div>
        </div>
    </div>
</template>

<script>
import { interestVisitorList,interestDynamicList } from '@/service/homePage.js'
import { requestNoticeList } from '@/service/space_clasz.js'
import { addVisitor } from '@/service/interest.js'
import bulletinBoard from 'Common/bulletinBoard.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import visitorList from 'Common/classificationList/list/text/visitorList.vue'
import del_popover from 'Common/del_popover.vue'
import pagination from '@/components/common/pagination.vue'
export default {
    name:'classHomePage',
    components: {
        'v-bulletinBoard': bulletinBoard,
        'v-tabs': tabs,
        'v-visitor-list': visitorList,
        'v-del': del_popover,
        'v-pagination': pagination
    },
    data () {
        return {
            bulletinData: [],
            param: {
                pageSize: 10,
                pageNum: 1
            },
            visitorDatas: [],
            sideBarUrl: '/studentSpace',
            listData: [],
            pageParam: {
                pageNum: 1,
                pageSize: 20,
                totalNum:0
            },
            id:'',
            dynamicType: {
                1: '发表了文章',
                2: '发表了话题',
                3: '加入兴趣组',
                4: '上传了资源',
                5: '发布了作品',
                6: '分享了课程',
                7: '分享了项目',
                8: '分享了活动',
                9: '分享了资源',
                10: '分享了作品',
                11: '分享了需求',
                12: '分享了服务',
                13: '分享了商业策划',
                14: '分享了故事',
                15: '分享了网上实训室'
            }
        }
    },
    // props: {
    //     isMember: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    methods: {
        detailPath (val, item) {
            switch (val) {
                case '1':
                    return {path: '/articleDetail', query: {id: item.busId} }
                    break;
                case '2':
                    return {path: '/interestsSpace/topic/detail', query: {id: this.$route.query.id, topicId: item.busId} }
                    break;
                case '3':
                    return {path: '', query: {id: this.$route.query.id} }
                    break;
                case '4':
                case '9':
                    return {path: '/space/resource/details', query: {id: item.busId} }
                    break;
                case '5':
                case '10':
                    return {path: '/space/worksDetail', query: {id: item.busId} }
                    break;
                case '6':
                    return {path: '/education/course/detail', query: {id: item.busId} }
                    break;
                case '7':
                    return {path: '/education/project/detail', query: {id: item.busId} }
                    break;
                case '8':
                    return {path: '/space/activity/details', query: {id: item.busId} }
                    break;
                case '11':
                    return {path: '/street/lagou/detail/2/instruction', query: {id: item.busId} }
                    break;
                case '12':
                    return {path: '/street/lagou/detail/1/instruction', query: {id: item.busId} }
                    break;
                case '13':
                    return {path: '/street/co/plan/detail/info', query: {id: item.busId} }
                    break;
                case '14':
                    return {path: '/street/excellent/story/detail/info', query: {id: item.busId} }
                    break;
                case '15':
                    return {path: '/education/train/detail/evaluate', query: {id: item.busId} }
                    break;
                default:
                    return { path: '' };
                    break;
            }
        },
        // 分页改变
        changePage: function(pageNum) {
            this.$set(this.pageParam, 'pageNum', pageNum);
            this.getInterestDynamic()
        },
        //获取动态数据
        getInterestDynamic(){
            let params = {
                interestsId: this.$route.query.id
            }
            interestDynamicList(params,{pageSize:10,pageNum:this.pageParam.pageNum}).then((res)=>{
                 if(res.data.code === 200 && res.data.entity != null){
                    this.listData = res.data.entity.resultData;
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                 }
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        if(localStorage.getItem('loginInfo')){
            let params = {
                interestId: this.id,
                userId: JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            };
            addVisitor(params).then((res) => {})
        }
        this.getInterestDynamic();
        //公告数据
        requestNoticeList({noticeType: '2',title:'', busId: this.id}, this.param).then(res => {
            if(res.data.code === 200 && res.data.entity != null) {
                this.bulletinData = res.data.entity.resultData
            }
        })
        //光荣榜数据
        interestVisitorList({interestId: this.id},{ pageNum:1, pageSize:12}).then(res => {
            if(res.data.code === 200 && res.data.entity != null){
                this.visitorDatas = res.data.entity.resultData
            }
        })
    }
}
</script>

<style lang='scss' scoped="">
$border-color: #c9c9c9;
$head-size: 72px;
$Red: #D00;
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
        color: #D00;
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
                        color: $Red;
                    }
                    p {
                        line-height: 1.5;
                        &:first-of-type {
                            font-size: 1.125em;
                            a:hover {
                                color: $Red;
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
            // padding: 8px 16px;
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