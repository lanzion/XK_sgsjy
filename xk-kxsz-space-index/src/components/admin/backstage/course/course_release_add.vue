<template>
    <div class="course-release-add">
        <div class="outline-wrapper">
            <ul class="chapters">
                <li v-for="(chapter, index) in courseData" :class="{'has-no-section': chapter.courseHourSectionList.length === 0}" :key="index" class="chapter-item">
                    <h3 class="chapter">
                        {{chapter.name}}
                        <span v-if="totalSectionsPerChapter(index)" class="section-num fr">共{{totalSectionsPerChapter(index)}}个课时</span>
                    </h3>
                    <ul class="sections">
                        <li v-for="(section, i) in chapter.courseHourSectionList" :key="i" class="section-item">
                            <a class="section fl" href="javascript:;" :title="section.name">【{{handleSectionType(section.sectionType)}}】{{section.name}}</a>
                            <operate v-if="section['_canEdit']" :icon-group="['moveup', 'movedown', 'edit', 'delete']" :icon-size="16" @on-delete="deleteSection(chapter.courseHourSectionList, i)" @on-edit="showSectionBox(index, i, true)" @on-move-up="moveUp(chapter.courseHourSectionList, i)" @on-move-down="moveDown(chapter.courseHourSectionList, i)" label="课时"></operate>
                        </li>
                    </ul>
                    <button v-if="!chapter._flag" @click="showSectionBox(index, chapter.courseHourSectionList.length, false)" class="btn-add-section btn">
                        添加课时
                    </button>
                    <el-form v-else :model="sectionForm" :rules="sectionFormRules" ref="sectionForm" label-width="80px" class="add-section-box">
                        <el-form-item label="课时类型" prop="sectionType">
                            <el-col :span="9">
                                <el-select v-model="sectionForm.sectionType" placeholder="请选择课时类型" style="width:100%;">
                                    <el-option v-for="item in options.sectionType" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="课时名称" prop="sectionName">
                            <el-col :span="9">
                                <el-input v-model.trim="sectionForm.sectionName" placeholder="请输入课时名称，不超过20字" :maxlength="20"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item v-if="sectionForm.sectionType === '1'" label="录播视频" required>
                            <el-col :span="24">
                                <el-upload action="" :file-list="sectionForm.fileList" :on-remove="deleteAttachment" class="cover-uploader clearfix" :before-upload="UploadFile" accept="video/mp4">
                                    <button class="cover-uploader-icon icon-btn-add-circle" type="button">上传文件</button>
                                    <span slot="tip" class="tip" style="float: left;line-height: 38px;margin-right: 16px;font-size: 12px;">暂只支持mp4格式的视频</span>
                                </el-upload>
                            </el-col>
                            <div v-if="isSavingSection && sectionForm.fileList.length === 0" class="el-form-item__error">请上传视频</div>
                        </el-form-item>
                        <el-form-item v-else-if="sectionForm.sectionType === '2'" label="题目" required>
                            <el-col :span="24">
                                <a @click="showDialog('selectQuestion')" class="add-section__btn-choose-question" href="javascript:;" title="请选择题目">
                                    <i class="icon-btn-add-square icon"></i>
                                </a>
                                <br>
                                <ul v-show="questionArr.length" class="selected-question">
                                    <li v-for="(question, i) in questionArr" :key="i" class="selected-question-item">
                                        【{{handleBankType(question._bankType)}}】{{question._name}}
                                        <operate :icon-group="['delete']" :icon-size="16" @on-delete="deleteSelectedQuestion(i)" label="考题" style="top:0px;right:10px"></operate>
                                    </li>
                                </ul>
                            </el-col>
                            <div v-if="isSavingSection && questionArr.length === 0" class="el-form-item__error">请选择题目</div>
                        </el-form-item>
                        <el-form-item class="add-section__btns">
                            <button @click="cancelAddingSection" class="btn-cancel btn" type="button">取消</button>
                            <button @click="saveSection(index)" class="btn-save btn" type="button">保存</button>
                        </el-form-item>
                    </el-form>
                </li>
            </ul>
        </div>
        <el-form v-if="addChapterBoxIsVisible" :model="chapterForm" :rules="chapterFormRules" ref="chapterForm" label-width="80px" class="add-chapter__box">
            <el-form-item label="章节名称" prop="chapterName">
                <el-col :span="9">
                    <el-input v-model.trim="chapterForm.chapterName" placeholder="请输入章节名称，不超过20字" :maxlength="20"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item class="add-chapter__btns">
                <button @click="addChapterBoxIsVisible = false" class="btn-cancel btn" type="button">取消</button>
                <button @click="saveChapter" class="btn-save btn" type="button">保存</button>
            </el-form-item>
        </el-form>
        <a @click="showAddChapterBox" href="javascript:;" class="add-chapter__btn"><i class="icon-btn-add-circle icon"></i>添加章节</a>
        <div class="btn-row__bottom">
            <template v-if="isReleasingStep">
                <button @click="goBack" class="btn-prev btn i-form-button is-plain" type="button">上一步</button>
                <button @click="submit(0)" class="btn-submit btn" type="button">保存</button>
                <button @click="submit(1)" class="btn-submit btn" type="button">提交审核</button>
            </template>
            <template v-else>
                <button @click="submit('custom')" class="btn-submit btn" type="button">保存</button>
                <button @click="$emit('on-cancel-editing')" class="btn-cancel btn is-plain" type="button">取消</button>
            </template>
        </div>
        <select-question v-if="selectQuestionDialogIsVisible" :question-added="questionArr"></select-question>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapState, mapMutations } from 'vuex'
    import { addCourse, editCourse, editCourseOutline } from '@/service/course.js'
    import operate from '../../../common/operate.vue'
    import selectQuestion from './select_question_dialog.vue'

    export default {
        name: 'courseReleaseAdd', // 课程发布添加课程
        mixins: [uploadFileSize],
        data () {
            return {
                acceptType: 'video/avi, video/mov, video/mpeg, video/rm, video/asf',
                addChapterBoxIsVisible: true, // 添加章节输入框是否显示
                courseData: [], // 课程数据
                curChapter: 0, // 当前编辑的章节index
                curSection: 0, // 当前编辑的课时index
                chapterForm: { // 章节表单信息
                    chapterName: ''
                },
                chapterFormRules: { // 章节表单验证条件
                    chapterName: [
                        {required: true, message: '请输入章节名称', trigger: 'change blur'}
                    ]
                },
                isSavingSection: false, // 点击保存课时
                isEditingCourse: false, // 是否是修改课程
                sectionForm: { // 课时表单信息
                    sectionType: '',
                    sectionName: '',
                    fileList: []
                },
                sectionFormRules: { // 课时表单验证条件
                    sectionName: [
                        {required: true, message: '请输入课时名称', trigger: 'change blur'}
                    ],
                    sectionType: [
                        {required: true, message: '请选择课时类型', trigger: 'change'}
                    ]
                },
                options: {
                    sectionType: [ // 课时分类
                        {value: '1', label: '录播'},
                        {value: '2', label: '练习'},
                        {value: '3', label: '直播', disabled: true}
                    ]
                },
                questionArr: [], // 对应课时选择的考题，每次编辑或者新增课时的时候，都重新赋值
            }
        },
        props: {
            firstStepData: { // 第一步的数据
                type: Object,
                required: true,
                default: () => {}
            },
            editCourseData: { // 修改课程，后台返回的初始数据
                type: Object,
                default: () => {}
            }
        },
        components: {
            operate,
            selectQuestion
        },
        computed: {
            ...mapState('course/backend', ['selectQuestionDialogIsVisible'])
        },
        created () {
            const {path, query: {id}} = this.$route
            const pathOfReleasing = '/admin/course/release'

            this.isReleasingStep = path === pathOfReleasing
            id && (this.isEditingCourse = true)
            this.initData()
        },
        methods: {
            ...mapMutations('course/backend', ['showDialog']),
            cancelAddingSection () { // 取消添加课时
                this.toggleSectionBox(false)
                this.isEditingSection = false
                this.isSavingSection = false
            },
            checkSectionBoxIsVisible () { // 限制只显示一个课时输入框，不然选择考题会有问题
                const otherSectionBoxIsVisible = this.courseData.some(chapter => chapter._flag === true)

                if (otherSectionBoxIsVisible) {
                    this.$message({
                        message: '您还有未保存的课时内容，请先点击保存！',
                        type: 'warning'
                    })
                    return true
                }

                return false
            },
            deleteSection (sections, index) { // 删除课时
                if (this.checkSectionBoxIsVisible()) return

                sections.splice(index, 1)
            },
            deleteSelectedQuestion (index) { // 删除对应课时已经选择的某个考题
                this.questionArr.splice(index, 1)
            },
            deleteAttachment (file, fileList) { // 删除附件
                const e = window.event || event
                e.stopPropagation()
                this.sectionForm.fileList = fileList
            },
            goBack () { // 返回上一步
                this.$emit('on-change-step', 1)
            },
            handleBankType (i) { // 处理考题类型
                const source = {1: '单选', 2: '多选', 3: '判断'}
                return source[i]
            },
            handleSectionType (i) { // 处理课时类型
                const source = {1: '录播', 2: '练习', 3: '直播'}
                return source[i]
            },
            initData () { // 修改待审课程，初始化页面数据
                const _data = this.editCourseData.courseChapterList || []

                if (_data.length) {
                    const isReleasingStep = this.isReleasingStep
                    this.addChapterBoxIsVisible = false

                    const copyData = function (target = [], source = []) {
                        source.forEach((item, index) => {
                            const {courseId, id, name, title, courseHourSectionList: _courseHourSectionList} = item
                            target.push({
                                courseId,
                                id,
                                name,
                                title,
                                courseHourSectionList: [],
                                _flag: false // 一定要加标识
                            })

                            if (Array.isArray(_courseHourSectionList)) {
                                let _curSectionArr = target[index].courseHourSectionList
                                _courseHourSectionList.forEach((section, i) => {
                                    const {chapterId, courseId, id, isFree, name, sectionType, title, url} = section
                                    _curSectionArr.push({
                                        chapterId,
                                        courseId,
                                        id,
                                        isFree,
                                        name,
                                        sectionType,
                                        title,
                                        url,
                                        courseExaminationPaperList: [],
                                        _canEdit: isReleasingStep,
                                    })
                                    let _courseExaminationPaperList = section.courseExaminationPaperList

                                    if (Array.isArray(_courseExaminationPaperList)) {
                                        let _curSectionQuestionArr = target[index].courseHourSectionList[i].courseExaminationPaperList
                                        _courseExaminationPaperList.forEach(question => {
                                            _curSectionQuestionArr.push({
                                                id: question.id,
                                                questBankId: question.questBankId,
                                                score: question.score,
                                                _name: question.questBank && question.questBank.name || '',
                                                _bankType: question.questBank && question.questBank.bankType || 1
                                            })
                                        })
                                    } else {
                                        return false
                                    }
                                })
                            } else {
                                return false
                            }
                        })
                    }

                    copyData(this.courseData, _data) // 把所需的字段单独遍历出来赋值给课程数据，如果直接把接口数据作为修改课程的初始数据，数据响应有问题
                }
            },
            moveUp (sections, index) { // 上移课时
                if (this.checkSectionBoxIsVisible()) return

                const firstCanEditSectionIndex = sections.findIndex(item => item._canEdit)
                if (index == 0 || index < firstCanEditSectionIndex) return

                const curVal = sections[index]
                const prevVal = sections[index - 1]
                sections.splice(index - 1, 2, curVal, prevVal)
            },
            moveDown (sections, index) { // 下移课时
                if (this.checkSectionBoxIsVisible()) return

                if (index === sections.length - 1) return

                const curVal = sections[index]
                const nextVal = sections[index + 1]
                sections.splice(index, 2, nextVal, curVal)
            },
            saveChapter () { // 保存章节
                this.$refs.chapterForm.validate(valid => {
                    if (valid) {
                        this.courseData.push({
                            name: this.chapterForm.chapterName,
                            courseId: this.courseData.length + 1,
                            courseHourSectionList: [],
                            _flag: false // 显示添加课时按钮
                        })
                        this.addChapterBoxIsVisible = false
                    }
                })
            },
            saveSection (index) { // 保存课时
                this.isSavingSection = true
                this.$refs.sectionForm[0].validate(valid => { // 课时输入框表单的引用是数组，需要注意！！！
                    if (valid) {
                        const {sectionName, sectionType, fileList} = this.sectionForm
                        const [resourceItem = {}] = fileList
                        const hasNoAttachment = sectionType === '1' && !fileList.length // 视频
                        const hasNoQuestion = sectionType === '2' && !this.questionArr.length // 考题
                        if (hasNoAttachment || hasNoQuestion) return
                        let _options = {
                            name: sectionName,
                            title: this.curSection + 1,
                            sectionType,
                            url: resourceItem.resourceId || '',
                            isFree: this.firstStepData.isFree,
                            _fileList: fileList,
                            _canEdit: true, // 标识是否可以修改课时。课程审核通过后，再修改课程目录，就不能修改原来的课时
                        }
                        this.courseData[index].courseHourSectionList[this.curSection] = {
                            ..._options,
                            courseExaminationPaperList: this.questionArr
                        }
                        this.toggleSectionBox(false)
                        this.isSavingSection = false
                    }
                })
            },
            showAddChapterBox () { // 显示添加章节输入框
                this.chapterForm.chapterName = ''
                this.addChapterBoxIsVisible = true
            },
            showSectionBox (chapterIndex, sectionIndex, isEditing) { // 显示编辑课时输入框，并初始化
                if (this.checkSectionBoxIsVisible()) return

                this.curChapter = chapterIndex
                this.curSection = sectionIndex
                this.isEditingSection = isEditing // 标识编辑课时操作
                this.resetSectionBoxData()
                this.toggleSectionBox(true)
            },
            resetSectionBoxData () { // 显示对应章节的添加课时输入框
                let _curChapter = this.courseData[this.curChapter]

                this.questionArr = null // 每次显示课时输入框，重置考题数组

                if (this.isEditingSection) { // 编辑课时
                    const {name, sectionType, courseExaminationPaperList, _fileList = []} = _curChapter.courseHourSectionList[this.curSection]
                    this.sectionForm.sectionName = name
                    this.sectionForm.fileList = JSON.parse(JSON.stringify(_fileList))
                    this.sectionForm.sectionType = sectionType
                    this.questionArr = JSON.parse(JSON.stringify(courseExaminationPaperList)) // 处理引用类型的复制
                    return
                }

                this.sectionForm.sectionName = ''
                this.sectionForm.fileList = []
                this.sectionForm.sectionType = ''
                this.questionArr = []
            },
            submit (status) { // 提交审核
                const {courseData, firstStepData, isEditingCourse, isReleasingStep, editCourseData: {id}} = this
                const _options = {...firstStepData}
                const isCustom = status === 'custom'
                const _label = status === 1 && '提交审核' || isCustom && '修改目录' || '保存数据'
                const errMsg = `${_label}失败，请重试`

                let handler = addCourse

                _options.courseChapterList = courseData
                _options.fit = _options.fit.join(',')
                _options.courseTypeParent = _options.courseType[0]
                _options.courseType = _options.courseType.join('-') // 处理课程分类
                _options.technologyRelationList = _options.technologyRelationList.map(val => ({technologyId: val})) // 处理相关技术列表
                _options.isSubmit = isCustom ? 0 : status // isSubmit => 0:保存     1 保存并提交审核
                _options.auditStatus = isCustom && '1' || undefined

                if (isEditingCourse) {
                    handler = isReleasingStep && editCourse    || editCourseOutline
                    _options.id = id
                }

                handler(_options).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: `成功${_label}`,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                isReleasingStep && this.$router.push('/admin/course/unchecked')
                            }
                        })

                        isCustom && this.$emit('on-edit-success')
                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            totalSectionsPerChapter (chapter) { // 获取每章的课时数量
                return this.courseData[chapter].courseHourSectionList.length
            },
            toggleSectionBox (flag = true) {
                this.courseData[this.curChapter]._flag = flag // _flag为true时显示课时输入框，为false时隐藏课时输入框
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                        fileName = file.name,
                        expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                        _this = this
                if((/(mp4)$/i.test(expandName)) && (fileSize < _this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.sectionForm.fileList.splice(0, 1, {
                                name: file.name,
                                resourceId: res.appendInfo.resourceId
                            })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                            _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.sectionForm.fileList.splice(_this.sectionForm.fileList.length, 1)
                    if (!/(mp4)$/i.test(expandName)) {
                        _this.$message({message: '请上传支持格式的视频'})
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.standardFileSize}M`
                        })
                    }
                    uploader.cancelFile(file)
                }
            },
        }
    }
</script>

<style lang='scss'>
    .course-release-add .el-form-item {
        margin-bottom: 28px;
    }

    .course-release-add .add-section-box .el-input__icon {
        width: 14%;
    }

    .course-release-add .el-upload-list__item .el-icon-close {
        position: absolute;
        top: 8px;
        right: 10px;
        cursor: pointer;
        opacity: .75;
        color: #48576a;
        transform: scale(.7);
    }

    .course-release-add .el-upload {
        float: left;
        margin-right: 16px;
    }

    .course-release-add .el-upload-list {
        float: left;
        width: 300px;
    }

    .course-release-add .outline-wrapper .sections .section-item .operate {
        font-size: 16px;
    }
</style>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
    .course-release-add {
        padding-top: 30px;
        .btn-row__add-chapter {
            .btn-save {
                color: #fff;
                background-color: $default-color;
            }
        }
        .add-chapter__btn {
            display: block;
            height: 38px;
            line-height: 38px;
            margin-top: 10px;
            background-color: $nav-bgc;
            border: 1px dashed $default-color;
            text-align: center;
            font-size: 14px;
            .icon {
                margin-right: 6px;
                font-size: 18px;
            }
        }
        .outline-wrapper {
            counter-reset: chapter;
            color: #3e3e3e;
            font-size: 14px;
            .chapter {
                position: relative;
                height: 38px;
                line-height: 38px;
                padding-left: 70px;
                padding-right: 12px;
                background: #f0f0f0;
                font-weight: bold;
                &:before {
                    position: absolute;
                    left: 12px;
                    top: 0;
                    height: 100%;
                    content: '第' counter(chapter, upper-roman) '章';
                    content: '第' counter(chapter, cjk-ideographic) '章';
                    counter-increment: chapter;
                    margin-right: 20px;
                    letter-spacing: 1px;
                }
            }
            .sections {
                counter-reset: section;
                .section-item {
                    position: relative;
                    height: 38px;
                    line-height: 38px;
                    padding-left: 70px;
                    padding-right: 18px;
                    &:hover {
                        background: $nav-bgc;
                    }
                    .section {
                        &:before {
                            content: '课时' counter(section);
                            counter-increment: section;
                            margin-right: 12px;
                        }
                    }
                    .operate {
                        right: 0;
                        top: 0;
                    }
                }
            }
        }
        .btn {
            box-sizing: border-box;
            width: 92px;
            height: 32px;
            line-height: 32px;
            margin-right: 4px;
            text-align: center;
            color: $default-color;
            border: 1px solid $default-color;
            cursor: pointer;
            padding: 0;
        }
        .btn-add-section {
            display: block;
            margin: 10px 0 10px 76px;
            &:hover {
                background-color: $default-color;
                color: #fff;
            }
        }
        .has-no-section .btn-add-section {
            margin: 40px auto 30px auto;
        }
        .add-chapter__box {
            padding-top: 10px;
        }
        .add-section-box {
            padding-top: 40px;
            .cover-uploader-icon {
                box-sizing: border-box;
                display: inline-block;
                width: 92px;
                height: 38px;
                padding: 12px 10px;
                border: 1px solid #dfdfdf;
                font-size: 12px;
            }
            .add-section__btn-choose-question {
                font-size: 30px;
            }
            .selected-question {
                box-sizing: border-box;
                padding: 10px 20px 10px 10px;
                border: 1px solid #dfdfdf;
                counter-reset: selected-question;
                .selected-question-item {
                    position: relative;
                    height: 36px;
                    line-height: 36px;
                    padding-left: 12px;
                    &:hover {
                        background-color: #ffefef;
                    }
                    &:before {
                        counter-increment: selected-question;
                        content: counter(selected-question) ' 、'
                    }
                }
            }
        }
        .btn-row__bottom {
            margin-top: 182px;
            margin-bottom: 80px;
            text-align: center;
            .btn-submit {
                background-color: $default-color;
                color: #fff;
            }
        }
    }

</style>
