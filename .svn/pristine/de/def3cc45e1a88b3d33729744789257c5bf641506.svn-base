<template>
  <div class="interest">
    <!--<div class="sum fr">总计：<span class="red">21563</span></div>-->
    <div class="options-and-search clearfix">
      <div class="options fl">
        <multi-select :selectData="category" model="interest" :ifAll="false" :clearable="true"
                      style="width:175px;display:inline-block;"></multi-select>
        <single-select :selected.sync="selected.technology"
                       :single-select-data="{groupCode: 'technicalClassification', placeholder: '选择技术'}"
                       style="width:175px;"></single-select>
      </div>
      <div class="fr">
        <span class="total">共计<em class="blue">{{pageParam.totalNum}}</em>个兴趣组</span>
        <search class="fr" @search="setKeyWords"></search>
      </div>
    </div>
    <div class="list-wrapper">
      <ul>
        <list-row v-for="(item, index) in lists" :item="item" :key="index">
          <h3 slot="title" class="name ellipsis">
            <router-link :to="{path: '/interestsSpace/homePage', query: {id: item.id}}" :title="item.name" class="link">
              {{item.name || '暂无'}}
            </router-link>
          </h3>
          <p class="other-info">
            <span>分类：{{item.interestType || '暂无'}}</span>
            <span>创建人：{{item.userName || '暂无'}}</span>
            <span class="member">成员：<i class="blue">{{item.num || 0}}人</i></span>
            <span>创建时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
          </p>
          <!--<p class="gray date">
            <span>创建时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
          </p>-->
          <div slot="operate" class="operate pa">
            <router-link :to="{path: '/interestsSpace/homePage', query: {id: item.id}}" class="btn">
              进入兴趣组
            </router-link>
          </div>
        </list-row>
      </ul>
      <p v-if="!lists.length" class="no-data">暂无数据</p>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
    </div>
  </div>
</template>

<script>
  import {requestMyInterestList} from '@/service/interest.js'
  import {fileBaseUrl} from '@/js/common-config.js'
  import pagination from 'components/common/pagination.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import singleSelect from '@/components/common/select/single_select.vue'
  import search from 'components/common/search.vue'
  import listRow from 'components/common/classificationList/list/list_row.vue'

  export default {
    name: 'personInterest', // 教师/学生空间-兴趣组
    data () {
      return {
        category: [], // 分类
        fileBaseUrl,
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          interestType: '',
          name: '',
          technology: ''
        }
      }
    },
    created () {
      this.requestList()
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
        let res = await requestMyInterestList({
          ...this.selected,
          userId: this.$route.query.uid,
          interestType: this.category.join('-')
        }, this.pageParam)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.lists = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },
      setKeyWords (str) {
        this.selected.name = str
      }
    },
    watch: {
      category: {
        handler: function (val) {
          this.requestList()
        },
        deep: true
      },
      selected: {
        handler: function (val) {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sum {
    margin-top: -40px;
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

