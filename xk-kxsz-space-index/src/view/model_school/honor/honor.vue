<template>
  <div class="honor-wrapper listBox">
    <div class="searchBox bgw">
      <search @search="setKeyWords" tips="请输入荣誉标题"></search>
    </div>
    <section class="list-wrapper bgw">
      <list v-bind="{listData: listData, items: list}">
        <template scope="props">
          <figure class="list-item-img__box">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
          </figure>
          <h6 :title="props.item.name" class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
        </template>
      </list>
      <pagination v-bind="{param: pageParam, changePage: requestList}"/>
    </section>
  </div>
</template>

<script>
  import {requestHonorList} from '@/service/model_school.js'

  import pagination from '@/components/common/pagination.vue'
  import search from 'Common/search.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'

  export default {
    name: 'modelHonor', // 示范校--获得荣誉

    inheritAttrs: false,

    data () {
      return {
        list: [],

        listData: {
          col: 4,
          pathUrl: '/model/school/honor/detail',
          params: {
            names: 'id',
            val: 'id'
          }
        },

        pageParam: {
          pageNum: 1,
          pageSize: 12,
          totalNum: 0
        },

        selected: {
          name: '',
        },

        schoolId: this.$route.query.id,
      }
    },

    created () {
      this.requestList()
    },

    components: {
      pagination,
      search,
      list
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestHonorList({
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

      // 搜索
      setKeyWords (str) {
        this.selected.name = str
        this.requestList()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .honor-wrapper {
    font-size: 14px;
    .searchBox {
      padding-right: 14px;
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
