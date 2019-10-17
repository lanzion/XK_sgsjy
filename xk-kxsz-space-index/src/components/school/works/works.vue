<template>
    <div id="schoolWorks">
      <div class="container listBox">
          <div class="screeningBox">
                <v-cascade model="project" :changeCascade="changeCascade"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            </div>
      <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" :total="pagParam.totalNum" @searchVal="searchParam" ></v-tabs>
      <v-list :listData="listData" :items="items">
                <template scope="props">
                    <div class="list-item-img__box">
                        <img :src="getFileUrl(props.item.resourceId)">
                    </div>
                    <h6 class="list-item-title clearfix"><span class="fl">{{props.item.workName}}</span><span class="fr">{{props.item.browseNum}}人看过</span></h6>
                </template>
            </v-list>
            <v-pagination :param.sync='pagParam' :changePage="changePage"></v-pagination>
    </div>
  </div>
</template>

<script>
import cascade from './../../common/screening/cascade.vue'
import classificationDictionary from './../../common/screening/classificationDictionary.vue'
import tabs from './../../common/classificationList/classification/tabs.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import { requestFrontendWorksList } from '@/service/works.js'
import pagination from 'Common/pagination.vue'
export default {
    name: 'schoolWorks',
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
                pathUrl: '/educationBureauSpace/works/details',
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
                pageSize: 10,
                totalNum: 100
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
            requestFrontendWorksList(param, this.pagParam).then(res => {
                if(res.data.code == 200) {
                    this.items = res.data.entity.resultData
                    this.$set(this.pagParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        changePage(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
        searchParam (val){
            this.search = val
        },
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData()
        }
    },
    mounted() {
        this.getData({'orgId': this.$route.query.id})
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
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'browseNum': 1})
                    break;cascadeCode
                    case '2':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'praiseCount': 1})
                    break;
                    case '3':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'collectionCount': 1})
                    break;
                    case '4':
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id, 'dynamicCount': 1})
                    break;
                    default:
                    this.getData({'technology':val.technology, 'workType':val.cascadeCode, 'workName': val.search, 'orgId': this.$route.query.id})
                }
            },
            deep: true
        }
    }
}

</script>

<style lang='scss' scoped>
@import './../../../asset/scss/item_list.scss';
.screeningBox {
    border: 1px solid #C9C9C9;
    padding: 10px 15px;
    margin-bottom: 10px;
}
</style>
