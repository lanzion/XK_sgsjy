<template>
    <div class="articlePublish">
        <el-breadcrumb class="nav" separator=">">
            <el-breadcrumb-item v-for="(item, i) in breadcrumb" :to="item.route" :key="i">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="bgc_w articlePublish_form">
            <!-- 文章名称 -->
            <el-row>
                <el-form-item label="文章名称" prop="title">
                    <el-col :span="9">
                        <el-input placeholder="请输入文章名称，不超过40字" v-model="form.title"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 分类 -->
            <el-row>
                <el-form-item label="分类" prop="articelType">
                    <el-col :span="9">
                        <el-select v-model="form.articelType" placeholder="请选择">
                            <el-option v-for="item in articelTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                <button class="btn publish-btn" @click.prevent="onSubmit('form')">{{articleId ? '保存' : '发表'}}</button>
                <button class="btn" @click.prevent="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    // import dataTranslation from '@/js/dataTranslation.js'
    import { articleDetail, articlePublish, articleEdit, articleClassifyList } from '@/service/interest.js'

    export default {
        name: 'articlePublish',
        mixins: [editor],
        data() {
            const validateContent = (rule, value, callback) => {
                if (!value || value === '<p><br></p>') {
                    return callback(new Error('内容不能为空'))
                } else {
                    callback()
                }
            }
            const validateType = (rule, value, callback) => {
                if (value.length === 0) {
                    return callback(new Error('分类不能为空'))
                } else {
                    callback()
                }
            }
            return {
                articleId: this.$route.query.articleId,
                form: {
                    interestId: this.$route.query.id,
                    title: '',
                    articelType: '',
                    content: ''
                },
                articelTypeList: [],
                breadcrumb: [
                    {
                        route: {
                            path: `${this.pages.detail.interest.path}/article`,
                            query: { id: this.$route.query.id }
                        },
                        title: '全部文章'
                    },
                    {
                        title: this.$route.path.includes('publish') ? '文章发表' : '文章编辑'
                    }
                ],
                rules: {
                    title: [
                        { required: true, message: '请输入文章名称', trigger: 'change' },
                        { max: 40, message: '不超过40字符', trigger: 'change' }
                    ],
                    articelType: [
                        { required: true, validator: validateType, trigger: 'change' }
                    ],
                    content: [
                        { required: true, validator: validateContent, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
            const self = this
            this.initEditor()
            this.editor.onchange = function () {
                self.form.content = this.$txt.html()
            }
            this.getClassifyData()
            if (this.articleId) {
                this.getData()
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const isEdit = !!this.articleId
                        const form = Object.assign({}, this.form, isEdit ? { id: this.articleId } : {})
                        const handler = isEdit ? articleEdit : articlePublish
                        const handlerTxt = isEdit ? '修改' : '发表'

                        handler(form).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: `${handlerTxt}成功`,
                                    type: 'success'
                                })
                                this.$emit('getInterestDetail')
                                this.$router.push({ path: `${this.pages.detail.interest.path}/article`, query: { id: this.$route.query.id } })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: `${handlerTxt}失败`,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
            getClassifyData() {
                articleClassifyList({ interestId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.articelTypeList = _data.resultData || []
                    }
                })
            },
            getData() {
                articleDetail({ id: this.articleId }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        Object.assign(this.form, {
                            title: _data.title,
                            articelType: _data.articelType,
                            content: _data.content
                        })
                        this.editor.$txt.html(_data.content)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/css/scss/form.scss';
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .btn {
            border: 1px solid $color-value;
            color: $color-value;
            &:hover{
                background-color: $color-value;
            }
        }
        .publish-btn{
            background-color: $color-value;
        }
        .el-tag .el-icon-close:hover{
            background-color: $color-value;
        }
    }
}
.articlePublish {
    font-size: 14px;
    .nav {
        margin-bottom: 20px;
    }
    /* 发布、取消按钮 */
    .btn {
        padding: 0px 15px;
        height: 33px;
        line-height: 33px;
        margin-left: 5px;
        border-radius: $button-radiu;
        &:hover{
            color: #fff;
        }
    }
    .publish-btn{
        color: #fff;
        margin-left: 5px;
        &:hover {
            opacity: 0.75;
        }
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
    .articlePublish_form {
        padding: 20px;
    }
}
</style>