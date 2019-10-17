<template>
    <section id="repertoire" class="dpd15">
        <div class="btn-group"></div>
        <el-table class="data-table" :data="stageList" style="width: 100%" :align="'center'">
            <el-table-column prop="name" label="项目阶段" current-row-key="index">
                <template slot-scope="scope">
                    <a class="link-to-detail" @click="perPhasePopup(scope.row.id, scope.$index)" v-text="scope.row.name"></a>
                </template>
            </el-table-column>
            <el-table-column prop="phaseStartTime" label="计划时间" width="240">
                <template slot-scope="scope">{{ scope.row.phaseStartTime | dateFormat('yyyy-MM-dd') }} -- {{ scope.row.phaseEndTime | dateFormat('yyyy-MM-dd') }}</template>
            </el-table-column>
            <el-table-column prop="realityStartTime" label="实际时间" width="240">
                <template slot-scope="scope">{{ scope.row.realityStartTime | dateFormat('yyyy-MM-dd') }} -- {{ scope.row.realityEndTime | dateFormat('yyyy-MM-dd') }}</template>
            </el-table-column>
            <el-table-column prop="phaseStatus" label="状态" width="80">
                <template slot-scope="scope"> {{ scope.row.phaseStatus | Stutas }} </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <i class="icon-btn-complete" title="完成" v-if="projectDetail.createId === loginUId" @click="getStageDetail(scope.row.id, scope.$index);completePopup = true;"></i>
                    <i class="icon-btn-submit" title="上传成果" @click="getStageDetail(scope.row.id, scope.$index);uploadPopup = true"></i>
                </template>
            </el-table-column>
        </el-table>
        <!-- 阶段详情弹窗 -->
        <el-dialog class="detailsOnStage" :visible.sync="phasePopup" size="tiny" title="阶段详情">
            <div>
                <el-row class="mb20">
                    <el-col :span="3">
                        <strong>项目阶段:</strong>
                    </el-col>
                    <el-col :span="18">
                        {{StageStatus.statusName}}
                    </el-col>
                </el-row>
                <el-row class="mb20">
                    <el-col :span="3">
                        <strong>计划时间:</strong>
                    </el-col>
                    <el-col :span="18">
                        {{StageStatus.phaseStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.phaseEndTime | dateFormat('yyyy.MM.dd')}}
                    </el-col>
                </el-row>
                <el-row class="mb20">
                    <el-col :span="3">
                        <strong>实际时间:</strong>
                    </el-col>
                    <el-col :span="18">
                        {{StageStatus.realityStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.realityEndTime | dateFormat('yyyy.MM.dd')}}
                    </el-col>
                </el-row>
                <el-row class="mb20">
                    <el-col :span="3">
                        <strong>阶段成果:</strong>
                    </el-col>
                </el-row>
                <el-row class="mb20">
                    <el-table class="data-table" :data="StageStatus.resources" max-height="300" :align="'center'" v-if="StageStatus.resources && StageStatus.resources.length" border>
                        <el-table-column prop="userName" label="上传人" width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createDate" label="上传时间" width="160" show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{ scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm') }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="成果" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <a :href="downloadUrl( scope.row.resourceId, scope.row.name )" :download="scope.row.name" style="color:#0391D9;">下载</a>
                                <a style="color:#0391D9;border-left:1px solid #000;padding-left: 5px;height:15px;" @click.prevent="delStageResources(scope.row.id)" v-if="projectDetail.createId === loginUId">删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <span v-else>暂无成果</span>
                </el-row>
            </div>
        </el-dialog>
        <!-- 阶段完成弹窗 -->
        <el-dialog class="detailsOnStage" :visible.sync="completePopup" size="tiny" title="项目阶段完成">
            <div class="box">
                <p><strong>项目阶段:</strong> {{StageStatus.statusName}}</p>
                <p><strong>计划时间:</strong> {{StageStatus.phaseStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.phaseEndTime | dateFormat('yyyy.MM.dd')}}</p>
                <p style="line-height:32px;">
                    <strong class="vat">实际时间:</strong>&nbsp;&nbsp;&nbsp;
                    <el-date-picker v-model="StageStatus.realityStartTime" type="date" placeholder="选择日期" style="width:150px;"></el-date-picker>
                    <span class="vat">--</span>
                    <el-date-picker v-model="StageStatus.realityEndTime" type="date" placeholder="选择日期" style="width:150px;" :picker-options="timeRules"> </el-date-picker>
                </p>
                <div class="buttonGroup clearfix">
                    <a class="reply_btn reply_btn2" @click="completePopup = false">取消</a>
                    <a class="reply_btn reply_btn1" @click="sendStage(StageStatus)">确定</a>
                </div>
            </div>
        </el-dialog>
        <!-- 上传成果弹窗 -->
        <el-dialog class="detailsOnStage" :visible.sync="uploadPopup" size="tiny" :before-close="clearFileList" title="上传成果">
            <div class="box">
                <p><strong>项目阶段:</strong> {{StageStatus.statusName}}</p>
                <p><strong>计划时间:</strong> {{StageStatus.phaseStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.phaseEndTime | dateFormat('yyyy.MM.dd')}}</p>
                <p><strong>实际时间:</strong> {{StageStatus.realityStartTime | dateFormat('yyyy.MM.dd')}} -- {{StageStatus.realityEndTime | dateFormat('yyyy.MM.dd')}}</p>
                <el-row>
                        <el-col :span="4">
                            <strong style="display:inline-block;line-height:38px;">成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;果:</strong>&nbsp;
                        </el-col>
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="fileList.filter(x => (projectDetail.createId===loginUId || x.userId===loginUId))" :on-remove="handleRemove" :before-upload="UploadFile">
                              <span class="upload-result-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                              <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在 {{ standardFileSize }} M以内</span>
                            </el-upload>
                        </el-col>
                </el-row>
                <div class="buttonGroup clearfix" style="margin-top: 30px;">
                    <a class="reply_btn reply_btn2" @click="clearFileList">取消</a>
                    <a class="reply_btn reply_btn1" @click="sendResults(StageStatus)">确定</a>
                </div>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { adminProjectPhaseList, adminProjectStageComplete, adminProjectStageSubmit } from '@/service/project.js'
import detailsOnStage from 'components/project/detailsOnStage.vue'
import del from 'Common/del_popover.vue'

let uploadTime

export default {
    name: 'projectDetailRepertoire',
    mixins: [uploadFileSize],
    props: {
        projectDetail: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            loginUId: this.$ls.get('loginUId'),
            // 删除后请求列表参数
            // id
            callbackId: null,
            // 序号
            callbackIndex: null,
            // 项目id
            projectId: this.$route.query.id,
            // 阶段名称
            stageListName: ['项目发起', '项目准备', '项目设计', '原型制作', '测试迭代', '项目评价'],
            // 阶段数据
            stageList: [],
            // 阶段详情弹框开关
            phasePopup: false,
            // 阶段完成弹框开关
            completePopup: false,
            // 上传成果弹框
            uploadPopup: false,
            // 详情数据
            StageStatus: {},
            // 上传文件列表
            fileList: [],
            // 阶段完成结束时间大于开始时间限制
            timeRules: {
                disabledDate(time) {
                    return time.getTime() < uploadTime
                }
            }
        }
    },
    components: {
        'v-detailsOnStage': detailsOnStage,
        'v-del': del
    },
    mounted() {
        // 请求列表数据
        this.getStageList()
    },
    methods: {
        delStageResources(id) {
            this.$http.post('maker/project/resource/del', { id }).then((res) => {
                if (res.data.code === 200) {
                    this.getStageDetail(this.callbackId, this.callbackIndex)
                    this.$message({ type: 'success', message: '删除成功' })
                } else {
                    this.$message({ type: 'warning', message: res.data.msg })
                }
            }, () => {
                this.$message({ type: 'error', message: '删除失败' })
            })
        },
        // 判断是否发布者，是则弹出阶段详情，不是则无操作
        perPhasePopup(id, index) {
            // if(this.projectDetail.createId === this.$ls.get('loginUId')) {
            this.getStageDetail(id, index)
            this.phasePopup = true
            // }
        },
        // 关闭上传弹框清理
        clearFileList() {
            this.fileList = []
            this.uploadPopup = false
        },
        /*
         * 获取阶段列表
         * projectId: 项目Id
         */
        getStageList() {
            adminProjectPhaseList(
                { projectId: this.projectId }
            ).then((response) => {
                response.data.entity.resultData.forEach((x, index) => {
                    x.name = this.stageListName[index]
                    return x
                })
                this.stageList = response.data.entity.resultData
            })
        },
        /*
         * 获取阶段详情
         * projectId: 项目Id
         * id: 阶段Id
         */
        getStageDetail(id, index) {
            this.$http.post('maker/project/phase/detail',
                { projectId: this.projectId, id: id }
            ).then((res) => {
                if (res.data.code === 200) {
                    res.data.entity.statusName = this.stageListName[index]
                    this.StageStatus = res.data.entity
                    // const resources = res.data.entity.resources.map(i => ({ name: i.name, url: i.fileid, status: 'finished', userId: this.loginUId }))
                    this.callbackId = id
                    this.callbackIndex = index
                }
            })
        },
        // 上传， size上传文件大小
        UploadFile(file) {
            const fileSize = file.size
            const _this = this
            if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                    if (res.code === 200) {
                        _this.fileList.push({ name: file.name, url: res.appendInfo.resourceId, userId: _this.loginUId })
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
        // 阶段完成， param对象，id：当前阶段id， projectId：项目id，phaseCode: 现完成第几阶段， realityStartTime： 实际开始时间， realityEndTime： 实际结束时间
        sendStage(param) {
            adminProjectStageComplete({
                id: param.id,
                projectId: param.projectId,
                phaseCode: param.phaseCode,
                realityStartTime: param.realityStartTime.getTime(),
                realityEndTime: param.realityEndTime.getTime()
            }).then((res) => {
                if (res.data.code === 200) {
                    this.getStageList()
                    this.phasePopup = false
                    this.completePopup = false
                    this.uploadPopup = false
                    this.$message({
                        message: '阶段完成修改成功',
                        type: 'success'
                    })
                    this.$emit('changeStutas')
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    })
                }
            })
        },
        // 上传成果
        sendResults(param) {
            const resourceList = this.fileList.map(i => ({ name: i.name, resourceId: i.url }))
            adminProjectStageSubmit({
                id: param.id,
                projectId: param.projectId,
                resources: resourceList
            }).then((res) => {
                if (res.data.code === 200) {
                    this.getStageList()
                    this.phasePopup = false
                    this.completePopup = false
                    this.uploadPopup = false
                    this.$message({
                        message: '成果上传成功',
                        type: 'success'
                    })
                    this.fileList = []
                }
            })
        },
        // 删除文件列表文件
        handleRemove(file, fileList) {
            this.fileList = fileList
        }
    },
    watch: {
        'StageStatus.realityStartTime': {
            handler(val) {
                uploadTime = ((val !== undefined) || (val !== null)) ? val : undefined
                this.timeRules = {
                    disabledDate(time) {
                        return time.getTime() < uploadTime ? uploadTime : undefined
                    }
                }
            },
            deep: true
        }
    },
    filters: {
        Stutas: function (value) {
            let str
            switch (value) {
                case 1:
                    str = '未开始'
                    break
                case 2:
                    str = '进行中'
                    break
                case 3:
                    str = '已结束'
                    break
            }
            return str
        }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/table.scss';
.detailsOnStage {
    .el-dialog {
        min-width: 630px;
    }
}
#repertoire{
    .el-table{
        .cell{
            text-align: center;
        }
    }
}
.dpd15{
    padding: 5px 15px 15px;
}
</style>
<style lang='scss' scoped>
.mb20 {
    margin-bottom: 20px;
}
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
                &:hover{
                    color: #fff;
                    background-color: $theme-color
                }
            }
        }
    }
}
.vat{
    vertical-align: top;
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
        p {
            margin: 10px 0;
        }
    }
}
.upload-result-btn{
        width: 96px;
        height: 38px;
        line-height: 38px;
        border:1px solid #ccc;
        padding: 8px;
        margin-right: 15px;
        i{
            font-size: 14px;
            color: #d00;
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
            border-radius: $button-radiu;
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
        }
    }
</style>