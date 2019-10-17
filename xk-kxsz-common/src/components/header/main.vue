<template>
    <header class="header-wrap">
        <div id="head" class="header container clearfix" :class="theme">
            <h1 class="header_logo">
                <a @click.prevent="redirect(pages.index, { type: 4 })">
                    <!-- <img src="./../../assets/img/common/logo2.svg" alt="创客集结号" class="header_logoImg" width="154" height="42"> -->
                    <img src="./../../assets/img/common/logo.svg" alt="师生科学素质展示平台" class="header_logoImg" width="273" height="35">
                    <!-- <span style="font-size: 26px;">师生科学素质展示平台</span> -->
                </a>
                <!-- <router-link tag="h2" :to="{path: homepage}" class="sub-title" v-if="module!=''">{{module}}</router-link> -->
            </h1>
            <nav class="nav-box">
                <ul class="nav-list">
                    <li class="nav-item" v-for="(item, index) in nav" :key="index" :class="{ active: active(item) }">
                        <a @click.prevent="redirect(item, { type: 4 })" class="nav-item-txt">
                            {{item.name}}
                        </a>
                    </li>
                    <!-- <router-link tag="li" class="nav-item" v-for="(item, index) in nav" :key="index" :to="item.url.split('#')[1]">
                        <a class="nav-item-txt" href="javascript.void(0)">
                            {{item.name}}
                        </a>
                    </router-link> -->
                </ul>
            </nav>
            <template v-if="isLogin" class="fr">
                <el-popover ref="contextMenu" trigger="hover" popper-class="context-menu-box" v-model="visibleContextMenu">
                    <ul class="context-menu-list">
                        <li class="context-menu-items" v-for="(item, index) in contextMenuList" :key="index" @click="redirect(item.url, { path: item.path, type: 4 })">
                            <i :class="['icon-i-' + item.icon]"></i>
                            <span>{{item.title}}</span>
                        </li>
                        <li class="context-menu-items" @click="loginOut">
                            <i class="icon-i-exit"></i>
                            <span>退出</span>
                        </li>
                    </ul>
                </el-popover>
                <a class="head_portrait i-button fr" :class="{'is-active': visibleContextMenu}" v-popover:contextMenu>
                    <img :src="getFileUrl(loginInfo.userInfo.face) || faceDefault" height="30" width="30">
                    <span>{{loginInfo.userInfo.userName}}</span>
                    <i class="icon-btn-i-dropdowm"></i>
                </a>
            </template>
            <div class="header-btn-group fr" v-else>
                <ul class="cols-list m-8">
                    <li class="cols-item">
                        <!-- <a class="header-link" @click="showLoginModal">登录</a> -->
                        <a class="header-link" @click.prevent="redirect(pages.index, { path: 'login', type: 4 })">登录</a>
                    </li>
                    <li class="cols-item">
                        <a class="header-link" @click.prevent="redirect(pages.index, { path: 'register', type: 4 })">注册</a>
                    </li>
                </ul>
                <!-- <a class="request-org">开通学校/教育局</a> -->
                <!-- <a class="request-org" @click.prevent="redirect(pages.index, { path: 'open', type: 4 })">开通学校/教育局</a> -->
            </div>
            <div class="search clearfix fr">
                <div class="search-box" v-if="ifInput">
                    <el-input placeholder="请输入关键词" v-model="searchWorks" @keyup.enter.native="searchChange(searchWorks)"></el-input>
                    <a class="el-icon-search search-btn" @click.stop="searchChange(searchWorks)"></a>
                </div>
                <div class="el-icon-search search-icon fr" v-else @click.stop="showInput(true)" title="搜索"></div>
            </div>
        </div>
    </header>
</template>

<script>
// import getBaseUrl from 'Asset/js/getBaseUrl.js'
import { mapState, mapActions } from 'vuex'
import { requestNavList, loginOut } from './../../service/common.js'
import { removeUserInfo } from './../../assets/js/getUserInfo'

export default {
    name: 'xk-header',
    data() {
        return {
            nav: [],
            contextMenuList: [
                {
                    title: '我的空间',
                    url: this.pages.my,
                    path: 'admin',
                    icon: 'space'
                },
                {
                    title: '我的消息',
                    url: this.pages.my,
                    path: 'admin/privateLetter',
                    icon: 'message'
                },
                {
                    title: '基本资料',
                    url: this.pages.my,
                    path: 'admin/profile',
                    icon: 'setting'
                }
            ],
            visibleContextMenu: false,
            searchWorks: '', // 搜索关键字
            select: '0',
            theme: 'default',
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.login.isLogin,
            loginInfo: state => state.login.loginInfo,
            userIdentity: state => state.login.userIdentity,
            ifInput: state => state.globalSearch.ifInput,
            searchOptions: state => state.globalSearch.searchOptions
        }),
    },
    props: {
        module: {
            type: String,
            default() {
                return ''
            }
        },
        homepage: {
            type: String,
            default() {
                return '/'
            }
        },
        isSearch: {
            type: Boolean,
            default() {
                return false
            }
        },
        active: {
            type: Function,
            default() {
                return function (item) {
                    return item.split('#')[1] === '/'
                }
            }
        },
    },
    mounted() {
        this.getNavList()
        if (this.userIdentity === 'education' || this.userIdentity === 'school' || this.userIdentity === 'admin') {
            this.contextMenuList = [
                {
                    title: '后台管理',
                    url: this.pages.admin,
                    icon: 'space'
                }
            ]
        }
    },
    watch: {
        loginInfo: {
            handler: function (val) {
                console.log(val)
            },
            deep: true,
        }
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        ...mapActions('globalSearch', ['showInput', 'changeSearchType', 'changeKeyWords']),
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
            removeUserInfo()
            loginOut().then((response) => {
                if (response.data.code === 200) {
                    this.isLogin = false
                    this.$router.go(0)
                }
            }, () => {
                this.$router.go(0)
                return Promise.resolve()
            })
        },
        showLoginModal() {
            this.$store.commit('toggleLoginModal', true)
        },
        // // 全局搜索
        searchChange(val) {
            if (val) {
                // this.changeKeyWords(val)
                this.showInput(false)
                this.$router.push({ path: '/search', query: { keyWords: val } })
            } else {
                this.$message({
                    type: 'info',
                    message: '请输入关键词，再进行搜索'
                })
            }
        }
    }
}
</script>

<style lang='scss'>
.el-popover.context-menu-box {
    padding: .5em;
}

.header-wrap {
    .search {
        .el-select {
            .el-input {
                .el-input__inner {
                    width: 75px;
                }
            }
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/cols.scss';
$header-height: 72px;
// .loginPosi {
//     right: 200px!important;
// }
.header-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    transform: translateZ(0);
    z-index: 999;
    background-color: #fff;

    .header {
        position: relative;
        height: $header-height;
        overflow: hidden;

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
                height: 100%;
            }

            .sub-title {
                display: inline-block;
                font-family: '黑体';
                color: #000;
                font-size: 28px;
                line-height: 1;
                padding-left: 10px;
                margin-left: 10px;
                border-left: 1px solid #000;
            }
        }

        .search {
            position: relative;
            // right: 240px;
            // top: 22px;
            width: 200px;
            margin-right: 20px;
            margin-top: 21px;
            .search-btn {
                position: absolute;
                top: 8px;
                right: 5px;
                font-size: 16px;
                color: #ccc;
                &:hover {
                    color: $theme-color;
                }
            }
            .search-icon {
                font-size: 20px;
                color: $theme-color;
                cursor: pointer;
                line-height: 34px;
            }
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
        font-size: 16px;

        .nav-item {
            display: inline-block;
            height: $header-height;
            box-sizing: border-box;
            cursor: pointer;

            .nav-item-txt {
                display: block;
                padding: 0 1em;
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
    // position: absolute;
    // right: 0;
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

    .cols-list,
    .request-org {
        $pd: 8px;

        display: inline-block;
        padding: $pd;
        margin-top: ($header-height - $fs) / 2 - $pd;
        border: 1px solid;
        border-radius: $button-radiu;
        box-sizing: border-box;
    }

    .cols-list {
        border-color: #dfdfdf;

        .header-link {
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .cols-item,
    .request-org {
        /* display: inline; */
        font-size: $fs;
    }

    .request-org {
        display: inline-block;
        margin-left: 10px;
        border-color: nth($default-color, 1);
        background-color: nth($default-color, 1);
        color: #fff;

        &:hover {
            background-color: nth($default-color, 2);
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
            vertical-align: text-bottom;
        }
    }
}
@media screen and (max-width: 1200px) {
    .header-wrap .container {
        width: 100%;
    }
}
</style>
