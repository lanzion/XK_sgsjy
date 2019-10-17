<template>
    <div class="apply" id="apply">
        <!-- <h2 class="title bgc_w">工作室</h2> -->
        <el-form ref="form" :model="form" label-width="100px" class="bgc_w p20">
            <!-- 姓名 -->
            <el-row>
                <el-form-item label="姓名">
                    <el-col :span="8">
                        <el-input placeholder="请输入姓名" v-model="form.name" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 性别 -->
            <el-row>
                <el-form-item label="性别">
                    <el-col :span="8">
                        <el-radio-group v-model="form.sex" disabled>
                            <el-radio v-for="item in sexList" :label="item.id" :key="item.id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 最高学历 -->
            <el-row>
                <el-form-item label="最高学历">
                    <el-col :span="8">
                        <el-select placeholder="请选择最高学历" disabled v-model="form.education" style="width:100%;">
                            <el-option v-for="item in educationOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 出生日期 -->
            <el-row>
                <el-form-item label="出生日期">
                    <el-col :span="8">
                        <el-date-picker v-model="form.birthday" disabled type="date" placeholder="选择出生日期" :picker-options="pickerOptions" style="width:100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 职称 -->
            <el-row>
                <el-form-item label="职称">
                    <el-col :span="8">
                        <el-select placeholder="请选择职称" disabled v-model="form.title" style="width:100%;">
                            <el-option v-for="item in titleOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 教龄 -->
            <el-row>
                <el-form-item label="教龄">
                    <el-col :span="8">
                        <el-input placeholder="请输入教龄" disabled v-model="form.teachAge"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作室名称 -->
            <el-row>
                <el-form-item label="工作室名称">
                    <el-col :span="8">
                        <el-input placeholder="请输入工作室名称" disabled :maxlength="30" v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 申请领域 -->
            <el-row>
                <el-form-item label="申请领域">
                    <el-col :span="10">
                        <multiSelect :selectData.sync='form.studioType' disabled :ifAll="false" :model="'studio'" :holder="'请选择领域'"></multiSelect>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作单位 -->
            <el-row>
                <el-form-item label="工作单位">
                    <el-col :span="10">
                        <el-input placeholder="请输入工作单位名称" disabled v-model="form.workUnit"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作简历 -->
            <el-row>
                <el-form-item label="工作简历">
                    <el-col :span="10">
                        <el-input type="textarea" :maxlength="300" disabled v-model="form.resume" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 申报理由 -->
            <el-row>
                <el-form-item label="申报理由">
                    <el-col :span="10">
                        <el-input type="textarea" :maxlength="3000" disabled v-model="form.reasons" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所获奖项 -->
            <el-row>
                <el-form-item label="所获奖项">
                    <el-col :span="10">
                        <el-input type="textarea" :maxlength="300" disabled v-model="form.prize" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作室构想 -->
            <el-row>
                <el-form-item label="工作室构想">
                    <el-col :span="10">
                        <el-input type="textarea" :maxlength="3000" disabled v-model="form.concept" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 其他说明 -->
            <el-row>
                <el-form-item label="其他说明">
                    <el-col :span="10">
                        <el-input type="textarea" :maxlength="500" disabled v-model="form.introductionOther" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 上传附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="10">
                        <el-upload class="upload-demo" disabled action :file-list="form.attachmentList" :before-upload="UploadFile" v-if="$route.path !== '/base/studio/detail'">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{standardFileSize}}M以内</span>
                        </el-upload>
                        <ul class="attList" v-else-if="form.attachmentList.length">
                            <li v-for="(i, k)  in form.attachmentList" class="attList_li"> <a :href="downloadUrl(i.resourceId, i.name)" :download="i.name" class="" title="下载">{{ i.name }} </a></li>
                        </ul>
                        <div v-else>
                            无附件
                        </div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="btn publish-btn" @click.prevent="$router.go(-1)" >返回</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapActions, mapState } from 'vuex'
    import multiSelect from '@/components/common/select/multi_select.vue'
    import { studioDetail } from '@/service/studio.js'
    export default {
        name:'studioDetail',
        mixins: [uploadFileSize],
        components:{
            multiSelect
        },
        data () {
            const checkAge = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入教龄'))
                }else if( /[^1234567890]+/g.test( value ) ) {
                    return callback(new Error('请输入数字'))
                }else {
                    callback()
                }
            };
            return {
                // 面包屑
                breadcrumb: [
                    { path: '/studioMember', title: '导师工作室' },
                    { path: '', title: '申请成立工作室' }
                ],
                // 出生日期限制
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7
                    }
                },
                // 上传文件方法挂载
                // fileUpload: fileUpload,
                // 上传文件大小
                fileSize: 1,
                // 表单
                form: {
                    // 名称
                    name: '',
                    sex: '',
                    // 学历
                    education: '',
                    // 出生日期
                    birthday: null,
                    // 职称
                    title: '',
                    // 教龄
                    teachAge: null,
                    // 领域
                    studioType: [],
                    // 工作单位
                    workUnit: '',
                    // 工作简历
                    resume: '',
                    // 申报理由
                    reasons: '',
                    // 所获奖项
                    prize: '',
                    // 工作室构想
                    concept: '',
                    // 其他说明
                    introductionOther: '',
                    attachmentList: [],
                    isSubmit: null
                }
            }
        },
        created(){
        },
        mounted () {
            this.getDictComb('education')
            this.getDictComb('title')
            // 登录账号类型
            this.userIdentity = this.$ls.get('userIdentity')
            if(this.$route.query.id != undefined){
                this.getStudioDetail()
            }
        },
        methods: {
            /*获取导师工作室详情*/
            getStudioDetail(){
                studioDetail({ id: this.$route.query.id }).then((res) => {
                    if(res.data.code === 200){
                        let _detail = res.data.entity;
                        let _form = this.form;
                        _form.name = _detail.createName;
                        _form.sex = _detail.sex
                        _form.education = _detail.education;
                        _form.birthday = new Date(_detail.birthday);
                        _form.title = _detail.title;
                        _form.teachAge = _detail.teachAge;
                        _form.studioType = _detail.studioType.split('-');
                        _form.workUnit = _detail.workUnit;
                        _form.resume = _detail.resume;
                        _form.reasons = _detail.reasons;
                        _form.prize = _detail.prize;
                        _form.concept = _detail.concept;
                        _form.introductionOther = _detail.introductionOther;
                        for(let i in _detail.attachmentList){
                            _form.attachmentList.push({type: 1, name: _detail.attachmentList[i].name, resourceId: _detail.attachmentList[i].resourceId, status:'finished'})
                        }
                    }
                })
            },
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            // 删除上传
            imgRemove(file, fileList) {
                this.form.imgList = fileList
            },
            videoRemove(file, fileList) {
                this.videoList = fileList
            },
            UploadFile (file, fileList) {
                const fileSize = file.size
                      _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            _this.form.attachmentList.push({ type: 1, name: file.name, resourceId: res.appendInfo.resourceId })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.form.attachmentList.splice(_this.form.attachmentList.length, 1)
                    this.$message({ message: `文件大小不超过${this.standardFileSize}M`})
                    uploader.cancelFile(file)
                }
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            }
        },
        computed: {
            // 涉及技术下拉数据
            ...mapState('dictionaryCommon', {
                educationOptions (state) {
                    let dicList = (state['educationDicList'] || {}).dicList || []
                    return dicList
                },
                titleOptions (state) {
                    let dicList = (state['titleDicList'] || {}).dicList || []
                    return dicList
                },
                sexList (state) {
                    let dicList = (state['sexDicList'] || {}).dicList || []
                    return dicList.filter(x => x.option)
                },
            })
        }
    }
</script>

<style lang='scss'>
#apply {
    .is-checked {

    }
    .el-textarea__inner{
        height: 100px;
        border-radius: 3px;
    }
    .el-input__inner{
        height: 38px;
        border-radius: 3px;
    }
    .el-input__icon{
        width: 10%;
    }
    .el-tag .el-icon-close:hover{
        background-color: #d00;
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
</style>

<style lang='scss' scoped>
$red: #20a0ff;
.p20 {
    padding: 20px;
}
.apply{
    font-size: 14px;
    box-sizing: border-box;
    .title {
        font-size: 1.14em;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #cacaca;
    }
    // 上传按钮
    .upload-btn{
        width: 90px;
        height: 38px;
        border: 1px solid #c9c9c9;
        border-radius: 2px;
        display: inline-block;
        margin-right: 10px;
        i{
            color: $red;
        }
    }
    // 发布、取消按钮

    .btn{
        padding: 0px 15px;
        height: 33px;
        line-height: 33px;
        border: 1px solid #20a0ff;
        color: #20a0ff;
        box-sizing: border-box;
        border-radius: 3px;
    }
    .publish-btn{
        background-color: #20a0ff;
        color: #fff;
        margin-right: 5px;
        border-radius: 3px;
    }
    .upload-tip{
        font-size: 12px;
    }
    .publish-btn:hover{
        opacity: 0.75;
    }
    .btn:hover{
        background-color: $red;
        color: #fff;
    }
    .attList {
        font-size: 14px;
        .attList_li {
            a {
                color: #0391D9;
            }
        }
    }
}
</style>
