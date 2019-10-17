<template>
    <div id="letter_detail" class="letter-detail">
        <header class="detail-head">与{{$route.query.name}}的对话（共{{count}}条私信）</header>
        <section class="chat-content">
            <ul class="chat-list" id="list_box">
                <div class="more-msg" v-if="count > datas.length" @click="pageNum++;getLetterData()">
                    <i class="icon-btn-refresh"></i> 更多消息
                </div>
                <div v-else class="no-more">没有更多消息了</div>
                <li class="list-item clearfix" v-for="(item,index) in datas" :key="index" v-bind:class="{isOwner: item.sendId === userId, isOther:item.sendId !== userId}">
                    <div class="avatar-box">
                        <img :src="getFileUrl(item.sendFace) || faceDefault">
                    </div>
                    <div class="msg-box">
                        <div class="name-time">
                            <span class="name">{{item.sendUserName}}</span>
                            <span class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
                        </div>
                        <div class="content">
                            {{item.content}}
                            <span class="icon-btn-close2 close" title="删除" @click="delChat(item.id)"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="input-box">
                <textarea style="resize:none" v-model="content" class="reply_textarea" placeholder="回复ta：" v-on:keyup.enter="replyLetter"></textarea>
                <div class="btn-box">
                    <button @click.prevent="replyLetter">发表</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { requestPrivateLetter, sendLetter, delChatRecord } from '@/service/privateLetter.js'

    export default {
        name: 'letter_detail',
        components: {},
        data() {
            return {
                content: '',
                userId: '',
                datas: [],
                count: 0,
                pageNum: 1
            }
        },
        mounted() {
            if (localStorage.getItem('loginInfo')) {
                this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            }
            this.getLetterData()
        },
        methods: {
            /*
            *获取私信列表详细
            *told:'    接受者id
            *fromId：是发送人id
             */
            getLetterData() {
                const params = {
                    toId: JSON.parse(localStorage.getItem('loginInfo')).userInfo.id,
                    fromId: this.$route.query.sendId
                }
                requestPrivateLetter(params, { pageSize: 10, pageNum: this.pageNum }).then((res) => {
                    if (res.data.code === 200) {
                        this.count = res.data.entity.totalNum
                        if (this.pageNum === 1) {
                            this.datas = res.data.entity.resultData.reverse()
                            $('html,body').animate({ scrollTop: '0px' }, 300)
                            $('#list_box').animate({ scrollTop: '99999px' }, 10)
                        } else {
                            const datas = res.data.entity.resultData.reverse()
                            this.datas.unshift(...datas)
                        }
                    }
                })
            },
            // 回复私信
            replyLetter() {
                if (localStorage.getItem('loginInfo')) {
                    const userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
                    sendLetter({
                        sendId: userId,
                        content: this.content,
                        receiveIds: [this.$route.query.sendId]
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '回复成功')
                            this.content = ''
                            this.pageNum = 1
                            this.getLetterData()
                        } else {
                            this.showMessage('warning', res.data.msg)
                        }
                    })
                } else {
                    this.showMessage('warning', '请登录后再操作')
                }
            },
            // 删除回话
            delChat(id) {
                this.$confirm('此操作将该删除这条消息，是否继续？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    delChatRecord({ id: id }).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '已删除')
                            this.getLetterData()
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                }).catch(() => {
                    this.showMessage('info', '已取消删除')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    .more-msg{
        color: #ccc;
        cursor: pointer;
        &:hover{
            color: #2797ed;
            i{
                color: #2797ed;
            }
        }
    }
    .no-more,.more-msg{
        text-align: center;
        padding: 10px 0px;
    }
    #letter_detail{
        padding: 5px 15px 15px;
        min-height: 818px;
        .detail-head{
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            background-color: #f0f0f0;
        }
        .chat-content{
            .chat-list{
                margin-bottom: 50px;
                height: 560px;
                overflow: auto;
                .list-item{
                    padding: 20px 0;
                }
                .isOther{
                    .avatar-box{
                        float: left;
                        margin-right: 15px;
                        img{
                            width: 72px;
                            height: 72px;
                            border-radius: 50%;
                        }
                    }
                    .msg-box{
                        max-width: 50%;
                        float: left;
                        .name-time{
                            margin-bottom: 7px;
                            .name{
                                font-size: 14px;
                                margin-right: 10px;
                            }
                            .time{
                                color: #999;
                            }
                        }
                        .content{
                            max-width: 100%;
                            position: relative;
                            word-wrap:break-word;
                            border:1px solid #c9c9c9;
                            background-color: #f9f9f9;
                            padding: 15px;
                            padding-right: 20px;
                            font-size: 14px;
                            line-height: 1.5em;
                            border-radius: 7px;
                            float: left;
                            &:before{
                                content: '';
                                width: 6px;
                                height: 6px;
                                position: absolute;
                                top: 6px;
                                left: -5px;
                                background-color: #f9f9f9;
                                border:1px solid #c9c9c9;
                                transform: rotate(30deg);
                                -ms-transform: rotate(30deg);        /* IE 9 */
                                -webkit-transform: rotate(30deg);    /* Safari and Chrome */
                                -o-transform: rotate(30deg);        /* Opera */
                                -moz-transform: rotate(30deg);        /* Firefox */
                                transform:skew(50deg,0deg);
                                border-bottom: none;
                                border-right: none;
                            }
                            .close{
                                position: absolute;
                                top: 5px;
                                right: 5px;
                                font-size: 12px;
                                transform:scale(0.85);
                                display: none;
                            }
                            &:hover{
                                .close{
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
                .isOwner{
                    .avatar-box{
                        float: right;
                        margin-left: 15px;
                        img{
                            width: 72px;
                            height: 72px;
                            border-radius: 50%;
                        }
                    }
                    .msg-box{
                        float: right;
                        max-width: 50%;
                        .name-time{
                            margin-bottom: 7px;
                            height: 14px;
                            .name{
                                font-size: 14px;
                                float: right;
                            }
                            .time{
                                float: right;
                                margin-right: 10px;
                                color: #999;
                            }
                        }
                        .content{
                            max-width: 100%;
                            position: relative;
                            word-wrap:break-word;
                            border:1px solid #c9c9c9;
                            background-color: #d7ebfe;
                            padding: 15px;
                            padding-right: 20px;
                            font-size: 14px;
                            line-height: 1.5em;
                            border-radius: 7px;
                            float: right;
                            &:before{
                                content: '';
                                width: 7px;
                                height: 5px;
                                position: absolute;
                                top: 6px;
                                right: -5px;
                                background-color: #d7ebfe;
                                border:1px solid #c9c9c9;
                                transform: rotate(30deg);
                                -ms-transform: rotate(30deg);        /* IE 9 */
                                -webkit-transform: rotate(30deg);    /* Safari and Chrome */
                                -o-transform: rotate(30deg);        /* Opera */
                                -moz-transform: rotate(30deg);        /* Firefox */
                                transform:skew(-54deg,0deg);
                                border-bottom: none;
                                border-left: none;
                            }
                            .close{
                                position: absolute;
                                top: 5px;
                                right: 5px;
                                font-size: 12px;
                                transform:scale(0.85);
                                display: none;
                            }
                            &:hover{
                                .close{
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
        .input-box{
            .reply_textarea{
                width: 100%;
                height: 45px;
                margin-bottom: 10px;
                padding: 10px;
                border: none;
                border: 1px solid #ccc;
                &:focus,&:hover{
                    border-color: $theme_color;
                }
            }
            .btn-box{
                text-align: right;
                button{
                    padding: 6px 18px;
                    border-radius: 3px;
                    font-size: 12px;
                    border:none;
                    background-color: $theme_color;
                    color: #fff;
                    &:hover{
                        opacity: 0.75;
                    }
                }
            }
        }
    }
</style>