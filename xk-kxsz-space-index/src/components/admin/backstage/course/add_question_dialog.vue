<template>
    <el-dialog :visible.sync="addQuestionDialogIsVisible" :show-close="false" :title="identifier.title" class="add-question__wrapper">
      <el-form :model="questionInfo" :rules="rules" ref="form" label-width="100px" class="add-question__content">
        <el-form-item class="label" label="名称" prop="name">
          <el-input v-model="questionInfo.name" class="question-input" placeholder="请输入题目名称，最多20字" :maxlength="20"/>
        </el-form-item>
        <el-form-item class="label" label="类型" prop="bankType">
          <el-select v-model="questionInfo.bankType" @change="radioBox(firstCheckedIndex)" placeholder="请选择题目类型" class="select">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="判断" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <div class="choice-wrapper">
          <el-form-item v-if="questionInfo.bankType === 3" class="label" label="答案" prop="rightAnswer">
            <el-radio-group v-model="questionInfo.rightAnswer">
              <el-radio label="1">对</el-radio>
              <el-radio label="0">错</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="questionInfo.bankType === 1 || questionInfo.bankType === 2" class="is-multiple-choice">
            <table width="100%">
              <thead>
              <tr>
                <th width="20%">选项</th>
                <th width="40%">内容</th>
                <th width="20%">正确选项</th>
                <th width="20%">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(choice, index) in questionInfo.options" :key="index">
                <td><span class="form-required">*</span><span class="multiple-choice-option"></span></td>
                <td><input v-model="choice.content" class="multiple-choice-input" type="text"
                           placeholder="请输入选项内容" maxlength="16"></td>
                <td>
                  <el-checkbox v-model="choice.rightAnswer" @change="radioBox(index)" :true-label="1" :false-label="0"
                               class="multiple-choice-check-box"></el-checkbox>
                </td>
                <td>
                  <a @click="deleteChoice(index)" href="javascript:;" class="multiple-choice-btn-delete btn" title="删除">
                    <i class="icon-btn-delete icon"></i>
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
            <a @click="addChoice" href="javascript:;" class="btn-add-choice"><i class="icon-btn-add-circle icon"></i>新增选项</a>
          </div>
        </div>
        <el-form-item class="label" label="所属知识点" prop="knowledgePoint">
          <!--<el-select v-model="questionInfo.knowledgePoint" placeholder="请选择所属知识点" class="select">-->
            <!--<el-option v-for="(point, index) in points" :label="point.name" :value="point.id" :key="index"></el-option>-->
          <!--</el-select>-->
          <el-cascader
            :options="points"
            v-model="questionInfo.knowledgePoint"
            :props="{value: 'id', label: 'name', children: 'subs'}"
            :show-all-levels="false"
            placeholder="请选择所属知识点">
          </el-cascader>
        </el-form-item>
        <div class="btn-row">
          <button @click.stop="hideDialog('addQuestion')" class="btn-cancel btn">取消</button>
          <button @click.stop="submitQuestion" class="btn-ok btn">确定</button>
        </div>
        <p v-if="errorMsg" class="error-msg">{{errorMsg}}</p>
      </el-form>
  </el-dialog>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {addQuestion, editQuestion} from '@/service/course.js'
  const MAXOPTIONCOUNT = 8

  export default {
    name: 'backendAddQuestion', // 后台课程，添加题目
    data () {
      return {
        identifier: { // 标识新增题目，还是修改题目
          type: 0, // 0：新增题目，1：修改题目
          title: '添加题目'
        },
        questionInfo: {
          name: '', // 题目
          bankType: '', // 题目类型（1，单选，2多选，3判断）
          knowledgePoint: [], // 所属知识点id
          options: [ // 题目选项（单选、多选）
            {name: '', content: '', rightAnswer: 0},
            {name: '', content: '', rightAnswer: 0},
            {name: '', content: '', rightAnswer: 0},
            {name: '', content: '', rightAnswer: 0}
          ],
          rightAnswer: '', // 判断题，题目类型为3时有效
        },
        rules: {
          name: [
            { required: true, message: '请输入题目', trigger: 'blur' },
            { max: 20, message: '题目名称最多20个字符', trigger: 'change' }
          ],
          bankType: [
            { type: 'number', required: true, message: '请选择题目类型', trigger: 'change' }
          ],
          rightAnswer: [
            { required: true, message: '正确答案不能为空', trigger: 'change' }
          ],
          knowledgePoint: [
            { type: 'array', required: true, message: '请选择所属知识点', trigger: 'change' }
          ],
        },
        errorMsg: ''
      }
    },
    props: {
      points: { // 知识点
        type: Array,
        required: true
      },
      handleRequest: Function
    },
    mounted () {
      this.init()
    },
    computed: {
      ...mapState('course/backend', ['addQuestionDialogIsVisible', 'curEditingQuestion']),
      firstCheckedIndex () { // 获取第一个勾选checkbox的序列号
        return this.questionInfo.options.findIndex(val => val.rightAnswer === 1)
      }
    },
    methods: {
      ...mapMutations('course/backend', ['hideDialog']),
      init () { // 初始化
        if (this.curEditingQuestion.bankType === undefined) {
          this.identifier.type = 0
          this.identifier.title = '添加题目'
          return
        }
        let _flag = false
        let _point = {}
        let findPoint = function (input = [], _id = '') { // 获取对应题目所属知识点
          input.find(item => {
            if (_flag) return true
            if (item.id === _id) {
              _point = item
              _flag = true
              return true
            }
            findPoint(item.subs, _id)
          })
//          for (let i = 0; i < input.length; i++) {
//            if (input[i].id === _id) {
//              _point = input[i]
//              return
//            }
//            findPoint(input[i].subs, _id)
//          }
        }
        this.identifier.type = 1
        this.identifier.title = '修改题目'
        this.questionInfo = JSON.parse(JSON.stringify(this.curEditingQuestion)) // 引用数据类型的拷贝
        findPoint(this.points, this.questionInfo.knowledgePoint)
        this.questionInfo.knowledgePoint = _point && _point._ids || []
      },
      deleteChoice (index) { // 删除题目选项
        this.questionInfo.options.splice(index, 1)
      },
      addChoice () { // 添加题目选项
        if (this.questionInfo.options.length >= MAXOPTIONCOUNT) {
          this.$message.error('题目选项已经够多了，不能再添加')
          return
        }
        this.questionInfo.options.push({name: '', content: '', rightAnswer: 0})
      },
      radioBox (index) { // 单选题，限制其他题目的勾选
        if (index === -1) return; // 没有选项选中时，直接返回
        if (this.questionInfo.bankType === 1) {
          this.questionInfo.options.forEach((val, i) => {
            (index !== i) && (val.rightAnswer === 1) && (val.rightAnswer = 0)
          })
        }
      },
      submitQuestion () { // 提交添加/修改题目
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}
            let _multipleChoice = this.questionInfo.options.map((val, i) => {
              return {
                name: obj[i], // 选项名称
                content: val.content, // 选项内容
                rightAnswer: val.rightAnswer // 选项答案： 1 正确答案；0，错误答案
              }
            })
            let handler = this.identifier.type === 0 && addQuestion || editQuestion
            let _id = this.identifier.type === 0 && '' || this.questionInfo.id
            let _knowledgePoint = this.questionInfo.knowledgePoint[this.questionInfo.knowledgePoint.length - 1] || ''
            handler({
              id: _id,
              name: this.questionInfo.name, // 考题名称
              bankType: this.questionInfo.bankType, // 考题类型（1，单选，2多选，3判断）
              rightAnswer: this.questionInfo.rightAnswer, // 是否为正确答案（bankType为3时有效）
              knowledgePoint: _knowledgePoint, // 知识点Id
              options: _multipleChoice // 答案选项（当bankType为1、2时有效）
            }).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: '成功' + this.identifier.title,
                  type: 'success'
                })
                this.hideDialog('addQuestion')
                this.handleRequest() // 调用父组件方法，重新获取题目列表
              } else {
                this.$message.error({
                  message: res.data.msg
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang='scss'>
  .add-question__wrapper .el-dialog {
    width: 600px;
    box-sizing: border-box;
    .el-icon-close {
      font-size: 18px;
      top: 18px;
      right: 18px;
    }
    .el-dialog__body {
      padding: 20px 20px 30px 30px;
      .el-input__icon {
        width: 10%;
      }
      .el-input__inner {
        box-sizing: border-box;
        width: 372px;
        height: 38px;
        border: 1px solid #dfdfdf;
      }
    }
    .el-radio + .el-radio {
      margin-left: 24px;
    }
    .el-cascader {
      width: 372px;
      height: 38px;
      .el-cascader__label {
        line-height: 38px;
      }
    }
  }
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
  .add-question__wrapper {
    .add-question__content {
      position: relative;
    }
    .input-group {
      padding-left: 38px;
      &:first-child {
        margin-bottom: 20px;
      }
      .select {
        height: 38px;
      }
      .label {
        margin-right: 16px;
      }
      .question-input {
        display: inline-block;
        width: 372px;
      }
    }
    .choice-wrapper {
      margin: 20px 0;
      .is-true-or-false {
        padding: 6px 38px 0;
        .label {
          margin-right: 16px;
        }
      }
      .is-multiple-choice {
        counter-reset: add-answer
      }
      th {
        height: 40px;
        vertical-align: middle;
        background-color: #eee;
        font-size: 12px;
        font-weight: normal;
      }
      tbody tr {
        box-sizing: border-box;
        height: 48px;
        border: 1px solid #eee;
        border-top: 0;
      }
      td {
        vertical-align: middle;
        text-align: center;
      }
      .form-required {
        color: #ff4949;
        margin-right: .5em;
      }
      .multiple-choice-option:before {
        counter-increment: add-answer;
        content: counter(add-answer, upper-alpha);
        display: inline-block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 5px;
        text-align: center;
        background-color: #c9c9c9;
      }
      .multiple-choice-input {
        box-sizing: border-box;
        width: 188px;
        height: 30px;
        padding: 4px 10px;
        border: 1px solid #dfdfdf;
        &:focus {
          border-color: $default-color;
        }
      }
      .multiple-choice-btn-delete .icon {
        font-size: 18px;
      }
      .btn-add-choice {
        display: block;
        height: 38px;
        line-height: 38px;
        margin-top: 10px;
        background-color: #fff9f9;
        border: 1px dashed #fbbcbc;
        text-align: center;
        font-size: 14px;
        .icon {
          margin-right: 6px;
          font-size: 18px;
        }
      }
    }
    .belong-to .label {
      margin-right: 13px;
    }
    .btn-row {
      margin-top: 55px;
      text-align: right;
      .btn {
        box-sizing: border-box;
        width: 62px;
        height: 26px;
        line-height: 26px;
        margin-left: 10px;
        text-align: center;
        border: 1px solid $default-color;
        font-size: 12px;
        padding: 0;
      }
      .btn-cancel {
        color: $default-color;
      }
      .btn-ok {
        background-color: $default-color;
        color: #fff;
      }
    }
    .error-msg {
      position: absolute;
      bottom: -14px;
      width: 100%;
      text-align: center;
      color: #d00;
      font-size: 12px;
    }
  }
</style>

