<template>
  <div class="add-tmpl-step step-3">
    <el-table :data="stepTwoData" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
      <el-table-column prop="pName" label="一级指标" show-overflow-tooltip/>
      <el-table-column prop="name" label="二级指标" show-overflow-tooltip/>
      <el-table-column prop="evaluationPoint" label="测评点" show-overflow-tooltip width="500">
        <template scope="scope">
          <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
        </template>
      </el-table-column>
      <el-table-column label="分值">
        <template scope="scope">
          <el-input-number v-model="scope.row.score" :min="0" :max="validScore - totalScore + scope.row.score" :disabled="isReadOnly"/>
        </template>
      </el-table-column>
    </el-table>
    <p class="tip clearfix">
      <span class="fl">注：所有分值之和需等于<i class="red">100</i>分</span>
      <span class="fr">已设置分值的总分为：<i class="score red">{{totalScore}}</i></span>
    </p>
    <div class="btn-row">
      <button @click.prevent="lastStep" class="bs-handle-button i-form-button is-plain" type="button">上一步</button>
      <button @click.prevent="nextStep" class="bs-handle-button i-form-button">下一步</button>
      <button @click.prevent="$router.go(-1)" class="bs-handle-button i-form-button is-plain">取消</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'stepThree', // 添加评价模板=>指标分值设置
    inheritAttrs: false,
    data () {
      return {
        validScore: 100,
      }
    },
    computed: {
      totalScore () { // 总分值
        let add = (a = 0, b = 0) => +a + +b
        return this.stepTwoData.map(item => item.score).reduce(add, 0)
      }
    },
    props: {
      stepTwoData: {
        type: Array,
        default () {
          return []
        }
      },
      isReadOnly: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    created () {},
    methods: {
      checkEmptyVal () { // 检查是否有空值
        const hasEmptyVal = this.stepTwoData.some(item => item.score === '')

        if (hasEmptyVal) {
          this.$message('您还有未填写的内容，请检查')
          return true
        }

        return false
      },
      checkQuotaTotal () { // 检查指标总分
        if (this.totalScore !== this.validScore) {
          this.$message('您设置的总分值不等于100分，请调整分值')
          return true
        }
        return false
      },
      handleEvaluationPoint (txt) {
        return !txt ? '' : txt.replace(/\n/g, '</br>')
      },
      lastStep () { // 上一步
        this.$emit('on-change-step', {step: 2, action: 'back'})
      },
      nextStep () { // 跳转下一步
        let hasEmptyVal = this.checkEmptyVal()
        if (hasEmptyVal) return

        let isInValidTotal = this.checkQuotaTotal()
        if (isInValidTotal) return

        this.$emit('on-change-step', {step: 4, stepData: this.stepTwoData})
      },
    }
  }
</script>
<style lang="scss">
  /*.step-3 .el-input {
    width: 80%;
  }*/
  .step-3 .el-input__inner {
    text-align: center;
  }
  .step-3 .tip {
    margin-top: 12px;
    font-size: 12px;
    padding-right: 20px;
    .red {
      color: #d00;
    }
  }
</style>
