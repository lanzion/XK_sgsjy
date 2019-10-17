<template>
    <div class="adminSubjectDetails">
        <div class="preview-msg backend-content__middle">
            <section class="msg">
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">标题:</el-col>
                    <el-col :span="20"> {{ subjectDetails.title }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">申报时间:</el-col>
                    <el-col :span="20"> {{ subjectDetails.createDate | dateFormat('yyyy.MM.dd') }} -- {{ subjectDetails.endDate | dateFormat('yyyy.MM.dd') }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">发布单位:</el-col>
                    <el-col :span="20"> {{ subjectDetails.jobName }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">指南内容:</el-col>
                    <el-col :span="20"> <span v-html="subjectDetails.content"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">指导专家:</el-col>
                    <el-col :span="20">
                        <span v-for="(i, k) in subjectDetails.memberList" > {{ k === 0 ? '': ',' }} {{ i.name }} </span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">课题资源:</el-col>
                    <el-col :span="20">
                        <span v-for="(i, k) in subjectDetails.resourceList" > {{ k === 0 ? '': ',' }} {{ i.name }} </span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col :span="2" class="label">附件:</el-col>
                    <el-col :span="20">
                        <ul>
                            <li v-for='(i, k) in subjectDetails.attList'>
                                <a :href="downloadUrl( i.resourceId, i.name )" :download="i.name" style="color:#0391D9;"> {{ i.name }} </a>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </section>
            <div class="btn-box">
                <button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
                <button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
            </div>
        </div>
        <el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
            <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
        </el-dialog>
    </div>
</template>

<script>
    import subjectMsg from 'Common/module/subject/subject_item_msg.vue'
    import tabs from 'Common/classificationList/classification/tabs.vue'
    import subjectMember from 'Common/module/subject/subject_member.vue'
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
    import subjectDetail from '../../../space/edu/subject/children/subject_details.vue'
    import { requesrSubjectGuidDetail } from '@/service/subject.js'
    import { requestSubjectAuditDetail } from '@/service/admin_space.js'  // 审核记录数据接口
    export default {
        name:'adminSubjectDetails',
        components:{
            'subject-msg':subjectMsg,
            'v-tabs':tabs,
            'subject-member':subjectMember,
            'subject-detail':subjectDetail,
            'v-audit-record': audit_record
        },
        data () {
            return {
                tabs: [
                    { name: '课题详情', type: 'info' },
                ],
                listData:{
                    auditedStatus:1
                },
                subjectDetails:{},
                auditVisible:false,         // 审核记录弹窗是否可见
                auditData: []               // 审核记录数据
            }
        },
        created(){
        },
        mounted(){
            this.getSubjectDetails();
        },
        methods:{
            /*
            *获取课题详情
            *id:this.$route.query.id
             */
            getSubjectDetails(){
                requesrSubjectGuidDetail({id:this.$route.query.id}).then((res)=>{
                    this.subjectDetails = res.data.entity;
                })
            },
            // 关闭弹框
            close() {
                this.auditVisible = false
            },
            //获取审核记录
            popupAudit(){
                requestSubjectAuditDetail({busId:this.$route.query.id}).then((res) => {
                    if(res.data.code === 200){
                        this.auditData = res.data.appendInfo.list
                    }
                });
                this.auditVisible = true;
            },
        }
    }
</script>

<style lang='scss' scoped>
.msg {
    font-size: 14px;
    .row-bg {
        padding: 10px 0;
        .label {
            // text-indent: 2em;
            text-align: right;
        }
    }
}
.btn-box {
    margin-top: 20px;
}
</style>