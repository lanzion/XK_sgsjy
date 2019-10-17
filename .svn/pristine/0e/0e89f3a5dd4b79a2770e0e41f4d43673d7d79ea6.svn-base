<template>
	<section class="practice-list">
			<ul>
				<li class="clearfix" v-for="(item,index) in practiceList">
					<div class="msg-box fl">
						<p class="activity-name">
							<span>活动名称：</span>
							<router-link :to="{path:'aa'}">{{item.name}}</router-link>
						</p>
						<p class="join-time"><span>参与时长(填)：</span>{{item.time}}</p>
						<p class="self-evaluation-level"><span>自评等级：</span><span class="level">{{item.level}}</span></p>
						<p class="self-evaluation-content"><span>自评语：</span>{{item.content | textOverflow(30)}}</p>
						<p class="practice-achievement">
							<span>实践成果：</span>
							<router-link :to="{path:'aa'}">{{item.achievememt}}</router-link>
						</p>
					</div>
					<div class="btn-box fr">
						<a class="btn" href="javaScript:;">公开范围</a>
						<router-link class="btn" :to="{path:'11'}">去评价</router-link>
						<button v-if="type === 'frontend'">去评价</button>
					</div>
				</li>
			</ul>
		</section>
</template>

<script>
	export default {
		name:'practice_list',
		data() {
			return{
				practiceList:[
					{
						name:'Android入门',
						time:'12',
						level:'A',
						content:'初步认识Android，从入门到放弃初步认识Android，从入门到放弃初步认识Android，从入门到放弃',
						achievememt:'光立方'
					}
				]
			}
		},
		props:['type','search'],
		watch:{
			search:{
				handler:function(val,oldVal){
					console.log(val)
				},
				deep:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	.practice-list{
		width: 100%;
		ul{
			width: 100%;
			li{
				width: 100%;
				padding: 20px 0;
				font-size: 14px;
				border-bottom: 1px dashed #c9c9c9;
				.msg-box{
					p{
						line-height: 24px;
						a{
							color: #00a0e9;
						}
						.level{
							color: #d00;
						}
					}
					.activity-name{

					}
				}
				.btn-box{
					padding-top: 40px;
					.btn{
						display: block;
						margin-bottom: 10px;
						font-size: 14px;
						color: #3e3e3e;
					}
					.btn:hover{
						color: #d00;
						background-color: #fff;
					}
					button{
						cursor: pointer;
						width: 92px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 14px;
						border:1px solid #d00;
						color: #d00;
					}
					button:hover{
						background-color: #d00;
						color: #fff;
					}
				}
			}
		}
	}
</style>