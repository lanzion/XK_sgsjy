<template>
    <div class="admin-add__box backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 链接名称 -->
            <el-row>
                <el-form-item label="链接名称" prop="linkName">
                    <el-col :span="8">
                        <el-input placeholder="请输入链接名称" v-model="form.linkName"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属栏目 -->
            <el-row>
                <el-form-item label="所属栏目" prop="linkType">
                    <el-col :span="8">
                        <el-select v-model="form.linkType" placeholder="请选择所属栏目" style="width:100%;">
                            <el-option
                                v-for="item in linkTypeDL"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 链接地址 -->
            <el-row>
                <el-form-item label="链接地址" prop="linkUrl">
                    <el-col :span="8">
                        <el-input placeholder="请输入链接地址" v-model="form.linkUrl"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 状态 -->
            <el-row>
                <el-form-item label="状态" prop="status">
                    <el-col :span="8">
                        <el-switch v-model="linkStatus" on-text="" off-text=""></el-switch>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 打开类型 -->
            <el-row>
                <el-form-item label="打开类型" prop="targetType">
                    <el-col :span="8">
                        <el-radio-group v-model="form.targetType">
                            <el-radio :label="1">新页面打开</el-radio>
                            <el-radio :label="0">当前页面打开</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 链接说明 -->
            <el-row>
                <el-form-item label="链接说明" prop="linkDesc">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.linkDesc" placeholder="请输入链接说明"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 链接图片 -->
            <el-row>
                <el-form-item label="链接图片" prop="linkImg">
                    <el-col :span="14">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                            <img v-if="form.linkImg && form.linkImg!=''" :src="getFileUrl(form.linkImg)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="bs-search-button i-form-button" type="button" @click="onSubmit('form')">{{ form.id?'保存':'发布'}}</button>
                <button class="bs-search-button i-form-button is-plain" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import { fileUpload } from '@/js/common-config.js'
    import { addLink, requestLinkDetail, modifyLink } from '@/service/admin_space.js'
    // import dataTranslation from '@/js/dataTranslation.js'

    export default {
        name:'addLink',
        mixins: [uploadFileSize],
        data () {
            var validateLink = (rule, value, callback) => {
                let regular = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
                if (value === '') {
                    callback(new Error('请输入链接地址'));
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确完整的Url地址，如：http://www.baidu.com'));
                } else {
                    callback();
                }
            };
            return {
                fileUpload: fileUpload,
                linkStatus: true,
                form: {
                    linkName: '',
                    linkUrl: null,
                    linkType: null,
                    linkImg: null,
                    linkDesc: '',
                    targetType: '1',
                    status: 1
                },
                rules: {
                    linkName: [
                        { required: true, message: '请输入链接名称', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    linkType: [
                        { required: true, message: '请选择所属栏目', trigger: 'change' }
                    ],
                    linkUrl: [
                        { validator: validateLink, required: true, trigger: 'change' }
                    ]
                },
                img: ''
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                linkTypeDL (state) {
                    let dicList = (state['linkTypeDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            'form.status': function() {
                return this.linkStatus ? 1 : 0
            }
        },
        created () {
            this.getDictComb("linkType")
            let _id = this.$route.query.id;
            if(_id != undefined) {
                this.$set(this.$data.form, 'id', _id)
                this.getLinkDetail()
            }
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                            if (res.code === 200) {
                                _this.form.linkImg = res.appendInfo.resourceId
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
                    _this.form.linkImg = null
                    uploader.cancelFile(file)
                }
            },
            // 获取资讯详情
            getLinkDetail() {
                requestLinkDetail({id: this.form.id}).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _form = {
                            id: _data.id,
                            linkName: _data.linkName,
                            linkUrl: _data.linkUrl,
                            linkType: _data.linkType,
                            linkImg: _data.linkImg,
                            linkDesc: _data.linkDesc,
                            targetType: _data.targetType,
                            status: _data.status
                        }
                        this.linkStatus = (_data.status ? _data.status : 1) == 1 ? true : false
                        this.form = _form
                    }
                })
            },
            // 添加/修改
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let handler = this.form.id ? modifyLink : addLink,
                            txt = this.form.id ? '修改' : '发布'
                        handler(this.form).then(response => {
                            if (response.data.code === 200) {
                                this.$router.go(-1)
                                this.$message({
                                    showClose: true,
                                    message: `${txt}成功`,
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
.admin-add__box{
    min-height: 820px;
    font-size: 14px;
    .cover {
      width: 100px;
      height: 100px;
      display: block;
    }
    .upload-tip{
        font-size: 12px;
    }
    .cover-uploader{
        position: relative;
        border: 1px dashed #92cdfa;
        cursor: pointer;
        overflow: hidden;
        height: 100px;
        background-color: #f5fafe;
    }
    .tips {
        position: absolute;
        left: 120px;
        height: 100px;
        line-height: 100px;
        width: 400px;
    }
    .cover-uploader-icon {
        font-size: 18px;
        color: #666;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .upload-btn{
        width: 90px;
        height: 38px;
        border: 1px solid #c9c9c9;
        border-radius: 2px;
        display: inline-block;
        margin-right: 10px;
        i{
            color: #d00;
        }
    }
    .btn {
        width: 92px;
        height: 32px;
        margin-right: 10px;
        font-size: 14px;
    }
}
</style>