<template>
    <div class="container listBox">
        <el-row class="space_ul" :gutter="20" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="6" :key="k">
                <div class="space_li bgw" @click="toDetail(i)">
                    <div class="space_li_face" :style="{'background-image': `url(${i.cover || faceDefault})`}"></div>
                    <div class="space_li_msg">
                        <p class="space_li_name" v-html="filterKeyWords(i.name, keyWords)"></p>
                        <p class="space_li_parent">{{ i.schoolName }}</p>
                    </div>
                    <p class="space_li_introduction" :title="i.introduction">
                        {{ (i.remark || i.introduction) | handleHtmlDesc(40) }}
                    </p>
                    <ul class="space_li_countsUl table-layout">
                        <li class="space_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <span class="space_li_countsLi_name">{{ m.name || 0 }}</span>
                            <span class="space_li_countsLi_num">{{ m.value || 0 }}</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="no-data" v-else>暂无兴趣组数据</div>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import { requestInterest, judgeMember } from '@/service/space.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'interest',
    components: {
        'v-pagination': pagination,
    },
    data() {
        return {
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            },
            items: [],
            userId: '',
            hadLogin: false
        }
    },
    computed: {
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getData()
            },
            deep: true
        }
    },
    created() {
        this.getData()
        if (localStorage.getItem('loginInfo')) {
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            this.hadLogin = true
        }
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        // 分页改变
        changePage: function (pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
            this.getData()
        },
        // 请求列表数据
        getData: function () {
            requestInterest({ name: this.keyWords }, this.pageParam).then((response) => {
                if (response.data.code === 200) {
                    const _data = response.data.entity || {}
                    this.items = _data.resultData || []
                    this.items.forEach((i) => {
                        i.counts = [
                            { name: '创客', value: i.memberCount ? i.memberCount : 0 },
                            { name: '作品', value: i.workCount ? i.workCount : 0 },
                            { name: '话题', value: i.topicCount ? i.topicCount : 0 }
                        ]
                    })
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                }
            })
        },
        // 点击去兴趣组主页前的判断(/interestsSpace/homePage)
        toDetail(item) {
            if (item.property === 'public') {
                this.redirect(this.pages.detail.interest, { query: { id: item.id } })
            } else if (this.hadLogin) {
                judgeMember({ interestId: item.id, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
                    const isMember = res.data.entity
                    if (isMember) {
                        this.redirect(this.pages.detail.interest, { query: { id: item.id } })
                    } else {
                        this.$message({
                            message: '私密兴趣组，非本兴趣组成员不能访问'
                        })
                    }
                })
            } else {
                this.$message({
                    message: '私密兴趣组，不允许访问'
                })
            }
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

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/eduSchClaInt.scss';
</style>
