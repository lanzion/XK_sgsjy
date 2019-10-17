<template>
  <div class="edu-project">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="recommend list-group clearfix">
        <!-- <figure class="entrance pr fl">
          <img src="~@/asset/img/edu/chuangke.png" width="224" height="198" alt="">
          <figcaption class="btn-row pa">
            <a href="javascript:;" class="btn-go">我要参加</a>
          </figcaption>
        </figure> -->

      </div>
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">热门推荐</em></span>
          <router-link :to="{path: '/education/project/list'}" class="btn-refresh fr">
            更多 &gt;
          </router-link>
        </p>
        <list v-bind="{items: recommendList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.imgUrl) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.imgUrl) || listDefault" class="bg-img__wrap" /> -->
            </figure>
            <h6 class="list-item-title ellipsis"> {{props.item.name}} </h6>
            <ul class="cols-list list-item-count">
              <li class="cols-item icon-i-time"> {{props.item.startDate | dateFormat('yyyy-MM-dd')}} </li>
              <li class="cols-item fr icon-i-person" style="border: none;"> {{props.item.currNum}}/{{props.item.totalNum}} </li>
            </ul>
          </template>
        </list>
      </div>
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">猜你喜欢</em></span>
          <a @click="requestFavoriteList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: favoriteList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.imgUrl) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.imgUrl) || listDefault" /> -->
            </figure>
            <h6 class="list-item-title" style="height: 36px;">{{props.item.content || '暂无描述' | textOverflow(40)}}</h6>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestFavoriteProjectList, projectList } from '@/service/project.js'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'eduProject',

    data () {
      return {
        favoriteList: [],
        listData: {
          col: 4,
          pathUrl: '/education/project/detail',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        recommendList: []
      }
    },

    created () {
      this.requestRecommendList()
      this.requestFavoriteList()
    },

    components: {
      banner,
      list
    },

    methods: {
      async requestRecommendList () { // 获取5条推荐项目
        const res = await projectList({}, {pageSize: 8, pageNum: 1})
        if (res.status === 200 && res.data.code === 200) {
          const entity = res.data.entity || {}
          this.recommendList = entity.resultData || []
        }
      },
      async requestFavoriteList () { // 获取猜你喜欢列表
        const res = await requestFavoriteProjectList({pageSize: 8, pageNum: 1})
        if (res.status === 200 && res.data.code === 200) {
          const entity = res.data.entity || {}
          this.favoriteList = entity.resultData || []
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cols.scss";

  .list-wrapper {
    margin-top: 30px;
  }

  .recommend {
    .entrance {
      width: 224px;
      height: 198px;
      .btn-row {
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
      }
      .btn-go {
        display: block;
        width: 172px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        color: #00a0e9;
        background-color: #fff;
        border-radius: 20px;
        font-size: 18px;
      }
    }
    .list-item__box {
      width: 200px !important;
    }
  }
  .education-wrapper #list.has-no-data {
    font-size: 0;
  }
</style>
<style lang="scss">
  .education-wrapper .recommend #list {
    margin-top: -10px;
    &.has-no-data {
      width: 960px;
      margin-top: 0;
      margin-bottom: 10px;
      .isNull-list {
        height: 200px;
        border: 0;
      }
    }
  }
  .recommend #list .list-item__box {
    width: 240px !important;
    // .list-item-img {
    //   height: 148px !important;
    // }
    .list-item-title {
      line-height: 2em;
      font-size: 14px;
      color: #333;
    }
    .icon-i-person {
      border: 0;
    }
  }
</style>


