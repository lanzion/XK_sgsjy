<template>
    <div id="clasz_manage" class="container" :class="{'is-admin': isAdmin}">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/claszSpace/homePage', query:{ id: $route.query.id } }">班级空间</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 主体部分 -->
        <div class="main-content clearfix">
            <nav class="nav-list-box bgw fl">
                <h4 class="nav-head">班级管理</h4>
                <ul class="nav-group">
                    <router-link class="nav-group-item" v-for="(item, j) in navItem" tag="li" :to="{ path: item.url,query:{ id: $route.query.id } }" :key="j">
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
import { judgeStudentIsAdmin } from '@/service/space_clasz.js'
export default {
    name: 'clasz_manage',
    components: {
    },
    data(){
        return{
            navItem:[
                { url: '/claszManage/baseInfo', name: '基本信息' },
                { url: '/claszManage/memberManage', name: '成员管理' },
                { url: '/claszManage/claszNoticeManage', name: '公告管理' }
            ]
        }
    },
    created(){
        if(!this.$ls.get('loginInfo')){
            this.$router.push({name:'claszSpace',query:{id:this.$route.query.id}})
        }else{
            judgeStudentIsAdmin({id: this.$route.query.id, studentId: this.$ls.get('loginInfo').userInfo.id}).then((res)=>{
                if(!res.data.entity){
                    this.$router.push({name:'claszSpace',query:{id:this.$route.query.id}})
                };
            });
        }
    },
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
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
    min-height: 524px;
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
                background-color: $default-light-color;
                border-left: 2px solid $default-color;
            }
            &.active {
                &,
                [class*="icon-admin-i-"],
                [class*=" icon-admin-i-"] {
                    color: $default-color;
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
@each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
        .nav-list-box {
            .nav-group {
                .nav-group-item {
                    &:hover,
                    &.active {
                        background-color: nth($color-value, 2);
                        border-left-color: nth($color-value, 1);
                    }
                    &.active {
                        &,
                        [class*="icon-admin-i-"],
                        [class*=" icon-admin-i-"] {
                            color: nth($color-value, 1);
                        }
                    }
                }
            }
        }
    }
}
</style>
