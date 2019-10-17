<template>
    <div id="activity_list">
        <ul class="list" v-if="listData.length > 0">
            <li v-for="(item,index) in listData" class="clearfix">
                <div class="img-box fl">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item.cover)" width="290" height="180" /> -->
                    <div class="status-label">
                        <p class="begin" v-if="item.isApply == -1 || Number(item.startDate) > Number(nowTime)">未开始</p>
                        <p class="end" v-else-if="item.isApply == 6">已结束</p>
                        <p class="doing" v-else>进行中</p>
                    </div>
                </div>
                <div class="msg-box fl">
                    <a @click.prevent="redirect(pages.detail.activity, { query: { id: item.id }})" :title="item.title">
                        <p class="activity-name">{{item.title | textOverflow(28)}}</p>
                    </a>
                    <p class="activity-content">{{item.details | textOverflow(89,'...')}}</p>
                    <div class="activity-time mb18 clearfix">
                        <p class="activity-type w240 fl ellipsis" :title="item.activityTypeName">
                            <i class="icon-i-classify"></i>分类：{{item.activityTypeName}}
                        </p>
                        <p class="join-num w470 fl">
                            <i class="icon-admin-i-statis-class"></i>已参加人数：<span style="color:#00a0e9;">{{item.currNum || 0}}</span>人
                        </p>
                    </div>
                    <div class="people clearfix">
                        <p class="creater w240 fl">
                            <i class="icon-input-user"></i>举办者：{{item.createName}}
                        </p>
                        <p class="time-range w470 fl">
                            <i class="icon-i-time"></i>活动时间：{{item.startDate | dateFormat('yyyy.MM.dd')}} — {{item.endDate | dateFormat('yyyy.MM.dd')}} / 报名时间：{{item.beginDate | dateFormat('yyyy.MM.dd')}}—{{item.stopDate | dateFormat('yyyy.MM.dd')}}
                        </p>
                    </div>
                </div>
                <section class="status-box fr" v-if="!isLogin || identity == 'student'">
                    <div class="join-in" v-if="item.isApply == 0 || item.isApply == 3 || item.isApply == -2">
                        <el-button type="text" @click="showDialog(item.id,index)" class="join-now" v-if="!isLogin || item.createName != userName">立即参加</el-button>

                        <el-dialog title="立即参加" :visible.sync="dialogFormVisible" class="dialog-box">
                            <div class="tips">还可以输入{{inputNum}}字</div>
                            	<el-form :model="form" ref="form" :rules="rules">
                            	    <el-form-item prop="content">
                            	    	<el-input
                            	    	    type="textarea"
                            	    	    :autosize="{ minRows: 3, maxRows: 4}"
                            	    	    placeholder="我来说两句"
                            	    	    :maxlength='100'
                            	    	    @change="inputChange"
                            	    	    v-model="form.content"
                            	    	    id="input">
                            	    	</el-input>
                            	 	</el-form-item>
                            	</el-form>
                            	<div slot="footer" class="dialog-footer">
                            	 	<el-button type="danger" class="btn" @click="submitJoin()">提交</el-button>
                            	</div>
                        </el-dialog>
                    </div>
                    <div class="full stop" v-if="item.isApply == -5">报名未开始</div>
                    <div class="full stop" v-if="item.isApply == -1">活动未开始</div>
                    <div class="full stop" v-if="item.isApply == 1">报名待审核</div>
                    <div class="full stop" v-if="item.isApply == 2">已报名</div>
                    <div class="full stop" v-if="item.isApply == 4">人数已满</div>
                    <div class="full stop" v-if="item.isApply == 5">报名截止</div>
                    <div class="full stop" v-if="item.isApply == 6">活动结束</div>
                </section>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
    </div>
</template>

<script>
    import { activityApply } from '@/service/activity.js'

    export default {
        name: 'activityList',
        data() {
            return {
                form: {
                    content: '',
                },
                inputNum: 100,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                activityId: '',
                currIndex: 0,
                rules: {
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { max: 100, message: '内容不超过100字符', trigger: 'change' }
                    ]
                },
                nowTime: new Date().getTime(),
                userName: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.userName : '',
                identity: this.$ls.get('userIdentity') || '',
                isLogin: this.$ls.get('loginInfo') !== null,
            }
        },
        props: {
            listData: {
                type: Array,
                default: []
            },
            linkTo: {
                type: String,
                default: ''
            }
        },
        methods: {
            /*
             * 还可以输入字数提示的改变
             */
            inputChange() {
                this.inputNum = 100
                this.inputNum = this.inputNum - this.form.content.length
            },
            /*
             * 打开弹窗，改变activityId
             */
            showDialog(id, index) {
                if (this.isLogin) {
                    this.dialogFormVisible = true
                    this.inputNum = 100
                    this.activityId = id
                    this.currIndex = index
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            /*
             * 立即参加提交
             */
            submitJoin() {
                if (localStorage.getItem('loginInfo')) {
                    if (this.form.content === '') {
                        this.showMessage('warning', '请输入内容')
                    } else if (this.form.content.length > 100) {
                        this.showMessage('warning', '输入内容不能超过100字符')
                    } else {
                        const data = {
                            activityId: this.activityId,
                            applyContent: this.form.content
                        }
                        activityApply(data).then((res) => {
                            if (res.data.code === 200) {
                                this.showMessage('success', '申请已提交')
                                this.form.content = ''
                                this.dialogFormVisible = false
                                this.listData[this.currIndex].isApply = 1
                            } else {
                                this.showMessage('warning', res.data.msg)
                            }
                        })
                    }
                } else {
                    this.showMessage('warning', '要登录后才能参加哦')
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.mb18{
    margin-bottom: 18px;
}
.w240{
    width: 240px;
}
.w470{
    width: 470px;
}
.focus{
    border-color: nth($default-color, 1);
}
#activity_list {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .list {
        width: 100%;
        margin-top: 10px;
        overflow: hidden;
        li {
            position: relative;
            width: 100%;
            padding: 20px 15px;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            a{
                display: inline-block;
            }
            // 活动图片
            .img-box {
                position: relative;
                width: 290px;
                height: 180px;
                .bg-img__wrap {
                    width: 100%;
                    height: 100%;
                }
            }
            // 活动信息
            .msg-box {
                width: 735px;
                height: 180px;
                padding-top: 15px;
                padding-left: 20px;
                font-size: 14px;
                box-sizing: border-box;
                font-weight: lighter;
                .activity-name{
                    font-size: 22px;
                    margin-bottom: 15px;
                    font-weight: lighter;
                    &:hover{
                        color: nth($default-color, 1);
                    }
                }
                .activity-content {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 25px;
                    line-height: 20px;
                    min-height: 40px;
                }
                .activity-time,.people{
                    color: #626262;
                    i{
                        margin-right: 10px;
                    }
                }
                .people {

                }
            }
        }
        li:first-child{
            padding-top: 0;
            .join-in{
                top: 0;
            }
        }
    }
}
.status-box{
    width: 96px;
    margin-top: 74px;
    .stop{
        width: 96px;
        height: 32px;
        border: 1px solid nth($default-color, 1);
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
        line-height: 32px;
        color: nth($default-color, 1);
        text-align: center;
    }
    // 立即参加
    .join-in{
        right: 0px;
        .join-now{
            width: 96px;
            height: 32px;
            padding: 0;
            border:1px solid nth($default-color, 1);
            box-sizing: border-box;
            border-radius: 3px;
            text-align: center;
            color: nth($default-color, 1);
            line-height: 32px;
            .btn{
                background-color: nth($default-color, 1);
            }
        }
        .dialog-box{
            border-top: 2px solid nth($default-color, 1);
            .tips{
                text-align: right;
                width: 100%;
                line-height: 15px;
                font-size: 12px;
                margin-bottom: 5px;
            }
        }
    }
    .join-in:hover{
        color: #fff;
        .join-now{
            background-color: nth($default-color, 1);
            color: #fff!important;
        }
    }
}
</style>

<style lang="scss">
    #activity_list{
        .el-dialog{
            width: 476px;
        }
    }
</style>