import Vue from 'vue'
import Router from 'vue-router'

// 一级路由

// import constructing from '@/components/common/constructing.vue'

import spaceIndex from '../view/space/index.vue'
// 教育局
import educationBureau from '@/view/space/edu/educationBureau.vue'
//教育局空间
import educationBureauSpace from '@/view/space/edu/educationBureauSpace.vue'
// 学校
import school from '@/view/space/school/school.vue'
//学校空间
import schoolSpace from '@/view/space/school/schoolSpace.vue'
// 班级
import clasz from '@/view/space/clasz/clasz.vue'
//班级空间
import claszSpace from '@/view/space/clasz/claszSpace.vue'
import claszManage from '../view/space/clasz/claszManage/clasz_manage.vue'
// 企业
import enterprise from '@/view/space/enterprise/enterprise.vue'
// 投资人
import investor from '@/view/space/investor/investor.vue'
// 投资机构
import investOrg from '@/view/space/investOrg/investOrg.vue'
// 众创空间
import multSpace from '@/view/space/multSpace/multSpace.vue'
// 企业、投资人、投资机构、众创空间详情
import entInvInvorgMulDetail from '@/view/space/enterprise/entInvInvorgMulDetail.vue'
//企业、投资人、投资机构、众创空间-资讯详情
import entInvInvorgMuliInfoDetail from '@/view/space/enterprise/information_detail.vue'

// 教师、学生
import person from 'View/space/person/person.vue'
import student from 'View/space/person/student.vue'
import personSpace from 'View/space/person/personSpace.vue'
import personDynamic from '../view/space/person/children/dynamic.vue'
import personStudy from '../view/space/person/children/study.vue'
import personWorks from '../view/space/person/children/works.vue'
import personResource from '../view/space/person/children/resource.vue'
import teacherGuidance from '../view/space/person/children/guidance.vue'
import personInterest from '../view/space/person/children/interest.vue'
import personVisitor from '../view/space/person/children/visitor.vue'

// 兴趣组
import interests from 'View/space/interests/interests.vue'
// 兴趣组空间
import interestsSpace from 'View/space/interests/interestsSpace.vue'
import interestManage from '../view/space/interests/interestManage/interest_manage.vue'
// 兴趣组文章
import interestArticle from 'View/space/interests/article/article.vue'
// 兴趣组文章发布
import interestArticlePublish from 'View/space/interests/article/articlePublish.vue'
// 兴趣组文章详情
import interestArticleDetail from 'View/space/interests/article/articleDetail.vue'
// 兴趣组作品
import interestWorks from 'View/space/interests/works/works.vue'

// 课程
import course from '@/components/course/course.vue'

// 教育
import eduIndex from '../view/education/index.vue'
import eduProjectIndex from '../view/education/project/index.vue'
import eduProjecList from '../view/education/project/list.vue'
import eduCourseIndex from '../view/education/course/index.vue'
import eduCourseList from '../view/education/course/list.vue'
import eduTrainIndex from '../view/education/train/index.vue'
import eduTrainList from '../view/education/train/list.vue'
import eduTrainDetails from '../view/education/train/trainDetail.vue'
import eduTrainDetailsEval from '../view/education/train/trainDetail_evaluation.vue'
import eduTrainDetailsDis from '../view/education/train/trainDiscuss_view.vue'
import eduTrainDetailsIndex from '../view/education/train/trainDiscuss_index.vue'
import eduTrainDetailsPub from '../view/education/train/trainDiscuss_pub.vue'
import eduTrainDetailsDetail from '../view/education/train/trainDiscuss_detail.vue'

import eduProject from '../view/education/project/project.vue'

// 街区
import streetIndex from '../view/street/index.vue'
import streetHome from '../view/street/home/home.vue'
import streetExcellent from '../view/street/excellent/excellent.vue'
//街区-秀作品-故事-详情
import storyDetail from 'View/street/excellent/storyDetail/storyDetail.vue'
import storyDetailInfo from 'View/street/excellent/storyDetail/story_detail.vue'
import storyDetailComment from 'View/street/excellent/storyDetail/story_comment.vue'

import streetWorksList from '../view/street/excellent/works_list.vue'
import streetStoryList from '../view/street/excellent/story_list.vue'
import streetActivity from '../view/street/activity/activity.vue'
import streetActivityList from '../view/street/activity/activity_list.vue'
import streetLaGou from '../view/street/lagou/index.vue'
import streetLaGouList from '../view/street/lagou/lagou_list.vue'
import streetLaGouDetail from 'View/street/lagou/lagouDetail.vue'
import streetLaGouDetail_instruction from 'View/street/lagou/lagouDetail_instruction.vue'
import streetLaGouDetail_comment from 'View/street/lagou/lagou_comment.vue'
import streetLaGouDetail_attachment from 'View/street/lagou/lagouDetail_attachment.vue'
import streetLaGouDetail_hookupwith from 'View/street/lagou/lagouDetail_hookupwith.vue'
import streetCooperation from '../view/street/cooperation/cooperation.vue'
import streetCooperationList from '../view/street/cooperation/cooperation_list.vue'
//街区-找合作-商业策划-详情
import planDetail from '../view/street/cooperation/businessPlan/planDetail.vue'
import planDetailInfo from '../view/street/cooperation/businessPlan/plan_detail.vue'
import planDetailRemark from '../view/street/cooperation/businessPlan/plan_remark.vue'
import planDetailComment from '../view/street/cooperation/businessPlan/plan_comment.vue'
import planDetailInvite from '../view/street/cooperation/businessPlan/plan_invite.vue'
//街区-找合作-融资案例-详情
import caseDetail from '../view/street/cooperation/case/caseDetail.vue'
import caseFinanceInfo from '../view/street/cooperation/case/finance_info.vue'

// 示范学校
import modelSchool from '../view/model_school/model_school.vue'
import modelSchoolIndex from '../view/model_school/index.vue'
import modelSchoolHome from '../view/model_school/home/home.vue'
import modelSchoolAchv from '../view/model_school/achievement/achievement.vue'
import modelSchoolAchvDetail from '../view/model_school/achievement/achievement_detail.vue'
import modelSchoolFeature from '../view/model_school/feature/feature.vue'
import modelSchoolFeatureDetail from '../view/model_school/feature/feature_detail.vue'
import modelSchoolHonor from '../view/model_school/honor/honor.vue'
import modelSchoolHonorDetail from '../view/model_school/honor/honor_detail.vue'
import modelSchoolEvent from '../view/model_school/event/event.vue'

// 二级路由

//项目模块
import project from 'View/space/edu/project/project.vue'
import projectDetail from 'components/project/projectDetails.vue'
import projectDetailRepertoire from 'components/project/projectDetail_repertoire.vue'
import projectDetailMember from 'components/project/projectDetail_member.vue'
import projectDetailStage from 'components/project/projectDetail_stage.vue'
import projectDetailEvaluate from 'components/project/projectDetail_evaluate.vue'
import projectDetailSummary from 'components/project/projectDetail_summary.vue'
import projectDetailShare from 'components/project/projectDetail_share.vue'
// 讨论区
import projectDiscussView from 'components/project/projectDiscuss_view.vue'
import projectDiscussOverview from 'components/project/projectDiscuss_overview.vue'
import projectDiscussPublish from 'components/project/projectDiscuss_publish.vue'
import projectDiscussTheme from 'components/project/projectDiscuss_theme.vue'
import projectDiscussDetail from 'components/project/projectDiscuss_detail.vue'
//作品模块
import works from 'View/space/edu/works/works.vue'
import worksDetails from 'components/works/worksDetails.vue'
//资源
import resources from 'components/resource/resources.vue'
import resourcesDetails from 'components/resource/resourcesDetails.vue'

// 教育局
import homepage from 'View/space/edu/homepage/homepage.vue'
import information from 'View/space/edu/information/information.vue'
import spaceCourse from 'View/space/edu/course/course.vue'
import activity from 'View/space/edu/activity/activity.vue'
import subject from 'View/space/edu/subject/subject.vue'
import subjectOverview from 'View/space/edu/subject/subjectOverview.vue'
import eduStatistical from 'View/space/edu/statistical/statis.vue'
import informationDetail from 'View/space/edu/information/details.vue'

// 学校
import schoolHomePage from 'View/space/school/homePage/homePage.vue'
import schoolCourse from 'View/space/school/course/course.vue'
import schoolStatistical from 'View/space/school/statis/statis.vue'
import schoolSubject from 'View/space/school/subject/subject.vue'

//班级
import claszHomePage from 'View/space/clasz/homePage/homePage.vue'
import claszStatis from 'View/space/clasz/statis/statis.vue'
//班级管理
import claszBaseInfo from '../view/space/clasz/claszManage/base_info.vue'
import claszMemberManage from '../view/space/clasz/claszManage/member_manage.vue'
import claszNoticeManage from '../view/space/clasz/claszManage/notice_manage.vue'

//兴趣组
import interestHomepage from '../view/space/interests/homePage/homePage.vue'
import interestMember from '../view/space/interests/member/interest_member.vue'
//兴趣组管理
import interestMemberManage from '../view/space/interests/interestManage/member_manage.vue'

//话题吧
import topicBar from '../view/space/clasz/topic/topic.vue'
import topicDetail from '../view/space/clasz/topic/topiceDetail.vue'

// 课程
import courseDetail from '../view/space/edu/course/course_detail.vue'
import courseTest from '../view/space/edu/course/course_test.vue'
import videoPage from '../view/space/edu/course/video.vue'
import courseTestQuestion from '../view/space/edu/course/children/test_question.vue'
import courseTestAnswer from '../view/space/edu/course/children/test_answer.vue'
import courseDetailInfo from '../view/space/edu/course/children/detail_info.vue'
import courseDetailOutline from '../view/space/edu/course/children/detail_outline.vue'
import courseDetailComment from '../view/space/edu/course/children/detail_comment.vue'
import courseDetailStudent from '../view/space/edu/course/children/detail_student.vue'
import courseDetailDiscuss from '../view/space/edu/course/children/detail_discuss.vue'
import courseDetailDiscussInitiate from '../view/space/edu/course/children/discuss_initiate.vue'
import courseDetailDiscussTheme from '../view/space/edu/course/children/discuss_theme.vue'
import courseDetailDiscussInitiateDetail from '../view/space/edu/course/children/discuss_initiate_detail.vue'
import courseDetailShare from '../view/space/edu/course/children/detail_share.vue'
import courseDetailNote from '../view/space/edu/course/children/detail_note.vue'


//活动
import activityDetails from '../view/space/edu/activity/children/activityDetails.vue'
import activityMember from '../view/space/edu/activity/children/activityMember.vue'
import activityComment from '../view/space/edu/activity/children/activityComment.vue'
import activityInfo from '../view/space/edu/activity/children/activity_info.vue'

//课题
import subjectGuideDetails from '../view/space/edu/subject/children/guide_details.vue'
import subjectResearchDetails from '../view/space/edu/subject/children/research_details.vue'
import subjectActivityDetails from '../view/space/edu/subject/children/activity_details.vue'
import subjectResultDetails from '../view/space/edu/subject/children/result_details.vue'

//空间后台

//教师
import adminSpace from '../components/admin/backstage/adminSpace.vue'
//动态
import adminDynamic from '../view/space/my/dynamic/dynamic.vue'
// 作品
import adminWorks from 'View/space/my/works/works.vue'
import adminWorksList from 'View/space/my/works/admin_works_list.vue'
import adminWorksPublish from 'View/space/my/works/works_publish.vue'
import adminWorksDetails from 'View/space/my/works/adminWorksDetails.vue'
//项目
import adminProject from 'View/space/my/project/project.vue'
import adminProjectReview from 'View/space/my/project/projectReview.vue'
import adminProjectUnreview from 'View/space/my/project/projectUnreview.vue'
import adminProjectList from 'components/project/project_rowList.vue'
import adminProjectPublish from 'View/space/my/project/projectPublish.vue'
import adminAccessRight from 'View/space/my/accessRight/accessRight.vue'
//账号安全
import adminAccountSecurity from '../view/space/my/accountSecurity/accountSecurity.vue'
import adminModifyPwd from '../view/space/my/accountSecurity/modifyPwd.vue'

//活动部分
import adminActivity from '../view/space/my/activity/activity.vue'
import activityCheckedList from '../view/space/my/activity/children/activity_checked_list'
import activityUncheckedList from '../view/space/my/activity/children/activity_unchecked_list'
import adminAvtivityDetails from '../view/space/my/activity/children/activityDetails.vue'
import activity_details from '../view/space/my/activity/children/activity_details.vue'
import activity_member from '../view/space/my/activity/children/activity_member.vue'
import activity_result from '../view/space/my/activity/children/activity_result.vue'
import activity_discuss from '../view/space/my/activity/children/activity_discuss.vue'
import adminActivityPublish from '../view/space/my/activity/publish_activity.vue'

//活动管理
import adminActivityManage from '../components/admin/backstage/activityManage/activityManage.vue'

//实践
import adminPracticeIndex from '../view/space/my/practice/index.vue'
import adminPractice from '../view/space/my/practice/practice.vue'
import adminEvaluation from '../view/space/my/evaluation/evaluation.vue'

import adminAvatarOption from '@/view/space/my/avatar/avatar.vue'
import adminBackground from 'View/space/my/background/background.vue'
import adminBasicInformation from '@/view/space/my/profile/profile.vue'
import adminCollection from '../view/space/my/collection/collection.vue'

// 兴趣组
import adminInterest from '../view/space/my/interest/interest.vue'
import createInterest from '../view/space/my/interest/create_interest.vue'


//我的私信
import adminPrivateLetter from '../view/space/my/privateLetter/private_letter.vue'
import adminPrivate from '../view/space/my/privateLetter/my_letter.vue'
import adminLetterDetail from '../view/space/my/privateLetter/letter_detail.vue'
import adminSysMsg from '../view/space/my/privateLetter/system_msg.vue'

// 资源部分
import adminResource from '../view/space/my/resource/resource.vue'
import resourceCheckedList from '../view/space/my/resource/children/resource_checked_list.vue'
import resourceUncheckedList from '../view/space/my/resource/children/resource_unchecked_list.vue'
import adminResourceUpload from '../view/space/my/resource/resource_upload.vue'

//资源管理
import adminResourceManage from '../components/admin/backstage/resourceManage/resourceManage.vue'

import adminSchoolAdmin from '../components/admin/backstage/schoolAdmin/schoolAdmin.vue'

//后台课题
import adminSubject from '../view/space/my/subject/subject.vue'
import subjectCheckedList from '../view/space/my/subject/children/subject_checked_list.vue'
import subjectUncheckedList from '../view/space/my/subject/children/subject_unchecked_list.vue'
import adminSubjectApply from '../view/space/my/subject/subject_apply.vue'
import adminSubjectDetails from '../view/space/my/subject/adminSubjectDetails.vue'
import subject_details from '../view/space/edu/subject/children/subject_details.vue'
import subject_task from '../view/space/edu/subject/children/subject_task.vue'
import subject_activity from '../view/space/edu/subject/children/subject_activity.vue'
import subject_result from '../view/space/edu/subject/children/subject_result.vue'
import subject_stage from '../view/space/edu/subject/children/subject_stage.vue'
import subject_discuss from '../view/space/edu/subject/children/subject_discuss.vue'
import subject_discussInitiate from '../view/space/edu/subject/children/subjectDiscuss_initiate.vue'
import subject_discussDetail from '../view/space/edu/subject/children/subject_discussDetail.vue'

import adminCourse from '../view/space/my/course/course.vue'

import adminStudyIndex from '../view/space/my/study/index.vue'
import adminStudy from '../view/space/my/study/study.vue'

// 后台课程
import backendCourseIndex from '../view/space/my/course/index.vue'
import backendCourseChecked from '../view/space/my/course/children/course_checked.vue'
import backendCourseUnchecked from '../view/space/my/course/children/course_unchecked.vue'
import backendCourseQuestion from '../view/space/my/course/children/course_question.vue'
import backendCourseRelease from '../view/space/my/course/release.vue'

// 个人空间访客
import adminMyvisitor from 'View/space/my/visitor/visitor.vue'
// 个人空间关注
import adminFocus from 'View/space/my/focus/focus.vue'
import adminMyfocus from 'components/my/focus_myFocus.vue'
import adminToMyfocus from 'components/my/focus_ToMyFocus.vue'
import adminMyFriend from 'components/my/focus_myFriend.vue'

//个人空间-故事
import adminStory from 'View/space/my/story/story.vue'
import storyCheckedList from '../view/space/my/story/children/story_checked_list.vue'
import storyUncheckedList from '../view/space/my/story/children/story_unchecked_list.vue'
import adminStoryPublish from 'View/space/my/story/story_publish.vue'


//个人空间 - 服务
import adminService from 'View/space/my/service/service.vue'
import adminServiceList from 'View/space/my/service/service_list.vue'
import adminServicePublish from 'View/space/my/service/service_publish.vue'

//个人空间 - 需求
import adminDemand from 'View/space/my/demand/demand.vue'
import adminDemandList from 'View/space/my/demand/demand_list.vue'
import adminDemandPublish from 'View/space/my/demand/demand_publish.vue'

//个人空间-商业策划
import adminPlan from 'View/space/my/businessPlan/plan.vue'
import planCheckedList from 'View/space/my/businessPlan/children/plan_checked_list.vue'
import planUncheckedList from 'View/space/my/businessPlan/children/plan_unchecked_list.vue'
import adminPlanPublish from 'View/space/my/businessPlan/publish_plan.vue'

// 个人空间-勾搭
import adminLagou from '../view/space/my/lagou/lagou.vue'

// 资讯
import adminInfoIndex from '../view/space/my/information/index.vue'
import adminInfoList from '../view/space/my/information/info.vue'
import adminInfoRelease from '../view/space/my/information/release.vue'

//个人空间-邀约
import adminInvite from '../view/space/my/invite/invite.vue'

//个人空间-我入驻的空间
import adminMult from '../view/space/my/mult/mult.vue'
import enterSpace from '../view/space/my/mult/children/mult_space.vue'
import enterApply from '../view/space/my/mult/children/mult_apply.vue'
import enterInvite from '../view/space/my/mult/children/mult_invite.vue'

//个人空间-我的成员（众创空间）
import adminMember from '../view/space/my/member/member.vue'
import myMember from '../view/space/my/member/my_member.vue'
import memberApply from '../view/space/my/member/enter_apply.vue'
import memberInvite from '../view/space/my/member/enter_invite.vue'

//个人空间-我参与的工作室
import adminStudio from '../view/space/my/studio/studio.vue'

//个人空间-我的参赛
import adminContest from '../view/space/my/contest/contest.vue'
import adminMyContest from '../view/space/my/contest/my_contest.vue'
import adminMyReview from '../view/space/my/contest/my_review.vue'

// 导师工作室
import studioMemberIndex from 'View/studioMember/index.vue'
import studioMemberApply from 'View/studioMember/apply.vue'
import studioMemberDetail from 'View/studioMember/detail.vue'
import studioMemberHomepage from 'View/studioMember/homepage/homepage.vue'
import studioMemberArticle from 'View/studioMember/article/article.vue'
import studioMemberArticleDetail from 'View/studioMember/article/articleDetail.vue'
import studioMemberResult from 'View/studioMember/result/result.vue'
import studioMemberTopic from 'View/studioMember/topic/topic.vue'
import studioResource from 'View/studioMember/resourceShare/res_list.vue'
import studioResourceDetail from 'View/studioMember/resourceShare/resourceDetail.vue'
import studioMicroClass from 'View/studioMember/microClass/microClass_list.vue'
import studioMicroClassDetail from '../view/studioMember/microClass/microClass_detail.vue'
import studioManage from 'View/studioMember/manage/studio_manage.vue'
import studioBaseInfo from '../view/studioMember/manage/studio_baseInfo.vue'
import studioMemberMng from '../view/studioMember/manage/studio_member.vue'
import studioColumnMng from '../view/studioMember/manage/column_manage.vue'
import studioSetBg from 'View/studioMember/manage/studio_setBg.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/space' },
    // 空间模块
    {
      path: '/space',
      name: 'space',
      component: spaceIndex,
      redirect: '/space/educationBureau',
      children: [
        { path: 'educationBureau', name: 'educationBureau', component: educationBureau, meta: {background: false} },
        { path: 'school', name: 'school', component: school, meta: {background: false} },
        { path: 'clasz', name: 'clasz', component: clasz, meta: {background: false} },
        { path: 'teacher', name: 'teacher', component: person, meta: {background: false} },
        { path: 'student', name: 'student', component: student, meta: {background: false} },
        { path: 'interests', name: 'interests', component: interests, meta: {background: false} },
      ]
    },
    // 教育模块
    {
      path: '/education',
      name: 'education',
      component: eduIndex,
      redirect: '/education/project',
      children: [
        {path: 'project', component: eduProjectIndex, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'course', component: eduCourseIndex, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'train', component: eduTrainIndex, meta: {position: {x: 0, y: 0}, background: false}},
      ]
    },
    {path: '/education/course/list', name: 'eduCourseList', component: eduCourseList, meta: {position: {x: 0, y: 0}}},
    {path: '/education/project/list', name: 'eduProjectList', component: eduProjecList, meta: {position: {x: 0, y: 0}}},
    {path: '/education/train/list', component: eduTrainList, meta: {position: {x: 0, y: 0}}},
    {
        path: '/education/train/detail',
        component: eduTrainDetails,
        redirect: '/education/train/detail/evaluate',
        children: [
            {path: 'evaluate', component: eduTrainDetailsEval, meta: {background: true}},
            {
                path: 'discuss',
                component: eduTrainDetailsDis,
                redirect: '/education/train/detail/discuss/index',
                meta: {background: true},
                children: [
                    {path: 'index', component: eduTrainDetailsIndex},
                    {path: 'publish', component: eduTrainDetailsPub},
                    {path: 'detail', component: eduTrainDetailsDetail}
                ]
            },
        ]
    },
    // 街区
    {
      path: '/street',
      name: 'street',
      component: streetIndex,
      redirect: '/street/index',
      children: [
        {path: 'index', component: streetHome, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'excellent', component: streetExcellent, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'excellent/works', component: streetWorksList, meta: {position: {x: 0, y: 0}}},
        {path: 'excellent/story', component: streetStoryList, meta: {position: {x: 0, y: 0}}},
        { path: 'storyDetail', name: 'storyDetail', component: storyDetail, alias:'/street/excellent/story/detail',redirect: '/street/excellent/story/detail/info',
          children: [
            { path: 'storyInfo', component: storyDetailInfo, alias: '/street/excellent/story/detail/info', meta: {position: {x: 0, y: 0}} },
            { path: 'storyComment', component: storyDetailComment, alias: '/street/excellent/story/detail/comment' }
          ]
        },
        {path: 'activity', component: streetActivity, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'activity/list', component: streetActivityList, meta: {position: {x: 0, y: 0}}},
        {path: 'lagou', component: streetLaGou, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'lagou/list/:type', component: streetLaGouList, meta: {position: {x: 0, y: 0}}},
        {
          path: 'lagou/detail/:type',
          component: streetLaGouDetail,
          redirect: 'lagou/detail/:type/instruction',
          children: [
            { path: 'instruction', component: streetLaGouDetail_instruction, meta: {position: {x: 0, y: 0}} },
            { path: 'comment', component: streetLaGouDetail_comment },
            { path: 'attachment', component: streetLaGouDetail_attachment },
            { path: 'hookupwith', component: streetLaGouDetail_hookupwith }
          ]
        },
        {path: 'co', component: streetCooperation, meta: {position: {x: 0, y: 0}, background: false}},
        {path: 'co/list/:type', component: streetCooperationList, meta: {position: {x: 0, y: 0}}},
        { path: 'planDetail', name: 'planDetail', component: planDetail, alias: '/street/co/plan/detail', redirect: '/street/co/plan/detail/info',
          children: [
            { path: 'planInfo', component: planDetailInfo, alias: '/street/co/plan/detail/info', meta: {position: {x: 0, y: 0}} },
            { path: 'planComment', component: planDetailComment, alias: '/street/co/plan/detail/comment' },
            { path: 'planRemark', component: planDetailRemark, alias: '/street/co/plan/detail/remark' },
            { path: 'planInvite', component: planDetailInvite, alias: '/street/co/plan/detail/invite' }
          ]
        },
        { path: 'caseDetail',name:'caseDetail',component: caseDetail, alias: '/street/co/case/detail', redirect: '/street/co/case/detail/finance',
          children: [
            { path: 'caseFinance', component: caseFinanceInfo, alias: '/street/co/case/detail/finance', meta: {position: {x: 0, y: 0}} },
            { path: 'caseInfo', component: planDetailInfo, alias: '/street/co/case/detail/info' }
          ]
        }
      ]
    },
    // 导师工作室
    {
        path: '/studioMember',
        name: 'studioMember',
        component: studioMemberIndex,
        meta: {position: {x: 0, y: 0}, background: false}
    },
    {
        path: '/studioMember/apply',
        component: studioMemberApply,
    },
    {
        path: '/studioMemberDetail',
        component: studioMemberDetail,
        redirect: '/studioMemberDetail/homePage',
        children: [
            { path: '/studioMemberDetail/homePage', component: studioMemberHomepage },
            { path: '/studioMemberDetail/article', component: studioMemberArticle },
            { path: '/studioMemberDetail/result', component: studioMemberResult },
            { path: '/studioMemberDetail/resource', component: studioResource },
            { path: 'resDetail', component: studioResourceDetail, alias:'/studioMemberDetail/resource/detail' },
            { path: '/studioMemberDetail/microClass', component: studioMicroClass },
            { path: '/studioMemberDetail/topic', component: studioMemberTopic },
            { path: '/studioMemberDetail/topic/detail', component: topicDetail }
        ]
    },
    { path: '/studioMemberDetail/articleDetail/:type', component: studioMemberArticleDetail, meta: {position: {x: 0, y: 0}} },
    { path: 'microClassDetail', component: studioMicroClassDetail, alias:'/studioMemberDetail/microClass/detail', meta: {position: {x: 0, y: 0}} },
    {
        path: '/studioManage',
        name: 'studioManage',
        component: studioManage,
        meta: {background:false},
        children: [
          { path: 'studioManage',redirect: 'baseInfo' },
          { path: 'baseInfo', component: studioBaseInfo },
          { path: 'memberMng', component: studioMemberMng },
          { path: 'noticeMng', component: claszNoticeManage },
          { path: 'columnMng', component: studioColumnMng },
          { path: 'bgMng', component: studioSetBg },
        ]
    },
    {
      path: '/model',
      name: 'modelSchool',
      component: modelSchool,
      meta: {background: false, position: {x: 0, y: 0}},
    },
    {
      path: '/model/school',
      name: 'modelSchoolIndex',
      component: modelSchoolIndex,
      redirect: '/model/school/home',
      children: [
        {path: 'home', component: modelSchoolHome, meta: {position: {x: 0, y: 0}}},
        {path: 'achv', component: modelSchoolAchv, meta: {position: {x: 0, y: 0}}},
        {path: 'feature', component: modelSchoolFeature, meta: {position: {x: 0, y: 0}}},
        {path: 'honor', component: modelSchoolHonor, meta: {position: {x: 0, y: 0}}},
        {path: 'event', component: modelSchoolEvent, meta: {position: {x: 0, y: 0}}},
      ],
    },
    {path: '/model/school/achv/detail', component: modelSchoolAchvDetail, meta: {position: {x: 0, y: 0}}},
    {path: '/model/school/feature/detail', component: modelSchoolFeatureDetail, meta: {position: {x: 0, y: 0}}},
    {path: '/model/school/honor/detail', component: modelSchoolHonorDetail, meta: {position: {x: 0, y: 0}}},
    {
      path: '/educationBureauSpace',
      name: 'educationBureauSpace',
      component: educationBureauSpace,
      // linkActiveClass: 'active',
      children: [
        { path: '/educationBureauSpace', redirect: 'homepage' },
        { path: 'homepage', component: homepage },
        { path: 'information', component: information },
        { path: 'works', component: works },
        { path: 'resources', component: resources },
        { path: 'course', component: spaceCourse },
        { path: 'project', component: project },
        { path: 'activity', component: activity },
        { path: 'subject', component: subject },
        { path: 'statistical', component: eduStatistical },
        // { path: 'statistical', component: constructing },
        // 课题分类
        { path: 'subjectOverview/:model', name:'subjectOverview', component: subjectOverview, alias: '/educationBureauSpace/subject/:model' },
        { path: 'subjectDetail/guide', name:'eduGuideDetail', component: subjectGuideDetails, alias: '/educationBureauSpace/subject/guide/detail' },
        { path: 'subjectDetail/activity/detail', name:'activityDetail', component: subjectActivityDetails, alias: '/educationBureauSpace/subject/activity/detail' },
        { path: 'subjectDetail/results/detail', name:'resultsDetail', component: subjectResultDetails, alias: '/educationBureauSpace/subject/results/detail' },
        { path: 'applySubject', name: 'eduApplySubject', component: adminSubjectApply, alias: '/educationBureauSpace/subject/guide/apply' }
      ]
    },
    // 资讯详情
    { path: '/educationBureauSpace/informationDetail/:type', component: informationDetail },
    //活动详情
    {
      path: '/activityDetails',
      name: 'activityDetails',
      component: activityDetails,
      alias: '/space/activity/details',
      redirect: '/space/activity/details/info',
      children: [
        { path: 'info', component: activityInfo, alias: '/space/activity/details/info' },
        { path: 'member', component: activityMember, alias: '/space/activity/details/member' },
        { path: 'result', component: activity_result, alias: '/space/activity/details/result' },
        { path: 'comment', component: activityComment, alias: '/space/activity/details/comment' }
      ]
    },
    //资源详情
    { path: '/resourceDetail', component: resourcesDetails, alias: '/space/resource/details', meta: {position: {x: 0, y: 0}} },
    //教育局作品详情
    { path: '/space/worksDetail', component: worksDetails, alias: '/space/works/details', meta: {position: {x: 0, y: 0}}},
    //课题详情
    {
      path: 'subjectDetail',
      name:'researchDetail',
      component: subjectResearchDetails,
      alias: '/space/subject/research/detail',
      redirect: '/space/subject/research/detail/info',
      children:[
        { path: 'info', component: subject_details, alias: '/space/subject/research/detail/info', meta: {position: {x: 0, y: 0}} },
        { path: 'task', component: subject_task, alias: '/space/subject/research/detail/task' },
        { path: 'activity', component: subject_activity, alias: '/space/subject/research/detail/activity' },
        { path: 'result', component: subject_result, alias: '/space/subject/research/detail/result' },
        { path: 'stage', component: subject_stage, alias: '/space/subject/research/detail/stage' },
        { path: 'discuss', component: subject_discuss, alias: '/space/subject/research/detail/discuss' },
        { path: 'initiate', component: subject_discussInitiate, alias: '/space/subject/research/initiate' },
        { path: 'discussDetail', component: subject_discussDetail, alias: '/space/subject/research/discussDetail' }
      ]
    },
    // 学校空间
    {
      path: '/schoolSpace',
      name: 'schoolSpace',
      component: schoolSpace,
      meta: {background: false},
      children: [
        { path: '/schoolSpace', redirect: 'homePage' },
        { path: 'homePage', component: schoolHomePage },
        { path: 'information', component: information },
        { path: 'works', component: works },
        { path: 'schoolCourse', component: schoolCourse },
        { path: 'resource', component: resources },
        { path: 'schoolProject', component: project },
        { path: 'schoolStatistical', component: schoolStatistical },
        // { path: 'schoolStatistical', component: constructing },
        { path: 'subject', component: schoolSubject },
        // 课题分类
        { path: 'subjectOverview/:model', component: subjectOverview, alias: '/schoolSpace/subject/:model' },
        { path: 'subjectDetail/guide', name:'schoolGuideDetail', component: subjectGuideDetails, alias: '/schoolSpace/subject/guide/detail' },
        { path: 'subjectDetail/activity/detail', component: subjectActivityDetails, alias: '/schoolSpace/subject/activity/detail' },
        { path: 'subjectDetail/results/detail', component: subjectResultDetails, alias: '/schoolSpace/subject/results/detail' },
        { path: 'applySubject', name: 'schoolApplySubject', component: adminSubjectApply, alias: '/schoolSpace/subject/guide/apply' },
        { path: 'activity', component: activity },
      ]
    },
    // 资讯详情
    { path: '/schoolSpace/informationDetail/:type', component: informationDetail },
    //班级空间
    {
      path: '/claszSpace',
      name: 'claszSpace',
      component: claszSpace,
      redirect: '/claszSpace/homePage',
      children: [
      	// { path: 'claszSpace', redirect: 'homePage' },
        { path: 'homePage', name:'claszHomePage', component: claszHomePage },
        { path: 'resource', component: resources },
        { path: 'resourceDetail', component: resourcesDetails, alias: '/claszSpace/resource/details' },
        { path: 'works', component: works },
        { path: 'classTopic', component: topicBar, name: 'classTopic', alias:'/claszSpace/topic'},
        { path: 'topicDetail', component: topicDetail, alias: '/claszSpace/topic/detail', meta: {position: {x: 0, y: 0}} },
        { path: 'details', component: worksDetails, alias: '/claszSpace/works/details' },
        { path: 'statis', component: claszStatis, alias: '/claszSpace/works/statis' }
      ]
    },
    // 班级管理
    {
      path: '/claszManage',
      name: 'claszManage',
      component: claszManage,
      meta: {background: false},
      children: [
        { path: 'claszManage', redirect: 'baseInfo' },
        { path: 'baseInfo', component: claszBaseInfo },
        { path: 'memberManage', component: claszMemberManage },
        { path: 'claszNoticeManage', component: claszNoticeManage }
      ]
    },
    // 教师空间
    {
      path: '/teacherSpace',
      name: 'teacherSpace',
      component: personSpace,
      alias: '/space/teacher',
      redirect: '/space/teacher/dynamic',
      children: [
        {path: 'dynamic', component: personDynamic, alias: '/space/teacher/dynamic', meta: {position: {x: 0, y: 0}}},
        {path: 'study', component: personStudy, alias: '/space/teacher/study'},
        {path: 'guidance', component: teacherGuidance, alias: '/space/teacher/guidance'},
        {path: 'works', component: personWorks, alias: '/space/teacher/works'},
        {path: 'worksDetail', component: worksDetails, alias: '/space/teacher/works/detail'},
        {path: 'resource', component: personResource, alias: '/space/teacher/resource'},
        {path: 'resourceDetail', component: resourcesDetails, alias: '/space/teacher/resource/detail'},
        {path: 'interest', component: personInterest, alias: '/space/teacher/interest'},
        {path: 'visitor', component: personVisitor, alias: '/space/teacher/visitor'}
      ]
    },
    // 学生空间
    {
      path: '/studentSpace',
      name: 'studentSpace',
      component: personSpace,
      alias: '/space/student',
      redirect: '/space/student/dynamic',
      children: [
        {path: 'dynamic', component: personDynamic, alias: '/space/student/dynamic', meta: {position: {x: 0, y: 0}}},
        {path: 'study', component: personStudy, alias: '/space/student/study'},
        {path: 'studyEval', component: adminEvaluation, alias: '/space/student/study/eval'},
        {path: 'practice', component: adminPractice, alias: '/space/student/practice'},
        {path: 'practiceEval', component: adminEvaluation, alias: '/space/student/practice/eval'},
        {path: 'works', component: personWorks, alias: '/space/student/works'},
        {path: 'worksDetail', component: worksDetails, alias: '/space/student/works/detail'},
        {path: 'resource', component: personResource, alias: '/space/student/resource'},
        {path: 'resourceDetail', component: resourcesDetails, alias: '/space/student/resource/detail'},
        {path: 'interest', component: personInterest, alias: '/space/student/interest'},
        {path: 'visitor', component: personVisitor, alias: '/space/student/visitor'}
      ]
    },
    // 兴趣组
    {
      path: '/interestsSpace',
      name: 'interestsSpace',
      component: interestsSpace,
      children: [
        { path: 'interestsSpace', redirect: 'homePage' },
        { path: 'homePage',name:'interestHomepage', component: interestHomepage },
        { path: 'member', component: interestMember },
        { path: 'resource', component: resources },
        { path: 'resourceDetail', component: resourcesDetails, alias: '/interestsSpace/resource/details' },
        { path: 'works', component: interestWorks },
        { path: 'interestTopic', component: topicBar, name: 'interestTopic', alias: '/interestsSpace/topic' },
        { path: 'topicDetail', component: topicDetail, name: 'topicDetail', alias: '/interestsSpace/topic/detail', meta: {position: {x: 0, y: 0}} },
        { path: 'details', component: worksDetails, alias: '/interestsSpace/works/details' },
        { path: 'article', component: interestArticle },
        { path: 'articlePublish', component: interestArticlePublish, alias: '/interestsSpace/article/publish' }
      ]
    },
    { path: 'articleDetail', component: interestArticleDetail, alias: '/articleDetail' },
    //兴趣组管理
    {
      path: '/interestManage',
      name: 'interestManage',
      component: interestManage,
      children: [
        { path: 'interestManage', redirect: 'baseInfo' },
        { path: 'baseInfo', component: createInterest },
        { path: 'memberManage', component: interestMemberManage },
        { path: 'noticeManage', component: claszNoticeManage }
      ]
    },
    // 企业
    { path: '/enterprise', component: enterprise, meta: {background: false} },
    // 投资人
    { path: '/investor', component: investor, meta: {background: false} },
    // 投资机构
    { path: '/investOrg', component: investOrg, meta: {background: false} },
    // 众创空间
    { path: '/multSpace', component: multSpace, meta: {background: false} },
    // 企业、投资人、投资机构、众创空间详情
    { path: '/enterprise/detail', component: entInvInvorgMulDetail, meta: {position: {x: 0, y: 0}} },
    { path: '/investor/detail', component: entInvInvorgMulDetail, meta: {position: {x: 0, y: 0}} },
    { path: '/investOrg/detail', component: entInvInvorgMulDetail, meta: {position: {x: 0, y: 0}} },
    { path: '/multSpace/detail', component: entInvInvorgMulDetail, meta: {position: {x: 0, y: 0}} },
    //企业、投资人、投资机构、众创空间-资讯详情
    { path: '/enterprise/infoDetail', component: entInvInvorgMuliInfoDetail },
    { path: '/investor/infoDetail', component: entInvInvorgMuliInfoDetail },
    { path: '/investOrg/infoDetail', component: entInvInvorgMuliInfoDetail },
    { path: '/multSpace/infoDetail', component: entInvInvorgMuliInfoDetail },

    // 空间后台
    {
      path: '/admin',
      name: 'admin',
      component: adminSpace,
      meta: {
        requireAuth: true
      },
      redirect: '/admin/dynamic',
      linkActiveClass: 'active',
      children: [
        // 动态
        { path: 'dynamic', component: adminDynamic, name: 'adminDynamic' },
        { // 学习
          path: 'study',
          component: adminStudyIndex,
          children: [
            {path: '', component: adminStudy},
            {path: 'list', component: adminStudy},
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
        { path: 'projectReview', component: adminProjectReview, alias: '/admin/project/review', redirect: '/admin/project/review/repertoire',
          children: [
            { path: 'repertoire', component: projectDetailRepertoire, alias: '/admin/project/review/repertoire' },
            { path: 'member', component: projectDetailMember, alias: '/admin/project/review/member' },
            { path: 'stage', component: projectDetailStage, alias: '//admin/project/review/stage' },
            { path: 'summary', component: projectDetailSummary, alias: '/admin/project/review/summary' },
            { path: 'evaluate', component: projectDetailEvaluate, alias: '/admin/project/review/evaluate' },
            { path: 'share', component: projectDetailShare, alias: '/admin/project/review/share' },
            {
              path: 'discuss',
              component: projectDiscussView,
              redirect:'/admin/project/review/discuss/overview',
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
        { // 实践
          path: 'practice',
          component: adminPracticeIndex,
          children: [
            {path: '', component: adminPractice},
            {path: 'list', component: adminPractice},
            {path: 'eval', component: adminEvaluation,}
          ]
        },
        { // 资讯
          path: 'info',
          component: adminInfoIndex,
          children: [
            {path: '', component: adminInfoList},
            {path: 'list', component: adminInfoList},
            {path: 'release', component: adminInfoRelease,}
          ]
        },
        { path: 'activityPublish', component: adminActivityPublish, alias:'/admin/activity/publish' },
        //活动管理
        { path: 'adminActivityManage', component: adminActivityManage, alias: '/admin/activity/manage'},
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
        // 资源管理
        { path: 'adminResourceManage', component: adminResourceManage, alias: '/admin/resource/manage' },
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
        // 故事
        { path: 'story', name: 'adminStory', component: adminStory, redirect: '/admin/story/audited',
          children: [
            { path: 'storyAudited', component: storyCheckedList, alias: '/admin/story/audited' },
            { path: 'storyPending', component: storyUncheckedList, alias: '/admin/story/pending' },
          ]
        },
        { path:'storyPublish', name: 'storyPublish', component: adminStoryPublish, alias: '/admin/story/publish' },
        { path:'storyPreview', name: 'storyPreview', component: adminStoryPublish, alias: '/admin/story/preview' },
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
        //商业策划
        { path: 'plan', name: 'adminPlan', component: adminPlan, redirect: '/admin/plan/audited',
          children: [
            { path: 'planAudited', component: planCheckedList, alias: '/admin/plan/audited' },
            { path: 'planPending', component: planUncheckedList, alias: '/admin/plan/pending' },
          ]
        },
        { path:'planPublish', name: 'planPublish', component: adminPlanPublish, alias: '/admin/plan/publish' },
        { path:'planPreview', name: 'planPreview', component: adminPlanPublish, alias: '/admin/plan/preview' },
        // 案例===============
        { path: 'case', component: adminSubject },
        {path: 'lagou', component: adminLagou},
        //邀约（投资人、投资机构）
        { path: 'invite', component: adminInvite },
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
        // 头像设置
        { path: 'avatar', component: adminAvatarOption },
        // 背景设置
        { path: 'background', component: adminBackground},
        // 兴趣组
        { path: 'interest', name: 'adminInterest', component: adminInterest },
        { path: 'createInterest', component: createInterest, alias:'/admin/interest/create' },

        { path: 'schoolAdmin', component: adminSchoolAdmin },
        //我入驻的众创空间
        { path: 'mult', name:'adminMult', component: adminMult, redirect: '/admin/mult/space',
          children: [
            { path: 'enterSpace', component: enterSpace, alias: '/admin/mult/space' },
            { path: 'enterApply', component: enterApply, alias: '/admin/mult/apply' },
            { path: 'enterInvite', component: enterInvite, alias: '/admin/mult/invite' }
          ]
        },
        //众创空间-我的成员
        { path: 'member', name: 'adminMember', component: adminMember, redirect: '/admin/member/mine',
          children: [
            { path: 'myMember', component: myMember, alias: '/admin/member/mine' },
            { path: 'memberApply', component: memberApply, alias: '/admin/member/apply' },
            { path: 'memberInvite', component: memberInvite, alias: '/admin/member/invite' }
          ]
        },
        //我参与的工作室
        { path: 'studio', name: 'adminStudio', component: adminStudio },
        { path: 'applyStudio', component: studioMemberApply, alias: '/admin/studio/apply'  },
        //我的参赛
        { path: 'contest', name: 'adminContest', component: adminContest, redirect: '/admin/contest/mine',
          children: [
            { path: 'myContest', component: adminMyContest, alias: '/admin/contest/mine' },
            { path: 'myReview', component: adminMyReview, alias: '/admin/contest/review' }
          ]
        }
      ]
    },
    {
      path: '/project',
      name: 'project',
      component: eduProject,
      children: [
        { path: 'projectDetail', component: projectDetail, alias: '/education/project/detail', name: 'projectDetail', redirect: '/education/project/detail/repertoire',
          children: [
            { path: 'repertoire', component: projectDetailRepertoire, alias: '/education/project/detail/repertoire' },
            { path: 'member', component: projectDetailMember, alias: '/education/project/detail/member' },
            { path: 'stage', component: projectDetailStage, alias: '/education/project/detail/stage' },
            { path: 'summary', component: projectDetailSummary, alias: '/education/project/detail/summary' },
            { path: 'evaluate', component: projectDetailEvaluate, alias: '/education/project/detail/evaluate' },
            { path: 'share', component: projectDetailShare, alias: '/education/project/detail/share' },
            {
              path: 'discuss',
              component: projectDiscussView,
              redirect:'/education/project/detail/discuss/overview',
              children: [
                { path: 'overview', component: projectDiscussOverview },
                { path: 'publish', component: projectDiscussPublish },
                { path: 'theme', component: projectDiscussTheme },
                { path: 'detail', component: projectDiscussDetail }
              ]
            }
            // { path: 'discuss', component: projectDetailDiscuss, alias: '/education/project/detail/discuss' },
            // { path: 'initiate', component: projectDetailDiscussInitiate, alias: '/education/project/detail/discuss/initiate' },
            // { path: 'discussTheme', component: projectDetailDiscussTheme, alias: '/education/project/detail/discuss/theme' },
            // { path: 'discussDetail', component: projectDetailDiscussDetail, alias: '/education/project/detail/discuss/detail' }
          ]
        }
      ]
    },
    { // 课程模块
      path: '/course',
      name: 'course',
      component: course,
      children: [
        {
          path: 'courseDetail',
          component: courseDetail,
          alias: '/education/course/detail',
          name: 'courseDetail',
          redirect: '/education/course/detail/info',
          // meta: {position: {x: 0, y: 0}},
          children: [
            {path: 'info', component: courseDetailInfo, alias: '/education/course/detail/info'},
            {path: 'outline', component: courseDetailOutline, alias: '/education/course/detail/outline'},
            {path: 'comment', component: courseDetailComment, alias: '/education/course/detail/comment'},
            {path: 'student', component: courseDetailStudent, alias: '/education/course/detail/student'},
            {path: 'discuss', component: courseDetailDiscuss, alias: '/education/course/detail/discuss'},
            {path: 'initiate', component: courseDetailDiscussInitiate, alias: '/education/course/detail/initiate'},
            {path: 'discussTheme', component: courseDetailDiscussTheme, alias: '/education/course/detail/discussTheme'},
            {path: 'discussDetail', component: courseDetailDiscussInitiateDetail, alias: '/education/course/detail/discussDetail'},
            {path: 'share', component: courseDetailShare, alias: '/education/course/detail/share'},
            {path: 'note', component: courseDetailNote, alias: '/education/course/detail/note'}
          ]
        },
        {
          path: 'test',
          component: courseTest,
          alias: '/education/course/detail/test',
          name: 'courseTest',
          redirect: '/education/course/detail/test/q',
          children: [
            {path: 'q', component: courseTestQuestion, alias: '/education/course/detail/test/q'},
            {path: 'a', component: courseTestAnswer, alias: '/education/course/detail/test/a'}
          ]
        }
      ]
    },
    { // 课程视频学习
      path: '/video',
      name: 'videoPage',
      component: videoPage,
      linkActiveClass: 'active',
      alias: '/education/course/detail/video',
      redirect: '/education/course/detail/video/info',
      /*meta: {
        requireAuth: true,
      },*/
      children: [
        {path: 'info', component: courseDetailInfo, alias: '/education/course/detail/video/info'},
        {path: 'outline', component: courseDetailOutline, alias: '/education/course/detail/video/outline'},
        {path: 'comment', component: courseDetailComment, alias: '/education/course/detail/video/comment'},
        {path: 'student', component: courseDetailStudent, alias: '/education/course/detail/video/student'},
        {path: 'discuss', component: courseDetailDiscuss, alias: '/education/course/detail/video/discuss'},
        {path: 'initiate', component: courseDetailDiscussInitiate, alias: '/education/course/detail/video/initiate'},
        {path: 'discussTheme', component: courseDetailDiscussTheme, alias: '/education/course/detail/video/discussTheme'},
        {path: 'discussDetail', component: courseDetailDiscussInitiateDetail, alias: '/education/course/detail/video/discussDetail'},
        {path: 'share', component: courseDetailShare, alias: '/education/course/detail/video/share'},
        {path: 'note', component: courseDetailNote, alias: '/education/course/detail/video/note'}
      ]
    }
  ]
})
