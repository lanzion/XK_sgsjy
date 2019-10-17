<template>
  <div id="resources">
    <div class="container listBox">
      <div class="screeningBox">
                <v-cascade :model="'project'" :isAll='true' :changeCascade="changeField"></v-cascade>
        <v-classificationDictionary :model="'technicalClassification'" :changeDataDic="changeTechnology"></v-classificationDictionary>
        <v-classificationDictionary :model="'resourceFormats'" :changeDataDic="changeFormats"></v-classificationDictionary>
      </div>
            <v-tabs :tabs="tabs" :cur_tab="cur_tab" @searchVal="searchParam" :total="totalNum" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs"></v-tabs>
            <v-list :collectionData="collectionData" :linkTo="'/educationBureauSpace/collection/details'"></v-list>
      <v-pagination :param="param" :changePage="changePage"></v-pagination>
        </div>
  </div>
</template>

<script>
import cascade from 'Common/screening/cascade.vue'
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'components/resource/collection_list.vue'
import pagination from 'Common/pagination.vue'

import { requestcFrontendResourceList } from '@/service/resource.js'

export default {
  name: 'resources',
  components: {
    "v-cascade": cascade,
    "v-classificationDictionary": classificationDictionary,
        'v-tabs': tabs,
        'v-list': list,
    'v-pagination':pagination
    },
  data () {
    return {
        tabs: [
                { name: '全部资源', type: 0},
        { name: '最多浏览', type: 1},
                { name: '最新点赞', type: 2},
                { name: '最多收藏', type: 3},
                { name: '最多分享', type: 4},
                { name: '最多下载', type: 5},
        { name: '最高评分', type: 6 }
            ],
            cur_tab: 0,
            is_always_req: true,
            is_search: true,
            count: {
                name: '收藏'
            },
      totalNum:0,
      search:'',
      collectionData: [],
      param:{
        totalNum:0,
        pageSize:10,
        pageNum:1
      },
      pageParam:{
        pageSize:10,
        pageNum:1
      },
      resourceType:'',
      technology:'',
      fileType:''
    }
  },
  created(){
  },
  mounted(){
    this.getCollectionList({'orgId': this.$route.query.id,'auditStatus':1})
  },
  computed: {
      params: function() {
          return Object.assign( {}, {resourceType:this.resourceType}, {technology: this.technology}, {fileType:this.fileType}, {search:this.search}, {cur_tab: this.cur_tab},)
      }
  },
  watch:{
    params:{
      handler:function(val,oldVal){
        switch (val.cur_tab){
          case '1' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,browseNum:1,orgId:this.$route.query.id});
            break;
          case '2' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,praise:1,orgId:this.$route.query.id});
            break;
          case '3' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,collection:1,orgId:this.$route.query.id});
            break;
          case '4' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,shareNum:1,orgId:this.$route.query.id});
            break;
          case '5' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,downNum:1,orgId:this.$route.query.id});
            break;
          case '6' :
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,avgScore:1,orgId:this.$route.query.id});
            break;
          default:
            this.getCollectionList({'auditStatus':1,resourceType:val.resourceType,technology:val.technology,fileType:val.fileType,name:val.search,orgId:this.$route.query.id});
        }
      }
    }
  },
  methods: {
    searchParam(val){
      this.search = val;
    },
    changeField(val) {
      console.log(val)
      let cascadeCode = Array.from(val, x => x.code)
      this.$set(this.$data, 'resourceType', cascadeCode.join('-'))
    },
    changeTechnology(val){
     this.$set(this.$data, 'technology', val.code)
    },
    changeFormats(val){
      this.$set(this.$data, 'fileType', val.code)
    },
    setCurTab: function (index) {
        this.cur_tab = index;
    },
    changePage(pageNum) {
      this.$set(this.$data.pagParam, 'pageNum', pageNum);
      this.getCollectionList()
    },
    /*
    *获取前台资源列表
    *orgId:组织Id
    *praise：
    *resourceType：资源类型
    *technology：技术分类
    *
    */
    getCollectionList(params){
      requestcFrontendResourceList(params,this.pageParam).then((res)=>{
        // console.log(res);
        if(res.data.entity != null){
          this.param.totalNum = res.data.entity.totalNum;
          this.totalNum = res.data.entity.totalNum;
          this.collectionData = res.data.entity.resultData;
        }else{
          this.pageParam.totalNum = 0;
          this.totalNum = 0;
          this.collectionData = [];
        }
      })
    }
  }
}

</script>