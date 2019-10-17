<template>
  <div class="event-wrapper bgw">
    <el-table :data="list" border class="data-table back-stage-table"
              style="width: 100%">
      <el-table-column label="时间" width="390" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.eventDate | dateFormat('yyyy年M月d日')}}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" >
        <template scope="scope">
          <p v-html="handleContent(scope.row.content)"></p>
        </template>
      </el-table-column>
      <!--<el-table-column label="发布时间" sortable show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.createDate | dateFormat('yyyy-MM-dd HH:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="发布人" sortable show-overflow-tooltip/>-->
    </el-table>
    <pagination v-bind="{param: pageParam, changePage: requestList}"/>
  </div>
</template>

<script>
  import {requestEventList} from '@/service/model_school.js'

  import pagination from '@/components/common/pagination.vue'
  import search from 'Common/search.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'

  export default {
    name: 'modelHonor', // 示范校--获得荣誉

    inheritAttrs: false,

    data () {
      return {
        list: [],

        pageParam: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 0
        },

        schoolId: this.$route.query.id,
      }
    },

    created () {
      this.requestList()
    },

    components: {
      pagination,
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestEventList({
          ...this.pageParam,
          schoolId: this.schoolId,
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.list = (resultData || []).sort((a, b) => b.eventDate - a.eventDate)
          this.pageParam.totalNum = totalNum || 0
        }
      },

      handleContent(txt) {
        return !txt ? '暂无内容' : txt.replace(/\n/g, '<br/>')
      }
    },
  }
</script>

<style>
  .event-wrapper .el-table__body-wrapper .cell {
    text-align: center;
  }
</style>
<style lang="scss" scoped>
  .event-wrapper {
    font-size: 14px;
    overflow: hidden;
    padding: 14px;
    .el-table__body-wrapper .cell {
      text-align: center;
    }
    .list-wrapper {
      overflow: hidden;
      #list {
        margin: 10px 0 0;
        padding: 0 5px;
      }
      #pagination {
        box-sizing: border-box;
        padding-right: 14px;
      }
    }
  }
</style>
