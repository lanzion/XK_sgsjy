<template>
  <div class="backend-course__wrapper admin-list-head bgw">
    <v-tab :tabs="[
          {name: '已审课程', type: 'checked'},
          {name: '待审课程', type: 'unchecked'},
          {name: '我的题库', type: 'question'}
        ]" :router="router" :is_search="true" :count="count" @searchVal="handleSearch" :total="totalNum" :btns=btns>
      <button @click="showDialog('addQuestion');setCurEditingQuestion()" v-if="isQuestionPage" slot="tab-btns" class="btn-add-question fl">添加题目
      </button>
    </v-tab>
    <div class="backend-course__content">
      <router-view :key-words="keyWords" @on-set-total="setTotal"></router-view>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import nav from 'components/common/classificationList/classification/tabs.vue'

  export default {
    name: 'backendCourse', // 后台课程已审、待审、题库路由页面

    data() {
      return {
        btns: [{ name: '发布课程', url: '/admin/course/release' }],
        cur_tab: 0,
        count: {
          num: 0,
          name: '课程'
        },
        keyWords: '',
        router: {
          path: '/admin/course'
        },
        // tabs: [
        //   {name: '已审课程', type: 'checked'},
        //   {name: '待审课程', type: 'unchecked'},
        //   {name: '我的题库', type: 'question'}
        // ],
        totalNum: ''
      }
    },

    computed: {
      isQuestionPage() {
        const _flag = this.$route.path.includes('/admin/course/question')
        this.count.name = _flag && '题目' || '课程'
        return _flag
      }
    },

    components: {
      'v-tab': nav
    },

    methods: {
      ...mapMutations('course/backend', ['showDialog', 'setCurEditingQuestion']),
      handleSearch(val) { // 监听到搜索子组件搜索触发时，设置搜索关键词，并传递给列表组件
        this.keyWords = val
      },
      setTotal(val) {
        this.totalNum = val
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
  .backend-course__wrapper .btn-add-question {
    box-sizing: border-box;
    width: 68px;
    height: 34px;
    line-height: 32px;
    margin-left: 12px;
    text-align: center;
    color: #fff;
    background-color: $theme_color;
    font-size: 12px;
    padding: 0;
    border: 0;
    border-radius: $button-radiu;
  }
</style>
