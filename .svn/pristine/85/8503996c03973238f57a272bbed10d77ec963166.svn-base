<template>
    <div id="works">
        <div class="container listBox">
            <div class="screeningBox">
                <v-cascade model="works" :changeCascade="changeCascade"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" :total="pagParam.totalNum" @searchVal="searchParam" ></v-tabs>
            <v-list :listData="listData" :items="items">
                <template scope="props">
                    <div class="bgc_w">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.resourceId) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.resourceId) || listDefault" /> -->
                        </div>
                        <h6 class="list-item-title">
                            <span>{{props.item.workName | textOverflow(12) }}</span>
                        </h6>
                        <p class="info">
                            <!-- <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectNum || 0}}</span> -->
                            <!-- <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span> -->
                            <span class="info-item" title="浏览"><i class="icon-i-creator"></i> {{props.item.browseNum || 0}}人看过</span>
                        </p>
                    </div>
                </template>
            </v-list>
            <v-pagination :param.sync='pagParam' :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import cascade from 'Common/screening/cascade.vue'
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import { requestInterestsWorksList } from '@/service/works.js'
import pagination from 'Common/pagination.vue'
export default {
    name: 'works',
    components: {
        "v-cascade": cascade,
        "v-classificationDictionary": classificationDictionary,
        "v-tabs": tabs,
        "v-list": list,
        "v-pagination": pagination
    },
    data () {
        return {
            tabs: [
                { name: '全部作品', type: 0},
                { name: '最多浏览', type: 1},
                { name: '最多点赞', type: 2},
                { name: '最多收藏', type: 3},
                { name: '最多分享', type: 4},
            ],
            cur_tab: 0,
            is_search: true,
            count: {name: '作品'},
            listData: {
                col: 5,
                pathUrl: '/space/worksDetail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            cascadeCode: '',
            technology: '',
            items: [],
            pagParam: {
                pageNum: 1,
                pageSize: 20,
                totalNum: 0
            },
            search: ''
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index;
        },
        changeCascade (data) {
            let cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'cascadeCode', cascadeCode.join('-'))
        },
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id)
        },
        getData (param) {
            requestInterestsWorksList(param, this.pagParam).then(res => {
                if(res.data.code == 200 && res.data.entity != null) {
                    this.items = res.data.entity.resultData
                    this.$set(this.pagParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData({'interestId': this.$route.query.id})
        }
    },
    mounted() {
        this.getData({'interestId': this.$route.query.id})
    },
    computed: {
        params: function() {
            return Object.assign( {}, {cascadeCode:this.cascadeCode}, {technology: this.technology}, {search:this.search}, {cur_tab: this.cur_tab})
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
               switch (val.cur_tab) {
                    case '1':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'interestId': this.$route.query.id, 'browseNum': 1})
                    break;
                    case '2':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'interestId': this.$route.query.id, 'praiseCount': 1})
                    break;
                    case '3':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'interestId': this.$route.query.id, 'collectionCount': 1})
                    break;
                    case '4':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'interestId': this.$route.query.id, 'dynamicCount': 1})
                    break;
                    default:
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'interestId': this.$route.query.id})
                }
            },
            deep: true
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
.info {
    font-size: 14px;
    color: #999;
    text-indent: 1em;
    height: 40px;
    line-height: 20px;
    .info-item + .info-item {
        margin-left: 20px;
    }
}
.screeningBox {
    border: none;
}
.list {
    /* padding: 0 10px; */
    box-sizing: border-box;
}
.list-item-title {
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
}
.browseNum {
    height: 40px;
}
</style>
