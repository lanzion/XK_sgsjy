<template>
	<div class="offline-detail">
		<component :is="typeArr[formType]" :detail="detail"></component>
	</div>
</template>

<script>
    import { requestOfflineWorkDetail } from '@/service/works.js'
    import detail1 from '@/components/works/detail_template1.vue'
    import detail2 from '@/components/works/detail_template2.vue'
    import detail3 from '@/components/works/detail_template3.vue'
    import detail4 from '@/components/works/detail_template4.vue'

    export default {
        name: 'offlineDetail',
        components: {
            'v-detail1': detail1,
            'v-detail2': detail2,
            'v-detail3': detail3,
            'v-detail4': detail4
        },
        data() {
            return {
                typeArr: {
                    111: 'v-detail1',
                    113: 'v-detail2',
                    112: 'v-detail3',
                    114: 'v-detail4'
                },
                formType: '111',
                detail: {
                    declareTemplate: {
                        institution: '',
                        address: '',
                        declareMemberTemplate: [],
                        declareTeacherTemplate: []
                    }
                }
            }
        },
        mounted() {
            this.getWorksDetail()
        },
        methods: {
            async getWorksDetail() {
                const res = await requestOfflineWorkDetail({ id: this.$route.query.worksId })
                if (res.data.code === 200) {
                    this.detail = res.data.entity
                    this.formType = this.detail.templateType
                    this.$emit('callback', this.detail.browseNum)
                }
            }
        }
    }
</script>