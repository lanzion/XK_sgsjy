<template>
    <nav class="admin-nav">
        <h1 class="logo">
            <a :href="pages.index" target="_self">
                <img src="~@/assets/img/common/logo_white.svg" width="100%" height="100%">
            </a>
            <!-- <span style="font-size: 16px; color: #fff; line-height: 42px;">师生科学素质管理平台</span> -->
        </h1>
        <!-- <router-link :to="{ path: '/' }" class="main-page"><i class="icon-admin-i-homepage"></i>首页</router-link> -->
        <el-menu v-if="navList.model=='makeradmin'" :default-active="defaultActive" theme="dark" class="admin-menu" :router="isNavRouter" :unique-opened="isUniqueOpened">
            <template v-for="(pNav, i) in navList.children">
                <template v-if="pNav.url">
                    <el-menu-item :index="pNav.url"><i :class="'icon-admin-i-' + pNav.menuId"></i>{{pNav.name}}</el-menu-item>
                </template>
                <template v-else>
                    <el-submenu :index="pNav.id">
                        <template slot="title"><i :class="'icon-admin-i-' + pNav.menuId"></i>{{pNav.name}}</template>
                        <el-menu-item v-for="(item, j) in pNav.children" :index="item.url || item.id" :key="item.id"><i :class="'icon-admin-i-' + item.menuId"></i>{{item.name}}</el-menu-item>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </nav>
</template>

<script>
import { adminPermission } from 'Asset/js/getUserInfo.js'
export default {
    name: 'nav',
    data() {
        return{
            isNavRouter: true,
            isUniqueOpened: true,
            navList: adminPermission,
            defaultActive: ''
        }
    },
    mounted() {
        this.setNavDefault()
    },
    watch:{
        '$route': 'setNavDefault'
    },
    methods: {
        // 设置默认选择导航
        setNavDefault() {
            let _defaultActive = this.$route.path.match(/^(\/(\w+)){2}/g)
            this.defaultActive = _defaultActive ? _defaultActive[0] : ''
            console.log(this.defaultActive)
        }
    }
}

</script>

<style lang='scss'>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.admin-menu {
    &.el-menu--dark {
        .el-submenu__title {
            color: #afb2b7;
            &:hover {
                background-color: $item-bc-active;
            }
        }
        .el-submenu {
            .el-menu {
                background-color: $nav-bc;
                .el-menu-item:hover {
                    background-color: $item-bc-active;
                }
            }
            .el-menu-item:hover {
                background-color: $item-bc-active;
            }
            &.is-opened {
                background-color: $folder-bc-active;
                .el-submenu__title {
                    color: #fff;
                }
            }
        }
        .el-menu-item {
            &:hover,
            &.is-active {
                background-color: $item-bc-active;
            }
            &.is-active {
                color: #fff;
            }
        }
    }
    &.el-menu,
    .el-menu {
        border-radius: 0;
    }
    $nav-item-height: 46px;
    .el-menu-item,
    .el-submenu__title {
        height: $nav-item-height;
        line-height: $nav-item-height;
    }
}
</style>
<style lang='scss'>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.admin-nav {

    .logo {
        height: $header-height;
        padding: 12px;
        border-bottom: 1px solid $item-bc-active;
        box-sizing: border-box;
    }
    .main-page {
        display: block;
        line-height: $breadcrumb-height;
        padding-left: 20px;
        font-size: 14px;
        color: #afb2b7;
    }
    [class*="icon-admin-i-"],
    [class*=" icon-admin-i-"] {
        margin-right: 10px;
        color: #fff;
    }
}
</style>
