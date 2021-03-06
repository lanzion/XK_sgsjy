import Vue from 'vue'
import Router from 'vue-router'

// 首页
import index from 'View/index.vue'
// 赛事
import contest from 'View/contest/contest.vue'
// 赛事-详情
import contest_detail from 'View/contest/detail/detail.vue'
// 赛事-动态
import contest_dynamic from 'View/contest/dynamic/dynamic.vue'
// 赛事-动态详情
import contest_dynamicDetail from 'View/contest/dynamic/dynamic_detail.vue'
// 赛事-参赛入口（我的参赛）
import contest_myPlay from 'View/contest/myPlay/myPlay.vue'
// 赛事-参赛入口（我的参赛）-上传作品
import contest_myPlayUpload from 'View/contest/myPlay/myPlay_upload.vue'
// 赛事-参赛入口（我的参赛）-我的作品
import contest_myPlayWorks from 'View/contest/myPlay/myPlay_myWorks.vue'
// 赛事-参赛入口（我的参赛）-我的作品 - 详情
import contest_myPlayWorksDetail from 'View/contest/myPlay/myPlay_Work/myPlay_workDetail.vue'
// 参赛作品
import competeWorks from 'View/contest/compete_works/compete_works_list.vue'
import worksDetail from 'View/contest/compete_works/works_detail.vue'
// 获奖作品
import awardsWorks from 'View/contest/awards/awards.vue'
import moreAwardsList from 'View/contest/awards/more_list.vue'
// 我的评审
import myReview from 'View/contest/my_review/my_review.vue'
import reviewWorks from 'View/contest/my_review/review_works.vue'
import worksComment from 'View/contest/compete_works/works_comment.vue'
import worksReview from 'View/contest/compete_works/works_review.vue'
import reviewDetail from 'View/contest/contest_manage/contest_works/review_record.vue'

// 评论专区
import contestComment from 'View/contest/comment/contest_comment.vue'
// 赛事管理
import contestManage from 'View/contest/contest_manage/contest_manage.vue'
// 赛事管理-评奖设定
import evaluateSetting from 'View/contest/contest_manage/evaluate_setting/evaluate_setting.vue'
import contestMember from 'View/contest/contest_manage/contest_member/contest_member.vue'
// 赛事管理-作品
import contestWorks from 'View/contest/contest_manage/contest_works/contest_works.vue'
import passWorks from 'View/contest/contest_manage/contest_works/pass_works.vue'
import pendingWorks from 'View/contest/contest_manage/contest_works/pending_works.vue'
import noPassWorks from 'View/contest/contest_manage/contest_works/noPass_works.vue'
import worksReviewRecord from 'View/contest/contest_manage/contest_works/review_record.vue'
import worksAudit from 'View/contest/contest_manage/contest_works/works_audit.vue'

import awardList from 'View/contest/contest_manage/award_list/award_list.vue'
import quotaList from 'View/contest/contest_manage/allot_quota/quota_list.vue'
import reviewExpert from 'View/contest/contest_manage/review_expert/expert_list.vue'
import addExpert from 'View/contest/contest_manage/review_expert/expert_add.vue'
// 赛事管理-竞赛统计
import contestStatistics from 'View/contest/contest_manage/contest_statistics/contest_statistics.vue'
import statAwards from 'View/contest/contest_manage/contest_statistics/stat_awards.vue'
import awardRanking from 'View/contest/contest_manage/contest_statistics/award_ranking'

import statCompete from 'View/contest/contest_manage/contest_statistics/stat_compete.vue'
// 赛事管理 - 赛程详情
import scheduleDetail from 'View/contest/contest_manage/schedule_detail/schedule_detail.vue'
// 赛事管理 - 参赛管理
import competitionManage from 'View/contest/contest_manage/competition_manage/competition_manage.vue'
// 赛事管理 - 动态
import contestManageDynamic from 'View/contest/contest_manage/contestManage_dynamic/contestManage_dynamic.vue'
// 赛事管理 - 动态 - 新增
import contestManageDynamicAdd from 'View/contest/contest_manage/contestManage_dynamic/contestManage_dynamicAdd.vue'

// 线下竞赛-报名参赛
import enrollContest from 'View/contest/enroll_contest/enroll_contest.vue'
// 线下竞赛-参赛管理-参赛详情
import offlineManageWorksDetail from 'View/contest/contest_manage/competition_manage/offline_detail.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    mode: 'hash',

    // scrollBehavior() {
    //   return { x: 0, y: 0 }
    // },
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            // redirect: '/index',
        },
        // {
        //   path: '/index',
        //   component: index,
        //   meta: { background: false },
        // },
        {
            path: '/contest',
            component: contest,
            redirect: '/contest/detail',
            children: [
                { path: 'detail', component: contest_detail },
                { path: 'dynamic', component: contest_dynamic },
                { path: 'works', component: competeWorks },
                { path: 'awards', component: awardsWorks },
                { path: 'awards/more', component: moreAwardsList },
                { path: 'comment', component: contestComment },
                {
                    path: 'review',
                    component: myReview,
                    redirect: '/contest/review/pending',
                    meta: { requireAuth: 'expert' },
                    children:
                        [
                            { path: 'pending', component: reviewWorks },
                            { path: 'audited', component: reviewWorks },
                            {
                                path: 'pending/detail',
                                component: worksDetail,
                                redirect: '/contest/review/pending/detail/review',
                                children:
                                    [
                                        { path: 'comment', component: worksComment },
                                        { path: 'review', component: worksReview }
                                    ]
                            },
                            {
                                path: 'audited/detail',
                                component: worksDetail,
                                redirect: '/contest/review/audited/detail/review',
                                children:
                                    [
                                        { path: 'comment', component: worksComment },
                                        { path: 'review', component: reviewDetail }
                                    ]
                            }
                        ]
                },
                {
                    path: 'manage',
                    component: contestManage,
                    redirect: '/contest/manage/dynamic',
                    meta: { requireAuth: 'manage' },
                    children:
                        [
                            { path: 'dynamic', component: contestManageDynamic },
                            { path: 'dynamicAdd', component: contestManageDynamicAdd },
                            { path: 'evaluate', component: evaluateSetting },
                            { path: 'member', component: contestMember },
                            {
                                path: 'works',
                                component: contestWorks,
                                redirect: '/contest/manage/works/pending',
                                children:
                                    [
                                        { path: 'pending', component: pendingWorks, meta: { type: 'pending' } },
                                        // { path: 'pass', component: passWorks },
                                        { path: 'pass', component: passWorks, meta: { type: 'pass' } },
                                        { path: 'noPass', component: noPassWorks, meta: { type: 'noPass' } }
                                    ]
                            },
                            { path: 'reviewRecord', component: worksReviewRecord, alias: '/contest/manage/works/reviewRecord' },
                            { path: 'audit', component: worksAudit, alias: '/contest/manage/works/audit' },
                            { path: 'quota', component: quotaList },
                            { path: 'expert', component: reviewExpert },
                            { path: 'expert/add', component: addExpert },
                            { path: 'expert/edit', component: addExpert },
                            { path: 'awards', component: awardList },
                            {
                                path: 'statistics',
                                component: contestStatistics,
                                redirect: '/contest/manage/statistics/awards',
                                children:
                                    [
                                        { path: 'awards', component: statAwards, meta: { type: 'awards' } },
                                        { path: 'ranking', component: awardRanking, meta: { type: 'ranking' } },
                                        { path: 'compete', component: statCompete, meta: { type: 'compete' } }
                                    ]
                            },
                            { path: 'detail', component: scheduleDetail },
                            { path: 'entry', component: competitionManage },
                            { path: 'matchDetail', component: offlineManageWorksDetail, alias: '/contest/manage/entry/matchDetail' }
                        ]
                },
                {
                    path: 'myPlay',
                    component: contest_myPlay,
                    redirect: '/contest/myPlay/uploadWork',
                    meta: { requireAuth: 'participant' },
                    children:
                        [
                            { path: 'uploadWork', component: contest_myPlayUpload },
                            { path: 'myWorks', component: contest_myPlayWorks },
                            {
                                path: 'myWorks/detail',
                                redirect: '/contest/myPlay/myWorks/detail/comment',
                                component: contest_myPlayWorksDetail,
                                children: [
                                    { path: 'comment', component: worksComment },
                                    { path: 'review', component: reviewDetail }
                                ]
                            }
                        ]
                },
                // 线下竞赛-报名参赛
                {
                    path: 'enroll',
                    name: 'enrollContest',
                    component: enrollContest
                }
            ]
        },
        { path: '/dynamicDetail', component: contest_dynamicDetail, meta: { background: true } },
        { path: '/worksDetail/:model', component: worksDetail }
    ],
})
