<template>
  <div id="educationBureau" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import banner from './../common/banner.vue'
  import reqion from './../common/screening/region.vue'
  import nav from './../common/nav.vue'
  import list from './../common/classificationList/list/graphic/list.vue'
  import search from '../common/search.vue'
  import pagination from '../common/pagination.vue'
  export default {
    name: 'educationBureau',
    components: {
      'v-banner': banner,
      'v-reqion': reqion,
      'v-nav': nav,
      'v-list': list,
      'v-search': search,
      'v-pagination': pagination
    },
    data () {
      return {
        listData: {
          list_col: 4,
          dataUrl: 'maker/spaces/listByEdu',
          content1: {
            left: {name: '标题', type: 'eduName'}, // 左面left,右面right
            right: {name: '标题', type: ''}
          },
          content2: {
            left: [{name: '资源', type: 'resouceNum'}, {name: '课程', type: 'coursesNum'}, {
              name: '项目',
              type: 'projectsNum'
            }, {name: '作品', type: 'productionNum'}], // 左面left,右面right
            right: {name: '标题', type: ''}
          },
          params: {
            pageSize: 8,
            pageNum: 1
          }
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .searchBox {
    padding: 20px 0 10px 0;
    border-bottom: 1px solid #D3D3D3;
  }
</style>
