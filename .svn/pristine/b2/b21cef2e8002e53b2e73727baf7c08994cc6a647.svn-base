<template>
    <div id="activity_uncheckedlist">
        <div class="select-box">
            <multi-select class="selector" :clearable="true" :selectData.sync="selected.classify" :ifAll='true' :model='"activity"'></multi-select>
        </div>
        <ul class="list" v-if="listData.length > 0">
            <li v-for="(item,index) in listData" class="clearfix">
                <div class="img-box fl">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img v-bind:src="getFileUrl(item.cover) || listDefault" /> -->
                    <div class="status-label">
                        <p class="submit" v-if="item.auditStatus == -1">待提交</p>
                        <p class="pending" v-if="item.auditStatus == 0">待审核</p>
                        <p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
                        <p class="audit" v-if="item.auditStatus == 3">审核中</p>
                    </div>
                </div>
                <div class="msg-box w455 fl">
                    <p class="activity-name">
                        <router-link :to="{path:'/admin/activity/pendingDetail',query:{id:item.id}}">
                            {{item.title}}
                        </router-link>
                    </p>
                    <p class="activity-content">{{item.details | textOverflow(50)}}</p>
                    <p class="activity-type">分类：{{item.activityTypeName}}</p>
                    <div class="activity-time clearfix">
                        <p class="time-range fl" :style="{'margin-right': '20px'}">
                            活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}}&nbsp;&nbsp;—&nbsp;&nbsp;{{item.endDate | dateFormat('yyyy-MM-dd')}}
                        </p>
                        <p class="end-time">
                            报名截止：{{item.stopDate | dateFormat('yyyy-MM-dd')}}
                        </p>
                    </div>
                </div>
                <div class="option-box fr">
                <v-operate @on-delete="deleteActivity(item.id)" @on-edit="editActivity(item.id)" @on-submit="submit(item.id,index)"
                        :icon-group="generateIconGroup(item.auditStatus)" label="活动"></v-operate>
                </div>
                <button @click="showRecordDialog(item.id)" v-if="item.auditStatus == 0 || item.auditStatus == 2 || item.auditStatus == 3" class="btn-verify-record pa">审核记录</button>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'activityId'}" />
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import multiSelect from 'Common/select/multi_select.vue'
    import singleSelect from 'Common/select/single_select.vue'
    import pagination from 'Common/pagination.vue'
    import delPopover from 'Common/del_popover.vue'
    import operate from 'components/common/operate.vue'
    import verifyRecordDialog from 'components/dialog/verify_record_dialog.vue'
    import { requestActivityBackendList, submitActivity, delActivity } from '@/service/activity.js'

    export default {
        name: 'uncheckedActivityList',
        components: {
            'multi-select': multiSelect,
            'single-select': singleSelect,
            'del-popover': delPopover,
            'v-pagination': pagination,
            'v-operate': operate,
            verifyRecordDialog
        },
        data() {
            return {
                api: '/maker/activity/audit/selectList',
                dialog: { isVisible: false },
                curRecordId: '', // 当前审核记录ID
                param: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                currentPage: 1,
                enrollStatusData: {
                    groupCode: 'activityRegister',
                    ifAll: true,
                    name: '状态',
                    multiple: false,
                    placeholder: '报名状态'
                },
                activityStatusData: {
                    groupCode: 'activeState',
                    ifAll: true,
                    name: '状态',
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
                auditedStatus: 1,
                nowTime: new Date().getTime(),
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        created() {
            this.getActivityList()
        },
        mounted() {
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
            showRecordDialog(id) { // 显示审核记录弹窗
                this.curRecordId = id
                this.dialog.isVisible = true
            },
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
                    isTeacherAudit: 0
                }
                requestActivityBackendList(data, this.param).then((res) => {
                    if (res.data.code === 200) {
                        this.param.totalNum = res.data.entity.totalNum
                        this.$emit('totalNum', res.data.entity.totalNum)
                        this.listData = res.data.entity.resultData
                    }
                })
            },
            // 待审列表操作按钮
            generateIconGroup(status) {
                const edit = status === -1 || status === 2 ? 'edit' : ''
                const submit = status === -1 || status === 2 ? 'submit' : ''
                const del = status === -1 || status === 2 ? 'delete' : ''
                return [edit, submit, del]
            },
            // 删除活动
            deleteActivity(id) {
                delActivity({ id: id }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '已删除')
                        this.getActivityList()
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            },
            // 提交审核
            submit(id, index) {
                this.$confirm('此操作将该活动提交审核，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                      submitActivity({ id: id }).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '成功提交审核')
                            this.listData[index].auditStatus = 0
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                  this.showMessage('info', '已取消提交')
                })
            },
            // 编辑活动
            editActivity(id) {
                this.$router.push({ path: '/admin/activity/publish', query: { id: id } })
            }
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
#activity_uncheckedlist {
    padding: 0 18px 20px;
    .list {
        li {
            width: 100%;
            box-sizing: border-box;
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
                .activity-type{
                    color: #333;
                    font-size: 14px;
                    line-height: 2em;
                }
                .activity-time{
                    color: #626262;
                    font-size: 14px;
                    line-height: 2em;
                    font-weight: lighter;
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
    #activity_uncheckedlist{
        .el-select{
            height: 31px;
        }
    }
</style>