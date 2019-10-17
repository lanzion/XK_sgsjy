<template>
  <div class="my-evaluation" style="padding-bottom: 26px;">
    <el-table :data="items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
      <!--<el-table-column type="selection" width="40"/>-->
      <el-table-column prop="pname" label="一级指标" width="220"/>
      <el-table-column prop="name" label="二级指标"/>
      <el-table-column prop="evaluationPoint" label="测评点" width="400">
        <template scope="scope">
          <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="自评"/>
    </el-table>
    <div class="el-table data-table back-stage-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;border-top: 0;">
      <div class="el-table__body-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
          <tbody>
          <tr class="">
            <td class="table-label">
              <div class="cell">自评等级</div>
            </td>
            <td class="">
              <div class="cell table-content red">A</div>
            </td>
          </tr>
          <tr class="">
            <td class="table-label">
              <div class="cell">自我评价</div>
            </td>
            <td class="">
              <div class="cell table-content">学习态度好，能力突出，能遵守纪律，认真完成所交代的任务，能够很好的和同学进行协助，积极参加活动</div>
            </td>
          </tr>
          <tr class="">
            <td class="table-label">
              <div class="cell">学习/（成果）实践</div>
            </td>
            <td class="">
              <div class="cell table-content"><a class="blue" href="javascript:;">DIY纽扣制作设计</a></div>
            </td>
          </tr>
          <tr class="">
            <td class="table-label">
              <div class="cell">附件</div>
            </td>
            <td class="">
              <div class="cell table-content"><a class="blue" href="javascript:;" down>注意事项.doc</a></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  import { requestLevelOneQuota, deleteQuota } from '@/service/admin_evaluation.js'

  export default {
    name: 'myEvaluation', // 评价记录详情-->自评
    data () {
      return {}
    },
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    created () {

    },
    methods: {
      handleEvaluationPoint (txt) {
        return !txt ? '' : txt.replace(/\n/g, '</br>')
      },
    }
  }
</script>
