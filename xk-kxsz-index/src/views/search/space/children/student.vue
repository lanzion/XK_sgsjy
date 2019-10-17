<template>
    <div class="container listBox">
        <el-row class="maker_ul" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="8" :key="k">
                <div class="maker_li bgw">
                    <div class="maker_li_personal clearfix" @click="goToPersonSpace(i)">
                        <span class="maker_li_personal_face fl" :style="{'background-image': `url(${i.cover || faceDefault})`}"></span>
                        <div class="maker_li_personal_msg fl">
                            <p class="maker_li_personal_msg_name" v-html="filterKeyWords(i.studentName, keyWords)"></p>
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
        <div class="no-data" v-else>暂无学生空间数据</div>
        <v-pagination :param.sync='pageParam' @callback="changePage"></v-pagination>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import sendPrivateLetter from '@/components/common/send_private_letter_dialog.vue'
import { requestIsCanVisit } from '@/service/common.js'
import { requestStudent } from '@/service/space.js'
import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'student',
    mixins: [follow, privateLetter],
    components: {
        'v-pagination': pagination,
        sendPrivateLetter
    },
    data() {
        return {
            dialog: {
                addresseeId: '', // 私信收信人
                isVisible: false
            },
            pageParam: {
                pageNum: 1,
                pageSize: 1,
                totalNum: 0
            },
            schoolData: [],         // 学校列表
            items: [],                    // 列表数据
            loginUserId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
        }
    },
    created() {
        this.getData()
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getData()
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        handleFollow(followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
            this.handleFollowOrNot(followedUId, hasFollowed).then((res) => {
                res && this.getData()
            })
        },
        changePage(pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
            this.getData()
        },
        // 请求列表数据
        getData() {
            requestStudent({ studentName: this.keyWords }, this.pageParam).then((response) => {
                if (response.data.code === 200) {
                    this.items = response.data.entity.resultData
                    this.items.forEach((i) => {
                        i.counts = [
                            { name: '作品', value: i.counts ? i.counts.productionNum : 0 },
                            { name: '文章', value: i.counts ? i.counts.articleNum : 0 },
                            { name: '话题', value: i.counts ? i.counts.topicNum : 0 },
                            { name: '粉丝', value: i.counts ? i.counts.fansNum : 0 }
                        ]
                    })
                    this.setTotalNum(response.data.entity.totalNum)
                    this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum)
                }
            })
        },
        // 跳转个人空间
        goToPersonSpace(i) {
            const loginUid = this.$ls.get('loginUId') || ''
            if (loginUid === i.userId) {
                this.redirect(this.pages.my)
            } else {
                this.redirect(this.pages.detail.student, { query: { id: i.orgId, uid: i.userId } })
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.path === '/space/student/dynamic' && (to.query.uid !== undefined && to.query.uid !== this.loginUserId)) {
            requestIsCanVisit({ userId: to.query.uid }).then((res) => {
                if (res.data.code === 200 && res.data.entity) {
                    next()
                } else {
                    this.$message({ message: '您没有访问权限' })
                }
            })
        } else {
            next()
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
        }
    }
}
</script>

<style lang="scss">
    @import '~@/assets/css/scss/form.scss';
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/cascader.scss';
@import '~@/assets/css/scss/teaStuList.scss';

.totalNum {
    .sort-bar-box {
        width: auto;
    }
}
</style>

