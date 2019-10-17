<template>
	<div id="collection_list" class="bgw">
		<ul class="list" v-if="resourceData.length">
			<li v-for="(item,index) in resourceData" :key="index" class="collection-item table-layout clearfix">
				<div class="img-box table-cell">
					<div v-if="Number(item.fileType) == 4" class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.fileId) || listDefault})` }"></div>
					<!-- <img v-if="Number(item.fileType) == 4" :src="getFileUrl(item.fileId) || listDefault"> -->
					<i v-else :class="{'icon-file-text': item.fileType == 1, 'icon-file-video': item.fileType == 2, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
				</div>
				<div class="msg-box table-cell">
					<router-link :to="{path:linkTo,query:{id: item.id}}" :title="item.name">
						<h6 class="collection-name">{{item.name | textOverflow(30)}}</h6>
					</router-link>
					<p class="collection-content">{{item.introduction | textOverflow(95)}}</p>
					<div class="info-box clearfix mb20">
						<p class="w243 fl">
							<i class="icon-input-user"></i>上传人：{{item.userName}}
						</p>
						<p class=" w243 fl">
							<i class="icon-btn-browse"></i>浏览：<span style="color:#00a0e9;">{{item.browseNum || 0}}</span>人
						</p>
						<p class=" w243 fl">
							<i class="icon-btn-download"></i>下载数：<span style="color:#00a0e9;">{{item.downNum || 0}}</span>次
						</p>
					</div>
					<div class="info-box clearfix">
						<p class="w243 fl">
							<i class="icon-file-empty"></i>文件大小：{{item.fileSize ? (item.fileSize / 1024).toFixed(1) : 0}}kb
						</p>
						<p class=" w243 fl">
							<i class="icon-i-time"></i>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}
						</p>
					</div>
				</div>
				<div class="option-box table-cell">
					<div class="evaluate option">{{item.avgScore === null ? 0 : item.avgScore}}分</div>
					<div class="option">
						<router-link :to="{path:linkTo,query:{id: item.id}}" :data-id="item.id">
							<button class="preview">预览</button>
						</router-link>
					</div>
					<div class="option" v-if="$ls.get('loginInfo')">
						<a class="dl-btn" :href="downloadUrl(item.fileId, item.name)" :download="item.name" @click="downloadAdd(item.id,index)">下载</a>
					</div>
				</div>
			</li>
		</ul>
		<div class="empty-block" v-else>暂无数据</div>
	</div>
</template>

<script>
	import { downloadAdd } from '@/service/resource.js'
	export default {
		name: 'collectionList',
		components: {
		},
		data () {
			return {
			}
		},
		props: ['resourceData','linkTo'],
		created() {
		},
		methods: {
			/*
		     * 下载次数加1
		     */
		    downloadAdd(id,index){
		      	downloadAdd({id:id}).then((res) => {
		        	if(res.data.code == 200){
		          		this.resourceData[index].downNum ++;
		        	}
		      	})
		    }
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
@import '~@/asset/scss/cols.scss';
*{
	box-sizing: border-box;
}
.mb20{
	margin-bottom: 20px;
}
.w243{
	width: 243px;
}
#collection_list {
	width: 100%;
	overflow: hidden;
	.list {
		width: 100%;
		overflow: hidden;
		.collection-item {
			width: 100%;
			padding: 20px 15px;
			font-weight: lighter;
			border-bottom: 1px solid #c9c9c9;
			a{
				display: inline-block;
			}
			//资源图片
			.img-box {
				$img-prev-height: 180px;
				width: 265px;
				height: $img-prev-height;
				background-color: #e7edf2;
				text-align: center;
				.bg-img__wrap,
				img {
					width: 265px;
					height: 180px;
				}

				[class*="icon-file-"],
				[class*=" icon-file-"] {
					line-height: $img-prev-height;
				    font-size: 80px;
				    color: #b3b3b3;
				}
			}
			//资源信息
			.msg-box {
				font-size: 14px;
				padding: 0 20px;
				padding-right: 40px;
				.collection-name{
					font-size: 22px;
					margin-bottom: 22px;
					color: #333;
					font-weight: lighter;
					&:hover{
						color: $default-color;
					}
				}
				.collection-content {
					font-size: 16px;
					height: 40px;
					margin-bottom: 20px;
					line-height: 20px;
					overflow : hidden;
					color: #333;
					word-break: break-word;
				}
				.info-box{
					color: #626262;
					i{
						margin-right: 10px;
					}
				}
			}
			// 预览、下载
			.option-box{
				$option-width: 96px;
				width: $option-width;
				padding-right: 20px;
				.option{
					width: $option-width;
					height: 32px;
					line-height: 32px;
					text-align: center;
					margin-bottom: 20px;
					border-radius: 3px;
					a{
						width: 100%;
						height: 100%;
						font-size: 14px;
						.preview{
							width: 100%;
							height: 100%;
							border: 1px solid $default-color;
							border-radius: 3px;
							color: $default-color;
							&:hover{
								background-color: $default-color;
								color: #fff !important;
							}
						}
					}
					.dl-btn{
						display: inline-block;
						width: 100%;
						height: 100%;
						border-radius: 3px;
						background-color: $default-color;
						color: #fff;
					}
					.dl-btn:hover{
						opacity: 0.75;
					}
				}
				.evaluate{
					font-size: 16px;
					height: 16px;
					line-height: 1;
					color: #fd8c88;
					margin-bottom: 10px;
				}
			}
		}
	}
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #collection_list {
            .list {
            	.collection-item {
            		.msg-box {
            			.collection-name {
            				&:hover {
            					color: $color-value;
            				}
            			}
            		}
            		.option-box {
            			.option {
            				a {
            					.preview {
            						border-color: $color-value;
            						color: $color-value;
									&:hover{
										background-color: $color-value;
									}
            					}
            				}
            				.dl-btn {
            					background-color: $color-value;
            				}
            			}
            		}
            	}
            }
        }
    }
}
</style>
<style lang="scss">
	#collection_list{
		.el-pagination{
			text-align: right;
			margin-top: 20px;
		}
	}
</style>