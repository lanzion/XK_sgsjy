<template>
    <el-dialog class="upload-result" title="上传成果" :visible.sync="visible.show">
        <!-- <header class="header">上传成果</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-form-item label="附件">
                        <el-col>
                            <el-upload class="upload-demo" action :file-list="form.fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="upload-btn">
                                    <i class="icon-btn-add-circle"></i>
                                    上传文件
                                </span>
                                <span class="tips" style="color:#8391a5;">支持小于{{standardFileSize}}M文件</span>
                            </el-upload>
                        </el-col>
                        <el-col>
                            <el-popover ref="popover" placement="right" width="600" v-model="showPopover" class="res-pop">
                                <div class="pop-content clearfix">
                                    <header class="head-tit">个人资源库</header>
                                    <div class="res-search clearfix">
                                        <v-search class="fr" @search="setKeyWords"></v-search>
                                    </div>
                                    <section class="table-box">
                                        <el-table
                                            ref="multipleTable"
                                            :data="datas"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChange">
                                            <el-table-column type="selection" width="55">
                                            </el-table-column>
                                            <el-table-column label="资源名称" show-overflow-tooltip>
                                                <template slot-scope="scope"><span class="res-name">{{scope.row.name}}</span></template>
                                            </el-table-column>
                                            <el-table-column prop="resourceTypeName" label="资源分类" width="100">
                                            </el-table-column>
                                            <el-table-column prop="createTime" label="上传时间" width="120">
                                                <template slot-scope="scope">
                                                    {{scope.row.createTime | dateFormat('yyyy-MM-dd')}}
                                                </template>
                                            </el-table-column>
                                             <el-table-column prop="fileSize" label="大小" width="120">
                                                <template slot-scope="scope">
                                                    {{scope.row.fileSize}}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </section>
                                    <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
                                </div>
                                <div class="btn-group btm-btn clearfix">
                                    <a class="reply_btn reply_btn2" @click="cancelSelect">取消</a>
                                    <a class="reply_btn reply_btn1" @click="showPopover = false">确定</a>
                                </div>
                            </el-popover>
                            <span class="upload-btn" v-popover:popover><i class="icon-btn-add-circle"></i> 个人资源库</span>
                            <ul class="el-upload-list el-upload-list--text" v-for="(item,index) in form.fileList2">
                                <li class="el-upload-list__item is-success">
                                    <a class="el-upload-list__item-name">
                                        <i class="el-icon-document"></i>
                                        {{item.name}}
                                    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-circle-check"></i>
                                    </label>
                                    <i class="el-icon-close" @click="removePersonRes(index)"></i>
                                </li>
                            </ul>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="uploadResult">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import search from 'Common/search.vue'
    import pagination from 'Common/pagination.vue'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    // import dataTranslation from '@/js/dataTranslation.js'
    // import { beforeUploadFile } from '@/js/uploadFile.js'
    import { addActivityResult } from '@/service/activity.js'
    import { requestResourceList } from '@/service/resource.js'

    export default {
        name: 'upload_result',
        mixins: [uploadFileSize],
        components: {
            'v-search': search,
            'v-pagination': pagination
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            callback: Function
        },
        data() {
            return {
                showPopover: false,
                name: '',
                form: {
                    fileList: [],
                    fileList2: []
                },
                datas: [],
                params: [],
                pageParams: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                }
            }
        },
        mounted() {
            this.getPersonRes()
        },
        methods: {
            // 设置关键词
            setKeyWords(str) {
                this.name = str
            },
            // 上传文件
            UploadFile(file) {
                const fileSize = file.size
                // const fileName = file.name
                // const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.fileList.push({ name: file.name, url: res.appendInfo.resourceId, status: 'finished' })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.form.fileList.splice(_this.form.fileList.length, 1)
                    this.$message({ message: `文件大小不超过${this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            },
            handleRemove(file, fileList) {
                this.form.fileList = fileList
            },
            // 上传成果
            uploadResult() {
                let flag = false
                if (this.form.fileList.length > 0 || this.form.fileList2.length > 0) {
                    for (const i in this.form.fileList) {
                        this.params.push({ activityId: this.$route.query.id, resourceId: this.form.fileList[i].url, name: this.form.fileList[i].name })
                    }
                    for (const i in this.form.fileList2) {
                        this.params.push({ activityId: this.$route.query.id, resourceId: this.form.fileList2[i].fileId, name: this.form.fileList2[i].name })
                    }
                    flag = true
                } else {
                    flag = false
                    this.showMessage('warning', '未选择文件')
                }
                for (let i = 0; i < this.params.length; i++) {
                    if (this.params[i].name.length > 300) {
                        this.showMessage('warning', '上传的资源中存在过长的文件名，资源名称应不超过300个字符')
                        this.params = []
                        return
                    }
                }
                if (flag) {
                    addActivityResult(this.params).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '上传成功')
                            this.form.fileList = []
                            this.form.fileList2 = []
                            this.params = []
                            this.$refs.multipleTable.clearSelection()
                            this.visible.show = false
                            this.callback()
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }
            },
            changePage(val) {
                this.pageParams.pageNum = val
                this.getPersonRes()
            },
            // 获取个人资源库
            getPersonRes() {
                requestResourceList({ auditStatus: 1 }, this.pageParams).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.datas = _data.resultData
                        this.pageParams.totalNum = _data.totalNum
                    }
                })
            },
            // 选择个人资源库
            handleSelectionChange(val) {
                this.form.fileList2 = val
            },
            // 个人资源库取消选择
            removePersonRes(index) {
                this.form.fileList2.splice(index, 1)
                this.$refs.multipleTable.toggleRowSelection(index, false)
            },
            cancelSelect() {
                this.showPopover = false
                this.params = []
                this.$refs.multipleTable.clearSelection()
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
            }
        }
    }
}
*{
    box-sizing:border-box;
}
.upload-result{
    .header {
        height: 54px;
        line-height: 54px;
        text-indent: 1em;
        border-bottom: 1px solid #D7D7D7;
        font-size: 16px;
    }
    .content-box{
        margin: 35px 0 80px;
        padding: 20px;
        .label{
            line-height: 38px;
            margin: 0 18px 0px 40px;
            font-size: 18px;
        }
        .upload-btn{
            width: 96px;
            height: 38px;
            line-height: 38px;
            border:1px solid #ccc;
            padding: 8px;
            margin-right: 15px;
            cursor: pointer;
            i{
                font-size: 14px;
                color: $theme-color;
            }
            &:hover {
                border-color: $theme-color;
                color: $theme-color;
            }
        }
    }
    .buttonGroup {
        text-align: right;
        padding: 0 30px 30px;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
            border-radius: $button-radiu;
        }
        .reply_btn1 {
            color: #fff;
            &:hover {
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
            &:hover{
                color: #fff;
                background-color: $theme-color;
            }
        }
    }
}
</style>

<style lang='scss'>
.upload-result {
    .el-dialog{
        min-width: 475px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .upload-demo{
        margin-bottom: 15px;
    }
    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
        position: absolute;
        top: 5px;
        right: 10px;
    }
}
.pop-content{
    .head-tit{
        padding: 10px 15px;
        background-color: #f6f6f6;
        font-size: 16px;
    }
    .res-search{
        padding: 20px;
    }
    .table-box{
        padding: 20px;
    }
    .res-name{
        color: #00a0e9;
    }
}
.btm-btn{
    margin-bottom: 20px;
}
</style>