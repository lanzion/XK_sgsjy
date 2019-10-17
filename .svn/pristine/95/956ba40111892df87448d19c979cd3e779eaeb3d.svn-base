<template>
  <el-dialog :visible.sync="selectQuestionDialogIsVisible" :show-close="false" class="select-question__wrapper">
    <h3 slot="title" class="select-question__title">
      题目
      <i @click.stop="hideDialog('selectQuestion')" class="el-dialog__close el-icon el-icon-close"></i>
    </h3>
    <div class="select-question__content clearfix">
      <div class="point-wrapper wrapper fl">
        <h4 class="point-title title">知识点</h4>
        <div class="point-main">
          <el-input v-model="filterText" icon="search" :maxlength="10" class="search-input" placeholder="请输入知识点关键字">
          </el-input>
          <el-tree
            :data="points"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            default-expand-all
            highlight-current
            ref="pointTree"
            class="filter-tree">
          </el-tree>
        </div>
      </div>
      <div class="question-wrapper wrapper fr">
        <h4 class="question-title title">
          题目
          <el-input v-model.trim="selected.name" icon="search" :on-icon-click="searchQuestion" :maxlength="10"
                    class="search-input fr"
                    placeholder="请输入题目关键字"></el-input>
        </h4>
        <div class="question-main">
          <div class="question-nav">
            <el-radio-group v-model="selected.bankType" @change="requestQuestionList">
              <el-radio-button label="1">单选题</el-radio-button>
              <el-radio-button label="2">多选题</el-radio-button>
              <el-radio-button label="3">判断题</el-radio-button>
            </el-radio-group>
          </div>
          <div class="question-container">
            <ul class="question-list">
              <li v-for="(question, index) in questions" :key="index" class="question-item table-layout">
                <div class="table-cell pr">
                  <h5 class="question">
                    <em class="question-type">【{{handleQuestionType(question.bankType)}}】</em>{{question.name}}
                  </h5>
                  <p v-if="question.bankType === 3" class="answers true-or-false">
                    <span :class="{correct: question.rightAnswer === '1'}" class="answer first"></span>
                    <span :class="{correct: question.rightAnswer === '0'}" class="answer second"></span>
                  </p>
                  <p v-else class="answers">
                    <span v-for="(answer, i) in question.options" :key="i" :class="{correct: answer.rightAnswer === 1}"
                          class="answer">{{answer.content}}</span>
                  </p>
                  <div class="operate pa">
                    <transition name="fade" mode="out-in">
                      <div v-if="question._hasAdded" class="remove-group btn-group">
                        <button @click="removeQuestionFromExam(index)" class="btn-remove">移除考试</button>
                        <el-input v-model.number="question._score" @blur="setScore(index)" :maxlength="2" :max="100" type="number"
                                  class="set-count" placeholder="分值"></el-input>
                      </div>
                      <button v-else @click="addQuestionToExam(index)" class="btn-add btn-group">加入考试</button>
                    </transition>
                  </div>
                </div>
              </li>
            </ul>
            <p v-if="questions.length === 0" class="no-data">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-row pa">
      <button @click="hideDialog('selectQuestion')" class="btn-ok">关闭</button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {requestQuestionList, requestPointList} from '@/service/course.js'

  export default {
    name: 'selectQuestion', // 后台课程，选择题目弹窗
    data () {
      return {
        filterText: '', // 过虑后的知识点
        questions: [], // 题库
        selected: {
          knowledgePoint: '', // 知识点Id
          bankType: '1', // 题目类型
          name: '' // 题目搜索关键词
        },
        pageParam: { // 题目数据不分页
          pageSize: 10000,
          pageNum: 1,
          totalNum: 10000
        },
        points: [], // 知识点数据
        defaultProps: { // 知识点默认属性
          children: 'subs',
          label: 'name' // 指向知识点数据的name
        }
      }
    },
    props: {
      questionAdded: { // 对应课时已经加入考试的题目
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.requestQuestionList()
      this.requestPointList()
    },
    computed: {
      ...mapState('course/backend', ['selectQuestionDialogIsVisible'])
    },
    methods: {
      ...mapMutations('course/backend', ['hideDialog']),
      async requestQuestionList () { // 请求题目列表
        let res = await requestQuestionList({...this.selected, ...this.pageParam})
        let _entity = res.data.entity
        let _questions = _entity.resultData || []
        _questions.forEach(val => { // 处理题库中的题目
          if (this.questionAdded.length === 0) { // 给题目设置初始状态
            val._hasAdded = false // 是否加入了考题
            val._score = '' // 考题分值
            return
          }
          this.questionAdded.find((item, i) => { // forEach不能跳出循环，此处不能用
            if (i === 0) { // 给题目设置初始状态
              val._hasAdded = false
              val._score = ''
            }
            if (val.id === item.questBankId) { // 当id相同时
              val._hasAdded = true
              val._score = item.score === undefined ? '' : item.score
              return true // 跳出find循环
            }
          })
        })
        this.questions = _questions
        this.pageParam.totalNum = _entity.totalNum
      },
      async requestPointList () { // 请求知识点列表
        let res = await requestPointList()
        this.points = res.data.entity || []
      },
      addQuestionToExam (index) { // 添加题目到对应课时的考题中
        let _curQuestion = this.questions[index]
        this.questionAdded.push({questBankId: _curQuestion.id, _name: _curQuestion.name, _bankType: _curQuestion.bankType})
        _curQuestion._hasAdded = true
      },
      filterNode(value, data) { // 过虑知识点
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick (data) { // 点击知识点，获取对应的题目
        this.selected.knowledgePoint = data.id
        this.requestQuestionList()
      },
      handleQuestionType (type) { // 处理题目类型
        let obj = {
          1: '单选',
          2: '多选',
          3: '判断'
        }
        return obj[type]
      },
      removeQuestionFromExam (index) { // 移除对应课时的考题中的题目
        let _curQuestion = this.questions[index]
        this.questionAdded.find((val, i, arr) => {
          if (val.questBankId === _curQuestion.id) {
            arr.splice(i, 1)
            _curQuestion._hasAdded = false // 移除考题，重置题库
            _curQuestion._score = ''
            return true // 当id相同时，跳出find循环
          }
        })
      },
      searchQuestion () { // 输入题目关键词，搜索题目
        this.selected.name !== '' && this.requestQuestionList()
      },
      setScore (index) { // 设置对应课时的考题中题目的分值
        let _curQuestion = this.questions[index]
        this.questionAdded.find(val => {
          if (val.questBankId === _curQuestion.id) {
            val.score = _curQuestion._score
            return true // 当id相同时，跳出find循环
          }
        })
      }
    },
    watch: {
      filterText(val) {
        this.$refs.pointTree.filter(val)
      }
    },
  }
</script>

<style lang='scss'>
@import '~@/asset/scss/vars.scss';
  .select-question__wrapper .el-dialog {
    box-sizing: border-box;
    width: 964px;
    height: 850px;
    .el-dialog__body {
      padding: 0;
      .search-input {
        box-sizing: border-box;
        width: 184px;
        font-size: 12px;
      }
      .el-input__icon {
        width: 20%;
        &:before {
          color: #878787;
          font-size: 14px;
        }
      }
      .question-title .el-input__icon {
        cursor: pointer;
        &:hover:before {
          color: $default-color;
        }
      }
      .el-tree {
        box-sizing: border-box;
        height: 616px;
        overflow: hidden;
        overflow-y: auto;
        border: 0;
        padding-top: 10px;
      }
      .el-tree-node__label {
        font-size: 12px;
      }
      .el-tree-node.is-current .el-tree-node__label {
        color: $default-color;
      }
      .el-radio-button__inner {
        display: inline-block;
        width: 70px;
        height: 30px;
        line-height: 30px;
        background-color: #f6f6f6;
        border: 0;
        border-bottom: 1px solid #c9c9c9;
        border-right: 1px solid #c9c9c9;
        border-radius: 0;
        transition: none;
        font-size: 12px;
        padding: 0;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #fff;
        color: $default-color;
        border-bottom: 1px solid transparent;
        box-shadow: none;
      }
      .set-count .el-input__inner {
        height: 26px;
        padding: 3px 6px;
        text-align: center;
      }
    }
  }
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
  @import "~@/asset/scss/question_list.scss";

  .select-question__wrapper {
    .select-question__title {
      position: relative;
      font-size: 16px;
      i {
        position: absolute;
        top: 18px;
        right: 0;
        font-size: 18px;
      }
    }
    .select-question__content {
      box-sizing: border-box;
      padding: 36px 20px 30px 20px;
    }
    .wrapper {
      box-sizing: border-box;
      width: 200px;
      height: 700px;
      border: 1px solid #c9c9c9;
      .title {
        box-sizing: border-box;
        height: 40px;
        line-height: 32px;
        font-size: 16px;
        padding: 4px 4px 4px 20px;
        border-bottom: 1px solid #c9c9c9;
      }
      .point-main {
        padding: 8px;
      }
    }
    .question-wrapper {
      width: 712px;
      height: 700px;
    }
    .question-nav {
      box-sizing: border-box;
      height: 30px;
      background-color: #f6f6f6;
      border-bottom: 1px solid #c9c9c9;
    }
    .question-container {
      height: 627px;
      overflow: hidden;
      overflow-y: auto;
      margin-top: 0;
      .question-list {
        padding: 0 10px 30px;
      }
      .question-item {
        box-sizing: border-box;
        min-height: 208px;
        padding: 10px 0;
        .answers {
          padding: 0 20px;
        }
        .answer {
          display: block;
          margin-right: 0;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .operate {
          top: 0;
          right: 0;
          width: 62px;
          button {
            box-sizing: border-box;
            width: 62px;
            height: 26px;
            line-height: 26px;
            margin-bottom: 10px;
            border: 1px solid $default-color;
            padding: 0;
            text-align: center;
            color: $default-color;
            font-size: 12px;
          }
          .btn-add {
            background-color: $default-color;
            color: #fff;
          }
          .set-count {
            font-size: 12px;
          }
          .btn-group {
            /*position: absolute;*/
            &.fade-enter-active, &.fade-leave-active {
              transition: opacity .25s
            }
            &.fade-enter, &.fade-leave-to {
              opacity: 0
            }
            /*&.translate-fade-enter-active, &.translate-fade-leave-active {
              transition: all .5s;
            }
            &.translate-fade-enter, &.translate-fade-leave-to {
              opacity: 0;
            }
            &.translate-fade-enter {
              transform: translateX(62px);
            }
            &.translate-fade-leave-to {
              transform: translateX(-62px);
            }*/
          }
        }
      }
    }
    .btn-row {
      right: 20px;
      bottom: 20px;
      .btn-ok {
        box-sizing: border-box;
        width: 62px;
        height: 26px;
        line-height: 24px;
        text-align: center;
        border: 1px solid $default-color;
        color: $default-color;
        &:hover {
          color: #fff;
          background-color: $default-color;
        }
      }
    }
  }
</style>

