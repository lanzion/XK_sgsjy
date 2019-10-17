<template>
    <div class="subject_apply backend-content__middle">
        <v-breadcrumb v-if="!isAdmin"></v-breadcrumb>
        <el-form ref="form" :model="form" label-width="163px" :rules="rules">
            <!-- 课题名称 -->
            <el-row>
                  <el-form-item label="课题名称" prop="name">
                    <el-col :span="10">
                          <el-input :disabled="isPreview" placeholder="请输入课题名称，50字以内" :maxlength="50" v-model="form.name"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 研究领域 -->
            <el-row>
                <el-form-item label="研究领域" prop="researchField">
                    <el-col :span="10">
                        <v-multiSelect :disabled="isPreview" :selectData.sync='form.researchField' :ifAll="false" :model="'subject'"></v-multiSelect>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 课程级别 -->
            <el-row>
                <el-form-item label="课题级别" prop="subjectLevel">
                    <el-col :span="10">
                        <el-select :disabled="isPreview" style="width:323px;" v-model="form.subjectLevel" placeholder="请选择课题级别">
                            <el-option
                                  v-for="item in subjectLevelDicList.dicList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                            </el-option>
                          </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 负责人 -->
            <el-row>
                  <el-form-item label="负责人" prop="headUserName">
                    <el-col :span="10">
                          <el-input placeholder="默认本人" v-model="form.headUserName" disabled></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 参与人 -->
            <el-row>
                <el-form-item label="参与人" prop="memberList">
                    <el-col :span="10">
                        <select-participator :disabled="isPreview" :memberList.sync="form.memberList"></select-participator>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 预期的主要成果 -->
            <el-row>
                <el-form-item label="预期的主要成果" prop="resultType">
                    <el-col :span="12">
                        <el-checkbox-group :disabled="isPreview" v-model="form.resultType">
                            <el-checkbox
                            :disabled="isPreview"
                            v-for="item in resultTypeDicList.dicList"
                            :label="item.name"
                            :value="item.name"
                            :key="item.name">
                            {{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 经费来源 -->
            <el-row>
                  <el-form-item label="经费来源" prop="fundSource">
                    <el-col :span="10">
                          <el-input :disabled="isPreview" :maxlength="50" placeholder="请输入经费来源,不超过50字符" v-model="form.fundSource"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 经费数额 -->
            <el-row>
                  <el-form-item label="经费数额" prop="funding">
                    <el-col :span="10">
                          <el-input :disabled="isPreview" placeholder="请输入经费数额(数字)" @change="moneyFormat" v-model="form.funding" :maxlength="16"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 预期完成时间 -->
            <el-row>
                <el-form-item label="预期完成时间" prop="projectDate">
                    <el-col :span="10">
                        <el-date-picker :disabled="isPreview" type="date" placeholder="预期完成时间" v-model="form.projectDate" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 选题依据 -->
            <el-row>
                  <el-form-item label="选题依据" prop="topicBasis">
                      <el-col :span="24">
                        <el-input :disabled="isPreview" type="textarea" :maxlength="500" v-model="form.topicBasis" placeholder="请输入选题依据，500字以内"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 课题研究的背景及依据 -->
            <el-row>
                  <el-form-item label="课题研究的背景及意义" prop="significance">
                      <el-col :span="24">
                        <el-input type="textarea" :disabled="isPreview" :maxlength="500" v-model="form.significance" placeholder="请输入课题研究的背景及意义（为什么研究），500字以内"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 课题研究的内容 -->
            <el-row>
                  <el-form-item label="课题研究的内容" prop="connent">
                      <el-col :span="24">
                        <el-input type="textarea" :disabled="isPreview" :maxlength="500" v-model="form.connent" placeholder="请输入课题研究的内容（研究什么或解决什么问题），500字以内"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 课题研究的过程及方法 -->
            <el-row>
                  <el-form-item label="课题研究的过程及方法" prop="methodStep">
                      <el-col :span="24">
                        <el-input type="textarea" :disabled="isPreview" :maxlength="500" v-model="form.methodStep" placeholder="请输入课题研究的过程及方法（怎样研究或怎样解决该问题），500字以内"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 选题依据 -->
            <el-row>
                  <el-form-item label="课题研究的预期成果" prop="result">
                      <el-col :span="24">
                        <el-input type="textarea" :disabled="isPreview" :maxlength="500" v-model="form.result" placeholder="请输入课题研究的预期成果，500字以内"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="12">
                        <el-upload class="upload-demo" v-bind:class="{'list-disabled': isPreview}" :disabled="isPreview" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
                                <span slot="tip" class="upload-tip">文件大小在{{ standardFileSize }}M以内</span>
                            </el-upload>
                    </el-col>
                  </el-form-item>
            </el-row>
            <el-form-item v-if="!isPreview">
                <button class="psn-confirm-btn" @click.prevent="applySubmit(0)">保存</button>
                <button class="psn-confirm-btn" @click.prevent="applySubmit(1)">提交审核</button>
                <button class="psn-cancel-btn" @click.prevent="$router.push(routeLink)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import multiSelect from 'Common/select/multi_select.vue'
    import breadcrumb from 'Common/breadcrumb.vue'
    import { loginInfo } from 'Asset/js/getUserInfo.js'
    import selectParticipator from 'components/subject/select_participator.vue'
    import { applySubject, modifySubject, requestSubjectDetails } from '@/service/subject.js'
    import { mapState } from 'vuex'

    export default {
        name: 'subject_apply',
        mixins: [uploadFileSize],
        components: {
            'select-participator': selectParticipator,
            'v-multiSelect': multiSelect,
            'v-breadcrumb': breadcrumb,
        },
        data() {
            const validNum = (rule, value, callback) => {
                const regular = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                if (!regular.test(value)) {
                    callback(new Error('请输入正确的金额格式,如：12 ; 0.12 ; 12.00'))
                } else {
                    callback()
                }
            }
            return {
                pickerOptions: {
                      disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                      }
                },
                subjectGuideId: '',        // 课题申报指南id
                subjectCode: '',
                form: {
                    name: '',
                    researchField: [],
                    subjectLevel: '',
                    headUserName: '',
                    memberList: [],
                    resultType: [],
                    fundSource: '',
                    funding: '',
                    projectDate: '',
                    topicBasis: '',
                    significance: '',
                    connent: '',
                    methodStep: '',
                    result: '',
                    attList: []
                },
                fileList: [],
                // 表单校验提示
                rules: {
                    name: [
                        { required: true, message: '请输入课题名称', trigger: 'blur' },
                        { max: 50, message: '不超过50字符', trigger: 'change' }
                    ],
                    researchField: [
                        { required: true, message: '请选择研究领域', trigger: 'change', type: 'array' }
                    ],
                    subjectLevel: [
                        { required: true, message: '请选择课题级别', trigger: 'change' }
                    ],
                    headUserName: [
                        { required: true, message: '请输入负责人', trigger: 'change' }
                    ],
                    memberList: [
                        { type: 'array', required: true, message: '请选择参与人' }
                    ],
                    resultType: [
                        { type: 'array', required: true, message: '请选择研究领域', trigger: 'change' }
                    ],
                    fundSource: [
                        { required: true, message: '请输入经费来源', trigger: 'blur' }
                    ],
                    funding: [
                        { required: true, message: '请输入经费数额' },
                        { validator: validNum },
                    ],
                    projectDate: [
                        { type: 'date', required: true, message: '请选择预期完成时间', trigger: 'change' }
                    ],
                    topicBasis: [
                        { required: true, message: '请输入选题依据', trigger: 'blur' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                    significance: [
                        { required: true, message: '请输入课题研究的背景及意义', trigger: 'blur' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                    connent: [
                        { required: true, message: '请输入课题研究的内容', trigger: 'blur' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                    methodStep: [
                        { required: true, message: '请输入课题研究的过程及方法', trigger: 'blur' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                    result: [
                        { required: true, message: '请输入课题研究的预期成果', trigger: 'blur' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                },
                isAdmin: false,
                routeLink: {},
                isPreview: false
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                subjectLevelDicList: 'subjectLevelDicList',
                resultTypeDicList: 'resultTypeDicList'
            })
        },
        created() {
            this.isPreview = this.$route.path.includes('preview')
            if (this.$route.path.includes('admin')) {
                this.isAdmin = true
                this.routeLink = { name: 'adminSubject' }
            } else if (this.$route.path.includes('educationBureauSpace')) {
                this.subjectGuideId = this.$route.query.guideId
                this.routeLink = { name: 'eduGuideDetail', query: { id: this.$route.query.id, guideId: this.$route.query.guideId } }
            } else if (this.$route.path.includes('schoolSpace')) {
                this.subjectGuideId = this.$route.query.guideId
                this.routeLink = { name: 'schoolGuideDetail', query: { id: this.$route.query.id, guideId: this.$route.query.guideId } }
            } else {
                this.routeLink = { name: 'adminSubject' }
            }
        },
        mounted() {
            this.form.headUserName = loginInfo.userInfo.userName
            if (this.$route.query.subjectId !== undefined) {
                this.getSubjectDetails()
            }
        },
        methods: {
            /*
            *获取课题详情
            *id:this.$route.query.subjectId
             */
            getSubjectDetails() {
                requestSubjectDetails({ id: this.$route.query.subjectId }).then((res) => {
                    const _data = res.data.entity
                    this.form.name = _data.name
                    this.form.researchField = _data.researchField.split('-')
                    this.form.subjectLevel = _data.subjectLevel
                    for (const i in _data.memberList) {
                        this.form.memberList.push(_data.memberList[i].userId)
                    }
                    this.form.resultType = _data.resultType.split('、')
                    this.form.fundSource = _data.fundSource
                    this.form.funding = _data.funding
                    this.form.projectDate = new Date(_data.projectDate)
                    this.form.topicBasis = _data.topicBasis
                    this.form.significance = _data.significance
                    this.form.connent = _data.connent
                    this.form.methodStep = _data.methodStep
                    this.form.result = _data.result
                    this.subjectCode = _data.subjectCode
                    for (const i in _data.attList) {
                        this.fileList.push({ name: _data.attList[i].name, size: _data.attList[i].fileSize, url: _data.attList[i].resourceId, status: 'finished' })
                    }
                })
            },
            /*
            *获取参与人
             */
            // getMemberList(val){
            //     this.form.memberList = []
            //     for(let i in val){
            //         this.form.memberList.push({userId:val[i]})
            //     }
            // },
            /*
            *移除文件
             */
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            /*
            *上传文件
             */
               UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.fileList.push({ name: files.name, size: files.size, url: res.appendInfo.resourceId })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            },
            /*
            *课题申报
            *    "subjectGuideId":"课题申报指南id",
                "subjectCode":"课题编号",
                "name":"课题名称",
                "researchField":"1",
                "headUserId":"1",
                "resultType":"1",
                "subjectLevel":"5",
                "declareUserId":"申报人id",
                "projectDate":"2017-06-08",
                "fundSource":"经费来源",
                "funding":"5000",
                "endDate":"2017-09-08",
                "topicBasis":"选题依据",
                "significance":"课题意义",
                "connent":"课题内容",
                "situation":"国内外现状",
                "methodStep":"方法步骤",
                "result":"1",
                "status":"1",
                "auditStatus":"0",
                "attList":[{"resourceId":"3"},{"resourceId":"4"}],
                "memberList":[{"userId":"3"},{"userId":"4"}]
             */
            applySubmit(isSubmit) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const _form = this.form
                        for (const i in this.fileList) {
                            _form.attList.push({ resourceId: this.fileList[i].url, fileSize: this.fileList[i].size, name: this.fileList[i].name })
                        }
                        const members = []
                        for (let i = 0; i < this.form.memberList.length; i++) {
                            members.push({ userId: this.form.memberList[i] })
                        }
                        const params = {
                            subjectGuideId: this.subjectGuideId,
                            subjectCode: this.subjectCode,
                            name: _form.name,
                            researchField: _form.researchField.join('-'),
                            headUserId: loginInfo.userInfo.id,
                            resultType: _form.resultType.join('、'),
                            subjectLevel: _form.subjectLevel,
                            declareUserId: '',
                            projectDate: _form.projectDate.getTime(),
                            fundSource: _form.fundSource,
                            funding: _form.funding,
                            endDate: _form.projectDate.getTime(),
                            topicBasis: _form.topicBasis,
                            significance: _form.significance,
                            connent: _form.connent,
                            situation: '',
                            methodStep: _form.methodStep,
                            result: _form.result,
                            status: 1,
                            attList: this.form.attList,
                            memberList: members,
                            isSubmit: isSubmit
                        }
                        if (this.$route.query.subjectId !== undefined) {
                            params.id = this.$route.query.subjectId
                            modifySubject(params).then((res) => {
                                if (res.data.code === 200) {
                                    if (isSubmit === 1) {
                                        this.showMessage('success', '提交成功')
                                    } else {
                                        this.showMessage('success', '修改成功')
                                    }
                                    this.$refs.form.resetFields()
                                    this.$router.push(this.routeLink)
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            }, () => {
                                this.showMessage('error', '修改失败')
                            })
                        } else {
                            applySubject(params).then((res) => {
                                if (res.data.code === 200) {
                                    if (isSubmit === 1) {
                                        this.showMessage('success', '提交成功')
                                    } else {
                                        this.showMessage('success', '保存成功')
                                    }
                                    this.$refs.form.resetFields()
                                    this.$router.push(this.routeLink)
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            }, () => {
                                this.showMessage('error', '申报失败')
                            })
                        }
                    } else {
                        this.showMessage('warning', '请按要求填写完整的信息')
                        return false
                    }
                })
            },
            /* 去掉非数字的字符 */
            moneyFormat(val) {
                // 先把非数字的都替换掉，除了数字和.
                val = val.replace(/[^\d.]/g, '')
                // 必须保证第一个为数字而不是.
                val = val.replace(/^\./g, '')
                // 保证只有出现一个.而没有多个.
                val = val.replace(/\.{2,}/g, '.')
                // 保证.只出现一次，而不能出现两次以上
                val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
                const self = this
                window.setTimeout(function () {
                    self.form.funding = val
                }, 50)
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .subject_apply{
        width: 100%;
        .btn{
            padding: 10px 25px;
            border: 1px solid $theme_color;
            color: $theme_color;
            margin-left: 5px;
        }
        .submit-btn{
            background-color: $theme_color;
            color: #fff;
            padding: 11px 25px;
        }
        .submit-btn:hover{
            opacity: 0.75;
        }
        .btn:hover{
            background-color: $theme_color;
            color: #fff;
        }
    }
    .upload-btn{
        width: 96px;
        height: 38px;
        line-height: 38px;
        border:1px solid #ccc;
        margin-right: 15px;
        i{
            font-size: 14px;
            color: $theme_color;
        }
    }
</style>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/admin_back-stage_content.scss';
@import '~@/assets/css/scss/vars.scss';
    .subject_apply{
        .el-textarea__inner{
            height: 100px;
            border-radius: 3px;
        }
        .el-input__inner{
            height: 38px;
            border-radius: 3px;
        }
        .el-input__icon{
            width: 10%;
        }
        .el-tag .el-icon-close:hover{
            background-color: $theme_color;
        }
        .el-select .el-tag{
            margin-left: 5px;
        }
        .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
            position: absolute;
            top: 5px;
            right: 10px;
        }
        .bs-search-button{
            margin-left:0;
        }
    }
</style>