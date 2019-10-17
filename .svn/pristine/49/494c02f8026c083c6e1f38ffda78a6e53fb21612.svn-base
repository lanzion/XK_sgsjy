<template>
    <el-dialog class="dialog" :title="stageDetail.stageName || title" :visible.sync="visible.show">
        <!-- <header class="header">{{stageDetail.stageName || title}}</header> -->
        <section class="details-box">
            <h5>开题报告</h5>
            <article class="content">
                <div v-if="stageDetail.auditRemark">{{stageDetail.auditRemark}}</div>
                <div class="empty-block" v-else>无开题报告</div>
            </article>
            <div class="file-box">
                <dl class="clearfix">
                    <dt class="fl">附件：</dt>
                    <dd class="file" v-if="stageDetail.resourceId">
                        <a :title="downloadUrl(stageDetail.resourceId)" :href="downloadUrl(stageDetail.resourceId, stageDetail.resourceName)" :download="stageDetail.resourceName || '无文件名'">{{stageDetail.resourceName || '无附件名'}}</a>
                    </dd>
                    <dd v-else>暂无附件</dd>
                </dl>
            </div>
            <div class="audit-result">
                <dl class="content-item clearfix">
                    <dt>审核结果：</dt>
                    <dd>{{result[stageDetail.auditResult]}}</dd>
                </dl>
                <dl class="content-item clearfix">
                    <dt>审核意见：</dt>
                    <dd>{{stageDetail.remark || '暂无意见'}}</dd>
                </dl>
            </div>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="visible.show = false">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'stage_detail',
        components: {
        },
        data() {
            return {
                title: '开题',
                result: {
                    0: '待审核',
                    1: '审核通过',
                    2: '审核不通过',
                    3: '审核中'
                },
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            stageDetail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
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
            line-height: 2.5em;
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
        .content{
            line-height: 2em;
            margin-bottom: 20px;
            min-height: 100px;
        }
        .file-box{
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #c9c9c9;
            .file{
                a{
                    color: #00a0e9;
                    cursor: pointer;
                }
            }
            dd{
                padding-left: 50px;
            }
        }
        .content-item{
            margin-bottom: 8px;
            line-height: 1.5em;
            dt{
                float: left;
            }
            dd{
                padding-left: 80px;
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
    }
</style>

<style lang="scss">
.dialog{
    .el-dialog{
        min-width: 640px;
    }
}
</style>

