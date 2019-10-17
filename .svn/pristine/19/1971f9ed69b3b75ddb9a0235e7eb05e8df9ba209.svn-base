<template>
    <div id="subject_item_msg" class="msg-box bgw clearfix">
        <div class="item-title">
            <h4 v-if="isDetails">{{item.name}}</h4>
            <router-link v-if="!isDetails && auditedStatus == '1'" :to="{path:'/admin/subject/detail/info',query:{subjectId:item.id}}">{{item.name}}</router-link>
            <router-link v-if="!isDetails && [0, 3].includes(item.auditStatus)" :to="{path:'/admin/subject/preview',query:{subjectId:item.id}}">{{item.name}}</router-link>
            <router-link v-if="!isDetails && [-1, 2].includes(item.auditStatus)" :to="{path:'/admin/subject/apply',query:{subjectId:item.id}}">{{item.name}}</router-link>
        </div>
        <div class="item-left fl">
            <ul>
                <li>课题级别：{{item.subjectLevelName}}</li>
                <li>研究领域：{{item.researchFieldName}}</li>
                <li>负责人：{{item.headUserName}}</li>
                <li>申报时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</li>
            </ul>
        </div>
        <div class="item-right fl">
            <ul>
                <li>课题编号：{{item.subjectCode}}</li>
                <li>所属单位：{{item.schoolId}}</li>
                <li>预期成果：{{item.resultType}}</li>
                <li>预期完成时间：{{item.endDate | dateFormat('yyyy-MM-dd')}}</li>
            </ul>
        </div>
        <div class="status-box" v-if="auditedStatus == '1'">
            <span>{{statusType[item.status]}}</span>
        </div>
        <div class="status-box" v-if="auditedStatus == ''">
            <span v-if="item.auditStatus == -1">待提交</span>
            <span v-if="item.auditStatus == 0">待审核</span>
            <span v-if="item.auditStatus == 2">不通过</span>
            <span v-if="item.auditStatus == 3">审核中</span>
        </div>
        <div class="options-box" v-if="auditedStatus == ''">
            <v-operate @on-delete="deleteSubject(item.id)" @on-edit="editSubject(item.id)" @on-submit="submit(item.id)"
                :icon-group="generateIconGroup(item.auditStatus)" label="课题"></v-operate>
        </div>
        <button @click="showRecordDialog(item.id)" v-if="auditedStatus == ''" class="btn-verify-record pa" style="top: 80px;">审核记录</button>
        <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'busId'}" />
    </div>
</template>

<script>
    import delPopover from 'components/common/del_popover.vue'
    import operate from 'components/common/operate.vue'
    import verifyRecordDialog from 'components/my/verify_record_dialog.vue'
    import { delSubject, submitSubject } from '@/service/subject.js'

    export default {
        name: 'subject_item_msg',
        components: {
            'del-popover': delPopover,
            'v-operate': operate,
            verifyRecordDialog
        },
        data() {
            return {
                api: '/maker/subject/audit/selectList',
                dialog: { isVisible: false },
                curRecordId: '', // 当前审核记录ID
                statusType: {
                    1: '立项',
                    2: '开题',
                    3: '中期评估',
                    4: '结题验收',
                    5: '已结束'
                },
            }
        },
        props: {
            item: {
                type: Object,
                default() {
                    return {
                        name: '',
                        id: '',
                        subjectLevelName: '',
                        researchField: '',
                        headUserName: '',
                        projectDate: '',
                        subjectCode: '',
                        unit: '',
                        resultType: '',
                        endDate: '',
                        status: ''
                    }
                }
            },
            isDetails: {
                type: Boolean,
                default: false,
            },
            auditedStatus: {
                type: String,
                default: '1'
            }
        },
        methods: {
            showRecordDialog(id) { // 显示审核记录弹窗
                this.curRecordId = id
                this.dialog.isVisible = true
            },
            updateData() {
                this.$emit('getSubjectList')
            },
            // 待审列表操作按钮
            generateIconGroup(status) {
                const edit = status === -1 || status === 2 ? 'edit' : ''
                const submit = status === -1 || status === 2 ? 'submit' : ''
                const del = status === -1 || status === 2 ? 'delete' : ''
                return [edit, submit, del]
            },
            // 删除活动
            deleteSubject(id) {
                delSubject({ id: id }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '已删除')
                        this.$emit('getSubjectList')
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            },
            // 提交审核
            submit(id) {
                this.$confirm('此操作将该课题提交审核，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    submitSubject({ id: id }).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '成功提交审核')
                            this.item.auditStatus = 0
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                    this.showMessage('info', '已取消提交')
                })
            },
            // 编辑活动
            editSubject(id) {
                this.$router.push({ path: '/admin/subject/apply', query: { subjectId: id } })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .msg-box{
        width: 100%;
        position: relative;
        .item-title{
            width: 100%;
            margin-bottom: 8px;
            font-weight: bold;
            font-size: 14px;
            a{
                font-size: 14px;
            }
            h4{
                color: nth($default-color, 1);
                cursor: default;
                font-size: 22px;
                margin-bottom: 20px;
            }
        }
        .item-left{
            width: 320px;
            line-height: 24px;
            font-size: 14px;
            ul{
                li{
                    height: 24px;
                    overflow: hidden;
                }
            }
        }
        .item-right{
            line-height: 24px;
            font-size: 14px;
        }
        .status-box{
            cursor: default;
            position: absolute;
            top: 0px;
            right: 0px;
            font-size: 16px;
            color: nth($default-color, 1);
        }
        .options-box{
            position: absolute;
            top: 40px;
            right: 20px;
            font-size: 18px;
            width: 100px;
            span{
                a{
                    i{
                        vertical-align: top;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .msg-box:hover{
        a{
            color: nth($default-color, 1);
        }
    }
</style>