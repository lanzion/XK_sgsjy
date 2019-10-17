<template>
  <div class="add-tmpl-wrapper backend-content__middle">
    <el-steps :space="208" :active="step" class="add-tmpl-step">
      <el-step title="模板基本信息"></el-step>
      <el-step title="评价指标选择"></el-step>
      <el-step title="指标分值设置"></el-step>
      <el-step title="等级及终评设定"></el-step>
    </el-steps>
    <keep-alive>
      <component :is="curComponent" @on-change-step="changeStep" v-bind="{stepOneData, stepTwoData, stepThreeData, editData, isReadOnly}"></component>
    </keep-alive>
  </div>
</template>

<script>
  import stepOne from 'components/admin/admin_evaluation/add_tmpl_step1.vue'
  import stepTwo from 'components/admin/admin_evaluation/add_tmpl_step2.vue'
  import stepThree from 'components/admin/admin_evaluation/add_tmpl_step3.vue'
  import stepFour from 'components/admin/admin_evaluation/add_tmpl_step4.vue'
  import { queryTmplDetail } from '@/service/admin_evaluation.js'

  export default {
    name: 'addTemp', // 添加评价模板
    data () {
      return {
        curComponent: 'stepOne', // 当前组件
        editData: {}, // 修改流程的初始数据
        step: 1, // 流程
        stepOneData: {}, // 第一步数据
        stepTwoData: [], // 第二步数据
        stepThreeData: [], // 第三步数据
        isReadOnly: false
      }
    },
    created () {
      let {id} = this.$route.query
      this.id = id
      id && this.queryDetail()
      if (this.$route.path.includes('detail')) {
        this.isReadOnly = true
      }
    },
    components: {
      stepOne,
      stepTwo,
      stepThree,
      stepFour,
    },
    methods: {
      async queryDetail () { // 查询模板详情
        let res = await queryTmplDetail({id: this.id})
        if (res.status === 200 && res.data.code === 200) {
          this.editData = res.data.entity || {}
        }
      },
      changeStep ({action, step = 1, stepData = {}} = options) { // 跳转下一步、上一步
        let source = ['One', 'Two', 'Three', 'Four']

        this.step = step
        this.curComponent = `step${source[step - 1]}`

        if (action === 'back') return

        this[`step${source[step - 2]}Data`] = stepData
        console.log(this.curComponent)
      }
    }
  }
</script>
<style lang="scss">
  .add-tmpl-wrapper {
    .el-steps {
      width: 726px;
      margin: 16px auto 40px;
      .el-step__title {
        margin-left: -26px;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-input--large .el-textarea__inner {
      height: 100px;
    }
    .el-input-number {
      width: 104px;
      height: 32px;
      .el-input-number__decrease, .el-input-number__increase {
        width: 26px;
        line-height: 30px;
        font-size: 14px;
      }
      .el-input-number__decrease {
        right: 26px;
      }
      .el-input__inner {
        padding-right: 60px;
        text-align: center;
      }
    }
    .evaluation-point {
      text-align: left;
      padding: 5px 30px;
    }
    .bs-handle-button {
      box-sizing: border-box;
      width: 92px;
      height: 34px;
      line-height: 34px;
      padding: 0;
      &:first-child {
        margin-left: 0;
      }
    }
    .btn-row {
      margin: 30px 0 22px;
      text-align: center;
    }
  }
</style>
