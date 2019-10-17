<template>
    <div class="studioArticle container clearfix">
        <div class="content-left bgw fl">
            <side-tabs :typeNum="typeNum" @callback="changeType" @resList="resList"></side-tabs>
        </div>
        <div class="content-right bgw fr">
            <div class="search-box clearfix">
                <button type="button" v-if="hasPermissions" class="fr publish" @click="pubVisible = true">发布成果</button>
                <v-search tips="请输入文章标题" @search="getSearch" class="fr"></v-search>
            </div>
            <ul class="res-list" v-if="items.length > 0">
                <li class="list-item clearfix" v-for="(item,index) in items">
                    <div class="fl title-box">
                        <i class="fl" :class="{'icon-file-text': item.fileType == 1, 'icon-file-video': item.fileType == 2, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
                        <router-link :to="{ path:`/studioMemberDetail/articleDetail/${typeNum}`, query: { id: item.id, orgId: $route.query.id } }" class="fl title">{{item.title}}</router-link>
                    </div>
                    <div class="name-date fr clearfix">
                        <span class="name fl">{{item.userName}}</span>
                        <span class="date fl">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                        <!-- 修改、删除 -->
                        <div class="operate fl" v-if="loginUId === item.createId">
                            <span title="修改" style="margin-right:10px;" class="icon-btn-edit2 edit" @click="modifi(item.id)"></span>
                            <del-popover title="删除" class="delete" :delData="{ url:'maker/studioArticle/delByIds', params:[{ id:item.id }], name:'文章' }" @callback="getResList"></del-popover>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无数据</div>
            <v-pagination :param="pageParams" :changePage="changePage"></v-pagination>
        </div>
        <!-- 发布修改 -->
        <el-dialog title="发布成果" :visible.sync="pubVisible" size="small" :before-close="closePopup">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-col :span="12">
                        <el-input v-model="form.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="分类" prop="articelType">
                    <el-col :span="12">
                        <el-select placeholder="请选择分类" v-model="form.articelType" style="width:100%;">
                            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-col :span="22">
                        <el-input v-model="form.content" v-show="false"></el-input>
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
                <el-form-item label="附件">
                    <el-col :span="16">
                        <el-upload class="upload-demo" action :file-list="form.studioAttachments" :on-remove="handleRemove" :before-upload="UploadFile">
                            <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                            <span slot="tip" class="upload-tip">上传多个文件，单个文件大小在{{fileSize}}M以内</span>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <!-- 按钮部分 -->
                <el-form-item>
                    <el-col :span="20" style="text-align: right;">
                        <el-button @click="pubVisible = false;closePopup()" style="border: 1px solid #ff7200; color:#ff7200; ">取消</el-button>
                        <el-button type="primary" @click="onSubmit" style="border: 1px solid #ff7200;">确定</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapState } from 'Vuex'
    import delPopover from 'Common/del_popover.vue'
    import sideTabs from 'components/studio/sideTabs.vue'
    import vSearch from 'Common/search.vue'
    import vPagination from 'Common/pagination.vue'
    import { studioArticleList, studioArticleAdd, studioArticleDetail, studioArticlModify } from '@/service/studio.js'
    export default {
        mixins: [uploadFileSize, editor],
        components:{
            sideTabs,
            vSearch,
            vPagination,
            'del-popover': delPopover
        },
        data(){
            let checkAge = (rule, value, callback) => {
                if (!value || value == '<p><br></p>') {
                    return callback(new Error('请输入内容'))
                }else {
                    callback()
                }
            }
            return {
                typeNum: 2,
                items:[],
                search:{
                    title:'',
                    articelType:''
                },
                pageParams:{
                    pageSize: 10,
                    pageNum: 1,
                    totalNum: 0
                },
                pubVisible: false,
                form: {
                    title: '',
                    studioType: 2,
                    articelType: '',
                    content: '',
                    studioId: this.$route.query.id,
                    studioAttachments: []
                },
                rules: {
                    title: [
                        { required: true, trigger: 'change', message: '请输入标题' },
                        { max: 50, trigger: 'change', message: '最多50字' }
                    ],
                    articelType: { required: true, trigger: 'change', message: '请选择分类' },
                    content: { required: true, validator: checkAge, trigger: 'change' }
                },
                typeList: [],
                editor: null,
                fileSize: 10,
                curId: '',
                loginUId: ''
            }
        },
        mounted(){
            this.getResList()
            if(this.$ls.get('loginUId')) {
                this.loginUId = this.$ls.get('loginUId')
            }
        },
        watch:{
            search:{
                handler:function(val,oldVal){
                    this.getResList();
                },
                deep:true
            },
            pubVisible: {
                handler:function(val,oldVal){
                    if(val && this.editor == null){
                        let _this = this;
                        window.setTimeout(function() {
                            _this.initEditor()
                            _this.editor.onchange = function () {
                                _this.form.content = this.$txt.html();
                            }
                        }, 0)
                    }
                }
            }
        },
        methods:{
            closePopup () {
                this.pubVisible = false
                this.$refs['form'].resetFields()
                this.form.title = ''
                this.form.articelType = ''
                this.form.content = ''
                this.form.studioAttachments = []
                this.form.id = undefined
                this.curId = ''
                this.editor.$txt.html('')
            },
            modifi (id) {
                this.curId = id
                this.pubVisible = true
                studioArticleDetail({id}).then(res => {
                    if(res.data.code === 200 && Object.keys(res.data.entity).length ) {
                        let form =  this.form
                        res = res.data.entity
                        form.title = res.title
                        form.articelType = res.articelType
                        form.studioAttachments = res.studioAttachments
                        form.content = res.content
                        form.id = id
                        this.editor.$txt.html(res.content)
                    }
                })
            },
            getSearch(val){
                this.search.title = val
            },
            changeType(val){
                this.search.articelType = val
            },
            changePage(val){
                this.pageParams.pageNum = val;
                this.getResList()
            },
            /*获取资源列表*/
            getResList(){
                let params = Object.assign({}, this.search, { studioId: this.$route.query.id, studioType: this.typeNum })
                studioArticleList(params, this.pageParams).then((res) => {
                    if(res.data.code === 200){
                        this.items = res.data.entity.resultData
                        this.pageParams.totalNum = res.data.entity.totalNum
                    }
                })
            },
            onSubmit () {
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        if(this.form.id) {
                            studioArticlModify(this.form).then(res => {
                                if(res.data.code === 200) {
                                    this.pubVisible = false
                                    this.getResList()
                                    this.$message({type:'success', message:'修改成功'})
                                    this.closePopup()
                                }else {
                                    this.$message(res.data.msg)
                                }
                            })
                        }else {
                            studioArticleAdd(this.form).then(res => {
                                if(res.data.code === 200) {
                                    this.pubVisible = false
                                    this.getResList()
                                    this.$message({type:'success', message:'发布成功'})
                                    this.closePopup()
                                }else {
                                    this.$message(res.data.msg)
                                }
                            })
                        }
                    }else{
                        this.$message({message: '请按规则填写完整'})
                        return false
                    }
                })
            },
            resList(val)  {
                let arr = Array.from(val)
                arr.shift()
                this.typeList = arr
            },
            handleRemove(file, fileList) {
                this.form.studioAttachments = fileList
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      _this = this
                if (fileSize < (this.standardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            if (res.appendInfo.documentId) {
                                _this.form.studioAttachments.push({ type: 2, name: file.name, resourceId: res.appendInfo.resourceId, documentId: res.appendInfo.documentId })
                            } else {
                                _this.form.studioAttachments.push({ type: 2, name: file.name, resourceId: res.appendInfo.resourceId })
                            }
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.form.studioAttachments.splice(_this.form.studioAttachments.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                    uploader.cancelFile(file)
                }
            },
        },
        computed: mapState({
            hasPermissions: state => state.studio.hasPermissions
        })
    }
</script>

<style lang='scss' scoped>
$tc: #ff7200;
.studioArticle{
    margin-top: 30px;
    .content-left{
        width: 201px;
    }
    .content-right{
        width: 980px;
        .search-box{
            padding: 10px 15px;
            border-bottom: 1px solid #c9c9c9;
            .publish {
                background-color: $tc;
                color: #fff;
                padding: 8px;
                margin-left: 10px;
            }
        }
        .res-list{
            padding: 0 15px;
            .list-item{
                padding: 15px 0;
                border-bottom: 1px dashed #c9c9c9;
                font-size: 14px;
                .title-box{
                    i{
                        color: #686868;
                        margin-right: 15px;
                    }
                    .title{
                        color: #00a9e0;
                        &:hover{
                            color: $tc;
                        }
                    }
                }
                .name-date{
                    color: #999;
                    .name{
                        margin-right: 28px;
                    }
                    .operate {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
}
/* 上传按钮 */
.upload-btn {
    width: 90px;
    height: 38px;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    display: inline-block;
    margin-right: 10px;
    i{
        color: #D00;
    }
}
</style>