<template>
    <div id="interest_member" class="bgw">
        <h4 class="head-count">成员({{memberList.length}})</h4>
        <section class="member-list">
            <ul class="list clearfix" v-if="memberList.length">
                <li class="list-item__box" :class="{'list-item__shadow': true}" :style="{ width: widthCol }" v-for="(item, index) in memberList" :key="item.id || index">
                    <!-- <router-link :to="generateRoute(item)" class="list-item-img__box fl" tag="div"> -->
                    <div class="list-item-img__box fl">
                        <img :src="getFileUrl(item.url) || faceDefault" @click="generateRoute(item)">
                        <div class="list-item-tips" v-if="item.isManager === '1'" ><span class="list-item-tiptxt">管理员</span></div>
                    </div>
                    <!-- </router-link> -->
                    <div class="list-item-msg">
                        <h6 class="list-item-title">
                            <p class="ellipsis user_name" @click="generateRoute(item)">{{ item.userName }}</p>
                            <!-- <router-link :to="generateRoute(item)" class="ellipsis" tag="p">{{ item.userName }}</router-link> -->
                            <p class="ellipsis">{{ item.schoolName }}</p>
                        </h6>
                        <ul class="cols-list list-item-count clearfix" v-if="item.userId != userId">
                            <li class="cols-item fl" @click.stop="handleFollow(item.userId, !! item.follow)">
                                <span class="icon-btn-follow"> {{item.follow ? '已' : ''}}关注</span>
                            </li>
                            <li class="cols-item fl"><span @click="showPrivateLetterDialog(item.userId)" class="icon-btn-prichat"> 私信</span></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div v-else class="empty-block">暂无数据</div>
        </section>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog" model=""></send-private-letter>
    </div>
</template>

<script>
    import list from 'Common/list/graphic/list.vue'
    import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
    import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'
    // import { requestInterestMember, judgeAdmin } from '@/service/interest.js'

    export default {
        name: 'interest_member',
        mixins: [follow, privateLetter],
        components: {
            'v-list': list,
            'send-private-letter': sendPrivateLetter
        },
        data() {
            return {
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
                userId: '',
                widthCol: '20%'
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
        mounted() {
            if (localStorage.getItem('loginInfo')) {
                this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            } else {
                this.userId = ''
            }
        },
        methods: {
            // 关注
            handleFollow(followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
                this.handleFollowOrNot(followedUId, hasFollowed).then((res) => {
                    res && this.$emit('getMemberList')
                })
            },
            generateRoute(item) {
                if (item.identity === '0') {
                    this.redirect(this.pages.detail.student, { query: { id: item.orgId, uid: item.userId } })
                } else if (item.identity === '1') {
                    this.redirect(this.pages.detail.teacher, { query: { id: item.orgId, uid: item.userId } })
                }
                // return this.dynamicPath(item)
                // if(this.$route.path.includes('member')) {
                // } else {
                //     const {pathUrl: path, params = {}} = this.listData
                //     const {names, val} = params
                //     const {id, userId} = item
                //     const query = {[names]: item[val]}

                //     if (path.includes('clasz')) query.spaceId = id

                //     if (path.includes('teacher') || path.includes('student')) query.uid = userId

                //     return {path, query}
                // }
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/index_list.scss';
.list-item__shadow:hover {
    box-shadow: 0 3px 5px #D9D9D9;
}
    @import '~@/assets/css/scss/item_list.scss';
    @import '~@/assets/css/scss/cols.scss';
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
            .user_name:hover {
                color: #23b8ff;
            }
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