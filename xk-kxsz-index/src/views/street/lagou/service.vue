<template>
  <div class="lagou">
    <div class="container listBox">
      <!-- 面包屑 -->
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/street' }">活动街区</el-breadcrumb-item>
        <el-breadcrumb-item>服务列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="screeningBox no-field">
        <!--<v-cascade model="works" :changeCascade="changeCascade"></v-cascade>-->
        <section class="classify-box">
          <v-classificationDictionary model="serveCategory" :changeDataDic="changeTechnology" groupName="分类"/>
          <dl class="category-box category-input-box clearfix">
            <dd class="category-title"><span class="cate-tit">区域</span>:</dd>
            <dt class="category-list clearfix">
              <xk-region-select class="fl select-region mr10" @region="changeRegion" :clearable="true"/>
              <el-select v-model="selected.schoolName" placeholder="请选择学校" filterable clearable class="fl select-school mr10"
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
      <div id="list" :class="{'has-no-data': !items.length}">
        <transition-group class="list" v-if="items.length" name="list-item" tag="ul" mode="out-in">
            <li class="list-item__box" :style="{width: listWidth}" v-for="(item, index) in items"
                         :key="item.id || index" @click="redirect(pages.detail.demand, { query: { id: item.id }})">
                <div class="bgw list-item__shadow">
                  <figure class="list-item-img__box">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                  </figure>
                  <div class="about-msg no-border">
                    <h6 class="list-item-title ellipsis">{{item.name || '暂无名称'}}</h6>
                    <div class="info-group-box">
                      <span class="info-item" title="收藏"><i class="icon-i-collect"></i> {{item.collectionNum || 0}}</span>
                      <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{item.commentNum || 0}}</span>
                      <span class="info-item" title="浏览"><i class="icon-i-browse"></i> {{item.browseNum || 0}}</span>
                    </div>
                  </div>
                </div>
            </li>
        </transition-group>
        <div v-else class="empty-block">暂无数据</div>
      </div>
      <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
  </div>
</template>

<script>
  import { requestSchoolList } from '@/service/common.js'
  import { serviceAuditList } from '@/service/service.js'
  import cascade from '@/components/common/screening/cascade.vue'
  import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
  import tabs from '@/components/common/tabs.vue'
  import pagination from '@/components/common/pagination.vue'
  import search from '@/components/common/search.vue'

  export default {
    name: 'streetLagouService', // 街区拉勾列表

    data() {
      return {
        curTabIdx: 0,
        count: { name: '服务' },
        items: [],
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
          { name: '全部服务', type: 0 },
          { name: '最多勾搭', type: 1 },
        ],
      }
    },
    computed: {
      listWidth: function () {
        return this.getWidth(4)
      }
    },
    created() {
      this.requestList()
    },
    components: {
      'v-cascade': cascade,
      'v-classificationDictionary': classificationDictionary,
      'v-tabs': tabs,
      'v-pagination': pagination,
      // 'v-region-select': region,
      'v-search': search,
    },
    methods: {
      changePage(val) {
        this.pageParam.pageNum = val
        this.requestList()
      },
      // 需求列表
      async requestList() {
        const source = { 0: 'all', 1: 'isSeduce', 2: 'praiseNum', 3: 'collectionNum', 4: 'shareNum' }
        const sortKey = source[this.curTabIdx]

        const res = await serviceAuditList({
          ...this.selected,
          [sortKey]: 1,
          auditStatus: 1
        }, { ...this.pageParam })

        if (res.status === 200 && res.data.code === 200) {
          const { resultData, totalNum } = res.data.entity || {}
          this.items = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      async requestSchoolList() {
        const res = await requestSchoolList(this.region)

        if (res.status === 200 && res.data.code === 200) {
          this.schoolList = (res.data.appendInfo || {}).comboxList || []
        }
      },

      setCurTab(index) {
        this.curTabIdx = index
      },

      changeTechnology({ id } = {}) {
        this.selected.category = id
      },

      changeRegion([provinceId = null, cityId = null, areaId = null] = []) {
        this.region = { provinceId, cityId, areaId }
        this.selected = { ...this.selected, ...this.region }
        this.selected.schoolName = ''

        // 重置省市区，清空学校列表
        if (!provinceId && !cityId && !areaId) {
          this.schoolList = []
          return
        }

        this.requestSchoolList()
      },

      // 学校搜索框/下拉框改变
      setSearchSchool(name) {
        this.selected.schoolName = name
      },

      setKeyWords(val) {
        this.selected.name = val
      }
    },

    watch: {
      curTabIdx: 'requestList',
      selected: {
        handler() {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/cascader.scss';
@import '~@/assets/css/scss/index_list.scss';

.mr10 {
    margin-right: 10px;
}

.list-item__shadow {
    border-radius: 5px;
    overflow: hidden;
    &:hover {
        box-shadow: 0 3px 5px #D9D9D9;
    }
}
.list-item__box {
    .list-item-img__box {
      padding: 10px;
      box-sizing: border-box;
      .bg-img__wrap {
          height: 172px;
      }
    }
    .about-msg {
        height: 60px;
        padding: 10px;
        .list-item-title {
            font-size: 14px;
            color: #333;
            padding: 10px 0;
            line-height: 1;
        }
        .info-group-box {
            font-size: 14px;
            color: #999;
            line-height: 1.5;
            .info-item {
              margin-right: 20px;
              i {
                font-size: 14px;
                color: #999;
                vertical-align: middle;
              }
            }
        }
    }
}
</style>