<template>
	<div id="worksList">
		<ul class="list" v-if="datas.length > 0">
			<li v-for="(item,index) in datas" class="clearfix">
				<div class="img-box fl">
					<div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.resourceId) || listDefault})` }"></div>
					<!-- <img :src="getFileUrl(item.resourceId)" v-if="item.resourceId">
					<img :src="bgc" v-else> -->
					<div class="status-label" v-if="auditStatus == 0">
						<p class="submit" v-if="item.auditStatus == -1">待提交</p>
						<p class="pending" v-if="item.auditStatus == 0">待审核</p>
						<p class="no-pass" v-if="item.auditStatus == 2">不通过</p>
						<p class="audit" v-if="item.auditStatus == 3">审核中</p>
					</div>
				</div>
				<div class="msg-box fl">
					<h4 class="works-name">
						<a @click="toDetailPage(item)" :data-id="item.id" class="clearfix" v-if="item.auditStatus == 1">
							{{item.workName}}
						</a>
						<router-link :to="{path:'preview', query: {id: item.id}}" v-if="[0, 3].includes(item.auditStatus)">{{item.workName}}</router-link>
						<router-link :to="{path:'publish', query: {id: item.id}}" v-if="[-1, 2].includes(item.auditStatus)">{{item.workName}}</router-link>
					</h4>
					<div class="works-content clearfix">
						<span class="fl" style="width:75px">作品简介：</span>
						<p class="introduction fl">{{item.introduction | handleWorksDesc(100) }}</p>
					</div>
					<div class="classify clearfix mb10">
						<p class="creater fl">
							分类：<span>{{item.workTypeName}}</span>
							<span v-if="auditStatus == 1"> | 上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
						</p>
					</div>
					<p class="works_msg">
						<span v-if="auditStatus == 0">上传时间：{{item.createTime | dateFormat('yyyy-MM-dd')}}</span>
						<span v-if="auditStatus == 1"><i class="icon-btn-browse"></i> {{item.browseNum ? item.browseNum : 0}}</span>
						<span v-if="auditStatus == 1">&nbsp;&nbsp; <i class="icon-btn-i-collection"></i> {{item.collectionCount ? item.collectionCount : 0}}</span>
						<span v-if="auditStatus == 1">&nbsp;&nbsp; <i class="icon-i-reply"></i> {{item.commentCount ? item.commentCount : 0}}</span>
						<span v-if="auditStatus == 1">&nbsp;&nbsp; <i class="icon-btn-i-share"></i> {{item.shareNum ? item.shareNum : 0}}</span>
					</p>
				</div>
				<div class="option-box fr">
					<span title="公开范围" v-if="isStudent && auditStatus === 1" @click="openPopupWin(item, index)"><i class="icon-btn-scope"></i></span>
					<span title="去评价" v-if="isStudent && auditStatus === 1" @click="toDetailPage(item)"><i class="icon-btn-evaluate"></i></span>
					<operate @on-delete="del(item.id)" @on-edit="edit(item.id)" @on-submit="submit(item.id)"
                   :icon-group="generateIconGroup(item.auditStatus)" label="项目" v-if="auditStatus === 0"></operate>
				</div>
				<button @click="showRecordDialog(item.id)" class="btn-verify-record pa" v-if="auditStatus == 0">审核记录</button>
			</li>
		</ul>
		<div class="empty-block" v-else>暂无数据</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
		<!-- 分享 -->
		<!-- <el-dialog class="inviteMembers" :visible.sync="invitationPopup" size="small" title="分享">
	        <section class="box clearfix">
	            <div class="fl box-l">
	                <el-row>
	                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">接收人:</el-col>
	                    <el-col :span="18"><el-input v-model="selector" placeholder="请输入内容" :readonly="true"></el-input></el-col>
	                </el-row>
	                <el-row style="margin-top:25px;">
	                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">内&nbsp;&nbsp;&nbsp;容:</el-col>
	                    <el-col :span="18"><el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content" resize="none"></el-input></el-col>
	                </el-row>
	            </div>
	            <div class="fr box-r">
	                <el-row>
	                    <el-col :span="24"><el-input placeholder="输入关键字搜索" v-model="filterText"></el-input></el-input></el-col>
	                </el-row>
	                <h6 class="title">本校学生</h6>
	                <el-row>
	                    <el-col :span="24">
	                        <el-tree :data="data" show-checkbox node-key="name" :props="defaultProps" style="height:180px;overflow-y:auto;border:1px solid #c9c9c9;" :filter-node-method="filterNode" ref="tree" @check-change="selectData"></el-tree>
	                    </el-col>
	                </el-row>
	            </div>
	        </section>
	        <div class="buttonGroup clearfix">
	            <a class="reply_btn reply_btn2" @click="invitationPopup = false">取消</a>
	            <a class="reply_btn reply_btn1" @click="send">确定</a>
	        </div>
	    </el-dialog> -->
	    <!-- 设置公开范围 -->
	    <el-dialog title="可评范围" :visible.sync="openRangePopup" size="tiny">
	        <section class="openRange">
	            <el-radio-group v-model="openRange">
                	<el-radio v-for="item in openRangeOptions" :label="item.value" :key="item.value" style="display:inline-block;width:100%;">{{item.name}}
                	</el-radio>
          		</el-radio-group>
	        </section>
	        <div class="buttonGroup clearfix">
	            <a class="reply_btn reply_btn2" @click="openRangePopup = false">取消</a>
	            <a class="reply_btn reply_btn1" @click="setOpenRange">确定</a>
	        </div>
	    </el-dialog>
	    <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'workId'}" />
	</div>
</template>

<script>
// 引入组件
import delPopover from 'Common/del_popover.vue';
import pagination from 'Common/pagination.vue';
import { requestBackendWorksList, worksScopeOpen, worksSubmitAudit, worksTeaStuDel } from '@/service/works.js'
import { dynamicSpaceShare } from '@/service/common.js'
// import bgc from 'res/images/info.png'
import operate from 'components/common/operate.vue'
import verifyRecordDialog from 'components/my/verify_record_dialog.vue'
	export default {
		name: 'worksList',
		props: ['selected','search'],
		components: {
			'del-popover': delPopover,
			'v-pagination': pagination,
			operate,
			verifyRecordDialog
		},
		data () {
			return {
				api: '/maker/work/audit/selectList',
	            dialog: {isVisible: false},
	            curRecordId: '', // 当前审核记录ID
				// bgc: bgc,
				param:{
					totalNum:0,
					pageSize:5,
					pageNum:1
				},
				openRangeOptions: [
					{value:'1',name:'仅本人可评'},
					{value:'2',name:'本班可评'},
					{value:'3',name:'本校可评'},
					{value:'4',name:'本区县可评'},
					{value:'5',name:'本市可评'},
					{value:'6',name:'本省可评'},
					{value:'7',name:'所有可评'},
				],
				datas: [],
				auditStatus: 1,
				// 是否是学生空间
				isStudent: false,
				invitationPopup: false,
				selector: '',
	            content: '',
	            filterText: '',
	            data: [],
	            defaultProps: {
	              children: 'children',
	              label: 'name'
	            },
	            select: [],
	            text: '',
	            id: '',
	            openRangePopup: false,
				openRange: '',
				openRangeId: '',
				openRangeIndex: ''
			}
		},
		mounted() {
			let user = this.$ls.get('userIdentity')
			if(user == 'teacher'){
				this.isStudent = false
			}else if(user == 'student'){
				this.isStudent = true
			}
			this.routeChange()
			this.getWorksList();
		},
		methods: {
			showRecordDialog (id) { // 显示审核记录弹窗
	            this.curRecordId = id
	            this.dialog.isVisible = true
	        },
			del (id) { // 删除
	            worksTeaStuDel({id}).then(res => {
	                if (res.data.code === 200) {
	                    this.$message({
	                        message: '删除成功',
	                        type: 'success'
	                    })
	                    this.getWorksList()
	                    return
	                }
	                this.$message.error('删除失败，请重试')
	            }, () => {
	                this.$message.error('删除失败，请重试')
	            })
	        },
			submit (id) { // 提交审核
	            worksSubmitAudit({id}).then(res => {
	                if (res.status === 200 && res.data.code === 200) {
	                    this.$message({
	                      message: '成功提交审核',
	                      type: 'success',
	                      duration: 1500
	                    })
	                    this.getWorksList()
	                    return
	                }
	                    this.$message.error(res.data.msg || '提交审核失败，请重试')
	            }).catch(() => {
	                this.$message.error('提交审核失败，请重试')
	            })
	        },
			edit (id) { // 编辑
	            this.$router.push({ path:'/admin/works/publish', query:{id} })
	        },
			generateIconGroup (status) {
	            const edit = status === -1 || status === 2 ? 'edit' : ''
	            const submit = status === -1 && 'submit' || ''
	            const del = edit ? 'delete' : ''
	            return [edit, submit, del]
	        },
			// 公开范围弹窗
			openPopupWin (item, index) {
				this.openRangePopup = true
				this.openRange = item.openRange
				this.openRangeId = item.id
				this.openRangeIndex = index
			},
			// 修改公开范围
			setOpenRange () {
				worksScopeOpen ( {id: this.openRangeId, openRange: this.openRange} ).then(res => {
					if(res.data.code) {
						this.datas[this.openRangeIndex].openRange = this.openRange
						this.openRangePopup = false
					}
				})
			},
			//路由判断是已审/待审
			routeChange() {
	            let strNum = this.$route.path.lastIndexOf('/')
	            let _route = this.$route.path.substring(strNum)
	            if(_route == '/audited') {
	                this.auditStatus = 1
	            }else {
	                this.auditStatus = 0
	            }
	        },
	        //请求列表
			getWorksList() {
				let data = {
					spaceType: this.permissions,
					technology: this.selected.technology,
					workType: this.selected.classification.join('-'),
					auditStatusTeaOrStu: this.auditStatus,
					workName: this.search
				};
				requestBackendWorksList(data, this.param).then((res) => {
					this.param.totalNum = res.data.entity.totalNum;
					this.datas = res.data.entity.resultData;
					this.$emit('totalNum', res.data.entity.totalNum)
				})
			},
			// 切换页数
			changePage(val) {
				this.$set(this.param, 'pageNum', val)
				this.getWorksList()
			},
			// filterTechnology(val) {
			// 	if(val === '0'){
			// 		this.technology = '';
			// 	} else {
			// 		this.technology = val;
			// 	}
			// 	this.getWorksList();
			// },
			// 分享弹框数据过滤
			filterNode(value, data) {
	            if (!value) return true;
	            return data.name.indexOf(value) !== -1;
	        },
	        // 学生空间进入评价
		    toDetailPage ({workName, id, createTime}) {
		        let options = {
		          	beCommentedId: this.isAdmin ? this.$ls.get('loginUId', '') : '',
		          	busId: id,
		          	busName: workName,
		          	createTime,
		          	resultList: [],
		          	target: 3
		        }
		        this.$ls.set('curEvaluatingItem', options)
		        this.$router.push({path:'/admin/works/details', query:{id}})
		     },
	        //分享弹框在input中显示处理
	        selectData(){
	            let arr = []
	            let arr1 = []
	            let data = this.$refs.tree.getCheckedNodes(true)
	            for(let i=0; i<data.length;i++) {
	                arr.push(data[i].name)
	                arr1.push(data[i].id)
	            }
	            this.selector = arr.join('、')
	            this.select = arr1
	        },
	        //分享发送数据
	        send (){
	            dynamicSpaceShare({
	                busId: this.id,
	                url: `\/#\/educationBureauSpace\/${this.$route.path.split('/')[2]}\/details?id=${this.id}`,
	                title: this.content
	            }).then(res => {
	                if(res.status === 200){
	                    this.$message({
	                        message: '分享成功',
	                        type: 'success'
	                    })
	                    this.invitationPopup = false
	                    this.content = ''
	                    this.selector = ''
	                    this.select = []
	                }
	            })
	        },
	        //显示弹框，并记录id
	        popupShow (id) {
	        	this.id = id
	        	this.invitationPopup = true
	        }
		},
		computed: {
	        params: function() {
	            return Object.assign( {}, this.selected, {search: this.search}, {auditStatus: this.auditStatus} )
	        }
    	},
		watch:{
			"$route":"routeChange",
			params: {
				handler: function(val,oldVal) {
					this.getWorksList()
				},
				deep:true
			},
			filterText(val) {
	            this.$refs.tree.filter(val);
	        }
		},
		filters: {
	      	handleWorksDesc (txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
	        	let reg = new RegExp('(.{' + len + '}).+')
	        	return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
	      	}
	    }
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
            }
        }
    }
}
.inviteMembers {
    padding: 0;
    .header {
        height: 54px;
        line-height: 54px;
        text-indent: 1em;
        border-bottom: 1px solid #D7D7D7;
        font-size: 16px;
    }
/*     .box {
        padding: 40px 30px;
        .box-l, .box-r {
            width: 50%;
        }
        .box-r {
            .title {
                padding: 0px 5px;
                height: 25px;
                line-height: 25px;
                font-size: 14px;
            }
        }
    } */
}
.buttonGroup {
		height: 30px;
        text-align: right;
        padding: 0 30px 30px;
        margin-bottom: 30px;
    .reply_btn {
        display: inline-block;
        width: 62px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
    }
    .reply_btn1 {
        color: #fff;
    }
    .reply_btn2 {
        margin-top: 2px;
        margin-right: 10px;
    }
}
.openRange {
	padding: 20px 100px;
	.el-radio + .el-radio {
		margin-left: 0;
		margin-top: 5px;
	}
}
*{
	box-sizing: border-box;
}
.mb10{
	margin-bottom: 10px;
}
.focus{
	border-color: #d00!important;
}
#worksList {
	padding: 0px 15px 15px;
	.list {
		.option-box {
			.icon-btn-scope, .icon-btn-evaluate {
				padding: 6px;
				font-size: 18px;
			}
		}
		li {
			height: 212px;
			padding: 20px 0;
			border-bottom: 1px dashed #ccc;
			position: relative;
			a{
				display: inline-block;
			}

			.img-box {
				width: 265px;
				height: 100%;
				position: relative;
				img,
				.bg-img__wrap {
					width: 100%;
					height: 100%;
				}
			}

			.msg-box {
				width: 530px;
				overflow: hidden;
				font-size: 14px;
				padding-left: 20px;
				padding-top: 15px;
				.works-name{
					font-size: 22px;
					margin-bottom: 15px;
					a:hover {
						color: $default-color;
					}
				}
				.icon-btn-scope
				.evaluate{
					font-size: 20px;
					color: #fd8c88;
					margin-left: 45px;
				}
				.works-content {
					font-size: 14px;
					margin-bottom: 20px;
					line-height: 20px;
					.introduction{
						width: 435px;
						height: 40px;
						line-height: 20px;
						word-break: break-word;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.works_msg{
					color: #999;
					.icon-btn-browse:hover, .icon-btn-i-collection:hover, .icon-btn-i-reply:hover, .icon-btn-i-share:hover {
						color: #999;
						cursor: default;
					}
				}
			}
		}
	}
}
</style>

