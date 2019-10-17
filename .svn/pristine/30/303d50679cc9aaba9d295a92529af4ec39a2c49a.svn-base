<template>
  <div class="lagou">
    <banner></banner>
    <div class="container list-wrapper">
      <section class="list-group container requirement">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">需求</em></span>
          <router-link to="/street/lagou/list/2" class="btn-more fr">更多>></router-link>
        </p>
        <div class="section-group__content">
          <div class="section-group__item-container clearfix">
            <div class="cover fl">
              <figure class="figure">
                <img src="~@/asset/img/street/lagou_requirement.jpg" class="section-group__item-pic" alt="" width="285"
                     height="480">
              </figure>
            </div>
            <ul class="section-group__item-content fl">
              <li v-for="(item, i) in requirementList" class="section-group__item clearfix">
                <figure class="pic fl">
                  <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                  <!-- <img :src="getFileUrl(item.cover) || listDefault" alt="" class="img" width="160" height="100"> -->
                </figure>
                <div class="section-group__item-main fl">
                  <h5 class="name ellipsis">
                    <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                  </h5>
                  <p class="info">
                    <span class="info-item">类别：{{item.category | translate(demandCategory, {key: 'id'})}}</span>
                    <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                    <br>
                    <span class="info-item">发布人：{{item.createName || item.userName || '暂无'}}</span>
                    <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                  </p>
                </div>
                <div class="operate fr">
                  <router-link :to="{path: '/street/lagou/detail/2', query: {id: item.id}}" class="btn-detail">详情</router-link>
                </div>
              </li>
              <li v-if="!requirementList.length" class="has-no-data isNull-list"></li>
            </ul>
          </div>
        </div>
      </section>
      <section class="list-group container requirement service">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">服务</em></span>
          <router-link to="/street/lagou/list/1" class="btn-more fr">更多>></router-link>
        </p>
        <div class="section-group__content">
          <div class="section-group__item-container clearfix">
            <div class="cover fl">
              <figure class="figure">
                <img src="~@/asset/img/street/lagou_service.jpg" class="section-group__item-pic" alt="" width="285"
                     height="480">
              </figure>
            </div>
            <ul class="section-group__item-content fl">
              <li v-for="(item, i) in serviceList" class="section-group__item clearfix">
                <figure class="pic fl">
                  <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                  <!-- <img :src="getFileUrl(item.cover) || listDefault" alt="" class="img" width="160" height="100" /> -->
                </figure>
                <div class="section-group__item-main fl">
                  <h5 class="name ellipsis">
                    <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                  </h5>
                  <p class="info">
                    <span class="info-item">类别：{{item.category | translate(serviceCategory, {key: 'id'})}}</span>
                    <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                    <br>
                    <span class="info-item">发布人：{{item.createName || '暂无'}}</span>
                    <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                  </p>
                </div>
                <div class="operate fr">
                  <router-link :to="{path: '/street/lagou/detail/1', query: {id: item.id}}" class="btn-detail">详情</router-link>
                </div>
              </li>
              <li v-if="!serviceList.length" class="has-no-data isNull-list"></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { requestFrontendRequirementList } from '@/service/requirement.js'
  import { serviceAuditList } from '@/service/service.js'
  import { mapState, mapActions } from 'vuex'

  import banner from '@/components/common/banner.vue'

  export default {
    name: 'streetLaGouIndex',

    data () {
      return {
        requirementList: [],
        serviceList: [],
      }
    },

    computed: {
      ...mapState('dictionaryCommon', {
        serviceCategory: state => (state.serveCategoryDicList || {}).dicList || [],
        demandCategory: state => (state.demandCategoryDicList || {}).dicList || [],
      })
    },

    created () {
      this.getDictComb('serveCategory')
      this.getDictComb('demandCategory')
      this.requestRequirementList()
      this.requestServiceList()
    },

    components: {
      banner
    },

    methods: {
      ...mapActions('dictionaryCommon', ['getDictComb']),

      // 需求列表
      async requestRequirementList () {

        const res = await requestFrontendRequirementList({pageSize: 4, pageNum: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.requirementList = (res.data.entity || {}).resultData || []
        }
      },

      // 服务列表
      async requestServiceList () {
        const res = await serviceAuditList({auditStatus: 1}, {pageSize: 4, pageNum: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.serviceList = (res.data.entity || {}).resultData || []
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "~@/asset/scss/vars.scss";

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .list-group {
        .section-group__item:hover{
          border-color: $color-value;
        }
        /*.section-group__item-main .link:hover {
          color: $color-value;
        }*/
      }
    }
  }
  .list-group {
    &.service {
      margin-top: 20px;
    }
    .cover {
      padding: 20px 0;
      .figure {
        width: 285px;
        height: 480px;
      }
    }
    .section-group__item-content {
      box-sizing: border-box;
      width: 915px;
      padding-left: 10px;
      padding-top: 12px;
    }
    .section-group__item {
      box-sizing: border-box;
      height: 122px;
      padding: 10px;
      border: 1px solid #fff;
      border-bottom-color: #d2d2d2;
    }
    .pic {
      width: 160px;
      height: 100px;
      .bg-img__wrap {
        width: 100%;
        height: 100%;
      }
      .img {
        display: block;
      }
    }
    .section-group__item-main {
      width: 60%;
      padding: 12px 20px;
      .name {
        line-height: 1.5;
        .link {
          cursor: default;
        }
      }
      .info-item {
        display: inline-block;
        box-sizing: border-box;
        width: 35%;
        line-height: 1.6;
        padding-right: 20px;
        color: #626262;
      }
    }
    .btn-detail {
      border-radius: 4px;
    }
    .has-no-data {
      height: 500px;
      text-align: center;
      border: 0;
    }
  }
</style>


