<template>
  <div class="backend-lagou__wrapper">
    <div class="options-and-search clearfix">
      <div class="options fl">
        <el-select v-model="selected.type" clearable style="width:175px;display:inline-block;">
          <el-option v-for="(item, idx) in options.type" :key="idx" :label="item" :value="idx + 1"/>
        </el-select>
        <el-select v-model="selected.status" clearable style="width:175px;display:inline-block;">
          <el-option v-for="(item, idx) in options.status" :key="idx" :label="item" :value="idx + 1"/>
        </el-select>
      </div>
      <search class="tab-search fr" @search="search" tips="勾搭对象"></search>
    </div>

    <el-table :data="list" border class="data-table back-stage-table"
              style="width: 100%">
      <el-table-column prop="busName" label="勾搭对象" show-overflow-tooltip>
        <template scope="scope">
          <router-link :to="{path: `/street/lagou/detail/${scope.row.type}`, query: {id: scope.row.busId}}" class="link">
            {{scope.row.busName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="勾搭类型" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.type === '1' && '服务' || '需求'}}
        </template>
      </el-table-column>
      <el-table-column prop="publisherName" label="发布人" show-overflow-tooltip/>
      <el-table-column prop="seduceDate" label="勾搭时间" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.seduceDate | dateFormat('yyyy-MM-dd')}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="状态" show-overflow-tooltip>
        <template scope="scope">
          {{handleStatus(scope.row.status || 1)}}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-bind="{param: pageParam, changePage: requestList}"/>
  </div>
</template>

<script>
  import { requestBackendLagouList } from '@/service/requirement.js'
  import search from 'components/common/search.vue'
  import pagination from '@/components/common/pagination.vue'

  export default {
    name: 'backendLagou', // 后台拉勾

    data () {
      return {
        list: [],
        options: {
          type: ['服务', '需求'],
          status: ['勾搭中', '洽谈中', '勾搭成功', '勾搭失败']
        },
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 0
        },
        selected: {
          busName: '',
          type: '',
          status: '',
        },
      }
    },

    created () {
      this.requestList()
    },

    components: {
      search,
      pagination
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestBackendLagouList({
          ...this.pageParam,
          ...this.selected,
          seduceId: this.$ls.get('loginUId')
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.list = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      handleStatus (status) {
        return this.options.status[status - 1]
      },

      search (val) {
        this.selected.busName = val
      },
    },

    watch: {
      selected: {
        handler () {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .backend-lagou__wrapper {
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px;
    .options-and-search {
      margin-bottom: 20px;
    }
    .el-table {
      .cell {
        text-align: center;
        .link {
          color: #0594e8;
          &:hover {
            color: #d00;
          }
        }
      }
    }
  }
</style>
