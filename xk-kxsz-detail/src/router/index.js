import Vue from 'vue'
import Router from 'vue-router'

// 作品
import work from 'components/work/worksDetails.vue'

// 课程
import course from 'View/course/course.vue'
import courseTest from 'View/course/course_test.vue'
import courseTestQuestion from 'View/course/children/test_question.vue'
import courseTestAnswer from 'View/course/children/test_answer.vue'
import videoPage from 'View/course/video.vue'
import courseDetailInfo from 'View/course/children/detail_info.vue'
import courseDetailOutline from 'View/course/children/detail_outline.vue'
import courseDetailComment from 'View/course/children/detail_comment.vue'
import courseDetailStudent from 'View/course/children/detail_student.vue'
import courseDetailDiscuss from 'View/course/children/detail_discuss.vue'
import courseDetailDiscussInitiate from 'View/course/children/discuss_initiate.vue'
import courseDetailDiscussTheme from 'View/course/children/discuss_theme.vue'
import courseDetailDiscussInitiateDetail from 'View/course/children/discuss_initiate_detail.vue'
import courseDetailShare from 'View/course/children/detail_share.vue'
import courseDetailNote from 'View/course/children/detail_note.vue'

// 教育局
import education from 'View/space/edu/educationBureauSpace.vue'
import eduHomepage from 'View/space/edu/homepage/homepage.vue'
import eduInformation from 'View/space/edu/information/information.vue'
import eduCourse from 'View/space/edu/course/course.vue'
import eduActivity from 'View/space/edu/activity/activity.vue'
import eduSubject from 'View/space/edu/subject/subject.vue'
import eduSubjectOverview from 'View/space/edu/subject/subjectOverview.vue'
import eduStatistical from 'View/space/edu/statistical/statis.vue'
import eduInformationDetail from 'View/space/edu/information/details.vue'
import eduWorks from 'View/space/edu/works/works.vue'
import eduProject from 'View/space/edu/project/project.vue'
// 学校
import school from 'View/space/school/schoolSpace.vue'
import schoolHomePage from 'View/space/school/homePage/homePage.vue'
import schoolStatistical from 'View/space/school/statis/statis.vue'
import schoolSubject from 'View/space/school/subject/subject.vue'
//班级空间
import clasz from 'View/space/clasz/claszSpace.vue'
import claszStatis from 'View/space/clasz/statis/statis.vue'
import claszHomePage from 'View/space/clasz/homePage/homePage.vue'
import claszManage from 'View/space/clasz/claszManage/clasz_manage.vue'
import topicBar from 'View/space/clasz/topic/topic.vue'
import topicDetail from 'View/space/clasz/topic/topiceDetail.vue'
import claszBaseInfo from 'View/space/clasz/claszManage/base_info.vue'
import claszMemberManage from 'View/space/clasz/claszManage/member_manage.vue'
import claszNoticeManage from 'View/space/clasz/claszManage/notice_manage.vue'
// 兴趣组空间
import interests from 'View/space/interests/interestsSpace.vue'
import interestManage from 'View/space/interests/interestManage/interest_manage.vue'
import interestHomepage from 'View/space/interests/homePage/homePage.vue'
import interestMemberManage from 'View/space/interests/interestManage/member_manage.vue'
import interestMember from 'View/space/interests/member/interest_member.vue'
import interestWorks from 'View/space/interests/works/works.vue'
import interestArticle from 'View/space/interests/article/article.vue'
import interestArticlePublish from 'View/space/interests/article/articlePublish.vue'
import interestArticleDetail from 'View/space/interests/article/articleDetail.vue'
import createInterest from 'View/space/interests/interestManage/create_interest.vue'
// 课题
import subjectGuideDetails from 'View/space/edu/subject/children/guide_details.vue'
import subjectActivityDetails from 'View/space/edu/subject/children/activity_details.vue'
import subjectResultDetails from 'View/space/edu/subject/children/result_details.vue'
import adminSubjectApply from 'View/space/edu/subject/subject_apply.vue'
import subject_discussInitiate from 'View/space/edu/subject/children/subjectDiscuss_initiate.vue'
import subject_task from 'View/space/edu/subject/children/subject_task.vue'
import subject_activity from 'View/space/edu/subject/children/subject_activity.vue'
import subject_result from 'View/space/edu/subject/children/subject_result.vue'
import subject_stage from 'View/space/edu/subject/children/subject_stage.vue'
import subject_discuss from 'View/space/edu/subject/children/subject_discuss.vue'
import subject_discussDetail from 'View/space/edu/subject/children/subject_discussDetail.vue'
import subjectResearchDetails from 'View/space/edu/subject/children/research_details.vue'
import subject_details from 'View/space/edu/subject/children/subject_details.vue'
// 活动
import activity from 'View/activity/activity.vue'
import activityDetails from 'View/activity/children/activityDetails.vue'
import activityMember from 'View/activity/children/activityMember.vue'
import activityComment from 'View/activity/children/activityComment.vue'
import activityInfo from 'View/activity/children/activity_info.vue'
import activity_result from 'View/activity/children/activity_result.vue'

// 导师工作室
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
import studioMicroClassDetail from 'View/studioMember/microClass/microClass_detail.vue'
import studioManage from 'View/studioMember/manage/studio_manage.vue'
import studioBaseInfo from 'View/studioMember/manage/studio_baseInfo.vue'
import studioMemberMng from 'View/studioMember/manage/studio_member.vue'
import studioColumnMng from 'View/studioMember/manage/column_manage.vue'
import studioSetBg from 'View/studioMember/manage/studio_setBg.vue'

// 示范学校
import modelSchoolIndex from 'View/model_school/index.vue'
import modelSchoolHome from 'View/model_school/home/home.vue'
import modelSchoolAchv from 'View/model_school/achievement/achievement.vue'
import modelSchoolAchvDetail from 'View/model_school/achievement/achievement_detail.vue'
import modelSchoolFeature from 'View/model_school/feature/feature.vue'
import modelSchoolFeatureDetail from 'View/model_school/feature/feature_detail.vue'
import modelSchoolHonor from 'View/model_school/honor/honor.vue'
import modelSchoolHonorDetail from 'View/model_school/honor/honor_detail.vue'
import modelSchoolEvent from 'View/model_school/event/event.vue'
//项目模块
import project from 'View/project/project.vue'
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
// 网上实训室
import eduTrainDetails from 'View/train/trainDetail.vue'
import eduTrainDetailsEval from 'View/train/trainDetail_evaluation.vue'
import eduTrainDetailsDis from 'View/train/trainDiscuss_view.vue'
import eduTrainDetailsIndex from 'View/train/trainDiscuss_index.vue'
import eduTrainDetailsPub from 'View/train/trainDiscuss_pub.vue'
import eduTrainDetailsDetail from 'View/train/trainDiscuss_detail.vue'

// 教师、学生
import personSpace from 'View/person/personSpace.vue'
import personDynamic from 'View/person/children/dynamic.vue'
import personStudy from 'View/person/children/study.vue'
import personWorks from 'View/person/children/works.vue'
import personResource from 'View/person/children/resource.vue'
import teacherGuidance from 'View/person/children/guidance.vue'
import personInterest from 'View/person/children/interest.vue'
import personVisitor from 'View/person/children/visitor.vue'
import resources from 'components/resource/resources.vue'
import adminEvaluation from 'Common/evaluation/evaluation.vue'
import adminPractice from 'View/practice/practice.vue'
// 资源
import resourceDetail from 'components/resource/resourcesDetails.vue'

// 活动培训
import actiTrainDetail from 'View/actiTrain/actiTrain.vue'

//街区-秀作品-故事-详情
import storyDetail from 'View/storyDetail/storyDetail.vue'
import storyDetailInfo from 'View/storyDetail/story_detail.vue'
import storyDetailComment from 'View/storyDetail/story_comment.vue'

// 街区-拉勾（需求、服务）
import streetLaGouDetail from 'View/lagou/lagouDetail.vue'
import streetLaGouDetail_instruction from 'View/lagou/lagouDetail_instruction.vue'
import streetLaGouDetail_comment from 'View/lagou/lagou_comment.vue'
import streetLaGouDetail_attachment from 'View/lagou/lagouDetail_attachment.vue'
import streetLaGouDetail_hookupwith from 'View/lagou/lagouDetail_hookupwith.vue'


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
        // 作品
        {
            path: '/street/work',
            component: work
        },
        // 资源
        {
            path: '/resource',
            component: resourceDetail
        },
        // 活动培训
        {
            path: '/actiTrain',
            component: actiTrainDetail,
            alias: '/education/actiTrain'
        },
        // 课程
        {
            path: '/education/course',
            redirect: '/education/course/info',
            component: course,
            children: [
                { path: 'info', component: courseDetailInfo },
                { path: 'outline', component: courseDetailOutline },
                { path: 'comment', component: courseDetailComment },
                { path: 'student', component: courseDetailStudent },
                { path: 'discuss', component: courseDetailDiscuss },
                { path: 'initiate', component: courseDetailDiscussInitiate },
                { path: 'discussTheme', component: courseDetailDiscussTheme },
                { path: 'discussDetail', component: courseDetailDiscussInitiateDetail },
                { path: 'share', component: courseDetailShare },
                { path: 'note', component: courseDetailNote }
            ]
        },
        // 课程题目
        {
            path: '/education/course/test',
            component: courseTest,
            name: 'courseTest',
            redirect: '/education/course/test/q',
            children: [
                { path: 'q', component: courseTestQuestion },
                { path: 'a', component: courseTestAnswer }
            ]
        },
        // 课程视频学习
        {
            path: '/education/course/video',
            component: videoPage,
            linkActiveClass: 'active',
            redirect: '/education/course/video/info',
            children: [
                { path: 'info', component: courseDetailInfo },
                { path: 'outline', component: courseDetailOutline },
                { path: 'comment', component: courseDetailComment },
                { path: 'student', component: courseDetailStudent },
                { path: 'discuss', component: courseDetailDiscuss },
                { path: 'initiate', component: courseDetailDiscussInitiate },
                { path: 'discussTheme', component: courseDetailDiscussTheme },
                { path: 'discussDetail', component: courseDetailDiscussInitiateDetail },
                { path: 'share', component: courseDetailShare },
                { path: 'note', component: courseDetailNote }
            ]
        },
        // 老师
        {
            path: '/space/teacher',
            component: personSpace,
            redirect: '/space/teacher/dynamic',
            children: [
                { path: 'dynamic', component: personDynamic },
                { path: 'study', component: personStudy },
                { path: 'guidance', component: teacherGuidance },
                { path: 'works', component: personWorks },
                { path: 'resource', component: personResource },
                { path: 'interest', component: personInterest },
                { path: 'visitor', component: personVisitor }
            ]
        },
        // 学生
        {
            path: '/space/student',
            component: personSpace,
            redirect: '/space/student/dynamic',
            children: [
                { path: 'dynamic', component: personDynamic },
                { path: 'study', component: personStudy },
                { path: 'study/eval', component: adminEvaluation },
                { path: 'practice', component: adminPractice },
                { path: 'practiceEval', component: adminEvaluation },
                { path: 'works', component: personWorks },
                { path: 'resource', component: personResource },
                { path: 'interest', component: personInterest },
                { path: 'visitor', component: personVisitor }
            ]
        },
        // 示范校
        {
            path: '/space/model',
            component: modelSchoolIndex,
            redirect: '/space/model/homepage',
            children: [
                { path: 'homepage', component: modelSchoolHome },
                { path: 'achv', component: modelSchoolAchv },
                { path: 'feature', component: modelSchoolFeature },
                { path: 'honor', component: modelSchoolHonor },
                { path: 'event', component: modelSchoolEvent }
            ],
        },
        { path: '/space/model/achv/detail', component: modelSchoolAchvDetail },
        { path: '/space/model/feature/detail', component: modelSchoolFeatureDetail },
        { path: '/space/model/honor/detail', component: modelSchoolHonorDetail },
        // 教育局
        {
            path: '/space/edu',
            component: education,
            redirect: '/space/edu/homepage',
            linkActiveClass: 'active',
            children: [
                { path: 'homepage', component: eduHomepage },
                { path: 'information', component: eduInformation },
                { path: 'works', component: eduWorks },
                { path: 'resources', component: resources },
                { path: 'course', component: eduCourse },
                { path: 'project', component: eduProject },
                { path: 'activity', component: eduActivity },
                { path: 'subject', component: eduSubject },
                { path: 'statistical', component: eduStatistical },
                // 课题分类
                { path: 'subject/:model', component: eduSubjectOverview },
                { path: 'subject/guide/detail', name: 'eduGuideDetail', component: subjectGuideDetails },
                { path: 'subject/activity/detail', component: subjectActivityDetails },
                { path: 'subject/results/detail', component: subjectResultDetails },
                { path: 'subject/guide/apply', component: adminSubjectApply }
            ]
        },
        // 学校
        {
            path: '/space/school',
            component: school,
            redirect: '/space/school/homepage',
            linkActiveClass: 'active',
            children: [
                { path: 'homePage', component: schoolHomePage },
                { path: 'information', component: eduInformation },
                { path: 'works', component: eduWorks },
                { path: 'course', component: eduCourse },
                { path: 'resource', component: resources },
                { path: 'project', component: eduProject },
                { path: 'statistical', component: schoolStatistical },
                // { path: 'schoolStatistical', component: constructing },
                { path: 'subject', component: eduSubject },
                // 课题分类
                { path: 'subject/:model', component: eduSubjectOverview },
                { path: 'subject/guide/detail', name: 'schoolGuideDetail', component: subjectGuideDetails },
                { path: 'subject/activity/detail', component: subjectActivityDetails },
                { path: 'subject/results/detail', component: subjectResultDetails },
                { path: 'subject/guide/apply', component: adminSubjectApply },
                { path: 'activity', component: eduActivity }
            ]
        },
        // 资讯详情
        { path: '/space/edu/informationDetail/:type', component: eduInformationDetail },
        { path: '/space/school/informationDetail/:type', component: eduInformationDetail },
        {
            path: '/space/clasz',
            component: clasz,
            redirect: '/space/clasz/homePage',
            linkActiveClass: 'active',
            children: [
                { path: 'homepage', component: claszHomePage },
                { path: 'resource', component: resources },
                { path: 'works', component: eduWorks },
                { path: 'topic', component: topicBar },
                { path: 'topicDetail', component: topicDetail, alias: '/space/clasz/topic/detail' },
                { path: 'details', component: work, alias: '/claszSpace/works/details' },
                { path: 'statis', component: claszStatis, alias: '/claszSpace/works/statis' }
            ]
        },
        // 班级管理
        {
            path: '/space/clasz/manage',
            component: claszManage,
            redirect: '/space/clasz/manage/baseInfo',
            children: [
                { path: 'baseInfo', component: claszBaseInfo },
                { path: 'memberManage', component: claszMemberManage },
                { path: 'claszNoticeManage', component: claszNoticeManage }
            ]
        },
        // 兴趣组
        {
            path: '/space/interest',
            component: interests,
            redirect: '/space/interest/homepage',
            linkActiveClass: 'active',
            children: [
                { path: 'homepage', component: interestHomepage },
                { path: 'member', component: interestMember },
                { path: 'resource', component: resources },
                { path: 'works', component: interestWorks },
                { path: 'topic', component: topicBar },
                { path: 'topicDetail', component: topicDetail, alias: '/space/interest/topic/detail' },
                { path: 'works/details', component: work },
                { path: 'article', component: interestArticle },
                { path: 'article/publish', component: interestArticlePublish },
                { path: 'article/edit', component: interestArticlePublish }
            ]
        },
        { path: '/space/interest/article/detail', component: interestArticleDetail },
        {
            path: '/space/interest/manage',
            component: interestManage,
            redirect: '/space/interest/manage/baseInfo',
            children: [
                { path: 'baseInfo', component: createInterest },
                { path: 'memberManage', component: interestMemberManage },
                { path: 'noticeManage', component: claszNoticeManage }
            ]
        },
        // 导师工作室
        {
            path: '/space/studio',
            component: studioMemberDetail,
            redirect: '/space/studio/homePage',
            children: [
                { path: 'homePage', component: studioMemberHomepage },
                { path: 'article', component: studioMemberArticle },
                { path: 'result', component: studioMemberResult },
                { path: 'resource', component: studioResource },
                { path: 'resource/detail', component: studioResourceDetail },
                { path: 'microClass', component: studioMicroClass },
                { path: 'topic', component: studioMemberTopic },
                { path: 'topic/detail', component: topicDetail }
            ]
        },
        { path: '/space/studio/articleDetail/:type', component: studioMemberArticleDetail },
        { path: '/space/studio/microClass/detail', component: studioMicroClassDetail },
        // 导师工作室管理
        {
            path: '/space/studio/manage',
            component: studioManage,
            redirect: '/space/studio/manage/baseInfo',
            children: [
                { path: 'baseInfo', component: studioBaseInfo },
                { path: 'memberMng', component: studioMemberMng },
                { path: 'noticeMng', component: claszNoticeManage },
                { path: 'columnMng', component: studioColumnMng },
                { path: 'bgMng', component: studioSetBg }
            ]
        },
        // 活动
        {
            path: '/street/activity',
            redirect: '/street/activity/info',
            component: activity,
            children: [
                { path: 'info', component: activityInfo },
                { path: 'member', component: activityMember },
                { path: 'result', component: activity_result },
                { path: 'comment', component: activityComment }
            ]
        },
        // 项目
        {
            path: '/education/project',
            component: project,
            redirect: '/education/project/repertoire',
            children: [
                { path: 'repertoire', component: projectDetailRepertoire },
                { path: 'member', component: projectDetailMember },
                { path: 'stage', component: projectDetailStage },
                { path: 'summary', component: projectDetailSummary },
                { path: 'evaluate', component: projectDetailEvaluate },
                { path: 'share', component: projectDetailShare },
                {
                    path: 'discuss',
                    component: projectDiscussView,
                    redirect: '/education/project/discuss/overview',
                    children: [
                        { path: 'overview', component: projectDiscussOverview },
                        { path: 'publish', component: projectDiscussPublish },
                        { path: 'theme', component: projectDiscussTheme },
                        { path: 'detail', component: projectDiscussDetail }
                    ]
                }
            ]
        },
        // 实训
        {
            path: '/education/train',
            component: eduTrainDetails,
            redirect: '/education/train/discuss',
            children: [
                { path: 'evaluate', component: eduTrainDetailsEval, meta: { background: true } },
                {
                    path: 'discuss',
                    component: eduTrainDetailsDis,
                    redirect: '/education/train/discuss/index',
                    children: [
                        { path: 'index', component: eduTrainDetailsIndex, meta: { background: true } },
                        { path: 'publish', component: eduTrainDetailsPub, meta: { background: true } },
                        { path: 'detail', component: eduTrainDetailsDetail, meta: { background: true } }
                    ]
                },
            ]
        },
        //课题详情
        {
            path: '/space/subject/research',
            component: subjectResearchDetails,
            redirect: '/space/subject/research/info',
            children: [
                { path: 'info', component: subject_details },
                { path: 'task', component: subject_task },
                { path: 'activity', component: subject_activity },
                { path: 'result', component: subject_result },
                { path: 'stage', component: subject_stage },
                { path: 'discuss', component: subject_discuss },
                { path: 'discussInitiate', component: subject_discussInitiate },
                { path: 'discussDetail', component: subject_discussDetail }
            ]
        },
        // 故事详情
        {
            path: 'story', name: 'storyDetail', component: storyDetail, redirect: '/street/story/info',
            children: [
                { path: 'storyInfo', component: storyDetailInfo, alias: '/street/story/info', meta: { position: { x: 0, y: 0 } } },
                { path: 'storyComment', component: storyDetailComment, alias: '/street/story/comment' }
            ]
        },
        // 拉钩（需求、服务详情）
        {
            path: '/street/lagou/detail/:type',
            component: streetLaGouDetail,
            redirect: '/street/lagou/detail/:type/instruction',
            children: [
                { path: 'instruction', component: streetLaGouDetail_instruction, meta: { position: { x: 0, y: 0 } } },
                { path: 'comment', component: streetLaGouDetail_comment },
                { path: 'attachment', component: streetLaGouDetail_attachment },
                { path: 'hookupwith', component: streetLaGouDetail_hookupwith }
            ]
        },
    ],
})
