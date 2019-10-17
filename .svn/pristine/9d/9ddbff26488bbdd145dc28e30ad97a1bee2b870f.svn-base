<template>
    <article id="projectIntro" class="projectIntroPanel clearfix">
        <div :class="[ifAdmin ? 'projectIntroAdmin':'projectIntroPrev']" :style="{backgroundImage:'url('+ getFileUrl((projectDetail.imgUrl?projectDetail.imgUrl:null))+')'}"></div>
        <div :class="['projectIntro-summary', { 'adminSummary': ifAdmin }]">
            <h3 class="projectIntro-header clearfix">
                <span class="projectIntro-title fl" :title=" projectDetail.name">{{ projectDetail.name}}</span>
                <v-btn-group class="fr" :title.sync="projectDetail.name" v-if="!ifAdmin" module="project" :img="projectDetail.imgUrl"></v-btn-group>
                <span v-if="!ifAdmin" class="projectIntro-score fr">{{ projectDetail.score }}分</span>
            </h3>
            <p class="projectIntro-desc">{{ projectDetail.content | textOverflow('80')}}</p>
            <div class="projectIntro-other" v-if="!ifAdmin">
                <span class="projectIntro-other-item fl"><i class="icon-i-classify"></i>分类：{{ projectDetail.projectTypeName }}</span>
                <span class="projectIntro-other-item fl"><i class="icon-i-member"></i>项目人数：{{ projectDetail.currNum }}/{{ projectDetail.totalNum }}</span>
                <span class="projectIntro-other-item fl"><i class="icon-i-classify"></i>相关技术：{{ projectDetail.technologyName }}</span>
                <span class="projectIntro-other-item fl"><i class="icon-i-creator"></i>发起人：{{ projectDetail.createName }}</span>
                <time class="projectIntro-other-item__block"><i class="icon-i-activeTime"></i>报名时间：{{ projectDetail.enrollStartDate | dateFormat('yyyy-MM-dd HH:mm') }} 至 {{ projectDetail.enrollEndDate | dateFormat('yyyy-MM-dd HH:mm') }}</time>
                <time class="projectIntro-other-item__block"><i class="icon-i-time"></i>项目时间：{{ projectDetail.startDate | dateFormat('yyyy-MM-dd HH:mm') }} 至 {{ projectDetail.endDate | dateFormat('yyyy-MM-dd HH:mm') }}</time>
            </div>
            <div class="list_p">
                <div class="status">
                    <template v-if="!ifAdmin && identity === 'student' || !ifLogin">
                        <button class="btn-b-grassGreen btn-b-grass" @click="addMemberApply" v-if="[0, 3].includes(status.num)">立即参加</button>
                        <button class="btn-b-grass btn-b-grassGary" v-else-if="[-5, 1, 4, 5].includes(status.num)">
                            <span> {{ status.num | stutas }} </span>
                        </button>
                    </template>
                    <el-steps :space="100" :active="projectDetail.status - 1" finish-status="success" :align-center="true" v-if="ifAdmin || projectDetail.createId === loginUId ||(status.isSigned && (status.num == 2 || status.num == 6))">
                        <el-step v-for="(item,index) in statusData" :title="item" :key="index"></el-step>
                    </el-steps>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import { loginInfo } from 'Asset/js/getUserInfo.js'
// import btnGroup from 'Common/button/com_panel_event.vue'
import { mapState } from 'vuex'

export default {
    name : 'projectIntro',
    data() {
        return{
            statusData: [
                "项目发起",
                "项目准备",
                "项目设计",
                "原型制作",
                "测试迭代",
                "项目评价"
            ],
            ifAdmin: false,
            // ifTeacher: true
            identity: '',
            ifLogin: false,
            loginUId: ''
        }
    },
    // components: {
    //     'v-btn-group': btnGroup
    // },
    props: {
        //申请参加项目的状态
        status: {
            type: Object,
            default: {
                num: '',
                isSigned: false,
                sysTime: new Date().getTime()
            }
        }
    },
    created() {
        this.loginUId = this.$ls.get('loginUId') ? this.$ls.get('loginUId') : 0
    },
    methods: {
        addMemberApply() {
            let flag = Number(this.status.sysTime) >= Number(this.projectDetail.enrollStartDate) && Number(this.status.sysTime) <= Number(this.projectDetail.enrollEndDate)
            if (!flag) {
                this.$message({ showClose: true, message: '不在报名时间范围内', type: 'warning' })
            } else if (loginInfo) {
                this.$http.post('maker/projectMemberApply/addMemberApply',
                    { 'projectId': this.$route.query.id }
                ).then( res => {
                    if(res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: '报名成功',
                            type: 'success'
                        })
                        this.$emit('enrollCk')
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'info'
                        })
                    }
                })
            } else {
                this.$store.commit('toggleLoginModal', true);
            }
        },
        getModule () {
            let path = this.$route.path;
            let item = path.match(/\/\w+/g)[0];
            switch (item) {
                case '/education':
                    this.ifAdmin = false
                    break;
                case '/admin':
                case '/space':
                    this.ifAdmin = true
                    break;
            }
        }
    },
    mounted() {
        this.getModule()
        this.$route.query
        // if(this.$ls.get('userIdentity') == 'teacher') { this.ifTeacher = false }
        this.identity = this.$ls.get('userIdentity') ? this.$ls.get('userIdentity') : ''
        this.ifLogin = this.$ls.get('loginInfo') ? true : false
    },
    filters: {
        stutas (status) {
            let txt = null
            switch(status) {
                case -5:
                    txt = '报名未开始'
                    break
                case 1:
                    txt = '待审核'
                    break
                case 4:
                    txt = '人数已满'
                    break
                case 5:
                    txt = '报名截止'
                    break
                case 6:
                    txt = '已结束'
                    break
            }
            return txt
        }
    },
    computed: mapState({
        projectDetail: state => state.project.detail
    }),
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/form.scss';
@each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
        .btn-b-grassGreen {
            background:  nth($color-value, 3);
            &:hover {
                background:  nth($color-value, 1);
            }
        }
    }
}

.projectIntroPanel {
    position: relative;
    display: table;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    box-sizing: border-box;
    max-height: 250px;
    .projectIntroPrev,
    .projectIntro-summary,
    .projectIntroAdmin {
        display:table-cell;
        height: 100%;
        box-sizing: border-box;
    }

    .projectIntroPrev {
        width: 48%;
        height: 378px;
        background-size: cover;
        background-position: center;
    }
    .projectIntroAdmin {
        width: 25%;
        height: 230px;
        background-size: cover;
        background-position: center;
    }
    .adminSummary {
        width: 75% !important;
        vertical-align: top;
    }
    .projectIntro-summary {
        width: 52%;
        padding-left: 20px;
        font-size: 14px;
        vertical-align: top;
        .projectIntro-header {
            font-size: 24px;
            line-height: 3;
            .projectIntro-title {
                width: 50%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .projectIntro-score {
                color: #00a0e9;
            }
            .com-panel-group {
                line-height: 2.5;
                margin-left: 10px;
            }
        }

        .projectIntro-desc {
            margin-bottom: 1em;
            line-height: 2;
            word-wrap: break-word;
            font-size: 16px;
        }

        .projectIntro-other {
            .projectIntro-other-item {
                display: inline-block;
                box-sizing: border-box;
                width: 50%;
                line-height: 2;
                padding-right: 12px;
                font-size: 14px;
                color: #626262;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .projectIntro-other-item__block {
                display: block;
                box-sizing: border-box;
                line-height: 2;
                padding-right: 12px;
                font-size: 14px;
                color: #626262;
            }

            [class^="icon-"],
            [class*=" icon-"] {
                font-size: 14px;
                margin-right: 10px;
            }
        }
    }
    .btn-b-grass {
        width: 160px;
        height: 46px;
        border: none;
        font-size: 16px;
        cursor: pointer;
        color: #fff;
    }
    .btn-b-grassGary {
        background-color: #999;
        cursor: default;
    }
    .list_p {
        position: absolute;
        bottom: 40px;
        line-height: 2;
    }
}
</style>
