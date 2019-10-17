<template>
	<section id="system_msg" class="my-letter">
		<div class="del-batch" v-if="msgData.length > 0">
			<span class="read-tag" @click="markRead(ids)">批量标记已读</span>
			<el-popover ref="popover" placement="top" width="140" v-model="visible">
			  	<p>确定要删除这些私信吗？</p>
			  	<div style="text-align: right; margin: 10px">
				    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
				    <el-button type="primary" size="mini" @click="delMessage">确定</el-button>
			  	</div>
			</el-popover>
			<a href="javaScript:;" @click="beforeBatchOption">批量删除</a>
		</div>
		<el-table
			v-if="msgData.length > 0"
		    ref="multipleTable"
		    :data="msgData"
		    :highlight-current-row="false"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="32">
		    </el-table-column>
		    <el-table-column>
		      	<template scope="scope">
		      		<section class="content-box clearfix">
		      			<div class="msg-box">
		      				<p class="name" @click="invite(scope.row)">
                                <span v-if="scope.row.messageType > 1"> {{ scope.row.userName }} 邀请您 {{ scope.row.messageType | mesType }} </span>
		      					<span class="sign" v-if="scope.row.isRead === 1"></span>
		      				</p>
		      				<p class="content" v-html="scope.row.content">
		      				</p>
		      				<p class="time">{{scope.row.createDate | dateFormat('yyyy.MM.dd HH:mm')}}</p>
		      			</div>
		      		</section>
		      	</template>
		    </el-table-column>
		    <el-table-column label="" width="100">
		    	<template scope="scope">
		    		<span class="icon-btn-read read" title="标记已读" @click="markRead([{id:scope.row.messageId}])" v-if="scope.row.isRead === 1"></span>
		    		<del-popover title="删除" class="delete fr" :delData="{ url:'maker/systemMessageRead/delByIds', params:[{id:scope.row.messageId}], name:'消息' }" v-on:callback="getSysMsgList"></del-popover>
		    	</template>
		    </el-table-column>
		</el-table>
		<div class="empty-block" v-else>暂无系统消息</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
        <el-dialog title="系统提示" :visible.sync="invitePopup" size="tiny" :before-close="close" class="invitePopup">
            <p class="invitePopup_Msg"> <i class="icon-form-tip"></i> {{ inviteMsg.userName }}邀请您参加{{ inviteMsg.messageType | mesType }}，是否同意参加？</p>
            <div class="button_group">
                <button type="button" class="btn1" @click="close">取消</button>
                <button type="button" class="btn2" @click="sendInvite">参加</button>
            </div>
        </el-dialog>
	</section>
</template>

<script>
    import Axios from 'Axios'
	import delPopover from 'Common/del_popover.vue';
	import pagination from 'Common/pagination.vue';
	import { requestSysMsg, readInBatch, delSysMsg } from '@/service/privateLetter.js';
	export default {
		name:'system_msg',
		components:{
			'del-popover': delPopover,
			'v-pagination': pagination,
		},
		data () {
			return {
				visible:false,
				param:{
					totalNum:0,
					pageSize:10,
					pageNum:1
				},
				msgData:[],
				receiveId:'',
				ids:[],
                invitePopup: false,
                inviteMsg: {},
                urlType: {
                    2: 'project',
                    3: 'activity',
                    4: 'interest',
                    5: 'course',
                    6: 'studio'
                }
			}
		},
		mounted(){
			if(this.$ls.get('loginInfo')){
				this.receiveId = this.$ls.get('loginInfo').userInfo.id;
			};
			this.getSysMsgList();
		},
		methods:{
            invite (item) {
                this.invitePopup = true
                this.inviteMsg = item
            },
            close () {
                this.invitePopup = false
            },
            sendInvite () {
                let messageType = this.inviteMsg.messageType,
                    busId = this.inviteMsg.busId,
                    _this = this
                if(messageType == 2 || messageType == 3 || messageType == 5 || messageType == 6){
                    let url
                    if(messageType == 2) {
                        url = `maker/projectMember/addMember?projectId=${busId}`
                    }else if(messageType == 3) {
                        url = `maker/activityMember/addMember?activityId=${busId}`
                    }else if(messageType == 5) {
                        url = `maker/courseMember/addMember?courseId=${busId}`
                    }else if(messageType == 6) {
                    	url = `/maker/studioMember/addMember?studioId=${busId}`
                    }
                    Axios.get(url)
                        .then(function (res) {
                            if(res.data.code == 200) {
                                _this.invitePopup = false
                                _this.$message({
                                    type: 'success',
                                    message: '加入成功'
                                })
                            }else {
                                _this.$message(res.data.msg)
                            }
                        })
                        .catch(function (error) {
                            _this.$message(error)
                        })
                }else if(messageType == 4) {
                    this.$http.post('/maker/interests/member/add', { interestId: busId, userId: this.$ls.get('loginUId') } ).then(res => {
                        if(res.data.code == 200) {
                            _this.invitePopup = false
                            _this.$message({
                                type: 'success',
                                message: '加入成功'
                            })
                        }else {
                            _this.$message(res.data.msg)
                        }
                    })
                }
                // let busId =

                // if()
            },
			handleSelectionChange(val) {
        		 for(let i in val){
        		 	this.ids.push({id:val[i].messageId});
        		 }
      		},
      		changePage(val){
      			this.param.pageNum = val;
      			this.getSysMsgList();
      		},
      		/*
      		获取系统私信
      		 */
      		getSysMsgList(){
      			requestSysMsg({receiveId:this.receiveId},{pageNum:this.param.pageNum,pageSize:10}).then((res) => {
      				if(res.data.code === 200){
      					this.msgData = res.data.entity.resultData;
      					this.param.totalNum = res.data.entity.totalNum;
      					this.$emit('totalNum',res.data.entity.totalNum);
      				}
      			})
      		},
      		/*删除前的操作*/
      		beforeBatchOption(){
      			if(this.ids.length > 0){
      				this.visible = true;
      			}else{
      				this.showMessage('warning','还未勾选哦')
      			}
      		},
      		/*批量删除*/
      		delMessage(){
      			delSysMsg(this.ids).then((res) => {
      				if(res.data.code === 200){
      					this.visible = false;
      					this.showMessage('success','删除成功');
      					this.ids = []
      					this.$refs.multipleTable.clearSelection();
      					this.getSysMsgList();
      				}else{
      					this.showMessage('warning',res.data.msg)
      				}
      			})
      		},
      		/*标记已读*/
      		markRead(markIds){
      			if(markIds.length > 0){
      				readInBatch(markIds).then((res)=>{
	      				if(res.data.code === 200){
	      					this.showMessage('success','标记成功');
	      					this.ids = []
	      					this.$refs.multipleTable.clearSelection();
	      					this.getSysMsgList()
	      				}else{
	      					this.showMessage('warning',res.data.msg);
	      				}
	      			})
      			}else{
      				this.showMessage('warning','还勾选任何消息哦')
      			}
      		},
      		readSysmsg(){
      			this.$confirm(`是否要加入该`, '提示', {
          			confirmButtonText: '加入',
          			cancelButtonText: '不加入',
          			type: 'info'
        		}).then(() => {

        		}).catch(() => {

          		});
      		}
		},
        filters: {
            mesType (type) {
                if(type == 2) {
                    return '加入项目'
                }else if(type == 3) {
                    return '参加活动'
                }else if(type == 4) {
                    return '加入兴趣组'
                }else if(type == 5) {
                    return '参加课程'
                }else if(type == 6) {
                    return '加入工作室'
                }
            }
        }　
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
	#system_msg{
		position: relative;
		padding:0px 18px 20px;
		.del-batch{
			position: absolute;
			top: 13px;
			left: 68px;
			z-index: 999;
			font-size: 14px;
			cursor: pointer;
			.read-tag{
				margin-right: 10px;
        color: $default-color;
				&:hover{
					color: $default-color;
				}
			}
			a:hover{
				color: $default-color;
			}
		}
		.content-box{
			padding: 15px 0;
			.avatar-box{
				margin-right: 10px;
				position: relative;
				.num{
					position: absolute;
					top: 0px;
					right: 0px;
					border-radius: 50%;
					background-color: #ff4949;
					color: #fff;
					display: inline-block;
					width: 20px;
					height: 20px;
					text-align: center;
					line-height: 20px;
				}
				img{
					width: 72px;
					height: 72px;
					border-radius: 50%;
				}
			}
			.msg-box{
				.name{
					font-size: 14px;
					cursor: pointer;
					position: relative;
                    &:hover {
                        color: $default-color;
                    }
					.sign{
						padding: 5px;
						background-color: #ff4949;
						border-radius: 50%;
						position: absolute;
					}
				}

			}
		}
		.read{
			font-size: 18px;
			vertical-align: top;
			margin-right: 10px;
		}
        .invitePopup {
            .invitePopup_Msg {
                padding: 20px 70px;
                font-size: 1.1em;
                text-align: center;
                .icon-form-tip {
                    font-size: 2em;
                }
            }
            .button_group {
                margin-top: 30px;
                text-align: right;
                padding-right: 10%;
                .btn1, .btn2 {
                    width: 64px;
                    height: 32px;
                    border-color: $default-color;
                    color: $default-color;
                }
                .btn2 {
                    margin-left: 10px;
                    background-color: $default-color;
                    color: #fff;
                }
            }
        }
        .time{
            color: #999;
        }
	}
</style>

<style lang="scss">
	#system_msg{
		.el-table{
			border:none;
			td{
				border:none;
				border-bottom: 1px dashed #c9c9c9;
			}
			th{
				background-color: #fff;
			}
			th.is-leaf{
				border-bottom: 1px dashed #c9c9c9;
			}
			tr:hover{
				td{
					background-color: #fff;
				}
			}
		}
	}
</style>