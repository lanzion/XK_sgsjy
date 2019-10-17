<template>
  <div class="story">
    <div class="container listBox">
      <div class="screeningBox no-field">
        <section class="classify-box">
          <v-classificationDictionary model="storyCategory" :changeDataDic="changeTechnology" groupName="分类"/>
          <dl class="category-box category-input-box clearfix">
            <dd class="category-title">区域:</dd>
            <dt class="category-list clearfix">
              <v-region-select class="fl select-region" @region="changeRegion" :clearable="true"/>
              <el-select v-model="selected.schoolName" placeholder="请选择学校" filterable clearable class="fl select-school"
                         @change="setSearchSchool">
                <el-option
                  v-for="item in schoolList"
                  :key="item.id"
                  :label="item.schoolName"
                  :value="item.schoolName">
                </el-option>
              </el-select>
              <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"/>
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
            <p class="desc">{{props.item.content || '暂无描述内容' | handleStoryDesc(32)}}</p>
          </div>
        </template>
      </v-list>
      <v-pagination :param="pageParam" :change-page="requestStoryList"></v-pagination>
    </div>
  </div>
</template>

<script>
  import { requestSchoolList } from '@/service/common.js'
  import { requestFrontendStoryList } from '@/service/story.js'
  import cascade from 'Common/screening/cascade.vue'
  import classificationDictionary from 'Common/screening/classificationDictionary.vue'
  import tabs from 'Common/classificationList/classification/tabs.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'
  import pagination from 'Common/pagination.vue'
  import region from '@/components/common/select/region_select.vue'
  import search from '@/components/common/search.vue'

  export default {
    name: 'streetStory', // 街区故事列表

    data () {
      return {
        curTabIdx: 0,
        count: {name: '故事'},
        items: [],
        listData: {
          col: 4,
          pathUrl: '/street/excellent/story/detail',
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
          {name: '全部故事', type: 0},
          {name: '最多浏览', type: 1},
          {name: '最多点赞', type: 2},
          {name: '最多收藏', type: 3},
          {name: '最多分享', type: 4},
        ],
      }
    },
    created () {
      this.requestStoryList()
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
      // 获取故事列表
      async requestStoryList () {
        const source = {0: 'all', 1: 'browseNum', 2: 'praiseNum', 3: 'collectionNum', 4: 'dynamicCount'}
        const sortKey = source[this.curTabIdx]

        const res = await requestFrontendStoryList({
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

    filters: {
      // 处理故事描述字段，字段包括HTML标签内容
      handleStoryDesc (txt = '', len = 50, sep = '...') {
        let reg = new RegExp('(.{' + len + '}).+')
        return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
      }
    },

    watch: {
      curTabIdx: 'requestStoryList',
      selected: {
        handler () {
          this.requestStoryList()
        },
        deep: true
      }
    }
  }
</script>
