<template>
  <div id="edu_activity">
    <div class="container listBox">
      <div class="screeningBox">
        <v-cascade :model="'project'" :isAll='true' :changeCascade="changeActivityType"></v-cascade>
        <v-classificationDictionary :model="'activeState'" :changeDataDic="changeStatus"></v-classificationDictionary>
        <v-classificationDictionary :model="'activityRegister'" :changeDataDic="changeEnrollStatus"></v-classificationDictionary>
      </div>
      <v-tabs :tabs="tabs" @searchVal="searchParam" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" class="tabs" :total="totalNum"></v-tabs>
      <v-list :listData="listData" :linkTo="'/schoolSpace/activityDetails'"></v-list>
      <v-pagination :param="param" :changePage="changePage"></v-pagination>
    </div>
  </div>
</template>

<script>
import classificationDictionary from './../../common/screening/classificationDictionary.vue'
import cascade from './../../common/screening/cascade.vue'
import tabs from './../../common/classificationList/classification/tabs.vue'
import pagination from './../../common/pagination.vue'
import list from '../../activity/activity_list.vue'

import { requestActivityFrontendList } from '@/service/activity.js'

export default {
  name: 'eduActivity',
  components: {
    'v-classificationDictionary': classificationDictionary,
    'v-cascade': cascade,
    'v-tabs': tabs,
    'v-pagination': pagination,
    'v-list': list
  },
  data () {
    return {
      param:{
        totalNum:0,
        pageSize:10,
        pageNum:1
      },
      search:'',
      tabs: [
        { name: '全部活动', type: 0},
        { name: '热门活动', type: 1}
      ],
      cur_tab: 0,
      is_always_req: true,
      is_search: true,
      count: {
        name: '项目'
      },
      totalNum:0,
      pageParam: {
        pageSize:10,
        pageNum:1
      },
      items:[],
      listData: [],
      activityType:'',
      status:'',
      partSort:'',
      enrollStatus:''
    }
  },
  mounted() {
    this.getActivityList({title:this.search,activityType:this.activityType,enrollStatus:this.enrollStatus,status:this.status,orgId:'bf9032b3b20548e2b766acae02c2b2f9'});
  },
  computed: {
    params:function(){
      return Object.assign({}, {title:this.search}, {activityType:this.activityType}, {enrollStatus:this.enrollStatus},{status:this.status},{cur_tab:this.cur_tab});
    }
  },
  watch: {
    params:{
      handler:function(val,oldVal){
        if(val.cur_tab === '1'){
          this.getActivityList({title:val.title,activityType:val.activityType,enrollStatus:val.enrollStatus,status:val.status,partSort:1,orgId:'bf9032b3b20548e2b766acae02c2b2f9'});
        }else{
          this.getActivityList({title:val.title,activityType:val.activityType,enrollStatus:val.enrollStatus,status:val.status,orgId:'bf9032b3b20548e2b766acae02c2b2f9'});
        };
      }
    }
  },
  methods: {
    searchParam (val){
      this.search = val
    },
    changeActivityType(val) {
      let activity = [];
      if(val.length > 1){
        activity = Array.from(val,x => x.code);
        this.$set(this.$data,'activityType',activity.join('-'));
      }else{
        this.activityType = ''
      }
    },
    changeStatus(val){
      this.$set(this.$data,'status',val.code);
    },
    changeEnrollStatus(val){
      this.$set(this.$data,'enrollStatus',val.code);
    },
    changePage(val){
      this.pageParam.pageNum = val;
      this.getActivityList({title:val.title,activityType:val.activityType,enrollStatus:val.enrollStatus,status:val.status,orgId:'bf9032b3b20548e2b766acae02c2b2f9'});
    },
    setCurTab(index) {
      this.cur_tab = index;
    },
    /*
    *获取活动列表
    *title:活动名称
    *activityType:活动类型
    *partSort:按参加人数排序
    *enrollStatus:报名状态
    *status:活动状态(0.未开始 1.进行中,2.已结束)
    *orgId:组织id
     */
    getActivityList(params){
      requestActivityFrontendList(params,this.pageParam).then((res)=>{
        console.log(res);
        if( res.data.entity != null){
          this.param.totalNum = res.data.entity.totalNum;
          this.totalNum = res.data.entity.totalNum;
          this.listData = res.data.entity.resultData;
        }else{
          this.listData = [];
          this.param.totalNum = 0;
          this.totalNum = 0;
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
