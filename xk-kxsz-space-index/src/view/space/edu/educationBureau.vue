<template>
    <div id="educationBureau">
        <v-banner></v-banner>
        <div class="container listBox">
            <section class="classify-box">
                <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
            </section>
            <div class="searchBox">
                <v-search @search="setSearchContent" tips="请输入教育局名称"></v-search>
            </div>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                    </div>
                    <h6 class="list-item-title ellipsis">{{ props.item.eduName }}</h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">资源: {{props.item.counts == null ? 0 : props.item.counts.resouceNum}}</li>
                        <li class="cols-item">课程: {{props.item.counts == null ? 0 : props.item.counts.coursesNum}}</li>
                        <li class="cols-item">项目: {{props.item.counts == null ? 0 : props.item.counts.projectsNum}}</li>
                        <li class="cols-item">作品: {{props.item.counts == null ? 0 : props.item.counts.productionNum}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import region from '@/components/common/screening/region.vue'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import { requestEducationList } from '@/service/space_education.js'
export default {
    name: 'educationBureau',
    components: {
        'v-banner': banner,
        'v-region': region,
        'v-list': list,
        'v-search': search,
        'v-pagination': pagination
    },
    data () {
        return {
            region: {
                province: '',
                city: '',
                area: ''
            },
            search: '',
            pagParam: {
                pageNum: 1,
                pageSize: 20
            },
            listData: {
                col: 4,
                pathUrl: '/educationBureauSpace/homepage',
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
            return Object.assign( {}, {eduName: this.search}, this.region, this.pagParam );
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
                province: region[0],
                city: region[1],
                area: region[2]
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
            requestEducationList(this.params).then(response => {
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
