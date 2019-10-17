<template>
  <div class="street-home">
    <banner></banner>
    <div class="list-wrapper">
      <section class="section-group container">
        <router-link to="/street/excellent" tag="div" class="section-group__header">
          <h3 class="section-group__title pr">
            <em class="line"></em>
            <span class="section-group__title-txt">秀·优品</span>
            <em class="line"></em>
          </h3>
          <p class="section-group__txt">集合创客的创意精华</p>
          <router-link to="/street/excellent/works" class="btn-more pa">更多>></router-link>
        </router-link>
        <div class="section-group__content">
          <ul class="section-group__item-container clearfix">
<!--             <li class="cover">
              <figure class="figure">
                <img src="~@/asset/img/street/street_works.png" class="section-group__cover-pic" alt="" width="390"
                     height="300">
              </figure>
            </li> -->
            <router-link v-for="(item, i) in excellentList" :key="i"
                         :to="{path: item.workName !== undefined ? '/space/works/details' : '/street/excellent/story/detail', query: {id: item.id}}"
                         tag="li" class="section-group__item pr">
              <figure class="figure">
                <div class="bg-img__wrap section-group__item-pic" :style="{ backgroundImage: `url(${getFileUrl(item.resourceId || item.cover) || listDefault})` }"></div>
                <!-- <img :src="getFileUrl(item.resourceId || item.cover) || listDefault" class="section-group__item-pic" width="390" /> -->
              </figure>
              <div class="section-group__item-mask pa">
                <p class="name ellipsis">{{item.workName || item.name || '暂无名称'}}</p>
                <p class="info">
                  <span class="info-item"><i class="icon-btn-collection"></i> {{item.collectNum || 0}}</span>
                  <span class="info-item"><i class="icon-btn-i-reply"></i> {{item.commentNum || 0}}</span>
                  <span class="info-item"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                </p>
              </div>
            </router-link>
            <li v-if="!excellentList.length" class="has-no-data no-data"></li>
          </ul>
        </div>
      </section>
      <section class="section-group activity">
        <div class="container">
          <router-link to="/street/activity" tag="div" class="section-group__header">
            <h3 class="section-group__title pr">
              <em class="line"></em>
              <span class="section-group__title-txt">创·活动</span>
              <em class="line"></em>
            </h3>
            <p class="section-group__txt">激活创客的创新意识</p>
            <router-link to="/street/activity/list" class="btn-more pa">更多>></router-link>
          </router-link>
          <div class="section-group__content">
            <ul class="section-group__item-container clearfix">
  <!--             <li class="cover">
                <figure class="figure">
                  <img src="~@/asset/img/street/street_activity.png" class="section-group__cover-pic" alt="" width="390"
                       height="300">
                </figure>
              </li> -->
              <router-link v-for="(item, i) in activityList" :key="i"
                           :to="{path: '/space/activity/details', query: {id: item.id}}" tag="li"
                           class="section-group__item pr">
                <figure class="figure">
                  <div class="bg-img__wrap section-group__item-pic" :style="{ backgroundImage: `url(${getFileUrl(item.resourceId || item.cover) || listDefault})` }"></div>
                  <!-- <img :src="getFileUrl(item.resourceId || item.cover) || listDefault" class="section-group__item-pic" width="390" /> -->
                </figure>
                <div class="section-group__item-mask pa">
                  <p class="name ellipsis">{{item.title || '暂无名称'}}</p>
                  <p class="dead-line"><i class="icon-i-time"></i>报名截止：{{item.stopDate | dateFormat('yyyy-MM-dd')}}</p>
                  <p class="info">
                    <span class="info-item"><i class="icon-btn-collection"></i> {{item.collectNum || item.collectionCount || 0}}</span>
                    <span class="info-item"><i class="icon-btn-i-reply"></i> {{item.commentNum || 0}}</span>
                    <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                  </p>
                </div>
              </router-link>
              <li v-if="!activityList.length" class="has-no-data no-data"></li>
            </ul>
          </div>
        </div>
      </section>
      <!-- <section class="section-group container requirement">
        <router-link to="/street/lagou" tag="div" class="section-group__header">
          <h3 class="section-group__title pr">
            <em class="line"></em>
            <span class="section-group__title-txt">求·拉勾</span>
            <em class="line"></em>
          </h3>
          <p class="section-group__txt">解决创客的供需问题</p>
          <router-link to="/street/lagou/list/2" class="btn-more pa">更多>></router-link>
        </router-link>
        <div class="section-group__content">
          <div class="section-group__item-container clearfix">
            <div class="cover fl">
              <figure class="figure">
                <img src="~@/asset/img/street/street_lagou.png" class="section-group__cover-pic" alt="" width="390"
                     height="530">
              </figure>
            </div>
            <ul class="section-group__item-content fl">
              <li v-for="(item, i) in requirementList" :key="i" class="section-group__item-requirement clearfix">
                <div class="section-group__item-main fl">
                  <h5 class="name ellipsis">{{item.name || '暂无名称'}}</h5>
                  <p class="info">
                    <span class="creator">发布人：{{item.createName || item.userName || '暂无'}}</span>
                    <span class="date">发布时间：{{item.createDate | dateFormat('yyyy/MM/dd')}}</span>
                  </p>
                  <p class="category">类别：{{item.category | translate(item._type === 1 ? serveCategory : demandCategory, {key: 'id'})}}</p>
                </div>
                <div class="operate fr">
                  <router-link :to="{path: `/street/lagou/detail/${item._type}`, query: {id: item.id}}"
                               class="btn-detail">详情
                  </router-link>
                  <p class="info clearfix">
                    <span class="fl"><i class="icon-admin-i-seduce"></i> {{item.seduceNum || 0}}</span>
                    <span class="fr"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                  </p>
                </div>
              </li>
              <li v-if="!requirementList.length" class="has-no-data no-data"></li>
            </ul>
          </div>
        </div>
      </section>
      <section class="section-group cooperation">
        <div class="container">
          <router-link to="/street/co" tag="div" class="section-group__header">
            <h3 class="section-group__title pr">
              <em class="line"></em>
              <span class="section-group__title-txt">找·合作</span>
              <em class="line"></em>
            </h3>
            <p class="section-group__txt">支撑创客的宏伟蓝图</p>
            <router-link to="/street/co/list/plan" class="btn-more pa">更多>></router-link>
          </router-link>
          <div class="section-group__content">
            <ul class="section-group__item-container clearfix">
              <router-link v-for="(item, i) in cooperationList" :key="i"
                           :to="{path: '/street/co/plan/detail', query: {id: item.id}}" tag="li"
                           class="section-group__item pr">
                <figure class="figure">
                  <div class="bg-img__wrap section-group__item-pic" :style="{ backgroundImage: `url(${getFileUrl(item.resourceId || item.cover) || listDefault})` }"></div>
                  //<img :src="getFileUrl(item.resourceId || item.cover) || listDefault" class="section-group__item-pic" width="390" />
                </figure>
                <div class="section-group__item-mask pa">
                  <p class="name ellipsis">{{item.name || '暂无名称'}}</p>
                  <p class="info">
                    <span class="info-item"><i class="icon-btn-collection"></i> {{item.collectNum || 0}}</span>
                    <span class="info-item"><i class="icon-btn-i-reply"></i> {{item.commentNum || 0}}</span>
                    <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                  </p>
                </div>
              </router-link>
              <li v-if="!cooperationList.length" class="has-no-data no-data"></li>
            </ul>
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>

<script>
  import { requestFrontendWorksList } from '@/service/works.js'
  import { requestFrontendStoryList } from '@/service/story.js'
  import { requestActivityFrontendList } from '@/service/activity.js'
  import { requestFrontendRequirementList } from '@/service/requirement.js'
  import { serviceAuditList } from '@/service/service.js'
  import { requestPlanBackendList, requestCaseList } from '@/service/businessPlan.js'
  import { mapState, mapActions } from 'vuex'

  import banner from '@/components/common/banner.vue'

  export default {
    name: 'streetHome',

    data () {
      return {
        activityList: [],
        cooperationList: [],
        excellentList: [],
        requirementList: [],
      }
    },

    computed: {
      ...mapState('dictionaryCommon', {
        serveCategory: state => (state.serveCategoryDicList || {}).dicList || [],
        demandCategory: state => (state.demandCategoryDicList || {}).dicList || [],
      })
    },

    created () {
      this.getDictComb('serveCategory')
      this.getDictComb('demandCategory')
      this.requestExcellentList()
      this.requestActivityList()
      this.requestRequirementAndServiceList()
      this.requestCooperationList()
    },

    components: {
      banner,
    },

    methods: {
      ...mapActions('dictionaryCommon', ['getDictComb']),

      // 作品、故事列表
      async requestExcellentList () {
        const worksRes = await requestFrontendWorksList({}, {pageSize: 6, pageNum: 1})
        // const storyRes = await requestFrontendStoryList({pageSize: 6, pageNum: 1})

        if (worksRes.data.code === 200) {
        // if (worksRes.data.code === 200 && storyRes.data.code === 200) {
          const worksData = (worksRes.data.entity || {}).resultData || []
          // const storyData = (storyRes.data.entity || {}).resultData || []
          // this.excellentList = this.shuffle(worksData.concat(storyData)).slice(0, 6)
          this.excellentList = worksData
        }
      },

      // 活动列表
      async requestActivityList () {
        const res = await requestActivityFrontendList({}, {pageSize: 6, pageNum: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.activityList = (res.data.entity || {}).resultData || []
        }
      },

      // 需求服务列表
      async requestRequirementAndServiceList () {
        const requirementRes = await requestFrontendRequirementList({pageSize: 4, pageNum: 1})
        const serviceRes = await serviceAuditList({auditStatus: 1}, {pageSize: 4, pageNum: 1})

        if (requirementRes.data.code === 200 && serviceRes.data.code === 200) {
          const requirementData = (requirementRes.data.entity || {}).resultData || []
          const serviceData = (serviceRes.data.entity || {}).resultData || []
          requirementData.forEach(item => item._type = 2)
          serviceData.forEach(item => item._type = 1)
          this.requirementList = this.shuffle(serviceData.concat(requirementData)).slice(0, 4)
        }
      },

      // 合作列表
      async requestCooperationList () {
        const res = await requestPlanBackendList({auditStatus: 1}, {pageSize: 6, pageNum: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.cooperationList = (res.data.entity || {}).resultData || []
        }
      },

      shuffle (source) {
        return source.sort(() => Math.random() - 0.5)
      },
    },
  }
</script>

<style lang="scss" scoped>
  $mask-color: #dad0d0;
  .street-home {
    .section-group {
      padding-bottom: 20px;
    }
    .section-group__header {
      position: relative;
      padding: 30px 0;
      text-align: center;
      cursor: pointer;
      .section-group__title {
        font-size: 30px;
        color: #333;
        font-weight: 600;
        .section-group__title-txt {
          display: inline-block;
          vertical-align: middle;
          margin: 0 6px;
        }
        .line {
          display: inline-block;
          width: 74px;
          height: 2px;
          vertical-align: middle;
          background-color: #333;
        }
      }
      .section-group__txt {
        margin-top: 14px;
        color: #999;
        font-size: 14px;
      }
      .btn-more {
        font-size: 14px;
        color: #333;
        right: 4px;
        bottom: 10px;
        &:hover {
          color: #00a9e0;
        }
      }
    }
    .section-group__item-container {
      font-size: 0;
    }
    .cover, .section-group__item {
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      padding: 5px;
    }
    .cover .figure {
      width: 390px;
      height: 300px;
      overflow: hidden;
    }
    .section-group__item {
      cursor: pointer;
      .figure {
        width: 390px;
        overflow: hidden;
      }
      .section-group__item-pic {
        width: 390px;
      }
      &:nth-child(2) {
        .figure {
          height: 380px;
        }
        .section-group__item-pic {
          height: 380px;
        }
      }
      &:nth-child(1), &:nth-child(3) {
        .figure {
          height: 305px;
        }
        .section-group__item-pic {
          height: 305px;
        }
      }
      &:nth-child(4), &:nth-child(6) {
        margin-top: -75px;
        .figure {
          height: 415px;
        }
        .section-group__item-pic {
          height: 415px;
        }
      }
      &:nth-child(5) {
        .figure {
          height: 340px;
        }
        .section-group__item-pic {
          height: 340px;
        }
      }
      &:hover {
        box-shadow: 0 5px 15px #d9d9d9;
        .section-group__item-mask {
          display: block;
        }
      }
    }
    .section-group__item-pic {
      transition: transform .3s;
      &:hover {
        transform: scale(1.05);
      }
    }
    .section-group__item-mask {
      left: 5px;
      bottom: 5px;
      box-sizing: border-box;
      width: 390px;
      height: 62px;
      display: none;
      font-size: 14px;
      background-color: rgba(0, 0, 0, .65);
      padding: 6px;
      color: $mask-color;
      .name {
        color: $mask-color;
        line-height: 1.5;
        margin-bottom: 8px;
      }
      .info-item {
        color: $mask-color;
        font-size: 12px;
      }
      .info-item + .info-item {
        margin-left: 12px;
      }
    }
    .has-no-data {
      box-sizing: border-box;
      display: inline-block;
      height: 310px;
      line-height: 310px;
      text-align: center;
      font-size: 14px;
      border: 0;
    }
    .requirement .has-no-data {
      height: 540px;
      line-height: 540px;
    }
  }

  .street-home .activity {
    background-color: #f2f2f2;
    .section-group__content {
      background-color: #fff;
    }
    .section-group__item-mask {
      height: 94px;
      .name {
        margin-bottom: 14px;
      }
      .dead-line {
        margin-bottom: 12px;
      }
    }
  }

  .street-home .cooperation {
    background-color: #f2f2f2;
    .section-group__content {
      background-color: #fff;
    }
  }
</style>
<style lang="scss">
  .street-wrapper .requirement {
    .section-group__item-content {
      box-sizing: border-box;
      width: 800px;
      font-size: 14px;
      padding-left: 10px;
    }
    .cover .figure {
      height: 530px;
    }
    .section-group__item-requirement {
      display: block;
      box-sizing: border-box;
      height: 130px;
      border-bottom: 1px solid #d2d2d2;
      padding-left: 8px;
    }
    .section-group__item-main {
      width: 75%;
      .name {
        line-height: 3;
        color: #f8c63d;
        font-size: 16px;
      }
      .info {
        margin: 6px 0 16px;
        .date {
          margin-left: 20px;
        }
      }
    }
    .operate {
      width: 112px;
      margin-top: 42px;
      .btn-detail {
        display: block;
        width: 100%;
        height: 38px;
        line-height: 38px;
        margin-bottom: 12px;
        text-align: center;
        color: #fff;
        background-color: #3fa1e8;
        padding: 0;
      }
    }
  }
</style>
