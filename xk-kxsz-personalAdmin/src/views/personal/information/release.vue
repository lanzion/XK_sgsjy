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
                    <el-upload action :show-file-list="false" class="psn-cover-uploader fl" :before-upload="UploadFile">
                        <img v-if="form.cover" :src="getFileUrl(form.cover)" class="psn-cover">
                        <i v-else class="el-icon-plus psn-cover-uploader-icon"></i>
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
            <button @click.prevent="submit" class="psn-confirm-btn">发布</button>
            <button @click.prevent="$router.push('/admin/info')" class="psn-cancel-btn">取消</button>
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
        data() {
            return {
                curEditingId: '',
                form: {
                    content: '',
                    cover: '',
                    title: '',
                },
                rules: {
                    title: [
                        { required: true, message: '请输入资讯标题', trigger: 'change' }
                    ],

                    cover: [
                        { required: true, message: '请上传封面', trigger: 'change' }
                    ],

                    content: [
                        { required: true, message: '请输入资讯内容', trigger: 'change' }
                    ],
                },
            }
        },

        mounted() {
            const self = this
            this.initEditor()
            const { id } = this.$route.query
            this.curEditingId = id
            this.editor.onchange = function () {
                self.form.content = this.$txt.html()
            }
        },

        methods: {
            async queryDetail() {
                const res = await queryDetail({ id: this.curEditingId })

                if (res.status === 200 && res.data.code === 200) {
                    const { content, cover, title } = res.data.entity || {}
                    this.form = { content, cover, title }
                    this.editor.$txt.html(content)
                }
            },
            UploadFile(file) {
                    const fileSize = file.size
                    const fileName = file.name
                    const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                    const _this = this
                    if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.cover = res.appendInfo.resourceId
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
                        uploader.cancelFile(file)
                    }
            },
            // 添加/修改
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const { curEditingId } = this
                        const handler = curEditingId && editInfo || addInfo
                        const id = curEditingId || undefined
                        const label = curEditingId && '修改' || '发布'
                        const errMsg = `${label}资讯失败，请稍后重试`

                        handler({
                            id,
                            ...this.form,
                        }).then((res) => {
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
    @import "~@/assets/css/scss/admin_projectForm.scss";
    @import '~@/assets/css/scss/vars.scss';
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
            color: $theme_color;
            border: 1px solid $theme_color;
            padding: 0;
            &.btn-release {
                color: #fff;
                background-color: $theme_color;
            }
        }
    }
</style>

