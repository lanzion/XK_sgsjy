<template>
    <div class="articlePublish theme-red backend-content__middle">
        <nav class="nav"> <router-link style="color:#c9c9c9;" :to="{path:'/interestsSpace/article', query: {id: $route.query.id } }">全部文章</router-link> > 文章发表 </nav>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <!-- 文章名称 -->
            <el-row>
                <el-form-item label="文章名称" prop="name">
                    <el-col :span="9">
                        <el-input placeholder="请输入文章名称，不超过20字" v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 分类 -->
            <el-row>
                <el-form-item label="分类" prop="type">
                    <el-col :span="9">
                        <el-select v-model="form.type.value" placeholder="请选择">
                            <el-option v-for="item in form.type.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="内容" prop="content">
                    <el-col :span="23">
                        <div id="editor-trigger" style="height: 200px"></div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item>
                <button class="publish-btn" @click="onSubmit('form')">发布</button>
                <button class="btn" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import dataTranslation from '@/js/dataTranslation.js'
import { articlePublish, articleClassifyList } from '@/service/interest.js'
    export default {
        name:'articlePublish',
        mixins: [editor],
        data () {
            let validateContent = (rule, value, callback) => {
                if (!value || value == '<p><br></p>') {
                  return callback(new Error('内容不能为空'))
                }else {
                    callback()
                }
            }
            let validateType = (rule, value, callback) => {
                if (value.length === 0) {
                  return callback(new Error('分类不能为空'));
                }else {
                    callback()
                }
            }
            return {
                form: {
                    name:'',
                    type: {
                        value: null,
                        options: null
                    },
                    content:''
                },
                breadcrumb: [
                    {path: '/interestsSpace/article', title: '全部文章' }
                ],
                rules: {
                    name: [
                        { required: true, message: '请输入文章名称', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    type: [
                        { required: true, validator: validateType, trigger: 'change' }
                    ],
                    content: [
                        { required: true, validator: validateContent, trigger: 'blur' }
                    ]
                }
            }
        },
        created () {

        },
        mounted () {
            var self = this;
            this.initEditor()
            this.editor.onchange = function () {
                self.form.content = this.$txt.html();
            }
            this.getClassifyData()
        },
        methods: {
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = this.form;
                        let data = {
                            interestId: this.$route.query.id,
                            title: form.name,
                            articelType: form.type.value,
                            content: form.content
                        };
                        articlePublish(data).then(res => {
                            if(res.data.code === 200) {
                                this.$router.push({path: '/interestsSpace/article', query: {id: this.$route.query.id}})
                                this.$message({
                                    showClose: true,
                                    message: '发表成功',
                                    type: 'success'
                                })
                                this.$emit('getInterestDetail')
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: '发表失败',
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            getClassifyData () {
                articleClassifyList({ interestId: this.$route.query.id }).then(res => {
                    if(res.data.entity) {
                        this.form.type.options = res.data.entity.resultData
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
.articlePublish {
    font-size: 14px;
    .nav {
        margin-bottom: 20px;
        font-size: .85em;
    }
    /* 发布、取消按钮 */
    .btn{
        padding: 0px 15px;
        height: 33px;
        line-height: 33px;
        border: 1px solid #d00;
        color: #d00;
        margin-left: 5px;
        &:hover{
            color: #fff;
            background-color: #d00;
        }
    }
    .publish-btn{
        background-color: #d00;
        color: #fff;
        margin-left: 5px;
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