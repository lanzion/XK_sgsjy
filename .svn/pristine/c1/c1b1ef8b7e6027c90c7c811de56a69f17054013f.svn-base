<template>
    <div class="checked_member">
        <ul class="list-box" v-if="checkedMemberList.length > 0">
            <li class="members clearfix" v-for="item in checkedMemberList">
                <a class="avatar-box">
                    <router-link :to="dynamicPath(item)">
                        <img :src="getFileUrl(item.url) || faceDefault" height="72" width="72">
                    </router-link>
                    <span class="tips" v-if="item.isManager === '1'">管理员</span>
                </a>
                <div class="msg-box verticle-middle">
                    <p><router-link :to="dynamicPath(item)" class="name">{{item.userName}}</router-link><span v-if="item.schoolName">{{item.schoolName}}</span></p>
                    <p class="create-time">{{item.createDate | dateFormat('HH:mm')}}</p>
                </div>
                <div class="option-box fr" v-if="item.isOwner != '1' && isOwner">
                    <a href="javascript:;">
                        <span v-if="item.isManager === '1'" @click="setInterestAdmin(item.id,item.userId,'cancel')">取消管理员</span>
                        <span v-else @click="setInterestAdmin(item.id,item.userId,'set')">设为管理员</span>
                    </a>
                    <a href="javascript:;" @click="removeInterestMember(item.id,item.userId)">踢出</a>
                </div>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无成员</div>
        <v-pagination :param="param" @callback="changePage"></v-pagination>
    </div>
</template>

<script type="text/javascript">
    import { mapState, mapActions } from 'vuex'
    import pagination from 'Common/pagination.vue'
    import { requestMembers, setAdmin, cancelAdmin, removeMember } from '@/service/interest.js'

    export default {
        name: 'checked_member',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                checkedMemberList: '',
                pageParam: {
                    pageSize: 20,
                    pageNum: 1
                },
                param: {
                    totalNum: 0,
                    pageSize: 20,
                    pageNum: 1
                },
                interestId: '',
                userId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : '',
                isOwner: false
            }
        },
        created() {
        },
        mounted() {
            this.interestId = this.$route.query.id
            this.getAuditedMembers()
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
                this.getAuditedMembers()
            },
            /*
             * 请求已审成员列表
             * interestId: 活动Id
             * auditStatus: 1(1.通过 2.不通过)
             */
            getAuditedMembers() {
                requestMembers({ interestId: this.interestId, auditStatus: 1 }, this.pageParam).then((res) => {
                    if (res.data.entity === null) {
                        this.checkedMemberList = []
                        this.param.totalNum = 0
                    } else {
                        this.checkedMemberList = res.data.entity.resultData
                        // 判断当前用户是不是创建者
                        this.checkedMemberList.forEach((item) => {
                            if (item.isOwner === '1' && item.userId === this.userId) {
                                this.isOwner = true
                            }
                        })
                        this.param.totalNum = res.data.entity.totalNum
                    }
                })
            },
            // 设置管理员
            setInterestAdmin(id, userId, handler) {
                const params = {
                    id: id,
                    interestId: this.interestId,
                    userId: userId
                }
                const request = handler === 'set' ? setAdmin : cancelAdmin
                request(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '设置成功')
                        this.getAuditedMembers()
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            },
            // 踢出成员
            removeInterestMember(id, userId) {
                const params = {
                    id: id,
                    interestId: this.interestId,
                    userId: userId
                }
                removeMember(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '该成员已被踢出')
                        this.setMemberNum(--this.memberNum)
                        this.getAuditedMembers()
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    .checked_member{
        width: 100%;
        padding: 15px;
    }
    .list-box{
        width: 100%;
        margin-bottom: 50px;
    }
    // 已审成员
    .members{
        padding: 13px 0;
        border-bottom: 1px dashed #c9c9c9;
        position: relative;
        .avatar-box{
            position: relative;
            padding-right: 1em;
            img{
                border-radius: 1000px;
            }
            .tips{
                padding: 3px;
                border-radius: 3px;
                background-color: #00a0e9;
                color: #fff;
                position: absolute;
                bottom: 3px;
                right: 10px;
            }
        }
        .msg-box{
            margin-left: 82px;
            .name{
                font-size: 18px;
                line-height: 2;
                &:hover{
                    color: #2797ed;
                }
            }
            .school-name{
                font-size: 14px;
                color: #999;
            }
        }
        .option-box{
            line-height: 72px;
            a{
                margin-left: 15px;
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