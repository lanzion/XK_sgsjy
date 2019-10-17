<template>
    <section class="contest_dynamic bgc_w">
        <div class="search p15">
            <v-search @search="setSearch"></v-search>
        </div>
        <ul class="dynamic_ul" v-if="listData.length">
            <li class="dynamic_li p15" v-for="(i, k) in listData">
                <router-link :to="{path: '/dynamicDetail', query: { id: $route.query.id, dynamicId: i.id, type: $route.query.type } }">
                    <p class="dynamic_li_title" :title="i.title">{{ i.title | handleWorksDesc(60) }}</p>
                    <p class="dynamic_li_content">{{ i.content | handleWorksDesc(130) }}</p>
                    <p class="dynamic_li_time">{{ i.createDate | dateFormat('yyyy-MM-dd HH:mm') }}</p>
                </router-link>
            </li>
        </ul>
        <div class="empty-block" v-else>暂无数据</div>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </section>
</template>

<script>
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { requestDynamicList } from '@/service/manage.js'

export default {
    data() {
        return {
            listData: [],
            pageParam: {
                totalNum: 0,
                pageSize: 6,
                pageNum: 1
            },
            requestParam: {
                matchId: this.$route.query.id,
                title: ''
            }
        }
    },
    methods: {
        setSearch(val) {
            this.requestParam.title = val
            this.getDataList()
        },
        changePage(val) {
            this.pageParam.pageNum = val
            this.getDataList()
        },
        getDataList() {
            requestDynamicList(this.requestParam, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.listData = res.data.entity.resultData
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        }
    },
    components: {
        'v-search': search,
        'v-pagination': pagination
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
    mounted() {
        this.getDataList()
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.p15 {
    padding: 15px;
    box-sizing: border-box;
}
.contest_dynamic {
    padding-bottom: 20px;
    .search {
        border-bottom: 1px dashed #dfdfdf;
    }
    .dynamic_ul {
        .dynamic_li {
            border-bottom: 1px solid #e5e5e5;
            &:hover .dynamic_li_title{
                color: $theme-color;
            }
            .dynamic_li_title {
                padding: 5px 0 15px;
                font-weight: 400;
                color: #333;
                font-size: 18px;
            }
            .dynamic_li_content {
                line-height: 1.5;
                font-size: 14px;
                color: #626262;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .dynamic_li_time {
                padding-top: 5px;
                color: #999;
            }
        }
    }
}
</style>
