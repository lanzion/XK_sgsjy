<template>
    <div class="unchecked_member">
        <ul class="list-box" v-if="memberList.length > 0">
            <li class="member-list clearfix" v-for="item in memberList">
                <div class="fl check-box">
                    <el-checkbox></el-checkbox>
                </div>
                <div class="avatar-box fl">
                    <img :src="getFileUrl(item.url) || faceDefault" height="72" width="73">
                </div>
                <div class="msg-box fl">
                    <p><span class="name">{{item.userName}}</span><span class="school" v-if="item.schoolName">（{{item.schoolName}}）</span></p>
                    <p>{{item.applyContent}}</p>
                    <p class=""><span class="time">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span></p>
                </div>
                <div class="option-box fr" v-if="isAdmin">
                    <span @click="audit(item,1)">通过</span>
                    <span @click="audit(item,2)">不通过</span>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无待审成员</div>
        <v-pagination :param="param" @callback="changePage"></v-pagination>
    </div>
</template>

<script type="text/javascript">
    import { mapState, mapActions } from 'vuex'
    import { requestPendingMembers, auditMember, judgeAdmin } from '@/service/interest.js'
    import pagination from 'Common/pagination.vue'

    export default {
        name: 'unchecked_member',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                param: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                },
                pageParam: {
                    pageSize: 20,
                    pageNum: 1
                },
                memberList: [],
                isAdmin: false,
                interestId: ''
            }
        },
        mounted() {
            this.interestId = this.$route.query.id
            if (localStorage.getItem('loginInfo')) {
                const userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
                judgeAdmin({ interestId: this.interestId, userId: userId }).then((res) => {
                    this.isAdmin = res.data.entity
                })
            }
            this.getPendingMembers()
        },
        computed: {
            ...mapState('interest', {
                memberNum: 'memberNum'
            })
        },
        methods: {
            ...mapActions('interest', ['setMemberNum']),
            changePage(val) {
                this.pageParam.pageNum = val
                this.getPendingMembers()
            },
            /*
             * 获取待审成员列表
             * interestId: 兴趣组Id
             */
            getPendingMembers() {
                requestPendingMembers({ interestId: this.interestId, auditStatus: 0 }, this.pageParam).then((res) => {
                    this.param.totalNum = res.data.entity.totalNum
                    this.memberList = res.data.entity.resultData
                })
            },
            /*
             * 成员审核
             * id: 审核记录id
             * auditStatus: 审核状态
             * auditOpinion: 审核意见
             * applyId: 申请人id
             * interestId: 兴趣组Id
            */
            audit(param, status) {
                let opinion
                if (status === 1) {
                    opinion = '审核通过'
                } else {
                    opinion = '审核不通过'
                }
                auditMember({
                    id: param.id,
                    auditStatus: status,
                    auditOpinion: opinion,
                    applyId: param.applyId,
                    interestId: this.interestId
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '审核成功')
                        this.setMemberNum(++this.memberNum)
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                    this.getPendingMembers()
                    this.$emit('callback')
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    .unchecked_member{
        padding: 0 20px;
    }
    .list-box{
        width: 100%;
        margin-bottom:50px;
    }
    // 待审成员列表
    .member-list{
        padding: 13px 0;
        border-bottom: 1px dashed #c9c9c9;
        .check-box{
            width: 40px;
            height: 73px;
            line-height: 73px;
        }
        .avatar-box{
            img{
                border-radius: 1000px;
            }
        }
        .msg-box{
            width: 570px;
            margin-left: 18px;
            p{
                font-size: 14px;
                margin-bottom: 10px;
            }
            .shcool,.time{
                color: #999;
            }
            .time{
                font-size: 12px;
            }
            .name{
                font-size: 16px;
            }
        }
        .option-box{
            height: 73px;
            line-height: 73px;
            font-size: 14px;
            span{
                margin-left: 15px;
                cursor: pointer;
                font-size: 14px;
                color: $theme-color;
                padding: 3px 6px;
                border: 1px solid $theme-color;
                border-radius: 5px;
                &:hover {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }
    }
</style>