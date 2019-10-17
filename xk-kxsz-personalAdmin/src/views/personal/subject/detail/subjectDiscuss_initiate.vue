<template>
    <section id="subjectDetailDiscussInitiate">
        <div class="title">
            <div class="title_l fl">
                <router-link :to="{ path: 'discuss', query: { 'subjectId': $route.query.subjectId }}">讨论区</router-link> > <span>发起新主题</span>
            </div>
        </div>
        <div class="discussinitiate-form-select">
            <h2 class="form_title">主题</h2>
            <div class="select_box">
                <el-input v-model="title" placeholder="请输入主题，最多30字"></el-input>
            </div>
            <i v-if="title.length > 30" class="el-icon-circle-cross" style="color:#23b8ff;"> 超过30个字符</i>
            <i v-else-if="title != ''" class="el-icon-circle-check" style="color:#41C36F;"></i>

            <h2 class="form_title">内容</h2>
            <div class="iscussinitiate-form-editor">
                <div id="editor-container">
                    <div id="editor-trigger"></div>
                </div>
            </div>
            <i v-if="content.length > 250" class="el-icon-circle-cross" style="color:#23b8ff;"> 超过200个字符</i>
            <i v-else-if="content != ''" class="el-icon-circle-check" style="color:#41C36F;"></i>

            <div class="buttonGroup clearfix">
                <a class="reply_btn reply_btn1" @click="publishDiscuss">发表</a>
                <a class="reply_btn reply_btn2" @click="$router.push({path: 'discuss',query: { 'subjectId': $route.query.subjectId }})">取消</a>
            </div>
        </div>
    </section>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { addSubjectDiscuss } from '@/service/subject.js'

export default {
    name: 'subjectDetailDiscussInitiate',
    mixins: [editor],
    data() {
        return {
            content: '',
            title: ''
        }
    },
    mounted() {
        const self = this
        this.initEditor()
        this.editor.onchange = function () {
            self.content = this.$txt.html()
        }
    },
    methods: {
        /*
        *发布讨论主题
        *title: 讨论主题
        *content：内容
        *subjectId：课题Id
         */
        publishDiscuss() {
            if (
                this.title !== '' &&
                this.content !== '' &&
                this.title.length <= 30 &&
                this.content.length <= 250
            ) {
                const params = {
                    subjectId: this.$route.query.subjectId,
                    ttile: this.title,
                    content: this.content,
                    pId: ''
                }
                addSubjectDiscuss(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '发表成功')
                        this.$router.push({ path: 'discuss', query: { subjectId: this.$route.query.subjectId } })
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            } else {
                this.showMessage('warning', '请按要求填写完整再提交')
            }
        }
    }
}
</script>
<style lang='scss'>
.discussinitiate-form-select {
    .select_box {
        border: none;
        .el-input__icon {
            width: 15%;
        }
        .el-input__inner {
            width: 290px;
        }
    }
    i {
        font-size: 12px;
    }
}
.iscussinitiate-form-editor {
    .ql-container {
        min-height: 150px;
    }
}
.el-input__inner:focus {
    /* border: 1px solid red; */
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/projectInitiate.scss';
#editor-trigger {
    height: 200px;
}
#subjectDetailDiscussInitiate {
    padding: 20px;
}
#subjectDetailDiscussInitiate{
    padding: 5px 15px 15px;
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
        line-height: 32px;
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
            &:hover{
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            margin-left: 10px;
            &:hover{
                color: #fff;
            }
        }
    }
}
.iscussinitiate-form-editor {
    min-height: 200px;
}
</style>
