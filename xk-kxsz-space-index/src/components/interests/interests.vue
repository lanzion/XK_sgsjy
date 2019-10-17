<template>
    <div id="classes">
        <v-nav></v-nav>
        <v-banner></v-banner>
        <div class="container listBox">
            <section class="classify-box">
                <v-cascade model="project" :changeCascade="changeCascade"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            </section>
            <div class="searchBox">
                <v-tabs :tabs="tabs" @cur_tab="changeOrder" :is_search="true" :count="count" :total="page.totalNum" @searchVal="setSearchContent"></v-tabs>
            </div>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <img :src="getFileUrl(props.item.cover)">
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span>{{ props.item.name }}</span>
                    </h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">成员: {{props.item.memberCount}}</li>
                        <li class="cols-item">资源: {{props.item.resourceCount}}</li>
                        <li class="cols-item">话题: {{props.item.topicCount}}</li>
                        <li class="cols-item">文章: {{props.item.articleCount}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import nav from '@/components/common/nav.vue'
import cascade from '@/components/common/screening/cascade.vue'
import tabs from '@/components/common/classificationList/classification/tabs.vue'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import { requestInterestList } from '@/service/space_interest.js'
export default {
    name: 'classes',
    components: {
        'v-banner': banner,
        'v-nav': nav,
        'v-tabs': tabs,
        'v-list': list,
        'v-search': search,
        'v-pagination': pagination,
        'v-cascade': cascade,
        'v-classificationDictionary': classificationDictionary
    },
    data () {
        return {
            search: '',
            territory: null,      // 领域 1-2-3
            technology: null,     // 技术
            pagParam: {
                pageNum: 1,
                pageSize: 20
            },
            tabs: [
                { name: '全部兴趣组', type: ''},
                { name: '热门', type: 'hot'}
            ],
            count: {
                name: '兴趣组',
                color: 'lightBlue'
            },
            order: '',
            listData: {
                col: 4,
                pathUrl: '/interest/homepage',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            page: {
                totalNum: 0
            },
            items: []
        }
    },
    computed: {
        params: function() {
            return Object.assign( {},
                {name: this.search},
                {territory: this.territory},
                {technology: this.technology},
                {order: this.order},
                this.pagParam
            );
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                this.getData();
            },
            deep: true
        }
    },
    created() {
        scrollToTop()
        this.page = Object.assign( {}, this.pagParam );
        this.getData()
    },
    methods: {
        // 搜索框改变
        setSearchContent: function (content) {
            this.$set(this.$data, 'search', content);
        },
        // 改变领域级联
        changeCascade(items) {
            let territory = Array.from(items, x => x.id);
            this.$set(this.$data, 'territory', territory.join('-'));
        },
        // 改变技术
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id);
        },
        // 改变TAB
        changeOrder(index) {
            this.$set(this.$data, 'order', this.tabs[index].type);
        },
        // 分页改变
        changePage: function(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
        // 请求列表数据
        getData: function () {
            requestInterestList(this.params).then(response => {
                this.items = response.data.entity.resultData
                this.$set(this.page, 'totalNum', response.data.entity.totalNum);
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import './../../asset/scss/item_list.scss';
@import './../../asset/scss/cols.scss';
</style>
