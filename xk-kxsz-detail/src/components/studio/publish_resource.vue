<template>
    <el-dialog :visible.sync="visible.show" id="publish_resource" title="发布资源" class="dialog" @close="close" lock-scroll>
        <!-- <header class="header">发布资源</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 上传 -->
                <el-row>
                    <el-form-item label="附件" required style="margin-bottom:40px;">
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="form.fileList" :on-remove="handleRemove" :before-upload="UploadFile"> </el-upload>
                            <el-popover
                                ref="popover"
                                placement="right"
                                width="600"
                                v-model="showPopover" class="res-pop">
                                <div class="pop-content clearfix">
                                    <header class="head-tit">个人资源库</header>
                                    <div class="res-search clearfix">
                                        <v-search class="fr" @search="setKeyWords"></v-search>
                                    </div>
                                    <section class="table-box">
                                        <el-table
                                            ref="singleTable"
                                            highlight-current-row
                                            :data="datas"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @current-change="handleCurrentChange">
                                            <el-table-column label="资源名称" show-overflow-tooltip>
                                                <template slot-scope="scope"><span class="res-name">{{scope.row.name}}</span></template>
                                            </el-table-column>
                                            <el-table-column prop="resourceTypeName" label="资源分类" width="140">
                                            </el-table-column>
                                            <el-table-column prop="createTime" label="上传时间" width="120">
                                                <template slot-scope="scope">
                                                    {{scope.row.createTime | dateFormat('yyyy-MM-dd')}}
                                                </template>
                                            </el-table-column>
                                             <el-table-column prop="fileSize" label="大小" width="120">
                                                <template slot-scope="scope">
                                                    {{scope.row.fileSize}}KB
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </section>
                                    <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
                                </div>
                                <div class="pop-btn-group btm-btn clearfix">
                                    <a class="cancel-btn" @click="cancelSelect">取消</a>
                                    <a class="confirm-btn" @click="confirmSelect">确定</a>
                                </div>
                            </el-popover>
                            <span class="upload-btn" v-popover:popover><i class="icon-btn-add-circle"></i> 个人资源库</span>
                        </el-col>
                        <div style="position:absolute;font-size:12px;bottom:-27px;color:#d00;" v-if="noFile">
                            请选择附件
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
                            <el-select v-model="form.type" placeholder="请选择资源分类">
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
                    <el-form-item label="简介" prop='introduction' style="position:relative;">
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
    import pagination from 'Common/pagination.vue'
    import { fileUpload } from '@/js/common-config.js'
    import { requestResourceList } from '@/service/resource.js'
    import { publishResource, requestResShareDetail, modifyStudioResource } from '@/service/studio.js'

    export default {
        name: 'publish_resource',
        mixins: [uploadFileSize],
        components: {
            'v-search': search,
            'v-pagination': pagination
        },
        data() {
            return {
                showPopover: false,
                // 上传文件方法挂载
                fileUpload: fileUpload,
                name: '',        // 搜索个人资源关键词
                datas: [],
                currentRow: null,
                form: {
                    name: '',
                    fileList: [],
                    type: '',
                    introduction: ''
                },
                resource: null,
                rules: {
                    name: [
                        { required: true, message: '请输入资源名称', trigger: 'blur' },
                        { max: 100, message: '不超过100字符', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择资源分类', trigger: 'change' }
                    ],
                    introduction: [
                        { required: true, message: '请输入资源简介', trigger: 'change' }
                    ]
                },
                noFile: false,
                isTooMuch: false,
                studioId: '',
                pageParams: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                }
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
                        this.getPersonRes()
                        if (this.id !== '') {
                            this.getResourceDetail(this.id)
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
        mounted() {
            const fileElement = this.$el.querySelectorAll('[type="file"]')
            for (let i = 0; i < fileElement.length; i++) {
                fileElement[i].setAttribute('disabled', 'disabled')
            }
        },
        methods: {
            // 页数改变
            changePage(val) {
                this.pageParams.pageNum = val
                this.getPersonRes()
            },
            // 获取资源详情
            getResourceDetail(id) {
                requestResShareDetail({ id: id }).then((res) => {
                    if (res.data.code === 200) {
                        const _detail = res.data.entity
                        const _form = this.form
                        _form.name = _detail.name
                        _form.type = _detail.type
                        _form.introduction = _detail.introduction
                        _form.fileList.push({ name: _detail.name, url: _detail.resourceId, status: 'finished' })
                    }
                })
            },
            // 设置关键词
            setKeyWords(str) {
                this.name = str
                this.getPersonRes()
            },
            // 上传文件
            UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.fileList = []
                            _this.fileList.push({ name: file.name, url: res.appendInfo.resourceId, status: 'finished' })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            },
            handleRemove(file, fileList) {
                this.form.fileList = fileList
            },
            // 获取个人资源库
            getPersonRes() {
                requestResourceList({ auditStatus: 1, name: this.name }, this.pageParams).then((res) => {
                    if (res.data.code === 200) {
                        this.pageParams.totalNum = res.data.entity.totalNum
                        this.datas = res.data.entity.resultData
                    }
                })
            },
            // 选择个人资源库
            handleCurrentChange(val) {
                this.resource = val
            },
            // 个人资源库取消选择
            removePersonRes(row) {
                this.$refs.singleTable.setCurrentRow(row)
            },
            // 取消选择
            cancelSelect() {
                this.showPopover = false
                this.$refs.singleTable.setCurrentRow()
            },
            // 确认选择
            confirmSelect() {
                this.form.fileList = []
                this.showPopover = false
                if (this.resource !== undefined) {
                    const res = this.resource
                    this.form.fileList.push({ name: res.name, url: res.fileId, status: 'finished' })
                }
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
                            resourceId: _form.fileList[0].url
                        }
                        if (this.id === '') {
                            publishResource(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '发布成功')
                                    this.$refs.form.resetFields()
                                    this.form.fileList = []
                                    this.visible.show = false
                                    this.$emit('callback')
                                }
                            })
                        } else {
                            this.$set(params, 'id', this.id)
                            modifyStudioResource(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '修改成功')
                                    this.$refs.form.resetFields()
                                    this.form.fileList = []
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
            },
            // 关闭弹窗
            close() {
                this.visible.show = false
                this.$emit('resetId')
                this.$refs.form.resetFields()
                this.form.fileList = []
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/subject_dialog.scss';
.head-tit {
    font-size: 16px;
    padding: 0 10px 15px;
}
.res-search {
    margin-bottom: 10px;
}
</style>

<style lang='scss'>
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/vars.scss';
    #publish_resource{
        .el-dialog{
            min-width: 954px;
            .upload-demo{
                position: relative;
                .el-upload{
                    float: left;
                }
                .el-upload-list{
                    position: absolute;
                    top: 30px;
                    left: 0;
                }
            }
        }
        .el-select {
            width: 100%;
        }
    }
    .pop-btn-group{
        text-align: right;
        padding-right: 20px;
        a{
            box-sizing:border-box;
            border-radius: 3px;
        }
        .cancel-btn{
            border:1px solid nth($default-color, 1);
            padding: 4px 14px;
            color: nth($default-color, 1);
            margin-right: 10px;
            &:hover {
                color: #fff;
                background-color: $theme-color;
            }
        }
        .confirm-btn{
            background-color: nth($default-color, 1);
            padding: 5px 15px;
            color: #fff;
            &:hover{
                opacity: 0.75;
            }
        }
    }
</style>