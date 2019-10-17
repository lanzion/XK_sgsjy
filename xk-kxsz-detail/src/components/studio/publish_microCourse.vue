<template>
    <el-dialog :visible.sync="visible.show" id="publish_microCourse" title="发布微课" class="dialog" @close="close" lock-scroll>
        <!-- <header class="header">发布微课</header> -->
        <section class="content-box clearfix" style="margin: 30px 0;">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 活动封面 -->
                <el-row>
                    <el-form-item label="封面" required style="position:relative;">
                        <el-col :span="14">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadImage">
                                <img v-if="img" :src="img" class="cover">
                                <i v-else class="el-icon-plus cover-uploader-icon"></i>
                            </el-upload>
                            <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 上传 -->
                <el-row>
                    <el-form-item label="附件" required>
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="form.fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="upload-btn"><i class="icon-btn-add-circle"></i> 本地上传</span>
                                <span slot="tip" class="upload-tip">请上传视频文件,文件大小在{{standardFileSize}}M以内(暂仅支持mp4格式)</span>
                            </el-upload>
                        </el-col>
                        <div style="position:absolute;font-size:12px;bottom:-27px;color:#d00;" v-if="noFile">
                            请选择视频文件
                        </div>
                    </el-form-item>
                </el-row>
                <!-- 名称 -->
                <el-row>
                    <el-form-item label="名称" prop="name">
                        <el-col :span="11">
                            <el-input placeholder="自动生成，可修改" :maxlength="100" v-model="form.name"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 分类 -->
                   <el-row>
                       <el-form-item label="分类" prop="type">
                           <el-col :span="11">
                               <el-select v-model="form.type" placeholder="请选择微课分类">
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                          </el-select>
                           </el-col>
                       </el-form-item>
                   </el-row>
                   <!-- 资源简介 -->
                <el-row>
                    <el-form-item label="简介" prop='introduction'>
                        <el-col :span="23">
                            <el-input v-model="form.introduction" type="textarea" :maxlength="500" :rows="5" resize="none"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click.prevent="cancelPublish">取消</a>
            <a class="reply_btn reply_btn1" @click.prevent="submit">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import search from 'Common/search.vue'
    import { addStudioClassroom, modifyStudioClassroom, requestMicroClassDetail } from '@/service/studio.js'

    export default {
        name: 'publish_microCourse',
        mixins: [uploadFileSize],
        components: {
            'v-search': search
        },
        data() {
            return {
                showPopover: false,
                // 上传文件方法挂载
                form: {
                    name: '',
                    fileList: [],
                    type: '',
                    introduction: '',
                    intrText: '',
                    cover: '',
                },
                img: '',
                rules: {
                    name: [
                        { required: true, message: '请输入微课名称', trigger: 'blur' },
                        { max: 100, message: '不超过100字符', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择微课类型', trigger: 'change' }
                    ],
                    introduction: [
                        { required: true, message: '请输入微课简介', trigger: 'change' }
                    ]
                },
                noFile: false,
                isTooMuch: false,
                studioId: ''
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            id: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapState('studio', {
                typeList(state) {
                    const list = state.typeList || []
                    return list
                }
            })
        },
        watch: {
            'visible.show': {
                handler: function (val) {
                    if (val) {
                        if (this.id !== '') {
                            this.getClassroomDetail(this.id)
                        }
                    }
                },
                deep: true
            },
            'form.fileList': {
                handler: function (val) {
                    if (val.length > 0) {
                        this.noFile = false
                        this.form.name = val[0].name
                    } else {
                        this.noFile = true
                        this.form.name = ''
                    }
                },
                deep: true
            }
        },
        created() {
            this.studioId = this.$route.query.id
        },
        methods: {
            // 获取微课详情
            getClassroomDetail(id) {
                requestMicroClassDetail({ id: id }).then((res) => {
                    if (res.data.code === 200) {
                        const _detail = res.data.entity
                        const _form = this.form
                        _form.name = _detail.name
                        _form.type = _detail.type
                        _form.introduction = _detail.introduction
                        _form.fileList.push({ name: _detail.name, url: _detail.resourceId, status: 'finished' })
                        _form.cover = _detail.cover
                        this.img = this.getFileUrl(_detail.cover)
                    }
                })
            },
            // 上传文件
            UploadImage(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.cover = res.appendInfo.resourceId
                            _this.img = _this.getFileUrl(res.appendInfo.resourceId)
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
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
                    _this.img = null
                    uploader.cancelFile(file)
                }
            },
            UploadFile(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(mp4)$/i.test(expandName) && (fileSize < _this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.fileList = [{ name: file.name, url: res.appendInfo.resourceId }]
                        }
                    })
                } else {
                    _this.form.fileList.splice(_this.form.fileList.length, 1)
                    if (!/(mp4)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的视频' })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.standardFileSize}M`
                        })
                    }
                    uploader.cancelFile(file)
                }
            },
            handleRemove(file, fileList) {
                this.form.fileList = fileList
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid && !this.noFile && !this.isTooMuch) {
                        const _form = this.form
                        const params = {
                            type: _form.type,
                            studioId: this.studioId,
                            name: _form.name,
                            introduction: _form.introduction,
                            resourceId: _form.fileList[0].url,
                            cover: _form.cover
                        }
                        if (this.id === '') {
                            addStudioClassroom(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '发布成功')
                                    this.$refs.form.resetFields()
                                    this.form.fileList = []
                                    this.visible.show = false
                                    this.img = ''
                                    this.form.cover = ''
                                    this.$emit('callback')
                                }
                            })
                        } else {
                            this.$set(params, 'id', this.id)
                            modifyStudioClassroom(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '修改成功')
                                    this.$refs.form.resetFields()
                                    this.form.fileList = []
                                    this.img = ''
                                    this.form.cover = ''
                                    this.visible.show = false
                                    this.$emit('callback')
                                }
                            })
                        }
                    }
                })
            },
            cancelPublish() {
                this.visible.show = false
                this.$refs.form.resetFields()
                this.form.fileList = []
                this.noFile = false
            },
            // 关闭弹窗
            close() {
                this.$emit('resetId')
                this.$refs.form.resetFields()
                this.form.fileList = []
                this.img = ''
                this.noFile = false
                this.visible.show = false
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
    /* 封面上传 */
    .cover-uploader{
          border: 1px dashed nth($default-color, 2);
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          height: 100px;
          width: 100px;
          background-color: nth($default-color, 3);
    }
    .tips {
        height: 100px;
        line-height: 100px;
        margin-left: 20px;
    }
    .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
    }
    .cover {
          width: 100px;
          height: 100px;
          display: block;
    }
</style>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
    #publish_microCourse{
        .el-dialog{
            min-width: 954px;
        }
        .el-select {
            width: 100%;
        }
    }
</style>