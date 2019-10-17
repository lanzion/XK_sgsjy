<template>
    <div id="studio_manage" class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/studioMemberDetail/homePage', query:{ id: $route.query.id } }">{{studioName}}</el-breadcrumb-item>
            <el-breadcrumb-item>工作室管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 主体部分 -->
        <div class="main-content clearfix">
            <nav class="nav-list-box bgw fl">
                <h4 class="nav-head">工作室管理</h4>
                <ul class="nav-group">
                    <router-link class="nav-group-item" v-for="(item, j) in navItem" tag="li" :to="{ path: item.url,query:{ id: $route.query.id,studio:$route.query.studio } }" :key="j">
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
import { studioIsApply } from '@/service/studio.js'
export default {
    name: 'studio_manage',
    components: {
    },
    data(){
        return{
            studioName:'导师工作室',
            navItem:[
                { url: '/studioManage/baseInfo', name: '基本信息' },
                { url: '/studioManage/memberMng', name: '成员管理' },
                { url: '/studioManage/noticeMng', name: '公告管理' },
                { url: '/studioManage/bgMng', name: '背景管理' },
                { url: '/studioManage/columnMng', name: '栏目管理' }
            ]
        }
    },
    created(){
        if(!localStorage.getItem('loginInfo')){
            this.$router.push({name:'studioMember'})
        }else {
            // studioIsApply({studioId: this.$route.query.id}).then((res)=>{
            //     if( || res.data.appendInfo.isApply){
            //         this.$router.push({name:'studioMember'})
            //     }
            // });
        }
    },
    mounted(){
        this.studioName = this.$route.query.studio || '导师工作室'
    }
}
</script>

<style lang='scss' scoped>
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
    min-height: 445px;
    .nav-head{
        line-height: 42px;
        text-indent: 20px;
        font-size: 16px;
        font-weight: bold;
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
                background-color: #fdf2e1;
                border-left: 2px solid #ff7200;
            }
            &.active {
                &,
                [class*="icon-admin-i-"],
                [class*=" icon-admin-i-"] {
                    color: #ff7200;
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
