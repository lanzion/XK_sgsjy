<template>
    <div class="container detail entInvInvorgMulDetail">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path, query: $route.query }" :key="index" >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="clearfix">
        <!-- 左侧内容 -->
        <section class="l_content fl">
            <div class="infor p15 bgc_w">
                <div class="bg-img__wrap infor_img fl" :style="{ backgroundImage: `url(${getFileUrl(detailData.face) || listDefault})` }"></div>
                <!-- <img :src="getFileUrl(detailData.face) || listDefault" class="infor_img" /> -->
                <div class="infor_content fr">
                    <h2 class="title"> <span :title="detailData.name">{{ detailData.name | textOverflow(16) }}</span> <span class="fr focus" :class="{ 'hasFollowed': hasFollowed }" @click="handleFollow(detailData.userId, hasFollowed)"><i class="icon-btn-concern"></i> {{ hasFollowed ? '已关注' : '关注' }} </span></h2>
                    <p><i class="icon-i-card"></i> 身份: {{ identity }} </p>
                    <p class="infor_address" :title="detailData.address">
                        <i class="icon-i-address"></i>
                        地址: {{ detailData.address || '暂无地址' }}
                    </p>
                </div>
                <div class="btn-group" v-if="loginIdentity && !isMultSpace">
                    <button type="button" class="infor_btn" v-if="inviteStatus === 0" @click="inviteDialog.show = true"> 邀请入驻 </button>
                    <button type="button" class="infor_btn" v-else-if="inviteStatus === 3" @click="openTips(inviteStatus)"> 申请已拒绝 </button>
                    <button type="button" class="infor_btn" v-else-if="inviteStatus === 6" @click="openTips(inviteStatus)"> 邀请已拒绝 </button>
                    <button type="button" class="gray_btn" v-else> {{memberType[inviteStatus]}} </button>
                </div>
                <div class="btn-group" v-else-if="isMultSpace">
                    <button type="button" class="infor_btn" v-if="inviteStatus === 0 || inviteStatus === null" @click="ifLogin('applyPopup')"> 申请入驻 </button>
                    <button type="button" class="infor_btn" v-else-if="inviteStatus === 3" @click="openTips(inviteStatus)"> 申请已拒绝 </button>
                    <button type="button" class="infor_btn" v-else-if="inviteStatus === 6" @click="openTips(inviteStatus)"> 邀请已拒绝 </button>
                    <button type="button" class="gray_btn" v-else> {{memberType[inviteStatus]}} </button>
                </div>
            </div>
            <!-- 简介 -->
            <div class="introduction p15 bgc_w mb20">
                <h2 class="title">简介</h2>
                <p style="line-height:1.5; margin-top:10px;text-indent:2em;">{{ detailData.introduction }}</p>
            </div>
            <!-- 活动 -->
            <div class="activity bgc_w mb20">
                <h2 class="title">活动展示</h2>
                    <list class="prf15" v-bind="{ items: activity, listData:{ col:3, pathUrl: '/space/activity/details', params: {names: 'id', val: 'id'} } }">
                        <template scope="props">
                            <figure class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                                <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
                            </figure>
                            <div class="about">
                                <h6 class="list-item-title ellipsis">{{props.item.title || '暂无名称' | textOverflow(13)}}</h6>
                                <p class="info-group">
                                    <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectNum || 0}}</span>
                                    <span class="info-item" title="评论"><i class="icon-i-reply"></i> {{props.item.commentNum || 0}}</span>
                                    <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{props.item.browseNum || 0}}</span>
                                </p>
                                <p class="dead-line">报名截止：{{props.item.stopDate | dateFormat('yyyy-MM-dd')}}</p>
                            </div>
                        </template>
                    </list>
            </div>
            <!-- 课程 -->
            <div class="courses bgc_w mb20">
                <h2 class="title">课程展示</h2>
                <list class="prf15" :listData="{ col:3, pathUrl: '/education/course/detail', params: {names: 'id', val: 'id'} }" :items.sync="courses">
                    <template scope="props">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" width="285" height="206"> -->
                        </div>
                        <div class="about">
                            <h6 class="list-item-title clearfix">
                                <span class="name fl ellipsis">{{props.item.name || '暂无课程名称' | textOverflow(13)}}</span>
                                <span class="score fr">{{props.item.score || 0}}分</span>
                            </h6>
                            <p class="other-info clearfix">
                                <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span>
                                <span class="num fr">{{props.item.num || 0}}人学习</span>
                            </p>
                        </div>
                    </template>
                </list>
            </div>
            <!-- 项目 -->
            <div class="courses bgc_w mb20">
                <h2 class="title">项目展示</h2>
                <list class="prf15" :listData="{ col:3, pathUrl: '/education/project/detail', params: {names: 'id', val: 'id'} }" :items.sync="project">
                    <template scope="props">
                        <div class="bgc_w">
                            <div class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.imgUrl) || listDefault})` }"></div>
                                <!-- <img :src="getFileUrl(props.item.imgUrl) || listDefault" /> -->
                            </div>
                            <h6 class="list-item-title">{{ props.item.name | textOverflow(13) }} </h6>
                            <ul class="cols-list list-item-count clearfix">
                                <li class="cols-item icon-i-time">
                                    {{props.item.startDate | dateFormat('yyyy-MM-dd')}}
                                    <span class="fr icon-i-person"> {{props.item.currNum}}/{{props.item.totalNum}}</span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </list>
            </div>
            <!-- 服务 -->
            <div class="courses bgc_w service mb20">
                <h2 class="title">服务展示</h2>
                <ul v-if="service.length">
                    <li v-for="(item, i) in service" class="section-group__item clearfix">
                        <figure class="pic fl">
                            <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(item.cover) || listDefault" alt="" class="img" width="160" height="100"> -->
                        </figure>
                        <div class="section-group__item-main fl">
                            <h5 class="name ellipsis">
                                <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                            </h5>
                            <p class="info">
                                <span class="info-item">类别：{{item.category | translate(serviceCategory, {key: 'id'})}}</span>
                                <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                                <br>
                                <span class="info-item">发布人：{{item.createName || item.userName || '暂无'}}</span>
                                <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                            </p>
                        </div>
                        <div class="operate fr">
                            <router-link :to="{path: '/street/lagou/detail/1', query: {id: item.id}}" class="btn-detail">详情</router-link>
                        </div>
                    </li>
                </ul>
                <div class="empty-block" v-else></div>
            </div>
            <!-- 需求 -->
            <div class="courses bgc_w demand mb20">
                <h2 class="title">需求展示</h2>
                <ul v-if="service.length">
                    <li v-for="(item, i) in demand" class="section-group__item clearfix">
                        <figure class="pic fl">
                            <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(item.cover) || listDefault" alt="" class="img" width="160" height="100" /> -->
                        </figure>
                        <div class="section-group__item-main fl">
                            <h5 class="name ellipsis">
                                <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                            </h5>
                            <p class="info">
                                <span class="info-item">类别：{{item.category | translate(serviceCategory, {key: 'id'})}}</span>
                                <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                                <br>
                                <span class="info-item">发布人：{{item.createName || item.userName || '暂无'}}</span>
                                <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                            </p>
                        </div>
                        <div class="operate fr">
                            <router-link :to="{path: '/street/lagou/detail/2', query: {id: item.id}}" class="btn-detail">详情</router-link>
                        </div>
                    </li>
                </ul>
                <div class="empty-block" v-else></div>
            </div>
        </section>
        <!-- 右侧边栏 -->
        <aside class="r_content fr">
            <div class="information mb20 bgc_w">
                <h2 class="title">最新资讯</h2>
                <ul class="information_ul" v-if="information.length">
                    <li class="information_li p15 clearfix" v-for="(i, k) in information">
                        <router-link :to="{path:infoDetailPath,query:{id:$route.query.id,infoId:i.id}}">
                            <div class="bg-img__wrap img fl" :style="{ backgroundImage: `url(${getFileUrl(i.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(i.cover) || listDefault" class="img fl" /> -->
                            <div class="content">
                                <p :title="i.content | handleWorksDesc(9999)"> {{ i.content | handleWorksDesc(15) }} </p>
                                <time class="time"> {{ i.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </time>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div class="empty-block" v-else style="line-height: 36;">暂无资讯</div>
            </div>
            <div class="focus mb20 bgc_w">
                <h2 class="title">Ta的关注</h2>
                <ul class="information_ul" v-if="focus.length">
                    <li class="information_li p15 clearfix" v-for="(i, k) in focus">
                        <router-link :to="dynamicPath(i)">
                            <img :src="getFileUrl(i.face) || faceDefault" class="img_r fl">
                            <div class="content">
                                <p> {{ i.userName | handleWorksDesc(15) }} </p>
                                <time class="time"> {{ i.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </time>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div class="empty-block" v-else style="line-height: 36;">暂无关注</div>
            </div>
        </aside>
        </div>
        <!-- 邀请弹框 -->
        <invite-dialog :inviteDialog.sync="inviteDialog" :userId="detailData.userId" @callback="changeStatus"></invite-dialog>
        <!-- 申请弹框 -->
        <el-dialog title="申请入驻" :visible.sync="applyPopup" size="tiny">
            <el-form :model="applyForm" :rules="applyRules" ref="applyForm" label-width="100px">
                <el-col :span="16">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input v-model="applyForm.linkMan" placeholder="请输入联系人" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="联系电话" prop="mobile">
                        <el-input v-model="applyForm.mobile" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="入驻说明" prop="content">
                        <el-input v-model="applyForm.content" placeholder="请输入入驻说明(100字以内)" type="textarea" resize="none" :rows="3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22" class="mb20">
                    <el-form-item label="商业策划书" prop="businessPlan">
                        <el-checkbox-group v-model="applyForm.businessPlan"></el-checkbox-group>
                        <el-upload class="upload-demo" action :file-list="applyForm.businessPlan" :on-remove="handleRemove" :before-upload="UploadFile" :disabled="!loadingUpload">
                            <el-button type="primary" style="border-radius: .2em;">浏览...</el-button>
                            <span slot="tip" class="upload-tip"> 上传多个文件，单个文件大小在{{standardFileSize}}M以内</span>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="22" class="mb20">
                    <button class="sure fr button" @click.prevent="addApply">确定</button>
                    <button class="cancel fr button" @click.prevent="applyPopup = false">取消</button>
                </el-col>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import inviteDialog from '@/components/common/popupWindow/invite_dialog.vue'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import { enterpriseDetail, investorDetail, investOrgDetail, multDetail, requestInformationList } from '@/service/space_enterprise.js';
import { requestAddInvite, requestAddApply } from '@/service/space_multSpace.js';
import { requestActivityFrontendList } from '@/service/activity.js';
import { requestFrontendList } from '@/service/course.js';
import { projectList } from '@/service/project.js';
import { requestFrontendRequirementList } from '@/service/requirement.js'
import { serviceAuditList } from '@/service/service.js'
import { mapState, mapActions } from 'vuex'
import { groupFollow, queryHasFollowedORNot, cancelSingleFollowing } from '@/service/common.js'
import { follow } from '@/mixin/teacherAndStudent.js'
import { focusList, addVisitor } from '@/service/my.js'
import { judgeMultMember } from '@/service/mult.js'

export default {
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        }
        return {
            loadingUpload: true,
            items: [],
            identity: '',
            requestEnterpriseList: '',
            paramsId: this.$route.query.id,
            detailData: {},
            activity: [],
            courses: [],
            project: [],
            service: [],
            demand: [],
            information: [],
            focus: [],
            listData: {
                col: 3,
                pathUrl: '/space/activity/details',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            hasFollowed: false,
            loginIdentity: this.$ls.get('userIdentity') === 'mult',
            isMultSpace: this.$route.path.split('/')[1] === 'multSpace',
            inviteDialog: {
                show: false
            },
            applyPopup: false,
            applyForm: {
                linkMan: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.userName : '',
                mobile: null,
                content: '',
                businessPlan: []
            },
            applyRules: {
                linkMan: [
                    { required: true, message: '请填写联系人', trigger: 'change' },
                    { max: 20, message: '不超过20个字符', type: 'string' }
                ],
                mobile: { required: true, validator: validatePhone, trigger: 'change' },
                content: [
                    { required: true, message: '请输入入驻说明', trigger: 'change' },
                    { max: 100, message: '不超过100字符', trigger: 'change' }
                ],
                businessPlan: { required: true, message: '请上传商业策划书', type: 'array' },
            },
            fileSize: 10,
            infoDetailPath:'',       //跳转资讯详情页路劲
            inviteStatus: null,          //判断邀请入驻状态
            memberType: {
                '1': '已申请',
                '2': '已入驻',
                '4': '邀请中',
                '5': '已同意',
                '7': '已是成员'
            },
            hadLogin: false // 是否登录
        }
    },
    mixins: [ follow, uploadFileSize ],
    beforeRouteEnter (to, from, next) { // 如果是学生/本人的话，进入自己的个人后台空间
      const loginUId = JSON.parse(localStorage.getItem('baseInfo'))
      loginUId && loginUId.baseInfo.id === to.query.id ? next('/admin/dynamic') : next()
    },
    created() {
        if (this.$ls.get('loginInfo')) {
            this.hadLogin = true
        }
    },
    methods: {
        ...mapActions('dictionaryCommon', ['getDictComb']),
        analysisPath () {
            let path = this.$route.path.split('/')[1]
            if(path == 'enterprise') {
                this.infoDetailPath = '/enterprise/infoDetail'
                this.$set(this.items, 0, { path: '/enterprise', title: '企业' })
                this.identity = '企业'
                enterpriseDetail({id: this.paramsId}).then(res => {
                    this.getDateilChange (res)
                })
            }else if (path == 'investor') {
                this.infoDetailPath = '/investor/infoDetail'
                this.$set(this.items, 0, { path: '/investor', title: '投资人' })
                this.identity = '投资人'
                investorDetail({id: this.paramsId}).then(res => {
                    this.getDateilChange (res)
                })
            }else if (path == 'investOrg') {
                this.infoDetailPath = '/investOrg/infoDetail'
                this.$set(this.items, 0, { path: '/investOrg', title: '投资机构' })
                this.identity = '投资机构'
                investOrgDetail({id: this.paramsId}).then(res => {
                    this.getDateilChange (res)
                })
            }else if (path == 'multSpace') {
                this.infoDetailPath = '/multSpace/infoDetail'
                this.$set(this.items, 0, { path: '/multSpace', title: '众创空间' })
                this.identity = '众创空间'
                multDetail({id: this.paramsId}).then(res => {
                    this.getDateilChange (res)
                })
            }
        },
        getDateilChange (res) {
            if(res.data.code == 200) {
                this.detailData = res.data.entity
                this.$set(this.items, 1, { title: this.detailData.name  })
                if(this.$ls.get('loginInfo')){
                    let params = {
                        toUserId: this.detailData.userId,
                        userId: this.$ls.get('loginInfo').userInfo.id
                    };
                    addVisitor(params).then(res => {})
                }
                focusList ({ followUser: res.data.entity.userId }, {pageNum: 1, pageSize: 5}).then(res => {
                    this.moduleChange(res, 'focus')
                })
                this.queryHasFollowedORNot()
                this.judgeMultMember()
            }else {
                this.$message({message: res.data.msg})
            }
        },
        handleIsFree(i) { // 处理费用类型
            let o = {1: '免费', 0: '收费'}
            return o[i]
        },
        moduleChange (res, module) {
            if(res.data.code == 200) {
                this[module] = res.data.entity.resultData
            }else {
                this.$message({message: res.data.msg})
            }
        },
        // 查询是否关注
        queryHasFollowedORNot () {
            const loginUId = this.$ls.get('loginUId')
            queryHasFollowedORNot({
                followUser: loginUId,
                followedUserId: this.detailData.userId,
            }).then(res => {
                if (res.data.code === 200) {
                    this.hasFollowed = res.data.entity || false // true已关注
                }
            })
        },
        // 关注、取消关注
        handleFollow (followedUId, hasFollowed) {
            this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
                if (res) {
                    this.queryHasFollowedORNot()
                }
            })
        },
        // 添加申请
        addApply () {
            this.$refs['applyForm'].validate((valid) => {
                if (valid) {
                    let param = { multId: this.paramsId, applyId: this.$ls.get('loginUId'), linkMan: this.applyForm.linkMan, mobile: this.applyForm.mobile, content: this.applyForm.content, businessPlan: this.applyForm.businessPlan[0].url }
                    requestAddApply (param).then(res => {
                        if(res.data.code === 200) {
                            this.judgeMultMember()
                            this.$message({type:'success', message: '申请成功'})
                        }else {
                            this.$message({ message: res.data.msg })
                        }
                        this.applyPopup = false
                        this.$refs['applyForm'].resetFields()
                    })
                }else {
                    this.$message('请按规则填写完整')
                    return false;
                }
            })
        },
        UploadFile (file, fileList) {
            this.loadingUpload = false
            const fileSize = file.size,
                  _this = this
            if (fileSize < (_this.standardFileSize * 1024 * 1024) && !this.loadingUpload) {
                const _this = this
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if (res.code === 200) {
                        _this.applyForm.businessPlan = [{ name: file.name, url: res.appendInfo.resourceId }]
                        _this.loadingUpload = true
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                _this.applyForm.businessPlan.splice(_this.applyForm.businessPlan.length, 1)
                _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                uploader.cancelFile(file)
            }
        },
        handleRemove(file, fileList) {
            this.applyForm.businessPlan = []
        },
        // 登录提示
        ifLogin(stauts) {
            if(this.$ls.get('loginInfo')) {
                this.$set(this.$data, stauts, true)
            }else {
                this.$store.commit('toggleLoginModal',true)
            }
        },
        /*众创空间用户登录时查看其它用户空间时，判断当前查看的用户入驻情况*/
        judgeMultMember () {
            if (this.loginIdentity && !this.isMultSpace) {
                judgeMultMember({ id: this.$ls.get('baseInfo').baseInfo.id, userId: this.detailData.userId }).then((res) => {
                    if (res.data.code === 200) {
                        this.inviteStatus = res.data.entity
                    }
                })
            } else if (this.$ls.get('loginUId') && !this.loginIdentity && this.isMultSpace) {
                judgeMultMember({ id: this.detailData.id, userId: this.$ls.get('loginUId') }).then((res) => {
                    if (res.data.code === 200) {
                        this.inviteStatus = res.data.entity
                    }
                })
            }
        },
        // 拒绝后的提示
        openTips(status) {
            const tips = status == 3 ? '申请' : '邀请'
            this.$confirm(`${tips}入驻已被拒绝, 是否再次${tips}?`, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            }).then(() => {
                if (status == 3) {
                    this.ifLogin('applyPopup')
                } else {
                    this.inviteDialog.show = true
                }
            }).catch(() => {
            });
        },
        //邀约成功后改变状态
        changeStatus() {
            this.inviteStatus = 4
        }
    },
    mounted() {
        this.analysisPath()
        this.getDictComb('serveCategory')
        // 活动
        requestActivityFrontendList({ orgId: this.paramsId }, {pageNum: 1, pageSize: 6}).then (res => {
            this.moduleChange(res, 'activity')
        })
        // 课程
        requestFrontendList({ orgId: this.paramsId, pageNum: 1, pageSize: 6 }).then (res => {
            this.moduleChange(res, 'courses')
        })
        // 项目
        projectList({ orgId: this.paramsId }, {pageNum: 1, pageSize: 6}).then (res => {
            this.moduleChange(res, 'project')
        })
        // 服务
        serviceAuditList({auditStatus: 1, orgId: this.paramsId }, {pageSize: 4, pageNum: 1}).then(res => {
            this.moduleChange(res, 'service')
        })
        // 需求
        requestFrontendRequirementList({ orgId: this.paramsId, pageSize: 4, pageNum: 1 }).then(res => {
            this.moduleChange(res, 'demand')
        })
        requestInformationList({ orgId: this.paramsId, pageNum: 1, pageSize: 5 }).then(res => {
            this.moduleChange(res, 'information')
        })
    },
    components: {
        list,
        inviteDialog
    },
    computed: {
        ...mapState('dictionaryCommon', {
            serviceCategory: state => (state.serveCategoryDicList || {}).dicList || []
        })
    },
    filters: {
        handleWorksDesc (txt = '', len = 50, sep = '...') {
            let reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>

<style lang="scss">
    .entInvInvorgMulDetail {
        .el-dialog {
            width: 590px;
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
$Red: #D00;
.p15 {
    padding: 15px;
    box-sizing: border-box;
}
.prf15 {
    padding-left: 15px;
    padding-right: 15px;
}
.mb20 {
    margin-bottom: 20px;
}
.button {
    padding: 10px 15px;
    white-space: nowrap;
    border: 1px solid $Red;
}
.sure {
    background-color: $Red;
    color: #fff;
    &:hover {
        border: 1px solid $Red;
        color: #fff;
    }
}
.cancel {
    margin-right: 15px;
    color: #D00;
    &:hover {
        border: 1px solid $Red;
        color: $Red;
    }
}
.more {
    font-size: 14px;
    color: #D00;
}
.l_content, .r_content {
    font-size: 14px;
    .activity, .courses, .information, .focus {
        .title {
            font-size: 1.14em;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            text-indent: 1em;
        }
    }
}
.l_content {
    width: 906px;
    .infor {
        position: relative;
        height: 210px;
        .infor_img {
            width: 30%;
            height: 100%;
        }
        .infor_content {
            width: 68%;
            .title {
                height: 80px;
                line-height: 80px;
                font-size: 1.828em;
                .focus {
                    margin-right: 20px;
                    font-size: 14px;
                    color: #999;
                    cursor: pointer;
                    &:hover{
                        color: #d00;
                    }
                }
            }
            p {
                color: #626262;
                height: 50px;
                line-height: 50px;
                font-size: 1.14em;
            }
            .infor_address {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
        .btn-group {
            position: absolute;
            right: 15px;
            top: 90px;
            .infor_btn {
                width: 96px;
                height: 32px;
                background-color: #D00;
                color: #fff;
                text-align: center;
                border-radius: .5em;
                &:hover{
                    opacity: 0.75;
                }
            }
            .gray_btn {
                width: 96px;
                height: 32px;
                border: none;
                border-radius: .5em;
                background-color: #afb2b7;
                color: #fff;
                cursor: no-drop;
            }
        }
    }
    .introduction {
        margin-top: 20px;
        min-height: 100px;
        .title {
            font-size: 1.628em;
        }
    }
    .activity, .courses {
        .cols-list {
            font-size: 14px;
        }
        .other-info {
            line-height: 1;
            font-size: 12px;
            .free-or-not {
                color: #2bbb61;
            }
        }
        .score {
            display: inline-block;
            font-size: 12px;
            color: #fd8c88;
        }
    }
}
.r_content {
    width: 275px;
    .information, .focus {
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
}
.activity {
    #list {
        margin-top: 10px;
        &.has-no-data {
            margin-bottom: 40px;
            font-size: 0;
        }
    }
    .list-item__box {
        font-size: 14px;
        &:hover .list-item-title {
            color: $Red;
        }
        .list-item-img {
            display: block;
        }
        .list-item-title {
            line-height: 1.5;
            margin-top: 10px;
            margin-bottom: 8px;
        }
        .about {
            border: 1px solid #e0e0e0;
            padding: 0 14px 10px;
            overflow: hidden;
            background-color: #fff;
            .line-info {
                line-height: 20px;
                margin-top: 10px;
            }
            &.no-border {
                border: 0;
            }
        }
        .info-group {
            color: #999;
            .info-item {
                font-size: 14px;
            }
            .info-item + .info-item {
                margin-left: 20px;
            }
        }
        .dead-line {
            line-height: 20px;
            margin-top: 10px;
            padding-top: 10px;
            font-size: 14px;
            color: #999;
            border-top: 1px solid #e0e0e0;
        }
        .desc {
            height: 32px;
            line-height: 1.2;
            margin-top: 8px;
            font-size: 14px;
            color: #999;
        }
    }
}
.service, .demand {
    .section-group__item-content {
        box-sizing: border-box;
        padding: 0 12px;
    }
    .section-group__item {
        box-sizing: border-box;
        height: 122px;
        padding: 10px;
        border: 1px solid #fff;
        border-bottom-color: #d2d2d2;
    }
    .pic {
        width: 160px;
        height: 100px;
        .img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .section-group__item-main {
        width: 60%;
        padding: 12px 20px;
        .name {
            line-height: 1.5;
            .link {
                color: #fe7545;
                cursor: default;
            }
        }
        .info-item {
            display: inline-block;
            box-sizing: border-box;
            width: 35%;
            line-height: 1.6;
            padding-right: 20px;
            color: #626262;
        }
    }
    .light-red {
      color: #fe7545;
    }
    .btn-detail {
        display: block;
        width: 96px;
        height: 38px;
        line-height: 38px;
        margin-bottom: 12px;
        text-align: center;
        color: #fff;
        background-color: #3fa1e8;
        padding: 0;
        border-radius: 4px;
    }
}
.hasFollowed {
    color: #d00 !important;
    .icon-btn-concern {
        color: #d00 !important;
        &:hover {
            color: #999;
        }
    }
}
</style>
