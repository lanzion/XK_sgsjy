<template>
    <div class="final-evaluation" style="padding-bottom: 26px;">
        <el-table :data="items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
            <el-table-column prop="pname" label="一级指标" width="220"/>
            <el-table-column prop="name" label="二级指标"/>
            <el-table-column prop="evaluationPoint" label="测评点" width="400">
                <template scope="scope">
                    <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="评分"/>
        </el-table>
        <div class="el-table data-table back-stage-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;border-top: 0;">
            <div class="el-table__body-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                    <tbody>
                    <tr>
                        <td class="table-label">
                            <div class="cell">评价等级</div>
                        </td>
                        <td class="">
                            <div class="cell table-content red">A</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-label">
                            <div class="cell">评语</div>
                        </td>
                        <td class="">
                            <el-input class="cell table-content" placeholder="请输入评语"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-label">
                            <div class="cell">附件</div>
                        </td>
                        <td class="">
                            <p class="cell table-content">
                                <el-upload action :before-upload="UploadFile" :file-list="fileList" :on-remove="deleteItem" class="cover-uploader">
                                    <i class="icon-btn-add-circle cover-uploader-icon">上传文件</i>
                                </el-upload>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="btn-row">
            <button @click="submit" class="bs-handle-button i-form-button">发表</button>
            <button @click="$router.push('/cqe/record')" class="bs-handle-button i-form-button is-plain">取消</button>
        </div>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { requestLevelOneQuota, deleteQuota } from '@/service/admin_evaluation.js'

    export default {
        name: 'myEvaluation', // 评价记录详情-->自评
        mixins: [uploadFileSize],
        data () {
            return {
                fileList: [], // 资源文件列表
            }
        },
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            deleteItem (file, fileList) {
                let e = window.event || event
                e.stopPropagation()
                this.fileList = fileList
            },
            handleEvaluationPoint (txt) {
                return !txt ? '' : txt.replace(/\n/g, '</br>')
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                        _this = this
                if(fileSize < (_this.standardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.fileList.splice(0, 1, {
                                name: file.name,
                                resourceId: res.appendInfo.resourceId,
                                resourceName: file.name
                            })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                            _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                    uploader.cancelFile(file)
                }
            }
        }
    }
</script>
<style lang="scss">
    .final-evaluation, .my-evaluation {
        .el-input__inner {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
        }
        .btn-row {
            margin-top: 20px;
            text-align: center;
            .bs-handle-button {
                width: 70px;
                font-size: 12px;
            }
        }
        .cover-uploader {
            height: 26px;
            .el-upload {
                box-sizing: border-box;
                float: left;
                width: 64px;
                height: 100%;
                line-height: 24px;
                border: 1px solid #0594e8;
                text-align: center;
                padding: 0;
            }
            .el-upload-list {
                float: left;
                height: 100%;
                width: 40%;
                margin-left: 20px;
                .el-upload-list__item:first-child {
                    margin-top: 0;
                }
                .el-icon-close {
                    position: absolute;
                    right: 10px;
                    top: 6px;
                }
            }
            .cover-uploader-icon {
                margin: 0;
                font-size: 12px;
                color: #0594e8;
                &:before {
                    content: ''
                }
            }
        }
    }
</style>
