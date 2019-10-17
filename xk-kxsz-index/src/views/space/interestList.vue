<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="screeningBox bgc_w">
            <v-cascade model="interest" :changeCascade="changeCascade" class="category-box"></v-cascade>
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
        </section>
        <v-tabs :tabs="tabs" @cur_tab="changeOrder" :is_search="true" :count="count" :total="page.totalNum" class="tabs" @searchVal="setSearchContent"></v-tabs>
        <el-row class="space_ul" :gutter="20" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="6" :key="k">
                <div class="space_li bgw" @click="toDetail(i)">
                    <div class="space_li_face" :style="{'background-image': `url(${i.cover || classDefault})`}"></div>
                    <div class="space_li_msg">
                        <p class="space_li_name">{{ i.className || i.name }}</p>
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
        <div class="no-data" v-else>暂无兴趣组空间数据</div>
        <v-pagination :param.sync="page" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import cascade from '@/components/common/screening/cascade.vue'
import tabs from '@/components/common/tabs.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import { requestInterest } from '@/service/space.js'

export default {
    name: 'interest',
    components: {
        'v-tabs': tabs,
        'v-search': search,
        'v-pagination': pagination,
        'v-cascade': cascade,
        'v-classificationDictionary': classificationDictionary
    },
    data() {
        return {
            breadcrumb: [
                { path: '/space', name: '空间' },
                { path: '', name: '兴趣组空间列表' }
            ],
            search: '',
            territory: null,      // 领域 1-2-3
            technology: null,     // 技术
            pageParam: {
                pageNum: 1,
                pageSize: 16
            },
            tabs: [
                { name: '全部兴趣组', type: '' },
                { name: '热门', type: 'hot' }
            ],
            count: {
                name: '兴趣组',
                color: 'lightBlue'
            },
            order: '',
            listData: {
                col: 4,
                pathUrl: null,
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            page: {
                totalNum: 0
            },
            items: [],
            userId: '',
            hadLogin: false
        }
    },
    computed: {
        params: function () {
            return Object.assign({},
                { name: this.search },
                { territory: this.territory },
                { technology: this.technology },
                { order: this.order }
            )
        }
    },
    watch: {
        params: {
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
        this.page = Object.assign({}, this.pageParam)
        this.getData()
        if (localStorage.getItem('loginInfo')) {
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
            this.hadLogin = true
        }
    },
    methods: {
        // 搜索框改变
        setSearchContent: function (content) {
            this.$set(this.$data, 'search', content)
        },
        // 改变领域级联
        changeCascade(items) {
            const territory = Array.from(items, x => x.id)
            this.$set(this.$data, 'territory', territory.join('-'))
        },
        // 改变技术
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id)
        },
        // 改变TAB
        changeOrder(index) {
            this.$set(this.$data, 'order', this.tabs[index].type)
        },
        // 分页改变
        changePage: function (pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
        },
        // 请求列表数据
        getData: function () {
            requestInterest(this.params, this.pageParam).then((response) => {
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
                    this.$set(this.page, 'totalNum', _data.totalNum || 0)
                }
            })
        },
        // 点击去兴趣组主页前的判断(/interestsSpace/homePage)
        toDetail(item) {
            this.redirect(this.pages.detail.interest, { query: { id: item.id } })
            // if (item.property === 'public') {
            //     this.redirect(this.pages.detail.interest, { query: { id: item.id } })
            // } else if (this.hadLogin) {
            //     judgeMember({ interestId: item.id, userId: this.userId, timeStamp: new Date().getTime() }).then((res) => {
            //         const isMember = res.data.entity
            //         if (isMember) {
            //             this.redirect(this.pages.detail.interest, { query: { id: item.id } })
            //         } else {
            //             this.$message({
            //                 message: '私密兴趣组，非本兴趣组成员不能访问'
            //             })
            //         }
            //     })
            // } else {
            //     this.$message({
            //         message: '私密兴趣组，不允许访问'
            //     })
            // }
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
.listBox{
    .space_ul {
        .space_li_countsUl {
            .space_li_countsLi {
                width: 33.33%;
            }
        }
    }
}
</style>
