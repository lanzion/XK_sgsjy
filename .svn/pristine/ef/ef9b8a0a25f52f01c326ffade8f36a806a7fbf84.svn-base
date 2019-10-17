<template>
    <div class="wrap space container">
        <div class="banner" :style="{ 'background-image': `url(${background})` }"></div>
        <!-- <ul class="nav bgw table-layout">
            <li class="nav_item table-cell" v-for="(i, k) in nav" @click="scrollToTop(i.id)">
                <span class="nav_item_round" :class="i.className"></span>
                <div class="nav_item_title">
                    <p>{{ i.name }}</p>
                    <p class="nav_item_title_introduction">{{ i.introduction }}</p>
                </div>
            </li>
        </ul> -->
        <h1 class="space_title" id="maker">
            创客
            <ul class="space_title_ul">
                <li v-for="(i, k) in makerNav" class="space_title_li" @click="getMakerList(i.model, k)" :class="{ active: makerIndex === k }">{{ i.name }}</li>
            </ul>
            <a class="more fr" @click="redirect(makerGoList, { type: 6 })">更多>></a>
        </h1>
        <el-row class="maker_ul" v-if="makerList.length">
            <el-col v-for="(i, k) in makerList" :span="8" :key="k">
                <div class="maker_li bgw">
                    <div class="maker_li_personal clearfix" @click="goToPersonSpace(i)">
                        <span class="maker_li_personal_face circle fl" :style="{'background-image': `url(${i.cover || makerNav[makerIndex].icon})`}"></span>
                        <div class="maker_li_personal_msg fl">
                            <p class="maker_li_personal_msg_name">{{ i.teacherName || i.studentName }} ({{ makerIndex | makerFilter }})</p>
                            <p class="maker_li_personal_msg_school">{{ i.schoolName }}</p>
                        </div>
                    </div>
                    <p class="maker_li_introduction" :title="i.sign">
                        {{ i.sign | handleHtmlDesc(60) }}
                    </p>
                    <ul class="maker_li_countsUl table-layout">
                        <li class="maker_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <p class="maker_li_countsLi_num">{{ m.value }}</p>
                            <p class="maker_li_countsLi_name">{{ m.name }}</p>
                        </li>
                    </ul>
                    <div class="maker_li_func">
                        <button type="button" class="maker_li_func_focus" @click.stop="handleFollow(i.userId, !!i.isAttention, i)">{{ !i.isAttention ? '关注' : '已关注' }}</button>
                        <button type="button" class="maker_li_func_message" @click.stop="showPrivateLetterDialog(i.userId)">私信</button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block bgc_w" v-else>暂无数据</div>
        <h1 class="space_title" id="space">
            空间
            <ul class="space_title_ul">
                <li v-for="(i, k) in spaceNav" class="space_title_li" @click="getSpaceList(i.model, k)" :class="{ active: spaceIndex === k }">{{ i.name }}</li>
            </ul>
            <a class="more fr" @click="redirect(spaceGoList, { type: 6 })">更多>></a>
        </h1>
        <el-row class="space_ul" :gutter="20" v-if="spaceList.length">
            <el-col v-for="(i, k) in spaceList" :span="6" :key="k">
                <div class="space_li bgw" @click="spaceJump(i)">
                    <div class="space_li_face circle" :style="{'background-image': `url(${i.cover || spaceNav[spaceIndex].icon})`}"></div>
                    <div class="space_li_msg" v-if="spaceIndex === 0 || spaceIndex === 1">
                        <p class="space_li_name">
                            {{ i.eduName || i.schoolName }}
                        </p>
                    </div>
                    <div class="space_li_msg" v-else-if="spaceIndex === 2 || spaceIndex === 3">
                        <p class="space_li_name">{{ i.className || i.name }}</p>
                        <p class="space_li_parent">{{ i.schoolName }}</p>
                    </div>
                    <p class="space_li_introduction" :title="i.introduction || i.remark">
                        {{ (i.introduction || i.remark) | handleHtmlDesc(50) }}
                    </p>
                    <ul class="space_li_countsUl table-layout">
                        <li class="space_li_countsLi table-cell" v-for="(m, n) in i.counts" :style="{ width: 100 / i.counts.length + '%'}">
                            <span class="space_li_countsLi_name">{{ m.name || 0 }}</span>
                            <span class="space_li_countsLi_num">{{ m.value || 0 }}</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block bgc_w" v-else>暂无数据</div>
        <!-- <h1 class="space_title" id="mentor">
            导师工作室
            <a class="more fr" @click="redirect(pages.list.studio, { type: 6 })">更多>></a>
        </h1>
        <ul class="mentor_ul" v-if="mentorList.length">
            <li v-for="(i, k) in mentorList" class="mentor_li bgw clearfix" @click.prevent="redirect(pages.detail.studio, { query: { id: i.id } })">
                <div class="mentor_li_box1 fl">
                    <div class="mentor_li_box1_face circle" :style="{'background-image': `url(${i.cover || studioDefault})`}"></div>
                    <button type="button" class="mentor_li_box1_apply" @click.stop="opensayVisible(i.id)" v-if="loginUserId !== i.createId">申请加入</button>
                    <button type="button" class="mentor_li_box1_apply" @click.stop="redirect(pages.detail.studio, { query: { id: i.id } })" v-else>进入</button>
                </div>
                <div class="mentor_li_box2 fl">
                    <p class="mentor_li_box2_name">{{ i.name }}</p>
                    <p class="mentor_li_box2_address">{{ i.provinceName ? i.provinceName : '' }}{{ i.cityName ? i.cityName : '' }}{{ i.areaName ? i.areaName : '' }}</p>
                    <ul class="maker_li_countsUl table-layout" style="margin: 30px 0 20px -20px;">
                        <li class="maker_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <p class="maker_li_countsLi_num">{{ m.value }}</p>
                            <p class="maker_li_countsLi_name">{{ m.name }}</p>
                        </li>
                    </ul>
                    <p class="mentor_li_introduction" :title="i.introduction">
                        {{ i.introduction | handleHtmlDesc(50) }}
                    </p>
                </div>
                <div class="mentor_li_box3 fl">
                    <ul class="mentor_li_box3_ul">
                        <li class="mentor_li_box3_li bg-img__wrap" :style="{ 'background-image': `url(${ (i.classRoomList[0] ? i.classRoomList[0].cover : null) || listDefault })`}">
                            <div class="icon-btn-play" v-if="i.classRoomList[0]" @click.stop="redirect(pages.detail.studioMicroClass, { query: { id: i.classRoomList[0] ? i.classRoomList[0].id : null } })">
                                <span class="mentor_li_box3_li_title">{{ (i.classRoomList[0] ? i.classRoomList[0].name : null) | handleHtmlDesc(15) }}</span>
                            </div>
                        </li>
                        <li class="mentor_li_box3_li bg-img__wrap" :style="{ 'background-image': `url(${ (i.classRoomList[1] ? i.classRoomList[1].cover : null) || listDefault })`}">
                            <div class="icon-btn-play" v-if="i.classRoomList[1]" @click.stop="redirect(pages.detail.studioMicroClass, { query: { id: i.classRoomList[1] ? i.classRoomList[1].id : null } })">
                                <span class="mentor_li_box3_li_title">{{ (i.classRoomList[1] ? i.classRoomList[1].name : null) | handleHtmlDesc(15) }}</span>
                            </div>
                        </li>
                        <li class="mentor_li_box3_li bg-img__wrap" :style="{ 'background-image': `url(${ (i.classRoomList[2] ? i.classRoomList[2].cover : null) || listDefault })`}">
                            <div class="icon-btn-play" v-if="i.classRoomList[2]" @click.stop="redirect(pages.detail.studioMicroClass, { query: { id: i.classRoomList[2] ? i.classRoomList[2].id : null } })">
                                <span class="mentor_li_box3_li_title">{{ (i.classRoomList[2] ? i.classRoomList[2].name : null) | handleHtmlDesc(15) }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="empty-block bgc_w" v-else>暂无数据</div>
        <h1 class="space_title" id="model">
            创客示范校
            <a class="more fr" @click="redirect(pages.list.model, { type: 6 })">更多>></a>
        </h1>
        <el-row class="space_ul model" :gutter="20"v-if="modelList.length">
            <el-col v-for="(i, k) in modelList" :span="6" :key="k">
                <div class="space_li bgw" @click="redirect(pages.detail.model, { query: { id: i.id } })">
                    <div class="space_li_face circle" :style="{'background-image': `url(${i.cover || schoolDefault})`}"></div>
                    <div class="space_li_msg" v-if="spaceIndex === 0 || spaceIndex === 1">
                        <p class="space_li_name">
                            {{ i.eduName || i.schoolName }}
                        </p>
                    </div>
                    <p class="space_li_introduction" :title="i.introduction">
                        {{ i.introduction | handleHtmlDesc(40) }}
                    </p>
                    <ul class="model_li_countsUl table-layout">
                        <li class="model_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <p class="model_li_countsLi_num">{{ m.value }}</p>
                            <p class="model_li_countsLi_name">{{ m.name }}</p>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block bgc_w" v-else>暂无数据</div> -->
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
        <el-dialog title="说点什么" :visible.sync="sayVisible" size="tiny">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="say" resize="none"> </el-input>
            <div class="btn_group">
                <button type="button" class="maker_li_func_message" @click="sayVisible = false;say = ''">取消</button>
                <button type="button" class="maker_li_func_focus" @click="apply">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import background from '@/assets/img/index/space_banner.png'
import { requestRecoTeacher, requestRecoStudent, requestRecoEdu, requestRecoSchool, requestRecoClasz, requestRecoInterest, requestRecoModel, requestRecoStudio, addMemberApply } from '@/service/space.js'
import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'
import sendPrivateLetter from '@/components/common/send_private_letter_dialog.vue'

export default {
    mixins: [follow, privateLetter],
    data() {
        return {
            dialog: {
                addresseeId: '', // 私信收信人
                isVisible: false
            },
            // banner
            background: background,
            // 锚点
            // nav: [
            //     { className: 'icon-i-maker', name: '创客', introduction: '优秀创客', id: 'maker' },
            //     { className: 'icon-i-space2', name: '空间', introduction: '优秀空间', id: 'space' },
            //     { className: 'icon-i-studio', name: '导师工作室', introduction: '导师校园创客', id: 'mentor' },
            //     { className: 'icon-i-modelschool', name: '创客示范校', introduction: '示范校', id: 'model' }
            // ],
            // 创客nav
            makerNav: [
                { name: '教师', model: requestRecoTeacher, icon: this.faceDefault },
                { name: '学生', model: requestRecoStudent, icon: this.studentDefault },
                // { name: '机构创客', model: 'institutions' },
                // { name: '社会创客', model: 'social' }
            ],
            // 创客数据
            makerList: [],
            // 创客跳转列表
            makerGoList: '',
            // 创客跳转闲详情
            makerGoDetail: '',
            // 当前创客nav
            makerIndex: 0,
            // 空间nav
            spaceNav: [
                { name: '教育局', model: requestRecoEdu, icon: this.eduDefault },
                { name: '学校', model: requestRecoSchool, icon: this.schoolDefault },
                { name: '班级', model: requestRecoClasz, icon: this.classDefault },
                { name: '兴趣组', model: requestRecoInterest, icon: this.classDefault }
            ],
            // 当前空间nav
            spaceIndex: 0,
            // 创客数据
            spaceList: [],
            // 创客跳转列表
            spaceGoList: '',
            // 创客跳转闲详情
            spaceGoDetail: '',
            // 示范校数据
            modelList: [],
            // 导师工作室数据
            mentorList: [],
            hadLogin: false,
            userId: '',
            loginIfTeacher: false,
            sayVisible: false,
            say: '',
            sayId: '',
            loginUserId: this.$ls.get('loginUId')
        }
    },
    methods: {
        opensayVisible(id) {
            if (this.$ls.get('loginInfo')) {
                this.sayId = id
                this.sayVisible = true
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        apply() {
            if (this.$ls.get('userIdentity') === 'teacher') {
                addMemberApply({ studioId: this.sayId, content: this.say }).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({ type: 'success', message: '发送成功' })
                        this.$set(this.$data, 'isApply', 1)
                    } else {
                        this.$message({ message: res.data.msg })
                    }
                    this.sayVisible = false
                })
            } else {
                this.$message({
                    message: '只允许老师参加'
                })
            }
        },
        handleFollow(followedUId, hasFollowed, item) { // 教师、学生空间，关注、取消关注
            this.handleFollowOrNot(followedUId, hasFollowed).then((res) => {
                if (res) {
                    item.isAttention = !hasFollowed
                }
            })
        },
        spaceJump(i) {
            const query = {
                0: { id: i.orgId },
                1: { id: i.orgId },
                2: { id: i.orgId },
                3: { id: i.id }
            }[this.spaceIndex]
            this.redirect(this.spaceGoDetail, { query })
            // if (this.spaceIndex === 3 && i.property === 'private') {
            //     if (this.hadLogin) {
            //         judgeMember({ interestId: i.id, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
            //             const isMember = res.data.entity
            //             if (isMember) {
            //                 this.redirect(this.spaceGoDetail, { query })
            //             } else {
            //                 this.$message({
            //                     message: '私密兴趣组，非本兴趣组成员不能访问'
            //                 })
            //             }
            //         })
            //     } else {
            //         this.$message({
            //             message: '私密兴趣组,不允许访问'
            //         })
            //     }
            // } else if (this.spaceIndex === 2 && i.properties === '2') {
            //     if (this.hadLogin) {
            //         if (this.userId === i.teacherId) {
            //             this.redirect(this.pages.detail.clasz, { query: { id: i.orgId } })
            //         } else {
            //             judgeClaszMember({ classId: i.orgId, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
            //                 const isMember = res.data.entity
            //                 if (isMember) {
            //                     this.redirect(this.pages.detail.clasz, { query: { id: i.orgId } })
            //                 } else {
            //                     this.$message({
            //                         message: '私密班级，非本班级成员不能访问',
            //                         type: 'info'
            //                     })
            //                 }
            //             })
            //         }
            //     } else {
            //         this.$message({
            //             message: '私密班级,不允许访问',
            //             type: 'info'
            //         })
            //     }
            // } else {
            // }
        },
        scrollToTop(id) {
            $('html,body').animate({ scrollTop: document.getElementById(id).offsetTop - 100 }, 300)
        },
        // 创客
        getMakerList(model, index) {
            model({}, { pageNum: 1, pageSize: 6 }).then((res) => {
                if (res.data.code === 200) {
                    this.makerIndex = index
                    this.makerList = res.data.entity.resultData
                    this.makerList.forEach((i) => {
                        i.counts = [
                            { name: '作品', value: i.counts ? i.counts.productionNum : 0 },
                            { name: '课程', value: i.counts ? i.counts.coursesNum : 0 },
                            { name: '文章', value: i.counts ? i.counts.articleNum : 0 },
                            { name: '话题', value: i.counts ? i.counts.topicNum : 0 },
                            { name: '粉丝', value: i.counts ? i.counts.fansNum : 0 }
                        ]
                    })
                    if (index === 1) {
                        this.makerList.forEach((i) => {
                            i.counts.splice(1, 1)
                        })
                    }
                    this.makerGoList = [
                        this.pages.list.teacher,
                        this.pages.list.student
                    ][index]
                    this.makerGoDetail = [
                        this.pages.detail.teacher,
                        this.pages.detail.student
                    ][index]
                } else {
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },
        // 空间
        getSpaceList(model, index) {
            model({}, { pageNum: 1, pageSize: 8 }).then((res) => {
                if (res.data.code === 200) {
                    this.spaceIndex = index
                    this.spaceList = res.data.entity.resultData
                    if (index === 3) {
                        this.spaceList.forEach((i) => {
                            i.counts = [
                                { name: '创客', value: i.memberCount ? i.memberCount : 0 },
                                { name: '作品', value: i.workCount ? i.workCount : 0 },
                                { name: '话题', value: i.topicCount ? i.topicCount : 0 }
                            ]
                        })
                    } else {
                        this.spaceList.forEach((i) => {
                            i.counts = [
                                { name: '创客', value: i ? (i.memberCount || i.counts.studentNum) : 0 },
                                { name: '作品', value: i ? i.counts.productionNum : 0 }
                            ]
                        })
                    }
                    this.spaceGoList = [
                        this.pages.list.edu,
                        this.pages.list.school,
                        this.pages.list.clasz,
                        this.pages.list.interest
                    ][index]
                    this.spaceGoDetail = [
                        this.pages.detail.edu,
                        this.pages.detail.school,
                        this.pages.detail.clasz,
                        this.pages.detail.interest,
                    ][index]
                } else {
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },
        // 导师
        getMentorList() {
            requestRecoStudio({}, { pageNum: 1, pageSize: 5 }).then((res) => {
                if (res.data.code === 200) {
                    this.mentorList = res.data.entity.resultData
                    this.mentorList.forEach((i) => {
                        i.counts = [
                            { name: '创客', value: i.num ? i.num : 0 },
                            { name: '成果', value: i.resourceNum ? i.resourceNum : 0 },
                            { name: '微课', value: i.courseNum ? i.courseNum : 0 },
                            { name: '访客', value: i.browseNum ? i.browseNum : 0 }
                        ]
                    })
                } else {
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },
        // 示范校
        getModelList() {
            requestRecoModel({}, { pageNum: 1, pageSize: 8 }).then((res) => {
                if (res.data.code === 200) {
                    this.modelList = res.data.entity.resultData
                    this.modelList.forEach((i) => {
                        i.counts = [
                            { name: '创客', value: i.spaceNum ? i.spaceNum : 0 },
                            { name: '成果', value: i.resultNum ? i.resultNum : 0 },
                            { name: '特色', value: i.featureNum ? i.featureNum : 0 },
                            { name: '荣誉', value: i.honorNum ? i.honorNum : 0 }
                        ]
                    })
                } else {
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },
        // 跳转个人空间
        goToPersonSpace(i) {
            const loginUid = this.$ls.get('loginUId') || ''
            if (loginUid === i.userId) {
                this.redirect(this.pages.my)
            } else {
                this.redirect(this.makerGoDetail, { query: { id: i.orgId, uid: i.userId } })
            }
        }
    },
    mounted() {
        this.getMakerList(requestRecoTeacher, 0)
        this.getSpaceList(requestRecoEdu, 0)
        // this.getModelList()
        // this.getMentorList()
        if (localStorage.getItem('loginInfo')) {
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            this.hadLogin = true
        }
    },
    filters: {
        handleHtmlDesc(txt = '', len = 150, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            let str = '暂无'
            if (txt) {
                str = txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
            return str
        },
        makerFilter(index) {
            return ['老师', '学生', '机构创客', '社会创客'][index]
        }
    },
    components: {
        sendPrivateLetter
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.space {
    margin-bottom: 20px;
    .banner {
        height: 300px;
        background-size: 100% 100%;
    }
    .nav {
        padding: 8px;
        box-sizing: border-box;
        .nav_item {
            width: 25%;
            height: 84px;
            padding: 20px 0;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            & + .nav_item {
                border-left: 1px solid #eee;
            }
            .nav_item_round {
                $size: 48px;
                display: inline-block;
                width: $size;
                height: $size;
                border: 1px solid nth($default-color, 1);
                border-radius: 50%;
                font-size: 26px;
                line-height: $size;
                color: nth($default-color, 1);
            }
            .nav_item_title {
                display: inline-block;
                margin-left: 12px;
                font-size: 16px;
                color: #333;
                text-align: left;
                height: 100%;
                vertical-align: middle;
                .nav_item_title_introduction {
                    padding-top: 5px;
                    font-size: 14px;
                    color: #999;
                }
            }
        }
    }
    .space_title {
        margin: 40px 0 20px;
        padding-bottom: 10px;
        box-sizing: border-box;
        font-size: 24px;
        border-bottom: 1px solid #dfdfdf;
        .space_title_ul {
            display: inline-block;
            .space_title_li {
                position: relative;
                padding: 0 15px;
                display: inline-block;
                font-size: 14px;
                color: #848484;
                cursor: pointer;
                &:hover,
                &.active {
                    color: nth($default-color, 1);
                }
                & + .space_title_li::before {
                    content: '/';
                    position: absolute;
                    left: 0;
                    color: #848484;
                }
            }
        }
        .more {
            line-height: 1.5;
            font-size: 14px;
            color: #848484;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }
    .maker_ul {
        margin-right: -20px;
        .maker_li {
            width: 386px;
            height: 320px;
            padding: 15px;
            margin-bottom: 20px;
            box-sizing: border-box;
            border-radius: $box-radiu;
            transition: box-shadow .5s;
            cursor: pointer;
            &:hover {
                box-shadow: $index-box-shadow;
                .work_lis_msg_title {
                    color: #0da8ff;
                }
            }
            .maker_li_personal {
                padding: 20px 15px;
                .maker_li_personal_face {
                    width: 75px;
                    height: 75px;
                }
                .maker_li_personal_msg {
                    padding-top: 5px;
                    margin-left: 20px;
                    line-height: 1.8;
                    .maker_li_personal_msg_name {
                        font-size: 18px;
                    }
                    .maker_li_personal_msg_school {
                        font-size: 14px;
                        color: #bbb;
                    }
                }
            }
            .maker_li_introduction {
                height: 55px;
                font-size: 14px;
                word-wrap: break-word;
                line-height: 1.5;
            }
            .maker_li_func {
                height: 85px;
                line-height: 90px;
                text-align: center;
                .maker_li_func_focus, .maker_li_func_message {
                    margin: 0 15px;
                    width: 88px;
                    height: 32px;
                    border: 1px solid #dfdfdf;
                    border-radius: 5px;
                    line-height: 1;
                }
                .maker_li_func_focus {
                    background-color: nth($default-color, 1);
                    border: 1px solid nth($default-color, 1);
                    color: #fff;
                    &:hover {
                        background-color: nth($default-color, 2);
                        border-color: nth($default-color, 2);
                        color: #fff;
                    }
                }
                .maker_li_func_message {
                    &:hover {
                        border-color: nth($default-color, 1);
                        color: nth($default-color, 1);
                    }
                }
            }
            :hover {
                .maker_li_personal_msg_name {
                    color: #0da8ff;
                }
            }
        }
    }
    .space_ul {
        .space_li {
            width: 285px;
            height: 320px;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: $box-radiu;
            box-sizing: border-box;
            text-align: center;
            transition: box-shadow .5s;
            cursor: pointer;
            &:hover {
                box-shadow: $index-box-shadow;
                .space_li_name {
                    color: #0da8ff;
                }
            }
            .space_li_face {
                display: inline-block;
                width: 75px;
                height: 75px;
                margin: 15px 0;
            }
            .space_li_msg {
                height: 60px;
                .space_li_name {
                    font-size: 18px;
                }
                .space_li_parent {
                    padding-top: 10px;
                    font-size: 12px;
                    color: #bbbbbb;
                }
            }
            .space_li_introduction {
                height: 80px;
                padding: 10px 0;
                box-sizing: border-box;
                text-align: left;
                font-size: 14px;
                word-wrap: break-word;
                line-height: 1.5;
            }
        }
    }
    .mentor_ul {
        border-radius: $box-radiu;
        overflow: hidden;
        .mentor_li {
            height: 230px;
            border-bottom: 1px solid #eee;
            padding: 25px 15px;
            box-sizing: border-box;
            cursor: pointer;
            &:hover {
                .mentor_li_box2 {
                    .mentor_li_box2_name {
                        color: $theme-color;
                    }
                }
            }
            .mentor_li_box1 {
                padding: 0 15px;
                width: 110px;
                height: 100%;
                box-sizing: border-box;
                .mentor_li_box1_face {
                    display: inline-block;
                    margin: 8px 0 40px;
                    width: 80px;
                    height: 80px;
                }
                .mentor_li_box1_apply {
                    display: block;
                    width: 100%;
                    height: 35px;
                    background-color: nth($default-color, 1);
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-size: 14px;
                    &:hover {
                        background-color: nth($default-color, 2);
                    }
                }
            }
            .mentor_li_box2 {
                width: 312px;
                height: 100%;
                padding: 0 30px;
                box-sizing: border-box;
                .mentor_li_box2_name {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .mentor_li_box2_address {
                    font-size: 12px;
                    color: #bbbbbb;
                }
                .mentor_li_introduction {
                    font-size: 14px;
                    word-wrap: break-word;
                    line-height: 1.4;
                }
            }
            .mentor_li_box3 {
                margin-left: 40px;
                .mentor_li_box3_ul {
                    display: flex;
                    .mentor_li_box3_li {
                        position: relative;
                        width: 220px;
                        height: 150px;
                        margin-left: 15px;
                        margin-top: 15px;
                        &:hover {
                            .icon-btn-play {
                                opacity: 1;
                            }
                        }
                        .icon-btn-play {
                            background-color: rgba(0, 0, 0, 0.6);
                            font-size: 60px;
                            height: 100%;
                            color: #fff;
                            text-align: center;
                            line-height: 150px;
                            opacity: 0;
                            transition: opacity 0.3s;
                            cursor: pointer;
                            .mentor_li_box3_li_title {
                                position: absolute;
                                font-size: 12px;
                                color: #fff;
                                bottom: 8px;
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                left: 0;
                            }
                        }
                    }
                }
            }
        }
    }
    .model {
        .model_li_countsUl {
            display: flex;
            .model_li_countsLi {
                flex: 1;
                & + .model_li_countsLi {
                    border-left: 1px solid #bbb;
                }
                .model_li_countsLi_name {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #bbb;
                }
            }
        }
    }
    .maker_li_countsUl {
        height: 40px;
        .maker_li_countsLi {
            text-align: center;
            .maker_li_countsLi_num {
                font-size: 14px;
                margin-bottom: 10px;
            }
            .maker_li_countsLi_name {
                font-size: 12px;
                color: #bbb;
            }
            & + .maker_li_countsLi {
                height: 40px;
                border-left: 1px solid #dfdfdf;
            }
        }
    }
    .space_li_countsUl {
        /* display: flex; */
        .space_li_countsLi {
            /* flex: 1; */
            width: 50%;
            & + .space_li_countsLi {
                border-left: 1px solid #bbb;
            }
            .space_li_countsLi_name {
                font-size: 12px;
                color: #bbb;
            }
        }
    }
    .space_li_countsLi_num, .maker_li_countsLi_num, .model_li_countsLi_num {
        margin-left: 5px;
        font-size: 14px;
    }
    .btn_group {
        font-size: 0;
        margin-top: 20px;
        text-align: right;
        .maker_li_func_focus, .maker_li_func_message {
            margin: 0 5px;
            width: 88px;
            height: 32px;
            border: 1px solid #dfdfdf;
            border-radius: $button-radiu;
            &:hover {
                background-color: nth($default-color, 2);
                border: 1px solid nth($default-color, 1);
                color: #fff;
            }
        }
        .maker_li_func_focus {
            background-color: nth($default-color, 1);
            border: 1px solid nth($default-color, 1);
            color: #fff;
        }
    }
}
</style>
