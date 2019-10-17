<template>
  <aside class="aside">
    <div class="course-rel">
      <h3 class="title">
        <span class="txt fl">相关课程</span>
        <router-link to="/education/course/list" class="btn-more fr" href="javascript:;">更多>></router-link>
      </h3>
      <ul class="course-rel-wrapper">
        <li v-for="(item, index) in lists" @click="handleSwitch(item.id)" :key="index" class="item">
          <figure :title="item.name" class="pic">
            <img :src="getFileUrl(item.cover) || listDefault" alt="" width="100%" height="200">
          </figure>
          <h5 class="name ellipsis">{{item.name || '暂无名称'}}</h5>
          <p class="about clearfix">
            <span class="num fl"><i class="icon-i-creator"></i>{{item.num || 0}}人学习 </span>
            <span class="free fr">{{item.isFree === '1' && '免费' || '收费'}}</span>
          </p>
        </li>
        <li v-if="!lists.length" class="no-data">暂无数据</li>
      </ul>
    </div>
    <!--<div class="practice-rel">
      <h3 class="title">
        <span class="txt fl">相关实训</span><a class="btn-more fr" href="javascript:;">更多>></a>
      </h3>
      <ul class="practice-rel-wrapper">
        <li class="item">
          <figure class="pic">
            <img src="~@/assets/img/course/course_03.png" alt="" width="100%" height="200">
            <figcaption class="name ellipsis">虚拟设计电路连接</figcaption>
          </figure>
          <p class="about clearfix">
            <span class="num fl">56人学习 </span><span class="free fr">免费</span>
          </p>
        </li>
      </ul>
    </div>-->
  </aside>
</template>

<script>
  import { requestRelatedCourseList } from '@/service/course.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'courseAside', // 课程侧边栏
    data () {
      return {
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 2,
          pageNum: 1,
          totalNum: 0
        },
      }
    },
    computed: {
      ...mapState('course', {
        createId: state => state.courseDetail.createId
      })
    },
    created () {
      this.createId && this.requestList()
    },
    methods: {
      ...mapMutations('course', ['toggleSwitching']),
      async requestList () { // 获取列表数据
        let res = await requestRelatedCourseList({
          ...this.pageParam,
          createId: this.createId,
          courseId: this.$route.query.id || '',
          isTeacherAudit: '1'
        })

        if (res.status === 200 && res.data.code === 200) {
          let _entity = res.data.entity || {}
          this.lists = _entity.resultData || []
        }
      },
      handleSwitch (id) {
        const {path, query} = this.$route

        if (query.id === id) return

        if (path.includes('/detail/video')) {
          this.toggleSwitching({isSwitching: true})
        }

        this.$router.push({path: '', query: {id}})
      },
    },
    watch: {
      createId () {
        this.requestList()
      }
    }
  }
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
        .item:hover {
            color: nth($color-value, 1);
        }
    }
}
  .aside {
    .course-rel, .practice-rel {
      color: #3e3e3e;
    }
    .practice-rel {
      margin-top: 20px;
    }
    .title {
      height: 41px;
      line-height: 41px;
      padding: 0 10px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      .btn-more {
        color: #999;
        &:hover {
          color: #2797ed;
        }
      }
    }
    .item {
      padding: 10px 10px 14px;
      cursor: pointer;
      .pic {
        width: 100%;
        height: 200px;
      }
      .name {
        line-height: 30px;
        font-size: 14px;
      }
      .about {
        font-size: 12px;
        color: #999;
        .free {
          color: #00a0e9;
        }
      }
    }
    .item + .item {
      border-top: 1px solid #ddd;
    }
    .no-data {
      height: 200px;
      line-height: 30;
    }
  }
</style>
