import { doRecommend, cancelRecommend } from '@/service/common.js'

export const recommend = {
	data() {
		return {
			type:{
				1: '学生',
				2: '教师',
				3: '班级',
				4: '年级',
				5: '学校',
				6: '教育局',
				7: '课程',
				8: '作品',
				9: '活动',
				10: '项目',
				11: '兴趣组',
				12: '课题',
				13: '资源',
				14: '网上实训室',
			}
		}
	},
	methods: {
		recommendOperate(item, params, recommendType = 1, isCancel = false ) {
			let handler,txt,recommend
			if(isCancel){
				handler = cancelRecommend
				txt = '取消'
				recommend = '0'
			}else{
				handler = doRecommend
				txt = ''
				recommend = '1'
			}
	        this.$confirm(`此操作将${txt}推荐该${this.type[recommendType]}, 是否继续?`, '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning',
	            customClass: '__custom-msg-box'
	        }).then(() => {
	            item.forEach(x => {
	                params.relationIds.push(x.id);
	            });
	            handler(params).then(response => {
	                if (response.data.code == 200) {
	                    this.$message({ message: `${txt}推荐成功`, type: 'success' });
	                    item.forEach(x => {
	                        x.recommend = recommend
	                    })
	                } else {
	                    this.$message.error(response.data.msg);
	                };
	                this.$refs.multipleTable.clearSelection();
	            })
	        }).catch(() => {});
		}
	}
}