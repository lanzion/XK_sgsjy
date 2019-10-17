<template>
    <div class="honor-wrapper listBox">
        <div class="searchBox bgw">
            <search @search="setKeyWords" tips="请输入荣誉标题"></search>
        </div>
        <section class="list-wrapper bgw">
            <transition-group class="list" v-if="list.length" name="list-item" tag="ul" mode="out-in">
                <li class="list-item__box" :class="{'list-item__shadow': true}" :style="{width: getWidth(4)}" v-for="(item, index) in list" :key="item.id || index">
                    <router-link :to="{path: `${pages.detail.model.path}/honor/detail`, query: { id: item.id, orgId: $route.query.id }}">
                        <figure class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                        </figure>
                        <h6 :title="item.name" class="list-item-title ellipsis">{{item.name || '暂无名称'}}</h6>
                    </router-link>
                </li>
            </transition-group>
            <div v-else class="empty-block">暂无数据</div>
            <pagination v-bind="{param: pageParam, changePage: requestList}"/>
        </section>
    </div>
</template>

<script>
    import { requestHonorList } from '@/service/model_school.js'
    import pagination from '@/components/common/pagination.vue'
    import search from 'Common/search.vue'
    import list from 'Common/list/graphic/list.vue'

    export default {
        name: 'modelHonor', // 示范校--获得荣誉

        inheritAttrs: false,

        data() {
            return {
                list: [],
                pageParam: {
                    pageNum: 1,
                    pageSize: 12,
                    totalNum: 0
                },
                selected: {
                    name: '',
                },
                schoolId: this.$route.query.id,
            }
        },
        created() {
            this.requestList()
        },
        components: {
            pagination,
            search,
            list
        },
        methods: {
            // 获取列表
            async requestList() {
                const res = await requestHonorList({
                    ...this.pageParam,
                    ...this.selected,
                    schoolId: this.schoolId,
                })

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData, totalNum } = res.data.entity || {}
                    this.list = resultData || []
                    this.pageParam.totalNum = totalNum || 0
                }
            },
            // 搜索
            setKeyWords(str) {
                this.selected.name = str
                this.requestList()
            }
        },
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/index_list.scss';
    .honor-wrapper {
        font-size: 14px;
        .searchBox {
            padding-right: 14px;
        }
        .list-wrapper {
            overflow: hidden;
            #list {
                margin: 10px 0 0;
                padding: 0 5px;
            }
            #pagination {
                box-sizing: border-box;
                padding-right: 14px;
            }
        }
    }
</style>
