<template>
    <div class="adminSubjectDetails">
        <div class="preview-msg backend-content__middle">
            <section class="msg">
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题名称:</el-col>
                    <el-col :span="19"> {{ subjectDetails.name }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">研究领域:</el-col>
                    <el-col :span="19"> {{ subjectDetails.researchFieldName }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题级别:</el-col>
                    <el-col :span="19"> {{ subjectDetails.subjectLevelName }} </el-col>
                </el-row>
<!--                 <el-row :gutter="20" class="row-bg">
                    <el-col class="label">负责人:</el-col>
                    <el-col :span="19"> {{ subjectDetails.headUserName }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">参与人:</el-col>
                    <el-col :span="19">

                    </el-col>
                </el-row> -->
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">预期的主要成果:</el-col>
                    <el-col :span="19"> {{ subjectDetails.result }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">经费来源:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.fundSource"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">经费数额:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.funding"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">预期完成时间:</el-col>
                    <el-col :span="19"> {{ subjectDetails.endDate | dateFormat('yyyy.MM.dd') }} </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">选题依据:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.topicBasis"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题研究的背景及意义:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.significance"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题研究的内容:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.connent"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题研究的过程及方法:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.methodStep"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题研究的预期成果:</el-col>
                    <el-col :span="19"> <span v-html="subjectDetails.result"></span> </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">指导专家:</el-col>
                    <el-col :span="19">
                         <span v-for="(i, k) in subjectDetails.memberList" > {{ k === 0 ? '': ',' }} {{ i.name }} </span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">课题资源:</el-col>
                    <el-col :span="19">
                        <span v-for="(i, k) in subjectDetails.resourceList" > {{ k === 0 ? '': ',' }} {{ i.name }} </span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="row-bg">
                    <el-col class="label">附件:</el-col>
                    <el-col :span="19">
                        <ul>
                            <li v-for='(i, k) in subjectDetails.attList'>
                                <!-- <a :href="downloadUrl( i.resourceId, i.name )" :download="i.name" style="color:#0391D9;"> {{ i.name }} </a> -->
                                <a href="javascript:;" @click="downloadUrl(i.resourceId, i.name )" style="color:#0391D9;"> {{ i.name }} </a>
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
    import tabs from '@/components/common/tabs.vue'
    import audit_record from '@/components/common/popup/audit_record.vue' //审核记录弹窗
    import { requesrSubjectReportDetail } from '@/service/subject.js'
    import { requestSubjectAuditDetail } from '@/service/admin_space.js'  // 审核记录数据接口
    export default {
        name:'adminSubjectDetails',
        components:{
            'v-tabs':tabs,
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
                requesrSubjectReportDetail({id:this.$route.query.id}).then((res)=>{
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
            width: 166px;
            text-align: right;
        }
    }
}
.btn-box {
    margin-top: 20px;
}
</style>