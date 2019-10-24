<template>
	<div id="related_resource">
		<h4 class="clearfix">相关资源 <a href="javaScript:;" class="fr" @click="$router.push({path:routePath,query:{id:$route.query.id}})">更多>></a></h4>
		<section>
			<ul class="" v-if="resourceList.length > 0">
				<li class="clearfix" v-for="(item, index) in resourceList">
					<!-- <a class="fr" v-if="$ls.get('loginInfo')" :href="downloadUrl(item.resourceId, item.name)" :download="item.name">
						<i title="下载" class="icon-btn-download"></i>
					</a> -->
					<a class="fr" v-if="$ls.get('loginInfo')" href="javascript:;" @click="downloadUrl(item.resourceId, item.name)">
						<i title="下载" class="icon-btn-download"></i>
					</a>
					<span class="res-tit" :title="item.name">{{item.name}}</span>
				</li>
			</ul>
			<div v-else class="empty-block">暂无数据</div>
		</section>
	</div>
</template>

<script>
	export default {
		name:'related_resource',
		components:{},
		data() {
			return {
				routePath:''
			}
		},
		props:{
			resourceList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		created(){
			if(this.$route.path.includes('educationBureauSpace')){
				this.routePath = '/educationBureauSpace/subject/resource'
			}else if(this.$route.path.includes('schoolSpace')){
				this.routePath = '/schoolSpace/subject/resource'
			}
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>

	#related_resource{
		background-color: #fff;
		width: 274px;
		box-sizing: border-box;
		padding: 15px;
		margin-bottom: 20px;
		h4{
			padding-bottom: 10px;
			border-bottom: 1px solid #c9c9c9;
			font-size: 16px;
		}
		section{
			ul{
				li{
					width: 100%;
					font-size: 14px;
					line-height: 1;
					margin-top: 15px;
					.res-tit{
						display: inherit;
						margin-right: 30px;
						height: 15px;
						text-overflow: ellipsis;
						overflow: hidden;
						&:hover {
							color: #00a0e9;
						}
						i{
							margin-left: 10px;
						}
					}
				}
			}
		}
	}
</style>