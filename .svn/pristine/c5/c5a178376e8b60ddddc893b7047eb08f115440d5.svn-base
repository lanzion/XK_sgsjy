<template>
    <div class="wrap container">
        <h1 class="title">
            <span :title="detail.title">{{ detail.title }}</span>
            <component :is="entryButton[$route.query.type].component" v-bind="{ addRoute, enrollHandler:entryButton[$route.query.type].handler  }" class="fr"></component>
        </h1>
        <div class="banner-img bg-img__wrap" title="点击查看原图" @click="visible.show = true" :style='{backgroundImage: "url(" + getFileUrl(detail.cover) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.path, query: { id: $route.query.id, type: $route.query.type } }">{{ item.name }}</router-link>
        </nav>
        <router-view :detail="detail"></router-view>
        <el-dialog title="报名参赛" :visible.sync="enrolPopover" size="tiny">
            <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                <el-form-item label="参赛人:">
                    {{ matchMessage.userName }}
                </el-form-item>
                <el-form-item label="所在地区:">
                    <span v-if="matchMessage.provinceName || matchMessage.cityName || matchMessage.areaName">{{ matchMessage.provinceName }}{{ matchMessage.cityName }}{{ matchMessage.areaName }}</span>
                    <span v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="所在学校:">
                    {{ matchMessage.schoolName }}
                </el-form-item>
                <el-form-item label="竞赛分组:" v-if="$ls.get('userIdentity') === 'student'">
                    {{ gradeId }}
                </el-form-item>
                <el-form-item label="参赛分类:" prop="projectIdArr">
                    <el-checkbox-group v-model="form.projectIdArr" :min="1">
                        <el-checkbox :label="i.id" v-for="(i, k) in projectIdOptions" :key="k">{{ i.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="参赛形式:" prop="actorWayArr">
                    <el-checkbox-group v-model="form.actorWayArr" :min="1">
                        <el-checkbox :label="i.id" v-for="(i, k) in actorWayOptions" :key="k">{{ i.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="参赛宣言:">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.slogan" resize="none" style="margin-top:10px;"></el-input>
                </el-form-item>
                <el-form-item class="pt20">
                    <button type="button" class="group_button sure fr ml15" @click="submit">参赛</button>
                    <button type="button" class="group_button cancel fr" @click="close">不参赛</button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="detail.cover"></img-preview>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import banner from '@/components/common/banner.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'
import entranceButtonOnline from '@/components/detail/entrance_button_online.vue'
import entranceButtonOffline from '@/components/detail/entrance_button_offline.vue'
import { requestDetail, requestOfflineDetail, requestIsApply, requestMatchActor, requestAdd, judgeTakepartIn, requestMatchProject, judgeExpert, judgeManage, offlineIsApply } from '@/service/contest_detail.js'

export default {
    components: {
        'v-banner': banner,
        'img-preview': imgPreview,
        'v-entry-btn-on': entranceButtonOnline,
        'v-entry-btn-off': entranceButtonOffline,
    },
    data() {
        const baseInfo = this.$ls.get('baseInfo') && this.$ls.get('baseInfo').baseInfo
        return {
            // 登录信息
            baseInfo: baseInfo,
            navList: [
                { path: '/contest/detail', name: '竞赛详情' },
                { path: '/contest/dynamic', name: '竞赛动态' },
                // { path: '/contest/works', name: '参赛作品' },
                { path: '/contest/awards', name: '获奖作品' },
                // { path: '/contest/comment', name: '评论专区' }
            ],
            entryButton: {
                1: {
                    component: 'v-entry-btn-on',
                    handler: this.enrolWindow
                },
                2: {
                    component: 'v-entry-btn-off',
                    handler: this.enrolContest
                }
            },
            detail: {},
            // 报名弹框
            enrolPopover: false,

            // 报名
            form: {
                matchId: this.$route.query.id,
                provinceId: '',
                cityId: '',
                areaId: '',
                schoolId: baseInfo ? baseInfo.schoolId : '',
                actorGroup: '',
                actorWay: '',
                slogan: '',
                projectList: [{
                    projectId: ''
                }],
                projectIdArr: [],
                actorWayArr: []
            },
            // 参赛形式选项
            actorWayOptions: [],
            // 竞赛分组
            gradeId: '',
            // 分类
            projectIdOptions: [],
            // 报名信息
            matchMessage: {},
            // 表单验证
            rules: {
                projectIdArr: { required: true, type: 'array', message: '请选择参赛分类', trigger: 'change' },
                actorWayArr: { required: true, type: 'array', message: '请选择参赛形式', trigger: 'change' },
            },
            identity: this.$ls.get('userIdentity') || '', // 登录用户身份
            visible: { // 查看大图的控制
                show: false
            },
            nowTime: new Date().getTime(),
        }
    },
    created() {
        if (Number(this.$route.query.type) === 2) {
            this.navList = [
                { path: '/contest/detail', name: '竞赛详情' },
                { path: '/contest/dynamic', name: '竞赛动态' },
                { path: '/contest/works', name: '参赛展示' },
                { path: '/contest/awards', name: '获奖展示' },
                // { path: '/contest/comment', name: '评论专区' }
            ]
        }
    },
    mounted() {
        this.init()
        this.getDetail()
        this.groupingFilter()
        requestMatchProject({ id: this.$route.query.id }).then((res) => {
            if (res.data.code === 200) {
                this.projectIdOptions = res.data.entity
            }
        })
    },
    methods: {
        groupingFilter() {
            if (this.baseInfo) {
                const string = this.baseInfo.gradeId
                switch (string) {
                    case 'grade1':
                    case 'grade2':
                    case 'grade3':
                    case 'grade4':
                    case 'grade5':
                    case 'grade6':
                        this.gradeId = '小学'
                        break
                    case 'grade7':
                    case 'grade8':
                    case 'grade9':
                        this.gradeId = '初中'
                        break
                    default:
                        this.gradeId = '高中'
                }
            }
        },
        toMyReview() {
            if (this.baseInfo) {
                judgeExpert({ matchId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.addRoute('review')
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            } else if (this.identity === 'admin') {
                this.showMessage('info', '温馨提示：您不是本赛事的评审专家，去欣赏参赛作品吧', 2000)
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // toManage() {
        //     const type = Number(this.$route.query.type)
        //     if (this.$ls.get('baseInfo')) {
        //         if (type === 1) {
        //             judgeManage({ id: this.$route.query.id }).then((res) => {
        //                 if (res.data.code === 200) {
        //                     this.addRoute('manage')
        //                 } else {
        //                     this.showMessage('info', res.data.msg)
        //                 }
        //             })
        //         } else {
        //             console.log('aaa')
        //             this.addRoute('manage')
        //         }
        //     } else if (this.identity === 'admin') {
        //         this.showMessage('info', '温馨提示：您不是本赛事的管理人员，不能进入管理入口', 2000)
        //     } else {
        //         this.$store.commit('toggleLoginModal', true)
        //     }
        // },
        close() {
            this.enrolPopover = false
            this.$refs.form.resetFields()
            this.projectId = []
            this.actorWay = []
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.projectList = this.form.projectIdArr.map(i => ({ projectId: i }))
                    this.form.actorWay = this.form.actorWayArr.join(',')
                    requestAdd(this.form).then((res) => {
                        if (res.data.code === 200) {
                            this.close()
                            this.$message({ type: 'success', message: '报名成功' })
                        } else {
                            this.showMessage('info', res.data.msg)
                        }
                    })
                } else {
                    this.$message({ message: '请按规则填写完整表单' })
                    return false
                }
            })
        },
        // 参赛入口
        toPlay() {
            if (this.$ls.get('baseInfo')) {
                judgeTakepartIn({ matchId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.addRoute('myPlay')
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            } else if (this.identity === 'admin') {
                this.showMessage('info', '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧', 2000)
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 报名参赛
        enrolContest(item) {
            if (this.$ls.get('baseInfo')) {
                if (this.identity !== 'student' && this.identity !== 'teacher') {
                    this.showMessage('info', '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧', 2000)
                } else {
                    offlineIsApply({ matchId: this.$route.query.id, projectId: item.projectId }).then((res) => {
                        if (res.data.code === 200) {
                            if (res.data.appendInfo.isApply === -1 && this.nowTime < (this.detail.enrollEndDate + 86400000)) {
                                if (item.projectId === 'ef2aab6a6007452ca6e5e989e9ac3dce' || item.projectId === '64f761e2f43349c4a99f1ed654859a60') {
                                    this.addRoute('enroll', false, item.projectId)
                                } else {
                                    this.$message({ message: '该项目类型报名已结束' })
                                }
                            } else if (res.data.appendInfo.isApply === -1 && this.nowTime > (this.detail.enrollEndDate + 86400000)) {
                                this.$message({ message: '报名已结束' })
                            } else if (res.data.appendInfo.isApply === 1 && this.nowTime < (this.detail.offlinePhasesList[0].startDate + 86400000)) {
                                this.addRoute('enroll', false, item.projectId)
                            } else if (this.nowTime > (this.detail.offlinePhasesList[0].startDate + 86400000)) {
                                this.$message('评比阶段已开始')
                            } else {
                                const isApply = res.data.appendInfo.isApply ? res.data.appendInfo.isApply : '0'
                                this.$message({
                                    message: {
                                        '-3': '报名未开始',
                                        3: '报名已结束',
                                    }[isApply]
                                })
                            }
                        } else {
                            this.$message({ type: 'error', message: res.data.msg })
                        }
                    })
                }
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 报名参赛
        enrolWindow() {
            if ((this.detail.actorType === '1' && this.identity === 'student') || (this.detail.actorType === '2' && this.identity === 'teacher')) {
                requestIsApply({ matchId: this.$route.query.id }).then((res) => {
                    // isApply: -3.报名未开始,-2.报名且未通过审核,-1.未报名,1.已报名 2.报名审核通过,3.报名已结束
                    // isProhibit: 判断是否在同一区域
                    if (res.data.code === 200 && [-1, -2].includes(res.data.appendInfo.isApply) && res.data.appendInfo.isProhibit) {
                        this.enrolPopover = true
                        requestMatchActor({ matchId: this.$route.query.id }).then((response) => {
                            if (response.data.code === 200) {
                                const entity = response.data.entity
                                this.matchMessage = entity
                                this.form.actorGroup = entity.actorGroup
                                this.form.provinceId = entity.provinceId
                                this.form.cityId = entity.cityId
                                this.form.areaId = entity.areaId
                                this.form.schoolId = entity.schoolId
                                if (entity.actorWay.split(',').length > 1) {
                                    this.actorWayOptions = [{ name: '个人', id: 1 }, { name: '团体', id: 2 }]
                                } else if (entity.actorWay.split(',')[0] === '1') {
                                    this.actorWayOptions = [{ name: '个人', id: 1 }]
                                } else if (entity.actorWay.split(',')[0] === '2') {
                                    this.actorWayOptions = [{ name: '团体', id: 2 }]
                                }
                            }
                        })
                    } else {
                        if (![-1, -2].includes(res.data.appendInfo.isApply)) {
                            const isApply = res.data.appendInfo.isApply ? res.data.appendInfo.isApply : '0'
                            this.$message({
                                message: {
                                    '-3': '报名未开始',
                                    2: '您已报名',
                                    1: '您的报名正在审核中',
                                    3: '报名已结束',
                                }[isApply]
                            })
                        }
                        if (!res.data.appendInfo.isProhibit) {
                            this.$message({
                                message: '报名人员与赛事不在同一区域！'
                            })
                        }
                    }
                })
            } else {
                this.showMessage('info', '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧', 2000)
            }
        },
        ...mapActions({
            save: 'matchDetail/save'
        }),
        // 请求详情
        getDetail() {
            const type = Number(this.$route.query.type)
            const handle = type === 1 ? requestDetail : requestOfflineDetail
            handle({ id: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.detail = res.data.entity
                    this.save(res.data.entity)
                }
            })
        },
        // 刷新后在session里面找添加的路由
        init() {
            const path = sessionStorage.getItem('contest_router')
            if (path) {
                this.addRoute(path, true)
            }
        },
        addRoute(path, ifRefresh = false, projectId = '') { // ifRefresh： 判断是不是刷新
            const routeName = {
                myPlay: '我的参赛',
                review: '我的评审',
                manage: '赛事管理',
                enroll: '报名参赛'
            }
            // console.log('sessionStorage456', path)
            // console.log('sessionStorage789', this.$route.path)
            const _query = { id: this.$route.query.id, type: this.$route.query.type }
            if (projectId) {
                _query.projectId = projectId
            }
            sessionStorage.setItem('contest_router', path)
            // this.$set(this.navList, 5, { path: `/contest/${path}`, name: routeName[path] })
            this.$set(this.navList, 3, { path: `/contest/${path}`, name: routeName[path] })
            if (ifRefresh) {
                this.$router.push({ path: this.$route.path, query: this.$route.query })
            } else {
                this.$router.push({ path: `/contest/${path}`, query: _query })
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.navList.pop()
        sessionStorage.removeItem('contest_router')
        next()
    },
    watch: {
        '$route.path': {
            handler: function (val) {
                const path = val.split('/')[2]
                switch (path) {
                    case 'detail':
                    case 'dynamic':
                    case 'works':
                    case 'awards':
                    case 'comment':
                        if (this.navList.length > 3) {
                            this.navList.pop()
                            sessionStorage.removeItem('contest_router')
                        }
                        break
                    default:
                }
            }
        },
        detail: {
            handler: function (val) {
                if (Object.keys(val).length) {
                    this.init()
                }
            }
        }
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
}
</script>

<style lang="scss">
    .wrap {
        .el-dialog {
            width: 500px;
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/home.scss';
@import '~@/assets/css/scss/vars.scss';
.banner-img {
    width: 1200px;
    // height: 300px;
    height: 150px;
}
.title {
    font-size: 20px;
    height: 58px;
    line-height: 53px;
}
.func {
    .btn_enrol {
        margin: 0;
        padding: 6px 10px;
        font-size: 14px;
        color: #23b8ff;
        border: 1px solid #23b8ff;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #23b8ff;
        color: #fff;
        &:hover {
            background-color: nth($default-color, 2)
        }
        &:last-child {
            margin-right: 0px;
        }
    }
}
/* .wrap {
    .nav-list {
        line-height: 58px;
        font-size: 16px;

        .nav-item {
            display: inline-block;
            height: 58px;
            padding: 0 1em;
            border-bottom: 2px solid transparent;
            box-sizing: border-box;
            cursor: pointer;

            &.active,
            &:hover {
                border-bottom-color: $theme-color;
                .nav-item-txt {
                    display: block;
                    color: $theme-color;
                }
            }
        }
    }
} */
</style>
