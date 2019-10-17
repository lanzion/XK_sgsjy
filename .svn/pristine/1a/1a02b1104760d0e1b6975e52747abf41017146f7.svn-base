<template>
    <header class="header-wrap">
        <div id="head" class="header container" :class="theme">
            <h1 class="header_logo">
                <a @click="linkToUrl('index')">
                    <img src="~@/asset/img/common/logo.svg" alt="师生科学素质展示平台" class="header_logoImg" width="273" height="35">
                    <!-- <span style="font-size: 22px; vertical-align: middle;">师生科学素质展示平台</span> -->
                </a>
                <!-- <router-link tag="h2" :to="{path: module.homepage}" class="sub-title" v-if="module.homepage!='/'">
                    <img :src="module.pic" class="header_logoImg">
                    <span style="font-size: 22px;">{{module.title}}</span>
                </router-link> -->
            </h1>
            <nav class="nav-box">
                <ul class="nav-list">
                    <template v-for="(item, index) in nav">
                        <li class="nav-item" :class="{active: $route.path.startsWith(item.url.split('#')[1])}">
                            <el-dropdown v-if="item.children.length">
                                <span class="nav-item-txt" @mouseenter="mouseEvt" @mouseleave="mouseEvt">
                                    {{item.name}}
                                </span>
                                <el-dropdown-menu slot="dropdown" class="sub-nav-list" @mouseenter.native="mouseEvt" @mouseleave.native="mouseEvt">
                                    <el-dropdown-item v-for="(subItem, s) in item.children" class="sub-nav-item" :key="s">
                                        <a :href="/(ht|f)tp(s?)|(.htm)/.test(subItem.url) ? subItem.url : `${host}${subItem.url}`" class="nav-item-txt">
                                            {{subItem.name}}
                                        </a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <a v-else :href="/(ht|f)tp(s?)|(.htm)/.test(item.url) ? item.url : `${host}${item.url}`" class="nav-item-txt">
                                {{item.name}}
                            </a>
                        </li>
                        <!-- <ul class="sub-nav-list" v-if="item.children.length">
                            <li class="sub-nav-item" v-for="(subItem, s) in item.children">
                                <a :href="/(ht|f)tp(s?)|(.htm)/.test(subItem.url) ? subItem.url : `${host}${subItem.url}`" class="nav-item-txt">
                                    {{subItem.name}}
                                </a>
                            </li>
                        </ul> -->
                    </template>
                </ul>
            </nav>
            <div class="search" v-if="isSearch">
                <el-input placeholder="请输入内容" v-model="content">
                    <el-select v-model="select" slot="prepend" placeholder="项目">
                        <el-option label="活动" value="1"></el-option>
                        <el-option label="资源" value="2"></el-option>
                        <el-option label="项目" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </div>
            <template v-if="isLogin">
                <el-popover ref="contextMenu" trigger="hover" popper-class="context-menu-box" v-model="visibleContextMenu">
                    <ul class="context-menu-list">
                        <li class="context-menu-items" v-for="(item, index) in contextMenuList" :key="index" @click="linkTo(item)">
                            <i :class="['icon-i-' + item.icon]"></i>
                            <span>{{item.title}}</span>
                        </li>
                        <li class="context-menu-items" @click="loginOut">
                            <i class="icon-i-exit"></i>
                            <span>退出</span>
                        </li>
                    </ul>
                </el-popover>
                <a class="head_portrait i-button" :class="{'is-active': visibleContextMenu}" v-popover:contextMenu>
                    <img :src="getFileUrl(loginInfo.userInfo.face) || headFaceDefault" height="30" width="30">
                    <span>{{loginInfo.userInfo.userName}}</span>
                    <i class="icon-btn-i-dropdowm"></i>
                </a>
            </template>
            <div class="header-btn-group" v-else>
                <ul class="cols-list m-8">
                    <li class="cols-item">
                        <!-- <a class="header-link" @click="showLoginModal">登录</a> -->
                        <a v-if="env=='development'" class="header-link" @click="showLoginModal">登录</a>
                        <a v-else class="header-link" @click="linkToUrl('login')">登录</a>
                        <!-- <router-link class="header-link" :to="{path: '/login'}">登录</router-link> -->
                    </li>
                    <li class="cols-item">
                        <a class="header-link" @click="linkToUrl('register')">注册</a>
                        <!-- <router-link class="header-link" :to="{name: 'register'}">注册</router-link> -->
                    </li>
                </ul>
            </div>
        </div>
        <div class="menu-mark" v-show="navMenuVisible"></div>
    </header>
</template>

<script>
import getBaseUrl from '@/js/getBaseUrl.js'
import { loginInfo, userIdentity } from '@/js/getUserInfo.js'
import { pages } from '@/js/common-config.js'
import headFaceDefault from '@/asset/img/common/head_portrait.png';
import { mapState, mapMutations, mapActions } from 'Vuex'
import { requestNavList } from '@/service/common.js'
export default {
    name: 'head',
    data() {
        return {
            env: process.env.NODE_ENV,
            host: `${location.protocol}//${location.host}`,
            nav: [],
            headFaceDefault: headFaceDefault,
            contextMenuList: [
                {
                    title: '我的空间',
                    url: '/admin/',
                    icon: 'space'
                },
                {
                    title: '我的消息',
                    url: '/admin/privateLetter',
                    icon: 'message'
                },
                {
                    title: '基本资料',
                    url: '/admin/profile',
                    icon: 'setting'
                }
            ],
            visibleContextMenu: false,
            content: '',
            select: '',
            theme: 'default',
            navMenuVisible: false
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
        'isSearch'
    ],
    created() {
    },
    mounted() {
        if (userIdentity == 'education' || userIdentity == 'school' || userIdentity == 'admin') {
            this.contextMenuList = [
                {
                    title: '后台管理',
                    url: '/admin/#/',
                    icon: 'space',
                    isUrl: true
                }
            ]
        }
        this.getNavList()
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
        linkToUrl(model) {
            window.location.href = pages[model]
        },
        requestNavList() {
            return requestNavList().then((res) => {
                if (res.data.code === 200) {
                    const result = JSON.stringify(res.data.appendInfo.list)
                    this.$ls.set('XK-MAKER__NAV', result)
                    return result
                }
            })
        },
        async getNavList() {
            let _datas = await this.requestNavList()
            // let _datas = this.$ls.get('XK-MAKER__NAV')
            // if (_datas === null) {
            //     _datas = await this.requestNavList()
            // }
            _datas = JSON.parse(_datas) || []
            const _nav = _datas.find(x => x.name === '首页') || {}
            this.nav = _nav.children || []
        },
        loginOut() {
            this.logout().then(x => {
                this.isLogin = false
                // if (this.$route.matched.some(r => r.path == '/admin')) {
                //     this.$router.push('/space')
                // } else {
                //     this.$router.go(0)
                // }
            });
            window.location.href = pages.index
        },
        showLoginModal() {
            this.$store.commit('toggleLoginModal', true)
        },
        mouseEvt() {
            const self = this
            setTimeout(function () {
                self.navMenuVisible = !self.navMenuVisible
            }, 200)
        }
    }
}
</script>

<style lang='scss'>
.el-popover.context-menu-box {
    padding: .5em;
}
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@import '~@/asset/scss/cols.scss';
$header-height: 72px;
.header-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    z-index: 999;
    background-color: #fff;
    transform: translateZ(0);

    .header {
        position: relative;
        height: $header-height;

        .header_logo {
            $mt: 12px;
            display: inline-block;
            margin-top: $mt;
            /* width: 370px; */
            height: $header-height - $mt * 2;
            line-height: $header-height - $mt * 2;
            vertical-align: top;

            .header_logoImg,
            .sub-title {
                cursor: pointer;
                vertical-align: middle;
            }

            .header_logoImg {
                /* height: 100%; */
            }

            .sub-title {
                display: inline-block;
                height: 20px;
                line-height: 1;
                padding-left: 10px;
                margin-left: 10px;
                border-left: 1px solid #000;
            }
        }

        .search {
            position: absolute;
            left: 426px;
            top: 22px;
            width: 456px;
            border: 2px solid #d00;
        }
        .space {
            position: absolute;
            right: 100px;
            top: 10px;
            font-size: 12px;
        }
    }
}



.nav-box {
    display: inline-block;
    margin-left: 40px;
    .nav-list {
        line-height: $header-height;

        .nav-item {
            display: inline-block;
            height: $header-height;
            box-sizing: border-box;

            .nav-item-txt {
                display: block;
                padding: 0 1em;
                font-size: 16px;
            }

            &.active,
            &.e-active,
            &:hover {
                border-bottom-color: nth($default-color, 1);
                .nav-item-txt {
                    color: nth($default-color, 1);
                }
            }
        }
    }
}

.sub-nav-list {
    transform: translateY(-10px);
    font-size: 16px;
    text-align: center;
    background-color: rgba(0,0,0,0);
    color: #fff;
    border:none;
    box-shadow: none;
    a {
        color: #fff;
    }
    .sub-nav-item:hover {
        a {
            color: #23b8ff;
        }
    }
}
.menu-mark {
    position: fixed;
    display: block;
    top: 66px;
    left: 0;
    right: 0;
    height: 410px;
    background-color: rgba(0,0,0,0.7);
}

.space {
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 12px;
    text-align: center;
    border-radius: 100%;
    span {
        display: block;
        margin-top: 2px;
    }
}
.head_portrait,
.header-btn-group {
    position: absolute;
    right: 0;
}
.head_portrait {
    font-size: 14px;
    line-height: $header-height;
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
.header-btn-group {
    $fs: 14px;
    top: 0;
    font-size: 0;
    /* line-height: $header-height; */
    overflow: hidden;

    .cols-list {
        $pd: 8px;
        display: inline-block;
        padding: $pd;
        margin-top: ($header-height - $fs) / 2 - $pd;
        border: 1px solid;
        border-radius: 5px;
        box-sizing: border-box;
        border-color: #dfdfdf;

        .header-link {
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .cols-item {
        font-size: $fs;
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
    }
}
@media screen and (max-width: 1200px) {
    .header-wrap .container {
        width: 100%;
    }
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .header .search {
            border-color: $color-value;
        }
        .el-button {
            background-color: $color-value;
        }
        .header-link:hover {
            color: $color-value;
        }
    }
}
</style>
