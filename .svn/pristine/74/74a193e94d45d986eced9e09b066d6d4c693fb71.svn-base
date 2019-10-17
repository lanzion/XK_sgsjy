<template>
  <div id="course">
    <div class="container listBox">
      <div class="screeningBox">
        <v-cascade :changeCascade="changeCascade" model="project"></v-cascade>
        <v-classificationDictionary model="technicalClassification"
                                    :changeDataDic="changeTechnology"></v-classificationDictionary>
        <v-classificationDictionary model="courseGrade" :changeDataDic="changeLevel"></v-classificationDictionary>
      </div>
      <v-tabs :tabs="tabs" :cur_tab="selected.orderDesc" :is_search="is_search" :count="count" @cur_tab="setCurTab"
              @searchVal="setKeyWords" :total="pageParam.totalNum" class="tabs"></v-tabs>
      <v-list :listData="listData" :items.sync="items">
        <template slot-scope="props">
          <div class="bgc_w">
            <div class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover)" width="285" height="206" /> -->
            </div>
            <h6 class="list-item-title clearfix">
              <span class="name fl">{{ props.item.name }}</span>
              <span class="score fr">{{ props.item.score || 0 }}分</span>
            </h6>
            <p class="other-info clearfix">
              <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span>
              <span class="num fr">{{props.item.num || 0}}人学习</span>
            </p>
          </div>
        </template>
      </v-list>
      <v-pagination :param.sync="pageParam" :change-page="requestCourseList"></v-pagination>
    </div>
  </div>
</template>

<script>
  import {requestFrontendList} from '@/service/course.js'
  import classificationDictionary from 'Common/screening/classificationDictionary.vue'
  import cascade from 'components/common/screening/cascade.vue'
  import tabs from 'Common/tabs.vue'
  import list from 'Common/list/graphic/list.vue'
  import pagination from 'components/common/pagination.vue'

  export default {
    name: 'course',
    data () {
      return {
        count: {
          num: 0,
          name: '课程'
        },
        is_search: true,
        items: [],
        listData: {
          col: 4,
          pathUrl: this.pages.detail.course.path,
          params: {
            names: 'id',
            val: 'id'
          }
        },
        pageParam: {
          pageNum: 1,
          pageSize: 16,
          totalNum: 0
        },
        selected: {
          courseType: '', // 课程分类
          grade: '', // 级别
          name: '', // 课程名
          orderDesc: '0', // 排序(1.按好评,2.热门)
          orgId: this.$route.query.id || '', // 组织id（教育局id,学校id，教师id）
          technologyId: '' // 技术id
        },
        tabs: [
          {name: '全部课程', type: 0},
          {name: '好评', type: 1},
          {name: '热门', type: 2}
        ]
      }
    },
    components: {
      'v-classificationDictionary': classificationDictionary,
      'v-cascade': cascade,
      'v-tabs': tabs,
      'v-list': list,
      'v-pagination': pagination
    },
    created () {
      this.requestCourseList()
    },
    methods: {
      async requestCourseList (page) { // 获取课程列表
        page !== undefined && (this.pageParam.pageNum = page)
        let res = await requestFrontendList({
          ...this.selected,
          ...this.pageParam
        })
        if (res.status === 200) {
          let _entity = res.data.entity
          this.items = _entity && _entity.resultData || []
          this.pageParam.totalNum = _entity && _entity.totalNum || 0
        }
      },
      changeCascade (data) { // 同步领域字段
        this.selected.technologyId = data.map(item => item.id).join('-')
      },
      changeTechnology (data) { // 同步相关技术字段
        this.selected.courseType = data.code
      },
      changeLevel (data) { // 同步级别字段
        this.selected.grade = data.code
      },
      handleIsFree (i) { // 处理费用类型
        let o = {1: '免费', 0: '收费'}
        return o[i]
      },
      setCurTab (index) { // 同步排序字段
        this.selected.orderDesc = index
      },
      setKeyWords (val) { // 同步搜索字段
        this.selected.name = val
      }
    },
    watch: {
      selected: {
        handler () {
          this.requestCourseList()
        },
        deep: true
      }
    }
  }

</script>

<style lang='scss' scoped>
  .screeningBox {
    border: 1px solid #C9C9C9;
    padding: 10px 15px;
  }

  .list-item-img__box {
    height: 206px;
  }

  .list-item-title {
    line-height: 2;
    font-size: 14px;
    padding: 0 1em;
    .score{
      font-size: 12px;
      color: #fd8c88;
    }
  }
  .other-info{
    line-height: 1;
    font-size: 12px;
    padding: 0 1em 10px;
    .free-or-not{
      color: #2bbb61;
    }
  }
  .tabs {
    margin-top: 30px;
  }
</style>

