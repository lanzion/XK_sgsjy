<template>
    <div id="studioMemberDetail" class="container">
        <h2 class="title"> {{detail.name}}
            <button class="fr apply" v-if="userIdentity === 'teacher' && $ls.get('loginUId') != detail.createId && isApply === 0 || isApply === 3 " @click="sayVisible = true">申请加入</button>
            <button class="fr apply" v-if=" isApply === 1 " style="cursor: default;">已报名</button>
            <button class="fr apply" v-if="isAdmin === 1 || $ls.get('loginUId') === detail.createId" @click="$router.push({path:'/space/studio/manage/baseInfo', query: {id: $route.query.id,studio: detail.name}})">进入管理</button>
        </h2>
        <div class='banner-img' title="点击查看原图" @click="visible.show = true" :style='{backgroundImage: "url(" + getFileUrl(detail ? detail.cover : null) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.route, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view :isMember="hasPermissions" :isAdmin="isAdmin === 1 || $ls.get('loginUId') === detail.createId" :detail="detail"></router-view>
        <el-dialog title="说点什么" :visible.sync="sayVisible" size="tiny">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="say" resize="none"> </el-input>
            <div class="btn_group">
                <el-button style="color: #23b8ff;border: 1px solid #23b8ff; border-radius: 5px;" @click="sayVisible = false">取消</el-button>
                <el-button type="primary" style="border: 1px solid #23b8ff; border-radius: 5px;" @click="apply">确定</el-button>
            </div>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="detail.cover"></img-preview>
    </div>
</template>

<script>
import { studioDetail, studioIsApply, addMemberApply, judgeAdmin, requestColumnList } from '@/service/studio.js'
import { mapState, mapActions } from 'vuex'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    components: {
        'img-preview': imgPreview
    },
    data() {
        return {
            navList: [],
            detail: {},
            isApply: '',
            sayVisible: false,
            say: '',
            isAdmin: false,           // 判断是不是管理员
            userIdentity: '',          // 用户身份
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        if (this.$ls.get('userIdentity')) {
            this.userIdentity = this.$ls.get('userIdentity')
        }
        requestColumnList({ studioId: this.$route.query.id }).then((res) => {
            if (res.data.code === 200) {
                this.navList = res.data.entity
            }
        })
    },
    methods: {
        ...mapActions({
            setPermissions: 'studio/setPermissions'
        }),
        apply() {
            addMemberApply({ studioId: this.$route.query.id, content: this.say }).then((res) => {
                if (res.data.code === 200) {
                    this.$message({ type: 'success', message: '发送成功' })
                    this.$set(this.$data, 'isApply', 1)
                } else {
                    this.$message({ message: res.data.msg })
                }
                this.sayVisible = false
            })
        }
    },
    mounted() {
        studioDetail({ id: this.$route.query.id }).then((res) => {
            if (res.data.code === 200 && res.data.entity) {
                this.detail = res.data.entity
                if (this.$ls.get('loginUId')) {
                    studioIsApply({ studioId: this.$route.query.id }).then((r) => {
                        if (r.data.code === 200) {
                            this.isApply = r.data.appendInfo.isApply
                            this.setPermissions(this.isApply === 2 || this.$ls.get('loginUId') === this.detail.createId)
                        }
                    })
                    judgeAdmin({ studioId: this.$route.query.id }).then((r) => {
                        if (r.data.code === 200) {
                            this.isAdmin = r.data.appendInfo.isOwner
                        }
                    })
                } else {
                    this.setPermissions(false)
                }
            }
        })
    },
    computed: mapState({
        hasPermissions: state => state.studio.hasPermissions
    })
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .title_nav_link {
            &:hover {
                color: $color-value;
            }
            &.active {
                background-color: $color-value;
                color: #fff;
            }
        }
        .apply {
            background-color: $color-value;
        }
    }
}
$org: #23b8ff;
#studioMemberDetail {
    font-size: 14px;
    .title {
        height: 50px;
        line-height: 50px;
        font-size: 1.42em;
        .apply {
            margin-top: 7px;
            padding: 9px 16px;
            border-radius: $button-radiu;
            color: #fff;
            border: none;
            &:hover {
                opacity: 0.75;
            }
        }
    }
    .banner-img {
        height: 330px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .title_nav {
        margin: 16px 0;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        background-color: #fff;
        box-sizing: border-box;
        .title_nav_link {
            display: inline-block;
            padding: 0 20px;
            border-right: 1px solid #f4f4f4;
            height: inherit;
            line-height: inherit;
            text-align: center;
            &.active {
                color: #fff;
            }
        }
    }
    .btn_group {
        margin-top: 20px;
        text-align: right;
    }
}
</style>