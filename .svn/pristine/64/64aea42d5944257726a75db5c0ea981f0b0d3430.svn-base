import Vue from 'vue'
import Router from 'vue-router'

import index from '../views/index_new.vue'
// 作品
import street from '../views/street/street.vue'
// 空间
import space from '../views/space/space.vue'
// 活动
import activity from '../views/activity/activity.vue'
// 学习
import study from '../views/study/study.vue'

import register from '../views/register'
import login from '../views/login'
import protocol from '../views/protocol'
import about from '../views/about'
import join from '../views/join'
import product from '../views/product'
import search from '../views/search/search.vue'

// 微信绑定
import bindWechat from '../views/bind_page.vue'
// 微信登录中间页
import bufferPage from '../views/buffer_page.vue'

// 找回密码
import findPwd from '../views/find_pwd.vue'

// 开通学校、教育局
import openOrg from '../views/open_org/open_org.vue'
import openApply from '../views/open_org/open_apply.vue'
import openRate from '../views/open_org/open_rate.vue'

// 资讯
import newsList from '../views/news/list'
import newsDetail from '../views/news/detail'

// 帮助中心
import help from '../views/helpCenter/help'
import faq from '../views/helpCenter/faq'
import feedback from '../views/helpCenter/feedback'
import doc from '../views/helpCenter/doc'

// 单点登录
import proplat from '../views/sso/provincialPlatform.vue'         // 省平台

import list from '../views/list.vue'
import workList from '../views/street/worksList.vue'
import streetStoryList from '../views/street/story/story_list.vue'
import streetLaGouList from '../views/street/lagou/lagou_list.vue'
import activityList from '../views/activity/activityList.vue'
import contestList from '../views/activity/contestList.vue'
import courseList from '../views/study/courseList.vue'
import projectList from '../views/study/projectList.vue'
import trainList from '../views/study/trainList.vue'
import studentList from '../views/space/studentList.vue'
import teacherList from '../views/space/teacherList.vue'
import eduList from '../views/space/eduList.vue'
import schoolList from '../views/space/schoolList.vue'
import claszList from '../views/space/claszList.vue'
import interestList from '../views/space/interestList.vue'
import studioList from '../views/space/studioList.vue'
import modelSchoolList from '../views/space/modelSchoolList.vue'
import activityTrain from '../views/study/activity_train.vue'
import resourceList from '../views/street/resourceList.vue'


Vue.use(Router)

export default new Router({
    // mode: 'history',
    mode: 'hash',
    linkActiveClass: 'active',
    linkExactActiveClass: 'e-active',
    // scrollBehavior() {
    //         return { x: 0, y: 0 }
    // },
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: { background: true }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                login: false,
                title: '登录'
            }
        },
        {
            path: '/bindWechat',
            name: 'bindWechat',
            component: bindWechat,
            meta: {
                login: false,
                title: '微信绑定'
            }
        },
        {
            path: '/bufferPage',
            name: 'bufferPage',
            component: bufferPage,
        },
        {
            path: '/findPwd',
            name: 'findPwd',
            component: findPwd,
            meta: {
                title: '找回密码'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                background: true,
                login: false,
                title: '注册'
            }
        },
        {
            path: '/protocol',
            name: 'protocol',
            component: protocol
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },
        {
            path: '/join',
            name: 'join',
            component: join
        },
        {
            path: '/product',
            name: 'product',
            component: product
        },
        {
            path: '/news',
            redirect: '/news/list'
        },
        {
            path: '/newsList',
            name: 'newsList',
            alias: '/news/list',
            component: newsList,
            meta: { background: true }
        },
        {
            path: '/news/:type/detail',
            name: 'newsDetail',
            component: newsDetail,
            meta: { background: true }
        },
        {
            path: '/help',
            name: 'help',
            component: help,
            redirect: '/help/faq',
            children: [
                { path: 'help', redirect: 'faq' },
                { path: 'faq', component: faq },
                { path: 'feedback', component: feedback },
                { path: 'doc', component: doc },
            ]
        },
        {
            path: '/sso/proplat',
            name: 'ssoProplat',
            component: proplat,
            meta: { background: true }
        },
        {
            path: '/street',
            component: street,
            meta: { background: true }
        },
        {
            path: '/list',
            component: list,
            meta: { background: true },
            children: [
                { path: 'works', alias: '/street/works', component: workList, meta: { background: true } },
                {path: 'story', alias: '/street/story', component: streetStoryList, meta: {position: {x: 0, y: 0}, background: true}},
                {path: 'lagou/:type', alias: '/street/lagou/:type', component: streetLaGouList, meta: {position: {x: 0, y: 0}, background: true}},
                { path: 'activity', alias: '/street/activity', component: activityList, meta: { background: true } },
                { path: 'contest', alias: '/street/contest', component: contestList, meta: { background: true } },
                { path: 'resource', alias: '/street/resource', component: resourceList, meta: { background: true } },
                { path: 'course', alias: '/education/course', component: courseList, meta: { background: true } },
                { path: 'project', alias: '/education/project', component: projectList, meta: { background: true } },
                { path: 'train', alias: '/education/train', component: trainList, meta: { background: true } },
                { path: 'actiTrain', alias: '/education/actiTrain', component: activityTrain, meta: { background: true } },
                { path: 'student', alias: '/space/student', component: studentList, meta: { background: true } },
                { path: 'teacher', alias: '/space/teacher', component: teacherList, meta: { background: true } },
                { path: 'edu', alias: '/space/edu', component: eduList, meta: { background: true } },
                { path: 'school', alias: '/space/school', component: schoolList, meta: { background: true } },
                { path: 'clasz', alias: '/space/clasz', component: claszList, meta: { background: true } },
                { path: 'interest', alias: '/space/interest', component: interestList, meta: { background: true } },
                { path: 'studio', alias: '/space/studio', component: studioList, meta: { background: true } },
                { path: 'model', alias: '/space/model', component: modelSchoolList, meta: { background: true } },
            ]
        },
        {
            path: '/space',
            component: space,
            meta: { background: true }
        },
        {
            path: '/activity',
            name: 'activity',
            component: activity,
            meta: { background: true }
        },
        {
            path: '/education',
            name: 'education',
            component: study,
            meta: { background: true }
        },
        // 开通学校、教育局
        {
            path: '/open',
            name: 'open',
            component: openOrg,
            meta: { background: true },
            redirect: '/open/apply',
            children: [
                { path: 'apply', component: openApply, meta: { background: true } },
                { path: 'rate', component: openRate, meta: { background: true } }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: search,
            meta: { background: true }
        },
    ],
})
