<template>
  <div class="cooperation">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">商业策划</em></span>
          <router-link to="/street/co/list/plan" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: busPlanList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
              <p class="line-info clearfix">
                <span class="category light-red fl">{{props.item.category | translate(busPlanCategory, {key: 'id'})}}</span>
                <span class="date fr"><i class="icon-i-time"></i>{{props.item.createDate | dateFormat('yyyy-MM-dd')}}</span>
              </p>
            </div>
          </template>
        </list>
      </div>
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">众创空间</em></span>
          <router-link to="/multSpace" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: zhChList, listData: listDataOfZhCh}">
          <template scope="props">
            <figure class="list-item-img__box pr">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
              <p class="addr ellipsis"><i class="icon-i-address"></i>{{props.item.address || '暂无地址信息'}}</p>
            </div>
          </template>
        </list>
      </div>
      <div class="list-group case">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">融资案例</em></span>
          <router-link to="/street/co/list/case" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: caseList, listData: listDataOfCase}">
          <template scope="props">
            <figure class="list-item-img__box pr">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
              <p class="total ellipsis">融资总金额：{{props.item.realMoney || 0}}元</p>
              <p class="date"><i class="icon-i-time"></i>{{props.item.createDate | dateFormat('yyyy-MM-dd')}}</p>
            </div>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestActivityFrontendList } from '@/service/activity.js'
  import { requestPlanBackendList, requestCaseList } from '@/service/businessPlan.js'
  import { mapState, mapActions } from 'vuex'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'streetCooperation',

    data () {
      return {
        busPlanList: [], // 策划
        caseList: [], // 案例
        zhChList: [], // 众创
        listData: {
          col: 4,
          pathUrl: '/street/co/plan/detail/info',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        listDataOfZhCh: {
          col: 3,
          pathUrl: '/multSpace/detail',
          params: {
            names: 'id',
            val: 'orgId'
          }
        },
        listDataOfCase: {
          col: 4,
          pathUrl: '/street/co/case/detail/finance',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        pageParam: {
          pageNum: 1,
          pageSize: 4,
        },
      }
    },

    computed: {
      ...mapState('dictionaryCommon', {
        busPlanCategory: state => (state.businessPlanCategoryDicList || {}).dicList || []
      })
    },

    created () {
      this.getDictComb('businessPlanCategory')
      this.requestBusPlanList()
      this.requestZhChList()
      this.requestCaseList()
    },

    components: {
      list,
      banner
    },

    methods: {
      ...mapActions('dictionaryCommon', ['getDictComb']),

      // 获取策划列表
      async requestBusPlanList () {
        const res = await requestPlanBackendList({auditStatus: 1}, {...this.pageParam})

        if (res.status === 200 && res.data.code === 200) {
          this.busPlanList = (res.data.entity || {}).resultData || []
        }
      },

      // 获取众创列表
      async requestZhChList () {
        const res = await this.$http.post('/maker/spaces/listByMultSpace?pageSize=3&pageNum=1', {})

        if (res.status === 200 && res.data.code === 200) {
          this.zhChList = (res.data.entity || {}).resultData || []
        }
      },

      // 获取案例列表
      async requestCaseList () {
        const res = await requestCaseList({...this.pageParam, auditStatus: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.caseList = (res.data.entity || {}).resultData || []
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .list-item__box {
    .list-item-img__box {
      /*height: 250px;
      .list-item-img {
        height: 250px;
      }*/
    }
    .total, .addr {
      margin: 10px 0 12px;
    }
    .date {
      /*margin-bottom: 12px;*/
      color: #999;
    }
  }
</style>


