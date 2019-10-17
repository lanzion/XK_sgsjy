<template>
    <div id="personCard">
        <div class="person-info">
            <img :src="getFileUrl(item.face) || faceDefault">
            <div class="person-name">
                <p class="name">{{ item.name }}</p>
                <p class="motto">{{ item.sign || '这家伙很懒，什么都没留下'}}</p>
            </div>
        </div>
        <div class="person-msg">
            <ul class="cols-list b-gray">
                <li class="cols-item">
                    <dd class="cols-item-title">作品</dd>
                    <dt class="cols-item-result">{{item.counts?item.counts.productionNum:0}}</dt>
                </li>
                <li class="cols-item">
                    <dd class="cols-item-title">学习</dd>
                    <dt class="cols-item-result">{{item.counts?item.counts.studyNum:0}}</dt>
                </li>
                <li class="cols-item" v-if="identity=='teacher'">
                    <dd class="cols-item-title">实践</dd>
                    <dt class="cols-item-result">{{item.counts?item.counts.practiceNum:0}}</dt>
                </li>
                <li class="cols-item" v-else>
                    <dd class="cols-item-title">指导</dd>
                    <dt class="cols-item-result">{{item.counts?item.counts.guidanceNum:0}}</dt>
                </li>
                <li class="cols-item">
                    <dd class="cols-item-title">资源</dd>
                    <dt class="cols-item-result">{{item.counts?item.counts.resouceNum:0}}</dt>
                </li>
            </ul>
            <p class="school">{{ item.schoolName }} | {{ identity=='teacher'?'教师':'学生' }}</p>
        </div>
        <div class="btn-box" v-if="userId!==id">
            <button class="i-button" @click="handleFollow(id, hasFollowed)"><i class="icon-btn-i-follow2"></i>{{hasFollowed && '取消' || ''}}关注</button>
            <button class="i-button" @click="dialog.isVisible=true"><i class="icon-btn-i-chat"></i>私信</button>
        </div>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog" model=""></send-private-letter>
    </div>
</template>

<script>
    import { loginInfo } from '@/js/getUserInfo.js'
    import { requestUserBaseInfo } from '@/service/common.js'
    import { follow } from '@/mixin/teacherAndStudent.js'
    export default {
        name:'personCard',
        mixins: [follow],
        data () {
            return {
                userId: loginInfo.userInfo.id,
                item: {},
                hasFollowed: false,
                identity: 'student',
                dialog: {
                    isVisible: false
                }
            }
        },
        props: {
            'id': {
                type: String,
                default() {
                    return ''
                }
            }
        },
        watch: {
            id(val) {
                if (val) {
                    this.getUserInfo();
                }
            }
        },
        mounted() {
            if (this.id !== this.userId) {
                this.queryHasFollowedORNot()
            }
        },
        methods: {
            getUserInfo() {
                requestUserBaseInfo({ userId: this.id }).then(response => { // 查询个人信息
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo;
                        let identity = Object.keys(_data).includes('teacher') ? 'teacher' : 'student';
                        this.identity = identity;
                        _data[identity].schoolName = _data[identity].schoolName || _data['school'].schoolName;
                        this.item = _data[identity]
                    }
                })
            },
            async queryHasFollowedORNot () { // 查询是否关注
                let res = await queryHasFollowedORNot({
                    followUser: this.id,
                    followedUserId: this.userId
                })
                if (res.data.code === 200) {
                    this.hasFollowed = res.data.entity || false // true已关注
                }
            },
            handleFollow (followedUId, hasFollowed) { // 关注、取消关注
                this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
                    if (res.data.code == 200) {
                        this.hasFollowed = !this.hasFollowed
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
@import '~@/asset/scss/cols.scss';
#personCard {
    width: 100%;
    border: 1px solid #ccc;
    padding: 0 0 16px;
    font-size: 12px;
    line-height: 2;
    text-align: center;
    .person-info {
        $header-size: 50px;
        width: 100%;
        padding-top: 10px;
        background: url('~@/asset/img/common/person_card_bg.png') top center no-repeat;
        background-size: cover;
        img {
            width: $header-size;
            height: $header-size;
            border-radius: 50%;
        }
    }
    .person-name {
        margin: 0 16px 5px;
        .name {
            font-size: 14px
        }
        .motto {
            height: 25px;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .person-msg {
        margin-bottom: 5px;
    }
    .btn-box {
        .i-button {
            border: 1px solid #ccc;
            padding: 0px 1.5em;

            [class*="icon-btn-"],
            [class*=" icon-btn-"] {
                vertical-align: baseline;
            }
        }
    }
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #personCard .btn-box {
            .i-button:hover {
                border-color: $color-value;
                color: $color-value;
            }
        }
    }
}
</style>