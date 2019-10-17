<template>
    <section class="enroll-form">
        <p class="form-tips">
            <span class="form-tips-item">
                <i class="icon-form-tip"></i>
                <a href="javaScript:;" @click="noticeVisible.show = true">请点击查看比赛须知</a>
            </span>
            <span class="form-tips-item">
                <i class="icon-form-tip"></i>
                <a href="javaScript:;" @click="visible.show = true">请点击查看评比标准</a>
            </span>
        </p>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">

            <el-form-item label="作品名称" prop="worksName">
                <el-col :span="7">
                    <el-input v-model="form.worksName" placeholder="请输入作品名称，限16字以内" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="申报组别" prop="declareId">
                <el-col :span="7">
                    <el-radio-group v-model="form.declareId">
                        <el-radio v-for="(item, index) in declareList" :key="index" :label="item.declareId" :disabled="!item.actorType.includes(userType)">{{item.declareName}}</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="17" class="pdl10">
                    <i class="icon-form-tip"></i>
                    请按小学组、初中组、高中组选择申报组别,请勿选择其他组别
                </el-col>
            </el-form-item>

            <el-form-item label="作者" prop="author">
                <el-col :span="7">
                    <el-input v-model="form.author" placeholder="请输入作者姓名"></el-input>
                </el-col>
                <el-col :span="17" class="pdl10">
                    <i class="icon-form-tip"></i>
                    若报名“个人智造“，请填写1个学生；若报名”团队智造“，请填写2-3个学生；多个学生姓名请以逗号分隔
                </el-col>
            </el-form-item>

            <el-form-item label="指导老师" prop="teacher">
                <el-col :span="7">
                    <!-- <el-input v-model="form.teacher" placeholder="请输入指导老师" :maxlength="100"></el-input> -->
                    <el-autocomplete
                        class="inline-input"
                        v-model="form.teacher"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入指导老师"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-col>
                <el-col :span="17" class="pdl10">
                    <i class="icon-form-tip"></i>
                    若报名“个人智造“，请填写1个教师；若报名”团队智造“，请填写2个教师；多个教师姓名请以逗号分隔
                </el-col>
            </el-form-item>

            <el-form-item label="指导老师联系电话" prop="phone">
                <el-col :span="7">
                    <el-input v-model="form.phone" placeholder="请输入指导老师联系电话"></el-input>
                </el-col>
                <el-col :span="17" class="pdl10">
                    <i class="icon-form-tip"></i>
                    多个教师电话请以逗号分隔
                </el-col>
            </el-form-item>

            <el-form-item label="学校全称" prop="schoolName">
                <el-col :span="7">
                    <el-input v-model="form.schoolName" placeholder="请输入学校全称" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="班级" prop="class">
                <el-col :span="7">
                    <el-input v-model="form.class" placeholder="请填写清楚年级和班别" :maxlength="20"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="需求分析">
                <el-input type="textarea" v-model="form.demand" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请填写创作背景、目的和意义"></el-input>
            </el-form-item>

            <el-form-item label="功能说明">
                <el-input type="textarea" v-model="form.funcDescription" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请对作品功能进行说明"></el-input>
            </el-form-item>

            <el-form-item label="硬件说明">
                <el-input type="textarea" v-model="form.hdwDescription" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请填写作品主要使用的设备或材料"></el-input>
            </el-form-item>

            <el-form-item label="程序说明">
                <el-input type="textarea" v-model="form.progDescription" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请填写作品编程代码"></el-input>
            </el-form-item>

            <el-form-item label="参考资源">
                <el-input type="textarea" v-model="form.resource" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请描述参考或引用他人资源及出处"></el-input>
            </el-form-item>

            <el-form-item label="其他说明">
                <el-input type="textarea" v-model="form.otherDesc" :autosize="{ minRows: 4, maxRows: 100 }" placeholder="请描述需要特别说明的问题"></el-input>
            </el-form-item>

            <el-form-item label="作品展示与说明录像" prop="videoSrc">
                <el-col :span="15">
                    <el-checkbox-group v-model="form.videoSrc"></el-checkbox-group>
                    <el-upload class="upload-demo" action :file-list="form.videoSrc" :on-change="changeVideos" :on-remove="changeVideos" :before-upload="UploadVideo">
                        <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                        <p slot="tip" class="upload-tip">录像里由作者本人做展示与说明，内容应包括作品名称、需求分析、硬件介绍、程序介绍、功能展示等环节。录像时长3-5分钟，视频文件大小不超过100M，分辨率不低于720P，应声画清晰。格式为MP4。</p>
                    </el-upload>
                    <span class="upload-btn" v-if="form.videoSrc.length" @click="videoShow = true">点击播放视频</span>
                </el-col>
            </el-form-item>

            <el-form-item label="附件">
                <el-col :span="15">
                    <el-upload class="upload-demo" action :file-list="attachmentList" :on-change="changeFiles" :on-remove="changeFiles" :before-upload="UploadFile">
                        <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                        <p slot="tip" class="upload-tip">您可上传认为必要的相关文件（例如程序的截图），单个文件大小在50M以内。
编程类作品请上传程序和资源，程序文件为sb后缀的文件，其他类型程序文件请压缩为rar格式再上传</p>
                    </el-upload>
                </el-col>
            </el-form-item>

            <div class="btn-group">
                <button class="confirm-btn" @click.prevent="submit">确定</button>
                <button class="cancel-btn" @click.prevent="$router.push({ path: '/contest/detail', query: { id: $route.query.id, type: 2 } })">取消</button>
            </div>

        </el-form>
        <eval-standard :visible.sync="visible"></eval-standard>
        <match-notice :noticeVisible.sync="noticeVisible"></match-notice>
        <el-dialog title="作品展示与说明录像" :visible.sync="videoShow" top="50%" class="video-wrapper">
            <video ref="video" :src="videoSrc" height="500" width="906" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls"></video>
        </el-dialog>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { matchOfflineActorAdd, actorAddModify } from '@/service/matchEntrance.js'
    import { requestBaseTeacherList } from '@/service/common.js'
    import evalStandard from '@/components/enroll_contest/eval_standard.vue'
    import matchNotice from '@/components/enroll_contest/match_notice.vue'

    export default {
        name: 'enrollForm4',
        components: { evalStandard, matchNotice },
        mixins: [uploadFileSize],
        data() {
            // const validatePhone = (rule, value, callback) => {
            //     const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
            //     if (value !== '' && !regular.test(value)) {
            //         callback(new Error('请输入正确格式的电话号码'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                visible: {
                    show: false
                },
                noticeVisible: {
                    show: false
                },
                videoShow: false,
                form: {
                    worksName: '',
                    declareId: '',
                    author: '',
                    teacher: '',
                    phone: '',
                    schoolId: '',
                    schoolName: '',
                    class: '',
                    demand: '',
                    funcDescription: '',
                    hdwDescription: '',
                    progDescription: '',
                    resource: '',
                    otherDesc: '',
                    videoSrc: []
                },
                attachmentList: [],
                rules: {
                    worksName: [
                        { required: true, message: '请输入作品名称' }
                    ],
                    declareId: [
                        { required: true, message: '请选择申报组别' }
                    ],
                    schoolName: [
                        { required: true, message: '请输入学校名称' }
                    ],
                    author: [
                        { required: true, message: '请输入作者' }
                    ],
                    teacher: [
                        { required: true, message: '请输入指导老师' }
                    ],
                    phone: [
                        // { required: true, message: '请选择输入指导老师联系电话' },
                        // { validator: validatePhone, trigger: 'blur' }
                    ],
                    class: [
                        { required: true, message: '请输入年级和班级' }
                    ],
                    videoSrc: [
                        { required: true, type: 'array', message: '请上传作品展示与说明录像' }
                    ]
                },
                userType: this.$ls.get('userIdentity') === 'teacher' ? '1' : '0',
                ifModify: false,
                videoHasPaused: true,
                videoSrc: '',
                teacherList: [],  // 本校教师数据
            }
        },
        props: {
            formType: {
                type: String,
                default: ''
            },
            projectId: {
                type: String,
                default: ''
            },
            declareList: {
                type: Array,
                default() {
                    return []
                }
            },
            detail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            const baseInfo = this.$ls.get('baseInfo').baseInfo
            // this.form.author = baseInfo.name
            this.form.schoolName = baseInfo.schoolName
            this.form.schoolId = baseInfo.schoolId
            this.setForm(this.detail)
            this.getTeacherList()
        },
        watch: {
            detail: {
                handler: function (val) {
                    this.setForm(val)
                },
                deep: true
            }
        },
        methods: {
            querySearch(queryString, cb) {
                const teacherList = this.teacherList
                const results = queryString ? teacherList.filter(this.createFilter(queryString)) : teacherList
                // 调用 callback 返回建议列表的数据
                cb(results)
            },
            createFilter(queryString) {
                return (teacher) => {
                    return (teacher.value.includes(queryString))
                }
            },
            handleSelect(item) {
                this.form.phone = item.phone
            },
            // 获取本校教师数据
            async getTeacherList() {
                const params = {
                    auditStatus: 1,
                    lockStatus: '',
                    schoolId: this.$ls.get('baseInfo').baseInfo.schoolId
                }
                const res = await requestBaseTeacherList(params, { pageSize: 99999, pageNum: 1 })
                if (res.data.code === 200) {
                    const _data = res.data.entity.resultData
                    const _dataArr = []
                    for (let i = 0; i < _data.length; i++) {
                        _dataArr.push({ value: _data[i].name, phone: _data[i].phone })
                    }
                    this.teacherList = _dataArr
                }
            },
            // 视频播放的控制
            play() {
                this.$refs.video.play()
                this.videoHasPaused = !this.videoHasPaused
            },
            togglePlay() {
                const videoEl = this.$refs.video
                if (this.videoHasPaused) {
                    videoEl.play()
                    this.videoHasPaused = false
                    return
                }
                videoEl.pause()
                this.videoHasPaused = true
            },
            videoIsEnded() {
                this.videoHasPaused = true
            },
            // 修改时设置详情信息
            setForm(val) {
                if (Object.keys(val).length && this.formType === '114') {
                    const attachmentList = val.attachmentList
                    const videoList = val.pictureList
                    this.form.worksName = val.opus.name
                    this.form.declareId = val.declareId
                    this.ifModify = true
                    if (val.worksTemplate) {
                        this.form.schoolId = val.worksTemplate.schoolId
                        this.form.teacher = val.worksTemplate.teacherId
                        this.form.phone = val.worksTemplate.phone
                        this.form.class = val.worksTemplate.classId
                        this.form.author = val.worksTemplate.author
                        this.form.demand = val.worksTemplate.demand
                        this.form.funcDescription = val.worksTemplate.functionDescription
                        this.form.hdwDescription = val.worksTemplate.hardwareDescription
                        this.form.progDescription = val.worksTemplate.programDescription
                        this.form.resource = val.worksTemplate.resourceDescription
                        this.form.otherDesc = val.worksTemplate.otherDescription
                        this.videoSrc = this.getFileUrl(videoList[0].resourceId, { filetype: 'mp4' })
                        this.form.videoSrc = []
                        if (videoList !== null && videoList.length) {
                            for (let j = 0; j < videoList.length; j++) {
                                this.form.videoSrc.push({ name: videoList[j].name, resourceId: videoList[j].resourceId, id: videoList[j].id })
                            }
                        }
                    }
                    this.attachmentList = []
                    if (attachmentList !== null && attachmentList.length) {
                        for (let k = 0; k < attachmentList.length; k++) {
                            this.attachmentList.push({ name: attachmentList[k].name, resourceId: attachmentList[k].resourceId, id: attachmentList[k].id })
                        }
                    }
                } else {
                    this.form.worksName = ''
                    this.form.declareId = ''
                    this.form.author = ''
                    this.form.teacher = ''
                    this.form.phone = ''
                    this.form.schoolId = ''
                    this.form.schoolName = ''
                    this.form.class = ''
                    this.form.demand = ''
                    this.form.funcDescription = ''
                    this.form.hdwDescription = ''
                    this.form.progDescription = ''
                    this.form.resource = ''
                    this.form.otherDesc = ''
                    this.form.videoSrc = []
                    this.attachmentList = []
                }
            },
            // 上传视频
            UploadVideo(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.split('.').pop()
                const _this = this
                if (!/(mp4)$/i.test(expandName)) {
                    this.$message({
                        message: '请上传mp4格式的视频'
                    })
                    return false
                } else if (fileSize >= this.imgStandardFileSize * 1024 * 1024) {
                    this.$message({
                        message: `文件大小不超过${this.imgStandardFileSize}M`
                    })
                    return false
                }
                // uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                //     if (res.code === 200) {
                //         _this.form.videoSrc = [{ name: files.name, resourceId: res.appendInfo.resourceId }]
                //         _this.videoSrc = _this.getFileUrl(res.appendInfo.resourceId, { filetype: 'mp4' })
                //     }
                // })
            },
            // 视频改变
            changeVideos(file, fileList) {
                this.form.videoSrc = fileList
                this.videoSrc = this.getFileUrl(file.resourceId, { filetype: 'mp4' })
            },
            // 上传附件
            UploadFile(file) {
                const fileSize = file.size
                if (fileSize >= (this.standardFileSize * 1024 * 1024)) {
                    this.$message({ message: `文件大小不超过${this.standardFileSize}M` })
                    return false
                }
            },
            // 附件改变
            changeFiles(file, fileList) {
                this.attachmentList = fileList
            },

            submit() {
                if (this.formType === '0') {
                    this.$message('请选择项目类型')
                } else {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$confirm('此操作将提交报名表单, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                customClass: '__custom-msg-box',
                                type: 'warning'
                            }).then(() => {
                                let handle = null
                                let msg = ''
                                const attachmentList = this.attachmentList
                                const form = this.form
                                const params = {
                                    matchId: this.$route.query.id,
                                    projectId: this.projectId,
                                    declareId: form.declareId,
                                    opus: {
                                        name: form.worksName,
                                        cover: form.videoSrc[0].resourceId,
                                        description: ''
                                    },
                                    pictureList: [],
                                    attachmentList: [],
                                    templateType: this.formType,
                                    worksTemplate: {
                                        schoolId: form.schoolId,
                                        classId: form.class,
                                        author: form.author,
                                        teacherId: form.teacher,
                                        phone: form.phone,
                                        demand: form.demand,
                                        functionDescription: form.funcDescription,
                                        hardwareDescription: form.hdwDescription,
                                        programDescription: form.progDescription,
                                        resourceDescription: form.resource,
                                        otherDescription: form.otherDesc
                                    },
                                }
                                if (this.ifModify) {
                                    handle = actorAddModify
                                    msg = '修改成功'
                                    this.$set(params, 'id', this.detail.id)
                                    this.$set(params.opus, 'id', this.detail.opus.id)
                                    if (this.detail.worksTemplate) {
                                        this.$set(params.worksTemplate, 'id', this.detail.worksTemplate.id)
                                    }
                                } else {
                                    handle = matchOfflineActorAdd
                                    msg = '提交成功'
                                }
                                for (let i = 0; i < form.videoSrc.length; i++) {
                                    params.pictureList.push(Object.assign(form.videoSrc[i], { sort: i.toString() }))
                                }
                                for (let j = 0; j < attachmentList.length; j++) {
                                    params.attachmentList.push(Object.assign(attachmentList[j], { sort: j.toString() }))
                                }
                                handle(params).then((res) => {
                                    if (res.data.code === 200) {
                                        this.$message({
                                            type: 'success',
                                            message: msg
                                        })
                                        this.$router.push({ path: '/contest/detail', query: { id: this.$route.query.id, type: 2 } })
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data.msg
                                        })
                                    }
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消提交'
                                })
                            })
                        } else {
                            this.$message({
                                type: 'info',
                                message: '请填写完整的表单信息'
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/css/scss/enroll_form.scss';
    @import '~@/assets/css/scss/form.scss';
    .enroll-form {
        .el-dialog {
            width: 946px;
            .el-dialog__headerbtn {
                line-height: 50px;
            }
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/enroll_form.scss';
.pdl10 {
    padding-left: 10px;
}
.form-tips {
    margin-bottom: 20px;
    padding-left: 40px;
    font-size: 14px;
    .form-tips-item {
        margin-right: 10px;
        i {
            vertical-align: top;
        }
        a:hover {
            color: #23b8ff;
        }
    }
}
.upload-btn {
    cursor: pointer;
}
.upload-tip {
    line-height: 1.5;
}
</style>
