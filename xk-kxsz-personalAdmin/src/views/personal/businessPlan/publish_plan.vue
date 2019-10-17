<template>
    <div class="planPublish backend-content__middle">
        <el-form ref="form" :model="form" label-width="105px" :rules="rules">
            <!-- 名称 -->
            <el-row>
                  <el-form-item label="策划名称" prop='name'>
                    <el-col :span="9">
                          <el-input :disabled="isPreview" placeholder="请输入策划名称，不超过50字" :maxlength="50" v-model="form.name"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 所属分类 -->
            <el-row>
                <el-form-item label="策划分类" prop='category'>
                    <el-col :span="9">
                        <el-select :disabled="isPreview" v-model="form.category" placeholder="请选择策划分类" style="width:100%;height:38px;">
                            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 封面 -->
            <el-row>
                <el-form-item label="策划封面" required style="position:relative;">
                    <el-col :span="14">
                        <el-upload :disabled="isPreview" class="psn-cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                            <img v-if="img" :src="img" class="psn-cover">
                            <i v-else class="el-icon-plus psn-cover-uploader-icon"></i>
                        </el-upload>
                        <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 融资金额（起） -->
            <el-row>
                  <el-form-item label="融资金额(起)" prop='startMoney'>
                    <el-col :span="9">
                          <el-input :disabled="isPreview" placeholder="请输入融资金额(起)，单位（元）" @change="startChange" v-model="form.startMoney" :maxlength="16"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 融资金额（止） -->
            <el-row>
                  <el-form-item label="融资金额(止)" prop='endMoney'>
                    <el-col :span="9">
                          <el-input :disabled="isPreview" placeholder="请输入融资金额(止)，单位（元）" @change="endChange" v-model="form.endMoney" :maxlength="16"></el-input>
                    </el-col>
                  </el-form-item>
            </el-row>
            <!-- 地区 -->
            <el-row>
                <el-form-item label="地区" prop="region">
                    <el-col :span="9">
                        <el-input v-model="form.region" v-show="false"></el-input>
                        <xk-region-pub-select :disabled="isPreview" :defaultItems="regionArr" @region="selectRegion"></xk-region-pub-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 详细地址 -->
            <el-row>
                <el-form-item label="详细地址" prop='adress'>
                    <el-col :span="9">
                        <el-input :disabled="isPreview" placeholder="请输入详细地址" v-model="form.adress"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 相关作品 -->
            <el-row>
                <el-form-item label="相关作品" prop='works'>
                    <el-col :span="9">
                        <el-select :disabled="isPreview" v-model="form.works" filterable  placeholder="请选择相关作品" style="width:100%;height:38px;">
                            <el-option v-for="item in relatedWorks" :key="item.id" :label="item.workName" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
              <!-- 详情 -->
            <el-row>
                <el-form-item label="策划描述" prop='descriptionText' style="position:relative;">
                    <el-col :span="23">
                        <el-input v-model="form.descriptionText" v-show="false"></el-input>
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                    <div style="position:absolute;font-size:12px;bottom:-27px;color:#ff4949;" v-if="isToMuch">
                          输入内容过多
                    </div>
                </el-form-item>
            </el-row>
            <!-- 简介 -->
              <el-row>
                  <el-form-item label="策划备注" prop="remark">
                      <el-col :span="23">
                        <el-input :disabled="isPreview" type="textarea" :maxlength="300" v-model="form.remark" placeholder="请输入策划备注，300字以内" style="height: 100px;"></el-input>
                    </el-col>
                  </el-form-item>
              </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="psn-confirm-btn" @click.prevent="onSubmit(-1)" type="button">保存</button>
                <button class="psn-confirm-btn" @click.prevent="onSubmit(0)" type="button">提交审核</button>
                  <button class="psn-cancel-btn" @click.prevent="$router.push({name:'adminPlan'})">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { publishPlan, modifyPlan, requestPlanDetail } from '@/service/businessPlan.js'
    import { requestBackendWorksList } from '@/service/works.js'
    import { requestDictComb } from '@/service/common.js'
    // import regionSelect from 'Common/select/region_pub_select.vue'

    export default {
        name: 'planPublish',
        mixins: [uploadFileSize, editor],
        // components: {
        //     regionSelect
        // },
        data() {
            const validContent = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error('请输入策划详情'))
                } else {
                    callback()
                }
            }
            const validNum = (rule, value, callback) => {
                const regular = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
                if (!regular.test(value)) {
                    callback(new Error('请输入正确的金额格式,如：12 ; 0.12 ; 12.00'))
                } else {
                    callback()
                }
            }
            const validStartMoney = (rule, value, callback) => {
                if (this.form.endMoney && parseFloat(value) >= parseFloat(this.form.endMoney)) {
                    callback(new Error('该金额必须小于结束金额'))
                } else {
                    callback()
                }
            }
            const validEndMoney = (rule, value, callback) => {
                if (this.form.startMoney && parseFloat(value) <= parseFloat(this.form.startMoney)) {
                    callback(new Error('该金额必须大于起始金额'))
                } else {
                    callback()
                }
            }
            return {
                // 图片
                imgSize: 2,
                // 表单
                form: {
                    name: '',
                    category: '',
                    cover: '',
                    startMoney: null,
                    endMoney: null,
                    region: '',
                    adress: '',
                    works: '',
                    description: '',
                    descriptionText: '',
                    remark: ''
                },
                regionArr: [],
                // 策划类型
                categoryList: [],
                // 相关作品
                relatedWorks: [],
                userIdentity: '',
                // 表单检验
                rules: {
                    name: [
                        { required: true, message: '请输入策划名称', trigger: 'change' },
                        { max: 50, message: '不超过50字符', trigger: 'change' }
                    ],
                    category: [
                        { required: true, message: '请选择策划分类', trigger: 'change' }
                    ],
                    startMoney: [
                        { required: true, message: '请输入金额' },
                        { validator: validNum },
                        { validator: validStartMoney, trigger: 'change' }
                    ],
                    endMoney: [
                        { required: true, message: '请输入金额' },
                        { validator: validNum },
                        { validator: validEndMoney, trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择地区', trigger: 'change' }
                    ],
                    adress: [
                        { required: true, message: '请输入地址', trigger: 'change' }
                    ],
                    works: [
                        { required: true, message: '请选择相关作品', trigger: 'change' }
                    ],
                    descriptionText: [
                        { validator: validContent, trigger: 'change' }
                    ],
                    remark: [
                        { required: true, trigger: 'blur', message: '请输入策划备注' },
                        { max: 300, message: '备注不超过300字符', trigger: 'change' }
                    ]
                },
                isToMuch: false,
                img: '',
                userId: '',
                isPreview: false
            }
        },
        created() {
            this.isPreview = this.$route.path.includes('preview')
            // 登录账号类型
            if (this.$ls.get('loginInfo')) {
                this.userIdentity = this.$ls.get('userIdentity')
                this.userId = this.$ls.get('loginInfo').userInfo.id
            }
            this.getCategoryList()
            this.getRelatedWorksList()
        },
        mounted() {
            const self = this
            this.initEditor()
            if (this.isPreview) {
                this.editor.disable()
            }
            this.editor.onchange = function () {
                if (this.$txt.length > 300) {
                    self.isToMuch = true
                } else {
                    self.isToMuch = false
                }
                self.form.description = this.$txt.html()
                self.form.descriptionText = this.$txt.text().trim().length || this.$txt.find('img').length
            }
            if (this.$route.query.id !== undefined) {
                requestPlanDetail({ id: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _form = this.form
                        const detail = res.data.entity
                        this.regionArr = [detail.provinceId, detail.cityId, detail.areaId]
                        _form.name = detail.name
                        _form.category = detail.category
                        _form.cover = detail.cover
                        _form.startMoney = detail.startMoney
                        _form.endMoney = detail.endMoney
                        _form.adress = detail.address
                        _form.works = detail.workId
                        _form.region = [detail.provinceId, detail.cityId, detail.areaId].join(',')
                        _form.description = detail.description
                        _form.remark = detail.remark
                        _form.id = detail.id
                        this.editor.$txt.html(detail.description)
                        _form.descriptionText = this.editor.$txt.text().trim().length || this.editor.$txt.find('img').length
                        this.img = this.getFileUrl(detail.cover)
                    }
                })
            }
        },
        methods: {
            UploadFile(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.cover = res.appendInfo.resourceId
                                _this.img = _this.getFileUrl(res.appendInfo.resourceId)
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (files, reason) {
                            _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
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
                    _this.img = _this.getFileUrl(null)
                    uploader.cancelFile(file)
                }
            },
            // 选择区域
            selectRegion(val) {
                this.form.region = val.join(',')
            },
            // 获取分类列表
            getCategoryList() {
                requestDictComb({ groupCode: 'businessPlanCategory' }).then((res) => {
                    if (res.data.code === 200) {
                        this.categoryList = res.data.entity.dicList
                    }
                })
            },
            // 获取相关作品列表
            getRelatedWorksList() {
                requestBackendWorksList({ auditStatusTeaOrStu: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        this.relatedWorks = res.data.entity.resultData
                    }
                })
            },
            onSubmit(isSubmit) {
                const msg = isSubmit === 0 ? '已提交审核' : '保存成功'
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const form = this.form
                        const region = this.form.region.split(',')
                        const data = {
                            name: form.name,
                            category: form.category,
                            cover: form.cover,
                            startMoney: form.startMoney,
                            endMoney: form.endMoney,
                            provinceId: region[0],
                            cityId: region[1],
                            areaId: region[2],
                            address: form.adress,
                            workId: form.works,
                            description: form.description,
                            remark: form.remark.replace(/[\r\n]/g, ''),
                            isSubmit: isSubmit === 0 ? 1 : 0,
                            createId: this.userId,
                            auditStatus: isSubmit,
                        }
                        if (this.$route.query.id !== undefined) {
                            data.id = this.$route.query.id
                            modifyPlan(data).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', msg)
                                    this.$router.push({ name: 'adminPlan' })
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        } else {
                            publishPlan(data).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', msg)
                                    this.$router.push({ name: 'adminPlan' })
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            /* 去掉非数字的字符 */
            moneyFormat(val, type) {
                // 先把非数字的都替换掉，除了数字和.
                val = val.replace(/[^\d.]/g, '')
                // 必须保证第一个为数字而不是.
                val = val.replace(/^\./g, '')
                // 保证只有出现一个.而没有多个.
                val = val.replace(/\.{2,}/g, '.')
                // 保证.只出现一次，而不能出现两次以上
                val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
                const self = this
                if (type === 'start') {
                    window.setTimeout(function () {
                        self.form.startMoney = val
                    }, 50)
                } else {
                    window.setTimeout(function () {
                        self.form.endMoney = val
                    }, 50)
                }
            },
            startChange(val) {
                this.moneyFormat(val, 'start')
            },
            endChange(val) {
                this.moneyFormat(val, 'end')
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.planPublish{
    min-height: 820px;
    font-size: 14px;
    // 封面上传
    .cover-uploader{
          border: 1px dashed #fdbcba;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          height: 100px;
          width: 100px;
          background-color: #fff9f9;
    }
    .tips {
        height: 100px;
        line-height: 100px;
        margin-left: 20px;
    }
    .cover-uploader .el-upload:hover {
          border-color: #20a0ff;
    }
    .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
    }
    .cover {
          width: 100px;
          height: 100px;
          display: block;
    }
    // 发布、取消按钮

    .btn{
        padding: 0px 20px;
        height: 32px;
        line-height: 32px;
        border: 1px solid $theme_color;
        color: $theme_color;
        margin-left: 5px;
        box-sizing: border-box;
    }
    .save-btn{
        padding: 0px 20px;
        height: 34px;
        line-height: 34px;
        background-color: $theme_color;
        color: #fff;
        margin-left: 5px;
    }
    .upload-tip{
        font-size: 12px;
    }
    .save-btn:hover{
        opacity: 0.75;
    }
    .btn:hover{
        background-color: $theme_color;
        color: #fff;
    }
}
</style>

<style lang="scss">
    .planPublish{
        .el-textarea__inner{
            height: 100px;
        }
        .el-input__inner{
            height: 38px;
        }
        .el-input__icon{
            width: 10%;
        }
    }
</style>
