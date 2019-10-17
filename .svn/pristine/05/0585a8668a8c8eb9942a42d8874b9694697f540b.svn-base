<template>
    <div class=" reply-show">
        <textarea style="resize:none" v-model="text" class="reply_textarea" placeholder="我来说两句"></textarea>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn1" @click="reply($route.query.pId)">发表</a>
        </div>
    </div>
</template>

<script>
export default {
    name : 'reply',
    data() {
        return{
            text: ''
        }
    },
    props: {
        replyData: Object,
        replyApi: {
            type: String,
            default: 'maker/projectDiscuss/addDiscuss'
        },
        replyCommentId:{
            type: String,
            default:''
        },
        replyNew: Object,
        isShow: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
    },
    methods: {
        reply() {
            if (this.text.trim() != '') {
                let params = {
                    [this.replyData.paramName] : this.replyData.paramVal,
                    'content' : this.text,
                };
                if(this.replyNew) {
                    params = Object.assign({}, params, this.replyNew)
                }
                if(this.replyCommentId != ''){
                    params.replyCommentId = this.replyCommentId;
                };
                this.$http.post(this.replyApi,params).then(res => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '回复成功')
                        this.text = ''
                        params.level = this.replyData.level
                        this.$emit('reply', params)
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            } else {
                this.showMessage('info', '请输入回复内容')
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .reply-show {
            textarea:focus {
                border: 1px solid $color-value;
            }
            .buttonGroup {
                .reply_btn1 {
                    background-color: $color-value;
                    &:hover {
                        opacity: 0.75;
                    }
                }
                .reply_btn2 {
                    color: $color-value;
                    &:hover{
                        color: #fff;
                    }
                }
            }
        }
    }
}

.reply-show {
    display: block;
    height: 130px;
    textarea {
        display: inline-block;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        height: 80px;
    }
    .buttonGroup {
        height: 30px;
        padding: 10px;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 30px;
            line-height: 2.5;
            float: right;
            margin-left: 20px;
            text-align: center;
        }
        .reply_btn1 {
            color: #fff;
            height: 31px;
        }
        .reply_btn2 {
            background-color: #fff；
        }
    }
}
</style>
