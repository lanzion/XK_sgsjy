<template>
	<div id="interest_member" class="bgw">
		<h4 class="head-count">成员({{memberList.length}})</h4>
		<section class="member-list">
			<v-list :items="memberList" :listData="listData">
				<template scope="props">
                    <div class="list-item-img__box fl">
                        <img :src="getFileUrl(props.item.url) || faceDefault">
                        <div class="list-item-tips" v-if="props.item.isManager === '1'"><span class="list-item-tiptxt">管理员</span></div>
                    </div>
                    <div class="list-item-msg">
                    	<h6 class="list-item-title">
	                        <p class="ellipsis">{{ props.item.userName }}</p>
	                        <p class="ellipsis">{{ props.item.schoolName }}</p>
	                    </h6>
	                    <ul class="cols-list list-item-count clearfix" v-if="props.item.userId != userId">
	                        <li class="cols-item fl" @click.stop="handleFollow(props.item.userId, !!props.item.follow)">
				                <span class="icon-btn-follow"> {{props.item.follow ? '已' : ''}}关注</span>
	                        </li>
	                        <li class="cols-item fl"><span @click.stop="showPrivateLetterDialog(props.item.userId)" class="icon-btn-prichat"> 私信</span></li>
	                    </ul>
                    </div>
                </template>
			</v-list>
			<!-- <v-pagination :param="param" :changePage="changePage"></v-pagination> -->
		</section>
		<send-private-letter v-if="dialog.isVisible" :dialog="dialog" model=""></send-private-letter>
	</div>
</template>

<script>
	import list from '@/components/common/classificationList/list/graphic/list.vue'
	// import pagination from 'Common/pagination.vue'
	import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
	import {follow, privateLetter} from '@/mixin/teacherAndStudent.js'
	import { requestInterestMember,judgeAdmin } from '@/service/interest.js'
	export default {
		name:'interest_member',
		mixins: [follow,privateLetter],
		components:{
			'v-list':list,
			// 'v-pagination':pagination,
			'send-private-letter':sendPrivateLetter
		},
		data() {
			return{
				dialog: {
					isVisible: false,
					addresseeId: ''
				},
				listData: {
	                col: 5,
	                pathUrl: null,
	                params: {
	                    names: 'memberId',
	                    val: 'id'
	                }
	            },
	            // param:{
	            // 	totalNum:0,
	            // 	pageNum:1,
	            // 	pageSize:30
	            // },
	            userId:'',
			}
		},
		props: {
			memberList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		mounted(){
			if(localStorage.getItem('loginInfo')){
				this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id;
			}else{
				this.userId = '';
			};
		},
		methods:{
			/*关注*/
			handleFollow (followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
		        this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
		         	res && this.$emit('getMemberList')
		        })
		    },
		}
	}
</script>

<style lang='scss' scoped>
	@import '~@/asset/scss/item_list.scss';
	@import '~@/asset/scss/cols.scss';
	#interest_member{
		.head-count{
			padding: 15px;
			border-bottom: 1px solid #c9c9c9;
			font-size: 16px;
		}
	}
	.member-list{
		padding:0px 15px 15px;
	}
	.list-item-msg{
		margin-left: 100px;
		.list-item-title{
			margin-bottom: 10px;
			p{
				height: 28px;
				line-height: 28px;
			}
		}
	}
	.list-item-img__box{
		position: relative;
		border-radius: 10px;
		.list-item-tips{
			width: 54px;
			height: 15px;
			position: absolute;
			top: -6px;
			left: -18px;
			text-align: center;
			padding-top: 15px;
			background-color: #00a0e9;
			color: #fff;
			font-size: 12px;
			transform: rotate(-45deg);
		    -ms-transform: rotate(-45deg);       /* IE 9 */
		    -webkit-transform: rotate(-45deg);   /* Safari and Chrome */
		    -o-transform: rotate(-45deg);        /* Opera */
		    -moz-transform: rotate(-45deg);      /* Firefox */
		    span{
		    	display: inline-block;
		    	transform:scale(0.8,0.8);
		    	-ms-transform:scale(0.8,0.8);
		    	-webkit-transform:scale(0.8,0.8);
		    	-o-transform:scale(0.8,0.8);
		    	-moz-transform:scale(0.8,0.8);
		    }
		}
	}
</style>

<style lang="scss">
	#interest_member{
		.list-item__box{
			.list-item-img__box{
				width: 90px;
				height: 90px;
				img{
					width: 90px;
					height: 90px;
					border-radius: 10px;
				}
			}
		}
		.cols-list {
			.cols-item + .cols-item {
				border-left: none;
			}
		}
	}
</style>