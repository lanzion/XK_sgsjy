<!-- 讨论区发布 -->
<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="discussinitiate-form-select">
        <h2 class="form_title">主题</h2>
        <div class="select_box">
            <el-input v-model="ruleForm.title" placeholder="请输入主题，最多30字" :maxlength="30"></el-input>
        </div>
        <i v-if="ruleForm.title.length >= 30" class="el-icon-circle-cross" style="color:#DD0000;">不超过30个字</i>
        <i v-else-if="ruleForm.title != ''" class="el-icon-circle-check" style="color:#41C36F;"></i>

        <h2 class="form_title">内容</h2>
        <div class="iscussinitiate-form-editor">
            <div id="editor-container">
                <div id="editor-trigger" style="height: 200px;"></div>
            </div>
        </div>
        <i v-if="ruleForm.content.length > 1500" class="el-icon-circle-cross" style="color:#DD0000;"> 不超过1000个字</i>
        <i v-else-if="ruleForm.content != '' || ruleForm.content != '<p></p>'" class="el-icon-circle-check" style="color:#41C36F;"></i>

        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn1" @click="submit">发表</a>
            <a class="reply_btn reply_btn2" @click="$router.go(-1)">取消</a>
        </div>
    </el-form>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { trainDiscussAdd } from '@/service/train.js'
export default {
    mixins: [editor],
    data() {
        return {
            // 表单
            ruleForm: {
                trainId: this.$route.query.id,
                title: '',
                content: '',
                pId: -1
            },
            // 验证
            rules: {}
        }
    },
    mounted() {
        var self = this;
        this.initEditor()
        this.editor.onchange = function () {
            self.ruleForm.content = this.$txt.html()
        }
    },
    methods: {
        submit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    trainDiscussAdd(this.ruleForm).then(res => {
                        if(res.data.code == 200) {
                            this.$message({
                              type: 'success',
                              message: '发表成功'
                            })
                            this.$router.push({path: 'index',query: this.$route.query })
                        }else {
                            this.$message({
                              type: 'error',
                              message: '发表失败,请重新发表'
                            })
                        }
                    })
                } else {
                    this.$message({
                      message: '请按要求填写完整'
                    })
                    return false;
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/projectInitiate.scss';
#editor-trigger {
    height: 200px;
}

.discussinitiate-form-select {
    margin-top: 50px;
    font-size: 16px;
    .form_title {
        margin: 20px 0 10px;
    }
    .select_box {
        display: inline-block;
        height: 32px;
        /* border: 1px solid #ECECEC; */
        line-height: 1;
    }
    .buttonGroup {
        height: 30px;
        margin-top: 30px;
        text-align: left;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            text-align: center;
        }
        .reply_btn1 {
            color: #fff;
        }
        .reply_btn2 {
            margin-left: 10px;
        }
    }
}
.iscussinitiate-form-editor {
    min-height: 200px;
}
</style>
