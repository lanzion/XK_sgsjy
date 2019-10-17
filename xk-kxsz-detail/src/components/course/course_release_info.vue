<template>
    <div class="admin_project_publish projectPublish course-release-info">
        <el-form ref="stepFirstForm" :model="form" :rules="rules" label-width="100px">
            <!-- 课程名称 -->
            <el-form-item label="课程名称" prop="name">
                <el-col :span="9">
                    <el-input v-model="form.name" placeholder="请输入课程名称，不超过20字" :maxlength="20"></el-input>
                </el-col>
            </el-form-item>
            <!-- 课程封面 -->
            <el-form-item label="课程封面" prop="cover">
                <el-col :span="24">
                    <el-upload action :show-file-list="false" :before-upload="UploadFile" class="cover-uploader fl">
                        <img v-if="form.cover" :src="getFileUrl(form.cover)" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
            </el-form-item>
            <el-form-item label="授课教师" prop="teacherId">
                <el-col :span="9">
                    <el-input v-model="form.teacherId" placeholder="默认创建人" :maxlength="12" disabled></el-input>
                </el-col>
            </el-form-item>
            <!-- 课程目标 -->
            <el-form-item label="学习目标" prop="target">
                <el-col :span="9">
                    <el-input v-model="form.target" placeholder="请输入课程目标，不超过100字"></el-input>
                </el-col>
            </el-form-item>
            <!-- 课程内容 -->
            <el-form-item label="课程内容" prop="content">
                <el-col :span="20">
                    <el-input type="textarea" v-model="form.content" placeholder="请输入课程内容，不超过500字" style="height:100px;" :maxlength="500"></el-input>
                </el-col>
            </el-form-item>
            <!-- 课程分类 -->
            <el-form-item label="课程分类" prop="courseType">
                <el-col :span="9">
                    <multi-select style="width:100%;display:inline-block;" :selectData="form.courseType" model="course"
                                                :ifAll='false'></multi-select>
                </el-col>
            </el-form-item>
            <!-- 相关技术 -->
            <el-form-item label="相关技术" prop="technologyRelationList">
                <el-col :span="20">
                    <el-select v-model="form.technologyRelationList" multiple placeholder="请选择相关技术，多选" style="width:100%;" :filterable="true">
                        <el-option v-for="item in options.technologyRelationList" :key="item.code" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <!-- 级别 -->
            <el-form-item label="级别" prop="grade">
                <el-col :span="9">
                    <el-select v-model="form.grade" placeholder="请选择级别，单选" style="width:100%;">
                        <el-option v-for="item in levels" :key="item.code" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <!-- 适合学生 -->
            <el-form-item label="适合学生" prop="fit">
                <el-col :span="9">
                    <el-checkbox-group v-model="form.fit" :min="1">
                        <el-checkbox v-for="item in options.fit" :label="item.value" :key="item.value">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-form-item>
            <!-- 课程类型 -->
            <el-form-item label="课程类型" prop="isFree">
                <el-col :span="9">
                    <el-radio-group v-model="form.isFree">
                        <el-radio v-for="item in options.isFree" :label="item.value" :key="item.value" :disabled="item.disabled">
                            {{item.name}}
                        </el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item>
                <button @click.prevent="nextStep" class="btn-next btn" type="button">下一步</button>
                <button @click.prevent="$router.go(-1)" class="btn-cancel btn i-form-button is-plain" type="button">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import {mapActions, mapState} from 'vuex'
    import {requestDictComb} from '@/service/common.js'
    import {requestBackendCourseInfo} from '@/service/course.js'
    import {fileBaseUrl} from '@/js/common-config.js'
    import {loginInfo} from '@/js/getUserInfo.js'
    import multiSelect from '@/components/common/select/multi_select.vue';

    export default {
        name: 'courseReleaseInfo', // 课程发布基本信息
        mixins: [uploadFileSize],
        data() {
            return {
                editCourseData: {},
                fileBaseUrl,
                form: { // 需要提交的数据
                    name: '',
                    teacherId: loginInfo.userInfo.userName || '',
                    target: '', // 目标
                    cover: '', // 课程封面
                    content: '', // 内容
                    courseType: [], // 课程分类
                    technologyRelationList: [], // 相关技术
                    grade: '',
                    fit: [], // 适合学生(1.小学,2.初中,3.高中)
                    isFree: '' // 课程类型(1:免费，0:收费)
                },
                options: {
                    courseType: [],
                    technologyRelationList: [],
                    grade: [],
                    fit: [
                        {value: '1', name: "小学"},
                        {value: '2', name: "初中"},
                        {value: '3', name: "高中"}
                    ],
                    isFree: [
                        {value: '1', name: "免费"},
                        {value: '0', name: "收费", disabled: true}
                    ]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入课程名称', trigger: 'change blur'}
                    ],
                    teacherId: [
                        {required: true, message: '请输入课程名称', trigger: 'change blur'}
                    ],
                    target: [
                        {required: true, message: '请输入学习目标', trigger: 'change blur'}
                    ],
                    content: [
                        {required: true, message: '请输入课程内容', trigger: 'change blur'}
                    ],
                    courseType: [
                        {type: 'array', required: true, message: '请选择课程分类', trigger: 'change'}
                    ],
                    technologyRelationList: [
                        {type: 'array', required: true, message: '请选择相关技术', trigger: 'change'}
                    ],
                    grade: [
                        {required: true, message: '请选择级别', trigger: 'change'}
                    ],
                    fit: [
                        {type: 'array', required: true, message: '请选择适合学生', trigger: 'change'}
                    ],
                    isFree: [
                        {required: true, message: '请选择课程类型', trigger: 'change'}
                    ],
                    cover: {required: true, message: '请上传课程封面', trigger: 'change'}
                }
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                levels (state) {
                    let dicList = (state['courseGradeDicList'] || {}).dicList || []
                    return dicList
                }
            })
        },
        components: {
            multiSelect
        },
        created () {
            this.requestCourseDetail()
            this.requestCategory()
            this.requestLevel('courseGrade')
        },
        methods: {
            ...mapActions('dictionaryCommon', {requestLevel: 'getDictComb'}),
            async requestCourseDetail () { // 修改课程，获取对应id课程的数据
                let id = this.$route.query.id
                if (id) {
                    let res = await requestBackendCourseInfo({id})
                    if (res.data.code === 200) {
                        this.editCourseData = res.data.entity || {}
                        this.initData()
                    }
                }
            },
            handleChange (file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            initData () { // 修改待审课程，初始化页面数据
                let _data = this.editCourseData
                if (_data.id) {
                    this.form.name = _data.name || ''
                    this.form.teacherId = _data.teacherId || ''
                    this.form.target = _data.target || ''
                    this.form.content = _data.content || ''
                    this.form.cover = _data.cover || ''
                    this.form.courseType = (_data.courseType || '').split('-')
                    this.form.technologyRelationList = (_data.technologyRelationList || []).map(item => item.technologyId)
                    this.form.grade = _data.grade || ''
                    this.form.fit = (_data.fit || '').split(',')
                    this.form.isFree = _data.isFree === null ? '' : _data.isFree
                }
            },
            nextStep () { // 跳转下一步
                this.$refs.stepFirstForm.validate(valid => {
                    if (valid && this.form.cover) { // 验证通过，跳转下一步
                        this.$emit('on-change-step', 2, this.form, this.editCourseData)
                    }
                })
            },
            requestCategory () { // 获取相关技术字典数据
                requestDictComb({
                    groupCode: 'technicalClassification'
                }).then(res => (res.data.code === 200) && (this.options.technologyRelationList = res.data.entity.dicList || []))
            },
            UploadFile (file, fileList) {
                 const fileSize = file.size,
                        fileName = file.name,
                        expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                        _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.form.cover = res.appendInfo.resourceId
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
                    _this.form.cover = null
                    uploader.cancelFile(file)
                }
            }
        }
    }
</script>

<style lang='scss'>
    .course-release-info .el-textarea__inner {
        height: 100%;
    }
</style>
<style lang='scss' scoped>
    @import '../../../../asset/scss/admin_projectForm.scss';
    @import '../../../../asset/scss/form.scss';

    .course-release-info .btn {
        box-sizing: border-box;
        width: 92px;
        height: 32px;
        line-height: 32px;
        margin-right: 20px;
        text-align: center;
        color: #d00;
        border: 1px solid #d00;
        padding: 0;
        &.btn-next {
            color: #fff;
            background-color: #d00;
        }
    }
</style>
