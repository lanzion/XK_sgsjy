<template>
    <div id="studioMemberDetail" class="container">
        <h2 class="title"> {{detail.name}}
            <el-button type="primary" class="fr apply" v-if="userIdentity === 'teacher' && $ls.get('loginUId') != detail.createId && isApply === 0 || isApply === 3 " @click="sayVisible = true">申请加入</el-button>
            <el-button type="primary" class="fr apply" v-if=" isApply === 1 " style="cursor: default;">已报名</el-button>
            <el-button type="primary" class="fr apply" v-if="isAdmin === 1 || $ls.get('loginUId') === detail.createId" @click="$router.push({path:'/studioManage/baseInfo', query: {id: $route.query.id,studio: detail.name}})">进入管理</el-button>
        </h2>
        <div class='banner-img' :style='{backgroundImage: "url(" + getFileUrl(detail ? detail.cover : null) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.route, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view :isMember="hasPermissions" :isAdmin="isAdmin === 1 || $ls.get('loginUId') === detail.createId" :detail="detail"></router-view>
        <el-dialog title="说点什么" :visible.sync="sayVisible" size="tiny">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="say" resize="none"> </el-input>
            <div class="btn_group">
                <el-button style="color: #ff7200;border: 1px solid #ff7200;" @click="sayVisible = false">取消</el-button>
                <el-button type="primary" style="border: 1px solid #ff7200;" @click="apply">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { studioDetail, studioIsApply, addMemberApply,judgeAdmin,requestColumnList } from '@/service/studio.js'
import { mapState, mapActions } from 'Vuex'
export default {
    data() {
        return {
            navList: [],
            detail: {},
            isApply: '',
            sayVisible: false,
            say: '',
            isAdmin:false,           //判断是不是管理员
            userIdentity:''         //用户身份
        }
    },
    created(){
        if(this.$ls.get('userIdentity')){
            this.userIdentity = this.$ls.get('userIdentity')
        };
        requestColumnList({studioId:this.$route.query.id}).then((res) => {
            if(res.data.code === 200){
                this.navList = res.data.entity;
            }
        })
    },
    methods: {
        ...mapActions({
            'setPermissions': 'studio/setPermissions'
        }),
        apply () {
            addMemberApply ({studioId: this.$route.query.id, content: this.say}).then (res => {
                if(res.data.code === 200) {
                    this.$message({type: 'success', message: "发送成功"});
                    this.$set(this.$data,'isApply',1)
                }else {
                    this.$message({message: res.data.msg})
                }
                this.sayVisible = false
            })
        }
    },
    mounted() {
        studioDetail({id: this.$route.query.id}).then(res => {
            if(res.data.code === 200 && res.data.entity) {
                this.detail = res.data.entity
                if(this.$ls.get('loginUId')) {
                    studioIsApply({studioId: this.$route.query.id}).then(res => {
                        if(res.data.code === 200) {
                            this.isApply = res.data.appendInfo.isApply;
                            this.setPermissions(this.isApply === 2 || this.$ls.get('loginUId') === this.detail.createId)
                        }
                    });
                    judgeAdmin({studioId: this.$route.query.id}).then(res => {
                        if(res.data.code === 200){
                            this.isAdmin = res.data.appendInfo.isOwner
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
$org: #ff7200;
#studioMemberDetail {
    font-size: 14px;
    .title {
        height: 50px;
        line-height: 50px;
        font-size: 1.42em;
        .apply {
            margin-top: 7px;
            padding: 10px 16px;
            border-radius: .2em;
            color: #fff;
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
            &:hover {
                color: $org;
            }
            &.active {
                background-color: $org;
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