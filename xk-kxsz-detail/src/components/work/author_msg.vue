<template>
    <div id="authorMsg" class="bgc_w">
        <div class="use-msg clearfix table-layout">
            <router-link class="face-box table-cell" :to="dynamicPath({ identity: identity == 'teacher' ? '1' : '0', orgId: item.id, userId: item.userId })">
                <img :src="getFileUrl(item.face) || faceDefault" class="face">
            </router-link>
            <div class="name-school table-cell">
                <p class="name ellipsis">{{ item.name }} <span class="identity">( {{ identity == 'teacher' ? '教师' : '学生' }} )</span></p>
                <p class="school ellipsis">{{ item.schoolName }}</p>
            </div>
        </div>
        <div class="sign">{{item.sign || '这个家伙很懒，什么也没留下'}}</div>
        <ul class="num clearfix">
            <li class="num_li fl"><p>{{ item.counts ? item.counts.productionNum : 0 }}</p><p>作品</p></li>
            <li class="num_li fl li_before"><p>{{ item.counts ? item.counts.coursesNum : 0 }}</p><p>课程</p></li>
            <li class="num_li fl li_before"><p>{{ item.counts ? item.counts.articleNum : 0 }}</p><p>文章</p></li>
            <li class="num_li fl li_before"><p>{{ item.counts ? item.counts.topicNum : 0 }}</p><p>话题</p></li>
            <li class="num_li fl li_before"><p>{{ item.counts ? item.counts.fansNum : 0 }}</p><p>粉丝</p></li>
        </ul>
        <div class="btn-box">
            <button class="i-button focus-btn" @click="addDelFocus" :title="ifFocus ? '取消关注' : '关注'"><span v-if='!ifFocus'> 关注</span><span v-else>已关注</span></button>
            <button class="i-button sx-btn" @click="openDialog" title="发私信">私信</i></button>
        </div>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
    </div>
</template>

<script>
    import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
    import { loginInfo } from '@/js/getUserInfo.js'
    import { requestUserBaseInfo, groupFollow, queryHasFollowedORNot, cancelSingleFollowing } from '@/service/common.js'

    export default {
        name: 'authorMsg',
        data() {
            return {
                // 私信
                dialog: { isVisible: false, addresseeId: null },
                // 个人卡片
                item: {},
                // 登录身份
                identity: 'student',
                // 用户id
                userId: null,
                // 是否关注
                ifFocus: false,
                // 是否登录
                ifLogin: false
            }
        },
        props: {
            id: {
                type: String,
                default() {
                    return loginInfo.userInfo.id
                }
            }
        },
        watch: {
            id(val) {
                if (val) {
                    this.getUserInfo(val)
                }
            }
        },
        mounted() {
            if (this.$ls.get('loginInfo')) {
                this.ifLogin = true
            } else {
                this.ifLogin = false
            }
        },
        methods: {
            getUserInfo(id) {
                requestUserBaseInfo({ userId: id }).then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.appendInfo
                        const identity = this.identity = Object.keys(_data).includes('teacher') ? 'teacher' : 'student'
                        _data[identity].schoolName = _data[identity].schoolName || _data.school.schoolName
                        this.item = _data[identity]
                        this.dialog.addresseeId = this.userId = _data[identity].userId
                        this.getIsfocus()
                        this.$emit('setIdentity', identity)
                    }
                })
            },
            addDelFocus() {
                if (this.ifLogin) {
                    if (!this.ifFocus) {
                        groupFollow([{ followedUserId: this.userId, followUser: this.$ls.get('loginUId') }]).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({ type: 'success', message: '关注成功' })
                                this.ifFocus = true
                            } else {
                                this.$message({ message: res.data.msg })
                            }
                        })
                    } else {
                        cancelSingleFollowing({ followedUserId: this.userId, followUser: this.$ls.get('loginUId') }).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({ type: 'success', message: '成功取消关注' })
                                this.ifFocus = false
                            } else {
                                this.$message({ message: res.data.msg })
                            }
                        })
                    }
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            getIsfocus() {
                queryHasFollowedORNot({ followedUserId: this.userId, followUser: this.$ls.get('loginUId') }).then((res) => {
                    this.ifFocus = res.data.entity
                })
            },
            // 打开发私信弹窗
            openDialog() {
                if (this.ifLogin) {
                    this.dialog.isVisible = true
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            }
        },
        components: {
            sendPrivateLetter
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$face-size: 75px;
#authorMsg{
    width: 282px;
    font-size: 16px;
    .use-msg {
        padding: 20px 20px 12px;
        box-sizing: border-box;
        /* 作者头像 */
        .face-box {
            width: 95px;
            .face {
                width: $face-size;
                height: $face-size;
                border-radius: 50%;
            }
        }
        /* 名字*/
        .name{
            .identity {
                font-size: .875em;
                color: #999;
                line-height: 2;
            }
        }
        .school {
            font-size: .875em;
            line-height: 1.5;
        }
    }
    .sign {
        padding: 0 20px 20px;
        font-size: 14px;
        word-wrap: break-word;
        color: #333;
        line-height: 1.5em;
    }
    .num {
        padding: 10px;
        font-size: .875em;
        .num_li {
            position: relative;
            width: 20%;
            text-align: center;
            box-sizing: border-box;
            padding: 0 3px;
            &.li_before::before {
                content:'';
                position: absolute;
                left: 0;
                top: 0px;
                height: 42px;
                border-left: 1px solid #c9c9c9;
            }
            p {
                line-height: 1.5;
                & + p {
                    color: #999;
                }
            }
        }
    }
    // 按钮盒子
    .btn-box {
        text-align: center;
        padding: 10px 10px 20px;
        .cancel-focus {
            color: #999;
        }
        .i-button{
            font-size: 14px;
            line-height: 2.2;
            width: 90px;
            border-radius: 5px;
            text-align: center;
            [class*="icon-btn-"],
            [class*=" icon-btn-"] {
                vertical-align: baseline;
            }
        }
        .focus-btn {
            margin-right: 20px;
        }
        .sx-btn {
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
    }
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #authorMsg .btn-box {
            .focus-btn {
                color: #fff;
                background-color: $color-value;
                &:hover {
                    opacity: 0.75;
                }
            }
            .sx-btn:hover {
                border-color: $color-value;
                color: $color-value;
            }
        }
    }
}
</style>