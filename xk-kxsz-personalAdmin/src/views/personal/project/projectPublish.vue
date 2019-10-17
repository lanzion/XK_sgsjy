<template>
    <div id="projectPublish" class="projectPublish backend-content__middle">
        <div class="admin_project_publish">
            <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                <!-- 项目名称 -->
                <el-row>
                    <el-form-item label="项目名称" prop="name">
                        <el-col :span="9">
                            <el-input :disabled="isPreview" v-model.trim="form.name" placeholder="请输入项目名称，不超过30字" :maxlength="30"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目封面 -->
                <el-row>
                    <el-form-item label="项目封面" prop="imgUrl">
                        <el-col :span="14">
                            <el-input v-model="form.imgUrl" placeholder="请输入内容" v-show="false"></el-input>
                            <el-upload :disabled="isPreview" class="psn-cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover">
                                <img v-if="img != '' && img != null" :src="img" class="psn-cover">
                                <i v-else class="el-icon-plus psn-cover-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                        <div class="tips" style="color:#8391a5;">
                            仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M。<br>
                            建议上传的图片像素为 556 x 378
                        </div>
                    </el-form-item>
                </el-row>
                <!-- 项目目标 -->
                <el-row>
                    <el-form-item label="项目目标" prop="goal">
                        <el-col :span="9">
                            <el-input :disabled="isPreview" v-model="form.goal" placeholder="请输入项目目标，不超过100字"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目内容 -->
                <el-row>
                    <el-form-item label="项目内容" prop="content">
                        <el-col :span="20">
                          <el-input :disabled="isPreview" type="textarea" v-model="form.content" placeholder="请输入项目内容，不超过1000字" :rows='5' resize='none'></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目期限 -->
                <el-row>
                    <el-form-item label="项目期限" prop="limit">
                        <el-col :span="11">
                            <el-date-picker :disabled="isPreview" v-model="form.limit" type="daterange" placeholder="选择日期范围" :picker-options="timeRules[0]" range-separator=" -- " @change="dateChange"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目阶段 -->
                    <!-- 项目发起 -->
                <el-form-item label="项目阶段" required>
                    <el-row style="margin-bottom:10px;" v-for="(item, index) in projectStages" :key="index">
                        <el-col :span="7">
                            <el-date-picker v-model="form.phase[index]" type="daterange" placeholder="选择日期范围" range-separator="/" format="yyyy-MM-dd"  :picker-options="timeRules[index+1]" :disabled="!(nextArr.includes(index))" @change="nextInput(index)">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item :label="'('+item+')'"></el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 报名时间 -->
                <el-row>
                    <el-form-item label="报名时间" prop="enrolTime">
                        <el-col :span="11">
                            <el-date-picker type="daterange" placeholder="请选择报名时间" v-model="form.enrolTime" style="width:100%;" :picker-options="timeRulesEnrolTime" :disabled="!ifCanEnrolTime"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 发起人 -->
                <el-row>
                    <el-form-item label="发起人" required>
                        <el-col :span="9">
                            <el-input v-model="form.createId" placeholder="默认为创建者" disabled></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目分类 -->
                <el-row>
                    <el-form-item label="项目分类" prop="projectType">
                        <el-col :span="9">
                            <v-multiSelect :disabled="isPreview" :selectData.sync='form.projectType' :ifAll="false" :model="'project'"></v-multiSelect>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 相关技术 -->
                <el-row>
                    <el-form-item label="相关技术" prop="technologyRelationList">
                        <el-col :span="20">
                            <el-select :disabled="isPreview" v-model="form.technologyRelationList" multiple placeholder="请选择" style="width:100%;" :filterable="true">
                                <el-option
                                    v-for="(item,index) in technologyOptions"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 适合学生 -->
                <el-row>
                    <el-form-item label="适合学生" prop="applyScopeId">
                        <el-col :span="9">
                            <el-checkbox-group :disabled="isPreview" v-model="form.applyScopeId" :min="1">
                                <el-checkbox :disabled="isPreview" v-for="item in applyScopeIdOptions" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 项目人数 -->
                <el-row>
                    <el-form-item label="项目人数" prop="totalNum">
                        <el-col :span="9">
                            <el-input :disabled="isPreview" v-model.number="form.totalNum" placeholder="请输入项目人数"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 材料清单 -->
                <el-row>
                    <el-form-item label="材料清单" prop="materialList">
                        <el-col :span="20">
                          <el-input :disabled="isPreview" type="textarea" v-model="form.materialList" placeholder="请输入材料清单" :rows='5' resize='none'></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 附件 -->
                <el-row>
                    <el-form-item label="附件">
                        <el-col :span="15">
                            <el-upload :disabled="isPreview" class="upload-demo" v-bind:class="{'list-disabled': isPreview}" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                                <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{standardFileSize}}M以内</span>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-form-item v-if="!isPreview">
                  <button class="psn-confirm-btn" @click.prevent="onSubmit('form', 1)">提交审核</button>
                  <button class="psn-confirm-btn" @click.prevent="onSubmit('form', 0)">保存</button>
                  <button class="psn-cancel-btn" @click.prevent="$router.go(-1)">取消</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { mapState, mapActions } from 'vuex'
import { addProject, modifyProject, detailProject } from '@/service/project.js'
// import { requestDictComb } from '@/service/common.js'
import multiSelect from '@/components/common/select/multi_select.vue'

let formPhase

export default {
    name: 'projectPublish',
    mixins: [uploadFileSize],
    data() {
        const validateTotalNum = (rule, value, callback) => {
            if (!value && value !== 0) {
                return callback(new Error('请输入项目人数'))
            } else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字'))
            } else if (value < 1) {
                callback(new Error('项目人数必须大于0'))
            } else {
                callback()
            }
        }

        // const validateEnrollEndDate = (rule, value, callback) => {
        //     const startTime = this.form.limit[0]
        //     const stopTime = this.form.limit[1]
        //     if (value === '') {
        //         callback(new Error('请选择报名截止时间'))
        //     } else if (startTime && stopTime && (value.getTime() < startTime.getTime() || value.getTime() > stopTime.getTime())) {
        //         callback(new Error('报名截止时间应在项目期限范围内，请重新选择'))
        //     } else {
        //         callback()
        //     }
        // }
        return {
            // 控制项目阶段下一个可选
            nextArr: [],
            // 控制报名时间是否可选
            ifCanEnrolTime: false,
            // 阶段名称
            projectStages: [
                '项目发起',
                '项目准备',
                '项目设计',
                '项目制作',
                '测试迭代',
                '项目评价'
            ],
            // 阶段时间限定
            timeRules: [
                {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < formPhase[0][1].getTime()
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < formPhase[1][1].getTime()
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < formPhase[2][1].getTime()
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < formPhase[3][1].getTime()
                    }
                },
                {
                    disabledDate(time) {
                        return time.getTime() < formPhase[4][1].getTime()
                    }
                }
            ],
            timeRulesEnrolTime: null,
            // 表单数据
            form: {
                name: '',
                imgUrl: null,
                goal: '',
                content: '',
                limit: [],
                phase: [],
                enrollStartDate: '',
                enrollEndDate: '',
                createId: this.$ls.get('loginInfo').userInfo.userName,
                projectType: [],
                technologyRelationList: [],
                applyScopeId: [],
                totalNum: '',
                materialList: '',
                enrolTime: []
            },
            fileList: [],
            // 表单校验提示
            rules: {
                // 名称
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'change' },
                    { max: 29, message: '不超过30字', trigger: 'change' }
                ],
                // 封面
                imgUrl: [
                    { required: true, message: '请上传封面图片', trigger: 'change' }
                ],
                // 期限
                limit: [
                    { required: true, message: '请选择项目期限', type: 'array' }
                ],
                // 目标
                goal: [
                    { required: true, message: '请输入项目目标', trigger: 'change' },
                    { max: 100, message: '不超过100字符', trigger: 'change' }
                ],
                // 内容
                content: [
                    { required: true, message: '请输入项目内容', trigger: 'change' },
                    { max: 1000, message: '不超过1000字符', trigger: 'change' }
                ],
                // 报名时间
                enrolTime: [
                    { required: true, message: '请选择报名时间', type: 'array' }
                ],
                // 人数
                totalNum: [
                    { required: true, validator: validateTotalNum, trigger: 'change' }
                ],
                // 材料清单
                materialList: [
                    { required: true, message: '请输入材料清单', trigger: 'change' }
                ],
                // 分类
                projectType: [
                    { required: true, message: '请选择项目分类', type: 'array' }
                ],
                // 相关技术
                technologyRelationList: [
                    { required: true, message: '请选择相关技术', type: 'array' }
                ],
                applyScopeId: [
                    { required: true, message: '请选择适合学生', type: 'array' }
                ]
            },
            img: null,
            isPreview: false
        }
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        // 项目阶段下一个可选
        nextInput(index) {
            this.nextArr.push(index + 1)
        },
        // 项目时间选中改变, 第一阶段、报名时间可选
        dateChange() {
            let startTime = null
            let endTime = null
            if ((this.form.limit[0] === undefined || this.form.limit[0] === null || this.form.limit[0] === '') && (this.form.limit[1] === undefined || this.form.limit[1] === null || this.form.limit[1] === '')) {
                this.form.limit = ['', '']
            } else {
                startTime = this.form.limit[0].getTime()
                endTime = this.form.limit[1].getTime()
                this.nextArr = [0]
                this.ifCanEnrolTime = true
            }

            if (startTime && endTime) {
                this.$set(this.timeRules, 1, {
                    disabledDate(time) {
                        return time.getTime() < startTime || time.getTime() > endTime
                    }
                })
                // for (let i = 2; i < 7; i++) {
                //     this.$set(this.timeRules, i, {
                //         disabledDate(time) {
                //             return time.getTime() < formPhase[i - 2][1].getTime() || time.getTime() > endTime
                //         }
                //     })
                // }
                this.$set(this.timeRules, 2, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[2 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.$set(this.timeRules, 3, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[3 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.$set(this.timeRules, 4, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[4 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.$set(this.timeRules, 5, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[5 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.$set(this.timeRules, 6, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[6 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.$set(this.timeRules, 7, {
                    disabledDate(time) {
                        return time.getTime() < formPhase[7 - 2][1].getTime() || time.getTime() > endTime
                    }
                })
                this.timeRulesEnrolTime = {
                    disabledDate(time) {
                        return time.getTime() > endTime
                    }
                }
            }
        },
        // 删除上传文件
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        // 上传封面
        UploadCover(file) {
            const fileSize = file.size
            const fileName = file.name
            const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
            const _this = this
            if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                    if (res.code === 200) {
                        _this.form.imgUrl = res.appendInfo.resourceId
                        _this.img = _this.getFileUrl(res.appendInfo.resourceId)
                    }
                })
                // uploader.off('uploadError').on('uploadError', function (file, reason) {
                //     _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                // })
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
                _this.form.imgUrl = null
                _this.img = _this.getFileUrl(null)
                uploader.cancelFile(file)
            }
        },
        // 上传文件
        UploadFile(file) {
            const fileSize = file.size
            const _this = this
            if (fileSize < (this.standardFileSize * 1024 * 1024)) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                    if (res.code === 200) {
                        _this.fileList.push({ name: files.name, url: res.appendInfo.resourceId, status: 'finished' })
                    }
                })
                // uploader.off('uploadError').on('uploadError', function (file, reason) {
                //     _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                // })
            } else {
                _this.fileList.splice(_this.fileList.length, 1)
                _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                uploader.cancelFile(file)
            }
        },
        // 提交表单
        onSubmit(formName, isSubmit) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const form = this.form
                    const technologyRelationListValue = form.technologyRelationList.map(i => ({
                        technologyId: i
                    }))
                    const resourceList = this.fileList.map(i => ({
                        resourceType: '1',
                        userId: this.$ls.get('loginInfo').userInfo.id,
                        name: i.name,
                        resourceId: i.uid
                    }))
                    const projectPhaseList = form.phase.map((i, k) => ({
                        phaseCode: k + '',
                        sort: k,
                        phaseStartTime: i[0].getTime(),
                        phaseEndTime: i[1].getTime()
                    }))
                    const _form = {
                        name: form.name.trim(),
                        imgUrl: form.imgUrl,
                        goal: form.goal.trim(),
                        content: form.content.trim(),
                        startDate: form.limit[0] === undefined ? null : form.limit[0].getTime(),
                        endDate: form.limit[1] === undefined ? null : form.limit[1].getTime(),
                        projectPhaseList: projectPhaseList,
                        enrollStartDate: form.enrolTime[0] === undefined ? null : form.enrolTime[0].getTime(),
                        enrollEndDate: form.enrolTime[1] === undefined ? null : form.enrolTime[1].getTime(),
                        createId: form.createId,
                        projectType: form.projectType.join('-'),
                        technologyRelationList: technologyRelationListValue,
                        applyScopeId: form.applyScopeId.join(','),
                        totalNum: form.totalNum,
                        materialList: form.materialList,
                        // projectResourceList: this.fileList,
                        projectTypeParent: form.projectType[0] + '',
                        projectResourceList: resourceList,
                        isSubmit: isSubmit
                    }
                    if (this.$route.query.id !== undefined) {
                        _form.id = this.$route.query.id
                        modifyProject(_form).then((res) => {
                            if (res.data.code === 200) {
                                this.$router.push({ path: '/admin/project/unchecked' })
                                this.$message({
                                    message: isSubmit === 0 ? '保存成功' : '发布成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message({ message: res.data.msg })
                            }
                        })
                    } else {
                        addProject(_form).then((res) => {
                            if (res.data.code === 200) {
                                this.$router.push({ path: '/admin/project/unchecked' })
                                this.$message({
                                    message: isSubmit === 0 ? '保存成功' : '发布成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message({ message: res.data.msg })
                            }
                        })
                    }
                } else {
                    return false
                }
            })
        }
    },
    mounted() {
        this.isPreview = this.$route.path.includes('preview')
        this.getDictComb('technicalClassification')
        if (this.$route.query.id !== undefined) {
            detailProject({ id: this.$route.query.id }).then((res) => {
                if (res.status === 200) {
                    const _form = res.data.entity
                    const form = this.form
                    form.name = _form.name
                    form.imgUrl = _form.imgUrl
                    form.goal = _form.goal
                    form.content = _form.content
                    form.limit = [new Date(_form.startDate), new Date(_form.endDate)]
                    for (let i = 0; i < _form.projectPhaseList.length; i++) {
                        form.phase[i] = [new Date(_form.projectPhaseList[i].phaseStartTime), new Date(_form.projectPhaseList[i].phaseEndTime)]
                    }
                    form.enrolTime = [new Date(_form.enrollStartDate), new Date(_form.enrollEndDate)]
                    form.enrollStartDate = new Date(_form.enrollStartDate)
                    form.enrollEndDate = new Date(_form.enrollEndDate)
                    for (let i = 0; i < _form.technologyRelationList.length; i++) {
                        form.technologyRelationList.push(_form.technologyRelationList[i].technologyId)
                    }
                    form.projectType = _form.projectType.split('-')
                    form.applyScopeId = _form.applyScopeId.split(',')
                    form.totalNum = _form.totalNum
                    form.materialList = _form.materialList
                    this.fileList = _form.projectResourceList
                    this.img = this.getFileUrl(_form.imgUrl)
                    // _form = null, form = null
                }
            })
        }
    },
    watch: {
        'form.phase': {
            handler(curVal) {
                formPhase = curVal
            },
            deep: true
        }
    },
    components: {
        'v-multiSelect': multiSelect
    },
    computed: {
        ...mapState('dictionaryCommon', {
            applyScopeIdOptions(state) {
                const dicList = (state.periodKeyDicList || {}).dicList || []
                return dicList
            },
            technologyOptions(state) {
                const dicList = (state.technicalClassificationDicList || {}).dicList || []
                return dicList
            }
        }),
        // enrollEndTimeRule() {
        //     let startTime = this.form.limit[0],
        //         stopTime = this.form.limit[1];
        //     if (startTime && stopTime) {
        //         return {
        //             disabledDate(time) {
        //                 return time.getTime() < startTime.getTime() || time.getTime() > stopTime.getTime()
        //             }
        //         }
        //     } else {
        //         return {
        //             disabledDate(time) {
        //                 return time.getTime() < Date.now() - 8.64e7 || time.getTime() > stopTime
        //             }
        //         }
        //     }
        // }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/admin_projectForm.scss';
</style>

<style lang='scss' scoped>
.admin_project_publish {
    padding: 20px;
    .el-form-item {
        position: relative;
        .el-icon-circle-check {
            position: absolute;
            top: 50%;
            transform: translate(50%, -50%);;
        }
    }
    .el-upload-list__item {
        .el-upload-list__item-status-label {
            height: 100%;
        }
        .el-icon-close {
            position: absolute;
            right: -10px;
            top: 6px;
        }
    }
    .el-button--primary {
        border: none;
    }

}
</style>
