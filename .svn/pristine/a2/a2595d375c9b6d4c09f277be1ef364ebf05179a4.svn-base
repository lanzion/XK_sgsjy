<template>
  <div class="model-school">
    <v-banner></v-banner>
    <div class="container listBox">
      <section class="classify-box">
        <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
      </section>
      <div class="searchBox">
        <v-search @search="setKeyWords" tips="请输入学校名称"></v-search>
      </div>
      <v-list :items="lists" :listData="listData">
        <template scope="props">
          <div class="list-item-img__box">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
          </div>
          <h6 class="list-item-title ellipsis">{{ props.item.schoolName || '暂无学校名称' }}</h6>
          <ul class="cols-list list-item-count">
            <li class="cols-item">成果: {{props.item.resultNum || 0}}</li>
            <li class="cols-item">特色: {{props.item.featureNum || 0}}</li>
            <li class="cols-item">荣誉: {{props.item.honorNum || 0}}</li>
          </ul>
        </template>
      </v-list>
      <v-pagination :param="pageParam" :change-page="requestList"></v-pagination>
    </div>
  </div>
</template>

<script>
  import banner from 'Common/banner.vue'
  import region from 'Common/screening/region.vue'
  import nav from 'Common/nav.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'
  import search from 'Common/search.vue'
  import pagination from 'Common/pagination.vue'
  import { requestModelSchoolList } from '@/service/model_school.js'

  export default {
    name: 'modelSchool',

    data () {
      return {
        listData: {
          col: 4,
          pathUrl: '/model/school',
          params: {
            names: 'id',
            val: 'id'
          }
        },

        lists: [],

        pageParam: {
          pageNum: 1,
          pageSize: 16,
          totalNum: 0,
        },

        region: {
          provinceId: '',
          cityId: '',
          areaId: ''
        },

        schoolName: '',
      }
    },

    created () {
      this.requestList()
    },

    components: {
      'v-banner': banner,
      'v-region': region,
      'v-nav': nav,
      'v-list': list,
      'v-search': search,
      'v-pagination': pagination
    },

    methods: {
      // 获取列表数据
      async requestList () {
        const {pageParam, region, schoolName} = this
        const res = await requestModelSchoolList({
          schoolName,
          ...region,
          ...pageParam,
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.lists = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      // 地区改变
      changeRegion ([provinceId = '', cityId = '', areaId = ''] = []) {
        this.region = {provinceId, cityId, areaId}
        this.requestList()
      },

      // 搜索框改变
      setKeyWords (str) {
        this.schoolName = str
        this.requestList()
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cols.scss";
</style>
