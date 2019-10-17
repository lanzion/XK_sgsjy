<template>
    <el-dialog class="dialog publish_notice" title="发公告" :visible.sync="visible.show">
        <!-- <header class="header">发公告</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 名称 -->
                <el-row>
                    <el-form-item label="标题" prop="title">
                        <el-col :span="23">
                            <el-input placeholder="请输入公告标题，不超过20字" v-model="form.title" :maxlength="20"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                  <!-- 内容 -->
                  <el-row>
                      <el-form-item label="内容" prop="content">
                          <el-col :span="23">
                              <el-input type="textarea" v-model="form.content" placeholder="请输入公告内容，不超过200字" :maxlength="200" style="height: 100px;"></el-input>
                          </el-col>
                      </el-form-item>
                  </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="publishNotice">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { addNotice } from '@/service/space_clasz.js'

    export default {
        name: 'publish_notice',
        data() {
            return {
                form: {
                    title: '',
                    content: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入公告标题', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入公告内容', trigger: 'change' },
                        { max: 200, message: '不超过200字', trigger: 'change' }
                    ]
                },
                noticeType: 1,
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            }
        },
        watch: {},
        mounted() {
            const type = this.$route.path.split('/')[2]
            switch (type) {
                case 'clasz':
                    this.noticeType = 1
                    break
                case 'interest':
                    this.noticeType = 2
                    break
                case 'studio':
                    this.noticeType = 3
                    break
            }
        },
        methods: {

            /*
             * 发布公告
             * "noticeType": "1",
             * "busId": "9bb27c620cf848269a4d10ed375a7a32",
             * "title": "我是公告标题",
             * "content": "我是公告内容1"
             */
            publishNotice() {
                if (this.$ls.get('loginInfo')) {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            const params = {
                                noticeType: this.noticeType,
                                busId: this.$route.query.id,
                                title: this.form.title,
                                content: this.form.content
                            }
                            addNotice(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '发布成功')
                                    this.visible.show = false
                                    this.$refs.form.resetFields()
                                    this.$emit('callback')
                                } else {
                                    this.showMessage('warning', res.data.msg)
                                }
                            })
                        } else {
                            this.showMessage('warning', '请按要求填写完整信息')
                            return false
                        }
                    })
                } else {
                    this.showMessage('warning', '请登录后再操作')
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
</style>

<style lang='scss'>
.publish_notice{
    .el-textarea__inner{
        height: 85px;
    }
    .el-input__inner{
        height: 38px;
    }
    .el-select{
        height: 38px;
        width: 100%;
        .el-tag{
            margin-left: 10px;
        }
    }
}
</style>

