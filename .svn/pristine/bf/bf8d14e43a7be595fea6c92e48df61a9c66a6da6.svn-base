<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="140px" :rules="rules">
            <!-- 竞赛主题 -->
            <el-row>
                <el-form-item label="竞赛主题" prop="title">
                    <el-col :span="8">
                        <el-input v-model="form.title" placeholder="请输入竞赛主题" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 项目类别 -->
            <el-row>
                <el-form-item label="项目类别" prop="offlineProjectRelationDtosList">
                    <el-col :span="14">
                        <el-checkbox-group v-model="form.offlineProjectRelationDtosList">
                            <el-checkbox v-for="item in offlineProjectRelationDtosList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                        <router-link class="resource-name" v-if="!offlineProjectRelationDtosList.length" :to="{ path: `/contest-${$route.params.type}/event/add` }"><i class="icon-btn-add"></i>去添加</router-link>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 申报组别 -->
            <el-row>
                <el-form-item label="申报组别" prop="offlineDeclareRelationtDtosList">
                    <el-col :span="14">
                        <el-checkbox-group v-model="form.offlineDeclareRelationtDtosList">
                            <el-checkbox v-for="item in offlineDeclareRelationtDtosList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛封面 -->
            <el-row>
                <el-form-item label="竞赛封面" prop="cover">
                    <el-col :span="14">
                        <div id="v_picker">+</div>
                        <!-- <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover" :disabled="isReadOnly">
                            <img v-if="form.cover&&form.cover!=''" :src="getFileUrl(form.cover)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload> -->
                    </el-col>
                    <div class="tips" style="color:#8391a5;">
                        仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M。<br>
                        建议上传的图片像素为 1200 x 300
                    </div>
                </el-form-item>
            </el-row>
            <!-- 竞赛时间 -->
            <el-row>
                <el-form-item label="竞赛时间" prop="matchDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.matchDate" type="daterange" placeholder="请选择竞赛时间范围" :picker-options="matchDateOptions" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 报名时间 -->
            <el-row>
                <el-form-item label="报名时间" prop="enrollDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.enrollDate" type="daterange" placeholder="请选择报名时间范围" :picker-options="enrollDateOptions" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛评比 -->
            <el-row>
                <el-form-item label="竞赛评比" prop="offlinePhasesList">
                    <el-col :span="8">
                        <template v-if="isReadOnly">
                            <el-row class="phase-title">
                                <el-col :span="2">序号</el-col>
                                <el-col :span="8">评比阶段</el-col>
                                <el-col :span="14">评比时间</el-col>
                            </el-row>
                            <el-row :gutter="10" class="phase-list" v-for="(phase, index) in form.offlinePhasesList" :key="index">
                                <el-col :span="2">
                                    <span>{{index + 1}}</span>
                                </el-col>
                                <el-col :span="8">
                                    <el-input v-model.trim="phase.name" placeholder="阶段名称" :disabled="isReadOnly"></el-input>
                                </el-col>
                                <el-col :span="14">
                                    <el-date-picker v-model="phase.date" type="daterange" :picker-options="phaseDateOptions" :disabled="isReadOnly"></el-date-picker>
                                </el-col>
                            </el-row>
                        </template>
                        <template v-else>
                            <el-row class="phase-title">
                                <el-col :span="2">序号</el-col>
                                <el-col :span="6">评比阶段</el-col>
                                <el-col :span="13">评比时间</el-col>
                                <el-col :span="3">操作</el-col>
                            </el-row>
                            <el-row :gutter="10" class="phase-list" v-for="(phase, index) in form.offlinePhasesList" :key="index">
                                <el-col :span="2">
                                    <span>{{index + 1}}</span>
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model.trim="phase.name" placeholder="阶段名称"></el-input>
                                </el-col>
                                <el-col :span="13">
                                    <el-date-picker v-model="phase.date" type="daterange" :placeholder="`请选择阶段时间范围`" :picker-options="phaseDateOptions"></el-date-picker>
                                </el-col>
                                <el-col :span="3">
                                    <i class="handler icon-btn-delete" @click="deletePhaseItem(index)"></i>
                                </el-col>
                            </el-row>
                            <button type="button" class="phase-add" @click="appendPhaseItem">
                                <i class="icon icon-btn-add"></i> 添加
                            </button>
                        </template>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛详情 -->
            <el-row>
                <el-form-item label="竞赛详情" prop="details">
                    <el-col :span="15">
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="14">
                        <!-- <ul v-if="isReadOnly" class="el-upload-list el-upload-list--text">
                            <li class="el-upload-list__item" v-for="(file, index) in form.offlineAttachmentsList">
                                <a class="el-upload-list__item-name" :href="downloadUrl(file.resourceId, file.name)" :download="file.name">
                                    <i class="el-icon-document"></i>{{file.name}}
                                </a>
                            </li>
                        </ul>
                        <el-upload v-else class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
                        </el-upload> -->
                        <v-up-files
                            :auto="false"
                            :selectedList="attachmentList"
                            :listLength="attachmentList.length"
                            :ifStatus="ifStatus"
                            @fileSuccess="fileSuccess"
                            ></v-up-files>
                            <div class="fileTips">
                            <p>注：名称长度在30字以内， 单个文件大小不超过500M，一次性最多可上传10个文件</p>
                            </div>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { loginInfo } from 'Asset/js/getUserInfo.js'
import { editor } from '@/mixin/wangEditor.js'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { addContest, requestContestDetail, modifyContest, requestContestItem, requestContestGroup } from '@/service/admin_contest-offline.js'
// import region from '@/components/common/select/region_select.vue'
import axios from "axios";
import upFiles from "@/components/common/upFiles";
const fileUploadAddress = location.protocol + '//' + location.host
export default {
    name: 'contestOfflineManageAdd',   // 线下竞赛
    mixins: [uploadFileSize, editor],
    components: {
    "v-up-files": upFiles,
    // "v-up-image": upImage,
  },
    data() {
        var validateMatchDate = (rule, value, callback) => {
            value = value.filter(x => x)
            if (!value.length) {
                callback(new Error(`请选择竞赛时间范围`))
            } else if (value[0] < Date.now() - 8.64e7) {
                callback(new Error(`竞赛开始不能早于当前时间`))
            } else {
                if (this.form.enrollDate.length) {
                    this.$refs.form.validateField('enrollDate')
                }
                callback()
            }
        }
        var validateEnrollDate = (rule, value, callback) => {
            value = value.filter(x => x)
            let matchEndDate = this.params.matchEndDate
            if (!value.length) {
                callback(new Error(`请选择报名时间范围`))
            } else if (value[1] > matchEndDate) {
                callback(new Error(`报名截止时间不能晚于竞赛结束时间`))
            } else {
                callback()
            }
        }
        var validatePhaseList = (rule, value, callback) => {
            value = value.filter(x => x.name !== '' || x.date.filter(x => x).length)
            let flag = true
            for (let i = 1; i < value.length; i++) {
                if (value[i].name == '') {
                    callback(new Error(`阶段名称不能为空`))
                }
                if (!flag) break
                if (value[i].date[0] < value[i-1].date[1]) {
                    flag = false
                }
            }
            if (flag) {
                callback()
            } else {
                callback(new Error(`上级评比时间不能早于下级评比时间`))
            }
        }
        return {
            checkedProjectRelationList: [], // 已选竞赛项目
            reqProjectRelationList: [],     // 请求竞赛项目
            checkedDeclareRelationtDtosList: [], // 已选申报组别
            reqDeclareRelationtDtosList: [],     // 请求申报组别
            matchDateOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            // 表单数据
            form: {
                title: '',          // 竞赛主题
                offlineProjectRelationDtosList: [],
                offlineDeclareRelationtDtosList: [],      // 申报组别
                cover: null,        // 竞赛封面
                matchDate: [],      // 竞赛时间
                enrollDate: [],     // 报名时间
                details: '',        // 竞赛详情
                offlinePhasesList: [
                    { name: '', date: [], sort: '' },
                    { name: '', date: [], sort: '' },
                ],      // 竞赛评比
                offlineAttachmentsList: []  // 附件列表
            },
            isReadOnly: false,
            // 表单校验提示
            rules: {
                title: [
                    { required: true, message: '请输入竞赛主题', trigger: 'change' },
                    { max: 50, message: '请输入50字以内的竞赛主题', trigger: 'change' }
                ],
                offlineProjectRelationDtosList: [
                    { required: true, type: 'array', message: '请选择竞赛项目', trigger: 'change' }
                ],
                offlineDeclareRelationtDtosList: [
                    { required: true, type: 'array', message: '请选择申报组别', trigger: 'change' }
                ],
                cover: [
                    { required: true, message: '请上传竞赛封面', trigger: 'change' },
                ],
                matchDate: [
                    { required: true, type: 'array', message: '请选择竞赛时间范围', trigger: 'change' },
                    { validator: validateMatchDate, required: true, trigger: 'change' }
                ],
                enrollDate: [
                    { required: true, type: 'array', message: '请选择报名时间范围', trigger: 'change' },
                    { validator: validateEnrollDate, required: true, trigger: 'change' }
                ],
                offlinePhasesList: [
                    { required: true, validator: validatePhaseList, trigger: 'change' }
                ],
                details: [
                    { required: true, message: '请输入竞赛详情', trigger: 'blur' }
                ]
            },
            attachmentList: [],
            ifStatus: false,
        }
    },
    methods: {
        fileSuccess(data) {
            this.attachmentList = data;
            this.ifStatus = false;
        },
        UploadCover (file, fileList) {
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
        },
        UploadFile (file, fileList) {
            const fileSize = file.size,
                  _this = this
            if (fileSize < (_this.standardFileSize * 1024 * 1024) ) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if (res.code === 200) {
                        _this.form.offlineAttachmentsList.push({
                            name: file.name,
                            type: 1,
                            size: fileSize,
                            resourceId: res.appendInfo.resourceId,
                            documentId: res.appendInfo.resourceId
                        })
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                _this.$message({
                    message: `文件大小不超过${_this.standardFileSize}M`
                })
                _this.form.offlineAttachmentsList.splice(_this.form.offlineAttachmentsList.length, 1)
                uploader.cancelFile(file)
            }
        },
        handleRemove(file, fileList) {
            let _list = []
            fileList.forEach(x => {
                _list.push({
                    name: x.name,
                    type: 1,
                    resourceId: x.url
                })
            })
            this.form.offlineAttachmentsList = _list
        },
        //获取赛事详情
        getDetail(){
            requestContestDetail({id:this.form.id}).then((res) => {
                if (res.data.code === 200) {
                    let datas = res.data.entity,
                        _form = {}

                    if (this.isReadOnly) {
                        this.$set(this.$data, 'checkedProjectRelationList', datas.offlineProjectList)
                        this.$set(this.$data, 'checkedDeclareRelationtDtosList', datas.offlineDeclareList)
                    }
                    _form.id = datas.id
                    _form.title = datas.title || ''
                    _form.offlineProjectRelationDtosList = datas.offlineProjectList.map(x => { return x.id }) || []
                    _form.offlineDeclareRelationtDtosList = datas.offlineDeclareList.map(x => { return x.id }) || []
                    _form.cover = datas.cover || ''
                    _form.matchDate = [datas.matchStartDate, datas.matchEndDate]
                    _form.enrollDate = [datas.enrollStartDate, datas.enrollEndDate]
                    _form.details = datas.details || ''
                    _form.offlinePhasesList = []
                    datas.offlinePhasesList.forEach(x => {
                        const item = {
                            sort: x.sort,
                            name: x.name,
                            date: [x.startDate, x.endDate]
                        }
                        _form.offlinePhasesList.push(item)
                    })
                    _form.offlineAttachmentsList = datas.offlineAttachmentsList.map(x => {
                        let item = {
                            name: x.name,
                            type: x.type,
                            size: x.size,
                            resourceId: x.resourceId,
                            documentId: x.documentId
                        }
                        return item
                    })
                    this.attachmentList = datas.offlineAttachmentsList.map(x => ({
                        name: x.name,
                        urls: x.resourceId,
                        resourceId: x.resourceId,
                        businessId: x.businessId
                    }));
                    this.ifStatus = true;
                    if(_form.cover){
                        let url = fileUploadAddress + _form.cover
                        $('#v_picker').css({
                        'background-color':'none',
                        "background-image":'url('+url+')'
                    })
                    $('#v_picker .webuploader-pick').html('')
                    }
                    this.editor.$txt.html(datas.details)
                    this.$set(this.$data, 'form', _form)
                }
            })
        },
        // 获取竞赛项目列表
        getItemsData() {
            requestContestItem().then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.entity.resultData || []
                    this.reqProjectRelationList = _data
                }
            })
        },
        // 获取竞赛项目列表
        getGroupData() {
            requestContestGroup().then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.entity.resultData || []
                    this.reqDeclareRelationtDtosList = _data
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let flag = this.$route.query.id ? true : false,
                        handle = flag ? modifyContest : addContest,
                        handleText = flag ? '修改' : '添加'

                    handle(this.params).then( response => {
                        if (response.data.code == 200) {
                            this.$router.go(-1)
                            this.$message({
                                message: `${handleText}成功`,
                                type: 'success'
                            })
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        appendPhaseItem() {
            const item = { name: '', date: [], sort: '' }
            this.form.offlinePhasesList.push(item)
        },
        deletePhaseItem(index) {
            this.form.offlinePhasesList.splice(index, 1)
        }
    },
    created() {
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
            this.rules = {}
        }
        this.getItemsData()
        this.getGroupData()

        let _id = this.$route.query.id
        if(_id != undefined) {
            this.$set(this.form, 'id', _id)
            this.getDetail()
        }
    },
    mounted() {
        this.initEditor()
        let self = this
        this.editor.onchange = function () {
            self.form.details = this.$txt.html()
        }
        if (this.isReadOnly) {
            this.editor.disable()
        };
            var uploader = WebUploader.create({
        // swf文件路径
        swf:'../static/js/Uploader.swf',
        // 文件接收服务端。
        server: fileUploadAddress + '/file/authnw/fileUpload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#v_picker',
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        //是否开启自动上传
        auto:true
    });
    uploader.on( 'beforeFileQueued', function( file) {
      console.log('文件加入队前',file)
    });
    uploader.on( 'uploadError', function( file,res) {
       self.$message({ message: res.data.msg });
    });
    uploader.on( 'uploadSuccess', function( file,res ) {
      console.log('文件上传成功',file,res)
      if (res.status.value === 200) {
          self.form.cover = res.data.resourceId;
          $('#v_picker').css({
            'background-color':'none',
            "background-image":'url('+res.data.storeFilePath+')'
          })
          $('#v_picker .webuploader-pick').html('')
      }
    });
    $('#v_picker div').css({
      'width': '100%',
      'height':'100%',
      })
    $('#v_picker .webuploader-pick').css({
      'width': '100%',
      'height':'100%',
      'font-size':'40px',
      'text-align': 'center',
      'line-height': '100px',
      'color': '#999',
      })
    $('#v_picker input').css({display: 'none'});
    setTimeout(function(){
      $('#v_picker input').css({display: 'none'})  
    },100)
    },
    computed: {
        offlineProjectRelationDtosList: function() {
            let arr = [...this.checkedProjectRelationList, ...this.reqProjectRelationList],
                hash = {}
            arr = arr.reduce(function(item, next) {
                hash[next.id] ? '' : hash[next.id] = true && item.push(next)
                return item
            }, [])
            return arr
        },
        offlineDeclareRelationtDtosList: function() {
            let arr = [...this.checkedDeclareRelationtDtosList, ...this.reqDeclareRelationtDtosList],
                hash = {}
            arr = arr.reduce(function(item, next) {
                hash[next.id] ? '' : hash[next.id] = true && item.push(next)
                return item
            }, [])
            return arr
        },
        enrollDateOptions: function() {
            let matchEndDate = this.form.matchDate[1]
            return {
                disabledDate(time) {
                    let range = time.getTime() < Date.now() - 8.64e7
                    if (matchEndDate) {
                        range = time.getTime() < Date.now() - 8.64e7 || time.getTime() > matchEndDate
                    }
                    return range
                }
            }
        },
        phaseDateOptions: function() {
            let limitStartDate = this.form.enrollDate[1] || this.form.matchDate[0] || Date.now() - 8.64e7
            let limitEndDate = this.form.matchDate[1]
            return {
                disabledDate(time) {
                    let range = time.getTime() < Date.now() - 8.64e7
                    if (limitEndDate) {
                        range = time.getTime() <= limitStartDate || time.getTime() > limitEndDate
                    } else {
                        range = time.getTime() <= limitStartDate
                    }
                    return range
                }
            }
        },
        params: function() {
            let _params = Object.assign({}, this.form)
            _params.matchStartDate = _params.matchDate[0]
            _params.matchEndDate = _params.matchDate[1]
            _params.enrollStartDate = _params.enrollDate[0]
            _params.enrollEndDate = _params.enrollDate[1]
            _params.offlineProjectRelationDtosList = _params.offlineProjectRelationDtosList.length ? _params.offlineProjectRelationDtosList.map(x => { return { projectId: x }}) : []
            _params.offlineDeclareRelationtDtosList = _params.offlineDeclareRelationtDtosList.length ? _params.offlineDeclareRelationtDtosList.map(x => { return { declareId: x }}) : []
            _params.offlinePhasesList = _params.offlinePhasesList.length ? _params.offlinePhasesList.filter(x => x).map((x, i) => {
                return {
                    startDate: x.date[0],
                    endDate: x.date[1],
                    name: x.name,
                    sort: i
                }
            }) : []
       _params.offlineAttachmentsList = this.attachmentList.map(i => ({
            name: i.name,
            resourceId: i.resourceId,
            urls: i.urls,
            uid: i.uid,
            size: i.size
          }));
            delete _params.matchDate
            delete _params.enrollDate
            return _params
        },
        fileList: function() {
            let _list = []
            let fileList = this.form.offlineAttachmentsList || []
            fileList.forEach(x => {
                _list.push({
                    name: x.name,
                    url: this.getFileUrl(x.resourceId, {filetype: 'file'}),
                    status: 'finished'
                })
            })
            return _list
        }
    }
}
</script>

<style lang='scss' scoped>
    .hint {
        display: table;
        height: 36px;
        font-size: 12px;
        line-height: 1;
        color: #999;

        .icon-form-tip {
            padding-right: 4px;
            font-size: 14px;
            text-indent: 10px;
        }
    }
    .icon-btn-add {
        margin-right: 4px;
    }
    .el-upload-list {
        margin-top: -5px;
    }
    .phase-title {
        background-color: #dfdfdf;
        text-align: center;
    }
    .phase-list {
        margin: 10px 0;
        text-align: center;
        .phase-list-title {
            display: block;
            background-color: #eee;
        }
    }
    .phase-add {
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        border: 1px dashed #dfdfdf;
        background-color: #fff !important;
        color: #ccc;

        .icon-btn-add {
            vertical-align: text-top;
        }

        &:hover {
            &,
            .icon-btn-add {
                border-color: #2797ed;
                color: #2797ed;
            }
        }
    }
#v_picker{
  height: 100px;
  width: 100px;
  font-size: 40px;
  border: 1px dashed #92cdfa;
  background-color: #f5fafe;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  div:first-child{
    width: 100%;
    height: 100%;
    
  }
  /deep/ input{
    display: none !important;
  }
}
</style>