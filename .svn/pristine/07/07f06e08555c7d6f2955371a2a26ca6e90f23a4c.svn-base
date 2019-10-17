
import Vue from 'vue'
import Router from 'vue-router'

// 后台管理
import backStageIndex from '@/view/container.vue'
// 首页 (待办事项)
import index_view from '@/view/index/index.vue'
// 安全设置
import common_safeSetting from '@/view/common/safe.vue'
import common_safeModifyPwd from '@/view/common/children/modifyPwd.vue'
import common_safeModifyEmail from '@/view/common/children/modifyEmail.vue'
import common_safeModifyMobile from '@/view/common/children/modifyMobile.vue'
import common_safeBindEmail from '@/view/common/children/bindEmail.vue'
import common_safeBindMobile from '@/view/common/children/bindMobile.vue'
// 空间管理
// 项目、课程、活动、作品、资源、课题视图
import space_view from '@/view/space/view.vue'
// 学习
import space_study from '@/view/space/study/studyManage.vue'
// 实践
import space_practice from '@/view/space/practice/practiceManage.vue'
// 项目
import space_projectPending from '@/view/space/project/projectPending.vue'
import space_projectAudited from '@/view/space/project/projectAudited.vue'
import space_projectDetail from '@/view/space/project/projectDetail.vue'
// 课程
import space_courseAudited from '@/view/space/course/courseAudited.vue'
import space_coursePending from '@/view/space/course/coursePending.vue'
import spaceCourseDetail from '@/view/space/course/course_detail.vue'
import courseDetailInfo from '@/view/space/course/children/detail_info.vue'
import courseDetailOutline from '@/view/space/course/children/detail_outline.vue'
import courseVideoPreview from '@/view/space/course/videoPreview.vue'
import courseTestPreview from '@/view/space/course/testPreview.vue'
// 活动
import space_activityAudited from '@/view/space/activity/activityAudited.vue'
import space_activityPending from '@/view/space/activity/activityPending.vue'
import space_activityDetail from '@/view/space/activity/activityDetail.vue'
// 作品
import space_worksAudited from '@/view/space/works/worksAudited.vue'
import space_worksPending from '@/view/space/works/worksPending.vue'
import space_worksDetail from '@/view/space/works/worksDetail.vue'
// 课题
import space_subjectGuide from '@/view/space/subject/subject_guide.vue'
import space_subjectReport from '@/view/space/subject/subject_report.vue'
import space_subjectResearch from '@/view/space/subject/subject_research.vue'
import space_subjectAudit from '@/view/space/subject/subject_audit.vue'
import space_subjectGuideDetail from '@/view/space/subject/subject_guideDetails.vue'
import space_subjectReportDetail from '@/view/space/subject/subject_reportDetails.vue'
import space_subjectAdd from '@/view/space/subject/subjectManageAdd.vue'

// 资讯
import space_information from '@/view/space/information/inforManage.vue'
import space_informationAdd from '@/view/space/information/inforManage_add.vue'
// 友情链接
import space_link from '@/view/space/link/linkManage.vue'
import space_linkAdd from '@/view/space/link/linkManage_add.vue'
// 资源
import space_resourceAudited from '@/view/space/resource/resourceAudited.vue'
import space_resourcePending from '@/view/space/resource/resourcePending.vue'
import space_resourceDetail from '@/view/space/resource/resourceDetails.vue'
// 故事
import space_storyAudited from '@/view/space/story/storyAudited.vue'
import space_storyPending from '@/view/space/story/storyPending.vue'
import space_storyDetail from '@/view/space/story/storyDetail.vue'
// 服务
import space_serviceAudited from '@/view/space/service/serviceAudited.vue'
import space_servicePending from '@/view/space/service/servicePending.vue'
import space_serviceDetail from '@/view/space/service/serviceDetail.vue'
// 需求
import space_demandAudited from '@/view/space/demand/demandAudited.vue'
import space_demandPending from '@/view/space/demand/demandPending.vue'
import space_demandDetail from '@/view/space/demand/demandDetail.vue'
// 商业策划
import space_planAudited from '@/view/space/plan/planAudited.vue'
import space_planPending from '@/view/space/plan/planPending.vue'
import space_planDetail from '@/view/space/plan/planDetail.vue'
// 培训管理
import space_train from '@/view/space/train/trainManage.vue'
import space_trainAdd from '@/view/space/train/add_train.vue'
import space_trainEnroll from '@/view/space/train/train_enroll.vue'
import train_enrollEdit from '@/view/space/train/train_enroll_edit.vue'

// 基础管理
import base_edu from '@/view/base/edu/eduManage.vue'
import base_eduAdd from '@/view/base/edu/eduManage_add.vue'

import base_school from '@/view/base/school/schoolManage.vue'
import base_schoolAdd from '@/view/base/school/schoolManage_add.vue'

import base_clasz from '@/view/base/clasz/claszManage.vue'
import base_claszAdd from '@/view/base/clasz/claszManage_add.vue'

import base_teacher from '@/view/base/teacher/teacherManage.vue'
import base_teacherAdd from '@/view/base/teacher/teacherManage_add.vue'

import base_student from '@/view/base/student/studentManage.vue'
import base_studentAdd from '@/view/base/student/studentManage_add.vue'

import base_admin from '@/view/base/admin/adminManage.vue'
import base_adminAdd from '@/view/base/admin/adminManage_add.vue'

import base_eduer from '@/view/base/eduer/eduerManage.vue'
import base_eduerAdd from '@/view/base/eduer/eduerManage_add.vue'

import base_schooler from '@/view/base/schooler/schoolerManage.vue'
import base_schoolerAdd from '@/view/base/schooler/schoolerManage_add.vue'

import base_interestPending from '@/view/base/interest/interestPending.vue'
import base_interestAudited from '@/view/base/interest/interestAudited.vue'
import base_interestAdd from '@/view/base/interest/interestManage_add.vue'
import base_interestDetail from '@/view/base/interest/interestDetail.vue'

import base_studioPending from '@/view/base/studio/studioPending.vue'
import base_studioAudited from '@/view/base/studio/studioAudited.vue'
import base_studioDetail from '@/view/base/studio/studioDetail.vue'

import base_enterprise from '@/view/base/otherusers/enterpriseManage.vue'
import base_enterpriseAdd from '@/view/base/otherusers/enterpriseManage_add.vue'

import base_investor from '@/view/base/otherusers/investorManage.vue'
import base_investorAdd from '@/view/base/otherusers/investorManage_add.vue'
import base_investorg from '@/view/base/otherusers/investOrgManage.vue'
import base_investorgAdd from '@/view/base/otherusers/investOrgManage_add.vue'

import base_mult from '@/view/base/otherusers/multManage.vue'
import base_multAdd from '@/view/base/otherusers/multManage_add.vue'

import base_enroll from '@/view/base/enroll/enroll.vue'
import base_enrollDetail from '@/view/base/enroll/enroll_detail.vue'

import base_platformSpace from '@/view/base/platform/platformSpace.vue'

import base_modelSchool from '@/view/base/model/modelSchool.vue'

import base_transferSchool from '@/view/base/transfer_school/transfer_audit.vue'


// 系统管理
import system_role from '@/view/system/role/roleManage.vue'
import system_banner from '@/view/system/banner/bannerManage.vue'
import systemTag from '@/view/system/tag/tag.vue'
import systemAddTag from '@/view/system/tag/tag_add.vue'
import systemTerm from '@/view/system/term/term.vue'
import systemComment from '@/view/system/comment/comment.vue'
import systemReport from '@/view/system/report/report.vue'
import systemFeedback from '@/view/system/feedback/feedback.vue'

// 配置管理
import configure_security from '@/view/configure/security/security.vue'
import configure_nav from '@/view/configure/nav/navManage.vue'
import configure_menu from '@/view/configure/menu/menuManage.vue'
import configure_audit from '@/view/configure/audit/audit.vue'
import configure_classify from '@/view/configure/classify/classifyManage.vue'
import configure_datadict from '@/view/configure/datadict/datadict.vue'
import configure_train from '@/view/configure/train/train.vue'
import configure_doc from '@/view/configure/doc/doc.vue'
import configure_faq from '@/view/configure/faq/faq.vue'
import configure_recruit from '@/view/configure/recruit/recruit.vue'
import configure_recruitAdd from '@/view/configure/recruit/recruit_add.vue'
import configure_trainClassify from '@/view/configure/trainClassify/trainClassify.vue'
import configure_trainPeriod from '@/view/configure/trainPeriod/trainPeriod.vue'
import configure_trainSubject from '@/view/configure/trainSubject/trainSubject.vue'


// 统计分析
import statis_module from '@/view/statistics/module.vue'
// import statis_overview from '@/view/statistics/overview.vue'
// import statis_works from '@/view/statistics/works/works.vue'
// import statis_project from '@/view/statistics/project/project.vue'
// import statis_course from '@/view/statistics/course/course.vue'
// import statis_activity from '@/view/statistics/activity/activity.vue'
// import statis_resource from '@/view/statistics/resource/resource.vue'
// import statis_interest from '@/view/statistics/interest/interest.vue'

// 综合素质
import evaluationQuota from '@/view/evaluation/quota/'
import evaluationQuotaLv1 from '@/view/evaluation/quota/children/level_one.vue'
import evaluationQuotaLv2 from '@/view/evaluation/quota/children/level_two.vue'
import evaluationTmpl from '@/view/evaluation/tmpl/tmpl.vue'
import evaluationTmplAdd from '@/view/evaluation/tmpl/tmpl_add.vue'
import evaluationRecord from '@/view/evaluation/record/record.vue'
import adminEvaluation from '@/view/evaluation/record/record_add.vue'

// 示范校
import modelSchoolIntro from '@/view/model_school/introduction.vue'
import modelSchoolAchv from '@/view/model_school/achievement.vue'
import modelSchoolFeature from '@/view/model_school/feature.vue'
import modelSchoolEvent from '@/view/model_school/event.vue'
import modelSchoolHonor from '@/view/model_school/honor.vue'
import modelSchoolBg from '@/view/model_school/background.vue'

// 赛事系统
import contest_manage from '@/view/contest/manage/contestManage.vue'
import contest_manageAdd from '@/view/contest/manage/contestManage_add.vue'
import contest_event from '@/view/contest/event/eventManage.vue'
import contest_eventAdd from '@/view/contest/event/eventManage_add.vue'
import contest_expert from '@/view/contest/expert/expertManage.vue'
import contest_expertAdd from '@/view/contest/expert/expertManage_add.vue'
import contest_group from '@/view/contest/group/groupManage.vue'
import contest_groupAdd from '@/view/contest/group/groupManage_add.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    // mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            component: index_view,
        },
        {
            path: '/setting',
            meta: {
                requireAuth: false,
                title: '安全设置'
            },
            component: common_safeSetting,
            redirect: '/setting/password',
            children: [
                { path: 'password', meta: { title: '修改密码' }, component: common_safeModifyPwd },
                { path: 'mobile/bind', meta: { title: '绑定手机' }, component: common_safeBindMobile },
                { path: 'email/bind', meta: { title: '绑定邮箱' }, component: common_safeBindEmail },
                { path: 'mobile/modify', meta: { title: '修改手机' }, component: common_safeModifyMobile },
                { path: 'email/modify', meta: { title: '修改邮箱' }, component: common_safeModifyEmail },
            ]
        },
        // 待办事项
        // {
        //     path: '/backlog',
        //     name: 'backlog',
        //     component: backlog_view,
        //     redirect: '/backlog/project',
        //     children: [
        //         // 项目
        //         { path: 'project', component: space_projectPending },
        //         // 课程
        //         { path: 'course', component: space_coursePending },
        //         // 活动
        //         { path: 'activity', component: space_activityPending },
        //         // 作品
        //         { path: 'works', component: space_worksPending },
        //         // 资源
        //         { path: 'resource', component: space_resourcePending },
        //         // 故事
        //         { path: 'story', component: space_storyPending },
        //         // 需求
        //         { path: 'demand', component: space_demandPending },
        //         // 服务
        //         { path: 'service', component: space_servicePending },
        //         // 商业策划
        //         { path: 'plan', component: space_planPending },
        //         // 兴趣组
        //         { path: 'interest', component: base_interestPending },
        //         // 工作室
        //         { path: 'studio', component: base_studioPending },
        //     ]
        // },
        // 空间管理
        {
            path: '/space',
            name: 'space',
            component: backStageIndex,
            redirect: '/space/project',
            children: [
                // 学习管理
                { path: 'study', component: space_study},
                // 实践管理
                { path: 'practice', component: space_practice},
                // 项目管理
                {
                    path: 'project',
                    component: space_view,
                    redirect: '/space/project/audited',
                    children: [
                        { path: 'pending', component: space_projectPending },
                        { path: 'audited', component: space_projectAudited }
                    ]
                },
                // 项目管理 - 详情
                { path: 'projectDetail', component: space_projectDetail, alias: '/space/project/detail' },
                // 课程管理
                {
                    path: 'course',
                    component: space_view,
                    redirect: '/space/course/audited',
                    children: [
                        { path: 'pending', component: space_coursePending },
                        { path: 'audited', component: space_courseAudited }
                    ]
                },
                // 课程管理 - 详情
                { path: 'courseDetail', component: spaceCourseDetail, alias: '/space/course/detail',
                    children: [
                        { path: '', component: courseDetailInfo, alias: '/education/course/detail/info' },
                        { path: 'info', component: courseDetailInfo, alias: '/education/course/detail/info' },
                        { path: 'outline', component: courseDetailOutline, alias: '/education/course/detail/outline' },
                    ]
                },
                { path: 'courseVideo', component: courseVideoPreview, alias: '/space/course/detail/video/outline' },
                { path: 'courseTest', component: courseTestPreview, alias: '/space/course/detail/test' },
                // 活动管理
                {
                    path: 'activity',
                    component: space_view,
                    redirect: '/space/activity/audited',
                    children: [
                        { path: 'pending', component: space_activityPending },
                        { path: 'audited', component: space_activityAudited }
                    ]
                },
                // 活动管理 - 详情
                { path: 'adminActivityDetail', component: space_activityDetail, alias:'/space/activity/detail' },
                // 作品管理
                {
                    path: 'works',
                    component: space_view,
                    redirect: '/space/works/audited',
                    children: [
                        { path: 'pending', component: space_worksPending },
                        { path: 'audited', component: space_worksAudited }
                    ]
                },
                // 作品管理 - 详情
                { path: 'worksDetail', component: space_worksDetail, alias: '/space/works/detail' },
                // 资源管理
                {
                    path: 'resource',
                    component: space_view,
                    redirect: '/space/resource/audited',
                    children: [
                        { path: 'pending', component: space_resourcePending },
                        { path: 'audited', component: space_resourceAudited }
                    ]
                },
                // 资源管理 - 详情
                { path: 'resourceDetail', component: space_resourceDetail, alias: '/space/resource/detail' },
                // 课题管理
                {
                    path: 'subject',
                    component: space_view,
                    redirect: '/space/subject/guide',
                    children: [
                        // 申报指南
                        { path: 'guide', component: space_subjectGuide },
                        // 申报课题
                        { path: 'report', component: space_subjectReport },
                        // 在研课题
                        { path: 'research', component: space_subjectResearch },
                        // 课题审核阶段
                        { path: 'audit', component: space_subjectAudit }
                    ]
                },
                { path: 'addSubject', component: space_subjectAdd, alias: '/space/subject/guide/add' },
                { path: 'editSubject', component: space_subjectAdd, alias: '/space/subject/guide/edit' },
                // 课题管理
                // 申报指南 - 详情
                { path: 'guideDetail', component: space_subjectGuideDetail, alias: '/space/subject/guide/detail' },
                // 申报课题 - 详情
                { path: 'reportDetail', component: space_subjectReportDetail, alias: '/space/subject/report/detail' },
                // 资讯管理
                { path: 'info', component: space_information },
                { path: 'addInfo', component: space_informationAdd, alias: '/space/info/add' },
                { path: 'editInfo', component: space_informationAdd, alias: '/space/info/edit' },
                // 友情链接
                { path: 'link', component: space_link },
                { path: 'addLink', component: space_linkAdd, alias: '/space/link/add' },
                { path: 'editLink', component: space_linkAdd, alias: '/space/link/edit' },
                { path: 'linkDetail', component: space_linkAdd, alias: '/space/link/detail' },
                // 故事管理
                {
                    path: 'story',
                    component: space_view,
                    redirect: '/space/story/audited',
                    children: [
                        { path: 'pending', component: space_storyPending },
                        { path: 'audited', component: space_storyAudited }
                    ]
                },
                { path: 'storyDetail',component: space_storyDetail,alias: '/space/story/detail' },
                // 服务管理
                {
                    path: 'service',
                    component: space_view,
                    redirect: '/space/service/audited',
                    children: [
                        { path: 'pending', component: space_servicePending },
                        { path: 'audited', component: space_serviceAudited }
                    ]
                },
                { path: 'serviceDetail',component: space_serviceDetail,alias: '/space/service/detail' },
                // 需求管理
                {
                    path: 'demand',
                    component: space_view,
                    redirect: '/space/demand/audited',
                    children: [
                        { path: 'pending', component: space_demandPending },
                        { path: 'audited', component: space_demandAudited }
                    ]
                },
                { path: 'demandDetail',component: space_demandDetail,alias: '/space/demand/detail' },
                // 商业策划管理
                {
                    path: 'plan',
                    component: space_view,
                    redirect: '/space/plan/audited',
                    children: [
                        { path: 'pending', component: space_planPending },
                        { path: 'audited', component: space_planAudited }
                    ]
                },
                { path: 'planDetail', component:space_planDetail, alias: '/space/plan/detail' },
                // 培训管理
                { path: '/train', component: space_train, alias: '/space/train' },
                { path: '/addTrain', component: space_trainAdd, alias: '/space/train/add' },
                { path: '/editTrain', component: space_trainAdd, alias: '/space/train/edit' },
                { path: '/viewEnroll', component: space_trainEnroll, alias: '/space/train/viewEnroll' },
                { path: '/viewEnrollEdit', component: train_enrollEdit, alias: '/space/train/viewEnroll/viewEnrollEdit' }
            ]
        },

        // 基础管理
        {
            path: '/base',
            name: 'base',
            component: backStageIndex,
            redirect: '/base/school',
            children: [
                // 机构管理
                { path: 'edu', component: base_edu },
                { path: 'editEdu', component: base_eduAdd, alias: '/base/edu/edit' },
                { path: 'eduDetail', component: base_eduAdd, alias: '/base/edu/detail' },
                // 学校管理
                { path: 'school', component: base_school },
                { path: 'addSchool', component: base_schoolAdd, alias: '/base/school/add' },
                { path: 'editSchool', component: base_schoolAdd, alias: '/base/school/edit' },
                { path: 'schoolDetail', component: base_schoolAdd, alias: '/base/school/detail' },
                // 班级管理
                { path: 'clasz', component: base_clasz },
                { path: 'addClasz', component: base_claszAdd, alias: '/base/clasz/add' },
                { path: 'editClasz', component: base_claszAdd, alias: '/base/clasz/edit' },
                { path: 'claszDetail', component: base_claszAdd, alias: '/base/clasz/detail' },
                // 教师管理
                { path: 'teacher', component: base_teacher },
                { path: 'addTeacher', component: base_teacherAdd, alias: '/base/teacher/add' },
                { path: 'editTeacher', component: base_teacherAdd, alias: '/base/teacher/edit' },
                { path: 'teacherDetail', component: base_teacherAdd, alias: '/base/teacher/detail' },
                // 学生管理
                { path: 'student', component: base_student },
                { path: 'addStudent', component: base_studentAdd, alias: '/base/student/add' },
                { path: 'editStudent', component: base_studentAdd, alias: '/base/student/edit' },
                { path: 'studentDetail', component: base_studentAdd, alias: '/base/student/detail' },
                // 平台管理员
                { path: 'admin', component: base_admin },
                { path: 'addAdmin', component: base_adminAdd, alias: '/base/admin/add' },
                { path: 'editAdmin', component: base_adminAdd, alias: '/base/admin/edit' },
                // 机构管理员
                { path: 'eduer', component: base_eduer },
                { path: 'addEduer', component: base_eduerAdd, alias: '/base/eduer/add' },
                { path: 'editEduer', component: base_eduerAdd, alias: '/base/eduer/edit' },
                { path: 'eduerDetail', component: base_eduerAdd, alias: '/base/eduer/detail' },
                // 学校管理员
                { path: 'schooler', component: base_schooler },
                { path: 'addSchooler', component: base_schoolerAdd, alias: '/base/schooler/add' },
                { path: 'editSchooler', component: base_schoolerAdd, alias: '/base/schooler/edit' },
                { path: 'schoolerDetail', component: base_schoolerAdd, alias: '/base/schooler/detail' },
                // 其他用户
                {
                    path: 'users',
                    component: space_view,
                    redirect: '/base/users/enterprise',
                    children: [
                        { path: 'enterprise', component: base_enterprise },
                        { path: 'investor', component: base_investor },
                        { path: 'investOrg', component: base_investorg },
                        { path: 'mult', component: base_mult }
                    ]
                },
                { path: 'addEnterprise', component: base_enterpriseAdd, alias: '/base/users/enterprise/add' },
                { path: 'editEnterprise', component: base_enterpriseAdd, alias: '/base/users/enterprise/edit' },
                { path: 'enterpriseDetail', component: base_enterpriseAdd, alias: '/base/users/enterprise/detail' },
                { path: 'addMult', component: base_multAdd, alias: '/base/users/mult/add' },
                { path: 'editMult', component: base_multAdd, alias: '/base/users/mult/edit' },
                { path: 'multDetail', component: base_multAdd, alias: '/base/users/mult/detail' },
                { path: 'addInvestor', component: base_investorAdd, alias: '/base/users/investor/add' },
                { path: 'editInvestor', component: base_investorAdd, alias: '/base/users/investor/edit' },
                { path: 'investorDetail', component: base_investorAdd, alias: '/base/users/investor/detail' },
                { path: 'addInvestorg', component: base_investorgAdd, alias: '/base/users/investOrg/add' },
                { path: 'editInvestorg', component: base_investorgAdd, alias: '/base/users/investOrg/edit' },
                { path: 'investorgDetail', component: base_investorgAdd, alias: '/base/users/investOrg/detail' },
                // 兴趣组管理
                {
                    path: 'interest',
                    component: space_view,
                    redirect: '/base/interest/audited',
                    children: [
                        { path: 'pending', component: base_interestPending },
                        { path: 'audited', component: base_interestAudited }
                    ]
                },
                { path: 'addInterest', component: base_interestAdd, alias: '/base/interest/add' },
                { path: 'editInterest', component: base_interestAdd, alias: '/base/interest/edit' },
                { path: 'interestDetail', component: base_interestDetail, alias: '/base/interest/detail' },
                // 工作室管理
                {
                    path: 'studio',
                    component: space_view,
                    redirect: '/base/studio/audited',
                    children: [
                        { path: 'pending', component: base_studioPending },
                        { path: 'audited', component: base_studioAudited },
                    ]
                },
                { path: 'stodioDetail', component: base_studioDetail, alias: '/base/studio/detail' },
                // 开通学校/教育局
                { path: 'enroll', component: base_enroll },
                { path: 'enrollDetail', component: base_enrollDetail, alias: '/base/enroll/detail' },
                // 平台空间管理
                { path: 'platform', component: base_platformSpace },
                // 示范校管理
                { path: 'model', component: base_modelSchool },
                // 转校审核
                { path: 'transfer', component: base_transferSchool }
            ]
        },
        // 系统管理
        {
            path: '/system',
            name: 'system',
            component: backStageIndex,
            redirect: '/system/banner',
            children: [
                // Banner管理
                { path: 'banner', component: system_banner },
                // 角色管理
                { path: 'role', component: system_role },
                { path: 'tag', component: systemTag },
                { path: 'addtag', component: systemAddTag, alias: '/system/tag/add' },
                { path: 'adittag', component: systemAddTag, alias: '/system/tag/edit' },
                { path: 'term', component: systemTerm },
                // 评论管理
                { path: 'comment', component: systemComment },
                // 举报管理
                { path: 'report', component: systemReport },
                //反馈管理
                { path: 'feedback', component: systemFeedback }
            ]
        },
        // 配置管理
        {
            path: '/configure',
            name: 'configure',
            component: backStageIndex,
            redirect: '/configure/menu',
            children: [
                // 安全管理
                { path: 'security', component: configure_security },
                // 导航管理
                { path: 'nav', component: configure_nav },
                // 菜单管理
                { path: 'menu', component: configure_menu },
                // 审核配置
                { path: 'audit', component: configure_audit },
                // 分类管理
                { path: 'classify', component: configure_classify },
                // 数据字典
                { path: 'datadict', component: configure_datadict },
                // 网上实训室
                { path: 'train', component: configure_train },
                { path: 'doc', component: configure_doc },
                // 招聘信息
                { path: 'recruit', component: configure_recruit },
                { path: 'addRecruit', component: configure_recruitAdd, alias: '/configure/recruit/add' },
                { path: 'editRecruit', component: configure_recruitAdd, alias: '/configure/recruit/edit' },
                { path: 'recruitDetail', component: configure_recruitAdd, alias: '/configure/recruit/detail' },
                { path: 'help', component: configure_faq },
                // 培训分类
                { path: 'trainClassify', component: configure_trainClassify },
                // 培训学段
                { path: 'trainPeriod', component: configure_trainPeriod },
                // 培训学科
                { path: 'trainSubject', component: configure_trainSubject }
            ]
        },

        // 综合素质
        {
            path: '/cqe',
            name: 'cqe',
            component: backStageIndex,
            redirect: '/cqe/quota',
            children: [
                {
                    path: 'quota',
                    component: evaluationQuota,
                    redirect: '/cqe/quota/lv1',
                    children: [
                        { path: 'lv1', component: evaluationQuotaLv1 },
                        { path: 'lv2', component: evaluationQuotaLv2 }
                    ]
                },
                { path: 'tmpl', component: evaluationTmpl },
                { path: 'addtmpl', component: evaluationTmplAdd, alias: '/cqe/tmpl/add' },
                { path: 'tmpldetail', component: evaluationTmplAdd, alias: '/cqe/tmpl/detail' },
                { path: 'edit', component: evaluationTmplAdd, alias: '/cqe/tmpl/edit' },
                { path: 'record', component: evaluationRecord },
                { path: 'recorddetail', component: adminEvaluation, alias: '/cqe/record/detail' },
            ]
        },
        // 统计管理
        {
            path: '/statis',
            name: 'statistics',
            component: backStageIndex,
            redirect: '/statis/survey',
            children: [
                // 统计概况
                { path: 'survey', component: statis_module },
                // 作品统计
                { path: 'works', component: statis_module },
                // 项目统计
                { path: 'project', component: statis_module },
                // 课程统计
                { path: 'course', component: statis_module },
                // 活动统计
                { path: 'activity', component: statis_module },
                // 学习统计
                { path: 'study', component: statis_module },
                // 实践统计
                { path: 'practice', component: statis_module },
                // 资源统计
                { path: 'resource', component: statis_module },
                // 兴趣组统计
                { path: 'interest', component: statis_module },
                // 评价统计
                { path: 'evaluate', component: statis_module },
                // 课题统计
                { path: 'subject', component: statis_module }
            ]
        },
        // 示范校
        {
            path: '/ms',
            component: backStageIndex,
            redirect: '/ms/intro',
            children: [
                { path: 'intro', component: modelSchoolIntro },
                { path: 'achv', component: modelSchoolAchv },
                { path: 'feature', component: modelSchoolFeature },
                { path: 'honor', component: modelSchoolHonor },
                { path: 'affair', component: modelSchoolEvent },
                { path: 'bg', component: modelSchoolBg },
            ]
        },
        // 赛事系统
        {
            path: '/contest-:type',
            name: 'contest',
            component: backStageIndex,
            redirect: '/contest/match',
            children: [
                // 竞赛管理
                { path: 'match', component: contest_manage },
                { path: 'match/add', component: contest_manageAdd },
                { path: 'match/edit', component: contest_manageAdd },
                { path: 'match/detail', component: contest_manageAdd },
                // 竞赛项目
                { path: 'event', component: contest_event },
                { path: 'event/add', component: contest_eventAdd },
                { path: 'event/edit', component: contest_eventAdd },
                { path: 'event/detail', component: contest_eventAdd },
                // 专家管理
                { path: 'expert', component: contest_expert },
                { path: 'expert/add', component: contest_expertAdd },
                { path: 'expert/edit', component: contest_expertAdd },
                { path: 'expert/detail', component: contest_expertAdd },
                // 申报组别
                { path: 'group', component: contest_group },
                { path: 'group/add', component: contest_groupAdd },
                { path: 'group/edit', component: contest_groupAdd },
                { path: 'group/detail', component: contest_groupAdd },
            ]
        }
    ]
})
