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
import backstageNav from 'Common/backstage_nav.vue';
import breadcrumb from 'Common/breadcrumb.vue';
import { mapState, mapActions } from 'Vuex'
export default {
    name: 'adminSpace',
    data () {
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
            'setBackGround': 'spaceBackground/setBackGround'
        })
    },
    computed: mapState({
        background: state => state.spaceBackground.backgroundImage
    }),
    mounted() {
        this.setBackGround(this.$ls.get('loginInfo').userInfo.space.background)
    }
}
</script>

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
    padding-bottom: 40px;
    margin-bottom: -40px;
}
.backend-content__right {
    width: 980px;
}
</style>
