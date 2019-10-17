<template>
    <div id="information">
        <v-screeningTabs :datas="tabsData"></v-screeningTabs>
        <v-screeningList :datas="listData"></v-screeningList>
    </div>
</template>

<script>
import search from 'Common/search.vue'
import pagination from 'Common/pagination.vue'
import screeningTabs from 'Common/classificationList/classification/screeningTabs.vue'
import screeningList from 'Common/classificationList/list/text/screeningList.vue'
export default {
    name: 'information',
    components: {
        'v-search': search,
        'v-pagination': pagination,
        'v-screeningTabs':screeningTabs,
        'v-screeningList':screeningList
    },
    data() {
        return {
            title: "",
            tabsData: {
            tab_title: "资讯分类",
            tabs:[{ name: '教育资讯', noticeTypeIds: 0},
                    { name: '通知公告', noticeTypeIds: 1}],
            paramsName: "noticeTypeIds"
          },
          listData: {
            url: 'admin/notice/detail/list?pageSize=10',
            ifStatistical: true,
            paramsName: 'noticeTypeIds',
            initial:'0'
          }
        }
    },
    mounted() {

    },
    methods: {

    }
}

</script>

<style lang='scss' scoped>
@import './../../../../asset/scss/vars.scss';
$tab-width: 200px;
#information {
    position: relative;
    width: 100%;
}
.tab {
    position: absolute;
    top: 0;
    bottom: 0;
    width: $tab-width;
    /* height: 644px; */
    border: 1px solid #CFCFCF;
    .tab_title {
        height: 42px;
        line-height: 42px;
        background-color: #F6F6F6;
        font-size: 18px;
        text-indent: 14px;
    }
    .tab_list {
        height: 42px;
        line-height: 42px;
        text-indent: 40px;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 2px solid transparent;
        &.active {
            color: #D00;
            border-color: #D00;
            background-color: #F8EEEE;
        }
    }
}
.mes {
    $item-list-height: 40px;
    $box-padding: 20px;
    position: relative;
    margin-left: $tab-width + 20;
    border: 1px solid #CFCFCF;
    .searchBox {
        padding: 10px;
        border-bottom: 1px solid #D3D3D3;
    }
    .mes_ul,
    .paginationBox {
        padding: 0 20px;
    }
    .mes_ul {
        min-height: $item-list-height * 10;
        padding: $box-padding;
        .mes_li {
            border-bottom: 1px dotted #E3E3E3;
            &:hover .mes_title {
                color: #DD0000;
            }
            .mes_title {
                font-size: 14px;
                line-height: $item-list-height;
                color: $default-color;
                .mes_time {
                    float: right;
                    color: #626262;
                }
            }
        }
    }
    .paginationBox {
        padding: 0 $box-padding;
    }
}
</style>
