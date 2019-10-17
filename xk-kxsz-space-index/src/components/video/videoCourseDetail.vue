<template>
  <div id="videoCourseDetail" class="videoCourseDetail">
    <v-intro v-if="loginUId"></v-intro>
    <div class="main clearfix">
      <div class="content_l">
        <v-tabs :tabs="tabs" :router="router" class="evaluation-tabs"></v-tabs>
        <router-view @on-search="handleDiscussSearch" v-bind="{discussSearch, hasRegistered}"></router-view>
      </div>
      <div class="content_r">
        <v-aside></v-aside>
      </div>
    </div>
  </div>
</template>

<script>
  import { checkHasAppliedOrNot } from '@/service/course.js'
  import { mapActions } from 'vuex'
  import tabs from 'components/common/classificationList/classification/tabs.vue'
  import aside from 'components/common/module/course/aside.vue' // 课程侧边栏
  import intro from './intro.vue'

  export default {
    name: 'videoCourseDetail',
    data () {
      return {
        discussSearch: {
          input: '',
          select: '',
        },
        hasRegistered: false,
        loginUId: this.$ls.get('loginUId', ''),
        tabs: [
          {name: '课程详情', type: 'info'},
          {name: '课程目录', type: 'outline'},
          {name: '课程评价', type: 'comment'}
        ],
        router: {
          path: '/education/course/detail/video'
        }
      }
    },
    components: {
      'v-tabs': tabs,
      'v-aside': aside,
      'v-intro': intro
    },
    created () {
      this.router.query = this.$route.query
      this.id = this.$route.query.id
      this.requestCourseDetail({id: this.id}).then(res => {
        // 如果登录用户是课程发布者的话，不用报名参加课程，直接展示所有TAB
        if (res.createId === this.loginUId) {
          this.handleRegisterSuccess()
          return
        }

        this.loginUId && this.checkHasAppliedOrNot()
      })
    },
    methods: {
      ...mapActions('course', ['requestCourseDetail']),
      async checkHasAppliedOrNot () { // 检查是否已经报名
        let res = await checkHasAppliedOrNot({courseId: this.id})
        if (res.data.code === 200) {
          const {isApply} = res.data.appendInfo || {}
          const hasAppliedCode = 1

          // 0：未报名；1：已报名
          if (isApply === hasAppliedCode) {
            this.handleRegisterSuccess()
            return
          }

          this.$router.replace({path: '/education/course/detail', query: {id: this.id}})
        }
      },
      handleRegisterSuccess () { // 报名成功，重新设置TAB
        this.hasRegistered = true
        this.tabs = [
          {name: '课程详情', type: 'info'},
          {name: '课程学员', type: 'student'},
          {name: '课程目录', type: 'outline'},
          {name: '课程评价', type: 'comment'},
          {name: '讨论区', type: 'discuss'},
          {name: '资源共享区', type: 'share'},
          {name: '我的笔记', type: 'note'}
        ]
      },
      handleDiscussSearch(val) {
        const {path, query} = this.router
        this.discussSearch = val
        this.$router.push({path: `${path}/discuss`, query})
      },
    },
    watch: {
      '$route' (val, old) {
        if (val.path === old.path) {
          this.router.query = val.query
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .content_l, .content_r {
    box-sizing: border-box;
    background-color: #fff;
  }

  .content_l {
    float: left;
    width: 75%;
    padding: 12px 20px 20px;
  }

  .content_r {
    float: right;
    width: 22.5%;
    padding: 0;
  }

  .main {
    margin-top: 20px;
  }

  .evaluation-tabs {
    margin-bottom: 1.5em;
  }
</style>
