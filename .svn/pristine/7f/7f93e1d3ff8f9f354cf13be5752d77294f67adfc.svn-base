<template>
  <div class="backend-content__middle">
    <tabs v-bind="{tabs, router}" class="nav-evaluation"/>
    <router-view></router-view>
  </div>
</template>

<script>
  import tabs from '@/components/common/tabs.vue'

  export default {
    name: 'evaluationQuota', // 评价指标
    data () {
      return {
        router: {
          path: '/cqe/quota'
        },
        tabs: [
          {name: '一级指标', type: 'lv1'},
          {name: '二级指标', type: 'lv2'}
        ],
      }
    },
    components: {
      tabs,
    },
    created () {}
  }
</script>

<style scoped>
  .nav-evaluation {
    margin-bottom: 30px;
  }
</style>
