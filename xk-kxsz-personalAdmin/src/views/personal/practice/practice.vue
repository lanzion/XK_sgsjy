<template>
  <div class="practice">
    <div class="options-and-search clearfix">
      <div class="options fl">
        <term-select :selected.sync="selected.termId" :ifAll="false" :clearable="true" style="width:175px;"></term-select>
        <multi-select :selectData="category" model="activity" :ifAll="false" :clearable="true"
                      style="width:175px;display:inline-block;"></multi-select>
      </div>
      <div class="fr">
        <span class="total">共计<em class="blue">{{pageParam.totalNum}}</em>个实践</span>
        <search class="fr" @search="setKeyWords"></search>
      </div>
    </div>
    <div class="list-wrapper dpd15">
      <ul>
        <list-row v-for="(item, index) in lists" :item="item" :item-height="156" :key="index">
          <div slot="content" class="content table-cell">
            <p>活动名称：
              <a @click="redirect(pages.detail.activity, { query: { id: item.id } })" :title="item.name"
                           class="blue">{{item.name}}
              </a>
            </p>
            <p>参与时长（天）：{{item.learnLen || 0}}</p>
            <p>自评等级：<span class="red">{{item.evaluationGrade}}</span></p>
            <p>自评语：{{item.remark}}</p>
            <p>实践成果：
              <a v-for="(result, i) in item.resultList" :key="i" :title="result.name"
                           @click="redirect(pages.detail.works, { query: { id: result.worksId } })"
                           class="achievement-item blue">
                {{result.name}}
              </a>
            </p>
            <div slot="operate" class="operate pa">
              <template v-if="isAdmin">
                <a @click="showSelectRangeDialog(item)" class="link" href="javascript:;">评价范围</a>
                <a @click="goToEvaluate(item)" class="link" href="javascript:;">去评价</a>
                <a @click="showAchievementDialog(item)" class="link" href="javascript:;">实践成果</a>
              </template>
              <a v-else-if="!!item.isEvalua" @click="goToEvaluate(item)" class="btn" href="javascript:;">去评价</a>
            </div>
          </div>
        </list-row>
      </ul>
      <p v-if="!lists.length" class="no-data">暂无数据</p>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
      <select-range v-if="dialog.isVisible"
                    v-bind="{dialog, curRange, id: curId, handleRequest: requestList, api: '/maker/activityMember/modify'}">
      </select-range>
      <achievement-dialog v-if="achievementDialog.isVisible"
                          v-bind="{curAchievementArr, dialog: achievementDialog, module: 'practice', id: curId, handleRequest: requestList}">
      </achievement-dialog>
    </div>
  </div>
</template>

<script>
  import { requestPracticeList } from '@/service/my.js'
  import pagination from 'components/common/pagination.vue'
  import listRow from 'components/common/classificationList/list/list_row.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import termSelect from 'Common/select/term_select.vue'
  import search from 'Common/search.vue'
  import selectRange from '@/components/practice/set_range_dialog.vue'
  import achievementDialog from '@/components/practice/achievement_dialog.vue'

  export default {
    name: 'adminPracticeList', // 学生后台、学生空间-实践

    data() {
      return {
        achievementDialog: { isVisible: false },
        category: [], // 分类
        curAchievementArr: [],
        curId: '',
        curRange: '',
        dialog: { isVisible: false },
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          activityType: '',
          name: '',
          termId: ''
        }
      }
    },

    created() {
      this.requestList()
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
      async requestList() { // 获取列表数据
        const res = await requestPracticeList({
          ...this.pageParam,
          ...this.selected,
          activityType: this.category.join('-'),
          userId: this.isAdmin ? this.$ls.get('loginUId') || undefined : this.$route.query.uid
        })

        if (res.status === 200 && res.data.code === 200) {
          const { resultData, totalNum } = res.data.entity || {}
          this.lists = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      goToEvaluate({ name, memberId, resultList }) { // 进入空间评价系统
        const _resultList = this.isAdmin ? (resultList || []).map(list => ({ worksId: list.id, worksName: list.name })) : []
        const _path = this.isAdmin && '/admin/practice/eval' || '/space/student/practice/eval'

        const options = {
          beCommentedId: this.isAdmin ? this.$ls.get('loginUId', '') : this.$route.query.uid || '',
          busId: memberId,
          busName: name,
          resultList: _resultList,
          target: 4
        }

        this.$ls.set('curEvaluatingItem', options)
        this.$router.push({ path: _path, query: this.$route.query })
      },

      setKeyWords(str) {
        this.selected.name = str
      },

      showAchievementDialog({ memberId, resultList }) {
        this.achievementDialog.isVisible = true
        this.curId = memberId
        this.curAchievementArr = (resultList || []).map(item => ({
          id: item.id,
          worksId: item.worksId,
          worksName: item.name,
        }))
      },

      showSelectRangeDialog({ openRange, memberId }) {
        this.dialog.isVisible = true
        this.curRange = openRange || '1'
        this.curId = memberId
      },
    },

    watch: {
      category: {
        handler() {
          this.requestList()
        },
        deep: true
      },

      selected: {
        handler() {
          this.requestList()
        },
        deep: true
      }
    }
  }

</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
  .total {
    line-height: 34px;
    font-size: 14px;
    margin-right: 10px;
  }

  .options-and-search {
    padding: 10px 15px 0px;
  }

  .list-wrapper {
    margin-top: 10px;
    border-top: 1px solid #c9c9c9;
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
          color: $theme_color;
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
    color: $theme_color;
  }
</style>
