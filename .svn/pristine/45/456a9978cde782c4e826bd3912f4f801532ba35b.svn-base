<template>
    <div id="my_member" class="member-list">
        <transition-group class="list clearfix" v-if="memberList.length" name="list-item" tag="ul" mode="out-in">
            <li class="list-item-box clearfix fl" :style="{width: listWidth}" v-for="(item,index) in memberList" :key="item.id">
                <div class="face-box fl">
                    <img :src="getFileUrl(item.face) || faceDefault" @click="toPersonSpace(item.userId,item.identity)">
                </div>
                <section class="msg-box">
                    <div class="name-identity">
                        <span class="name" @click="toPersonSpace(item.userId,item.identity)">{{item.userName != null ? item.userName : '暂无名字'}}</span>
                        <span class="identity">({{identity[item.identity]}})</span>
                    </div>
                    <div class="school">{{item.schoolName != null ? item.schoolName : '暂无'}}</div>
                    <div class="focus-fans">
                        <span>关注：{{item.followCount}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>粉丝：{{item.fansCount}}</span>
                    </div>
                    <div class="enter-date">
                        入驻时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}
                    </div>
                </section>
            </li>
        </transition-group>
        <div class="empty-block" v-else>暂无收藏</div>
        <v-pagination :param="pageParams" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import { requestMemberList } from '@/service/mult.js'
    import { requestUserBaseInfo } from '@/service/common.js'
    import pagination from 'Common/pagination.vue'

    export default {
        name: 'my_member',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                memberList: [],
                multId: '',            // 众创空间id
                pageParams: {
                    totalNum: 0,
                    pageSize: 9,
                    pageNum: 1
                },
                identity: {
                    0: '学生',
                    1: '教师',
                    2: '投资人',
                    3: '投资机构',
                    4: '企业',
                }
            }
        },
        props: {
            search: {
                type: String,
                default: ''
            }
        },
        computed: {
            listWidth: function () {
                return this.getWidth(3)
            }
        },
        created() {
            if (this.$ls.get('loginInfo')) {
                this.multId = this.$ls.get('loginInfo').userInfo.baseId
            }
        },
        mounted() {
            this.getMemberList()
        },
        watch: {
            search: {
                handler: function () {
                    this.getMemberList()
                },
                deep: true
            }
        },
        methods: {
            changePage(val) {
                this.pageParams.pageNum = val
                this.getMemberList()
            },
            getMemberList() {
                requestMemberList({ multId: this.multId, userName: this.search }, this.pageParams).then((res) => {
                    if (res.data.code === 200) {
                        this.memberList = res.data.entity.resultData
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
            },
            // 跳转到个人空间
            toPersonSpace(userId, identity) {
                let routePath = ''
                let id = ''
                switch (identity) {
                    case 0:
                        routePath = 'space/student/dynamic'
                        break
                    case 1:
                        routePath = 'space/teacher/dynamic'
                        break
                    case 2:
                        routePath = 'investor/detail'
                        break
                    case 3:
                        routePath = 'investOrg/detail'
                        break
                    case 4:
                        routePath = 'enterprise/detail'
                        break
                }
                requestUserBaseInfo({ userId: userId }).then((res) => {
                    const host = `${location.protocol}//${location.host}`
                    if (res.data.code === 200) {
                        id = res.data.appendInfo.baseInfo.id
                        if (identity === 0 || identity === 1) {
                            window.location.href = `${host}/${routePath}?id=${id}&uid=${userId}`
                        } else {
                            window.location.href = `${host}/${routePath}?id=${id}`
                        }
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    // 过渡动画
    .list-item-box {
        transition: opacity .5s, transform .5s;
        cursor: pointer;
    }
    .list-item-enter, .list-item-leave-active {
        opacity: 0;
        transform: translate(0);
    }
    .list-item-enter {
        transform: scale(.1);
    }
    .list-item-leave-active {
        position: absolute;
    }
    #my_member{
        padding:0px 18px 20px;
        .list{
            .list-item-box{
                padding: 20px 0px;
                .face-box{
                    margin-right: 13px;
                    img{
                        width: 90px;
                        height: 90px;
                        border-radius: 100%;
                    }
                }
                .msg-box{
                    font-size: 14px;
                    line-height: 1.5em;
                    .name-identity{
                        .name:hover{
                            color: $theme_color;
                        }
                    }
                }
            }
        }
    }
</style>