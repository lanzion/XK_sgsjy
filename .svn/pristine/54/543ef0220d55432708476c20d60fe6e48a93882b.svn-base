<template>
    <section id="projectDetailShare" class="dpd15">
        <div class="btn-row">
            <button @click="dialog = true" class="btn-upload">上传资源</button>
        </div>
        <el-table class="data-table" :data="resourceList" style="width: 100%;">
            <el-table-column prop="name" label="资源名称" align="center"></el-table-column>
            <el-table-column prop="userName" label="上传人" width="120" align="center"></el-table-column>
            <el-table-column prop="fileSize" label="上传时间" width="240" align="center">
                <template slot-scope="scope">{{ scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center" style="overflow:visible;">
                <template slot-scope="scope">
                <operate @on-delete="delResource(scope.row.id)" style="width: 100%;" :icon-group="projectDetail.createId === $ls.get('loginUId') ? ['delete', 'download'] : ['download']" :download-resource="{id: scope.row.resourceId, name: scope.row.name}" label="资源"></operate>
                </template>
            </el-table-column>
         </el-table>
        <pagination :param="pageParam" :change-page="getData"></pagination>
        <el-dialog class="detailsOnStage" title="上传资源" :visible.sync="dialog" size="tiny">
            <div class="box">
                <el-row>
                    <el-col :span="4">
                        <strong style="display:inline-block;height:38px;line-height:38px;">资&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源:</strong>&nbsp;
                    </el-col>
                    <el-col :span="20">
                        <el-upload action :file-list="fileList" :before-upload="UploadFile" :on-remove="handleRemove" class="mb15">
                          <span class="upload-btn">
                            <i class="icon-btn-add-circle"></i> 选择文件</span>
                            <span slot="tip" class="upload-tip">上传文件在{{standardFileSize}}M以内</span>
                        </el-upload>
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
                                    <pagination :param="pageParams" :changePage="changePage"></pagination>
                                </div>
                            </el-popover>
                            <span class="upload-btn" v-popover:popover><i class="icon-btn-add-circle"></i> 个人资源库</span>
                            <ul class="el-upload-list el-upload-list--text" v-for="(item,index) in fileList2">
                                <li class="el-upload-list__item is-success">
                                    <a class="el-upload-list__item-name">
                                        <i class="el-icon-document"></i>
                                        {{item.name}}
                                    </a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-circle-check"></i>
                                    </label>
                                </li>
                            </ul>
                    </el-col>
                </el-row>
                <div class="buttonGroup clearfix">
                    <a class="reply_btn reply_btn2" @click="dialog = false">取消</a>
                     <a class="reply_btn reply_btn1" @click="sendResults">确定</a>
                </div>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { adminProjectResourceGetList, deleteResource, uploadResource } from '@/service/project.js'
import operate from 'Common/operate.vue'
import pagination from 'Common/pagination.vue'
// import { beforeUploadFile, delUploadMsg } from 'Asset/js/uploadFile.js'
import search from 'Common/search.vue'
import { requestResourceList } from '@/service/resource.js'

export default {
    name: 'projectDetailShare',
    mixins: [uploadFileSize],
    data() {
        return {
            dialog: false,
            pageParam: {
                pageSize: 8,
                pageNum: 1,
                totalNum: 1
            },
            resourceList: [],
            showDelBtn: false,
            fileList: [],
            showPopover: false,
            fileList2: [],
            datas: [],
            pageParams: {
                totalNum: 0,
                pageSize: 10,
                pageNum: 1
            },
        }
    },
    props: {
        projectDetail: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        operate,
        pagination,
        'v-search': search,
    },
    created() {
        this.getData()
        this.getPersonRes()
    },
    methods: {
        // 获取个人资源库
        getPersonRes() {
            requestResourceList({ auditStatus: 1 }, this.pageParams).then((res) => {
                if (res.data.code === 200) {
                    this.datas = res.data.entity.resultData
                    this.pageParams.totalNum = res.data.entity.totalNum
                }
            })
        },
        changePage(val) {
            this.pageParams.pageNum = val
            this.getPersonRes()
        },
        // 选择个人资源库
        handleSelectionChange(val) {
            this.fileList2 = val
        },
        /* 设置关键词 */
        setKeyWords(str) {
            this.name = str
        },
        UploadFile(file) {
            const fileSize = file.size
            const _this = this
            if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                    if (res.code === 200) {
                        _this.fileList.push({ name: files.name, url: res.appendInfo.resourceId, status: 'finished' })
                    }
                })
                uploader.off('uploadError').on('uploadError', function (files, reason) {
                    _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                })
            } else {
                _this.fileList.splice(_this.fileList.length, 1)
                _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                uploader.cancelFile(file)
            }
        },
        // 获取资源列表
        getData() {
            adminProjectResourceGetList({ busId: this.$route.query.id, resourceType: '4' }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const _entity = res.data.entity
                    this.resourceList = _entity.resultData || []
                    this.pageParam.totalNum = _entity.totalNum
                }
            })
        },
        delResource(id) { // 删除共享资源
            deleteResource({ id }).then((res) => {
                if (res.data.code === 200) {
                    this.$message({
                        message: '成功删除资源',
                        type: 'success'
                    })
                    this.getData()
                }
            })
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        sendResults() {
            const fileList2 = this.fileList2.map(i => ({
                name: i.name,
                resourceId: i.fileId,
                busId: this.$route.query.id,
                resourceType: '7'
            }))
            const fileList = this.fileList.map(i => ({
                name: i.name,
                resourceId: i.url,
                busId: this.$route.query.id,
                resourceType: '7'
            }))
            const data = [...fileList, ...fileList2]
            uploadResource(data).then((res) => {
                if (res.data.code === 200) {
                    this.getData()
                    this.dialog = false
                    this.fileList = []
                    this.fileList2 = []
                    this.$message({
                        message: '成果上传成功',
                        type: 'success'
                    })
                } else {
                    this.$message({ message: '请选择上传文件' })
                }
            })
        }
    }
}
</script>

<style lang='scss'>
#projectDetailShare {
    .el-table__body-wrapper {
        overflow: visible !important;
    }
}
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #projectDetailShare .btn-upload {
            background-color: $color-value;
        }
      /* .buttonGroup { */
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value !important;
                color: $color-value;
            }
        /* } */
    }
}
.mb15 {
    margin-bottom: 15px;
}

#projectDetailShare {
    .btn-row {
      margin-bottom: 10px;
      text-align: right;
      .btn-upload {
        box-sizing: border-box;
        width: 90px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        padding: 0;
        border-radius: $button-radiu;
        &:hover {
            opacity: 0.75;
        }
      }
    }
    .el-table {
      overflow: visible;
    }
    .detailsOnStage {
        .header {
            height: 54px;
            line-height: 54px;
            text-indent: 1em;
            border-bottom: 1px solid #D7D7D7;
            font-size: 16px;
            font-weight: bold;
        }
        .box {
            padding: 30px 60px;
            box-sizing: border-box;
        }
    }
    .upload-btn{
        width: 96px;
        height: 38px;
        line-height: 38px;
        border:1px solid #ccc;
        padding: 8px;
        margin-right: 15px;
        i{
            font-size: 14px;
            color: $theme_color;
        }
    }
    .buttonGroup {
        margin-top: 20px;
        height: 30px;
        text-align: right;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
        }
        .reply_btn1 {
            color: #fff;
            &:hover{
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
            &:hover{
                color: #fff;
            }
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
}
</style>
