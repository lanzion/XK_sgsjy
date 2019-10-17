<template>
	<div id="access" class="backend-content__middle">
		<el-form :model="form" ref="form" class="form">
			<!-- 访问全新 -->
			<h2>
				访问权限
				<i class="icon-form-tip" @click="accessSwitch = !accessSwitch"></i>
				<span v-show="accessSwitch"> 设置哪些人可以访问你的空间</span>
			</h2>
			<el-form-item prop="authority" >
				<el-radio-group v-model="form.authority" @change="redioChange">
					<el-radio v-for="(item, k) in authorityOptions" :label="item.value" :key="k" @click.native="changeAuthority">
                        {{item.name}}
                	</el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- 黑名单 -->
			<h2>
				黑名单
				<i class="icon-form-tip" @click="blackSwitch = !blackSwitch"></i>
				<span v-show="blackSwitch">被加入黑名单的人，即使属于有访问权限的人群，也不可以访问你的空间。</span>
			</h2>
			<el-form-item prop="blkUserId">
				<el-row>
					<el-col :span="6">
						<el-input v-model="blkUser" placeholder="请输入用户姓名"></el-input>
					</el-col>
					<el-col :span="4">
	                	<el-button class="btn_add" @click="getBlkUserName('blkUser')"> 查找 </el-button>
	                </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-tag :key="index" v-for="(tag, index) in form.blkUserId" :closable="true" :close-transition="false" @close="delBlkUserId(tag)" class="tag">{{tag.userName}}</el-tag>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="22">
				        <transition-group class="item-list clearfix" v-if="blkUserArr.length" name="item-item" tag="ul" mode="out-in">
				            <li class="item-item" v-for="(item, index) in blkUserArr" :key="item.userName">
				                <section class="item-item-detail">
				                    <img class="item-img fl" :src="getFileUrl(item.face) || squareFaceDefault">
				                    <div class="item-msg">
										<p class="name">{{ item.userName }}</p>
										<p class="identity">{{ item.identity | translate(identityOptions) }}</p>
										<p class="school">{{ item.schoolName }}</p>
				                    </div>
				                    <template>
				                        <i class="item-item-handle i-success-bg"></i>
				                        <i class="item-item-handle icon-btn-follow2"  @click="add('blkUser', item)"></i>
				                    </template>
				                </section>
				            </li>
				        </transition-group>
            		</el-col>
				</el-row>
            </el-form-item>
            <!-- 白名单 -->
			<h2>
				白名单
				<i class="icon-form-tip" @click="whiteSwitch = !whiteSwitch"></i>
				<span  v-show="whiteSwitch">被加入白名单的人，即使不属于有访问权限的人员，也可以访问你的空间。</span>
			</h2>
			<el-form-item prop="whtUserId">
				<el-row>
					<el-col :span="6">
						<el-input v-model="whtUser" placeholder="请输入用户姓名"></el-input>
					</el-col>
					<el-col :span="4">
	                	<el-button class="btn_add" @click="getBlkUserName('whtUser')"> 查找 </el-button>
	                </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-tag :key="index" v-for="(tag, index) in form.whtUserId" :closable="true" :close-transition="false" @close="delWhtUserId(tag)" class="tag">{{tag.userName}}</el-tag>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="22">
				        <transition-group class="item-list clearfix" v-if="whtUserArr.length" name="item-item" tag="ul" mode="out-in">
				            <li class="item-item" v-for="(item, index) in whtUserArr" :key="item.userName">
				                <section class="item-item-detail clearfix">
				                    <img class="item-img fl" :src="getFileUrl(item.face) || squareFaceDefault">
				                    <div class="item-msg">
										<p class="name">{{ item.userName }}</p>
										<p class="identity">{{ item.identity | translate(identityOptions) }}</p>
										<p class="school">{{ item.userName }}</p>
				                    </div>
				                    <template>
				                        <i class="item-item-handle i-success-bg"></i>
				                        <i class="item-item-handle icon-btn-follow2"  @click="add('whtUser', item)"></i>
				                    </template>
				                </section>
				            </li>
				        </transition-group>
            		</el-col>
				</el-row>
            </el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { enqUsers, enqUsersAdd, enqUsersDetail } from '@/service/my.js'
	export default {
		name: 'access',
		data() {
			return {
				// 访问权限说明
				accessSwitch: false,
				blackSwitch: false,
				whiteSwitch: false,
				// 黑名单
				blkUser: null,
				// 白名单
				whtUser: null,
				form: {
					authority: '',
					blkUserId: [],
					whtUserId: []
				},
				authorityOptions: [
					{value:'0',name:'所有人'},
					{value:'1',name:'本校'},
					{value:'2',name:'好友'},
					{value:'3',name:'粉丝'},
					{value:'4',name:'仅自己'}
				],
				blkUserArr: [],
				whtUserArr: [],
                flag: true
			}
		},
		mounted() {
			// 回显
			enqUsersDetail({}).then(res => {
				if(res.data.appendInfo) {
					res = res.data.appendInfo
					this.form.authority = res.authority
					this.form.blkUserId = res.blkList.map(i => ({id: i.id, userName: i.userName, userId: i.userId}))
					this.form.whtUserId = res.whtList.map(i => ({id: i.id, userName: i.userName, userId: i.userId}))
				}
			})
		},
		methods: {
            redioChange() {
                if (this.flag === false) {
                    this.flag = true
                } else {
                    this.flag = false
                }
            },
            changeAuthority() {
                if (this.flag) {
                    this.flag = false
                    this.requestAdd()
                }
            },
			// 请求数据
			getBlkUserName (module) {
				if(this.$data[module]) {
					enqUsers({userName: this.$data[module] }).then(res => {
						if(res.data.appendInfo.list) {
							this.$data[`${module}Arr`] = res.data.appendInfo.list
						}
					})
				}
			},
			// 移除黑名单
            delBlkUserId (tag) {
                this.form.blkUserId.splice(this.form.blkUserId.indexOf(tag), 1)
                this.requestAdd()
            },
            // 移除白名单
            delWhtUserId (tag) {
                this.form.whtUserId.splice(this.form.whtUserId.indexOf(tag), 1)
                this.requestAdd()
            },
            requestAdd () {
            	let authority = this.form.authority,
            		blkUserId = this.form.blkUserId.map(i => i.id),
            		whtUserId = this.form.whtUserId.map(i => i.id)
            	enqUsersAdd({authority, blkUserId, whtUserId}).then(res => {
            		if (res.data.code === 200) {
            			this.$message({type: 'success', message: '操作成功'})
            		}
            	})
            },
           	// 添加黑、白名单
            add (model, item) {
            	if(!this.form[`${model}Id`].some(i => i.userId === item.id) ) {
	            	this.form[`${model}Id`].push({id: item.id, userName: item.userName, userId: item.id})
	            	this.requestAdd()
            	}else {
            		const str = model === 'blkUser' ? '黑名单已存在此用户' : '白名单已存在此用户'
            		this.$message({message: str})
            	}
            }
		},
		computed: {
            // 学段数据
            ...mapState('dictionaryCommon', {
                identityOptions (state) {
                    let dicList = (state['identityDicList'] || {}).dicList || []
                    return dicList
                }
            })
        }
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .btn {
            border: 1px solid $color-value;
        }
        .btn1 {
            background-color: $color-value;
            color: #fff;
        }
        .btn2 {
            color: $color-value;
        }
        .addExperts:hover {
            border: 1px solid $color-value;
            color: $color-value;
        }
    }
}
#access {
	min-height: 400px;
	.form {
		h2 {
			display: block;
			padding: 10px 0;
			font-size: 16px;
			color: #333;
			i {
				font-size: 14px;
			}
			span {
				font-size: 12px;
			}
		}
	}
	.func {
	    padding: 12px;
	    background-color: #F6F6F6;
	    border: 1px solid #c9c9c9;
	}
	.box {
		height: 300px;
		overflow-y: auto;
		border: 1px solid #c9c9c9;
		border-top: none;
		padding: 20px;
		.el-checkbox {
	        display: block;
	        line-height: 1.5;
	        & + .el-checkbox{
	            margin-top: 5px;
	            margin-left: 0;
	        }
	    }
	}
	.btn {
		margin-top: 20px;
	    width: 92px;
	    height: 32px;
	    margin-right: 10px;
	    font-size: 14px;
	}
	.btn_add {
		width: 92px;
		height: 32px;
		background-color: $default-color;
		color: #fff;
		margin: 0 4px;
	}
	.tag {
		margin: 0 5px;
	}
}
.item-item-enter,
.item-item-leave-active {
    opacity: 0;
    transform: translate(0);
}
.item-item-enter {
    transform: scale(.1);
}
.item-item-leave-active {
    position: absolute;
}
$item-margin: 10px;
$item-content-padding: 7px;
.item-list {
        margin-left: -$item-margin;
		margin-top: 20px;
        .item-item {
            float: left;
            width: 25%;
            padding: 0 0 $item-margin $item-margin;
            box-sizing: border-box;
            transition: opacity .8s, transform .8s;
            cursor: pointer;

            .item-item-detail {
                position: relative;
            }

            .item-img {
                width: 50%;
                height: 100%;
                cursor: pointer;
                border-radius: 5px;
            }
			.item-msg {
				margin-left: 55%;
				.name {
					margin-top: 12px;
					font-size: 14px;
					font-weight: 400;
					color: #3e3e3e;
				}
				.identity {
					color: #999;
				}
			}

            $triangle-height: 30px;
            $triangle-width: 40px;
            .item-item-handle {
                position: absolute;
                top: 0;
                right: 50%;
                color: #fff;
                line-height: $triangle-width / 2;
            }

            .i-success-bg {
                width: 0;
                height: 0;
                border-top: 30px solid #13ce66;
                border-left: $triangle-height solid transparent;
            }
        }
    }
</style>