<!-- 讨论区发布 -->
<template>
    <section>
        <div class="discussinitiate-form-select">
            <h2 class="form_title" v-if='this.$route.query.discussType == undefined'>所属板块</h2>
            <div class="select_box" v-if='this.$route.query.discussType == undefined'>
                <el-select v-model="select.value" placeholder="请选择所属板块">
                    <el-option v-for="item in select.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <i v-if="select.value != ''" class="el-icon-circle-check" style="color:#13ce66;"></i>
            </div>


            <h2 class="form_title">主题</h2>
            <div class="select_box">
                <el-input v-model="select.input" placeholder="请输入主题，最多30字"></el-input>
            </div>
            <i v-if="select.input.length > 30" class="el-icon-circle-cross" style="color:#DD0000;"> 超过30个字符</i>
            <i v-else-if="select.input != ''" class="el-icon-circle-check" style="color:#13ce66;"></i>

            <h2 class="form_title">内容</h2>
            <div class="iscussinitiate-form-editor">
                <div id="editor-container">
                    <div id="editor-trigger"></div>
                </div>
            </div>
            <i v-if="select.content.length > 2000" class="el-icon-circle-cross" style="color:#DD0000;"> 超过1000个字符</i>
            <i v-else-if="select.content != ''" class="el-icon-circle-check" style="color:#13ce66;"></i>

            <div class="buttonGroup clearfix">
                <a class="reply_btn reply_btn1" @click="getData">发表</a>
                <a class="reply_btn reply_btn2" @click="$router.go(-1)">取消</a>
            </div>
        </div>
    </section>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'

export default {
    mixins: [editor],
    data() {
        return {
            search: { input: '', select: '' },
            select: {
                options: [
                    { value: '1', label: '综合讨论区' },
                    { value: '2', label: '教师答疑区' }
                ],
                value: '',
                input: '',
                content: ''
            },
            title: ''
        }
    },
    mounted() {
        this.initEditor()
        const _this = this
        this.editor.onchange = function () {
            _this.select.content = this.$txt.html()
        }

        switch (this.$route.query.discussType) {
            case '2':
                this.title = '教师答疑区'
                break
            case '1':
                this.title = '综合讨论区'
                break
        }
    },
    methods: {
        getData() {
            if (this.$route.query.discussType !== undefined) {
                this.select.value = this.$route.query.discussType
            }
            if (this.select.value !== '' && this.select.input !== '' && this.select.content !== '' && this.select.input.length <= 30 && this.select.content.length <= 250) {
                this.$http.post('maker/projectDiscuss/addDiscuss',
                    { projectId: this.$route.query.id, discussType: this.select.value, title: this.select.input, content: this.select.content, pId: '-1' }
                ).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '发表成功'
                        })
                        this.$router.push({ path: 'overview', query: this.$route.query })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '发表失败,请重新发表'
                        })
                    }
                })
            } else {
                this.$message({ message: '请按要求填写完整再提交' })
            }
        }
    }
}
</script>
<style lang='scss'>
.discussinitiate-broad-search {
    background-color: #fff;
    .el-input-group > .el-input__inner {
        color: #A6A6A6;
        width: 186px;
    }
    .el-input__inner {
        width: 104px;
    }
    .el-button {
        background: #C9C9C9;
        .el-icon-search:before {
            content: '搜索';
        }
    }
    .el-input__icon.is-reverse + .el-input__inner {
        border-color: #eee;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #A7A7A7;
    }
}
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
@import '~@/assets/css/scss/vars.scss';
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
            border-radius: $button-radiu;
        }
        .reply_btn1 {
            color: #fff;
            &:hover {
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            margin-left: 10px;
            &:hover {
                color: #fff;
                background-color: $theme-color;
            }
        }
    }
}
.iscussinitiate-form-editor {
    min-height: 200px;
}
</style>
