<template>
    <div id="adminSpace" :class="{'is-admin': isAdmin}" :style="{backgroundImage: `url(${getFileUrl(background)})`}" class="bgc">
        <div class="container">
            <!-- 面包屑 -->
            <bread-crumb></bread-crumb>
            <!-- <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">创客空间</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">教师空间</el-breadcrumb-item>
                <el-breadcrumb-item>我的空间</el-breadcrumb-item>
            </el-breadcrumb> -->
            <!-- 主体部分 -->
            <div class="main-content clearfix">
                <backstage-nav class="fl"></backstage-nav>
                <div class="backend-content__right fl">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import backstageNav from '@/components/common/backstage_nav.vue'
import breadcrumb from '@/components/common/breadcrumb.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'adminSpace',
    data() {
        return {
        }
    },
    components: {
        'backstage-nav': backstageNav,
        'bread-crumb': breadcrumb
    },
    ls: {
        curEvaluatingItem: {
            type: Object,
            default: null
        }
    },
    methods: {
        ...mapActions({
            setBackGround: 'spaceBackground/setBackGround'
        })
    },
    computed: mapState({
        background: state => state.spaceBackground.backgroundImage
    }),
    created() {
        if (!this.$ls.get('loginInfo')) {
            this.$alert('您还未登录，不能进入个人空间，请先登录', '温馨提示', {
                confirmButtonText: '确定',
                customClass: '__custom-msg-box',
                callback: () => {
                    this.redirect(this.pages.index, { path: 'login', type: 4 })
                }
            })
        }
    },
    mounted() {
        this.setBackGround(this.$ls.get('loginInfo').userInfo.space.background)
    }
}
</script>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/vars.scss';
    .dpd15{
        padding: 5px 15px 15px;
    }
    .admin-list-head{
        padding-top: 10px;
        .tabs-bar-header{
            .tabs-right{
                top:0px!important;
                right: 18px!important;
            }
        }
    }
    .btn-verify-record {
        box-sizing: border-box;
        right: 0;
        top: 70px;
        width: 96px;
        height: 32px;
        line-height: 30px;
        font-size: 14px;
        color: $theme_color;
        border: 1px solid $theme_color;
        text-align: center;
        padding: 0;
        border-radius: $button-radiu;
        &:hover {
          color: #fff;
          background-color: $theme_color;
        }
    }

    .list-disabled {
        .el-upload-list__item.is-success{
            .el-upload-list__item-status-label {
                display: none;
            }
            .el-icon-close {
                display: none;
            }
        }
    }
</style>

<style lang='scss' scoped>
*{
    box-sizing: border-box;
}
.main-content {
    width: 100%;
}
.bgc {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-bottom: 80px;
    margin-bottom: -40px;
}
.backend-content__right {
    width: 980px;
}
</style>
