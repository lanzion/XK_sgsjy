<template>
    <div id="activity_details" class="bgw">
    <!-- 详情内容 -->
        <div class="content detail-content-box">
            <div class="content-box clearfix">
                <h4 class="fl">【活动主题】：</h4>
                <p class="content-left fl">{{detailsData.title}}</p>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【活动分类】：</h4>
                <p class="content-left fl">{{detailsData.activityTypeName}}</p>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【活动时间】：</h4>
                <div class="content-left fl">
                    <p class="">【活动时间】：<span>{{detailsData.startDate | dateFormat('yyyy-MM-dd')}}</span> 至 <span>{{detailsData.endDate | dateFormat('yyyy-MM-dd')}}</span></p>
                    <p class="">【报名时间】：<span>{{detailsData.beginDate | dateFormat('yyyy-MM-dd')}}</span> 至 <span>{{detailsData.stopDate | dateFormat('yyyy-MM-dd')}}</span></p>
                </div>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【活动详情】：</h4>
                <div class="content-left fl">
                    <p class="fl">
                        {{detailsData.details}}
                    </p>
                </div>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【活动要求】：</h4>
                <div class="content-left fl">
                    <p class="fl">
                        {{detailsData.requirement}}
                    </p>
                </div>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【活动地点】：</h4>
                <p class="content-left fl">{{detailsData.site}}</p>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【联系方式】：</h4>
                <div class="content-left fl">
                    {{detailsData.contactWay}}
                </div>
            </div>
            <div class="content-box clearfix">
                <h4 class="fl">【<span class="w60 text-justify">附件</span>】：</h4>
                <div class="content-left fl" v-if="detailsData.resourceList.length > 0">
                    <p class="attachment" v-for="(item,index) in detailsData.resourceList">
                        <a :href="downloadUrl(item.resourceId, item.name)" :download="item.name">{{item.name}}</a>
                    </p>
                </div>
                <div v-else class="content-left fl">暂无附件</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'activity_details',
        data() {
            return {
            }
        },
        props: {
            detailsData: {
                type: Object,
                default: function () {
                    return {
                        resourceList: [],
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
/*介绍内容*/
.content{
}
.w60 {
    width: 60px;
    display: inline-block;
}
</style>

<style lang="scss">
    .detail-content-box{
        width: 100%;
        min-height: 518px;
        overflow: hidden;
        padding: 10px 15px 15px 10px;
        .content-box{
            width: 100%;
            font-size: 14px;
            margin-bottom: 25px;
            h4{
                font-size: 15px;
            }
            p{
                margin-bottom: 5px;
                color: #222;
                line-height: 18px;
                word-break: break-word;
            }
            .content-left{
                width: 800px;
                padding-right: 80px;
                padding-left: 10px;
                margin-bottom: 0;
                .attachment{
                    a{
                        color: #00a0e9;
                    }
                }
            }
        }
    }
</style>