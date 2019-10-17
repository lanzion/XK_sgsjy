<template>
    <div class="contest_manage">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="form">
            <!-- 动态标题 -->
            <el-form-item label="动态标题" prop="title">
                <el-col :span="10">
                    <el-input placeholder="请输入动态标题" v-model="form.title" :maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="资讯内容" prop="content">
                <el-col :span="22">
                    <el-input v-model="form.content" v-show="false"></el-input>
                    <div id="editor-trigger" style="height: 200px"></div>
                </el-col>
            </el-form-item>
            <!-- 按钮部分 -->
            <el-form-item>
                <button type="button" class="group_big_button sure" @click="onSubmit">确定</button>
                <button type="button" class="group_big_button cancel" @click.prevent="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { requestDynamicAdd, requestDynamicDetail, requestDynamicModify } from '@/service/manage.js'

export default {
    mixins: [editor],
    data() {
        const validateContent = (rule, value, callback) => {
            if (!value || value === '<p><br></p>') {
                callback(new Error('内容不能为空'))
            } else {
                callback()
            }
        }
        return {
            form: {
                matchId: this.$route.query.id,
                title: '',
                content: '',
            },
            rules: {
                title: [
                    { required: true, message: '请输入资讯标题', trigger: 'change' }
                ],
                content: [
                    { required: true, validator: validateContent, trigger: 'blur change' }
                ]
            }
        }
    },
    mounted() {
        const self = this
        this.initEditor()
        this.editor.onchange = function () {
            self.form.content = this.$txt.html()
        }
        if (this.$route.query.dynamicId) {
            requestDynamicDetail({ id: this.$route.query.dynamicId }).then((res) => {
                if (res.data.code === 200) {
                    const entity = res.data.entity
                    this.form.title = entity.title
                    this.form.content = entity.content
                    this.editor.$txt.html(entity.content)
                }
            })
        }
    },
    methods: {
        // 获取select的options
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (!this.$route.query.dynamicId) {
                        requestDynamicAdd(this.form).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '新增成功'
                                })
                                this.$router.push({ path: 'dynamic', query: this.$route.query })
                            } else {
                                this.$message({
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.form.id = this.$route.query.dynamicId
                        requestDynamicModify(this.form).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                })
                                this.$router.push({ path: 'dynamic', query: { id: this.$route.query.id, type: this.$route.query.type } })
                            } else {
                                this.$message({
                                    message: res.data.msg
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        message: '请按规则填写完整提交'
                    })
                    return false
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.form{
    padding: 20px 15px 20px;
}
</style>

<style lang='scss'>
.admin_infoPublish{
    /* 编辑器高度 */
    .wangEditor-container .wangEditor-txt{
        height: 200px!important;
    }
}
</style>