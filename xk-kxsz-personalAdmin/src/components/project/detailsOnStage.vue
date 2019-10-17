<template>
    <el-dialog class="project-stage-detail" title="阶段详情" :visible.sync="visible.show" size="tiny">
        <!-- <header class="header">
            阶段详情
        </header> -->
        <div class="box">
            <p><strong>项目阶段:</strong> {{StageStatus.statusName}}</p>
            <p><strong>计划时间:</strong> {{StageStatus.phaseStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.phaseEndTime | dateFormat('yyyy.MM.dd')}}</p>
            <p><strong>实际时间:</strong> {{StageStatus.realityStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.realityEndTime | dateFormat('yyyy.MM.dd')}}</p>
            <!-- <p><strong>成果:</strong> {{StageStatus.resources}}</p> -->
        </div>
    </el-dialog>
</template>

<script>
// import { admininviteMembersList } from '@/service/project.js'

export default {
    name: 'detailsOnStage', // 邀请成员
    props: ['visible', 'StageStatus']
}
</script>
<style lang='scss'>
.project-stage-detail {
    .el-dialog__body {
        padding: 0;
    }
    .box {
        .el-icon-search {
            width: 50px;
            &:before {
                color: #666666;
            }
        }
        .el-textarea__inner {
            border-radius: 0;
        }
    }
}
</style>
<style lang='scss' scoped>
.project-stage-detail {
    .header {
        height: 54px;
        line-height: 54px;
        text-indent: 1em;
        border-bottom: 1px solid #D7D7D7;
        font-size: 16px;
        font-weight: bold;
    }
    .box {
        padding: 30px 60px;
        box-sizing: border-box;
        p {
            margin: 10px 0;
        }
    }
}
</style>
