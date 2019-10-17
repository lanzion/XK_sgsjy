<template>
    <el-dialog class="dialog task_details" title="课题任务" :visible.sync="visible.show">
        <!-- <header class="header">课题任务</header> -->
        <section class="details-box">
            <h5>任务详情</h5>
            <div class="content">
                <dl class="content-item clearfix">
                    <dt>任务名称：</dt>
                    <dd>{{taskDetails.taskName}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>任务期限：</dt>
                    <dd>{{taskDetails.taskStartTime | dateFormat('yyyy.MM.dd')}} - {{taskDetails.taskEndTime | dateFormat('yyyy.MM.dd')}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>负责人：</dt>
                    <dd>{{taskDetails.haedUserName}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>参与人：</dt>
                    <dd>{{taskDetails.userName}}</dd>
                </dl>
                <dl class="content-detail">
                    <dt>任务内容：</dt>
                    <dd>
                        {{taskDetails.taskContent}}
                    </dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>任务状态：</dt>
                    <dd v-if="taskDetails.status === 1">未完成</dd>
                    <dd v-if="taskDetails.status === 2">已完成</dd>
                </dl>
            </div>
            <h5>任务完成情况</h5>
            <div class="content" v-if="taskDetails.status === 2">
                <dl class="content-item clearfix">
                    <dt>完成时间：</dt>
                    <dd>{{taskDetails.endDate | dateFormat('yyyy.MM.dd')}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>完成说明：</dt>
                    <dd>{{taskDetails.introduction}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>附件：</dt>
                    <dd class="file" v-if="taskDetails.resources.length > 0">
                        <p v-for="(item,index) in taskDetails.resources" :key="index">{{item.name}}</p>
                    </dd>
                    <dd v-else>暂无附件</dd>
                </dl>
            </div>
            <div v-else class="unfinished">还未完成</div>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="visible.show = false">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { requestSubjectTaskDetails } from '@/service/subject.js'

    export default {
        name: 'task_details',
        components: {
        },
        data() {
            return {
                id: '',
                taskDetails: {}
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            taskId: {
                type: String,
                default: ''
            }
        },
        watch: {
            taskId: {
                handler: function (val) {
                    this.id = val
                    this.getTaskDetails(this.id)
                },
                deep: true
            }
        },
        methods: {
            /*
             * 获取课题任务详情
             * id: 任务Id
             */
            getTaskDetails(id) {
                requestSubjectTaskDetails({ id: id }).then((res) => {
                    this.taskDetails = res.data.entity
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
    .details-box{
        width: 100%;
        margin-top: 20px;
        h5{
            font-size: 14px;
            color: #00a0e9;
            line-height: 2.5em;
            background-color: #eee;
            padding-left: 10px;
            margin-bottom: 10px;
        }
        dl{
            dt{
                font-size: 14px;
            }
            dd{
                font-size: 12px;
            }
        }
        .content-item{
            margin-bottom: 8px;
            line-height: 1.5em;
            dt,dd{
                float: left;
            }
            dd{
                width: 70%;
            }
            .file{
                color: #00a0e9;
            }
        }
        .content-detail{
            dt{
                line-height: 1.5em;
                margin-bottom:8px;
            }
            dl{
                line-height: 1.5em;
            }
            margin-bottom: 8px;
        }
        .unfinished{
            text-align: center;
            line-height: 30px;
        }
    }
</style>

<style lang="scss">
.dialog.task_details{
    .el-dialog{
        min-width: 592px;
    }
    .el-textarea__inner{
        height: 85px;
    }
    .el-input__inner{
        height: 38px;
    }
    .el-select{
        height: 38px;
        width: 100%;
    }
    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
        position: absolute;
        top: 5px;
        right: 10px;
    }
}
</style>

