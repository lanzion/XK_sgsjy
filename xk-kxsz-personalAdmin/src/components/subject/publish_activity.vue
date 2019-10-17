<template>
    <el-dialog class="publish_activity dialog" title="发布课题活动" :visible.sync="visible.show">
        <!-- <header class="header">发布课题活动</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 名称 -->
                <el-row>
                    <el-form-item label="活动名称" prop="title">
                        <el-col :span="14">
                            <el-input :maxlength="50" placeholder="请输入任务名称，最多50字" v-model="form.title"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 任务期限 -->
                  <el-row>
                      <el-form-item label="活动时间">
                          <el-col :span="6">
                              <el-form-item prop="startDate" class="date-box">
                                  <el-date-picker type="date" placeholder="开始时间" v-model="form.startDate" :picker-options="pickerOptions1" style="width: 100%;" @change="dateChange"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align:center">—</el-col>
                        <el-col :span="6">
                            <el-form-item prop="endDate" class="date-box">
                                  <el-date-picker type="date" placeholder="结束时间" v-model="form.endDate" :picker-options="pickerOptions2" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 负责人 -->
                  <el-row>
                      <el-form-item label="主持人" prop="compereUserId">
                          <el-col :span="14">
                              <el-select v-model="form.compereUserId" placeholder="请选择主持人（课题成员），单选">
                                <el-option
                                  v-for="item in subjectMembers"
                                  :key="item.userId"
                                  :label="item.userName"
                                  :value="item.userId">
                                </el-option>
                            </el-select>
                          </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 参与人 -->
                  <el-row>
                      <el-form-item label="参与人" prop="memberList">
                        <el-col :span="14">
                              <el-select v-model="form.memberList" placeholder="请选择参与人（课题成员），多选" :multiple="true">
                                <el-option
                                  v-for="item in subjectMembers"
                                  :key="item.userId"
                                  :label="item.userName"
                                  :value="item.userId">
                                </el-option>
                            </el-select>
                          </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 任务内容 -->
                  <el-row>
                      <el-form-item label="任务内容" prop="content">
                          <el-col :span="23">
                              <el-input type="textarea" :maxlength="500" v-model="form.content" placeholder="请输入活动内容，最多不超过500字" style="height: 100px;"></el-input>
                          </el-col>
                      </el-form-item>
                  </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="psn-cancel-btn" @click="cancel">取消</a>
            <a class="psn-confirm-btn" @click="submitPublish">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { addSubjectActivity, requestSubjectActivityDetails, modifySubjectActivity, requestSubjectMembers } from '@/service/subject.js'
    import { mapActions } from 'vuex'

    let startTime = Date.now() - 8.64e7

    export default {
        name: 'publish_activity',
        data() {
            return {
                eidt: '',
                form: {
                    title: '',
                    startDate: '',
                    endDate: '',
                    compereUserId: '',
                    memberList: [],
                    content: ''
                },
                subjectMembers: [],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < startTime
                    }
                },
                rules: {
                    title: [
                        { required: true, message: '请输入任务名称', trigger: 'change' },
                        { max: 50, message: '不超过50字符', trigger: 'change' }
                    ],
                    startDate: [
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    endDate: [
                        { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
                    ],
                    compereUserId: [
                        { required: true, message: '请选择主持人', trigger: 'change' }
                    ],
                    memberList: [
                        { type: 'array', required: true, message: '请选择参与人', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入任务内容', trigger: 'change' },
                        { max: 500, message: '不超过500字', trigger: 'change' }
                    ]
                },
                id: ''
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            isEdit: {
                type: Boolean,
                default: false
            },
            activityId: {
                type: String,
                default: ''
            }
        },
        watch: {
            isEdit: {
                handler: function (val) {
                    this.edit = val
                },
                deep: true
            },
            activityId: {
                handler: function (val) {
                    this.id = val
                    if (this.id !== '') {
                        this.getActivityDetails(this.id)
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.getSubjectMember()
        },
        methods: {
            ...mapActions('subject', ['statisticalAdd']),
            dateChange() {
                if (this.form.startDate === undefined) {
                    this.form.startDate = ''
                }
                if (this.form.endDate === undefined) {
                    this.form.endDate = ''
                }
                   if (this.form.startDate !== '') {
                       startTime = this.form.startDate.getTime()
                       this.pickerOptions2 = {
                          disabledDate(time) {
                            return time.getTime() < startTime
                          }
                    }
                 } else if (this.form.startDate === '') {
                     this.form.endDate = ''
                     this.pickerOptions2 = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                 }
                 if (this.form.endDate !== '' && this.form.startDate !== '' && this.form.startDate.getTime() > this.form.endDate.getTime()) {
                     this.form.endDate = ''
                 }
            },
            // 获取课题成员
            getSubjectMember() {
                requestSubjectMembers({ subjectId: this.$route.query.subjectId }).then((res) => {
                    if (res.data.code === 200) {
                        this.subjectMembers = res.data.entity.resultData
                    }
                })
            },
            getActivityDetails(id) {
                requestSubjectActivityDetails({ id: id }).then((res) => {
                    const datas = res.data.entity
                    this.form.title = datas.title
                    this.form.startDate = new Date(datas.startDate)
                    this.form.endDate = new Date(datas.endDate)
                    this.form.compereUserId = datas.compereUserId
                    this.form.content = datas.content
                    for (const i in datas.memberList) {
                        this.form.memberList.push(datas.memberList[i].userId)
                    }
                })
            },
            submitPublish() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const form = this.form
                        const members = []
                        for (const i in form.memberList) {
                            members.push({ userId: form.memberList[i] })
                        }
                        const params = {
                            subjectId: this.$route.query.subjectId,
                            title: form.title,
                            startDate: form.startDate.getTime(),
                            compereUserId: form.compereUserId,
                            endDate: form.endDate.getTime(),
                            content: form.content,
                            memberList: members
                        }
                        if (this.edit) {
                            params.id = this.id
                            modifySubjectActivity(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.visible.show = false
                                    this.$refs.form.resetFields()
                                    this.showMessage('success', '修改成功')
                                    this.$emit('changeId')
                                    this.$emit('callback')
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        } else {
                            addSubjectActivity(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.visible.show = false
                                    this.$refs.form.resetFields()
                                    this.showMessage('success', '发布成功')
                                    this.statisticalAdd('activityNum')
                                    this.$emit('callback')
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        }
                    } else {
                        this.showMessage('warning', '请按要求填写完整信息')
                    }
                })
            },
            // 取消
            cancel() {
                this.visible.show = false
                this.$refs.form.resetFields()
                this.form.memberList = []
                this.$emit('changeId')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
    .publish_activity{
        .content-box{
            margin: 35px 0 80px;
            .label{
                line-height: 38px;
                margin: 0 18px 0px 40px;
                font-size: 18px;
            }
            .upload-btn{
                width: 96px;
                height: 38px;
                line-height: 38px;
                border:1px solid #ccc;
                padding: 8px;
                margin-right: 15px;
                i{
                    font-size: 14px;
                    color: $theme_color;
                }
            }
        }
    }
</style>

<style lang="scss">
.publish_activity{
    .el-textarea__inner{
        height: 85px;
    }
    .el-input__inner{
        height: 38px;
    }
    .el-select{
        height: 38px;
        width: 100%;
        .el-tag{
            margin-left: 10px;
        }
    }
    .date-box {
        .el-form-item__content {
            margin-left: 0px !important;
        }
    }
}
</style>

