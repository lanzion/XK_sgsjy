<template>
    <div class="worksPublish backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 作品名称 -->
            <el-row>
                  <el-form-item label="作品名称" prop='name'>
                    <el-col :span="9">
                          <el-input :disabled="isPreview" placeholder="请输入作品名称，不超过30字" v-model.trim="form.name" :maxlength="30"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 所属分类 -->
            <el-row>
                <el-form-item label="作品分类" prop='worksType'>
                    <el-col :span="9">
                        <multi-select :disabled="isPreview" style="width:100%;display:inline-block;" :selectData.sync="form.worksType" :ifAll='false' :model='"works"'></multi-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 涉及技术 -->
            <el-row>
                <el-form-item label="涉及技术" prop='technologyType'>
                    <el-col :span="9">
                        <el-select :disabled="isPreview" multiple placeholder="请选择涉及的技术" v-model="form.technologyType" style="width:100%;">
                              <el-option v-for="item in technologyTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="作品介绍" prop='introduction'>
                    <el-col :span="23">
                        <el-input :disabled="isPreview" v-model="form.introduction" type="textarea" :rows="7" resize='none' :maxlength="500"></el-input>
                        <!-- <div id="editor-trigger" style="height: 200px"></div> -->
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 上传作品图片 -->
            <el-row>
                <el-form-item label="作品图片" prop="worksListArr">
                    <el-row>
                        <el-checkbox-group v-model="form.worksListArr" v-show="false"></el-checkbox-group>
                        <el-upload action="localhost:70" list-type="picture-card" :before-upload="UploadCover" :on-remove="imgRemove" :file-list="form.worksListArr" :disabled="form.worksListArr.length > 4">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-row>
                    <el-row style="color:#999;font-size: 12px;line-height: 2;">
                        最多五张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M。<br>
                        建议上传的图片像素为 738 x 313
                    </el-row>
                    <!-- <el-col :span="15">
                        <el-checkbox-group v-model="form.imgList" v-show="false"></el-checkbox-group>
                        <el-upload :disabled="isPreview || form.imgList.length > 4" class="upload-demo" action :file-list="form.imgList" :on-remove="imgRemove" :before-upload="UploadCover">
                          <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                          <span slot="tip" class="upload-tip">可上传多张图片，最多5张，图片大小大小在 {{ imgStandardFileSize }} M以内</span>
                        </el-upload>
                    </el-col> -->
                </el-form-item>
              </el-row>
              <!-- 上传作品视频 -->
            <el-row>
                  <el-form-item label="作品视频">
                    <el-col :span="15">
                        <el-checkbox-group v-model="form.videoList"></el-checkbox-group>
                          <el-upload :disabled="isPreview" class="upload-demo" v-bind:class="{'list-disabled': isPreview}" action :file-list="form.videoList" :on-remove="videoRemove" :before-upload="UploadFile">
                          <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                          <span slot="tip" class="upload-tip">上传单个视频，大小在{{standardFileSize}}M以内</span>
                        </el-upload>
                    </el-col>
                  </el-form-item>
              </el-row>
              <!-- 可评范围 -->
            <el-row v-if="userIdentity === 'student'">
                <el-form-item label="可见范围" prop='openRange'>
                    <el-col :span="20">
                        <el-radio-group :disabled="isPreview" v-model="form.openRange">
                            <el-radio v-for="item in openRangeOptions" :label="item.value" :key="item.value">{{item.name}}
                            </el-radio>
                          </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item v-if="isPreview">
                <button class="psn-cancel-btn" @click.prevent="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="psn-confirm-btn" @click.prevent="onSubmit(1)" type="button">提交审核</button>
                <button class="psn-confirm-btn" @click.prevent="onSubmit(0)" type="button">保存</button>
                <button class="psn-cancel-btn" @click.prevent="$router.push({path:'/admin/works/audited'})">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // import { editor } from '@/mixin/wangEditor.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapActions, mapState } from 'vuex'
    import multiSelect from 'Common/select/multi_select.vue'
    import { requestWorksPublish, requestWorksDetails, worksEvaluationModify } from '@/service/works.js'

    export default {
        name: 'worksPublish',
        mixins: [uploadFileSize],
        components: {
            'multi-select': multiSelect
        },
        data() {
            return {
                // 图片
                imgSize: 2,
                // 视频
                videoSize: 10,
                // 表单
                form: {
                    // 作品名称
                    name: '',
                    // 作品分类
                    worksType: [],
                    // 涉及技术
                    technologyType: [],
                    // 作品介绍
                    introduction: '',
                    imgList: [],
                    worksListArr: [],
                    videoList: [],
                    openRange: ''
                },
                // 共享类型
                openRangeOptions: [
                    { value: '1', name: '仅本人可见' },
                    { value: '2', name: '本班可见' },
                    { value: '3', name: '本校可见' },
                    { value: '4', name: '本区县可见' },
                    { value: '5', name: '本市可见' },
                    { value: '6', name: '本省可见' },
                    { value: '7', name: '所有可见' },
                ],
                userIdentity: '',
                // 表单检验
                rules: {
                    name: [
                        { required: true, message: '请输入作品名称', trigger: 'change' },
                        { max: 29, message: '不超过30字', trigger: 'change' }
                    ],
                    worksType: [
                        { required: true, message: '请选择作品分类', type: 'array' }
                    ],
                    technologyType: [
                        { required: true, message: '请选择涉及的技术', type: 'array' }
                    ],
                    introduction: [
                        { required: true, message: '请输入作品介绍', trigger: 'change' }
                    ],
                    openRange: [
                        { required: true, message: '请选择共享类型', trigger: 'change' }
                    ],
                    imgList: { required: true, message: '请上传作品图片', type: 'array' },
                    isPreview: false
                }
            }
        },
        created() {
            this.isPreview = this.$route.path.includes('preview')
            // 请求涉及技术下拉
            this.getDictComb('technicalClassification')
            // 登录账号类型
            this.userIdentity = this.$ls.get('userIdentity')
        },
        mounted() {
            if (this.$route.query.id !== undefined) {
                requestWorksDetails({ id: this.$route.query.id }).then((res) => {
                    const _form = res.data.entity
                    const form = this.form
                    form.name = _form.workName
                    form.worksType = _form.workType.split('-')
                    form.technologyType = _form.technologyType
                    form.introduction = _form.introduction
                    _form.workResource.forEach((i) => {
                        if (i.resourceType === 1) {
                            form.imgList.push({ name: i.name, url: i.resourceId })
                            form.worksListArr.push({ name: i.name, url: this.getFileUrl(i.resourceId) })
                        } else {
                            form.videoList.push({ name: i.name, url: i.resourceId })
                        }
                    })
                    form.openRange = _form.openRange
                })
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            // 删除上传
            imgRemove(file, fileList) {
                const url = file.url
                this.form.worksListArr = fileList
                for (let i = 0; i < this.form.imgList.length; i++) {
                    if (url.includes(this.form.imgList[i].url)) {
                        this.form.imgList.splice(i, 1)
                        break
                    }
                }
            },
            videoRemove(file, fileList) {
                this.videoList = fileList
            },
            UploadCover(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.imgList.push({ name: files.name, url: res.appendInfo.resourceId })
                            _this.form.worksListArr.push({ name: fileName, url: _this.getFileUrl(res.appendInfo.resourceId) })
                        }
                    })
                } else {
                    _this.form.imgList.splice(_this.form.imgList.length, 1)
                    _this.form.worksListArr.splice(_this.form.worksListArr.length, 1)
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadFile(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if ((/(mp4)$/i.test(expandName)) && (fileSize < _this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.videoList = [{ name: files.name, url: res.appendInfo.resourceId }]
                        }
                    })
                } else {
                    _this.form.videoList.splice(_this.form.videoList.length, 1)
                    if (!/(mp4)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的视频' })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.standardFileSize}M`
                        })
                    }
                    uploader.cancelFile(file)
                }
            },
            onSubmit(isSubmit) {
                this.$set(this.rules, 'imgList', { required: true, message: '请上传作品图片', type: 'array' })
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const form = this.form
                        const imgList = form.imgList.map(i => ({ name: i.name, resourceType: '1', resourceId: i.url }))
                        const videoList = form.videoList.map(i => ({ name: i.name, resourceType: '2', resourceId: i.url }))
                        const resourceList = [...imgList, ...videoList]
                        const data = {
                            workName: form.name,
                            workType: form.worksType.join('-'),
                            technologyIds: form.technologyType,
                            introduction: form.introduction,
                            workResource: resourceList,
                            openRange: form.openRange,
                            workTypeParent: form.worksType[0],
                            isSubmit: isSubmit
                        }

                        if (this.$route.query.id !== undefined) {
                            data.id = this.$route.query.id
                            worksEvaluationModify(data).then((res) => {
                                if (res.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                    this.$router.push({ path: '/admin/works/audited' })
                                } else {
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        } else {
                            requestWorksPublish(data).then((res) => {
                                if (res.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '发布成功',
                                        type: 'success'
                                    })
                                    this.$router.push({ path: '/admin/works/audited' })
                                } else {
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }
                    }
                })
            }
        },
        computed: {
            // 涉及技术下拉数据
            ...mapState('dictionaryCommon', {
                technologyTypeOptions(state) {
                    const dicList = (state.technicalClassificationDicList || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
.worksPublish{
    min-height: 820px;
    font-size: 14px;
    // 上传按钮
    .upload-btn{
        width: 90px;
        height: 38px;
        border: 1px solid #c9c9c9;
        border-radius: 2px;
        display: inline-block;
        margin-right: 10px;
        i{
            color: $default-color;
        }
    }
    // 发布、取消按钮
    .publish-btn{
        background-color: $default-color;
        color: #fff;
        margin-left: 5px;
    }
    .upload-tip{
        font-size: 12px;
    }
    .publish-btn:hover{
        opacity: 0.75;
    }
    .btn{
        margin-left: 5px;
        border: 1px solid $default-color;
        box-sizing: border-box;
        background-color: #fff;
        color: $default-color;
    }
    .btn:hover{
        background-color: $default-color;
        color: #fff;
    }
    .el-textarea__inner{
        height: 100px;
    }
    .el-input__inner{
        height: 38px;
    }
    .el-input__icon{
        width: 10%;
    }
    .el-tag .el-icon-close:hover{
        background-color: $default-color;
    }
    .el-select .el-tag{
        margin-left: 5px;
    }
    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
        position: absolute;
        top: 5px;
        right: 10px;
    }
    .el-cascader{
        width: 100%;
    }
}

// 确认按钮
.psn-confirm-btn {
    padding: 6px 15px;
    font-size: 14px;
    color: #fff;
    background-color: $default-color;
    border-radius: 3px;
    margin-right: 10px;
    // line-height: 1;
    &:hover {
        opacity: 0.75
    }
}

// 取消按钮
.psn-cancel-btn {
    padding: 5px 14px;
    border: 1px solid $default-color;
    color: $default-color;
    font-size: 14px;
    border-radius: 3px;
    margin-right: 10px;
    // line-height: 1;
    &:hover {
        background-color: $default-color;
        color: #fff;
    }
}

// 上传按钮
.psn-upload-btn{
    width: 96px;
    height: 38px;
    line-height: 38px;
    border:1px solid #ccc;
    padding: 8px;
    margin-right: 15px;
    cursor: pointer;
    i{
        font-size: 14px;
        color: $default-color;
    }
    &:hover {
        border-color: $default-color;
        color: $default-color;
    }
}

// 上传封面
.psn-cover-uploader{
  position: relative;
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
  height: 100px;
  border: 1px dotted #23b8ff;
  background-color: #def5ff;
}
.psn-cover-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.psn-cover {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
