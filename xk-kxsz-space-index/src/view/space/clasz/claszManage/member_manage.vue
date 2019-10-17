<template>
	<section id="member_manage" class="bgw">
		<header class="head-tip"><span class="tip-text">成员管理 ( {{memberNum}} )</span></header>
		<div class="member-list" v-if="memberList.length > 0">
			<ul class="clearfix">
				<li class="member-item clearfix fl" v-for="(item,index) in memberList" :key="index" :style="{width:liWidth}">
					<div class="avatar-box fl">
						<router-link :to="dynamicPath({identity: '0', orgId: item.id, userId: item.userId})">
							<img :src="getFileUrl(item.userImage) || faceDefault">
						</router-link>
					</div>
					<div class="member-msg">
						<router-link :to="dynamicPath({identity: '0', orgId: item.id, userId: item.userId})" class="member-name">{{item.name}}</router-link>
						<p class="group" :title="item.interest">{{item.interest}}</p>
						<div class="option-box clearfix">
							<p class="set-recommend fl">
								<a class="set-btn" href="javaScript:;" @click="cancelGlory(item.id,index)" v-if="item.honorRoll == '1'">取消推荐</a>
								<a class="set-btn" href="javaScript:;" @click="setGlory(item.id,index)" v-else>推荐</a>
							</p>
							<p class="set-admin fl" v-if="item.userId != userId">
								<a class="set-btn" href="javaScript:;" @click="setAdmin(item.userId)">设为管理员</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="empty-block" v-else>暂无成员</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'Vuex'
	import dataTranslation from '@/js/dataTranslation.js'
	import { requestClaszMember,requestSetGlory,requestCancelGlory,setClaszAdmin } from '@/service/space_clasz.js'
	export default{
		name:'member_manage',
		components:{},
		data(){
			return{
				claszId: this.$route.query.id || this.$ls.get('baseInfo').student.classId,
				memberList:[],
				memberNum:0,
				userId:''
			}
		},
		computed:{
			liWidth:function(){
				return this.getWidth(3)
			}
		},
		mounted(){
			if(localStorage.getItem('loginInfo')){
				this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
			};
			this.getMemberList()
		},
		methods:{
			 ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
			/*
			*获取班级成员列表
			*classId:班级id
			 */
			getMemberList(){
				requestClaszMember({classId:this.claszId}).then((res)=>{
					if(res.data.code === 200 && res.data.entity != null){
						let _data = res.data.entity
						this.getDictComb('technicalClassification').then( x => {
                            _data.forEach(item => {
                                // 任教转译
                                dataTranslation(item.interest, 'technicalClassification', { key: 'id' }).then(res => {
                                    item.interest = res;
                                })
                            })
                        })
                        this.memberList = _data;
                        this.memberNum = this.memberList.length;
					}
				})
			},
			/*
			*成员管理-推荐和取消推荐
			*classId:班级id
			*id；主键id
			 */
			setGlory(id,index){
				requestSetGlory({classId:this.claszId,id:id}).then((res)=>{
					if(res.data.code === 200){
						this.showMessage('success','推荐成功')
						this.memberList[index].honorRoll = '1'
					}else{
						this.showMessage('warning',res.data.msg)
					}
				})
			},
			cancelGlory(id,index){
				requestCancelGlory({classId:this.claszId,id:id}).then((res)=>{
					if(res.data.code === 200){
						this.showMessage('success','取消推荐成功')
						this.memberList[index].honorRoll = '0'
					}else{
						this.showMessage('warning',res.data.msg)
					}
				})
			},
			/*
			*设置班级管理员
			*id:班级id
			*studentId: 被设置成管理员的用户ID
			 */
			setAdmin(studentId){
				this.$confirm('此操作将设置该学生为管理员，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    let params = {
						id: this.claszId,
						studentId: studentId
					};
                    setClaszAdmin(params).then((res) => {
                    	if(res.data.code === 200){
                    		this.showMessage('success','设置成功');
                    		this.$router.push({path:'/claszSpace/homePage',query:{id:this.$route.query.id}})
                    	}else{
                    		this.showMessage('error',res.data.msg)
                    	}
					})
                }).catch(() => {
                    this.$message({ message: '取消操作' })
                });
			}
		}
	}
</script>

<style lang="scss" scoped>
    @import '~@/asset/scss/vars.scss';
	*{
		box-sizing: border-box;
	}
	#member_manage{
		min-height: 524px;
		.head-tip{
			border-bottom: 1px solid #c9c9c9;
			font-size: 16px;
			.tip-text{
				display: inline-block;
				padding: 15px 15px 10px;
				color: $default-color;
				border-bottom: 2px solid $default-color;
				margin-bottom: -1px;
			}
		}
		.member-list{
			padding: 15px;
			ul{
				.member-item{
					padding: 15px;
					height: 121px;
					&:hover{
						border:1px solid $default-color;
						.member-msg{
							.member-name{
								color: #00a0e9;
							}
						}
					}
					.avatar-box{
						display: inline-block;
						img{
							width: 85px;
							height: 85px;
							border-radius: 1000px;
						}
					}
					.member-msg{
						padding-left: 98px;
						.member-name{
							display: inline-block;
							color: #333;
							font-size: 18px;
							margin-bottom: 10px;
						}
						.group{
							font-size: 14px;
							color: #999;
							margin-bottom: 18px;
							height: 14px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.option-box{
							p{
								a{
									font-size: 14px;
								}
								a:hover{
									color: $default-color;
								}

							}
							.set-admin{
								margin-right: 10px;
							}
							.set-btn{
								padding: 2px 6px;
								border: 1px solid #ddd;
								border-radius: 3px;
								margin-right: 10px;
								&:hover{
									border-color: $default-color;
								}
							}
						}
					}
				}
			}
		}
	}
</style>