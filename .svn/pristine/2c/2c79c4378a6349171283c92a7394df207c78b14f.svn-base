<template>
    <div class="admin_infoPublish backend-content__middle">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <!-- 资讯标题 -->
            <el-row>
                <el-form-item label="资讯标题" prop="title">
                    <el-col :span="8">
                        <el-input placeholder="请输入资讯标题" v-model="form.title" :maxlength="50"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 资讯封面 -->
            <el-row>
                <el-form-item label="资讯封面" prop="pic">
                    <el-col :span="14">
                        <el-upload class="cover-uploader" :show-file-list="false" action :before-upload="UploadCover" style="display: inline-block;">
                            <img v-if="form.pic&&form.pic!=''" :src="getFileUrl(form.pic)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-form-item>
            </el-row>
            <!-- 资讯分类 -->
            <el-row>
                <el-form-item label="资讯分类" prop="noticeTypeId">
                    <el-col :span="8">
                        <el-select v-model="form.noticeTypeId" placeholder="请选择分类" style="width:100%;">
                            <el-option
                                v-for="item in noticeType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="资讯内容" prop="content">
                    <el-col :span="20">
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="14">
                        <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
                        </el-upload>
                        <div style="font-size:12px;color:#ff4949;" v-if="rules.fileSizeBig">
                            文件大于{{ standardFileSize }}M
                        </div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="bs-search-button i-form-button" @click="onSubmit('form')" type="button">{{ form.id?'保存':'发布'}}</button>
                <button class="bs-search-button i-form-button is-plain" @click="$router.go(-1)" type="button">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import { fileUpload } from 'Asset/js/common-config.js'
    import { addInfo, requestInfoDetail, modifyInfo } from '@/service/admin_space.js'
    // import dataTranslation from 'Asset/js/dataTranslation.js'

    export default {
        name:'addInfo',
        mixins: [uploadFileSize, editor],
        data () {
            return {
                fileUpload: fileUpload,
                noticeType: [],
                form: {
                    title: '',
                    pic: null,
                    noticeTypeId: null,
                    content: '',
                    portalNoticeDetailResources: []
                },
                rules: {
                    title: [
                        { required: true, message: '请输入资讯标题', trigger: 'change' }
                    ],
                    pic: [
                        { message: '请选择资讯封面', trigger: 'change' },
                    ],
                    noticeTypeId: [
                        { required: true, message: '请选择资讯分类', trigger: 'change' },
                    ],
                    content: [
                        { required: true, message: '请输入内容'}
                        // { max: 1000, message: '不超过1000字符' }
                    ]
                },
                img: ''
            }
        },
        computed: {
            fileList: function() {
                let _list = []
                let fileList = this.form.portalNoticeDetailResources || []
                fileList.forEach(x => {
                    _list.push({
                        name: x.resourceName,
                        url: this.getFileUrl(x.resourceId, {filetype: 'file'}),
                        status: 'finished'
                    })
                })
                return _list
            }
        },
        mounted () {
            this.initEditor()
            let self = this
            this.editor.onchange = function () {
                self.form.content = this.$txt.html()
            }
            this.getDictComb("noticeType").then(res => {
                this.noticeType = res.dicList
            })
            let _id = this.$route.query.id
            if(_id != undefined) {
                this.$set(this.$data.form, 'id', _id)
                this.getInfoDetail()
            }
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            handleRemove(file, fileList) {
                let _list = []
                fileList.forEach(x => {
                    _list.push({
                        resourceName: x.name,
                        resourceId: x.url
                    })
                })
                this.form.portalNoticeDetailResources = _list
            },
            UploadCover (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                            if (res.code === 200) {
                                _this.form.pic = res.appendInfo.resourceId
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
                    _this.form.pic = null
                    uploader.cancelFile(file)
                }
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                        _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.form.portalNoticeDetailResources.push({resourceName: file.name, resourceId: res.appendInfo.resourceId })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.form.portalNoticeDetailResources.splice(_this.form.portalNoticeDetailResources.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                    uploader.cancelFile(file)
                }
            },
            // 获取资讯详情
            getInfoDetail() {
                requestInfoDetail({id: this.form.id}).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _portalNoticeDetailResource = []
                        _data.portalNoticeDetailResource.forEach(x => {
                            _portalNoticeDetailResource.push({resourceName: x.resourceName, resourceId: x.resourceId})
                        })
                        let _form = {
                            id: _data.id,
                            title: _data.title,
                            noticeTypeId: _data.noticeTypeId,
                            pic: _data.pic,
                            content: _data.content,
                            portalNoticeDetailResources: _portalNoticeDetailResource
                        }
                        this.form = _form
                        this.editor.$txt.html(_data.content)
                    }
                })
            },
            // 获取select的options
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.id) {
                            // 修改资讯
                            modifyInfo(this.form).then(response => {
                                if (response.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.$router.push( { path: '/space/info' } )
                                } else {
                                    this.$message.error(response.data.msg);
                                }
                            })
                        } else {
                            // 添加资讯
                            addInfo(this.form).then(response => {
                                if(response.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '发布成功',
                                        type: 'success'
                                    });
                                    this.$router.push( { path: '/space/info' } )
                                } else {
                                    this.$message.error(response.data.msg);
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
.admin_infoPublish{
    min-height: 820px;
}
</style>

<style lang='scss'>
.admin_infoPublish{
    /* 编辑器高度 */
    .wangEditor-container .wangEditor-txt{
        height: 200px!important;
    }
}
</style>