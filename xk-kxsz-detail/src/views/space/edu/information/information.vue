<template>
    <div id="information">
        <div class="mes bgc_w">
            <v-tabs :tabs="tabs" :cur_tab='curId' :count="count" :is_search="true" @searchVal="changeSearch" :total="param.totalNum" @cur_tab="listenCurTab"></v-tabs>
            <div v-if="listData.length > 0">
                <ul class="mes_ul">
                    <li class="mes_li" v-for="(item, index) in listData">
                        <router-link :to="{ path: `${$route.matched[0].path}/informationDetail/${curId}`, query: {inforId: item.id, id: $route.query.id }}" class="clearfix" target="_blank">
                        <div class="bg-img__wrap mes_li_img fl" v-if="curId == 0" :style="{ backgroundImage: `url(${getFileUrl(item.pic) || listDefault})` }"></div>
                        <div v-else class="datebox fl">
                            <span class="day"> {{ item.publishDate | dateFormat('dd') }} </span>
                            <span class="yM"> {{ item.publishDate | dateFormat('yyyy-MM') }} </span>
                        </div>
                        <div class="mes_li_content" :class="{ml80 : curId == 1}">
                            <p class="msg">{{item.title}}</p>
                            <p class="content">{{item.content | handleWorksDesc(100)}}</p>
                            <time class="time icon-i-time2"> {{item.publishDate | dateFormat('yyyy-MM-dd HH:mm')}} </time>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div v-else class="empty-block">暂无{{ count.name }}数据</div>
        </div>
        <v-pagination :param="param" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import tabs from 'Common/tabs.vue'
import search from 'Common/search.vue'
import pagination from 'Common/pagination.vue'
import { inforData } from '@/service/homePage.js'

export default {
    name: 'information',
    components: {
        'v-search': search,
        'v-pagination': pagination,
        'v-tabs': tabs
    },
    data() {
        return {
            tabs: [
                { name: '教育资讯' },
                { name: '通知公告' }
            ],
            curId: 0,
            count: {
                name: '资讯',
                color: 'lightBlue'
            },
            listData: [],
            param: {
                pageSize: 5,
                pageNum: 1,
                totalNum: 100
            },
            search: '',
            orgType: ''
        }
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        listenCurTab: function (index) {
            this.param.pageNum = 1
            this.curId = index
            if (index === 0) {
                this.count.name = '资讯'
            } else {
                this.count.name = '公告'
            }
            this.getData(this.tabs[index])
        },
        getData: function (item) {
            inforData({ orgId: this.$route.query.id, noticeTypeId: item.id, title: this.search }, this.param).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.listData = _data.resultData || []
                    this.$set(this.param, 'totalNum', _data.totalNum || 0)
                    this.$set(this.count, 'num', _data.totalNum || 0)
                }
            })
        },
        changePage: function (pageNum) {
            this.$set(this.$data.param, 'pageNum', pageNum)
            this.getData(this.tabs[this.curId])
        },
        changeSearch: function (val) {
            this.search = val
            this.getData(this.tabs[this.curId])
        }
    },
    mounted() {
        this.getDictComb('noticeType').then((res) => {
            if (res.dicList) {
                this.tabs = res.dicList.map((i, k) => ({ name: i.name, type: k, id: i.id }))
                this.getData(this.tabs[this.curId])
            }
        })
    },
    filters: {
        // 处理作品描述字段，字段包括HTML标签内容
        handleWorksDesc(txt = '', len = 50, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$tab-width: 200px;
$dot: 6px;
#information {
    width: 100%;
    font-size: 14px;
    .mes {
        .mes_ul {
            .mes_li {
                padding: 15px;
                border-bottom: 1px solid #dcdcdc;
                .mes_li_img {
                    width: 130px;
                    height: 90px;
                }
                .datebox {
                    position: relative;
                    padding: 7px;
                    box-sizing: border-box;
                    display: inline-block;
                    width: 70px;
                    height: 90px;
                    border: 1px solid #ddd;
                    border-top: 12px solid $theme-color;
                    border-radius: .5em;
                    text-align: center;
                    &::before {
                        position: absolute;
                        content: '';
                        width: $dot;
                        height: $dot;
                        border-radius: 50%;
                        background-color: #fff;
                        transform: translate(-50%, -50%);
                        top: -6px;
                        left: 50%;
                    }
                    .day {
                        display: inline-block;
                        width: 100%;
                        color: $theme-color;
                        font-size: 2em;
                        border-bottom: 2px dotted #ddd;
                        line-height: 1.5;
                    }
                    .yM {
                        font-size: 0.85em;
                        color: #999;
                        line-height: 2;
                    }
                }
                div.ml80 {
                    margin-left: 80px;
                }
                .mes_li_content {
                    height: 90px;
                    margin-left: 150px;
                    .msg {
                        line-height: 2;
                        font-size: 1.14em;
                        color: #333;
                        &:hover {
                            color: $theme-color;
                        }
                    }
                    .content {
                        line-height: 1.4;
                        color: #2b2b2b;
                    }
                    .time {
                        line-height: 1.5;
                        color: #999;
                    }
                }
            }
        }
    }
}

</style>
