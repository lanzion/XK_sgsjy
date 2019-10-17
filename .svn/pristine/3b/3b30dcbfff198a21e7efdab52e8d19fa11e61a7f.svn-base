<template>
    <div class="bgc" :style="{backgroundImage: `url(${getFileUrl(detailInfo.background)})`}">
        <div :key="$route.query.uid" id="teacherSpace" class="container">
            <div class="teacherSpace clearfix">
                <!-- 面包屑 -->
                <el-breadcrumb separator=">" class="navigation">
                    <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'space' })">空间</el-breadcrumb-item>
                    <el-breadcrumb-item @click.native="redirect(isStudent ? pages.list.student.url : pages.list.teacher.url)">{{ isStudent ? '学生' : '教师' }}列表</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ isStudent ? '学生' : '教师' }}详情</el-breadcrumb-item>
                </el-breadcrumb>
                <aside class="fr">
                    <person-msg @on-show-more="handleMore" @on-switch-user="initData" v-bind="{detailInfo, relatedData}"></person-msg>
                </aside>
                <div class="fl content-left">
                    <v-tab :tabs="tabs" :router="router"></v-tab>
                    <router-view @on-switch-user="initData" class="ta_space__wrap person-space__content"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import tabs from 'Common/tabs.vue'
import personMsg from 'Common/side/person_msg.vue'
import { addVisitor } from '@/service/my.js'
import { requestIsCanVisit } from '@/service/common.js'

export default {
    data() {
        return {
            loginUId: this.$ls.get('loginUId', ''),
            router: {
                path: '/space/teacherDetail'
            },
            tabs: [
                { name: 'TA的动态', type: 'dynamic' },
                { name: 'TA的学习', type: 'study' },
                { name: 'TA的指导', type: 'guidance' },
                { name: 'TA的作品', type: 'works' },
                { name: 'TA的资源', type: 'resource' }
            ],
            isStudent: false
        }
    },
    computed: {
        ...mapState('teacherAndStudent', ['detailInfo', 'relatedData'])
    },
    beforeRouteEnter(to, from, next) { // 如果是学生/老师本人的话，进入自己的个人后台空间
        const loginUId = localStorage.getItem('loginUId')
        if (loginUId && loginUId === to.query.uid) {
            next()
            const host = process.env.NODE_ENV === 'production' ? `${location.protocol}//${location.host}` : `${location.protocol}//192.168.2.47`
            window.location.href = `${host}/personalAdmin/#/`
        } else {
            next()
            next((vm) => {
                requestIsCanVisit({ userId: to.query.uid }).then((res) => {
                    if (!(res.data.code === 200 && res.data.entity)) {
                        const model = to.path.includes('teacher') ? 'teacher' : 'student'
                        // vm.$message({ message: '您没有访问权限' })
                        vm.$alert('您没有访问权限', '温馨提示', {
                            confirmButtonText: '确定',
                            customClass: '__custom-msg-box',
                            callback: () => {
                                vm.redirect(vm.pages.list[model], { type: 6 })
                            }
                        })
                    }
                })
            })
        }
    },
    // beforeRouteEnter (to, from, next) { // 如果是学生/老师本人的话，进入自己的个人后台空间
    //     const loginUId = localStorage.getItem('loginUId')
    //     if (loginUId === to.query.uid) {
    //         next('/admin/dynamic')
    //     } else {
    //         next()
    //         next(vm => {
    //             requestIsCanVisit({ userId: to.query.uid }).then(res => {
    //                 if (!(res.data.code === 200 && res.data.entity)) {
    //                     vm.$router.push({ path: from.path, query: from.query })
    //                     vm.$message({message: '您没有访问权限'})
    //                 }
    //             })
    //         })
    //     }
    // },
    created() {
        this.initData()
    },
    components: {
        'v-tab': tabs,
        'person-msg': personMsg
    },
    methods: {
        ...mapActions('teacherAndStudent', ['requestRelatedData']),
        initData() {
            const { id, uid } = this.$route.query
            this.router.query = this.$route.query
            this.id = id
            this.uid = uid

            if (this.$route.path.includes('student')) {
                this.router.path = '/space/student'
                this.tabs.splice(2, 1, { name: 'TA的实践', type: 'practice' })
                this.isStudent = true
            } else {
                this.router.path = '/space/teacher'
                this.tabs.splice(2, 1, { name: 'TA的指导', type: 'guidance' })
            }

            this.requestRelatedData({ isStudent: this.isStudent, id: this.uid })
            this.addVisitRecord()
        },
        addVisitRecord() { // 增加访问记录
            this.loginUId && addVisitor({ toUserId: this.uid, userId: this.loginUId })
        },
        handleMore(label) { // 点击更多兴趣组、访客，增加TAB
            const _label = label === 'interest' ? 'TA的兴趣组' : 'TA的访客'
            this.tabs.splice(5, 1, { name: _label, type: label })
            this.$router.push({ path: `${this.router.path}/${label}`, query: this.router.query })
        }
    }
}
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    .teacherSpace {
        width: 100%;
        aside {
            width: 274px;
        }
        .content-left {
            width: 906px;
            /*padding: 20px;
                padding-bottom: 0;
                border: 1px solid #c9c9c9;*/
        }
    }

    .ta_space__wrap {
        &.container {
            width: 100%;
        }
    }

    .person-space__content {
        background: #fff;
        padding: 15px 15px 20px;
    }
</style>

<style lang="scss">
    .teacherSpace {
        .tabs-bar-header.highlight {
            margin-bottom: 0;
            .el-tabs__header {
                margin-bottom: 0;
            }
        }
        .blue {
            color: #00a0e9;
        }
        .sub-nav {
            box-sizing: border-box;
            height: 38px;
            line-height: 38px;
            margin-bottom: 26px;
            padding-left: 14px;
            background-color: #f0f0f0;
            font-size: 14px;
            .total {
                margin-right: 30px;
            }
        }
    }
</style>
