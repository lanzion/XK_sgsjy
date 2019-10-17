<template>
    <div class="servicePublish theme-red backend-content__middle" id="servicePublish">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <!-- 作品名称 -->
            <el-row>
                <el-form-item label="标题" prop='name'>
                    <el-col :span="9">
                        <el-input placeholder="请输入服务标题，不超过30字符" v-model.trim="form.name" :maxlength="30"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属分类 -->
            <el-row>
                <el-form-item label="类目" prop='category'>
                    <el-col :span="9">
                       <el-select v-model="form.category" placeholder="请选择" style="width:100%;">
                            <el-option v-for="(item,index) in serveCategoryOptions" :key="index" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 有效期 -->
            <el-row>
                <el-form-item label="有效期" prop='validDate'>
                    <el-col :span="9">
                        <el-date-picker v-model="form.validDate" type="date" placeholder="选择日期" style="width:100%;" :picker-options="disableStart"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 封面 -->
            <el-row>
                <el-form-item label="服务封面" prop='cover'>
                    <el-col :span="14">
                        <el-upload class="psn-cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover">
                            <img v-if="img != '' && img != null" :src="img" class="psn-cover">
                            <i v-else class="el-icon-plus psn-cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="服务详情" prop='content'>
                    <el-col :span="23">
                        <el-input v-model="form.content" v-show="false"></el-input>
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 上传附件 -->
            <el-row>
                <el-form-item label="附件" prop="resourceList">
                    <el-col :span="15">
                        <el-checkbox-group v-model="form.resourceList" v-show="false"></el-checkbox-group>
                        <el-upload class="upload-demo" v-bind:class="{'list-disabled': isPreview}" action :file-list="form.resourceList" :on-remove="resourceListRemove" :before-upload="UploadFile">
                          <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                          <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在 {{ standardFileSize }} M以内</span>
                        </el-upload>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="psn-confirm-btn" @click="onSubmit(1)" type="button">提交审核</button>
                <button class="psn-confirm-btn" @click="onSubmit(0)" type="button">保存</button>
                <button class="psn-cancel-btn" @click="$router.push({ path: '/admin/service/pending' })">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapActions, mapState } from 'vuex'
    import { servicePublish, serviceDetail, serviceModify } from '@/service/service.js'

    export default {
        name: 'servicePublish',
        mixins: [uploadFileSize, editor],
        data() {
            const changeContent = (rule, value, callback) => {
                    if (!value || value === '<p><br></p>') {
                        return callback(new Error('请输入服务详情'))
                    } else {
                        callback()
                    }
                }
            return {
                // 封面
                imgSize: 2,
                // 附件
                resourceSize: 10,
                // 表单
                form: {
                    // 标题
                    name: '',
                    // 类目
                    category: '',
                    // 有效期
                    validDate: '',
                    // 封面
                    cover: '',
                    // 详情
                    content: '',
                    resourceList: []
                },
                img: '',
                // 表单检验
                rules: {
                    name: [
                        { required: true, message: '请输入服务标题', trigger: 'change' },
                        { max: 29, message: '不超过30个字符', trigger: 'change' }
                    ],
                    category: [
                        { required: true, message: '请选择类目', type: 'string' }
                    ],
                    validDate: [
                        { required: true, message: '请选择有效期', type: 'date' }
                    ],
                    content: [
                        { required: true, trigger: 'change', validator: changeContent }
                    ],
                    cover: { required: true, message: '请上传图片', trigger: 'change' }
                },
                // 有效期限制从今天开始
                disableStart: {
                    disabledDate(time) {
                        if (typeof time !== 'number') {
                            time = time.getTime()
                        }
                        return time < Date.now() - 8.64e7
                    }
                },
                isPreview: false
            }
        },
        created() {
            this.isPreview = this.$route.path.includes('preview')
            // 请求涉及技术下拉
            this.getDictComb('serveCategory')
        },
        mounted() {
            const self = this
            this.initEditor()
            this.editor.onchange = function () {
                self.form.content = this.$txt.html()
            }
            if (this.$route.query.id !== undefined) {
                serviceDetail({ id: this.$route.query.id }).then((res) => {
                    const _form = res.data.entity
                    const form = this.form
                    form.name = _form.name
                    form.category = _form.category
                    form.validDate = new Date(_form.validDate)
                    form.cover = _form.cover
                    this.img = this.getFileUrl(_form.cover)
                    form.content = _form.content
                    this.editor.$txt.html(_form.content)
                    _form.resourceList.forEach((i) => {
                        if (i.documentId) {
                            form.resourceList.push({ name: i.name, resourceId: i.resourceId, documentId: i.documentId, status: 'finished' })
                        } else {
                            form.resourceList.push({ name: i.name, resourceId: i.resourceId, status: 'finished' })
                        }
                    })
                })
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            // 删除附件
            resourceListRemove(file, fileList) {
                this.form.fileList = fileList
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
                            if (res.appendInfo.documentId) {
                                _this.form.resourceList.push({ name: files.name, resourceId: res.appendInfo.resourceId, documentId: res.appendInfo.documentId, status: 'finished' })
                            } else {
                                _this.form.resourceList.push({ name: files.name, resourceId: res.appendInfo.resourceId, status: 'finished' })
                            }
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                    })
                } else {
                    _this.form.resourceList.splice(_this.form.resourceList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            },
            // 表单提交
            onSubmit(isSubmit) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const time = this.form.validDate
                        this.form.validDate = this.form.validDate.getTime()
                        this.form.isSubmit = isSubmit
                        if (this.$route.query.id !== undefined) {
                            this.form.id = this.$route.query.id
                            serviceModify(this.form).then((res) => {
                                if (res.data.code === 200) {
                                    this.$router.push({ path: '/admin/service/pending' })
                                    this.$message({
                                        message: isSubmit === 0 ? '保存成功' : '发布成功',
                                        type: 'success'
                                    })
                                } else {
                                    this.form.validDate = time
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        } else {
                            servicePublish(this.form).then((res) => {
                                if (res.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '发布成功',
                                        type: 'success'
                                    })
                                    this.$router.push({ path: '/admin/service/pending' })
                                } else {
                                    this.form.validDate = time
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }
                    }
                })
            }
        },
        computed: {
            // 涉及技术下拉数据
            ...mapState('dictionaryCommon', {
                serveCategoryOptions(state) {
                    const dicList = (state.serveCategoryDicList || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.servicePublish{
    min-height: 820px;
    font-size: 14px;
    // 上传按钮
    .upload-btn{
        width: 90px;
        height: 38px;
        border: 1px solid #c9c9c9;
        border-radius: 2px;
        display: inline-block;
        margin-right: 10px;
        i{
            color: $theme_color;
        }
    }
    // 发布、取消按钮

    .btn{
        padding: 0px 30px;
        height: 34px;
        line-height: 34px;
        border: 1px solid $theme_color;
        color: $theme_color;
        margin-left: 5px;
        box-sizing: border-box;
    }
    .publish-btn{
        background-color: $theme_color;
        color: #fff;
        margin-left: 5px;
    }
    .upload-tip{
        font-size: 12px;
    }
    .publish-btn:hover{
        opacity: 0.75;
    }
    .btn:hover{
        background-color: $theme_color;
        color: #fff;
    }
    .el-textarea__inner{
        height: 100px;
    }
    .el-input__inner{
        height: 38px;
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
    .el-cascader{
        width: 100%;
    }
}
</style>
