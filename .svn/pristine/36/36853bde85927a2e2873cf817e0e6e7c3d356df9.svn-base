<template>
    <div class="content" :style="{'background-image': 'url(' + bg + ')'}">
        <div class="container">
            <div class="login-page-panel">
                <xk-login class="login_main" :isModal="false"></xk-login>
            </div>
        </div>
<!--         <el-carousel height="570px" :class="{'is-single': banners.length==1}">
            <el-carousel-item v-for="item in banners" :key="item">
                <div class="banner-img" :style="{'background-image': 'url(' + item + ')'}"></div>
            </el-carousel-item>
        </el-carousel> -->
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
// import login from '@/components/common/login.vue'
import bg from 'Asset/img/login/login_bg.png'

export default {
    name: 'loginPage',
    components: {
        'v-banner': banner,
        // 'v-login': login
    },
    data() {
        return {
            loginInfo: this.$ls.get('loginInfo'),
            banners: [bg],
            bg
        }
    },
    watch: {
        loginInfo: {
            handler: function (val) {
                if (val) {
                    this.$router.replace({ path: '/' })
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
<style lang='scss' scoped>
.content {
    height: calc(100vh - 199px);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .banner-img {
        position: absolute;
        width: 100%;
        height: 570px;
        background-size: cover;
    }

    .container {
        position: relative;
        height: inherit;
        overflow: hidden;
    }

    .login-page-panel {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 380px;
        height: 336px;
        padding: 20px;
        // transform限制position:fixed的跟随效果,用margin垂直水平居中
        margin-top: -168px;
        margin-left: -190px;
        box-sizing: border-box;
        background-color: #fff;
        // transform: translate(-50%, 0);
        // -ms-transform: translate(-50%, 0); /* IE 9 */
        // -webkit-transform: translate(-50%, 0); /* Safari and Chrome */
        // -o-transform: translate(-50%, 0); /* Opera */
        // -moz-transform: translate(-50%, 0); /* Firefox */

    }
}
</style>
