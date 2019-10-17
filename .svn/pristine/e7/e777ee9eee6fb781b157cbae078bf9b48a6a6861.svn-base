<template>
  <div id="train">
    <div class="container listBox">
            <div class="screeningBox bgc_w">
                <v-cascade :changeCascade="changeCascade" model="train"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <v-classificationDictionary model="courseGrade" :changeDataDic="changeApplyScope"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" @searchVal="searchParam" :total="pageParam.totalNum"></v-tabs>
            <v-list :listData="listData" :items.sync="items">
                <template scope="props">
                    <div class="bgc_w">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                        </div>
                        <h6 class="list-item-title">{{ props.item.name }} <span class="fr" style="color: #D00;">{{ props.item.score }}分</span></h6>
                        <ul class="cols-list list-item-count clearfix">
                            <li class="cols-item free"> 免费 </li>
                            <li class="cols-item fr icon-i-person"> {{ props.item.memberNum ? props.item.memberNum : 0 }} 人在玩 </li>
                        </ul>
                    </div>
                </template>
            </v-list>
            <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        </div>
  </div>
</template>

<script>
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import cascade from 'Common/screening/cascade.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import pagination from 'Common/pagination.vue'
import { listTrain } from '@/service/admin_configure.js'
export default {
    name: 'train',
    components: {
        "v-classificationDictionary": classificationDictionary,
        "v-cascade": cascade,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination': pagination
    },
    data () {
        return {
            type: '',
            technology: '',
            grade: '',
            search: '',
            tabs: [
                { name: '全部实训', type: 0},
                { name: '好评', type: 1},
                { name: '热门', type: 2}
            ],
            cur_tab: 0,
            is_search: true,
            count: {name: '项目'},
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            },
            listData: {
                col: 4,
                pathUrl: '/education/train/detail/evaluate',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            route: 'educationBureauSpace'
        }
    },
    mounted() {
        this.getData({}, this.pageParam )
    },
    computed: {
        params: function() {
            return Object.assign( {}, {type: this.type}, {technology: this.technology}, {grade: this.grade}, {name: this.search}, {cur_tab: this.cur_tab})
        }
    },
    methods: {
        setCurTab: function (index) {
            this.cur_tab = index;
        },
        getData (param) {
            listTrain(param, this.pageParam).then(res => {
                if(res.data.code == 200) {
                    this.items = res.data.entity.resultData
                    this.$set(this.$data.pageParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pageParam,'pageNum', val)
            this.jud()
        },
        changeCascade (data) {
            let cascadeCode = Array.from(data, x => x.id)
            this.$set(this.$data, 'type', cascadeCode.join('-'))
        },
        changeTechnology(data) {
            this.$set(this.$data, 'technology', data.id)
        },
        changeApplyScope(data) {
            this.$set(this.$data, 'grade', data.id)
        },
        jud() {
            const module = [
                    {},
                    {'recommend': 1},
                    {'recommend': 1}
                ][this.cur_tab]
            this.getData(Object.assign({}, this.params, module))
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                this.jud()
            },
            deep: true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
#train {
    margin-top: 30px;
}
.tabs {
    margin-top: 30px;
}
.cols-item {
    border:none !important;
}
.list-item-title {
    height: 30px;
    line-height: 30px;
    padding: 0 1em;
}
.list-item-count {
    padding: 0 14px 10px;
    .free {
        color: #2bbb61;
    }
}
</style>
