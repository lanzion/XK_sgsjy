<template>
    <div id="subjectActivityDetails" class="subjectActivityDetails">
        <el-breadcrumb class="breadcrumbs" separator=">">
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject`, query: { id: $route.query.id } }">课题</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject/activity`, query: { id: $route.query.id } }">课题活动</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="activity-details bgw">
        <!-- 详情内容 -->
            <div class="content">
                <div class=" clearfix">
                    <h4 class="fl">活动主题：</h4>
                    <p class="content-right fl">{{activityDetail.title}}</p>
                </div>
                <div class="clearfix">
                    <h4 class="fl">活动时间：</h4>
                    <div class="content-right fl">
                        {{activityDetail.startDate | dateFormat('yyyy.MM.dd')}}—{{activityDetail.endDate | dateFormat('yyyy.MM.dd')}}
                    </div>
                </div>
                <div class="clearfix">
                    <h4 class="fl">主持人：</h4>
                    <div class="content-right fl">
                        <p class="fl">
                            {{activityDetail.compereUserName}}
                        </p>
                    </div>
                </div>
                <div class="clearfix">
                    <h4 class="fl">参与人：</h4>
                    <div class="content-right fl">
                        <p class="fl">
                            <span>{{activityDetail.memberNames}}</span>
                        </p>
                    </div>
                </div>
                <div class="clearfix">
                    <h4 class="fl">活动内容：</h4>
                    <p class="content-right fl">
                        {{activityDetail.content}}
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import breadcrumb from 'Common/breadcrumb.vue'
import { requestSubjectActivityDetails } from '@/service/subject.js'

export default {
    name: 'subjectActivityDetails',
    components: {
        'v-breadcrumb': breadcrumb
    },
    data() {
        return {
            activityDetail: {},
            type: this.$route.path.split('/')[2]
        }
    },
    mounted() {
        this.getActivityDetail()
    },
    methods: {
        getActivityDetail() {
            requestSubjectActivityDetails({ id: this.$route.query.activityId }).then((res) => {
                // console.log(res)
                this.activityDetail = res.data.entity
                const memberList = this.activityDetail.memberList
                const members = []
                for (const i in memberList) {
                    members.push(memberList[i].userName)
                }
                this.activityDetail.memberNames = members.join('、')
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    *{
        box-sizing:border-box;
    }
    /*介绍内容*/
    .activity-details{
        width: 100%;
        padding: 20px;
        // border: 1px solid #c9c9c9;
        .content{
            width: 100%;
            overflow: hidden;
            div{
                width: 100%;
                margin-bottom: 27px;
                h4{
                    font-size: 15px;
                    font-weight: bold;
                    color: #000;
                }
                p{
                    margin-bottom: 5px;
                    color: #222
                }
                .content-right{
                    width: 970px;
                    font-size: 14px;
                    overflow: hidden;
                    margin-bottom: 0;
                }
            }
        }
    }
</style>