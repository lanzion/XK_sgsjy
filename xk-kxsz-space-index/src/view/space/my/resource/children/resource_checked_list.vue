<template>
	<div id="resource_checked_list">
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
				</div>
				<div class="msg-box fl">
					<div class="collection-name clearfix">
						<router-link :title="item.name" :to="{path:'/admin/resource/details',query:{id:item.id}}" class="name fl">
							{{item.name | textOverflow(18)}}
						</router-link>
						<span class="evaluate fl">{{item.avgScore === null ? 0 : item.avgScore}}分</span>
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
						<span><i class="icon-i-browse" title="浏览"></i> {{item.browseNum === null ? 0 : item.browseNum}}</span>&nbsp;&nbsp;
						<span><i class="icon-btn-i-download" title="下载"></i> {{item.downNum === null ? 0 : item.downNum}}</span>
					</p>
				</div>
				<div class="option-box fr">
					<a title="下载" :href="downloadUrl(item.fileId, item.name, item.fileExt)" :download="item.name" @click="downloadAdd(item.id,index)"><i class="icon-btn-download vertical-align-top"></i></a>
					<share-btn :title="item.name" module="resource" :id="item.id" class="vertical-align-top"></share-btn>
					<del-popover title="删除" class="delete" :delData="{ url:'maker/resource/del', params:{id: item.id}, name:'资源' }" v-on:callback="getResourceList"></del-popover>
				</div>
			</li>
		</ul>
		<div class="empty-block" v-else>暂无数据</div>
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
	import { requestResourceList,delResource,submitResource,downloadAdd } from '@/service/resource.js'
	import { interceptVideo } from '@/mixin/intercept_video.js'

	export default {
		name: 'resource_checked_list',
		mixins: [interceptVideo],
		components: {
			'del-popover': delPopover,
			'multi-select': multiSelect,
			'single-select': singleSelect,
			'share-btn': shareBtn,
			'v-pagination': pagination,
		},
		data() {
			return {
				onlyShare: true,
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
			this.getResourceList()
		},
		mounted() {
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
	            handler: function (val, oldVal) {
	                this.getResourceList();
	            },
	            deep: true
	        }
		},
		methods: {
			// 获取资源列表
			getResourceList() {
				let data = {
					auditStatusTeaOrStu: 1,
					resourceType: this.selected.classification.join('-'),
					technology: this.selected.technology,
					name: this.selected.name
				};
				requestResourceList(data,this.pageParam).then((res) => {
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
      		/*
		     * 下载次数加1
		     */
		    downloadAdd(id,index) {
		      	downloadAdd({id:id}).then((res) => {
		        	if (res.data.code == 200) {
		          		this.datas[index].downNum ++;
		        	}
		      	})
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
	display: inline-block;
	vertical-align: top;
}
#resource_checked_list {
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
				.bg-img__wrap{
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
	#resource_checked_list{
		.el-dialog--small{
			width: 620px!important;
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
		.com-panel-group{
			.icon-button{
				vertical-align: top;
				display: inline-block;
				font-size: 18px;
				margin-left: 0px;
				i{
					vertical-align: top;
				}
			}
		}
	}
</style>