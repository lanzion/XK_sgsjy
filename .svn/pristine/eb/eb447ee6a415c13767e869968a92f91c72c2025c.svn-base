<template>
  <div class="admin-study">
    <nav v-if="isStudent" class="tabs-bar-header highlight">
      <el-tabs v-model="selected.studyType">
        <el-tab-pane :label="'课程学习(' + (relatedData.coursesNum || 0) + ')'" name="1"></el-tab-pane>
        <el-tab-pane :label="'项目学习(' + (relatedData.projectsNum || 0) + ')'" name="2"></el-tab-pane>
        <el-tab-pane :label="'网上实训室学习(' + (relatedData.no || 0) + ')'" name="3"></el-tab-pane>
      </el-tabs>
    </nav>
    <div v-else class="total-of-teacher">学习总量: （{{relatedData.studyNum || 0}}）</div>
    <div v-if="isStudent" class="options-and-search clearfix">
      <div class="options fl">
        <term-select :selected.sync="selected.termId" style="width:175px;"></term-select>
        <!--<multi-select :selectData="category" model="project" :ifAll='true'-->
        <!--style="width:175px;display:inline-block;"></multi-select>-->
      </div>
      <!--<div class="fr">-->
      <!--<search class="fr" @search="setKeyWords"></search>-->
      <!--</div>-->
    </div>
    <div class="list-wrapper">
      <ul>
        <list-row v-for="(item, index) in lists" :item="item" :item-height="isStudent ? 186 : 140"
                  :key="index">
          <div slot="content" class="content table-cell">
            <p>
              学习{{dynamicLinks.name}}：
              <router-link :to="{path: dynamicLinks.link, query: {id: item.busId}}" :title="item.busName"
                           class="blue">{{item.busName}}
              </router-link>
            </p>
            <p>学习时长（天）：{{item.studyLength || 0}}</p>
            <template v-if="isStudent">
              <p>自评等级：<span class="red">{{item.evaluationGrade | textOverflow(30, '......')}}</span></p>
              <p>自评语：{{item.remark}}</p>
            </template>
            <p>学习成果：
              <router-link v-for="(result, i) in item.studyResultList" :key="i" :title="result.worksName"
                           :to="{path: '/admin/works/details', query: {id: result.worksId}}"
                           class="achievement-item blue">
                {{result.worksName}}
              </router-link>
            </p>
            <p>
              学习进度：
              <el-progress class="progress-bar" :text-inside="true" :stroke-width="22"
                           :percentage="(item.progress ? ~~(item.progress * 100) : 0)"
              ></el-progress>
            </p>
            <div slot="operate" class="operate pa">
              <template v-if="isStudent">
                <a @click="showSelectRangeDialog(item)" class="link" href="javascript:;">评价范围</a>
                <a @click="goToEvaluate(item)" class="link" href="javascript:;">去评价</a>
              </template>
              <router-link :to="{path: dynamicLinks.link, query: {id: item.busId}}" class="link">继续学习
              </router-link>
              <a @click="showAchievementDialog(item)" class="link" href="javascript:;">学习成果</a>
            </div>
          </div>
        </list-row>
      </ul>
      <p v-if="!lists.length" class="no-data">暂无数据</p>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
      <select-range v-if="dialog.isVisible"
                    v-bind="{dialog, curRange, id: curId, handleRequest: requestList, api: '/maker/study/updateOpenRange'}"></select-range>
      <achievement-dialog v-if="achievementDialog.isVisible"
                          v-bind="{curAchievementArr, dialog: achievementDialog, module: 'study', id: curId, handleRequest: requestList}">
      </achievement-dialog>
    </div>
  </div>
</template>

<script>
  import { requestStudyList } from '@/service/my.js'
  import { loginInfo } from '@/js/getUserInfo.js'
  import { mapActions, mapState } from 'vuex'
  import pagination from 'components/common/pagination.vue'
  import listRow from 'components/common/classificationList/list/list_row.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import termSelect from 'Common/select/term_select.vue'
  import search from 'Common/search.vue'
  import selectRange from '@/components/my/set_range_dialog.vue'
  import achievementDialog from '@/components/my/achievement_dialog.vue'

  export default {
    name: 'adminStudy',

    data () {
      return {
        achievementDialog: {isVisible: false},
        category: [], // 分类
        curAchievementArr: [],
        curId: '',
        curRange: '',
        dialog: {isVisible: false},
        isStudent: false,
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          identity: this.$ls.get('userIdentity') === 'student' ? '0' : '1',
          orgId: loginInfo && loginInfo.userInfo.baseId || '',
          studyType: '1',
          termId: null
        }
      }
    },

    computed: {
      ...mapState('teacherAndStudent', ['relatedData']),

      dynamicLinks () {
        const source = {
          1: {name: '课程', link: '/education/course/detail'},
          2: {name: '项目', link: '/education/project/detail'},
          3: {name: '实训', link: '/education/course/detail'}
        }

        return source[this.selected.studyType]
      }
    },

    created () {
      const {identity, orgId} = this.selected
      this.isStudent = identity === '0'
      this.requestList()
      this.requestRelatedData({isStudent: this.isStudent})
    },

    components: {
      pagination,
      listRow,
      multiSelect,
      termSelect,
      search,
      selectRange,
      achievementDialog
    },

    methods: {
      ...mapActions('teacherAndStudent', ['requestRelatedData']),

      async requestList () { // 获取列表数据
        const res = await requestStudyList({
          ...this.pageParam,
          ...this.selected
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.lists = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      goToEvaluate ({busName, id, studyResultList}) { // 进入空间评价系统
        console.log(arguments)
        const _resultList = (studyResultList || []).map(list => ({worksId: list.worksId, worksName: list.worksName}))

        const options = {
          beCommentedId: this.$ls.get('loginUId', ''),
          busId: id,
          busName,
          resultList: _resultList,
          target: this.selected.studyType
        }

        this.$ls.set('curEvaluatingItem', options)
        this.$router.push('/admin/study/eval')
      },

      setKeyWords (str) {
        this.selected.name = str
      },

      showAchievementDialog ({id, studyResultList}) {
        this.achievementDialog.isVisible = true
        this.curId = id
        this.curAchievementArr = studyResultList || []
      },

      showSelectRangeDialog ({id, openRange}) {
        this.dialog.isVisible = true
        this.curRange = openRange || '1'
        this.curId = id
      },
    },

    watch: {
      category: {
        handler () {
          this.requestList()
        },
        deep: true
      },

      selected: {
        handler () {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
  .admin-study {
    .tabs-bar-header {
      margin-bottom: 20px;
    }
  }

  .total-of-teacher {
    line-height: 24px;
    font-size: 16px;
    border-bottom: 1px solid #c9c9c9;
    color: #3e3e3e;
  }

  .total {
    line-height: 34px;
    font-size: 14px;
    margin-right: 10px;
  }

  .list-wrapper .list-item {
    box-sizing: border-box;
    height: 108px;
    border-bottom: 1px dashed #c9c9c9;
    font-size: 14px;
    p {
      line-height: 1.8;
    }
    .blue {
      color: #00a0e9;
    }
    .operate {
      .link {
        display: block;
        font-size: 14px;
        &:hover {
          color: $default-color;
        }
      }
      .link + .link {
        margin-top: 12px;
      }
    }
  }

  .achievement-item {
    margin-right: 10px;
  }

  .red {
    color: $default-color;
  }
</style>

<style lang="scss">
  .admin-study {
    .el-progress {
      display: inline-block;
      width: 350px;
    }
  }
</style>
