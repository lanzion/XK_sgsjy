<template>
    <div id="interest_manage" class="container" :class="{'is-admin': isAdmin}">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" style="padding: 1em 0;">
            <el-breadcrumb-item :to="{ path: `${this.pages.detail.interest.path}/homepage`, query:{ id: $route.query.id } }">{{interestName}}</el-breadcrumb-item>
            <el-breadcrumb-item>兴趣组管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 主体部分 -->
        <div class="main-content clearfix">
            <nav class="nav-list-box bgw fl">
                <h4 class="nav-head">兴趣组管理</h4>
                <ul class="nav-group">
                    <router-link class="nav-group-item" v-for="(item, j) in navItem" tag="li" :to="{ path: item.url,query:{ id: $route.query.id,interest:$route.query.interest } }" :key="j">
                        <span>{{item.name}}</span>
                    </router-link>
                </ul>
            </nav>
            <div class="content-right fl">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

import { judgeAdmin } from '@/service/interest.js'

export default {
    name: 'interest_manage',
    components: {
    },
    data() {
        return {
            interestName: '兴趣组',
            navItem: [
                { url: `${this.pages.detail.interest.path}/manage/baseInfo`, name: '基本信息' },
                { url: `${this.pages.detail.interest.path}/manage/memberManage`, name: '成员管理' },
                { url: `${this.pages.detail.interest.path}/manage/noticeManage`, name: '公告管理' }
            ]
        }
    },
    created() {
        if (!localStorage.getItem('loginInfo')) {
            this.$router.push({ name: 'interests' })
        } else {
            judgeAdmin({ interestId: this.$route.query.id, userId: this.$ls.get('loginInfo').userInfo.id }).then((res) => {
                if (!res.data.entity) {
                    this.$router.push({ name: 'interests' })
                }
            })
        }
    },
    mounted() {
        this.interestName = this.$route.query.interest
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$padding-size: 20px;
*{
    box-sizing: border-box;
}
.main-content {
    width: 100%;
}
.nav-list-box{
    width: 200px;
    margin-right: $padding-size;
    font-size: 14px;
    overflow: hidden;
    min-height: 708px;
    .nav-head{
        line-height: 42px;
        text-indent: 20px;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
    }
    .nav-group {
        margin-bottom: $padding-size;
        background-color: #fff;

        .nav-group-item {
            line-height: 42px;
            text-indent: 50px;
            cursor: pointer;

            &:hover,
            &.active {
                background-color: nth($default-color, 3);
                border-left: 2px solid nth($default-color, 1);
                color: nth($default-color, 2);
            }
            &.active {
                &,
                [class*="icon-admin-i-"],
                [class*=" icon-admin-i-"] {
                    color: nth($default-color, 1);
                }
            }

            [class*="icon-admin-i-"],
            [class*=" icon-admin-i-"] {
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
}
.content-right {
    width: 980px;
}
</style>
