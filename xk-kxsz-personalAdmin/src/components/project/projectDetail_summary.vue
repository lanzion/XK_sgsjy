<template>
    <section class="projectDetailSummary dpd15" id="summary">
        <el-row>
            <el-col :span="2" style="text-align:center;">
                <span class="title">总结:</span>
            </el-col>
            <el-col :span="22">
                <el-input type="textarea" v-model="content" placeholder="请输入项目内容，不超过1000字" resize="none" :rows="5" :disabled="ifDisabled" v-if="projectDetail.createId === $ls.get('loginUId')"></el-input>
                <div v-else class="text">
                    <!-- {{projectDetail.createId}} -->
                    {{content ? content : '暂无'}}
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
                <el-col :span="2" style="text-align:center;">
                    <span class="title">附件:</span>
                </el-col>
                <el-col :span="22">
                    <el-upload class="upload-demo" action :file-list="fileList" :disabled="ifDisabled" :on-remove="handleRemove" :before-upload="UploadFile" v-if="projectDetail.createId === $ls.get('loginUId')">
                        <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                        <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{standardFileSize}}M以内</span>
                    </el-upload>
                    <ul class="attList" v-else-if="fileList.length && projectDetail.createId !== $ls.get('loginUId')">
                        <li v-for="(i, k)  in fileList" class="attList_li"> <a :href="downloadUrl(i.resourceId, i.name)" :download="i.name" class="btn" title="下载">{{ i.name }} </a></li>
                    </ul>
                    <div v-else class="text">
                        暂无
                    </div>
                </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
        <div class="buttonGroup clearfix" v-if="!ifDisabled && (projectDetail.createId === $ls.get('loginUId'))">
            <a class="psn-cancel-btn" @click="cancel">取消</a>
            <a class="psn-confirm-btn" @click="send">确定</a>
        </div>
        </el-row>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
// import tabs from 'Common/classificationList/classification/tabs.vue'
// import { fileUpload } from 'Asset/js/common-config.js'
// import { beforeUploadFile } from 'Asset/js/uploadFile.js'
import { adminProjectConclusionAdd, adminProjectSummaryDetail } from '@/service/project.js'
import { mapState } from 'vuex'

export default {
    name: 'projectDetailSummary',
    mixins: [uploadFileSize],
    data() {
        return {
            content: '',
            fileList: [],
            // fileUpload: fileUpload,
            ifDisabled: false
        }
    },
    mounted() {
        adminProjectSummaryDetail({ projectId: this.$route.query.id }).then((res) => {
            const data = res.data.entity
            if (data) {
                this.ifDisabled = true
                this.content = data.content
                for (let i = 0, resourcesLength = data.resources.length; i < resourcesLength; i++) {
                    this.fileList.push({ name: data.resources[i].name, status: 'finished' })
                }
            }
        })
    },
    methods: {
        UploadFile(file) {
            const fileSize = file.size
            const _this = this
            if (fileSize < (this.standardFileSize * 1024 * 1024)) {
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
        send() {
            if (this.projectDetail.status !== 7) {
                this.$message({ message: '请在项目所有阶段完成后进行总结' })
                return
            }
            const resourceList = []
            for (const i in this.fileList) {
                resourceList.push({
                    name: this.fileList[i].name,
                    resourceId: this.fileList[i].url
                })
            }
            adminProjectConclusionAdd({
                projectId: this.$route.query.id,
                content: this.content,
                resources: resourceList
            }).then((res) => {
                if (res.data.code === 200) {
                    this.ifDisabled = true
                    this.content = ''
                    this.$message({
                        message: '发布成功',
                        type: 'success'
                    })
                }
            })
        },
        // 取消
        cancel() {
            this.content = ''
            this.fileList = []
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        }
    },
    computed: mapState({
        projectDetail: state => state.project.detail
    }),
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .link-to-detail {
            &:hover {
                color: $color-value;
            }
        }
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover {
                    color: #fff;
                }
            }
        }
    }
}
.projectDetailSummary {
    .title {
        font-size: 14px;
        margin-top: 10px;
        height: 20px;
        line-height: 20px;
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
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
        }
    }
    .attList {
        font-size: 14px;
        .attList_li {
            padding: 5px 0;
            a {
                color: #0391D9;
            }
        }
    }
    .text {
        line-height: 20px;
        font-size: 14px;
    }
}
</style>
