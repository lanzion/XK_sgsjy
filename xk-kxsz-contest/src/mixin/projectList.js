import { requestMatchProjectList, requestOfflineProjectList } from '@/service/manage.js'

export const projectList =  {
	data() {
		return {
			projectOptions: [], // 分类数据
		}
	},
	mounted() {
		this.getProjectList()
	},
	methods: {
		// 请求分类选项数据
        getProjectList() {
            const isOffline = Number(this.$route.query.type) === 2
            const handler = isOffline ? requestOfflineProjectList : requestMatchProjectList
            const params = isOffline ? { businessId: this.$route.query.id } : { id: this.$route.query.id }
            handler(params).then((res) => {
                if (res.data.code === 200) {
                    this.projectOptions = res.data.entity
                }
            })
        },
	}
}