<template>
  <div class="add-tmpl-step">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="学年学期" prop="termId">
        <el-col :span="8">
          <el-select v-model="form.termId" placeholder="选择学期" :disabled="isReadOnly">
            <el-option v-for="item in termList" :key="item.id" :label="item.schoolYear" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="模板名称" prop="name">
        <el-col :span="8">
          <el-input v-model.trim="form.name" placeholder="请输入模板名称" :maxlength="20" :disabled="isReadOnly"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="评价类型" prop="target">
        <el-col :span="8">
          <el-select v-model="form.target" placeholder="请选择评价类型" :disabled="isReadOnly">
            <el-option v-for="item in evaluationTypes" :label="item.name" :value="item.val" :key="item.val"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="模板说明" prop="remark">
        <el-col :span="20">
          <el-input v-model.trim="form.remark" placeholder="请输入模板说明" type="textarea" size="large" :disabled="isReadOnly"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <button @click.prevent="nextStep" class="bs-handle-button i-form-button" type="button">下一步</button>
        <button @click.prevent="$router.go(-1)" class="bs-handle-button i-form-button is-plain">取消</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { queryTmplDetail, requestTermList } from '@/service/admin_evaluation.js'

  export default {
    name: 'stepOne', // 添加评价模板=>基本信息
    inheritAttrs: false,
    data () {
      return {
        evaluationTypes: [
          {name: '学生课程学习', val: 1},
          {name: '学生项目学习', val: 2},
          {name: '学生实训学习', val: 5},
          {name: '学生作品', val: 3},
          {name: '学生实践', val: 4},
        ],
        form: {
          name: '', // 模板名称
          remark: '', // 模板说明
          termId: '', // 学年学期ID
          target: '', // 评论类型ID
        },
        rules: {
          name: [
            {required: true, message: '请输入模板名称', trigger: 'blur change'}
          ],
          remark: [
            {required: true, message: '请输入模板说明', trigger: 'change'}
          ],
          termId: [
            {required: true, message: '请选择学年学期', trigger: 'change'}
          ],
          target: [
            {type: 'number', required: true, message: '请选择评价类型', trigger: 'change'}
          ],
        },
        termList: []
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
      this.requestTermList()
    },
    methods: {
      async requestTermList () { // 查询学年学期
        let res = await requestTermList()
        if (res.status === 200 && res.data.code === 200) {
          let appendInfo = res.data.appendInfo || {}
          this.termList = appendInfo.termList || []
        }
      },
      initData () {
        let {name, remark, termId, target} = this.editData
        this.form.name = name
        this.form.remark = remark
        this.form.termId = termId
        this.form.target = target
      },
      nextStep () { // 跳转下一步
        this.$refs.form.validate(valid => {
          if (valid) { // 验证通过，跳转下一步
            this.$emit('on-change-step', {step: 2, stepData: this.form})
          }
        })
      },
    },
    watch: {
      editData: 'initData'
    }
  }
</script>
