<template>
    <div class="reply">
        <textarea style="resize:none" v-model="text" class="reply_textarea" placeholder="我来说两句，最多500字"></textarea>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn1" @click="reply($route.query.pId)">发表</a>
            <a class="reply_btn reply_btn2" @click="setHide">取消</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'reply',
    data() {
        return {
            text: ''
        }
    },
    props: {
        params: {
            type: Object,
            default() {
                return {
                    topicId: '',
                    pId: '',
                    replyCommentId: ''
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        setHide: function () {
            const replys = document.querySelectorAll('.reply')
            // replys.forEach(function (i,k) {
            //     i.className = 'reply';
            // })
            for (let i = 0; i < replys.length; i++) {
                replys[i].className = 'reply'
            }
        },
        reply() {
            const params = {
                pId: this.params.pId,
                replyCommentId: this.params.replyCommentId,
                topicId: this.params.topicId,
                content: this.text,
            }
            const replyApi = 'maker/topic/comment/add'
            this.$http.post(replyApi, params).then((res) => {
                if (res.data.code === 200) {
                    this.showMessage('success', '回复成功')
                    this.text = ''
                    this.setHide()
                    this.$emit('callback')
                } else {
                    this.showMessage('warning', res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .reply {
            textarea:focus {
                border: 1px solid $color-value;
            }
            .buttonGroup {
                .reply_btn1 {
                    background-color: $color-value;
                }
                .reply_btn2 {
                    color: $color-value;
                }
            }
        }
    }
}

.reply {
    width: 100%;
    float: right;
    height: 0;
    transition: height .5s;
    textarea {
        display: none;
    }
    .reply_btn {
        display: none;
    }
}
.reply-show {
    position: relative;
    display: block;
    height: 126px;
    transition: height 0s;
    margin: 10px 0 10px;
    border: 1px solid #dfdfdf;
    background-color: #f7f8fa;
    padding: 10px;
    textarea {
        display: inline-block;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        height: 63px;
    }
    .buttonGroup {
        height: 30px;
        padding: 10px 0;
        .reply_btn {
            display: inline-block;
            font-size: 12px;
            padding: 8px 18px;
            float: right;
            text-align: center;
        }
        .reply_btn1 {
            color: #fff;
            &:hover {
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            padding:7px 17px;
            margin-right: 10px;
            background-color: #fff;
            &:hover{
                color: #fff;
            }
        }
    }
}
.reply-show:before{
    content: '';
    display:block;
    width: 10px;
    height: 10px;
    position: absolute;
    top: -7px;
    right: 25px;
    background-color: #f7f8fa;
    border:1px solid #dfdfdf;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);       /* IE 9 */
    -webkit-transform: rotate(45deg);   /* Safari and Chrome */
    -o-transform: rotate(45deg);        /* Opera */
    -moz-transform: rotate(45deg);      /* Firefox */
}
</style>
