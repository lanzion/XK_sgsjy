import Vue from 'vue'
import Router from 'vue-router'

import index from '../views/'

// 动态
import dynamic from '../views/personal/dynamic/dynamic.vue'
// 学习
import studyIndex from '../views/personal/study/index.vue'
import study from '../views/personal/study/study.vue'
import evaluation from '../views/personal/evaluation/evaluation.vue'
//实践
import adminPracticeIndex from '../views/personal/practice/index.vue'
import adminPractice from '../views/personal/practice/practice.vue'
import adminEvaluation from '../views/personal/evaluation/evaluation.vue'
//项目
import adminProject from '../views/personal/project/project.vue'
import adminProjectReview from '../views/personal/project/projectReview.vue'
import adminProjectUnreview from '../views/personal/project/projectUnreview.vue'
import adminProjectList from '../views/personal/project/project_rowList.vue'
import adminProjectPublish from '../views/personal/project/projectPublish.vue'
import projectDetailRepertoire from '../components/project/projectDetail_repertoire.vue'
import projectDetailMember from '../components/project/projectDetail_member.vue'
import projectDetailStage from '../components/project/projectDetail_stage.vue'
import projectDetailEvaluate from '../components/project/projectDetail_evaluate.vue'
import projectDetailSummary from '../components/project/projectDetail_summary.vue'
import projectDetailShare from '../components/project/projectDetail_share.vue'
// 项目-讨论区
import projectDiscussView from '../components/project/projectDiscuss_view.vue'
import projectDiscussOverview from '../components/project/projectDiscuss_overview.vue'
import projectDiscussPublish from '../components/project/projectDiscuss_publish.vue'
import projectDiscussTheme from '../components/project/projectDiscuss_theme.vue'
import projectDiscussDetail from '../components/project/projectDiscuss_detail.vue'
// 课程
import adminCourse from '../views/personal/course/course.vue'
import backendCourseIndex from '../views/personal/course/index.vue'
import backendCourseChecked from '../views/personal/course/children/course_checked.vue'
import backendCourseUnchecked from '../views/personal/course/children/course_unchecked.vue'
import backendCourseQuestion from '../views/personal/course/children/course_question.vue'
import backendCourseRelease from '../views/personal/course/release.vue'
// 课程-详情
import courseDetail from '../views/personal/course/detail/course_detail.vue'
import courseTest from '../views/personal/course/detail/course_test.vue'
import videoPage from '../views/personal/course/detail/video.vue'
import courseTestQuestion from '../views/personal/course/detail/children/test_question.vue'
import courseTestAnswer from '../views/personal/course/detail/children/test_answer.vue'
import courseDetailInfo from '../views/personal/course/detail/children/detail_info.vue'
import courseDetailOutline from '../views/personal/course/detail/children/detail_outline.vue'
import courseDetailComment from '../views/personal/course/detail/children/detail_comment.vue'
import courseDetailStudent from '../views/personal/course/detail/children/detail_student.vue'
import courseDetailDiscuss from '../views/personal/course/detail/children/detail_discuss.vue'
import courseDetailDiscussInitiate from '../views/personal/course/detail/children/discuss_initiate.vue'
import courseDetailDiscussTheme from '../views/personal/course/detail/children/discuss_theme.vue'
import courseDetailDiscussInitiateDetail from '../views/personal/course/detail/children/discuss_initiate_detail.vue'
import courseDetailShare from '../views/personal/course/detail/children/detail_share.vue'
import courseDetailNote from '../views/personal/course/detail/children/detail_note.vue'
//活动部分
import adminActivity from '../views/personal/activity/activity.vue'
import activityCheckedList from '../views/personal/activity/children/activity_checked_list'
import activityUncheckedList from '../views/personal/activity/children/activity_unchecked_list'
import adminAvtivityDetails from '../views/personal/activity/children/activityDetails.vue'
import activity_details from '../views/personal/activity/children/activity_details.vue'
import activity_member from '../views/personal/activity/children/activity_member.vue'
import activity_result from '../views/personal/activity/children/activity_result.vue'
import activity_discuss from '../views/personal/activity/children/activity_discuss.vue'
import adminActivityPublish from '../views/personal/activity/publish_activity.vue'
// 作品
import adminWorks from '../views/personal/works/works.vue'
import adminWorksList from '../views/personal/works/admin_works_list.vue'
import adminWorksPublish from '../views/personal/works/works_publish.vue'
import adminWorksDetails from '../views/personal/works/adminWorksDetails.vue'
// 资源部分
import adminResource from '../views/personal/resource/resource.vue'
import resourceCheckedList from '../views/personal/resource/children/resource_checked_list.vue'
import resourceUncheckedList from '../views/personal/resource/children/resource_unchecked_list.vue'
import adminResourceUpload from '../views/personal/resource/resource_upload.vue'
import resourcesDetails from 'components/resource/resourcesDetails.vue'
//后台课题
import adminSubject from '../views/personal/subject/subject.vue'
import subjectCheckedList from '../views/personal/subject/children/subject_checked_list.vue'
import subjectUncheckedList from '../views/personal/subject/children/subject_unchecked_list.vue'
import adminSubjectApply from '../views/personal/subject/subject_apply.vue'
import adminSubjectDetails from '../views/personal/subject/adminSubjectDetails.vue'
import subject_details from '../views/personal/subject/detail/subject_details.vue'
import subject_task from '../views/personal/subject/detail/subject_task.vue'
import subject_activity from '../views/personal/subject/detail/subject_activity.vue'
import subject_result from '../views/personal/subject/detail/subject_result.vue'
import subject_stage from '../views/personal/subject/detail/subject_stage.vue'
import subject_discuss from '../views/personal/subject/detail/subject_discuss.vue'
import subject_discussInitiate from '../views/personal/subject/detail/subjectDiscuss_initiate.vue'
import subject_discussDetail from '../views/personal/subject/detail/subject_discussDetail.vue'
// 收藏
import adminCollection from '../views/personal/collection/collection.vue'
//我的私信
import adminPrivateLetter from '../views/personal/privateLetter/private_letter.vue'
import adminPrivate from '../views/personal/privateLetter/my_letter.vue'
import adminLetterDetail from '../views/personal/privateLetter/letter_detail.vue'
import adminSysMsg from '../views/personal/privateLetter/system_msg.vue'
// 个人空间关注
import adminFocus from '../views/personal/focus/focus.vue'
import adminMyfocus from '../views/personal/focus/focus_myFocus.vue'
import adminToMyfocus from '../views/personal/focus/focus_ToMyFocus.vue'
import adminMyFriend from '../views/personal/focus/focus_myFriend.vue'
// 个人空间访客
import adminMyvisitor from '../views/personal/visitor/visitor.vue'
// 访问权限
import adminAccessRight from '../views/personal/accessRight/accessRight.vue'
// 基本资料
import adminBasicInformation from '../views/personal/profile/profile.vue'
// 账号安全
import adminAccountSecurity from '../views/personal/accountSecurity/accountSecurity.vue'
import adminModifyPwd from '../views/personal/accountSecurity/modifyPwd.vue'
import adminBindEmail from '../views/personal/accountSecurity/bindEmail.vue'
import adminModifyEmail from '../views/personal/accountSecurity/modifyEmail.vue'
import adminBindMobile from '../views/personal/accountSecurity/bindMobile.vue'
import adminModifyMobile from '../views/personal/accountSecurity/modifyMobile.vue'
// 头像设置
import adminAvatarOption from '../views/personal/avatar/avatar.vue'
// 背景设置
import adminBackground from '../views/personal/background/background.vue'
// 兴趣组
import adminInterest from '../views/personal/interest/interest.vue'
import createInterest from '../views/personal/interest/create_interest.vue'
//个人空间-我参与的工作室
import adminStudio from '../views/personal/studio/studio.vue'
import studioMemberApply from '../views/personal/studio/apply.vue'
//个人空间-我的参赛
import adminContest from '../views/personal/contest/contest.vue'
import adminMyContest from '../views/personal/contest/my_contest.vue'
import adminMyReview from '../views/personal/contest/my_review.vue'
//个人空间-故事
import adminStory from '../views/personal/story/story.vue'
import storyCheckedList from '../views/personal/story/children/story_checked_list.vue'
import storyUncheckedList from '../views/personal/story/children/story_unchecked_list.vue'
import adminStoryPublish from '../views/personal/story/story_publish.vue'
//个人空间-我的成员（众创空间）
import adminMember from '../views/personal/member/member.vue'
import myMember from '../views/personal/member/my_member.vue'
import memberApply from '../views/personal/member/enter_apply.vue'
import memberInvite from '../views/personal/member/enter_invite.vue'
//个人空间-我入驻的空间
import adminMult from '../views/personal/mult/mult.vue'
import enterSpace from '../views/personal/mult/children/mult_space.vue'
import enterApply from '../views/personal/mult/children/mult_apply.vue'
import enterInvite from '../views/personal/mult/children/mult_invite.vue'
//个人空间 - 服务
import adminService from '../views/personal/service/service.vue'
import adminServiceList from '../views/personal/service/service_list.vue'
import adminServicePublish from '../views/personal/service/service_publish.vue'
//个人空间 - 需求
import adminDemand from '../views/personal/demand/demand.vue'
import adminDemandList from '../views/personal/demand/demand_list.vue'
import adminDemandPublish from '../views/personal/demand/demand_publish.vue'
//个人空间-商业策划
import adminPlan from '../views/personal/businessPlan/plan.vue'
import planCheckedList from '../views/personal/businessPlan/children/plan_checked_list.vue'
import planUncheckedList from '../views/personal/businessPlan/children/plan_unchecked_list.vue'
import adminPlanPublish from '../views/personal/businessPlan/publish_plan.vue'
// 个人空间-勾搭
import adminLagou from '../views/personal/lagou/lagou.vue'
// 资讯
import adminInfoIndex from '../views/personal/information/index.vue'
import adminInfoList from '../views/personal/information/info.vue'
import adminInfoRelease from '../views/personal/information/release.vue'
//个人空间-邀约
import adminInvite from '../views/personal/invite/invite.vue'



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
            redirect: '/admin'
        },
        {
            path: '/admin',
            name: 'admin',
            component: index,
            redirect: '/admin/dynamic',
            meta: { background: true },
            children: [
                // 动态
                { path: 'dynamic', component: dynamic, name: 'dynamic' },
                // 学习
                {
                    path: 'study',
                    component: studyIndex,
                    children: [
                        {path: '', component: study},
                        {path: 'list', component: study},
                        {path: 'eval', component: evaluation,}
                    ]
                },
                { // 实践
                    path: 'practice',
                    component: adminPracticeIndex,
                    children: [
                        {path: '', component: adminPractice},
                        {path: 'list', component: adminPractice},
                        {path: 'eval', component: adminEvaluation,}
                    ]
                },
                // 项目
                {
                    path: 'project',
                    component: adminProject,
                    redirect:'/admin/project/checked',
                    children: [
                        { path: 'project', component: adminProjectList, alias: 'checked' },
                        { path: 'project', component: adminProjectList, alias: 'unchecked' }
                    ]
                },
                { path: 'projectPublish', component: adminProjectPublish, alias: '/admin/project/publish'},
                { path: 'projectPreview', component: adminProjectPublish, alias: '/admin/project/preview'},
                { path: 'projectReview', component: adminProjectReview, alias: '/admin/project/detail', redirect: '/admin/project/detail/repertoire',
                    children: [
                        { path: 'repertoire', component: projectDetailRepertoire, alias: '/admin/project/detail/repertoire' },
                        { path: 'member', component: projectDetailMember, alias: '/admin/project/detail/member' },
                        { path: 'stage', component: projectDetailStage, alias: '//admin/project/detail/stage' },
                        { path: 'summary', component: projectDetailSummary, alias: '/admin/project/detail/summary' },
                        { path: 'evaluate', component: projectDetailEvaluate, alias: '/admin/project/detail/evaluate' },
                        { path: 'share', component: projectDetailShare, alias: '/admin/project/detail/share' },
                        {
                            path: 'discuss',
                            component: projectDiscussView,
                            redirect:'/admin/project/detail/discuss/overview',
                            children: [
                                { path: 'overview', component: projectDiscussOverview },
                                { path: 'publish', component: projectDiscussPublish },
                                { path: 'theme', component: projectDiscussTheme },
                                { path: 'detail', component: projectDiscussDetail }
                            ]
                        }
                    ]
                },
                // 课程
                {
                    path: 'course',
                    component: backendCourseIndex,
                    children: [
                        {
                            path: '',
                            component: adminCourse,
                            redirect: '/admin/course/checked',
                            children: [
                                {path: 'checked', component: backendCourseChecked},
                                {path: 'unchecked', component: backendCourseUnchecked},
                                {path: 'question', component: backendCourseQuestion}
                            ]
                        },
                        {
                            path: 'release',
                            component: backendCourseRelease
                        },
                        {
                            path: 'preview',
                            component: backendCourseRelease
                        },
                        {
                            path: 'detail',
                            component: courseDetail,
                            children: [
                                {path: '', redirect: '/admin/course/detail/info'},
                                {path: 'info', component: courseDetailInfo},
                                {path: 'outline', component: courseDetailOutline},
                                {path: 'comment', component: courseDetailComment},
                                {path: 'student', component: courseDetailStudent},
                                {
                                    path: 'discuss',
                                    component: courseDetailDiscuss,
                                    children: [
                                    ]
                                },
                                {path: 'initiate', component: courseDetailDiscussInitiate},
                                {path: 'discussTheme', component: courseDetailDiscussTheme},
                                {path: 'discussDetail', component: courseDetailDiscussInitiateDetail},
                                {path: 'share', component: courseDetailShare},
                                {path: 'note', component: courseDetailNote}
                            ]
                        }
                    ]
                },
                // 活动
                { path: 'activity', name:'adminActivity', component: adminActivity, redirect:'/admin/activity/audited',
                    children: [
                        { path: 'activityAudited', component: activityCheckedList, alias: '/admin/activity/audited'},
                        { path: 'activityPending', component: activityUncheckedList, alias: '/admin/activity/pending'}
                    ]
                },
                { path: 'activityPublish', component: adminActivityPublish, alias:'/admin/activity/publish' },
                { path: 'adminActivityDetail', name:'adminActivityDetail', component: adminAvtivityDetails, alias:'/admin/activity/detail', redirect:'/admin/activity/detail/info',
                    children: [
                        { path: 'info', component: activity_details, alias:'/admin/activity/detail/info'},
                        { path: 'member', component: activity_member, alias:'/admin/activity/detail/member'},
                        { path: 'result', component: activity_result, alias:'/admin/activity/detail/result'},
                        { path: 'discuss', component: activity_discuss, alias:'/admin/activity/detail/discuss'}
                    ]
                },
                { path: 'pendingActivityDetail', component: adminAvtivityDetails,alias:'/admin/activity/pendingDetail', redirect:'/admin/activity/detail/pendingDetail',
                    children: [
                        { path: 'activity_details', component: activity_details, alias:'/admin/activity/detail/pendingDetail'}
                    ]
                },
                // 作品
                { path: 'works', name:'adminWorks', component: adminWorks, redirect: '/admin/works/audited',
                    children: [
                        { path: 'worksAudited', component: adminWorksList, alias: '/admin/works/audited' },
                        { path: 'worksPending', component: adminWorksList, alias: '/admin/works/pending' }
                    ]
                },
                { path: 'adminWorksDetails', component: adminWorksDetails, alias: '/admin/works/details' },
                { path: 'worksPublish', component: adminWorksPublish, alias: '/admin/works/publish' },
                { path: 'worksPreview', component: adminWorksPublish, alias: '/admin/works/preview' },
                // 资源
                { path: 'resource', name:'adminResource', component: adminResource, redirect: '/admin/resource/audited',
                    children: [
                        { path: 'resourceAudited', component: resourceCheckedList, alias: '/admin/resource/audited' },
                        { path: 'resourcePending', component: resourceUncheckedList, alias: '/admin/resource/pending' }
                    ]
                },
                { path: 'adminResourceDetails', component: resourcesDetails, alias: '/admin/resource/details' },
                { path: 'resourceUpload', component: adminResourceUpload, alias: '/admin/resource/upload' },
                { path: 'resourcePreview', component: adminResourceUpload, alias: '/admin/resource/preview' },
                // 课题
                { path: 'subject', name:'adminSubject', component: adminSubject, redirect: '/admin/subject/audited',
                    children: [
                        { path: 'subjectAudited', component: subjectCheckedList, alias: '/admin/subject/audited' },
                        { path: 'subjectPending', component: subjectUncheckedList, alias: '/admin/subject/pending' }
                    ]
                },
                { path: 'adminSubjectDetails', name: 'adminSubjectDetails', component: adminSubjectDetails, alias: '/admin/subject/detail', redirect: '/admin/subject/detail/info',
                    children: [
                        { path: 'info', component: subject_details, alias: '/admin/subject/detail/info' },
                        { path: 'task', component: subject_task, alias: '/admin/subject/detail/task' },
                        { path: 'activity', component: subject_activity, alias: '/admin/subject/detail/activity' },
                        { path: 'result', component: subject_result, alias: '/admin/subject/detail/result' },
                        { path: 'stage', component: subject_stage, alias: '/admin/subject/detail/stage' },
                        { path: 'discuss', component: subject_discuss, alias: '/admin/subject/detail/discuss' },
                        { path: 'initiate', component: subject_discussInitiate, alias: '/admin/subject/detail/initiate' },
                        { path: 'discussDetail', component: subject_discussDetail, alias: '/admin/subject/detail/discussDetail' }
                    ]
                },
                { path: 'apply', component: adminSubjectApply, alias: '/admin/subject/apply' },
                { path: 'preview', component: adminSubjectApply, alias: '/admin/subject/preview' },
                // 收藏
                { path: 'collection', component: adminCollection},
                // 私信
                { path: 'privateLetter', component: adminPrivateLetter,
                    children: [
                        { path: '', redirect: '/admin/privateLetter/letter' },
                        { path: 'letter', component: adminPrivate },
                        { path: 'sysmsg', component: adminSysMsg },
                        { path: 'letterDetail', component: adminLetterDetail }
                    ]
                },
                // 关注
                {
                    path: 'focus',
                    component: adminFocus,
                    redirect: '/admin/focus/myFocus',
                    children: [
                        { path: 'myFocus', component: adminMyfocus },
                        { path: 'toMyFocus', component: adminToMyfocus },
                        { path: 'myFriend', component: adminMyFriend }
                    ]
                },
                // 访客
                { path: 'visitor', component: adminMyvisitor },
                // 访问权限
                { path: 'access', component: adminAccessRight },
                // 基本资料
                { path: 'profile', component: adminBasicInformation },
                // 账号安全
                { path: 'security', name:'accountSecurity', component: adminAccountSecurity },
                { path: 'modifyPwd', component: adminModifyPwd, alias: '/admin/security/modifyPwd' },
                { path: 'bindEmail', component: adminBindEmail, alias: '/admin/security/bindEmail' },
                { path: 'modifyEmail', component: adminModifyEmail, alias: '/admin/security/modifyEmail' },
                { path: 'bindMobile', component: adminBindMobile, alias: '/admin/security/bindMobile' },
                { path: 'modifyMobile', component: adminModifyMobile, alias: '/admin/security/modifyMobile' },
                // 头像设置
                { path: 'avatar', component: adminAvatarOption },
                // 背景设置
                { path: 'background', component: adminBackground},
                // 兴趣组
                { path: 'interest', name: 'adminInterest', component: adminInterest },
                { path: 'createInterest', component: createInterest, alias:'/admin/interest/create' },
                { path: 'previewInterest', component: createInterest, alias:'/admin/interest/preview' },
                //我参与的工作室
                { path: 'studio', name: 'adminStudio', component: adminStudio },
                { path: 'createStudio', component: studioMemberApply, alias: '/admin/studio/create'  },
                //我的参赛
                { path: 'contest', name: 'adminContest', component: adminContest, redirect: '/admin/contest/mine',
                    children: [
                        { path: 'myContest', component: adminMyContest, alias: '/admin/contest/mine' },
                        { path: 'myReview', component: adminMyReview, alias: '/admin/contest/review' }
                    ]
                },
                // 故事
                { path: 'story', name: 'adminStory', component: adminStory, redirect: '/admin/story/audited',
                  children: [
                    { path: 'storyAudited', component: storyCheckedList, alias: '/admin/story/audited' },
                    { path: 'storyPending', component: storyUncheckedList, alias: '/admin/story/pending' },
                  ]
                },
                { path:'storyPublish', name: 'storyPublish', component: adminStoryPublish, alias: '/admin/story/publish' },
                { path:'storyPreview', name: 'storyPreview', component: adminStoryPublish, alias: '/admin/story/preview' },
                //众创空间-我的成员
                { path: 'member', name: 'adminMember', component: adminMember, redirect: '/admin/member/mine',
                    children: [
                        { path: 'myMember', component: myMember, alias: '/admin/member/mine' },
                        { path: 'memberApply', component: memberApply, alias: '/admin/member/apply' },
                        { path: 'memberInvite', component: memberInvite, alias: '/admin/member/invite' }
                    ]
                },
                //我入驻的众创空间
                { path: 'mult', name:'adminMult', component: adminMult, redirect: '/admin/mult/space',
                    children: [
                        { path: 'enterSpace', component: enterSpace, alias: '/admin/mult/space' },
                        { path: 'enterApply', component: enterApply, alias: '/admin/mult/apply' },
                        { path: 'enterInvite', component: enterInvite, alias: '/admin/mult/invite' }
                    ]
                },
                // 服务
                {
                    path: 'service',
                    component: adminService,
                    redirect: '/admin/service/audited',
                    children: [
                        { path: 'audited', component: adminServiceList },
                        { path: 'pending', component: adminServiceList },
                    ]
                },
                { path:'servicePublish', component: adminServicePublish, alias:'/admin/service/publish' },
                // 需求
                {
                    path: 'demand',
                    component: adminDemand,
                    redirect: '/admin/demand/audited',
                    children: [
                        { path: 'audited', component: adminDemandList },
                        { path: 'pending', component: adminDemandList },
                    ]
                },
                { path:'demandPublish', component: adminDemandPublish, alias:'/admin/demand/publish' },
                { // 资讯
                    path: 'info',
                    component: adminInfoIndex,
                    children: [
                        {path: '', component: adminInfoList},
                        {path: 'list', component: adminInfoList},
                        {path: 'release', component: adminInfoRelease,}
                    ]
                },
                {path: 'lagou', component: adminLagou},
                //商业策划
                { path: 'plan', name: 'adminPlan', component: adminPlan, redirect: '/admin/plan/audited',
                  children: [
                    { path: 'planAudited', component: planCheckedList, alias: '/admin/plan/audited' },
                    { path: 'planPending', component: planUncheckedList, alias: '/admin/plan/pending' },
                  ]
                },
                //邀约（投资人、投资机构）
                { path: 'invite', component: adminInvite },
            ]
        },
    ],
})
