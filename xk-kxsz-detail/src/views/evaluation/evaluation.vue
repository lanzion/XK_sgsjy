<template>
    <div :class="{'can-input': canInputAndSubmit}" :style="ISADMIN && adminClass" class="evaluation" ref="evaluation">
        <nav class="tabs-bar-header highlight nav-evaluation">
            <el-tabs v-model="evalType">
                <el-tab-pane label="自评" name="1"></el-tab-pane>
                <el-tab-pane label="他评" name="2"></el-tab-pane>
                <el-tab-pane label="终评" name="3"></el-tab-pane>
            </el-tabs>
        </nav>
        <div v-if="tableIsVisible" class="my-evaluation" style="padding-bottom: 26px;">
            <el-table :data="evalResult[evalType].evaluationList || items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%;">
                <el-table-column prop="pname" label="一级指标" width="179" show-overflow-tooltip/>
                <el-table-column prop="name" label="二级指标" width="180" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}（{{~~(scope.row.indexScore || 0) * 10 / 10 || scope.row.score}}分）</span>
                    </template>
                </el-table-column>
                <el-table-column prop="evaluationPoint" label="测评点" min-width="320">
                    <template slot-scope="scope">
                        <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
                    </template>
                </el-table-column>
                <el-table-column :label="evalType === '1' && '自评' || '评分'" width="128">
                    <template slot-scope="scope">
                        <span v-if="ISADMIN" class="score">{{scope.row.score}}</span>
                        <template v-else>
                            <el-input-number v-if="canInputAndSubmit" v-model.number="evaluationList[scope.$index].score" class="score-input is-required" type="number" :min="0" :max="scope.row.score" placeholder="请输入"></el-input-number>
                            <span v-else class="score">{{scope.row.score}}</span>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-table data-table back-stage-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;border-top: 0;">
                <div class="el-table__body-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                        <tbody>
                        <tr class="">
                            <td class="table-label">
                                <div class="cell">{{evalType === '1' && '自评等级' || '评价等级'}}</div>
                            </td>
                            <td class="">
                                <p class="cell table-content red">{{ISADMIN && evalType === '3' && finalLevel || evalResult[evalType].evaluationGrade}}</p>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="table-label">
                                <div class="cell">{{evalType === '1' && '自我评价' || '评语'}}</div>
                            </td>
                            <td class="">
                                <el-input v-if="canInputAndSubmit" v-model.trim="comment" :maxlength="80" class="cell table-content is-required" placeholder="请输入评语"></el-input>
                                <p v-else class="comment cell table-content">{{evalResult[evalType].remark}}</p>
                            </td>
                        </tr>
                        <tr v-if="evalType === '1' && !isAdmin" class="">
                            <td class="table-label">
                                <div class="cell">学习/实践成果</div>
                            </td>
                            <td class="">
                                <ul class="cell table-content clearfix">
                                    <li v-for="(val, i) in achievementList" :key="i" class="works-item blue">
                                        <a @click="redirect(pages.detail.works, { query: { id: val.worksId } })" :title="val.worksName" class="blue" href="javascript:;">{{val.worksName}}</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="table-label">
                                <div class="cell">附件</div>
                            </td>
                            <td class="">
                                <el-upload v-if="canInputAndSubmit" :file-list="fileList" :on-remove="deleteItem" action class="cover-uploader cover-uploader__eval cell table-content" :before-upload="UploadFile">
                                    <button class="cover-uploader-icon">上传文件</button>
                                </el-upload>
                                <p v-else class="download cell table-content">
                                    <a v-if="downLoadResource && Object.keys(downLoadResource).length" :href="downloadUrl(downLoadResource.resourceId, downLoadResource.name)" :download="downLoadResource.name" class="btn-download blue" title="下载">
                                        {{downLoadResource.name}}
                                    </a>
                                    <a class="btn-download" v-else>暂无附件</a>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-if="btnGroupIsVisible" class="btn-row">
                <button v-if="canInputAndSubmit" @click="submit" class="bs-handle-button i-form-button" type="button">发表
                </button>
                <button @click="$router.go(-1)" class="bs-handle-button i-form-button is-plain" type="button">取消</button>
            </div>
        </div>
        <p v-else-if="evalType !== '2'" class="no-data">暂无评价</p>
        <div v-if="evalType === '2'" :class="{'without-table': !tableIsVisible}" class="others-evaluation">
            <ul>
                <li v-for="(list, i) in evalResult[2]" :key="i" class="evaluation-item table-layout">
                    <figure class="avatar table-cell pr">
                        <img :src="getFileUrl(list.face) || faceDefault" alt="" width="72" height="72">
                        <figcaption class="name pa">{{list.userName || '暂无'}}</figcaption>
                    </figure>
                    <div class="content table-cell">
                        <p class="level">评价等级：<i class="red">{{list.evaluationGrade || '无'}}</i></p>
                        <p class="comment">评语：{{list.remark}}</p>
                        <p class="attachment">
                            附件：
                            <a v-if="list.resource && Object.keys(list.resource).length" :href="downloadUrl((list.resource || {}).resourceId)" :download="(list.resource || {}).name"
                                 class="blue" title="下载">
                                {{(list.resource || {}).name}}
                            </a>
                            <a class="btn-download" v-else>暂无附件</a>
                        </p>
                    </div>
                </li>
            </ul>
            <p v-if="!evalResult[2].length && !tableIsVisible" class="no-data">暂无评价</p>
        </div>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    // import { requestQuotaList, submitEvaluation, queryEvalResult, requestFinalList, queryFinalLevel, queryEvalStatus, submitFinalEval } from '@/service/admin_evaluation.js'
    import { requestQuotaList, submitEvaluation, queryEvalResult, queryEvalStatus, submitFinalEval } from '@/service/admin_evaluation.js'

    export default {
        name: 'evaluation', // 评价系统，前后台通用
        mixins: [uploadFileSize],
        data() {
            return {
                adminClass: {
                    padding: '14px',
                    borderRadius: '5px',
                    backgroundColor: '#fff'
                },
                canSubmitOthersEval: false,
                comment: '',
                curEvaluatingItem: this.$ls.get('curEvaluatingItem') || {}, // 当前评价的作品、实践、学习相关信息
                evalType: '1', // 评价类型1.自评,2.他评,3.终评
                evaluationList: [], // 评价指标列表，提交接口
                evaluationTemplateId: '',
                evalResult: {
                    1: {}, // 自评结果
                    2: [], // 他评结果
                    3: {} // 终评结果
                },
                evalStatus: 2, // 1不可以进行他评，2可以进行他评
                fileList: [],
                finalLevel: '',
                items: [], // 指标列表
                ISADMIN: this.$route.path.startsWith('/cqe'), // 后台管理，综合素质评价
                isAdmin: this.$route.path.startsWith('/admin'), // 个人后台
            }
        },

        props: ['createDate', 'createId'],

        computed: {
            achievementList() { // 学习、实践的成果列表
                const myEvalResultList = this.evalResult[1].resultList
                return this.isAdmin ? myEvalResultList || this.curEvaluatingItem.resultList : myEvalResultList
            },

            btnGroupIsVisible() { // 根据不同场景，控制是否显示按钮组
                const type = this.evalType
                const [myEvalType, othersEvalType, finalEvalType] = ['1', '2', '3']
                const result = this.ISADMIN ? type === finalEvalType : type === othersEvalType
                return this.isAdmin ? type === myEvalType : result
            },

            canInputAndSubmit() { // 根据不同场景，控制是否可以进行评分并提交
                const type = this.evalType
                const res = this.evalResult
                // const othersEvalStatus = 2
                const [myEvalType, othersEvalType, finalEvalType] = ['1', '2', '3']

                if (this.isAdmin) {
                    return type === myEvalType && !res[myEvalType].id
                } else if (this.ISADMIN) {
                    return type === finalEvalType && this._isFinal && res[finalEvalType].remark === null
                } else {
                    return type === othersEvalType
                }
            },

            downLoadResource() { // 自评、终评的下载资源
                return this.evalResult[this.evalType].resource || {}
            },

            tableIsVisible() { // 根据不同场景，控制是否显示评价表格
                const type = this.evalType
                const res = this.evalResult
                const [myEvalType, finalEvalType] = ['1', '3']
                const hasLogined = this.$store.state.login.isLogin
                const hasSelfEvaluated = !!res[myEvalType].id

                if (type === myEvalType) {
                    return this.isAdmin ? true : hasSelfEvaluated
                } else if (type === finalEvalType) {
                    return !!res[finalEvalType].id
                } else {
                    // 空间前台，在他评阶段、自评后，才能进行他评
                    return !(this.isAdmin || this.ISADMIN) && hasSelfEvaluated && this.canSubmitOthersEval && hasLogined
                }
            }
        },

        created() {
            const { _isFinal } = this.curEvaluatingItem
            this._isFinal = _isFinal // 为true，表示可以进行终评
            this.requestQuotaList()
            this.queryEvalResult()
//            !this.isAdmin && this.queryEvalStatus()
//            _isFinal && this.requestFinalList()
            this.evalType = _isFinal ? '3' : '1'
        },

        methods: {
            async requestQuotaList() { // 获取指标列表
                // const { target, beCommentedId: createId, createTime: createDate } = this.curEvaluatingItem
                const res = await requestQuotaList({ target: 3, createId: this.createId, createDate: this.createDate })

                if (res.status === 200 && res.data.code === 200) {
                    const entity = res.data.entity || {}
                    this.items = entity.list || []
                    const [firstItem = {}] = this.items
                    this.evaluationTemplateId = firstItem.evaluationTemplateId
                    this.evaluationList = this.items.map(item => ({ envalnationIdnexId: item.evaluationIndexId, score: '' }))
                }
            },
            // async requestFinalList () { // 获取终评指标数据
            //     const {beCommentedId, busId} = this.curEvaluatingItem
            //     const res = await requestFinalList({commentedId: beCommentedId, busId})
            //     if (res.status === 200 && res.data.code === 200) {
            //         let total = 0 // 终评的总分
            //         const entity = res.data.entity || {}
            //         this.items = entity.list || []
            //         this.evaluationList = this.items.map(item => {
            //             let {evaluationIndexId, score = 0} = item
            //             total += +score
            //             return {envalnationIdnexId: evaluationIndexId, score}
            //         })
            //         this.queryFinalLevel(total)
            //     }
            // },
            async queryEvalResult() { // 查询评价结果
                // const { busId } = this.curEvaluatingItem
                const res = await queryEvalResult({ busId: this.$route.query.id })

                if (res.status === 200 && res.data.code === 200) {
                    const { finalEvaluationResult, hisEvaluationResult, selfEvaluationResult } = res.data.entity || {}
                    const { isCanHisEval: canSubmitOthersEval } = res.data.appendInfo || {}

                    this.evalResult[1] = selfEvaluationResult || {}
                    this.evalResult[2] = hisEvaluationResult || []
                    this.evalResult[3] = finalEvaluationResult || {}
                    this.canSubmitOthersEval = canSubmitOthersEval || false
                }
            },
            // async queryFinalLevel (score) { // 查询终评等级
            //     const res = await queryFinalLevel({evaluationTemplateId: this.evaluationTemplateId, score})
            //     if (res.status === 200 && res.data.code === 200) {
            //         const entity = res.data.entity || {}
            //         this.finalLevel = entity.name || ''
            //     }
            // },
            async queryEvalStatus() { // 查询评价状态，值为2时，表示可以他评
                const { busId, target } = this.curEvaluatingItem
                const res = await queryEvalStatus({ busId, target })

                if (res.status === 200 && res.data.code === 200) {
                    const othersEvalStatus = 2
                    this.evalStatus = res.data.entity || othersEvalStatus
                }
            },

            checkEmptyVal() { // 检查是否有空值，每条指标的评分和评语都是必填项
                const evalScoreIsEmpty = this._isFinal ? false : this.evaluationList.some(item => item.score === '')
                const commentIsEmpty = this.comment === ''
                // const hasNotAttachment = !this.fileList.length

                if (evalScoreIsEmpty || commentIsEmpty) {
                    this.$message('您还有未完成的内容，请检查')
                    return true
                }

                return false
            },

            deleteItem(file, fileList) { // 删除附件
                const e = window.event || event
                e.stopPropagation()
                this.fileList = fileList
            },

            gotoWorksDetailPage(id) { // 作品详情
                const path = this.ISADMIN ? '/space/works/detail' : '/educationBureauSpace/works/details'
                this.$router.push({ path, query: { ...this.$route.query, worksId: id } })
            },

            handleEvaluationPoint(txt) { // 处理评价点，换行显示
                return !txt ? '' : txt.replace(/\n/g, '</br>')
            },

            submit() {
                const hasEmptyVal = this.checkEmptyVal()
                if (hasEmptyVal) return

                const options = {
                    ...this.curEvaluatingItem,
                    evaluationList: this.evaluationList,
                    evaluationTemplateId: this.evaluationTemplateId,
                    userType: +this.evalType, // 评论用户类型,(1.自评,2.他评,3,终评)
                    remark: this.comment,
                    resource: this.fileList[0] || {},
                }

                const finalOptions = {
                    id: this.evalResult[3].id || '',
                    remark: this.comment,
                    resource: this.fileList[0] || {},
                }

                const handler = this._isFinal && submitFinalEval || submitEvaluation
                const _options = this._isFinal && finalOptions || options
                const errMsg = '提交评价失败，请重试'

                handler(_options).then((res) => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '成功提交评价',
                            duration: 1000,
                            onClose: () => {
                                const { fullPath } = this.$route
                                // 在直接打开或书签打开评价页面的情况下，因为没有历史记录，就不能直接返回上级路由了
                                // 因此，就删除了最后一个path，返回上级路由
                                // this.$router.go(-1)
                                this.$router.push(fullPath.replace(/(\/\w+)?(?:(?=\?\w)|$)/, ''))
                            }
                        })

                        return false
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.fileList.splice(0, 1, {
                                name: file.name,
                                resourceId: res.appendInfo.resourceId,
                                resourceName: file.name
                            })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过 ${_this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            }
        }
    }
</script>

<style lang='scss'>
    .evaluation {
        background-color: #fff;
        .nav-evaluation.tabs-bar-header {
            margin-bottom: 20px;
        }
        .evaluation-point {
            text-align: left;
            padding: 5px 30px;
        }
        .el-tabs__header {
            margin-bottom: 0;
        }
        .el-table {
            text-align: center;
            font-size: 12px;
        }
        .el-table__header-wrapper {
            font-size: 14px;
        }
        .el-table__body-wrapper {
            border: 0;
        }
        .el-table .cell.table-content {
            text-align: left !important;
            padding: 0 55px !important;
        }
        .table-label {
            width: 180px;
        }
        .blue {
            color: #0594e8;
        }
        .red {
            color: #d00;
        }
    }

    .can-input {
        .is-required {
            position: relative;
        }
        .is-required.table-content:before, .score-input:before {
            position: absolute;
            left: 45px;
            top: 2px;
            line-height: 26px;
            content: '*';
            color: #ff4949;
            font-size: 12px;
        }
        .is-required.score-input {
            $num-btn-width: 1.5em;
            .el-input-number__decrease,
            .el-input-number__increase {
                width: $num-btn-width;
                line-height: 24px;
            }
            .el-input-number__decrease {
                right: $num-btn-width;
            }
            .el-input__inner {
                padding: 0 #{$num-btn-width * 2} 0 0;
                text-align: center;
            }
            &:before {
                left: -1em;
            }
        }
    }

    .others-evaluation {
        &.without-table {
            margin-top: -20px;
            .evaluation-item {
                border-top: 0;
                border-bottom: 1px dashed #c9c9c9;
            }
            .no-data {
                margin-top: 40px;
            }
        }
        .evaluation-item {
            box-sizing: border-box;
            height: 116px;
            margin-top: -1px;
            border-top: 1px dashed #c9c9c9;
            .avatar {
                width: 72px;
                img {
                    border-radius: 50%;
                }
                .name {
                    left: 0;
                    bottom: 22px;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    display: none;
                    font-size: 12px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, .3);
                    text-align: center;
                }
                &:hover .name {
                    display: block;
                }
            }
            .content {
                padding-left: 12px;
                font-size: 14px;
                .level {
                    font-size: 18px;
                }
                .comment {
                    margin: 16px 0 10px;
                    line-height: 1.3;
                }
            }
        }
    }
</style>
<style lang="scss">
    .evaluation {
        .score-input {
            width: 80%;
            height: 26px;
            margin: 0 auto;
            overflow: visible;
        }
        .el-input__inner {
            height: 26px;
            font-size: 12px;
        }
        .works-item {
            float: left;
            margin-right: 12px;
        }
        .btn-row {
            margin-top: 20px;
            text-align: center;
            .bs-handle-button {
                width: 70px;
                height: 32px;
                line-height: 30px;
                font-size: 12px;
            }
        }
        .cover-uploader {
            float: left;
            height: 26px;
            .el-upload {
                box-sizing: border-box;
                float: left;
                width: 64px;
                height: 100%;
                line-height: 24px;
                text-align: center;
                padding: 0;
            }
            .el-upload-list {
                float: left;
                height: 100%;
                width: 200px;
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
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                font-size: 12px;
                color: #0594e8;
                border: 1px solid #0594e8;
            }
        }
    }
</style>


