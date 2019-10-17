<template>
  <div class="model-school__home clearfix">
    <div class="content_l fl">
      <section class="achievement bgw section-group">
        <h4 class="section-group__title bgw">
          <span class="section-group__title-txt">创客建设</span>
          <router-link :to="{path: '/model/school/achv', query}" class="link-more fr">更多>></router-link>
        </h4>
        <div class="main">
          <ul>
            <router-link v-for="(item, idx) in achievementList"
                         :to="{path: '/model/school/achv/detail', query: {id: item.id}}" tag="li" :key="idx"
                         :title="item.name" class="achievement-item clearfix">
              <span class="label fl">【{{item.type | translate(categoryList, {key: 'id'})}}】</span>
              <span class="name ellipsis fl">{{item.name || '暂无成果名称'}}</span>
              <span class="date fr">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
            </router-link>
            <li v-if="achievementList.length === 0" class="no-data"></li>
          </ul>
        </div>
      </section>
      <section class="section-group feature">
        <h4 class="section-group__title bgw">
          <span class="section-group__title-txt">创客特色</span>
          <router-link :to="{path: '/model/school/feature', query}" class="link-more fr">更多>></router-link>
        </h4>
        <div class="section-group__main">
          <v-list v-bind="{listData: listDataOfFeature, items: featureList}">
            <template scope="props">
              <figure class="list-item-img__box">
                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
              </figure>
              <h6 class="list-item-title about clearfix">
                <span :title="props.item.name" class="name ellipsis fl">{{props.item.name || '暂无名称'}}</span>
                <span :title="props.item.createName" class="creator ellipsis fr">{{props.item.createName || '暂无'}}</span>
              </h6>
            </template>
          </v-list>
        </div>
      </section>
      <section class="section-group">
        <h4 class="section-group__title bgw">
          <span class="section-group__title-txt">创客荣誉</span>
          <router-link :to="{path: '/model/school/honor', query}" class="link-more fr">更多>></router-link>
        </h4>
        <div class="section-group__main">
          <el-carousel :interval="4000" type="card" height="200px" class="bgw">
            <el-carousel-item v-for="(item, idx) in honorList" :key="idx">
              <router-link :to="{path: '/model/school/honor/detail', query: {id: item.id}}" tag="div"
                           :style="{'background-image': 'url(' + getFileUrl(item.cover) + ')'}" :title="item.name"
                           class="el-carousel-item-pic"></router-link>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
    </div>
    <div class="aside fr">
      <div class="section-group bgw">
        <h4 class="section-group__title">示范校简介</h4>
        <p class="aside-content" v-if="schoolDetail.introduction">{{schoolDetail.introduction}}</p>
        <p class="no-data" v-else></p>
      </div>
      <div class="section-group bgw event">
        <h4 class="section-group__title bgw">
          <span class="">创客事件</span>
          <router-link :to="{path: '/model/school/event', query}" class="link-more fr">更多>></router-link>
        </h4>
        <div class="aside-content">
          <ul>
            <li v-for="(item, idx) in eventList" :key="idx" :title="item.name"
                class="event-item clearfix">
              <span class="name ellipsis fl">{{item.content || '暂无事件名称'}}</span>
              <span class="date ellipsis fr">{{item.eventDate | dateFormat('yyyy-MM-dd')}}</span>
            </li>
            <li v-if="eventList.length === 0" class="no-data"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import infoBar from 'Common/classificationList/list/graphic/infoBar.vue'
  import list from 'Common/classificationList/list/graphic/list.vue'
  import tabs from 'Common/classificationList/classification/tabs.vue'
  import personList from 'Common/classificationList/list/text/personList.vue'
  import {
    requestAchievementList,
    requestFeatureList,
    requestHonorList,
    requestEventList,
  } from '@/service/model_school.js'
  import { requestSchoolScene } from '@/service/admin_base.js'

  export default {
    name: 'modelSchoolHome',

    data () {
      return {
        achievementList: [],

        eventList: [],

        featureList: [],

        honorList: [],

        listDataOfFeature: {
          col: 3,
          pathUrl: '/model/school/feature/detail',
          params: {
            names: 'id',
            val: 'id'
          }
        },

        query: this.$route.query
      }
    },

    props: {
      categoryList: Array,

      schoolDetail: {
        type: Object,
        default: () => {}
      }
    },

    created () {
      const {id} = this.query
      this.options = {pageSize: 6, pageNum: 1, schoolId: id}
      this.requestAchievementList()
      this.requestFeatureList()
      this.requestHonorList()
      this.requestEventList()
    },

    components: {
      'v-info-bar': infoBar,
      'v-tabs': tabs,
      'v-person-list': personList,
      'v-list': list
    },

    methods: {
      async requestAchievementList () {
        const res = await requestAchievementList(this.options)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.achievementList = resultData || []
        }
      },

      async requestFeatureList () {
        const res = await requestFeatureList(this.options)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.featureList = resultData || []
        }
      },

      async requestHonorList () {
        const res = await requestHonorList(this.options)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.honorList = resultData || []
        }
      },

      async requestEventList () {
        const res = await requestEventList({...this.options, pageSize: 8})

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.eventList = resultData || []
        }
      },
    },
  }
</script>

<style lang="scss">
  .model-school__home {
    .el-carousel--card {
      padding: 20px 15px;
    }
    .el-carousel__container {
      overflow: hidden;
    }
    .el-carousel__item {
      width: 48%;
      background-color: #ddd;
      .el-carousel-item-pic {
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .el-carousel__indicators {
      /*display: none;*/
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cols.scss";

  $theme-color: #2797ed;
  .model-school__home {
    .content_l {
      width: 75.5%;
    }
    .aside {
      width: 23%;
      .section-group__title {
        padding-left: 15px;
      }
      .aside-content {
        line-height: 1.3;
        padding: 15px;
        font-size: 12px;
        color: #626262;
        word-wrap: break-word;
        text-align: justify;
      }
      .no-data {
        height: 200px;
      }
    }
    .achievement {
      margin-bottom: 20px;
      padding: 15px;
      padding-left: 10px;
      .achievement-item {
        line-height: 34px;
        border-bottom: 1px dashed #ddd;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          .label, .name {
            color: $theme-color;
          }
        }
      }
      .name {
        max-width: 350px;
        margin-left: 12px;
      }
      .date {
        font-size: 14px;
        color: #999;
      }
      .more {
        margin-top: 12px;
        text-align: right;
        .link-more {
          font-size: 12px;
          color: $theme-color;
        }
      }
      .no-data {
        height: 200px;
      }
    }
    .section-group {
      .section-group__title {
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        padding-right: 15px;
        border-bottom: 1px solid #cacaca;
      }
      .section-group__title-txt {
        display: inline-block;
        width: 94px;
        line-height: 36px;
        border-bottom: 2px solid $theme-color;
        color: $theme-color;
        text-align: center;
      }
      .link-more {
        color: #999;
        &:hover {
          color: $theme-color;
        }
      }
      .about {
        padding-bottom: 4px;
      }
    }
    .section-group + .section-group {
      margin-top: 20px;
    }
    .feature {
      .name {
        max-width: 150px;
      }
      .creator{
        max-width: 100px;
      }
    }
    .event {
      .aside-content {
        line-height: 2;
        font-size: 14px;
        color: #3e3e3e;
      }
      .event-item + .event-item {
        margin-top: 12px;
      }
      /*.event-item:hover {
        .name {
          color: $theme-color;
        }
      }*/
      .name {
        max-width: 160px;
      }
      .date {
        color: #999;
      }
    }
  }
</style>
