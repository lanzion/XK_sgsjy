<template>
    <div class="admin_infoPublish backend-content__middle">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-row>
                <el-form-item label="课题标题" prop="name">
                    <el-col :span="9">
                        <el-input placeholder="请输入申报指南标题" v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="申报时间"  prop="limit">
                    <el-col :span="9">
                        <el-date-picker v-model="form.limit" type="daterange" placeholder="选择日期范围" range-separator=" / " style="width:100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="发布单位"  prop="unit">
                    <el-col :span="9">
                        <el-input placeholder="当前用户所在单位" v-model="form.unit" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="课题级别"  prop="subjectLevel">
                    <el-col :span="9">
                        <el-select v-model="form.subjectLevel" placeholder="选择级别" filterable style="width:100%;">
                            <el-option v-for="item in subjectLevelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="指南内容" prop="content">
                    <el-col :span="23">
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="指导专家" prop="memberList" class="expert-tag">
                    <el-col :span="23">
                        <el-tag :key="index" v-for="(tag, index) in form.memberList" :closable="true" :close-transition="false" @close="delExperts(tag)">{{tag.name}}</el-tag>
                        <el-tag class="addExperts" @click.native="addExpertsPopup = true"> 添加 </el-tag>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="课题资源" prop="resourceList" class="resource">
                    <el-col :span="23">
                        <el-tag :key="index" v-for="(tag, index) in form.resourceList" :closable="true" :close-transition="false" @close="delresource(tag)">{{tag.name}}</el-tag>
                        <el-tag class="addExperts" @click.native="addResourcePopop = true"> 添加 </el-tag>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 附件 -->
            <el-row>
                <el-form-item label="附件">
                    <el-col :span="15">
                        <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{ standardFileSize }}M以内</span>
                        </el-upload>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="btn1 btn" type="button" @click="onSubmit('form')">保存</button>
                <button class="btn2 btn" type="button" @click="$router.push({path:'/space/subject/guide'})">取消</button>
            </el-form-item>
        </el-form>
        <!-- 添加专家 -->
        <el-dialog title="添加专家" :visible.sync="addExpertsPopup" size="tiny">
            <div class="func">
                <v-region-select @region="changeRegion" style="width:65%;display:inline-block;"></v-region-select>
                <el-input placeholder="搜索" icon="search" v-model="teacherParam.name" @click="getTeacherList(true)" style="width:30%;" class="fr" @keyup.native.enter="getTeacherList(true)"></el-input>
            </div>
            <div class="box">
                <el-checkbox-group v-model="checkedExperts" class="popupList">
                    <el-checkbox v-for="item in expertsList" :label="item.userId" :key="item.userId">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div class="load-more" v-if="teacherParam.totalNum > expertsList.length" @click="teacherParam.pageNum++; getTeacherList()">加载更多</div>
            </div>
            <div class="clearfix groupBtn">
                <button class="btn1 btn fr" type="button" @click="expertsChange();addExpertsPopup=false">确定</button>
                <button class="btn2 btn fr" type="button" @click="resetExperts();addExpertsPopup=false">取消</button>
            </div>
        </el-dialog>
        <!-- 课题资源 -->
        <el-dialog title="课题资源" :visible.sync="addResourcePopop" size="tiny">
            <div class="func">
                <el-input placeholder="搜索" icon="search" v-model="resourcesParam.name" @click="getResourse" @keyup.native.enter="getResourse"></el-input>
            </div>
            <div class="box">
                <el-checkbox-group v-model="checkedResource" class="popupList">
                    <el-checkbox v-for="item in resourceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div class="load-more" v-if="resourcesPage.totalNum > resourceList.length" @click="resourcesPage.pageNum++; getResourse()">加载更多</div>
            </div>
            <div class="clearfix groupBtn">
                <button class="btn1 btn fr" type="button" @click="resourceChange();addResourcePopop=false">确定</button>
                <button class="btn2 btn fr" type="button" @click="resetResource();addResourcePopop=false">取消</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import region from '@/components/common/select/region_select.vue' // 省市区下拉
import multiSelect from 'Common/select/multi_select.vue'
import { addSubject, detailSubject, modifySubject } from '@/service/admin_space.js'
import { requestBaseTeacher } from '@/service/admin_base.js'
import { requestAdminResourceList } from '@/service/resource.js'
import { mapState } from 'vuex'
    export default {
        name:'worksPublish',
        mixins: [uploadFileSize, editor],
        components:{
            'v-region-select': region,
            'multi-select':multiSelect
        },
        data () {
            return {
                // 申报指南表单
                form: {
                    name:'',
                    limit: [],
                    unit: this.$ls.get('loginInfo').userInfo.userName,
                    subjectLevel: '',
                    memberList: [],
                    resourceList: [],
                    content: ''
                },
                // 附件文件列表
                fileList: [],
                // 表单检验
                rules: {
                    name: [
                        { required: true, message: '请输入标题名称', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    limit: [
                        { required: true, message: '请选择申报时间', type: 'array' }
                    ],
                    unit: [
                        { required: true, message: '请选择用户所在单位', trigger: 'change' },
                        { max: 50, message: '不超过50字符', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'change' },
                        { max: 1000, message: '不超过1000字符', trigger: 'change' }
                    ],
                    memberList: [
                        { required: true, message: '请选择指导专家', type: 'array' }
                    ],
                    resourceList: [
                        { required: true, message: '请选择课题资源', type: 'array' }
                    ],
                    subjectLevel: [
                        { required: true, message: '请选择课题级别', trigger: 'change' }
                    ]
                },
                // 专家
                // 弹框开关
                addExpertsPopup: false,
                // 专家列表请求参数
                teacherParam: {
                    pageSize: 10,
                    pageNum: 1
                },
                // 选中专家
                checkedExperts: [],
                // 专家列表
                expertsList:[],
                // 课题资源弹框开关
                addResourcePopop: false,
                // 资源请求参数
                resourcesParam: {
                    name: null,
                },
                resourcesPage: {
                    pageSize: 20,
                    pageNum: 1
                },
                // 资源列表
                resourceList: [],
                // 选中资源
                checkedResource: [],
            }
        },
        mounted () {
            // 请求专家列表
            this.getTeacherList()
            // 请求资源列表
            this.getResourse()
            var self = this;
            this.initEditor()
            this.editor.onchange = function () {
                self.form.content = this.$txt.html();
            }
            if ( Boolean(this.$route.query.id) ) {
                detailSubject( { id: this.$route.query.id } ).then(res => {
                    res = res.data.entity
                    if ( res ) {
                        let form = this.form
                        form.name = res.title
                        form.limit = [new Date(res.startDate), new Date(res.endDate)]
                        form.subjectLevel = res.subjectLevel.toString()
                        this.editor.$txt.html(res.content)
                        form.content = res.content
                        form.memberList = res.memberList
                        form.resourceList = res.resourceList
                        this.fileList = res.attList.map(i => ({name: i.name, url: i.resourceId, status:'finished'}) )
                        this.resetExperts()
                        this.resetResource()
                    }
                })
            }
        },
        methods: {
            // 获取专家老师列表
            getTeacherList(isSearch) {
                if (isSearch) {
                    this.teacherParam.pageNum = 1
                }
                requestBaseTeacher(this.teacherParam).then(res => {
                    if (res.data.code == 200) {
                        let _data = res.data.entity || {},
                            _items = _data.resultData || []
                        if (isSearch) {
                            this.expertsList = []
                        }
                        this.expertsList.push(..._items)
                        this.teacherParam.totalNum = _data.totalNum
                    }
                })
            },
            // 获取资源列表
            getResourse() {
                requestAdminResourceList(this.resourcesParam, this.resourcesPage).then(res => {
                    if (res.data.code == 200) {
                        this.resourceList.push(...res.data.entity.resultData)
                        this.resourcesPage.totalNum = res.data.entity.totalNum
                    }
                })
            },
            resetExperts () {
                this.checkedExperts = this.form.memberList.map(x => x.userId)
            },
            // 选中专家老师
            expertsChange() {
                let _memberList = this.expertsList.filter(x => {
                    return this.checkedExperts.some(v => v == x.userId)
                });
                this.form.memberList = _memberList
            },
            // 移除专家
            delExperts (tag) {
                this.form.memberList.splice(this.form.memberList.indexOf(tag), 1)
                this.resetExperts()
            },
            // 选中课题资源资源
            resourceChange () {
                let _resourceList = this.resourceList.filter(x => {
                    return this.checkedResource.some(v => v == x.id)
                });
                this.form.resourceList = _resourceList
            },
            // 地区改变
            changeRegion(items) {
                this.teacherList = []
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                let obj = Object.assign(this.teacherParam, _region)
                this.$set(this.$data, 'teacherParam', obj)
                this.getTeacherList(true);
            },
            resetResource () {
                this.checkedResource = this.form.resourceList.map(x => x.resourceId)
            },
            // 移除课题资源
            delresource (tag) {
                this.form.resourceList.splice(this.form.resourceList.indexOf(tag), 1);
                this.resetResource()
            },
            // 移除附件文件
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            // 上传文件
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            _this.fileList.push({name: file.name, size: fileSize, url: res.appendInfo.resourceId})
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                    uploader.cancelFile(file)
                }
            },
            // 提交
            onSubmit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = this.form
                        let memberList = form.memberList.map(i => ({ userId : i.userId}) )
                        let resourceList = form.resourceList.map(i => ({ resourceId : i.id, name: i.name, fileSize: i.size}) )
                        let attList = this.fileList.map(i => ({ resourceId : i.url, name: i.name}) )
                        let data = {
                            title: form.name,
                            startDate: form.limit[0].getTime(),
                            endDate: form.limit[1].getTime(),
                            content: form.content,
                            status: 1,
                            jobId: this.$ls.get('baseInfo').baseInfo ? this.$ls.get('baseInfo').baseInfo.id : null,
                            jobType: this.$ls.get('userIdentity') == 'education' ? 1 : 2,
                            memberList: memberList,
                            resourceList: resourceList,
                            attList: attList,
                            subjectLevel: form.subjectLevel
                        }
                        if(data.jobId) {
                            if( !Boolean(this.$route.query.id) ) {
                                addSubject(data).then( res => {
                                    if(res.data.code === 200) {
                                        this.$message({
                                            showClose: true,
                                            message: '发布成功',
                                            type: 'success'
                                        })
                                        this.$router.go(-1)
                                    }
                                })
                            } else {
                                data.id = this.$route.query.id
                                modifySubject(data).then( res => {
                                    if(res.data.code === 200) {
                                        this.$message({
                                            showClose: true,
                                            message: '修改成功',
                                            type: 'success'
                                        })
                                        this.$router.go(-1)
                                    }
                                })
                            }
                        }else {
                            this.$message({message: '管理员不能发布指南'})
                        }
                    }else {
                        this.$message({
                            showClose: true,
                            message: '请按规则填写完整',
                            type: 'error'
                        });
                        return false;
                    }
                })
            }
        },
        computed: {
            // 级别数据
            ...mapState('dictionaryCommon', {
                subjectLevelOptions (state) {
                    let dicList = (state['subjectLevelDicList'] || {}).dicList || []
                    return dicList
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .btn {
            border: 1px solid $color-value;
        }
        .btn1 {
            background-color: $color-value;
            color: #fff;
        }
        .btn2 {
            color: $color-value;
        }
        .addExperts:hover {
            border: 1px solid $color-value;
            color: $color-value;
        }
    }
}
.admin_infoPublish{
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
      border-radius: 3px;
      cursor: pointer;
      overflow: hidden;
      height: 100px;
      background-color: #BFE0FA;
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
      color: #8c939d;
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
    .addExperts {
        &.addExperts {
            color: #dfdfdf;
            border: 1px solid #dfdfdf;
            display: inline-block;
        }
        position: relative;
        padding: 0 10px;
        text-indent: 1em;
        cursor: pointer;
        &::after {
            content: '+';
            position: absolute;
            top: 50%;
            left: 0;
            font-size: 1.5em;
            transform: translate(-15%, -50%);
        }
    }
    .func {
        padding: 12px;
        background-color: #F6F6F6;
        border: 1px solid #c9c9c9;
    }
    .box {
        height: 300px;
        overflow-y: auto;
        border: 1px solid #c9c9c9;
        border-top: none;
        padding: 20px;
    }
    .expert-tag {
        .el-tag + .el-tag {
            margin-left: 5px;
        }
    }
    .el-checkbox {
        display: block;
        line-height: 1.5;
        & + .el-checkbox{
            margin-top: 5px;
            margin-left: 0;
        }
    }
    .groupBtn {
        margin-top: 30px;
    }
    .popupList {
        height: 90%;
        overflow-y: auto;
    }
    .load-more {
        width: 100%;
        height: 10%;
        font-size: 12px;
        line-height: 2;
        background-color: #f0f0f0;
        cursor: pointer;
        text-align: center;
    }
}
.resource {
    .el-tag {
        border: none;
        display: block;
        color: #000;
    }
}
</style>

<style lang='scss'>
.admin_infoPublish{
    /* 编辑器高度 */
    .wangEditor-container .wangEditor-txt{
        height: 200px!important;
    }
}
i.el-icon-search::before {
    color: #44a5c6;
}
</style>