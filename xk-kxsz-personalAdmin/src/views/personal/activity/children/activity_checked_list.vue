<template>
    <div id="activity_list">
        <div class="select-box">
            <multi-select class="selector" :clearable="true" :selectData.sync="selected.classify" :ifAll='true' :model='"activity"'></multi-select>
            <single-select class="selector" :clearable="true" :singleSelectData="enrollStatusData" @callback="changeEnrollStatus" ></single-select>
            <single-select class="selector" :clearable="true" :singleSelectData="activityStatusData" @callback="changeActivityStatus"></single-select>
        </div>
        <ul class="list" v-if="listData.length > 0">
            <li v-for="(item,index) in listData" class="clearfix">
                <div class="img-box fl">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img v-bind:src="getFileUrl(item.cover) || listDefault" /> -->
                    <div class="status-label">
                        <p class="begin" v-if="item.status == 0">未开始</p>
                        <p class="doing" v-if="item.status == 1">进行中</p>
                        <p class="end" v-if="item.status == 2">已结束</p>
                    </div>
                </div>
                <div class="msg-box w670 fl">
                    <p class="activity-name">
                        <router-link :to="{path:'/admin/activity/detail/info',query:{id:item.id}}">
                            {{item.title}}
                        </router-link>
                    </p>
                    <p class="activity-content">{{item.details | textOverflow(50)}}</p>
                    <p class="activity-type">
                        分类：{{item.activityTypeName}} <span class="divide">|</span> 已有<i class="fcblue">{{item.currNum}}</i>人参加
                    </p>
                    <div class="activity-time clearfix">
                        <p class="time-range fl" :style="{'margin-right': '20px'}">
                            活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}}&nbsp;&nbsp;—&nbsp;&nbsp;{{item.endDate | dateFormat('yyyy-MM-dd')}}
                        </p>
                        <p class="end-time">
                            报名截止：{{item.stopDate | dateFormat('yyyy-MM-dd')}}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import multiSelect from 'Common/select/multi_select.vue'
    import singleSelect from 'Common/select/single_select.vue'
    import pagination from 'Common/pagination.vue'
    import delPopover from 'Common/del_popover.vue'
    import { requestActivityBackendList } from '@/service/activity.js'

    export default {
        name: 'uncheckedActivityList',
        components: {
            'multi-select': multiSelect,
            'single-select': singleSelect,
            'del-popover': delPopover,
            'v-pagination': pagination,
        },
        data() {
            return {
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                enrollStatusData: {
                    groupCode: 'activityRegister',
                    ifAll: true,
                    name: '报名状态',
                    multiple: false,
                    placeholder: '报名状态'
                },
                activityStatusData: {
                    groupCode: 'activeState',
                    ifAll: true,
                    name: '活动状态',
                    multiple: false,
                    placeholder: '活动状态'
                },
                selected: {
                    classify: [],
                    enrollStatus: '',
                    activityStatus: '',
                    name: ''
                },
                listData: [],
                nowTime: new Date().getTime(),
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.getActivityList()
        },
        computed: {
            params: function () {
                return Object.assign({}, this.selected)
            }
        },
        watch: {
            search(val) {
                this.selected.name = val
            },
            params: {
                handler: function () {
                    this.getActivityList()
                },
                deep: true
            }
        },
        methods: {
            changePage(val) {
                this.param.pageNum = val
                this.getActivityList()
            },
            /*
            *获取活动列表
            *title:活动名称 string
            *activityType：活动分类 string
            *enrollStatus：报名状态 string
            *status：活动状态 number
            *isTeacherAudit：审核列表（0.待审核,1.已审核）
            */
            getActivityList() {
                const data = {
                    title: this.selected.name,
                    activityType: this.selected.classify.join('-'),
                    enrollStatus: this.selected.enrollStatus,
                    status: this.selected.activityStatus,
                    isTeacherAudit: 1,
                    timeStamp: new Date().getTime()
                }
                requestActivityBackendList(data, this.param).then((res) => {
                    if (res.data.code === 200) {
                        this.param.totalNum = res.data.entity.totalNum
                        this.$emit('totalNum', res.data.entity.totalNum)
                        this.listData = res.data.entity.resultData
                    }
                })
            },
            changeEnrollStatus(val) {
                this.selected.enrollStatus = val
            },
            changeActivityStatus(val) {
                this.selected.activityStatus = val
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.mb10{
    margin-bottom: 10px;
}
.focus{
    border-color: $theme_color!important;
}
#activity_list {
    padding: 0 18px 20px;
    .list {
        li {
            box-sizing: border-box;
            width: 100%;
            height: 211px;
            padding: 20px 0;
            border-bottom: 1px dashed #ccc;
            position: relative;
            a{

            }
            /* 活动图片 */
            .img-box {
                width: 265px;
                height: 171px;
                position: relative;
                img,
                .bg-img__wrap {
                    width: 100%;
                    height: 100%;
                }
            }
            // 活动信息
            .msg-box {
                font-size: 12px;
                padding-left: 20px;
                padding-top: 15px;
                box-sizing: border-box;
                .activity-name{
                    font-size: 22px;
                    margin-bottom: 15px;
                    &:hover{
                        a{
                            color: $theme_color;
                        }
                    }
                }
                .activity-content {
                    height: 42px;
                    font-size: 14px;
                    line-height: 1.5em;
                    margin-bottom: 15px;
                }
                .activity-type,.activity-time{
                    color: #999;
                    font-size: 14px;
                    line-height: 2em;
                }
                .activity-type{
                    color: #3e3e3e;
                    .divide{
                        margin: 0 15px;
                    }
                }
                .fcblue{
                    color: #00a0e9;
                }
            }
            // 操作按钮部分
            .option-box{
                margin-top: 50px;
                a{
                    display: inline-block;
                    vertical-align: top;
                    i{
                        font-size: 20px;
                        margin-left: 14px;
                        cursor: pointer;
                    }
                }
                i:hover{
                    color: $theme_color;
                }
            }
        }
    }
}
.selector{
    width:172px;
    display:inline-block;
    margin-right:10px;
}
.w670{
    width: 670px;
}
.w455{
    width: 455px;
}
</style>

<style lang="scss">
    #activity_list{
        .el-select{
            height: 31px;
        }
    }
</style>