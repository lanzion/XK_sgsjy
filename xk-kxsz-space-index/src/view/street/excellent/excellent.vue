<template>
  <div class="works-and-story">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="list-group">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">作品</em></span>
          <router-link to="/street/excellent/works" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: worksList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.resourceId) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.resourceId) || listDefault" class="list-item-img" /> -->
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.workName || '暂无名称'}}</h6>
              <p class="info-group">
                <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{props.item.collectionCount || 0}}</span>
                <span class="info-item" title="评论"><i class="icon-btn-i-reply"></i> {{props.item.commentNum || 0}}</span>
                <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{props.item.browseNum || 0}}</span>
              </p>
            </div>
          </template>
        </list>
      </div>
      <div class="list-group story">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">故事</em></span>
          <router-link to="/street/excellent/story" class="btn-more fr">更多>></router-link>
        </p>
        <list v-bind="{items: storyList, listData: storyListData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
            </figure>
            <div class="about">
              <h6 class="list-item-title ellipsis">{{props.item.name || '暂无名称'}}</h6>
              <p class="desc">{{props.item.content || '暂无描述内容' | handleStoryDesc(32)}}</p>
            </div>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestFrontendWorksList } from '@/service/works.js'
  import { requestFrontendStoryList } from '@/service/story.js'
  import { requestHotCourseList, requestFavoriteCourseList, requestFavoriteTeacherList } from '@/service/course.js'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'streetWorksAndStory',

    data () {
      return {
        listData: {
          col: 4,
          pathUrl: '/space/works/details',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        pageParam: {
          pageNum: 1,
          pageSize: 8,
        },
        storyList: [],
        storyListData: {
          col: 4,
          pathUrl: '/street/excellent/story/detail',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        worksList: [],
      }
    },

    created () {
      this.requestWorksList()
      this.requestStoryList()
    },
    components: {
      list,
      banner
    },

    methods: {
      // 获取作品列表
      async requestWorksList () {
        const res = await requestFrontendWorksList({recommend: 1}, {...this.pageParam})

        if (res.status === 200 && res.data.code === 200) {
          this.worksList = (res.data.entity || {}).resultData || []
        }
      },

      // 获取热门故事列表
      async requestStoryList () {
        const res = await requestFrontendStoryList({...this.pageParam, isHot: 1})

        if (res.status === 200 && res.data.code === 200) {
          this.storyList = (res.data.entity || {}).resultData || []
        }
      },
    },

    filters: {
      // 处理故事描述字段，字段包括HTML标签内容
      handleStoryDesc (txt = '', len = 50, sep = '...') {
        let reg = new RegExp('(.{' + len + '}).+')
        return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
      }
    },
  }
</script>
<style lang="scss" scoped>
  .list-wrapper {
    .list-item-title {
      color: #333;
    }
  }
</style>


