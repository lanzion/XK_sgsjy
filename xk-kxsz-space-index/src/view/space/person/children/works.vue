<template>
  <div class="works">
    <!--<div class="sum fr">总计：<span class="red">21563</span></div>-->
    <div class="options-and-search clearfix">
      <div class="options fl">
        <multi-select :selectData="category" model="works" :ifAll="false" :clearable="true"
                      style="width:175px;display:inline-block;"></multi-select>
        <single-select :selected.sync="selected.technology"
                       :single-select-data="{groupCode: 'technicalClassification', placeholder: '选择技术'}"
                       style="width:175px;"></single-select>
      </div>
      <div class="fr">
        <span class="total">共计<em class="blue">{{pageParam.totalNum}}</em>个作品</span>
        <search class="fr" @search="setKeyWords"></search>
      </div>
    </div>
    <div class="list-wrapper">
      <ul>
        <list-row v-for="(item, index) in lists" :item="item" module="works" :key="index">
          <h3 slot="title" class="name ellipsis">
            <router-link :to="{path: '/space/worksDetail', query: {id: item.id}}" :title="item.workName" class="link">
              {{item.workName || '暂无'}}
            </router-link>
          </h3>
          <p class="other-info">
            <span>分类：{{item.workTypeName || '无'}}</span>
            <span>技术：{{item.technologyName || '无'}}</span>
            <span>浏览：<em class="blue">{{item.browseNum}}</em>人</span>
            <span>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
          </p>
          <!--<p class="other-info date gray">
            <span>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span><span>浏览：{{item.browseNum}}</span>
          </p>-->
          <div slot="operate" class="operate pa">
            <a v-if="!!item.isEvalua" @click="toDetailPage(item)" class="btn" href="javascript:;">去评价</a>
          </div>
        </list-row>
      </ul>
      <p v-if="!lists.length" class="no-data">暂无数据</p>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
    </div>
  </div>
</template>

<script>
  import {requestFrontendWorksList} from '@/service/works.js'
  import pagination from 'components/common/pagination.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import singleSelect from '@/components/common/select/single_select.vue'
  import search from 'components/common/search.vue'
  import listRow from 'components/common/classificationList/list/list_row.vue'

  export default {
    name: 'personWorks', // 教师/学生空间-作品
    data () {
      return {
        category: [], // 分类
        isStudent: this.$route.path.includes('student'),
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          workType: '',
          workName: '',
          technology: ''
        }
      }
    },
    created () {
      this.requestList()
    },
    mounted() {
    },
    components: {
      pagination,
      multiSelect,
      singleSelect,
      search,
      listRow
    },
    methods: {
      async requestList () { // 获取列表数据
        let res = await requestFrontendWorksList({
          ...this.selected,
          createId: this.$route.query.uid,
          workType: this.category.join('-')
        }, this.pageParam)

        if (res.data.code === 200) {
          let _entity = res.data.entity || {}
          this.lists = _entity.resultData || []
          this.pageParam.totalNum = _entity.totalNum
        }
      },
      setKeyWords (str) {
        this.selected.workName = str
      },
      toDetailPage ({workName, id, createTime}) { // 进入空间评价系统
        const label = this.isStudent && 'student' || 'teacher'
        const path = `/space/${label}/works/detail`
        const query = this.$route.query
        let options = {
          beCommentedId: query.uid || '',
          busId: id,
          busName: workName,
          createTime,
          resultList: [],
          target: 3
        }
        this.$ls.set('curEvaluatingItem', options)
        this.$router.push({path, query: {...query, worksId: id}})
      },
    },
    watch: {
      category: {
        handler (val) {
          this.requestList()
        },
        deep: true
      },
      selected: {
        handler (val) {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sum {
    margin-top: -52px;
    font-size: 14px;
    .red {
      color: #d00;
    }
  }

  .options-and-search .total {
    display: inline-block;
    line-height: 34px;
    margin-right: 12px;
    font-size: 14px;
  }

  .list-wrapper {
    margin-top: 10px;
    border-top: 1px solid #c9c9c9;
  }

  .list-wrapper .list-item {
    .date {
      margin-top: 8px;
    }
  }
</style>

