<template>
  <div class="add-tmpl-step">
    <el-form :inline="true" class="option-box clearfix">
      <el-form-item label="一级指标">
        <el-select v-model="pId" @change="requestList" placeholder="请选择" class="select" style="width: 330px;">
          <el-option v-for="(item, i) in levelOneList" :label="item.name" :value="item.id" :key="i"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
      <el-table-column prop="name" label="二级指标" show-overflow-tooltip/>
      <el-table-column prop="evaluationPoint" label="测评点" show-overflow-tooltip width="500">
        <template scope="scope">
          <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
        </template>
      </el-table-column>
      <el-table-column label="选择">
        <template scope="scope">
          <el-checkbox v-model="scope.row._checked" :disabled="isReadOnly" />
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-row">
      <button @click.prevent="lastStep" class="bs-handle-button i-form-button is-plain" type="button">上一步</button>
      <button @click.prevent="nextStep" class="bs-handle-button i-form-button">下一步</button>
      <button @click.prevent="$router.go(-1)" class="bs-handle-button i-form-button is-plain">取消</button>
    </div>
  </div>
</template>

<script>
  import { requestPlainLevelOneQuota, requestLevelTwoQuota } from '@/service/admin_evaluation.js'

  export default {
    name: 'stepTwo', // 添加评价模板=>评价指标选择
    inheritAttrs: false,
    data () {
      return {
        items: [], // 二级指标数据
        levelOneList: [], // 一级指标数据
        pageParam: {
          pageNum: 1,
          pageSize: 999
        },
        pId: undefined,
      }
    },
    props: {
      editData: {
        type: Object,
        default () {
          return {}
        }
      },
      isReadOnly: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    created () {
      this.requestList()
      this.requestLevelOneList()
    },
    methods: {
      async requestLevelOneList () { // 获取一级指标列表
        let res = await requestPlainLevelOneQuota()
        if (res.status === 200 && res.data.code === 200) {
          let entity = res.data.appendInfo || {}
          this.levelOneList = [{name: '全部', id: null}].concat(entity.list || [])
        }
      },
      async requestList () { // 获取二级指标列表
        let res = await requestLevelTwoQuota({...this.pageParam, pId: this.pId})
        if (res.status === 200 && res.data.code === 200) {
          let entity = res.data.entity || {}
          let arr = entity.resultData || []
          let isEditing = !!this.editData.id // 修改模板
          let selectedArr = this.editData.eisList || [] // 修改模板勾选的指标数据
          let maxLength = selectedArr.length
          let count = 0
          this.items = arr.map(item => {
            let {evaluationPoint, id, name, pId, pName} = item
            // 设置选中状态与分值
            let _checked = false
            let score = ''
            if (isEditing && count < maxLength) {
              selectedArr.find(selected => {
                if (selected.evaluationIndexId === id) {
                  count++
                  score = selected.score
                  _checked = true
                  return true
                }
              })
            }
            return {
              evaluationPoint,
              evaluationIndexId: id,
              name,
              pId,
              pName,
              score,
              _checked,
            }
          })
        }
      },
      handleEvaluationPoint (txt) {
        return !txt ? '' : txt.replace(/\n/g, '</br>')
      },
      lastStep () { // 上一步
        this.$emit('on-change-step', {step: 1, action: 'back'})
      },
      nextStep () { // 跳转下一步
        let stepData = this.items.filter(item => item._checked)
        let minLength = 0
        if (stepData.length === minLength) {
          this.$message('您还没有选择评价指标，请先选择')
          return
        }
        this.$emit('on-change-step', {step: 3, stepData})
      },
    }
  }
</script>
