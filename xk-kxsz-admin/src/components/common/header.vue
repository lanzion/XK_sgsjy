<template>
    <header class="header-wrap">
        <!-- <h2 class="header_title fl">师生科学素质管理平台</h2> -->
        <template v-if="isLogin">
            <el-popover ref="contextMenu" trigger="hover" popper-class="context-menu-box" v-model="visibleContextMenu">
                <ul class="context-menu-list">
                    <li class="context-menu-items" v-for="(item, index) in contextMenuList" :key="item.url" @click="linkTo(item)">
                        <i :class="['icon-i-' + item.icon]"></i>
                        <span>{{item.title}}</span>
                        <el-badge :value="item.badge" :max="99" class="badge" v-if="item.badge!==undefined"></el-badge>
                    </li>
                    <li class="context-menu-items" @click="loginOut">
                        <i class="icon-i-exit"></i>
                        <span>退出</span>
                    </li>
                </ul>
            </el-popover>
            <a class="head_portrait i-button fr" :class="{'is-active': visibleContextMenu}" v-popover:contextMenu>
                <img :src="getFileUrl(loginInfo.userInfo.avatar) || faceDefault" height="30" width="30">
                <span>{{loginInfo.userInfo.userName}}</span>
                <i class="icon-btn-i-dropdowm"></i>
            </a>
        </template>
    </header>
</template>

<script>
import getBaseUrl from 'Asset/js/getBaseUrl.js'
import { loginInfo } from 'Asset/js/getUserInfo.js'
import { pages } from 'Asset/js/common-config.js'
import headPortraitDefault from 'Asset/img/common/head_portrait.png';
import { mapState, mapMutations, mapActions } from 'Vuex'

export default {
    name: 'head',
    data() {
        return {
            faceDefault: headPortraitDefault,
            contextMenuList: [
                {
                    title: '待办事项',
                    url: '/',
                    icon: 'message',
                    badge: 0
                },
                {
                    title: '安全设置',
                    url: '/setting',
                    icon: 'setting'
                }
            ],
            visibleContextMenu: false,
            content: '',
            select: '',
            theme: 'default',
            visible: {
                show: false
            }
        }
    },
    computed: {
        ...mapState ({
            isLogin: (state) => state.login.isLogin,
            loginInfo: (state) => state.login.loginInfo
        })
    },
    props: [
        'module',
        'homepage'
    ],
    mounted() {
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        linkTo(item) {
            this.visibleContextMenu = false
            if (item.isUrl) {
                let baseUrl = getBaseUrl()
                window.location.href = baseUrl + item.url
            } else {
                this.$router.push(item.url)
            }
        },
        loginOut() {
            this.logout().then(x => {
                this.isLogin = false
            });
            window.location.href = pages.index
        },
        showLoginModal() {
            this.$store.commit('toggleLoginModal', true)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.header-wrap {
    width: 100%;
    height: $header-height;
    line-height: $header-height;
    padding: 0 $content-box-padding + $content-box-margin;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;

    .header_title {
        font-size: 22px;
        color: $item-bc-active;
    }
    .head_portrait {
        img {
            vertical-align: middle;
        }
    }
}
.head_portrait {
    margin-top: 18px;
    font-size: 14px;
    line-height: 1;
    img {
        vertical-align: middle;
        border-radius: 50%;
    }
    .icon-btn-i-dropdowm {
        display: inline-block;
        margin-right: 0;
        font-size: 12px;
        transform: rotate(-180deg);
        transition: transform .5s;
    }
    &:hover,
    &.is-active {
        .icon-btn-i-dropdowm {
            transform: rotate(0);
        }
    }
}
.context-menu-list {
    font-size: 14px;
    overflow: hidden;

    .context-menu-items {
        padding: 0 1em;
        line-height: 2.5;
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }

        [class^="icon-"],
        [class*=" icon-"] {
            margin-right: .2em;
            font-size: 16px;
        }

        .badge {
            top: 3px;
        }
    }
}
</style>

<style lang="scss">
    .header-wrap{
        .el-dialog {
            width: 400px;
        }
    }
</style>
