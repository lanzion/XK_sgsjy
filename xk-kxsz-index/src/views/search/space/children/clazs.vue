<template>
    <div class="container listBox">
        <el-row class="space_ul" :gutter="20" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="6" :key="k">
                <div class="space_li bgw" @click="toDetail(i)">
                    <div class="space_li_face" :style="{'background-image': `url(${i.cover || faceDefault})`}"></div>
                    <div class="space_li_msg">
                        <p class="space_li_name" v-html="filterKeyWords(i.className, keyWords)"></p>
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
        <div class="no-data" v-else>暂无班级空间数据</div>
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import { requestClasz, judgeClaszMember } from '@/service/space.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'classes',
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
            userId: '',       // 当前登录人id
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
        },
        pageParam: {
            handler: function () {
                this.getData()
            },
            deep: true
        }
    },
    created() {
        this.getData()
        if (this.$ls.get('loginInfo')) {
            this.userId = this.$ls.get('loginInfo').userInfo.id
            this.hadLogin = true
        }
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        // 分页改变
        changePage: function (pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
        },
        // 请求列表数据
        getData: function () {
            requestClasz({ className: this.keyWords }, this.pageParam).then((response) => {
                this.items = response.data.entity.resultData
                this.items.forEach((i) => {
                    i.counts = [
                        { name: '创客', value: i.memberCount ? i.memberCount : 0 },
                        { name: '作品', value: i.counts.productionNum ? i.counts.productionNum : 0 }
                    ]
                })
                this.setTotalNum(response.data.entity.totalNum)
                this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum)
            })
        },
        // 点击去班级主页前的判断(/claszSpace/homePage)
        toDetail(item) {
            if (item.properties === '2') {
                if (this.hadLogin) {
                    if (this.userId === item.teacherId) {
                        this.redirect(this.pages.detail.clasz, { query: { id: item.orgId } })
                    } else {
                        judgeClaszMember({ classId: item.orgId, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
                            const isMember = res.data.entity
                            if (isMember) {
                                this.redirect(this.pages.detail.clasz, { query: { id: item.orgId } })
                            } else {
                                this.$message({
                                    message: '私密班级，非本班级成员不能访问',
                                    type: 'info'
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        message: '私密班级,不允许访问',
                        type: 'info'
                    })
                }
            } else {
                this.redirect(this.pages.detail.clasz, { query: { id: item.orgId } })
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
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/eduSchClaInt.scss';
.listBox{
    .searchBox {
        padding: 6px 8px 6px 0;
        margin: 20px 0;
        background-color: #fff;
    }
}
</style>
