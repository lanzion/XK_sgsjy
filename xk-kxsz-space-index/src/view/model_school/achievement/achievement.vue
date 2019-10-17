<template>
  <div class="achievement-wrapper listBox clearfix">
    <div class="aside fl bgw">
      <h3 class="aside-title">创客建设</h3>
      <el-menu class="el-menu-demo" @select="handleSelect" @close="handleSubMenuClose">
        <el-submenu index="1">
          <template slot="title">全部分类</template>
          <el-menu-item v-for="(item, idx) in categoryList" :index="item.id" :key="idx">{{item.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main bgw">
      <div class="searchBox">
        <search @search="setKeyWords" tips="请输入成果标题"></search>
      </div>
      <ul class="achievement-list">
        <router-link v-for="(item, idx) in list" :to="{path: '/model/school/achv/detail', query: {id: item.id}}"
                     tag="li" :key="idx" :title="item.name" class="achievement-item clearfix">
          <span class="label fl">【{{item.type | translate(categoryList, {key: 'id'})}}】</span>
          <span class="name ellipsis fl">{{item.name || '暂无成果名称'}}</span>
          <span class="date gray fr">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
          <span class="creator gray fr">{{item.createName}}</span>
        </router-link>
        <li v-if="list.length === 0" class="no-data"></li>
      </ul>
      <pagination v-bind="{param: pageParam, changePage: requestList}"/>
    </div>
  </div>
</template>

<script>
  import {
    requestAchievementList,
    requestAchievementCategoryList,
  } from '@/service/model_school.js'

  import pagination from '@/components/common/pagination.vue'
  import search from 'Common/search.vue'

  export default {
    name: 'modelAchievement', // 示范校--建设成果

    inheritAttrs: false,

    data () {
      return {
        list: [],

        pageParam: {
          pageNum: 1,
          pageSize: 20,
          totalNum: 0
        },

        selected: {
          name: '',
          type: null,
        },

        schoolId: this.$route.query.id,
      }
    },

    props: {
      categoryList: Array
    },

    created () {
      this.requestList()
    },

    components: {
      pagination,
      search,
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestAchievementList({
          ...this.pageParam,
          ...this.selected,
          schoolId: this.schoolId,
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.list = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      handleSubMenuClose () {
        this.selected.type = null
        this.requestList()
      },

      handleSelect (key) {
        this.selected.type = key
        this.requestList()
      },

      // 搜索
      setKeyWords (str) {
        this.selected.name = str
        this.requestList()
      }
    },
  }
</script>
<style lang="scss">
  $theme-color: #2797ed;
  .achievement-wrapper {
    .el-submenu .el-menu {
      background-color: #fff;
    }
    .el-submenu__title {
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      text-indent: 10px;
      &:hover {
        background-color: #fff;
      }
    }
    .el-menu-item {
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      border-left: 2px solid #fff;
      &.is-active,
      &:hover {
        border-left-color: $theme-color;
        color: $theme-color;
      }
      &.is-active {
        background-color: #e2f1fc;
      }
    }
    .main {
      overflow: hidden;
    }
  }
</style>
<style lang="scss" scoped>
  $theme-color: #2797ed;

  .achievement-wrapper {
    font-size: 14px;
    .aside {
      width: 200px;
      min-height: 300px;
      margin-right: 20px;
      padding-bottom: 20px;
      .aside-title {
        height: 40px;
        line-height: 40px;
        text-indent: 20px;
        font-weight: 600;
        border-bottom: 1px solid #d3d3d3;
      }
    }
    .main {
      overflow: hidden;
      padding-right: 15px;
    }
    .achievement-list {
      padding-left: 10px;
    }
    .achievement-item {
      box-sizing: border-box;
      line-height: 50px;
      border-bottom: 1px dashed #ddd;
      cursor: pointer;
      &:hover {
        .label, .name {
          color: $theme-color;
        }
      }
      .name {
        max-width: 600px;
      }
      .gray {
        color: #999;
      }
      .date {
        margin-left: 20px;
      }
    }
  }
</style>
