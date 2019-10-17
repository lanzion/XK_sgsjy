<template>
  <div class="activity">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">热门活动</em></span>
          <router-link to="/street/activity/list" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: hotList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap list-item-img" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
              <figcaption
                :class="{ing: props.item.isApply !== -1 && props.item.isApply !== 6, end: props.item.isApply === 6}"
                class="status pa">
                <span class="txt pa">{{handleActivityStatus(props.item.isApply)}}</span>
              </figcaption>
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.title || '暂无名称'}}</h6>
              <p class="info-group">
                <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectionCount || 0}}</span>
                <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span>
                <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{props.item.browseNum || 0}}</span>
              </p>
              <p class="dead-line">报名截止：{{props.item.stopDate | dateFormat('yyyy-MM-dd')}}</p>
            </div>
          </template>
        </list>
      </div>
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">最新活动</em></span>
          <router-link to="/street/activity/list" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: latestList, listData}">
          <template scope="props">
            <figure class="list-item-img__box pr">
              <div class="bg-img__wrap list-item-img" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
              <figcaption
                :class="{ing: props.item.isApply !== -1 && props.item.isApply !== 6, end: props.item.isApply === 6}"
                class="status pa">
                <span class="txt pa">{{handleActivityStatus(props.item.isApply)}}</span>
              </figcaption>
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.title || '暂无名称'}}</h6>
              <p class="info-group">
                <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectionCount || 0}}</span>
                <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span>
                <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{props.item.browseNum || 0}}</span>
              </p>
              <p class="dead-line">报名截止：{{props.item.stopDate | dateFormat('yyyy-MM-dd')}}</p>
            </div>
          </template>
        </list>
      </div>
      <div class="list-group is-over">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">往期热门</em></span>
          <router-link to="/street/activity/list" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: expireList, listData}">
          <template scope="props">
            <figure class="list-item-img__box pr">
              <div class="bg-img__wrap list-item-img" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
              <figcaption class="list-item-title ellipsis pa">{{props.item.title || '暂无名称'}}</figcaption>
            </figure>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestActivityFrontendList } from '@/service/activity.js'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'streetActivity',

    data () {
      return {
        expireList: [], // 往期
        hotList: [], // 热门
        latestList: [], // 最新
        listData: {
          col: 4,
          pathUrl: '/space/activity/details',
          params: {
            names: 'id',
            val: 'id'
          }
        },
      }
    },

    created () {
      this.requestActivityList({type: 'hot'})
      this.requestActivityList({type: 'latest'})
      this.requestActivityList({type: 'expire'})
    },

    components: {
      list,
      banner
    },

    methods: {
      // 获取活动列表
      async requestActivityList ({type}) {
        const pageSize = type === 'expire' && 4 || 8
        const options = type === 'hot' && {partSort: 1}
          || type === 'latest' && {}
          || {status: 2}

        const res = await requestActivityFrontendList(options, {pageSize, pageNum: 1})

        if (res.status === 200 && res.data.code === 200) {
          this[`${type}List`] = (res.data.entity || {}).resultData || []
        }
      },

      handleActivityStatus (status) {
        const source = {
          '-1': '未开始',
          6: '已结束',
        }

        return source[status] || '进行中'
      },
    },
  }
</script>
<style lang="scss" scoped>
  .list-wrapper {
    .list-group:not(.is-over) .list-item-title {
      margin: 12px 0 10px;
      color: #333;
      &:hover {
        color: #00a9e0;
      }
    }
    .status {
      top: -20%;
      left: -14%;
      transform: rotate(-45deg);
      border: 40px solid transparent;
      border-bottom-color: #46c475;
      &.ing {
        border-bottom-color: #00a0e9;
      }
      &.end {
        border-bottom-color: #c9c9c9;
      }
      .txt {
        top: 20px;
        left: -40px;
        width: 80px;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
    }
    .is-over {
      .list-item-img__box {
        height: 280px;
        .list-item-img {
          height: 280px;
        }
      }
      .list-item-title {
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        height: 36px;
        line-height: 36px;
        margin: 0;
        display: none;
        font-size: 14px;
        color: #fff;
        text-indent: 10px;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, .1), rgba(0, 0, 0, .7));
      }
    }
    .is-over .list-item__box:hover {
      .list-item-title {
        display: block;
      }
    }
  }
</style>


