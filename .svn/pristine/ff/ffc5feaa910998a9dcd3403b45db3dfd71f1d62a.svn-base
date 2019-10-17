<template>
    <div id="publishActivity" class="publish-activity backend-content__middle fr">
        <div class="publish-box">
            <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                <!-- 活动主题 -->
                <el-row>
                    <el-form-item label="活动主题" prop="title">
                        <el-col :span="11">
                            <el-input placeholder="请输入活动主题，50字以内" v-model="form.title" :maxlength="50"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 活动封面 -->
                <el-row>
                    <el-form-item label="活动封面" required style="position:relative;">
                        <el-col :span="14">
                            <el-upload class="psn-cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover">
                                <img v-if="img" :src="img" class="psn-cover">
                                <i v-else class="el-icon-plus psn-cover-uploader-icon"></i>
                            </el-upload>
                            <div class="tips fl" style="color:#8391a5;">
                                仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M。<br>
                                建议上传的图片像素为 330 x 220
                            </div>
                        </el-col>
                    </el-form-item>
                </el-row>
                  <!-- 活动分类 -->
                  <el-row>
                      <el-form-item label="活动分类" prop="activityClassify">
                          <el-col :span="11">
                              <multi-select style="width:380px;display:inline-block;" :selectData.sync="form.activityClassify" :ifAll='false' :model='"activity"'></multi-select>
                          </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 活动时间 -->
                  <el-row>
                      <el-form-item label="活动时间" required>
                          <el-col :span="6">
                               <el-form-item prop="startDate" class="date-box">
                                  <el-date-picker placeholder="开始时间" v-model="form.startDate" :picker-options="startDateOptions" style="width: 100%;" @change="dateChange" clearable></el-date-picker>
                              </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1" style="text-align:center">—</el-col>
                        <el-col :span="6">
                               <el-form-item prop="endDate" class="date-box">
                                  <el-date-picker placeholder="结束时间" v-model="form.endDate" :picker-options="endDateOptions" style="width: 100%;" @change="dateChange" clearable></el-date-picker>
                              </el-form-item>
                        </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 报名截止时间 -->
                <el-row>
                    <el-form-item label="报名时间" prop="enrolTime">
                        <el-col :span="11">
                            <el-date-picker type="daterange" placeholder="请选择报名时间" v-model="form.enrolTime" :picker-options="stopDateOptions" style="width:100%;" @change="dateChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-row>
                  <!-- 活动详情 -->
                  <el-row>
                      <el-form-item label="活动详情" prop="details">
                          <el-col :span="23">
                            <el-input type="textarea" :maxlength="1000" v-model="form.details" placeholder="请输入活动详情，1000字符以内" style="height: 100px;"></el-input>
                        </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 活动要求 -->
                  <el-row>
                      <el-form-item label="活动要求" prop="requirement">
                          <el-col :span="23">
                            <el-input type="textarea" :maxlength="1000" v-model="form.requirement" placeholder="请输入活动要求，1000字符以内" style="height: 100px;"></el-input>
                        </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 主持人 -->
                <el-row>
                    <el-form-item label="主持人" required>
                    <el-col :span="11">
                        <el-input placeholder="默认为创建者" :maxlength="32" v-model="form.compere" disabled></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>
                <!-- 活动地点 -->
                <el-row>
                    <el-form-item label="活动地点" prop="site">
                    <el-col :span="11">
                        <el-input placeholder="请输入活动地点" v-model="form.site"></el-input>
                    </el-col>
                  </el-form-item>
                </el-row>
                <!-- 联系方式 -->
                  <el-row>
                      <el-form-item label="联系方式" prop="contactWay">
                          <el-col :span="23">
                            <el-input type="textarea" :maxlength="200" v-model="form.contactWay" placeholder="请输入联系方式" style="height: 100px;"></el-input>
                        </el-col>
                      </el-form-item>
                  </el-row>
                  <!-- 活动人数 -->
                <el-row>
                    <el-form-item label="活动人数" prop="num">
                        <el-col :span="11">
                            <el-input placeholder="请输入活动人数，不超过10000人" v-model="form.num"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 报名审核 -->
                <el-row>
                    <el-form-item>
                        <el-col :span="11">
                            <el-checkbox v-model="form.audit">报名审核</el-checkbox>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 附件 -->
                <el-row>
                    <el-form-item label="附件">
                        <el-col :span="12">
                            <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
                                <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
                            </el-upload>
                        </el-col>
                      </el-form-item>
                </el-row>
                <el-form-item>
                    <button class="psn-confirm-btn" @click.prevent="onSubmit(0)">保存</button>
                      <button class="psn-confirm-btn" @click.prevent="onSubmit(1)">提交审核</button>
                      <button class="psn-cancel-btn" @click.prevent="$router.push({name:'adminActivity'})">取消</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { loginInfo } from 'Asset/js/getUserInfo.js'
    import { activityPublish, activityModify, requestActivityDetails } from '@/service/activity.js'
    import multiSelect from 'Common/select/multi_select.vue'

    const startTimes = Date.now() - 8.64e7

    export default {
        name: 'publishActivity',
        mixins: [uploadFileSize],
        components: {
            'multi-select': multiSelect
        },
        data() {
            const validateNum = (rule, value, callback) => {
                const regular = /^[0-9]+$/
                if (value === '') {
                    callback(new Error('请输入活动人数'))
                } else if (!regular.test(value)) {
                    callback(new Error('活动人数只能为正整数'))
                } else if (parseInt(value, 10) > 10000) {
                    callback(new Error('人数不能大于10000'))
                } else {
                    callback()
                }
            }
            const validateStartDate = (rule, value, callback) => {
                if (value === '' || value === null) {
                    callback(new Error('请选择开始时间'))
                } else {
                    value = new Date(value)
                    if (isNaN(value)) {
                        callback(new Error('请输入正确的时间格式'))
                    } else {
                    // } else if (this.form.enrolTime[1] != null && value > this.form.enrolTime[1]) {
                 //        callback(new Error('开始时间不能大于报名截止时间'))
                 //    } else {
                        callback()
                    }
                }
            }
            const validateEndDate = (rule, value, callback) => {
                if (value === '' || value === null) {
                    callback(new Error('请选择开始时间'))
                } else {
                    value = new Date(value)
                    if (isNaN(value)) {
                        callback(new Error('请输入正确的时间格式'))
                    } else if (this.form.enrolTime[1] != null && value < this.form.enrolTime[1]) {
                        callback(new Error('结束时间不能小于报名截止时间'))
                    } else {
                        callback()
                    }
                }
            }
            const validateStopDate = (rule, value, callback) => {
                if (value.length <= 0 || value[0] === null) {
                    callback(new Error('请选择报名截止时间'))
                } else {
                    const value1 = new Date(value[0])
                    const value2 = new Date(value[1])
                    if (isNaN(value1) && isNaN(value2)) {
                        callback(new Error('请输入正确的时间格式'))
                    } else if (this.form.endDate && value2 > this.form.endDate) {
                        callback(new Error('报名截止时间不能大于结束时间'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                form: {
                    title: '',
                    cover: '',
                    activityClassify: [],
                    startDate: '',
                    endDate: '',
                    stopDate: '',
                    details: '',
                    requirement: '',
                    compere: loginInfo.userInfo.userName,
                    site: '',
                    contactWay: '',
                    num: '',
                    audit: false,
                    resourceList: [],
                    enrolTime: []
                },
                startDateOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                endDateOptions: {
                    disabledDate(time) {
                        return time.getTime() < startTimes
                    }
                },
                stopDateOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                fileList: [],
                img: '',
                // 表单校验提示
                rules: {
                    title: [
                        { required: true, message: '请输入活动主题', trigger: 'blur' },
                        { max: 50, message: '不超过50字符', trigger: 'change' }
                    ],
                    activityClassify: [
                        { type: 'array', required: true, message: '请选择技术分类', trigger: 'change' }
                    ],
                    startDate: [
                        { validator: validateStartDate, required: true, trigger: 'change' }
                        // { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { validator: validateEndDate, required: true, trigger: 'change' }
                        // { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    enrolTime: [
                        // { required: true, message: '请选择报名时间', type: 'array' },
                        { validator: validateStopDate, required: true, trigger: 'change' }
                        // { type: 'date', required: true, message: '请选择截止时间', trigger: 'change' }
                    ],
                    details: [
                        { required: true, message: '请输入活动详情', trigger: 'blur' },
                        { max: 1000, message: '不超过1000字符', trigger: 'change' }
                    ],
                    requirement: [
                        { required: true, message: '请输入活动要求', trigger: 'blur' },
                        { max: 1000, message: '不超过1000字符', trigger: 'change' }
                    ],
                    site: [
                        { required: true, message: '请输入活动地点', trigger: 'blur' }
                    ],
                    contactWay: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    num: [
                        { validator: validateNum, required: true, trigger: 'blur' }
                    ]
                },
                file: {}
            }
        },
        mounted() {
            if (this.$route.query.id !== undefined) {
                requestActivityDetails({ id: this.$route.query.id }).then((res) => {
                    if (res.status === 200 && res.data.entity !== null) {
                        const detailsData = res.data.entity
                        this.form.title = detailsData.title
                        this.form.cover = detailsData.cover
                        this.form.activityClassify = detailsData.activityType.split('-')
                        this.form.startDate = new Date(detailsData.startDate)
                        this.form.endDate = new Date(detailsData.endDate)
                        this.form.enrolTime = [new Date(detailsData.beginDate), new Date(detailsData.stopDate)]
                        this.form.beginDate = new Date(detailsData.beginDate)
                        this.form.stopDate = new Date(detailsData.stopDate)
                        this.form.details = detailsData.details
                        this.form.requirement = detailsData.requirement
                        this.form.compere = detailsData.compere
                        this.form.site = detailsData.site
                        this.form.contactWay = detailsData.contactWay
                        this.form.num = detailsData.num
                        this.form.audit = detailsData.audit === 1
                        for (const i in detailsData.resourceList) {
                            this.fileList.push({ name: detailsData.resourceList[i].name, url: detailsData.resourceList[i].resourceId, status: 'finished' })
                        }
                        this.img = this.getFileUrl(detailsData.cover)
                    }
                })
            }
        },
        methods: {
            dateChange() {
                let startTime = null
                let endTime = null
                let stopTime = null
                if (this.form.startDate === undefined || this.form.startDate === null || this.form.startDate === '') {
                    this.form.startDate = ''
                } else {
                    startTime = this.form.startDate.getTime()
                }
                if (this.form.endDate === undefined || this.form.endDate === null || this.form.endDate === '') {
                    this.form.endDate = ''
                } else {
                    endTime = this.form.endDate.getTime()
                }
                if (this.form.enrolTime) {
                    if (this.form.enrolTime[1] === undefined || this.form.enrolTime[1] === null || this.form.enrolTime[1] === '') {
                        this.form.stopDate = ''
                    } else {
                        stopTime = this.form.enrolTime[1].getTime()
                    }
                }
                if (startTime && endTime && stopTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > stopTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < stopTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                } else if (startTime && endTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < startTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                } else if (startTime && stopTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > stopTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < stopTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                } else if (stopTime && endTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > stopTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < stopTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                } else if (endTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime
                        }
                    }
                } else if (startTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < startTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                } else if (stopTime) {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > stopTime
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < stopTime
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                } else {
                    this.startDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                    this.endDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                    this.stopDateOptions = {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                }
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            UploadCover(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.cover = res.appendInfo.resourceId
                                _this.img = _this.getFileUrl(res.appendInfo.resourceId)
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (files, reason) {
                            _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                        })
                } else {
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.form.cover = null
                    _this.img = _this.getFileUrl(null)
                    uploader.cancelFile(file)
                }
            },
            UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.fileList.push({ name: files.name, url: res.appendInfo.resourceId, status: 'finished' })
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
            *发布作品
            *参数：
            *    "title": "活动主题",
                "cover": "活动封面url3",
                "activityType": "活动分类ID",
                "activityTypeParent": "活动顶级分类ID",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "stopDate": "报名截止时间",
                "details": "活动详情",
                "requirement": "活动要求",
                "compere": "主持人",
                "site": "活动地址",
                "contactWay": "联系方式",
                "num": 活动成员数,
                "audit": 报名审核:(1:是,0:否),
                "resourceList": [//资源列表
                    {
                        "resourceyId": "资源id"
                    }
                ]
             */
              onSubmit(isSubmit) {
                  const sucMsg = isSubmit === 1 ? '发布成功' : '保存成功'
                if (loginInfo) {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            const form = this.form
                            for (const i in this.fileList) {
                                form.resourceList.push({ resourceId: this.fileList[i].url, name: this.fileList[i].name })
                            }
                            const data = {
                                title: form.title,
                                cover: form.cover,
                                activityType: form.activityClassify.join('-'),
                                activityTypeParent: form.activityClassify[0],
                                startDate: form.startDate.getTime(),
                                endDate: form.endDate.getTime(),
                                beginDate: form.enrolTime[0] === undefined ? null : form.enrolTime[0].getTime(),
                                stopDate: form.enrolTime[1] === undefined ? null : form.enrolTime[1].getTime(),
                                details: form.details,
                                requirement: form.requirement,
                                compere: form.compere,
                                site: form.site,
                                contactWay: form.contactWay,
                                num: form.num,
                                audit: form.audit ? 1 : 0,
                                resourceList: form.resourceList,
                                isSubmit: isSubmit
                            }
                            if (this.$route.query.id !== undefined) {
                                data.id = this.$route.query.id
                                activityModify(data).then((res) => {
                                    if (res.data.code === 200) {
                                        this.showMessage('success', '修改成功')
                                        this.$router.push({ name: 'adminActivity' })
                                    } else {
                                        this.showMessage('error', res.data.msg)
                                    }
                                })
                            } else {
                                activityPublish(data).then((res) => {
                                    if (res.data.code === 200) {
                                        this.showMessage('success', sucMsg)
                                        this.$router.push({ name: 'adminActivity' })
                                    } else {
                                        this.showMessage('error', res.data.msg)
                                    }
                                })
                            }
                        } else {
                            this.showMessage('warning', '请按要求填写完整信息')
                        }
                    })
                } else {
                    this.showMessage('warning', '请登录后再操作')
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    .publish-activity{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        .publish-box{
            width: 100%;
            overflow: hidden;
        }
    }
.tips {
    height: 100px;
    line-height: 2;
    font-size: 12px;
    padding-top: 20px;
    margin-left: 20px;
}


</style>

<style lang="scss">
.publish-box{
    .el-textarea__inner{
        height: 102px;
        border-radius: 4px;
    }
    .el-input__inner{
        height: 38px;
        border-radius: 3px;
    }
    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
    position: absolute;
    top: 5px;
    right: 10px;
    }
    .date-box {
        .el-form-item__content {
            margin-left: 0px !important;
        }
    }
}
</style>