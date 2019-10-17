<template>
	<div class="enroll-contest bgw">
		<section class="project-type">
			<label class="pt-label">项目类型</label>
			<div class="pt-radios">
				<el-radio-group v-model="projectId">
				    <el-radio v-for="(item, index) in projectList" :key="index" :label="item.projectId" v-if="item.projectId === projectId">{{item.projectName}}</el-radio>
				</el-radio-group>
			</div>
		</section>
		<component :is="formTypeArr[formType]" :formType="formType" :detail="detail" :projectId="projectId" :declareList="declareList"></component>
	</div>
</template>

<script>
    import enrollForm1 from '@/components/enroll_contest/enroll_form1.vue'
    import enrollForm2 from '@/components/enroll_contest/enroll_form2.vue'
    import enrollForm3 from '@/components/enroll_contest/enroll_form3.vue'
    import enrollForm4 from '@/components/enroll_contest/enroll_form4.vue'
    import { requestProjectRelation, requestDeclareRelation, requestOfflineEnrollDetail } from '@/service/matchEntrance.js'
    import { offlineIsApply } from '@/service/contest_detail.js'

    export default {
        name: 'enrollContest',
        components: {
            'enroll-form1': enrollForm1,
            'enroll-form2': enrollForm2,
            'enroll-form3': enrollForm3,
            'enroll-form4': enrollForm4
        },
        data() {
            return {
                projectList: [],
                declareList: [],
                // curIndex: null,
                formType: '0',
                projectId: this.$route.query.projectId,
                formTypeArr: {
                    0: 'enroll-form1',
                    111: 'enroll-form1', // 网络申报表
                    113: 'enroll-form2', // 社团申报表
                    112: 'enroll-form3', // 教师资源申报表
                    114: 'enroll-form4'  // 创客作品申报表
                },
                params: {
                    businessId: this.$route.query.id
                },
                userType: this.$ls.get('userIdentity') === 'teacher' ? '1' : '0',
                detail: {},
                isApply: null
            }
        },
        mounted() {
            this.getProjectRelation()
            this.getDeclareList()
        },
        watch: {
            '$route.query.projectId': {
                handler: function () {
                    this.projectId = this.$route.query.projectId
                    this.detail = {}
                    const _idx = this.projectList.findIndex(x => x.projectId === this.projectId)
                    this.formType = this.projectList[_idx].formType
                    this.checkApply()
                },
                deep: true
            }
        },
        methods: {
            checkApply() {
                offlineIsApply({ matchId: this.$route.query.id, projectId: this.$route.query.projectId }).then((res) => {
                    if (res.data.code === 200 && res.data.appendInfo.isApply === 1) {
                        this.isApply = res.data.appendInfo.isApply
                        this.getWorksDetail()
                    }
                })
            },
            // // 改变项目类型
            changeProject(val) {
                const curProject = this.projectList[val]
                this.formType = curProject.formType
                this.projectId = curProject.projectId
            },
            async getProjectRelation() {
                const res = await requestProjectRelation(this.params)
                if (res.data.code === 200) {
                    this.projectList = res.data.entity || []
                    const _idx = this.projectList.findIndex(x => x.projectId === this.projectId)
                    this.formType = this.projectList[_idx].formType
                    this.checkApply()
                }
            },
            async getDeclareList() {
                const res = await requestDeclareRelation(this.params)
                if (res.data.code === 200) {
                    this.declareList = res.data.entity || []
                }
            },
            async getWorksDetail() {
                const res = await requestOfflineEnrollDetail({ matchId: this.$route.query.id, projectId: this.$route.query.projectId })
                if (res.data.code === 200) {
                    this.detail = Object.assign({}, res.data.entity)
                    // this.formType = res.data.entity.templateType
                    // const _idx = this.projectList.findIndex(x => x.projectId === this.detail.projectId)
                    // this.curIndex = _idx
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	.enroll-contest {
		padding: 15px;
		.project-type {
			margin-bottom: 22px;
			.pt-label {
				width: 120px;
				box-sizing: border-box;
				float: left;
				font-size: 14px;
				color: #000;
				text-align: right;
				padding-right: 12px;
                &:before {
                    content: '*';
                    color: #ff4949;
                    margin-right: 4px;
                }
			}
			.pt-radios {
				margin-left: 120px;
			}
		}
	}
</style>