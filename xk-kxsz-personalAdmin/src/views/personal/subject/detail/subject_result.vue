<template>
    <section class="subject_result">
        <div class="btn-box clearfix" v-if="isCreater || isMember">
            <upload-result :visible="visible" @callback="getSubjectResultList"></upload-result>
            <button class="psn-cancel-btn fr" @click="visible.show = true">上传成果</button>
        </div>
        <div class="table-box">
            <el-table class="data-table" :data="taskList" style="width: 100%" border>
                <el-table-column prop="name" label="成果名称" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a class="link-to-detail" v-text="scope.row.name"></a>
                    </template>
                </el-table-column>
                <el-table-column prop="resultType" label="成果类型">
                    <template slot-scope="scope">
                        {{scope.row.resultType | translate(resultTypeDL)}}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="上传人"></el-table-column>
                <el-table-column prop="createDate" label="上传时间">
                    <template slot-scope="scope">{{ scope.row.createDate | dateFormat('yyyy.MM.dd') }}</template>
                </el-table-column>
                <el-table-column label="操作" v-if="isCreater || isMember">
                    <template slot-scope="scope">
                        <del-popover v-if="isCreater" title="删除" class="delete" :delData="{ url:'maker/subject/result/del', params:{id: scope.row.id}, name:'成果' }" @callback="callback"></del-popover>
                        <!-- <a title="下载" class="icon-btn-download" style="vertical-align: top;" :href="downloadUrl(scope.row.resourceId, scope.row.name)" :download="scope.row.name"></a> -->
                        <a title="下载" class="icon-btn-download" style="vertical-align: top;" href="javascript:;" @click="downloadUrl(scope.row.resourceId, scope.row.name)"></a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
    import uploadResult from 'components/subject/upload_result.vue'
    import delPopover from 'Common/del_popover.vue'
    import pagination from 'Common/pagination.vue'
    import { requestSubjectResultList } from '@/service/subject.js'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'subject_result',
        components: {
            'del-popover': delPopover,
            'upload-result': uploadResult,
            'v-pagination': pagination
        },
        data() {
            return {
                visible: { show: false },
                taskList: [],
                param: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                }
            }
        },
        props: ['isCreater', 'isMember'],
        computed: {
            ...mapState('dictionaryCommon', {
                resultTypeDL(state) {
                    const dicList = (state.resultTypeDicList || {}).dicList || []
                    return dicList
                },
            }),
        },
        mounted() {
            this.getSubjectResultList()
        },
        methods: {
            ...mapActions('subject', ['statisticalSub']),
            changePage(val) {
                this.param.pageNum = val
                this.getSubjectResultList()
            },
            /*
            *获取课题成果列表
            */
            getSubjectResultList() {
                requestSubjectResultList({ subjectId: this.$route.query.subjectId }, { pageSize: 5, pageNum: this.param.pageNum }).then((res) => {
                    if (res.data.code === 200) {
                        this.taskList = res.data.entity.resultData
                        this.param.totalNum = res.data.entity.totalNum
                    }
                })
            },
            callback() {
                this.getSubjectResultList()
                this.statisticalSub('resultNum')
            }
        }
    }
</script>

<style lang='scss'>
    @import '~@/assets/css/scss/table.scss';
    .subject_result{
        .el-table{
            .cell{
                text-align: center;
            }
        }
        .el-dialog {
            width: 640px;
        }
    }
</style>
<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .subject_result{
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
</style>