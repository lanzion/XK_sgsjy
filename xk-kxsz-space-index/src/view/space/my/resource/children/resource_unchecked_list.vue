<template>
	<div id="resource_unchecked_list">
		<div class="select-box">
			<multi-select style="width:172px;display:inline-block;margin-right: 10px;" :clearable="true" :selectData.sync="selected.classification" :ifAll='true' :model='"resource"'></multi-select>
			<single-select :singleSelectData="singleSelectData" :clearable="true" @callback="filterTechnology"></single-select>
		</div>
		<ul class="list" v-if="datas.length > 0">
			<li v-for="(item,index) in datas" class="clearfix">
				<div class="img-box fl">
					<!-- <img v-if="Number(item.fileType) == 4" :src="getFileUrl(item.fileId) || listDefault" /> -->
					<div v-if="Number(item.fileType) == 4" class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.fileId) || listDefault})` }"></div>
					<div class="video-cover" v-else-if="item.fileType == 2">
                        <video :id="item.id" :src="getFileUrl(item.fileId, {filetype: 'video'})" x-webkit-airplay="allow" preload="auto" style="display: none"></video>
                        {{captureImage(item.id, index, 'datas')}}
                        <img :src="item.cover || listDefault">
                    </div>
					<i v-else :class="{'icon-file-text': item.fileType == 1, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
					<div class="status-label">
						<p class="submit" v-if="item.auditStatus == -1">待提交</p>
						<p class="pending" v-if="item.auditStatus == 0">待审核</p>
						<p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
						<p class="audit" v-if="item.auditStatus == 3">审核中</p>
					</div>
				</div>
				<div class="msg-box fl">
					<div class="collection-name clearfix">
						<router-link v-if="[0, 3].includes(item.auditStatus)" :title="item.name" :to="{path:'preview',query:{id:item.id}}" class="name fl">
							{{item.name | textOverflow(18)}}
						</router-link>
						<router-link v-if="[-1, 2].includes(item.auditStatus)" :title="item.name" :to="{path:'upload',query:{id:item.id}}" class="name fl">
							{{item.name | textOverflow(18)}}
						</router-link>
					</div>
					<p class="collection-content">{{item.introduction | textOverflow(70)}}</p>
					<div class="people clearfix mb10">
						<p class="creater fl">
							分类：<span>{{item.resourceTypeName}}</span> | 技术：<span>{{item.technologyName}}</span> | 上传人：<span>{{item.userName}}</span>
						</p>
					</div>
					<p class="collection_msg">
						<span>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>&nbsp;&nbsp;
						<span> | &nbsp;&nbsp;大小：{{item.fileSize ? (item.fileSize / 1024).toFixed(1) : 0}}kb</span>&nbsp;&nbsp;
						<span><i class="icon-btn-i-download" title="下载"></i> {{item.downNum === null ? 0 : item.downNum}}</span>
					</p>
				</div>
				<div class="option-box fr">
					<v-operate @on-delete="deleteResource(item.id)" @on-edit="editResource(item.id)" @on-submit="submit(item.id,index)"
               		 :icon-group="generateIconGroup(item.auditStatus)" label="资源"></v-operate>
				</div>
				<button @click="showRecordDialog(item.id)" class="btn-verify-record pa">审核记录</button>
			</li>
		</ul>
		<div class="empty-block" v-else>暂无数据</div>
		<verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'resourceId'}" />
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</div>
</template>

<script>
	import multiSelect from 'Common/select/multi_select.vue'
	import singleSelect from 'Common/select/single_select.vue'
	import shareBtn from 'Common/button/share_btn.vue'
	import delPopover from 'Common/del_popover.vue'
	import pagination from 'Common/pagination.vue'
    import dataTranslation from '@/js/dataTranslation.js'
    import operate from 'components/common/operate.vue'
    import verifyRecordDialog from 'components/my/verify_record_dialog.vue'
	import { requestResourceList,delResource,submitResource,downloadAdd } from '@/service/resource.js'
	import { interceptVideo } from '@/mixin/intercept_video.js'

	export default {
		name: 'resource_unchecked_list',
		mixins: [interceptVideo],
		components: {
			'del-popover': delPopover,
			'multi-select': multiSelect,
			'single-select': singleSelect,
			'share-btn': shareBtn,
			'v-pagination': pagination,
			'v-operate': operate,
			verifyRecordDialog
		},
		data () {
			return {
				api: '/maker/resource/audit/selectList',
	            dialog: {isVisible: false},
	            curRecordId: '', // 当前审核记录ID
				delData: {
					name:'资源',
					dataUrl: 'maker/resource/del'
				},
				datas: [],
				param: {
					totalNum: 0,
					pageSize: 5,
					pageNum: 1
				},
				pageParam: {
					pageSize: 5,
					pageNum: 1
				},
				selected: {
					classification: [],
					technology: '',
					name: ''
				},
				singleSelectData: {
					groupCode: 'technicalClassification',
					ifAll: true,
					name: '技术',
					placeholder: '选择技术'
				}
			}
		},
		props: {
			search: {
				type: String,
				default: ''
			}
		},
		created() {
		},
		mounted() {
			this.getResourceList()
		},
		computed: {
			params: function(){
				return Object.assign( {}, this.selected )
			}
		},
		watch: {
			search(val) {
				this.selected.name = val
			},
			params: {
	            handler: function(val, oldVal) {
	                this.getResourceList();
	            },
	            deep: true
	        }
		},
		methods: {
			showRecordDialog (id) { // 显示审核记录弹窗
	            this.curRecordId = id
	            this.dialog.isVisible = true
	        },
			// 获取资源列表
			getResourceList() {
				let data = {
					auditStatusTeaOrStu: 0,
					resourceType: this.selected.classification.join('-'),
					technology: this.selected.technology,
					name: this.selected.name
				};
				requestResourceList(data, this.pageParam).then((res) => {
					if (res.data.code == 200) {
						this.param.totalNum = res.data.entity.totalNum;
						this.$emit('totalNum',res.data.entity.totalNum);
						this.datas = res.data.entity.resultData;
						this.datas.forEach(item => {
                            // 技术转译
                            dataTranslation(item.technology, 'technicalClassification', { key: 'id' }).then(res => {
                                item.technologyName = res;
                            })
						})
					}
				})
			},
			// 切换页数
			changePage(val) {
				this.pageParam.pageNum = val;
				this.getResourceList()
			},
			//筛选技术
			filterTechnology(val) {
				this.selected.technology = val === '0' ? '' : val
			},
			//待审列表操作按钮
			generateIconGroup (status) {
		        const edit = status === -1 || status === 2 ? 'edit' : '';
		        const submit = status === -1 || status === 2 ? 'submit' : '';
				const del = status === -1 || status === 2 ? 'delete' : '';
		        return [ edit, submit, del];
      		},
      		//删除活动
      		deleteResource(id) {
      			delResource({id:id}).then((res) => {
      				if(res.data.code == 200){
      					this.showMessage('success','已删除');
      					this.getResourceList()
      				}else{
      					this.showMessage('error',res.data.msg);
      				}
      			})
      		},
      		//提交审核
      		submit(id,index) {
      			this.$confirm('此操作将该资源提交审核, 是否继续?', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass: '__custom-msg-box'
		        }).then(() => {
		          	submitResource({ id: id }).then((res) => {
	      				if (res.data.code === 200) {
	      					this.showMessage('success', '成功提交审核');
	      					this.datas[index].auditStatus = 0
	      				} else {
	      					this.showMessage('error', res.data.msg)
	      				}
	      			})
		        }).catch(() => {
		          this.showMessage('info', '已取消提交')
		        });
      		},
      		//编辑活动
      		editResource(id) {
      			this.$router.push({ path: '/admin/resource/upload', query: { id: id } })
      		}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
*{
	box-sizing: border-box;
}
.mb10{
	margin-bottom: 10px;
}
.vertical-align-top{
	vertical-align: top;
}
#resource_unchecked_list {
	padding:0 18px 20px;
	.list {
		li {
			width: 100%;
			height: 212px;
			padding: 20px 0;
			border-bottom: 1px dashed #ccc;
			position: relative;
			a{
				display: inline-block;
			}
			// 活动图片
			.img-box {
				$img-prev-height: 170px;
				position: relative;
				width: 265px;
				height: $img-prev-height;
				background-color: #e7edf2;
				text-align: center;
				img,
				.bg-img__wrap {
					width: 100%;
					height: 100%;
				}
				[class*="icon-file-"],
				[class*=" icon-file-"] {
					line-height: $img-prev-height;
				    font-size: 80px;
				    color: #b3b3b3;
				}
			}
			// 活动信息
			.msg-box {
				width: 530px;
				overflow: hidden;
				font-size: 14px;
				padding-left: 20px;
				padding-top: 15px;
				.collection-name{
					margin-bottom: 17px;
					height: 22px;
					line-height: 22px;
					.name{
						font-size: 22px;
					}
					.evaluate{
						font-size: 16px;
						color: #fd8c88;
						margin-left: 50px;
					}
				}
				.collection-name:hover{
					.name{
						color: $default-color;
					}
				}
				.collection-content {
					font-size: 14px;
					margin-bottom: 24px;
					line-height: 20px;
					min-height: 40px;
				}
				.collection_msg{
					color: #999;
				}
			}
			// 下载编辑分享删除
			.option-box{
				position:absolute;
				top: 34px;
				right: 0;
				width: 100px;
				padding-right: 10px;
				a{
					font-size: 18px;
					margin: 0px 5px;
					cursor: pointer;
				}
				i:hover{
					color: $default-color;
				}
			}
		}
	}
}

</style>
<style lang="scss">
	#resource_unchecked_list{
		.el-dialog--small{
			width: 1080px!important;
		}
		.el-pagination{
			text-align: right;
			margin-top: 20px;
		}
		#delPopover{
			.delete-btn{
				font-size: 18px;
			}
		}
	}
</style>