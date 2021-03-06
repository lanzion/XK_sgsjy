<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="screeningBox bgc_w">
            <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
        </section>
        <div class="searchBox">
            <v-search @search="setSearchContent" tips="请输入教育局名称"></v-search>
        </div>
        <el-row class="space_ul" :gutter="20" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="6" :key="k">
                <div class="space_li bgw" @click="redirect(pages.detail.edu, { query: { id: i.orgId } })">
                    <div class="space_li_face" :style="{'background-image': `url(${i.cover || eduDefault})`}"></div>
                    <div class="space_li_msg">
                        <p class="space_li_name">
                            {{ i.eduName || i.schoolName }}
                        </p>
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
        <div class="no-data" v-else>暂无教育局空间数据</div>
        <v-pagination :param.sync="page" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import region from '@/components/common/screening/region.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { requestEdu } from '@/service/space.js'

export default {
    name: 'educationBureauList',
    components: {
        'v-region': region,
        'v-search': search,
        'v-pagination': pagination
    },
    data() {
        return {
            breadcrumb: [
                { path: '/space', name: '空间' },
                { path: '', name: '教育局空间列表' }
            ],
            region: {
                provinceId: '',
                cityId: '',
                areaId: ''
            },
            search: '',
            pageParam: {
                pageNum: 1,
                pageSize: 16
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
        params: function () {
            return Object.assign({}, { eduName: this.search }, this.region)
        }
    },
    created() {
        this.page = Object.assign({}, this.pageParam)
        this.getData()
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
    methods: {
        // 地区改变
        changeRegion: function (item) {
            const _region = {}
            const [province, city, area] = item
            _region.provinceId = province
            _region.cityId = city
            _region.areaId = area
            this.$set(this.$data, 'region', _region)
        },
        // 搜索框改变
        setSearchContent: function (content) {
            this.$set(this.$data, 'search', content)
        },
        // 分页改变
        changePage: function (pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
        },
        // 请求列表数据
        getData: function () {
            requestEdu(this.params, this.pageParam).then((response) => {
                this.items = response.data.entity.resultData
                this.items.forEach((i) => {
                    i.counts = [
                        { name: '创客', value: i.memberCount ? i.memberCount : 0 },
                        { name: '作品', value: i.counts.productionNum ? i.counts.productionNum : 0 }
                    ]
                })
                this.$set(this.page, 'totalNum', response.data.entity.totalNum)
            })
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
    .space_li_countsUl {
        .space_li_countsLi {
            width: 50%;
        }
    }
}
</style>
