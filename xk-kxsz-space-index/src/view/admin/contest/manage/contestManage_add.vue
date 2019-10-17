<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="140px" :rules="rules">
            <!-- 竞赛主题 -->
            <el-row>
                <el-form-item label="竞赛主题" prop="title">
                    <el-col :span="8">
                        <el-input v-model="form.title" placeholder="请输入竞赛主题" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛项目 -->
            <el-row>
                <el-form-item label="竞赛项目" prop="projectRelationList">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.projectRelationList">
                            <el-checkbox v-for="item in projectRelationList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                        <router-link class="resource-name" v-if="!projectRelationList.length" :to="{ path: '/contest/event/add' }"><i class="icon-btn-add"></i>去添加</router-link>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 参赛人群 -->
            <el-row>
                <el-form-item label="参赛人群" prop="actorType">
                    <el-col :span="8">
                        <el-radio-group v-model="form.actorType">
                            <el-radio v-for="item in actorTypeDL" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="16">
                        <p class="hint">
                            <i class="table-cell icon-form-tip"></i>
                            <span class="table-cell">参赛人群是学生时，学生可以报名参赛；参赛人群是教师时，教师可以报名参赛</span>
                        </p>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛分组 -->
            <el-row v-if="form.actorType==1">
                <el-form-item label="竞赛分组" prop="actorGroup">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.actorGroup">
                            <el-checkbox v-for="item in actorGroupDL" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="16">
                        <p class="hint">
                            <i class="table-cell icon-form-tip"></i>
                            <span class="table-cell">只有参赛人群为学生时，才分组；参赛人群为教师时不分组；若选择分组，则只有这个分组的学生才能报名比赛</span>
                        </p>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 参赛形式 -->
            <el-row>
                <el-form-item label="参赛形式" prop="actorWay">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.actorWay">
                            <el-checkbox v-for="item in actorWayDL" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛封面 -->
            <el-row>
                <el-form-item label="竞赛封面" prop="cover">
                    <el-col :span="14">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover" :disabled="isReadOnly">
                            <img v-if="form.cover&&form.cover!=''" :src="getFileUrl(form.cover)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-form-item>
            </el-row>
            <!-- 竞赛时间 -->
            <el-row>
                <el-form-item label="竞赛时间" prop="matchDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.matchDate" type="daterange" placeholder="请选择竞赛时间范围" :picker-options="matchDateOptions" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 报名时间 -->
            <el-row>
                <el-form-item label="报名时间" prop="enrollDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.enrollDate" type="daterange" placeholder="请选择报名时间范围" :picker-options="enrollDateOptions" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                    <el-col :span="16">
                        <p class="hint">
                            <i class="table-cell icon-form-tip"></i>
                            <span class="table-cell">报名成功即可上传作品，当到达截止时间后，不能再上传作品</span>
                        </p>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 作品上传截止时间 -->
            <el-row>
                <el-form-item label="作品上传截止时间" prop="worksEndDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.worksEndDate" type="date" placeholder="请选择作品上传截止时间范围" :picker-options="worksEndDateOptions" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 单人参赛作品限额 -->
            <el-row>
                <el-form-item label="单人参赛作品限额" prop="singleMaxNum">
                    <el-col :span="8">
                        <el-input-number v-model="form.singleMaxNum" :min="0" :disabled="isReadOnly"></el-input-number>
                    </el-col>
                    <el-col :span="16">
                        <p class="hint">
                            <i class="table-cell icon-form-tip"></i>
                            <span class="table-cell">一个报名人的参赛作品数限制。超出限额，则不能上传作品，0为不限制</span>
                        </p>
                    </el-col>
                </el-form-item>
                <el-form-item label="" prop="isWorksAudit">
                    <el-col :span="8">
                        <el-switch v-model="form.isWorksAudit" on-text="" off-text="" :on-value="1" :off-value="0" :disabled="isReadOnly"></el-switch> 是否作品审核
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛级别 -->
            <el-row>
                <el-form-item label="竞赛级别" prop="matchGrade">
                    <el-col :span="8">
                        <el-select v-model="form.matchGrade" placeholder="请选择主管部门" :disabled="true">
                            <el-option v-for="item in matchGradeDL" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛详情 -->
            <el-row>
                <el-form-item label="竞赛详情" prop="details">
                    <el-col :span="15">
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="14">
                        <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile" :disabled="isReadOnly">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
                        </el-upload>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import { editor } from '@/mixin/wangEditor.js'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { mapState, mapMutations, mapActions } from 'Vuex'
import { addContest, requestContestDetail, modifyContest, requestContestItem } from '@/service/admin_contest.js'
// import region from '@/components/common/select/region_select.vue'

export default {
    name: 'contestManageAdd',
    mixins: [uploadFileSize, editor],
    data() {
        var validateMatchDate = (rule, value, callback) => {
            value = value.filter(x => x)
            if (!value.length) {
                callback(new Error(`请选择竞赛时间范围`))
            } else if (value[0] < Date.now()) {
                callback(new Error(`竞赛开始不能早于当前时间`))
            } else {
                if (this.form.enrollDate.length) {
                    this.$refs.form.validateField('enrollDate')
                }
                if (this.form.worksEndDate !== '') {
                    this.$refs.form.validateField('worksEndDate')
                }
                callback()
            }
        }
        var validateEnrollDate = (rule, value, callback) => {
            value = value.filter(x => x)
            let matchEndDate = this.params.matchEndDate
            if (!value.length) {
                callback(new Error(`请选择报名时间范围`))
            } else if (value[1] > matchEndDate) {
                callback(new Error(`报名截止时间不能晚于竞赛结束时间`))
            } else {
                if (this.form.worksEndDate !== '') {
                    this.$refs.form.validateField('worksEndDate')
                }
                callback()
            }
        }
        var validateWorksEndDate = (rule, value, callback) => {
            let enrollEndDate = this.params.enrollEndDate
            let matchEndDate = this.params.matchEndDate
            if (value === '') {
                callback(new Error(`请选择作品上传截止时间`))
            } else if (value <= enrollEndDate && value > matchEndDate) {
                callback(new Error(`作品上传截止时间不能早于报名截止时间且不能晚于竞赛结束时间`))
            } else if (value <= enrollEndDate) {
                callback(new Error(`作品上传截止时间不能早于报名截止时间`))
            } else if (value > matchEndDate) {
                callback(new Error(`作品上传截止时间不能晚于竞赛结束时间`))
            } else {
                callback()
            }
        }
        return {
            projectRelationList: [],// 竞赛项目
            matchDateOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            // 表单数据
            form: {
                title: '',          // 竞赛主题
                projectRelationList: [],
                actorType: '',      // 参赛人群
                actorGroup: [],     // 竞赛分组
                actorWay: [],       // 参赛形式
                cover: null,        // 竞赛封面
                matchDate: [],      // 竞赛时间
                enrollDate: [],     // 报名时间
                worksEndDate: '',   // 作品上传截止时间
                singleMaxNum: 0,    // 单人参赛作品限额
                isWorksAudit: 1,    // 是否作品审核
                matchGrade: loginInfo.userInfo.identity || '5',    // 竞赛级别(同身份identity)
                details: '',        // 竞赛详情
                attachmentList: []  // 附件列表
            },
            disabled: false,
            isReadOnly: false,
            // 表单校验提示
            rules: {
                title: [
                    { required: true, message: '请输入竞赛主题', trigger: 'change' },
                    { max: 50, message: '请输入50字以内的竞赛主题', trigger: 'change' }
                ],
                projectRelationList: [
                    { required: true, type: 'array', message: '请选择竞赛项目', trigger: 'change' }
                ],
                actorType: [
                    { required: true, message: '请选择参赛人群', trigger: 'change' }
                ],
                actorGroup: [
                    { required: true, type: 'array', message: '请选择竞赛分组', trigger: 'blur' }
                ],
                actorWay: [
                    { required: true, type: 'array', message: '请选择参赛形式', trigger: 'blur' }
                ],
                cover: [
                    { required: true, message: '请上传竞赛封面', trigger: 'change' },
                ],
                matchDate: [
                    { required: true, type: 'array', message: '请选择竞赛时间范围', trigger: 'change' },
                    { validator: validateMatchDate, required: true, trigger: 'change' }
                ],
                enrollDate: [
                    { required: true, type: 'array', message: '请选择报名时间范围', trigger: 'change' },
                    { validator: validateEnrollDate, required: true, trigger: 'change' }
                ],
                worksEndDate: [
                    { required: true, type: 'date', message: '请选择作品上传截止时间', trigger: 'change' },
                    { validator: validateWorksEndDate, required: true, trigger: 'change' }
                ],
                singleMaxNum: [
                    { required: true, type: 'number', message: '请输入单人参赛作品限额', trigger: 'change' }
                ],
                matchGrade: [
                    { required: true, message: '请选择竞赛级别', trigger: 'change' }
                ],
                details: [
                    { required: true, message: '请输入竞赛详情', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        UploadCover (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".") + 1),
                  _this = this
            if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.form.cover = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
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
                uploader.cancelFile(file)
            }
        },
        UploadFile (file, fileList) {
            const fileSize = file.size,
                  _this = this
            if (fileSize < (this.standardFileSize * 1024 * 1024) ) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if (res.code === 200) {
                        _this.form.attachmentList.push({
                            name: file.name,
                            type: 1,
                            size: fileSize,
                            resourceId: res.appendInfo.resourceId,
                            documentId: res.appendInfo.resourceId
                        })
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                _this.form.attachmentList.splice(_this.form.attachmentList.length, 1)
                _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                uploader.cancelFile(file)
            }
        },
        handleRemove(file, fileList) {
            let _list = []
            fileList.forEach(x => {
                _list.push({
                    name: x.name,
                    type: 1,
                    resourceId: x.url
                })
            })
            this.form.attachmentList = _list
        },
        //获取赛事详情
        getDetail(){
            requestContestDetail({id:this.form.id}).then((res) => {
                if (res.data.code === 200) {
                    let datas = res.data.entity,
                        _form = {}
                    _form.id = datas.id
                    _form.title = datas.title || ''
                    _form.projectRelationList = datas.projectRelationList.map(x => { return x.projectId }) || []
                    _form.actorType = datas.actorType || ''
                    _form.actorGroup = datas.actorGroup.split(',') || []
                    _form.actorWay = datas.actorWay.split(',') || []
                    _form.cover = datas.cover || ''
                    _form.matchDate = [datas.matchStartDate, datas.matchEndDate]
                    _form.enrollDate = [datas.enrollStartDate, datas.enrollEndDate]
                    _form.worksEndDate = new Date(datas.worksEndDate) || ''
                    _form.singleMaxNum = datas.singleMaxNum || ''
                    _form.isWorksAudit = datas.isWorksAudit || '0'
                    _form.matchGrade = datas.matchGrade || ''
                    _form.details = datas.details || ''
                    _form.attachmentList = datas.attachmentList.map(x => {
                        let item = {
                            name: x.name,
                            type: x.type,
                            size: x.size,
                            resourceId: x.resourceId,
                            documentId: x.documentId
                        }
                        return item
                    })
                    this.editor.$txt.html(datas.details)
                    this.$set(this.$data, 'form', _form)
                }
            })
        },
        // 获取竞赛项目列表
        getItemsData() {
            requestContestItem().then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.entity.resultData || []
                    this.projectRelationList = _data
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let flag = this.$route.query.id ? true : false,
                        handle = flag ? modifyContest : addContest,
                        handleText = flag ? '修改' : '添加'

                    handle(this.params).then( response => {
                        if (response.data.code == 200) {
                            this.$router.go(-1)
                            this.$message({
                                message: `${handleText}成功`,
                                type: 'success'
                            })
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    created() {
        this.getItemsData()
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }

        let _id = this.$route.query.id
        if(_id != undefined) {
            this.$set(this.form, 'id', _id)
            this.getDetail()
            this.disabled = true
        }
    },
    mounted() {
        this.initEditor()
        let self = this
        this.editor.onchange = function () {
            self.form.details = this.$txt.html()
        }
        if (this.isReadOnly) {
            this.editor.disable()
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            actorGroupDL (state) {
                let dicList = (state['periodKeyDicList'] || {}).dicList || []
                return dicList
            },
            actorWayDL (state) {
                let dicList = (state['actorWayDicList'] || {}).dicList || []
                return dicList
            },
            actorTypeDL (state) {
                let dicList = (state['actorTypeDicList'] || {}).dicList || []
                return dicList
            },
            matchGradeDL (state) {
                let dicList = (state['matchGradeDicList'] || {}).dicList || []
                return dicList
            }
        }),
        enrollDateOptions: function() {
            let matchEndDate = this.form.matchDate[1]
            return {
                disabledDate(time) {
                    let range = time.getTime() < Date.now() - 8.64e7
                    if (matchEndDate) {
                        range = time.getTime() < Date.now() - 8.64e7 || time.getTime() > matchEndDate
                    }
                    return range
                }
            }
        },
        worksEndDateOptions: function() {
            let matchEndDate = this.form.matchDate[1]
            let enrollEndDate = this.form.enrollDate[1]
            return {
                disabledDate(time) {
                    let range = time.getTime() < Date.now() - 8.64e7
                    if (enrollEndDate && matchEndDate) {
                        range = time.getTime() <= enrollEndDate || time.getTime() > matchEndDate
                    } else if (matchEndDate) {
                        range = time.getTime() < Date.now() - 8.64e7 || time.getTime() > matchEndDate
                    } else if (enrollEndDate) {
                        range = time.getTime() <= enrollEndDate
                    }
                    return range
                }
            }
        },
        params: function() {
            let _params = Object.assign({}, this.form)
            _params.actorGroup = _params.actorGroup.join(',')
            _params.actorWay = _params.actorWay.join(',')
            _params.matchStartDate = _params.matchDate[0]
            _params.matchEndDate = _params.matchDate[1]
            _params.enrollStartDate = _params.enrollDate[0]
            _params.enrollEndDate = _params.enrollDate[1]
            _params.projectRelationList = _params.projectRelationList.length ? _params.projectRelationList.map(x => { return { projectId: x }}) : []

            delete _params.matchDate
            delete _params.enrollDate
            return _params
        },
        fileList: function() {
            let _list = []
            let fileList = this.form.attachmentList || []
            fileList.forEach(x => {
                _list.push({
                    name: x.name,
                    url: this.getFileUrl(x.resourceId, {filetype: 'file'}),
                    status: 'finished'
                })
            })
            return _list
        }
    },
    components: {
        // 'v-region-select': region
    }
}
</script>

<style lang='scss' scoped>
    .hint {
        display: table;
        height: 36px;
        font-size: 12px;
        line-height: 1;
        color: #999;

        .icon-form-tip {
            padding-right: 4px;
            font-size: 14px;
            text-indent: 10px;
        }
    }
    .icon-btn-add {
        margin-right: 4px;
    }
</style>