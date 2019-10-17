<template>
    <div class="statistics">
        <component :is="module && component[module][orgInfo.userIdentity]" :orgInfo="orgInfo"></component>
    </div>
</template>

<script>
    import { loginInfo, baseInfo, userIdentity } from 'Asset/js/getUserInfo.js'

    import overviewSchool from './overview/overview_school.vue'
    import overviewEducation from './overview/overview_edu.vue'

    import worksSchool from './works/works_school.vue'
    import worksEducation from './works/works_edu.vue'

    import projectSchool from './project/project_school.vue'
    import projectEducation from './project/project_edu.vue'

    import courseSchool from './course/course_school.vue'
    import courseEducation from './course/course_edu.vue'

    import activitySchool from './activity/activity_school.vue'
    import activityEducation from './activity/activity_edu.vue'

    import studySchool from './study/study_school.vue'
    import studyEducation from './study/study_edu.vue'

    import practiceSchool from './practice/practice_school.vue'
    import practiceEducation from './practice/practice_edu.vue'

    import resourceSchool from './resource/resource_school.vue'
    import resourceEducation from './resource/resource_edu.vue'

    import interestSchool from './interest/interest_school.vue'
    import interestEducation from './interest/interest_edu.vue'

    import evaluateSchool from './evaluate/evaluate_school.vue'
    import evaluateEducation from './evaluate/evaluate_edu.vue'

    import subjectSchool from './subject/subject_school.vue'
    import subjectEducation from './subject/subject_edu.vue'

    export default {
        name: 'statisticsModule',
        components: {
            'v-overview-school': overviewSchool,
            'v-overview-education': overviewEducation,
            'v-works-school': worksSchool,
            'v-works-education': worksEducation,
            'v-project-school': projectSchool,
            'v-project-education': projectEducation,
            'v-course-school': courseSchool,
            'v-course-education': courseEducation,
            'v-activity-school': activitySchool,
            'v-activity-education': activityEducation,
            'v-study-school': studySchool,
            'v-study-education': studyEducation,
            'v-practice-school': practiceSchool,
            'v-practice-education': practiceEducation,
            'v-resource-school': resourceSchool,
            'v-resource-education': resourceEducation,
            'v-interest-school': interestSchool,
            'v-interest-education': interestEducation,
            'v-evaluate-school': evaluateSchool,
            'v-evaluate-education': evaluateEducation,
            'v-subject-school': subjectSchool,
            'v-subject-education': subjectEducation
        },
        data () {
            return {
                component: {
                    survey: {
                        admin: 'v-overview-education',
                        education: 'v-overview-education',
                        school: 'v-overview-school'
                    },
                    works: {
                        admin: 'v-works-education',
                        education: 'v-works-education',
                        school: 'v-works-school'
                    },
                    project: {
                        admin: 'v-project-education',
                        education: 'v-project-education',
                        school: 'v-project-school'
                    },
                    course: {
                        admin: 'v-course-education',
                        education: 'v-course-education',
                        school: 'v-course-school'
                    },
                    activity: {
                        admin: 'v-activity-education',
                        education: 'v-activity-education',
                        school: 'v-activity-school'
                    },
                    study: {
                        admin: 'v-study-education',
                        education: 'v-study-education',
                        school: 'v-study-school'
                    },
                    practice: {
                        admin: 'v-practice-education',
                        education: 'v-practice-education',
                        school: 'v-practice-school'
                    },
                    resource: {
                        admin: 'v-resource-education',
                        education: 'v-resource-education',
                        school: 'v-resource-school'
                    },
                    interest: {
                        admin: 'v-interest-education',
                        education: 'v-interest-education',
                        school: 'v-interest-school'
                    },
                    evaluate: {
                        admin: 'v-evaluate-education',
                        education: 'v-evaluate-education',
                        school: 'v-evaluate-school'
                    },
                    subject: {
                        admin: 'v-subject-education',
                        education: 'v-subject-education',
                        school: 'v-subject-school'
                    }
                },
                module: 'survey',
                orgInfo: {
                    userIdentity: userIdentity
                }
            }
        },
        created () {
            this.setModule()
            let _orgInfo = {}
            _orgInfo.identity = loginInfo.userInfo.identity
            _orgInfo.orgId = baseInfo ? baseInfo[userIdentity].id : loginInfo.userInfo.account
            _orgInfo.userIdentity = userIdentity

            this.orgInfo = _orgInfo
        },
        watch: {
            '$route': 'setModule'
        },
        methods: {
            setModule() {
                let _defaultActive = this.$route.path.split('/')
                this.module = _defaultActive[_defaultActive.length - 1]
                this.$set(this.orgInfo, 'orgId', baseInfo ? baseInfo[userIdentity].id : loginInfo.userInfo.account)
            }
        }
    }
</script>
