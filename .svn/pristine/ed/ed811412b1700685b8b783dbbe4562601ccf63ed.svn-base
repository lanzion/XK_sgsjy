<template>
  <div class="edu-project">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="list-group hot-course">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">大家都在玩</em></span>
          <a @click="requestPlayTogetherList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: playTogetherData, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
            </figure>
            <h6 class="list-item-title clearfix">
              <span class="name fl ellipsis">{{props.item.name || '暂无实训室名称'}}</span>
              <!--<span class="score fr">{{props.item.score || 0}}分</span>-->
            </h6>
            <p class="other-info clearfix">
              <!-- <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span> -->
              <span class="num fr">{{props.item.num || 0}}人学习</span>
            </p>
          </template>
        </list>
      </div>
      <div class="list-group favorite-course">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">猜你喜欢</em></span>
          <a @click="requestFavoriteList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: favoriteData, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="list-item-img" /> -->
            </figure>
            <h6 class="list-item-title clearfix">
              <span class="name fl ellipsis">{{props.item.name || '暂无实训室名称'}}</span>
              <!--<span class="score fr">{{props.item.score || 0}}分</span>-->
            </h6>
            <p class="other-info clearfix">
              <!-- <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span> -->
              <span class="num fr">{{props.item.num || 0}}人学习</span>
            </p>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { playTogetherList } from '@/service/train.js'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'eduProject',

    data () {
      return {
        listData: {
          col: 4,
          pathUrl: '/education/train/detail',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        favoriteData: [],
        playTogetherData: [],
        PlayTogetherPageNum: 1,
        favoriteListPageNum: 1
      }
    },

    created () {
      this.requestPlayTogetherList()
      this.requestFavoriteList()
    },

    components: {
      banner,
      list
    },

    methods: {
        async requestPlayTogetherList () { // 大家都在玩
            const res = await playTogetherList({status: 1}, {pageSize: 8, pageNum: this.PlayTogetherPageNum})
            if (res.status === 200 && res.data.code === 200) {
                const entity = res.data.entity || {}
                this.playTogetherData = entity.resultData || []
                this.PlayTogetherPageNum++
                if(this.PlayTogetherPageNum > entity.totalPageNum) {
                    this.PlayTogetherPageNum = 1
                }
            }
        },
        async requestFavoriteList () { // 猜你喜欢
            const res = await playTogetherList({status: 1, recommend: 1}, {pageSize: 8, pageNum: this.favoriteListPageNum})
            if (res.status === 200 && res.data.code === 200) {
            const entity = res.data.entity || {}
                this.favoriteData = entity.resultData || []
                this.favoriteListPageNum++
                if(this.favoriteListPageNum > entity.totalPageNum) {
                    this.favoriteListPageNum = 1
                }
            }
        },
    },
  }
</script>
<style lang='scss' scoped>
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cols.scss";
.list-group {
  .list-item-title {
    .name {
      font-size: 14px;
    }
  }
}
</style>


