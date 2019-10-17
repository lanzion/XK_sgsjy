<template>
  <div class="lagou">
    <div class="container listBox">
      <!-- 面包屑 -->
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/street/lagou' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>需求列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="screeningBox no-field">
        <!--<v-cascade model="works" :changeCascade="changeCascade"></v-cascade>-->
        <section class="classify-box">
          <v-classificationDictionary model="demandCategory" :changeDataDic="changeTechnology" groupName="分类"/>
          <dl class="category-box category-input-box clearfix">
            <dd class="category-title">区域:</dd>
            <dt class="category-list clearfix">
              <v-region-select class="fl select-region" @region="changeRegion" :clearable="true"></v-region-select>
              <el-select v-model="selected.schoolName" placeholder="请选择学校" filterable clearable class="fl select-school"
                         @change="setSearchSchool">
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.schoolName"
                  :value="item.schoolName">
                </el-option>
              </el-select>
              <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"></v-search>
            </dt>
          </dl>
        </section>
      </div>
      <v-tabs :tabs="tabs" :cur_tab="curTabIdx" :is_search="true" :count="count" @cur_tab="setCurTab" class="tabs"
              :total="pageParam.totalNum" @searchVal="setKeyWords"></v-tabs>
      <v-list v-bind="{items, listData}">
        <template scope="props">
          <figure class="list-item-img__box">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
          </figure>
          <div class="about no-border">
            <h6 class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
            <p class="info-group">
              <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectionNum || 0}}</span>
              <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span>
              <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{props.item.browseNum || 0}}</span>
            </p>
          </div>
        </template>
      </v-list>
      <v-pagination :param="pageParam" :change-page="requestList"></v-pagination>
    </div>
  </div>
</template>

<script>
  import { requestSchoolList } from '@/service/common.js'
  import { requestFrontendRequirementList } from '@/service/requirement.js'
  import cascade from 'Common/screening/cascade.vue'
  import classificationDictionary from 'Common/screening/classificationDictionary.vue'
  import tabs from 'Common/classificationList/classification/tabs.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'
  import pagination from 'Common/pagination.vue'
  import region from '@/components/common/select/region_select.vue'
  import search from '@/components/common/search.vue'

  export default {
    name: 'streetLagouRequirement', // 街区拉勾列表

    data () {
      return {
        curTabIdx: 0,
        count: {name: '需求'},
        items: [],
        listData: {
          col: 4,
          pathUrl: '/street/lagou/detail/2',
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
        region: {
          province: null,
          city: null,
          area: null
        },
        schoolList: [], // 学校列表
        selected: {
          category: null,
          schoolName: '',
          name: '',
        },
        tabs: [
          {name: '全部需求', type: 0},
          {name: '最多勾搭', type: 1},
        ],
      }
    },
    created () {
      this.requestList()
    },
    components: {
      'v-cascade': cascade,
      'v-classificationDictionary': classificationDictionary,
      'v-tabs': tabs,
      'v-list': list,
      'v-pagination': pagination,
      'v-region-select': region,
      'v-search': search,
    },
    methods: {
      // 需求列表
      async requestList () {
        const source = {0: 'all', 1: 'seduceNum', 2: 'praiseNum', 3: 'collectionNum', 4: 'shareNum'}
        const sortKey = source[this.curTabIdx]

        const res = await requestFrontendRequirementList({
          ...this.pageParam,
          ...this.selected,
          [sortKey]: 1,
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.items = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      async requestSchoolList () {
        const res = await requestSchoolList(this.region)

        if (res.status === 200 && res.data.code === 200) {
          this.schoolList = (res.data.appendInfo || {}).comboxList || []
        }
      },

      setCurTab (index) {
        this.curTabIdx = index
      },

      changeTechnology ({id} = {}) {
        this.selected.category = id
      },

      changeRegion ([provinceId = null, cityId = null, areaId = null] = []) {
        this.region = {provinceId, cityId, areaId}
        this.selected = {...this.selected, ...this.region}
        this.selected.schoolName = ''

        // 重置省市区，清空学校列表
        if (!provinceId && !cityId && !areaId) {
          this.schoolList = []
          return
        }

        this.requestSchoolList()
      },

      // 学校搜索框/下拉框改变
      setSearchSchool (name) {
        this.selected.schoolName = name
      },

      setKeyWords(val) {
        this.selected.name = val
      }
    },

    watch: {
      curTabIdx: 'requestList',
      selected: {
        handler () {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>
