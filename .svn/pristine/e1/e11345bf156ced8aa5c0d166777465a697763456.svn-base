<template>
    <el-dialog :visible.sync="dialog.isVisible" title="发私信" class="send-private-letter">
        <section class="form-box">
            <el-row>
                <el-col :span="4" class="form-title" align="middle">内容：</el-col>
                <el-col :span="20">
                    <el-input type="textarea" :rows="8" placeholder="请输入私信内容" v-model="content" resize="none"
                                        :maxlength="100"></el-input>
                </el-col>
            </el-row>
            <div class="button-group">
                <button type="button" class="maker_li_func_message" @click="dialog.isVisible = false">取消</button>
                <button type="button" class="maker_li_func_focus" @click="send">确定</button>
            </div>
        </section>
    </el-dialog>
</template>

<script>
    import { sendLetter } from '@/service/space.js'

    export default {
        props: ['dialog'],
        data() {
            return {
                content: '',
            }
        },
        methods: {
            send() {
                const loginUId = this.$ls.get('loginUId', '')
                const addresseeId = this.$route.query.uid || this.dialog.addresseeId
                const errorMsg = '发送私信失败，请重试'
                if (!loginUId) {
                    this.$message('请登录后再发送私信')
                    return
                }

                sendLetter({
                    sendId: loginUId,
                    content: this.content,
                    receiveIds: [addresseeId]
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '成功发送私信',
                            type: 'success'
                        })
                        this.dialog.isVisible = false
                        return
                    }
                    this.$message.error(res.data.msg || errorMsg)
                }).catch(() => {
                    this.$message.error(errorMsg)
                })
            }
        },
    }
</script>
<style lang='scss'>
    .send-private-letter {
        .el-dialog {
            width: 560px;
        }
        .el-dialog__body {
            padding: 0;
        }
    }
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    .send-private-letter {
        .form-box {
            padding: 20px;

            .form-title {
                margin-top: 5px;
                line-height: 1.5;
            }
        }
        .button-group {
            font-size: 0;
            margin-top: 20px;
            text-align: right;
            .maker_li_func_focus, .maker_li_func_message {
                margin: 0 5px;
                width: 88px;
                height: 32px;
                border: 1px solid #dfdfdf;
                border-radius: 5px;
                &:hover {
                    background-color: #40c1ff;
                    border: 1px solid $theme_color;
                    color: #fff;
                }
            }
            .maker_li_func_focus {
                background-color: $theme_color;
                border: 1px solid $theme_color;
                color: #fff;
            }
        }
    }
</style>
