<template>
    <section class="subject_task">
        <div class="btn-box clearfix" v-if="isCreater">
            <button class="psn-cancel-btn fr" @click="isEdit = false; visible1.show = true">发布任务</button>
            <publish-task :visible="visible1" :isEdit="isEdit" :taskId="taskId3" @changeId="changeId" @callback="getSubjectTaskList"></publish-task>
        </div>
        <div class="table-box">
            <el-table class="data-table" :data="taskList" style="width: 100%" border>
                <el-table-column prop="taskName" label="任务名称" width="140" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a class="link-to-detail" @click="visible3.show = true;taskId2 = scope.row.id" v-text="scope.row.taskName"></a>
                    </template>
                </el-table-column>
                <el-table-column prop="headUserName" label="负责人" width="80"></el-table-column>
                <el-table-column prop="userName" label="参与人" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.userName || ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="taskStartTime" label="任务期限" width="115" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.taskStartTime | dateFormat('yyyy.MM.dd') }} - {{ scope.row.taskEndTime | dateFormat('yyyy.MM.dd') }}</template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 1">未完成</div>
                        <div v-if="scope.row.status === 2">已完成</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="123" v-if="isCreater">
                    <template slot-scope="scope">
                        <i title="完成" class="icon-btn-complete icon-btn" @click="openCompleteDialog(scope.row.id)"></i>
                        <i title="编辑" class="icon-btn-edit icon-btn" @click="editTask(scope.row.id)"></i>
                        <del-popover title="删除" class="delete" :delData="{ url:'maker/subject/task/del', params:{id: scope.row.id}, name:'任务' }" @callback="callback"></del-popover>
                    </template>
                </el-table-column>
            </el-table>
            <complete-task :visible="visible2" :taskId="taskId1" @callback="getSubjectTaskList"></complete-task>
            <task-detail :visible="visible3" :taskId="taskId2"></task-detail>
        </div>
        <v-pagination :param="params" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
    import publishTask from 'components/subject/publish_task.vue'
    import taskDetail from 'components/subject/task_details.vue'
    import completeTask from 'components/subject/complete_task.vue'
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import { requestSubjectTaskList } from '@/service/subject.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'subject_task',
        components: {
            'del-popover': delPopover,
            'publish-task': publishTask,
            'complete-task': completeTask,
            'task-detail': taskDetail,
            'v-pagination': pagination
        },
        data() {
            return {
                visible1: {
                    show: false
                },
                isEdit: false,
                visible2: {
                    show: false
                },
                visible3: {
                    show: false
                },
                taskList: [],
                params: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                },
                taskId1: '',
                taskId2: '',
                taskId3: ''
            }
        },
        props: ['isCreater'],
        mounted() {
            this.getSubjectTaskList()
        },
        methods: {
            ...mapActions('subject', ['statisticalSub']),
            changePage(val) {
                this.params.pageNum = val
                this.getSubjectTaskList()
            },
            /*
            *打开完成任务弹窗
            *id:任务Id
             */
            openCompleteDialog(id) {
                this.taskId1 = id
                this.visible2.show = true
            },
            /*
            *获取课题任务列表
            *subjectId:课题Id
             */
            getSubjectTaskList() {
                requestSubjectTaskList({ subjectId: this.$route.query.subjectId }, { pageSize: 10, pageNum: this.params.pageNum }).then((res) => {
                    if (res.data.entity === null) {
                        this.taskList = []
                        this.params.totalNum = 0
                    } else {
                        this.taskList = res.data.entity.resultData
                        this.params.totalNum = res.data.entity.totalNum
                    }
                })
            },
            /*
            *编辑任务
             */
            editTask(id) {
                this.isEdit = true
                this.taskId3 = id
                this.visible1.show = true
            },
            changeId() {
                this.taskId3 = ''
            },
            callback() {
                this.getSubjectTaskList()
                this.statisticalSub('taskNum')
            }
        }
    }
</script>

<style lang='scss'>
    @import '~@/assets/css/scss/table.scss';

    .subject_task{
        .el-table{
            .cell{
                text-align: center;
            }
        }
        .el-dialog {
            width: 680px;
        }
    }
</style>
<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-size;
    }
    .subject_task{
        padding: 5px 15px 15px;
    }
    .btn-box{
        width: 100%;
        margin-bottom: 10px;
        button{
            width: 92px;
            height: 40px;
            color: $theme_color;
            border:1px solid $theme_color;
        }
        button:hover{
            background-color: $theme_color;
            color: #fff;
        }
    }
    .icon-btn{
        vertical-align: top;
    }
    .link-to-detail:hover{
        color: #00a0e9;
    }
</style>