<template>
    <div id="enterprise">
        <v-nav></v-nav>
        <v-banner></v-banner>
        <div class="container listBox">
            <section class="classify-box">
                <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
            </section>
            <div class="searchBox">
                <v-search @search="setSearchContent" tips="请输入企业名称"></v-search>
            </div>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                    </div>
                    <h6 class="list-item-title">{{ props.item.name }}</h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">服务: {{props.item.counts == null ? 0 : props.item.counts.serviceNum}}</li>
                        <li class="cols-item">需求: {{props.item.counts == null ? 0 : props.item.counts.demandNum}}</li>
                        <li class="cols-item">课程: {{props.item.counts == null ? 0 : props.item.counts.coursesNum}}</li>
                        <li class="cols-item">活动: {{props.item.counts == null ? 0 : props.item.counts.activityNum}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import region from '@/components/common/screening/pub_region.vue'
import nav from '@/components/common/nav.vue'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import { requestEnterpriseList } from '@/service/space_enterprise.js'
export default {
    name: 'enterprise',
    components: {
        'v-banner': banner,
        'v-region': region,
        'v-nav': nav,
        'v-list': list,
        'v-search': search,
        'v-pagination': pagination
    },
    data () {
        return {
            region: {
                provinceId: '',
                cityId: '',
                areaId: ''
            },
            search: '',
            pagParam: {
                pageNum: 1,
                pageSize: 20
            },
            listData: {
                col: 4,
                pathUrl: '/enterprise/detail',
                params: {
                    names: 'id',
                    val: 'orgId'
                }
            },
            page: {},
            items: []
        }
    },
    computed: {
        params: function() {
            return Object.assign( {}, {name: this.search}, this.region, this.pagParam );
        }
    },
    created(){
        scrollToTop()
        this.page = Object.assign( {}, this.pagParam );
        this.getData()
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                this.getData();
            },
            deep: true
        }
    },
    methods: {
        // 地区改变
        changeRegion: function (region) {
            if (region == undefined) return;
            let _region = {
                provinceId: region[0],
                cityId: region[1],
                areaId: region[2]
            };
            this.$set(this.$data, 'region', _region);
        },
        // 搜索框改变
        setSearchContent: function (content) {
            this.$set(this.$data, 'search', content);
        },
        // 分页改变
        changePage: function(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
        // 请求列表数据
        getData: function () {
            requestEnterpriseList(this.params).then(response => {
                this.items = response.data.entity.resultData
                this.$set(this.page, 'totalNum', response.data.entity.totalNum);
            })
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
</style>
