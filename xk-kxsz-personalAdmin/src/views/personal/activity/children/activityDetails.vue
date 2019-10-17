<template>
    <div id="activityDetails" class="">
    <!-- 活动描述 -->
        <div class="activity-img backend-content__middle clearfix" v-if="isAudited">
            <div class="img-box fl">
                <img :src="getFileUrl(detailsData.cover)" title="点击查看原图" @click="visible.show = true" height="190" width="193">
            </div>
            <div class="activity-msg fl">
                <p class="activity-name">{{detailsData.title}}</p>
                <p class="activity-content">{{detailsData.details | textOverflow(100,'...')}}</p>
                <p class="activity-type mb10">分类：{{detailsData.activityTypeName}}</p>
                <p class="time-range">
                    活动时间：<span>{{detailsData.startDate | dateFormat('yyyy-MM-dd')}} 至 {{detailsData.endDate | dateFormat('yyyy-MM-dd')}}</span>
                </p>
                <p class="end-time">
                    报名时间：<span>{{detailsData.beginDate | dateFormat('yyyy-MM-dd')}} 至 {{detailsData.stopDate | dateFormat('yyyy-MM-dd')}}</span>
                </p>
            </div>
        </div>
        <!-- 活动具体 -->
        <div class="activity-details bgw">
            <v-tabs :tabs="[
                      { name: '活动详情', type: 'info'},
                      { name: '活动成员', type: 'member'},
                      { name: '活动成果', type: 'result'},
                      { name: '讨论区', type: 'discuss'}
                  ]" :router="router" class="evaluation-tabs" v-if="isAudited"></v-tabs>
              <router-view :detailsData="detailsData"></router-view>
        </div>
        <img-preview :visible.sync="visible" :imgUrl="detailsData.cover"></img-preview>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'
    import { requestActivityDetails } from '@/service/activity.js'
    import imgPreview from '@/components/common/img_preview/img_preview.vue'

    export default {
        name: 'activityDetail',
        components: {
            'v-tabs': tabs,
            'img-preview': imgPreview
        },
        data() {
            return {
                detailsData: {
                    resourceList: []
                },
                router: {
                    path: '/admin/activity/detail'
                },
                isAudited: true,
                visible: { // 查看大图的控制
                    show: false
                }
            }
        },
        created() {
            this.router.query = this.$route.query
            this.isAudited = !this.$route.path.includes('pendingDetail')
        },
        mounted() {
            this.getDetails()
        },
        methods: {
            getDetails() {
                requestActivityDetails({ id: this.$route.query.id }).then((res) => {
                    this.detailsData = res.data.entity
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-box{
        width: 194px;
        height: 190px;
        margin-right: 20px;
        background-color: #fff;
    }
    .activity-msg{
        width: 670px;
        overflow: hidden;
        padding-top: 10px;
        .activity-name{
            font-size: 22px;
            margin-bottom: 20px;
        }
        .activity-content{
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 25px;
        }
        .activity-type,.time-range,.end-time{
            font-size: 14px;
            line-height: 20px;
            span{
                font-size: 12px;
                color: #999;
            }
        }
    }
</style>

<style lang="scss">
    .activity-details{
        .tabs-bar-header{
        }
    }
</style>