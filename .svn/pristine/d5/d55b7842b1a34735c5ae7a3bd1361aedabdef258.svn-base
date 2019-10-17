<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="screeningBox bgc_w">
            <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
        </section>
        <div class="searchBox">
            <v-search @search="setKeyWords" tips="请输入学校名称"></v-search>
        </div>
        <el-row class="space_ul model" :gutter="20" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="6" :key="k">
                <div class="space_li bgw" @click="redirect(pages.detail.model, { query: { id: i.id } })">
                    <div class="space_li_face" :style="{'background-image': `url(${i.cover || schoolDefault})`}"></div>
                    <div class="space_li_msg">
                        <p class="space_li_name">
                            {{ i.eduName || i.schoolName }}
                        </p>
                    </div>
                    <p class="space_li_introduction" :title="i.introduction">
                        {{ i.introduction | handleHtmlDesc(40) }}
                    </p>
                    <ul class="model_li_countsUl table-layout">
                        <li class="model_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <p class="model_li_countsLi_num">{{ m.value }}</p>
                            <p class="model_li_countsLi_name">{{ m.name }}</p>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div class="no-data" v-else>暂无创客示范校数据</div>
        <v-pagination :param="pageParam" @callback="requestList"></v-pagination>
    </div>
</template>

<script>
import regionCpt from '@/components/common/screening/region.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { requestModel } from '@/service/space.js'

export default {
    name: 'modelSchool',

    data() {
        return {
            breadcrumb: [
                { path: '/space', name: '空间' },
                { path: '', name: '创客示范校列表' }
            ],
            items: [],

            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0,
            },

            region: {
                provinceId: '',
                cityId: '',
                areaId: ''
            },

            schoolName: '',
        }
    },

    created() {
        this.requestList()
    },

    components: {
        'v-region': regionCpt,
        'v-search': search,
        'v-pagination': pagination
    },

    methods: {
        // 获取列表数据
        async requestList() {
            const { pageParam, region, schoolName } = this
            const res = await requestModel({
                schoolName,
                ...region,
                ...pageParam,
            })

            if (res.status === 200 && res.data.code === 200) {
                const { resultData, totalNum } = res.data.entity || {}
                this.items = resultData || []
                this.items.forEach((i) => {
                    i.counts = [
                        { name: '创客', value: i.spaceNum ? i.spaceNum : 0 },
                        { name: '成果', value: i.resultNum ? i.resultNum : 0 },
                        { name: '特色', value: i.featureNum ? i.featureNum : 0 },
                        { name: '荣誉', value: i.honorNum ? i.honorNum : 0 }
                    ]
                })
                this.pageParam.totalNum = totalNum || 0
            }
        },

        // 地区改变
        changeRegion([provinceId = '', cityId = '', areaId = ''] = []) {
            this.region = { provinceId, cityId, areaId }
            this.requestList()
        },

        // 搜索框改变
        setKeyWords(str) {
            this.schoolName = str
            this.requestList()
        },
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
.model_li_countsUl {
    display: flex;
    .model_li_countsLi {
        flex: 1;
        & + .model_li_countsLi {
            border-left: 1px solid #bbb;
        }
        .model_li_countsLi_name {
            margin-top: 5px;
            font-size: 12px;
            color: #bbb;
        }
    }
}
.listBox{
    .searchBox {
        padding: 6px 8px 6px 0;
        margin: 20px 0;
        background-color: #fff;
    }
}
</style>
