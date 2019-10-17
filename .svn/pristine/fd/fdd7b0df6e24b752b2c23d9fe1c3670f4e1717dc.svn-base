<template>
  <div class="courseDetails">
    <course-intro />
    <div class="clearfix">
      <div class="content_l">
        <tabs v-bind="{tabs, router}" class="evaluation-tabs"/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import tabs from '@/components/common/tabs.vue'
  import courseIntro from '@/components/space/course/intro.vue' // 课程介绍

  export default {
    name: 'courseDetail', // 课程详情页
    data () {
      return {
        router: {
          path: '/space/course/detail'
        },
        tabs: [
          {name: '课程详情', type: 'info'},
          {name: '课程目录', type: 'outline'}
        ]
      }
    },
    components: {
      courseIntro,
      tabs,
    },
    computed: {
      ...mapState('course', ['courseOutline'])
    },
    created () {
      this.router.query = this.$route.query
      this.id = this.$route.query.id
      this.requestOutline({courseId: this.id})
    },
    methods: {
      ...mapActions('course', ['requestOutline']),
    }
  }
</script>

<style lang='scss' scoped>
  @import "~@/assets/css/scss/vars";
  @each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
      .goto-study .btn-go-to-study {
        border: 1px solid nth($color-value, 3);
        color: $color-value;
      }
    }
  }
  .goto-study {
    box-sizing: border-box;
    height: 123px;
    margin-bottom: 20px;
    padding: 30px 18px;
    border: 1px solid #c9c9c9;
    .progress-wrapper {
      width: 510px;
      .tip {
        margin-top: 20px;
        font-size: 16px;
      }
      em {
        color: #fd8c88;
      }
    }
    .btn-go-to-study {
      width: 92px;
      height: 38px;
      line-height: 38px;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }
  }

  .content_l, .content_r {
    box-sizing: border-box;
    background-color: #fff;
  }

  .content_l {
    width: 100%;
    border-radius: 5px;
    padding: 20px;
  }

  .is-admin .content_l {
    float: none;
    width: 100%;
    border: 0;
    padding: 0;
  }

  .content_r {
    float: right;
    width: 22.5%;
    padding: 0;
  }

  .evaluation-tabs {
    margin-bottom: 1.5em;
  }


</style>
