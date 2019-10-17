<template>
  <div class="question-wrapper">
      <ul class="questions">
        <li v-for="(question, index) in questions" :key="index" class="question-item">
          <h4 class="question">
            【{{handleBankType(question.questBank.bankType)}}】{{question.questBank.name}} （{{question.score}}分）</h4>
          <p class="answer pr">
            <el-radio-group v-if="question.questBank.bankType === 1" v-model="answers[index].myOptions">
              <el-radio v-for="(answer, i) in question.questBank.options" :label="answer.name" :key="i">
                {{answer.content}}
              </el-radio>
            </el-radio-group>
            <el-checkbox-group v-else-if="question.questBank.bankType === 2" v-model="answers[index]._myOptions">
              <el-checkbox v-for="(answer, i) in question.questBank.options" :label="answer.name" :key="i">
                {{answer.content}}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-if="question.questBank.bankType === 3" v-model="answers[index].myOptions">
              <el-radio v-for="(answer, i) in options" :label="answer.val" :key="i">{{answer.name}}</el-radio>
            </el-radio-group>
          </p>
        </li>
        <li v-if="questions.length === 0" class="no-data">暂无数据</li>
      </ul>
      <div class="btn-row" v-if="!isBackAmin">
        <button @click="submitTest" href="javascript:;" class="btn-submit">交卷</button>
      </div>
    </div>
</template>

<script>
  import { requestExamQuestionList, submitTesting, addCourseStudyingRecord } from '@/service/course.js'

  export default {
    name: 'courseTestQuestion', // 课程考试-考题页面
    data() {
      return {
        answers: [], // 答案
        options: [{ name: '对', val: '1' }, { name: '错', val: '0' }],
        questions: [], // 题目
        sectionId: this.$route.query.sectionId,
        isBackAmin: location.href.includes('admin.html')    // 判断是不是管理后台
      }
    },
    computed: {},
    created() {
      this.requestExamQuestionList()
    },
    methods: {
      async requestExamQuestionList() { // 获取考题列表
        const res = await requestExamQuestionList({ sectionId: this.sectionId })
        if (res.data.code === 200) {
          const _appendInfo = res.data.appendInfo || {}
          this.questions = _appendInfo.list || []
          this.generateAnswerArr()
        }
      },
      async submitTest() { // 提交试卷
        if (this.questions.length === 0) {
          const component = this
          this.$message({
            type: 'info',
            message: '暂无试卷内容，将自动跳转课程目录页面',
            duration: 2000,
            onClose() {
              component.$router.push({ path: '/education/course/detail/outline', query: { id: component.$route.query.id } })
            }
          })
          return
        }
        /* if (this.checkTestIsDone()) {
          this.$message('您还有未做完的题目，请仔细检查')
          return
        } */
        this.answers.forEach(function (item) {
          item._myOptions && (item.myOptions = item._myOptions.join(','))
        })
        try {
          addCourseStudyingRecord({
            courseId: this.$route.query.id,
            sectionId: this.$route.query.sectionId,
            learnLen: 5,
            sum: 5
          })
          const res = await submitTesting({ sectionId: this.sectionId, examinationPaperList: this.answers })
          if (res.data.code === 200) {
            this.$router.push({ path: '/education/course/detail/test/a', query: this.$route.query })
            return
          }

          this.$message.error(res.data.msg || '提交试卷失败，请重试')
        } catch (e) {
        // this.$message.error('提交试卷失败，请重试')
        }
      },
      checkTestIsDone() { // 检查题目是否已完成
        return this.answers.some(item => item.includes('answer_'))
      },
      generateAnswerArr() { // 生成与考题对应的答案数据
        this.answers = this.questions.map((item, i) => {
          const _flag = (item.questBank || {}).bankType === 2
          const _key = _flag && '_myOptions' || 'myOptions'
          return {
            id: item.id,
            [_key]: _flag ? [] : `answer_${i}`
          }
        })
      },
      handleBankType(i) { // 处理考题类型
        const source = { 1: '单选', 2: '多选', 3: '判断' }
        return source[i]
      }
    }
  }
</script>

<style lang='scss'>
  .test-wrapper .el-radio-group .el-radio {
    min-width: 125px;
    font-size: 12px;
    .el-radio__label {
      font-size: 12px;
    }
  }

  .test-wrapper .el-checkbox-group .el-checkbox {
    min-width: 125px;
    font-size: 12px;
    .el-checkbox__input.is-checked .el-checkbox__inner {
      border-color: #c9c9c9;
      &:after {
        transform: translate(-50%, -50%) scale(1) rotate(0);
      }
    }
    .el-checkbox__inner {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        content: "";
        border: 0;
        background-color: #2bbb61;
        transform: translate(-50%, -50%) scale(0) rotate(0);
        transition: transform .15s cubic-bezier(.71, -.46, .88, .6);
      }
    }
    .el-checkbox__label {
      font-size: 12px;
    }
  }
</style>
<style lang='scss' scoped>
  #courseTest .test-wrapper {
    box-sizing: border-box;
    padding: 10px 42px 14px;
    .questions {
      box-sizing: border-box;
      counter-reset: question;
      margin-top: 26px;
      padding: 30px 20px 20px 40px;
      border: 1px solid #c9c9c9;
      .question-item {
        width: 100%;
        font-size: 12px;
      }
      .question {
        line-height: 1.3;
        font-weight: bold;
        &:before {
          counter-increment: question;
          content: '（' counter(question) '）';
          margin-right: 8px;
        }
      }
      .answer {
        box-sizing: border-box;
        height: 50px;
        counter-reset: answer;
        padding: 15px 50px;
        .icon-result {
          left: 7px;
          top: 16px;
          font-size: 18px;
        }
        .el-radio__label {
          font-size: 12px;
          &:before {
            counter-increment: answer;
            content: counter(answer, upper-alpha) '. ';
          }
        }
        .el-checkbox__label:before {
          counter-increment: answer;
          content: counter(answer, upper-alpha) '. ';
        }
      }
      .result {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        font-size: 14px;
        background-color: #f0f0f0;
        padding-left: 12px;
        .right-answer {
          color: #00a0e9;
        }
      }
      .no-data {
        line-height: 4;
        text-align: center;
        font-size: 14px;
      }
    }
    .btn-row {
      margin-top: 40px;
      .btn-submit {
        display: block;
        width: 160px;
        height: 46px;
        line-height: 46px;
        margin: 0 auto;
        padding: 0;
        color: #fff;
        font-size: 16px;
        background: #1a9937;
        background: linear-gradient(to top, #148d2d 0%, #21a742 100%);
      }
    }
    .result-wrapper .questions {
      padding-bottom: 128px;
    }
    .result-wrapper .btn-row__result {
      margin-top: -116px;
      text-align: left;
      padding-left: 40px;
      font-size: 0;
      .btn {
        box-sizing: border-box;
        display: inline-block;
        width: 92px;
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
        text-align: center;
        font-size: 16px;
        color: #2bbb61;
        border: 1px solid #2bbb61;
        &:hover {
          color: #fff;
          background-color: #2bbb61;
        }
      }
    }
  }
</style>
