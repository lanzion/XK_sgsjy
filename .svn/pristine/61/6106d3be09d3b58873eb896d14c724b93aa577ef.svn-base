<template>
    <div class="release-info admin_project_publish projectPublish">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-col :span="13">
                    <el-input v-model="form.title" placeholder="请输入资讯标题，最多30字" :maxlength="30"/>
                </el-col>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-col :span="20">
                    <el-upload action :show-file-list="false" class="cover-uploader fl" :before-upload="UploadFile">
                        <img v-if="form.cover" :src="getFileUrl(form.cover)" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
            </el-form-item>
            <el-form-item label="资讯内容" prop="content">
                <el-col :span="23">
                    <div id="editor-trigger" style="height: 200px"></div>
                </el-col>
            </el-form-item>
        </el-form>

        <div class="btn-row">
            <button @click.prevent="submit" class="btn-release btn">发布</button>
            <button @click.prevent="$router.push('/admin/info')" class="btn i-form-button is-plain">取消</button>
        </div>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { editInfo, addInfo, queryDetail } from '@/service/information.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'

    export default {
        name: 'releaseInformation', // 后台，发布/修改资讯
        mixins: [uploadFileSize, editor],
        data () {
            return {
                curEditingId: '',
                form: {
                    content: '',
                    cover: '',
                    title: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入资讯标题', trigger: 'change'}
                    ],

                    cover: [
                        {required: true, message: '请上传封面', trigger: 'change'}
                    ],

                    content: [
                        {required: true, message: '请输入资讯内容', trigger: 'change'}
                    ],
                },
            }
        },

        mounted () {
            let self = this
            this.initEditor()
            const {id} = this.$route.query
            this.curEditingId = id
            this.editor.onchange = function () {
                self.form.content = this.$txt.html()
            }
        },

        methods: {
            async queryDetail (editor) {
                const res = await queryDetail({id: this.curEditingId})

                if (res.status === 200 && res.data.code === 200) {
                    const {content, cover, title} = res.data.entity || {}
                    this.form = {content, cover, title}
                    editor.$txt.html(content)
                }
            },
            UploadFile (file, fileList) {
                    const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                    if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                            if (res.code === 200) {
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
            // 添加/修改
            submit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        const {curEditingId} = this
                        const handler = curEditingId && editInfo || addInfo
                        const id = curEditingId || undefined
                        const label = curEditingId && '修改' || '发布'
                        const errMsg = `${label}资讯失败，请稍后重试`

                        handler({
                            id,
                            ...this.form,
                        }).then(res => {
                            if (res.status === 200 && res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: `成功${label}资讯`,
                                    duration: 1000,
                                    onClose: () => {
                                        this.$router.push('/admin/info')
                                    }
                                })

                                return
                            }

                            this.$message.error(res.data.msg || errMsg)
                        }).catch(() => {
                            this.$message.error(errMsg)
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~@/asset/scss/admin_projectForm.scss";

    .release-info {
        min-height: 820px;
        .btn-row {
            padding-left: 100px;
        }
        .btn {
            box-sizing: border-box;
            width: 92px;
            height: 32px;
            line-height: 32px;
            margin-right: 20px;
            text-align: center;
            color: #d00;
            border: 1px solid #d00;
            padding: 0;
            &.btn-release {
                color: #fff;
                background-color: #d00;
            }
        }
    }
</style>

