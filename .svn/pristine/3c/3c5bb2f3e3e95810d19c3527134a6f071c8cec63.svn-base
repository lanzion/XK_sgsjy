<template>
  <div class="backend-course__question">
    <div class="options">
      <!--<el-select @change="requestQuestionList" v-model="selected.knowledgePoint" placeholder="请选择知识点" class="select">-->
        <!--<el-option v-for="(item, i) in points" :label="item.name" :value="item.id" :key="i"></el-option>-->
      <!--</el-select>-->
      <el-cascader
        :options="points"
        v-model="knowledgePoint"
        :props="{value: 'id', label: 'name', children: 'subs'}"
        :show-all-levels="false"
        :clearable="true"
        style="width:175px;display:inline-block;vertical-align: middle;"
        placeholder="选择知识点">
      </el-cascader>
      <el-select v-model="selected.bankType" :clearable="true" placeholder="选择题型" class="select">
        <el-option v-for="(item, j) in questionTypes" :label="item" :value="j+1" :key="j"></el-option>
      </el-select>
      <a @click="showDialog('managePoint')" href="javascript:;" class="btn-manage btn" title="管理知识点"><i
        class="icon-btn-add-square icon"></i></a>
    </div>
    <div class="question-container">
      <ul v-if="questions.length" class="question-list">
        <li v-for="(question, index) in questions" :key="index" class="question-item table-layout">
          <div class="table-cell">
            <h5 class="question">
              <em class="question-type">【{{handleQuestionType(question.bankType)}}】</em>{{question.name}}
            </h5>
            <p v-if="question.bankType === 3" class="answers true-or-false">
              <span :class="{correct: question.rightAnswer === '1'}" class="answer first"></span>
              <span :class="{correct: question.rightAnswer === '0'}" class="answer second"></span>
            </p>
            <p v-else class="answers">
              <span v-for="(answer, i) in question.options" :key="i"
                    :class="{correct: answer.rightAnswer === 1}" class="answer">{{answer.content}}</span>
            </p>
          </div>
          <operate @on-delete="deleteItem(question.id)" @on-edit="editItem(index)" label="题目"></operate>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
      <pagination :param.sync="pageParam" :change-page="requestQuestionList"></pagination>
    </div>
    <add-question v-if="addQuestionDialogIsVisible" :points="propPoints" :handle-request="requestQuestionList"></add-question>
    <manage-point v-if="managePointDialogIsVisible" :points="propPoints" :handle-request="requestPointList"></manage-point>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import pagination from '@/components/common/pagination.vue'
  import operate from '@/components/common/operate.vue'
  import addQuestion from '@/components/admin/backstage/course/add_question_dialog.vue'
  import managePoint from '@/components/admin/backstage/course/manage_point_dialog.vue'
  import {requestQuestionList, requestPointList, deleteQuestion} from '@/service/course.js'

  export default {
    name: 'backendCourseQuestion', // 后台课程，我的题库

    data () {
      return {
        knowledgePoint: [],
        points: [], // 知识点
        propPoints: [], // 传递给子组件的知识点
        questionTypes: ['单选', '多选', '判断'],
        questions: [],
        selected: {
          knowledgePoint: '', // 知识点Id
          bankType: '', // 题目类型
          name: '' // 查询关键词
        },
        pageParam: {
          pageSize: 8,
          pageNum: 1,
          totalNum: 0
        }
      }
    },

    props: {
      keyWords: { // 搜索关键词
        type: String,
        default: ''
      }
    },

    computed: {
      ...mapState('course/backend', ['addQuestionDialogIsVisible', 'managePointDialogIsVisible'])
    },

    created () {
      this.requestQuestionList()
      this.requestPointList()
    },

    components: {
      pagination,
      operate,
      addQuestion,
      managePoint
    },

    methods: {
      ...mapMutations('course/backend', ['showDialog', 'setCurEditingQuestion']),

      async requestQuestionList () { // 请求题目列表
        const res = await requestQuestionList({...this.selected, ...this.pageParam})

        if (res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.questions = resultData || []
          this.pageParam.totalNum = totalNum || 0
          this.$emit('on-set-total', totalNum)
        }
      },

      async requestPointList () { // 请求知识点列表
        // 初始化知识点数据，删除每项的空subs，并设置每项的由父级id组成的数组
        const initPointData = (data = [], children = 'children', _ids = []) => {
          if (!Array.isArray(data)) return

          data.forEach(item => {
            if (!Array.isArray(item[children])) return

            // _ids保存由父级id组成的数组，用于初始化修改题目的知识点
            item._ids = _ids.concat([item.id])

            if (item[children].length === 0) {
              delete item[children]
              return
            }

            initPointData(item[children], children, item._ids)
          })
        }

        let res = await requestPointList()

        if (res.data.code === 200) {
          let _points = res.data.entity || []
          initPointData(_points, 'subs')
          this.propPoints = _points
          // this.points = [{name: '全部', id: ''}].concat(_points)
          this.points = _points
        }
      },

      async deleteItem (id) { // 监听到子组件的删除操作时，执行删除
        const res = await deleteQuestion({id})

        if (res.data.code === 200) {
          this.$message('成功删除该题目')
          this.requestQuestionList()
        }
      },

      editItem (index) { // 监听到子组件的编辑操作时，执行编辑
        this.setCurEditingQuestion(this.questions[index])
        this.showDialog('addQuestion')
      },

      handleQuestionType (type) { // 处理题目类型
        const obj = {
          1: '单选',
          2: '多选',
          3: '判断'
        }

        return obj[type]
      },
    },

    watch: {
      keyWords (val) {
        this.selected.name = val
      },

      knowledgePoint: {
        handler (val) {
          this.selected.knowledgePoint = val[val.length - 1]
        }
      },

      selected: {
        handler () {
          this.requestQuestionList()
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss">
  .el-cascader .el-input__icon {
    font-size: 12px;
  }
</style>
<style lang="scss" scoped>
  @import "~@/asset/scss/question_list.scss";
  .backend-course__question{
    padding: 5px 15px 15px;
  }
  .options {
    // margin-top: 8px;
    margin-bottom: 26px;
    .select {
      width: 175px;
      height: 32px;
      margin-right: 8px;
      vertical-align: middle;
      &:last-child {
        margin-right: 0;
      }
    }
    .btn-manage .icon {
      font-size: 30px;
    }
  }
  .question-container {
    margin: 0;
  }
</style>
