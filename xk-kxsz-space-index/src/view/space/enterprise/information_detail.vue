<template>
	<div id="information_detail" class="container">
		<!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: backPath, query: {id:$route.query.id} }" >{{title}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{detail.createName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 内容部分 -->
        <div class="content-box clearfix">
        	<section class="content-l bgw fl">
        		<div class="title-wrapper pr">
		          	<h3 class="title ellipsis">{{detail.title || '暂无标题'}}</h3>
		          	<div class="info clearfix">
			            <div class="info-left fl">
			              	<figure class="avatar">
			                	<img :src="getFileUrl(detail.cover) || faceDefault" class="pic" width="40" height="40">
			              	</figure>
			              	<span>{{detail.createName || '暂无'}}</span>
			              	<span class="date">{{detail.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
			            </div>
			            <p class="fr">
			              	<span> <i class="icon-btn-browse"></i>浏览：<em class="blue">{{detail.browseNum || 0}}</em>人</span>
			            </p>
		          	</div>
		        </div>
		        <div v-html="detail.content || '暂无内容'" class="detail-main"></div>
        	</section>
        	<aside class="content-r bgw fr">
        		<h2 class="title">其他资讯</h2>
                <ul class="information_ul" v-if="information.length">
                    <li class="information_li p15 clearfix" v-for="(i, k) in information">
                        <img :src="getFileUrl(i.cover) || listDefault" class="img fl" @click="changeInfo(i.id)">
                        <div class="content">
                            <p @click="changeInfo(i.id)"> {{ i.content | handleWorksDesc(15) }} </p>
                            <time class="time"> {{ i.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </time>
                        </div>
                    </li>
                </ul>
                <div class="empty-block" v-else style="line-height: 36;">暂无资讯</div>
        	</aside>
        </div>
	</div>
</template>

<script>
	import { requestInformationList,requestInformationDetail } from '@/service/space_enterprise.js'
	export default {
		name:'information_detail',
		components:{},
		data () {
			return {
				backPath:'',
				title:'',
				detail:{},
				information:[],
				infoDetailPath:''       //跳转资讯详情页路劲
			}
		},
		created(){
			const path = this.$route.path.split('/')[1];
			switch(path){
				case 'enterprise':
					this.title = '企业';
					this.backPath = '/enterprise/detail';
					this.infoDetailPath = '/enterprise/infoDetail';
					break;
				case 'investor':
					this.title = '投资人';
					this.backPath = '/investor/detail';
					this.infoDetailPath = '/investor/infoDetail';
					break;
				case 'investOrg':
					this.title = '投资机构';
					this.backPath = '/investOrg/detail';
					this.infoDetailPath = '/investOrg/infoDetail';
					break;
				case 'multSpace':
					this.title = '创客空间';
					this.backPath = '/multSpace/detail';
					this.infoDetailPath = '/multSpace/infoDetail';
					break;
			}
		},
		mounted(){
			this.getDetail();
			this.getOtherInfoList();
		},
		watch:{
			'$route.query.infoId' () {
				this.getDetail();
				this.getOtherInfoList();
			}
		},
		filters: {
	        handleWorksDesc (txt = '', len = 50, sep = '...') {
	            let reg = new RegExp('(.{' + len + '}).+')
	            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
	        }
	    },
		methods:{
			// 获取资讯详情
			async getDetail(){
				const id = this.$route.query.infoId;
				const res = await requestInformationDetail({id:id});
				if(res.data.code === 200){
					this.detail = res.data.entity;
				}
			},
			// 获取其他资讯列表
			async getOtherInfoList(){
				const informationId = this.$route.query.infoId,orgId = this.$route.query.id;
				const res = await requestInformationList({informationId:informationId,orgId:orgId,pageNum: 1, pageSize: 5});
				if (res.data.code === 200){
					this.information = res.data.entity.resultData
				}
			},
			// 点击其他资讯查看详情,改变路由参数
			changeInfo(id){
				this.$router.push({path:this.infoDetailPath,query:{id:this.$route.query.id,infoId:id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
$theme-color: #d00;
	.p15 {
	    padding: 15px;
	    box-sizing: border-box;
	}
	.content-l{
		box-sizing: border-box;
		width: 906px;
		padding: 25px 15px;
		.title {
	      	max-width: 600px;
	      	height: 33px;
	      	line-height: 1.5;
	      	font-size: 22px;
	      	color: #333;
	    }
	    .info {
	      	line-height: 40px;
	      	margin-top: 12px;
	    }
	    .info-left {
	      	font-size: 12px;
	      	color: #999;
	      	.avatar {
	        	display: inline-block;
	        	width: 40px;
	        	height: 40px;
	        	margin-right: 4px;
	        	vertical-align: middle;
	        	.pic {
	         		border-radius: 50%;
	        	}
	      	}
	      	.date {
	       	 margin-left: 10px;
	      	}
	    }
	    .icon-btn-browse:before {
	      	margin-right: 6px;
	      	vertical-align: text-bottom;
	      	font-size: 16px;
	    }
	    .blue {
	      	color: $theme-color;
	    }
	    .detail-main {
	      	margin-top: 30px;
	      	line-height: 1.5;
	      	overflow: hidden;
	    }
	}
	.content-r {
	    width: 275px;
        .title {
            font-size: 1.14em;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            text-indent: 1em;
        }
        .information_ul {
            .information_li {
                .img {
                    width: 70px;
                    height: 60px;
                }
                .img_r {
                    width: 62px;
                    height: 62px;
                    border-radius: 50%;
                }
                .content {
                    margin-left: 80px;
                    p {
                        font-size: 14px;
                        height: 40px;
                        line-height: 1.5;
                        &:hover{
                        	color: #d00;
                        }
                    }
                    .time {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
	}
</style>

<style lang="scss" scoped>
	#information_detail{
		.detail-main {
	     	p {
	     	   	text-indent: 24px;
	     	   	word-wrap: break-word;
	     	   	word-break: break-all;
	     	}
	     	img {
	     	    display: block;
	     	    max-width: 72%;
	     	    margin: 16px auto;
	     	}
	     	ul, ol {
	     	  	padding: 12px;
	     	}
	     	table {
	     	 	box-sizing: border-box;
	     	  	width: 100%;
	     	  	margin: 12px 0;
	     	  	td {
	     	    	text-align: center;
	     	    	border: 1px solid #ddd;
	     	    	padding: 4px;
	     	  	}
	     	}
	     	a:hover {
	     	  	color: #2797ed;
	     	}
	    }
	}
</style>