<template>
  <div class="add-tmpl-step step-4">
    <div class="set-level">
      <h4 class="header">
        等级设定
        <span class="tip">
          <i class="icon-form-tip"></i>
          注：为自评和他评得分进行等级划分。分值总区间为0-100，各级分值区间不能重合。
        </span>
      </h4>
      <div class="content clearfix">
        <div class="option fl">
          <label class="label">等级</label>
          <!--<el-option v-for="(item, key) in levelOptions" :label="item.name" :value="key" :key="key"></el-option>-->
          <ul class="lists">
            <li v-for="(item, index) in levelOptions" :key="index" class="list-item">{{item.name}}</li>
          </ul>
        </div>
        <div class="set-value fl">
          <label class="label">分值区间</label>
          <ul class="input-group is-required">
            <li v-for="(item, index) in levelOptions" :key="index" class="list-item">
              <el-input-number v-model="item.startValue" :min="0" :max="100" :disabled="isReadOnly"/>
              <span class="line">—</span>
              <el-input-number v-model="item.endValue" :min="0" :max="100" :disabled="isReadOnly"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="set-evaluation">
      <h4 class="header">
        终评设定
        <span class="tip">
          <i class="icon-form-tip"></i>
          注：根据自评、他评得分进行终评认定。设置自评及他评的权重，权重之和必须等于100%。
        </span>
      </h4>
      <div class="content clearfix">
        <div class="option fl">
          <label class="label">评价</label>
          <ul class="lists">
            <li v-for="(item, i) in evaluationTypeOptions" :key="i" class="list-item">{{item.name}}</li>
          </ul>
        </div>
        <div class="set-value fl">
          <label class="label">权重%</label>
          <ul class="input-group is-required">
            <li v-for="(item, i) in evaluationTypeOptions" :key="i" class="list-item">
              <el-input-number v-model="item.val" :min="0" :max="validScore - evaluationTypeOptions[1 - i].val" :disabled="isReadOnly"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <button @click.prevent="lastStep" class="bs-handle-button i-form-button is-plain" type="button">上一步</button>
      <button v-if="/\/tmpl\/(edit|add)$/.test($route.path)" @click.prevent="submit" class="bs-handle-button i-form-button">保存
      </button>
      <button @click.prevent="$router.go(-1)" class="bs-handle-button i-form-button is-plain">取消</button>
    </div>
  </div>
</template>

<script>
  import { addTmpl, editTmpl } from '@/service/admin_evaluation.js'

  export default {
    name: 'stepFour', // 添加评价模板=>等级及终评设定

    inheritAttrs: false,

    data () {
      return {
        evaluationTypeOptions: [ // 评价数据
          {name: '自评', val: ''},
          {name: '他评', val: ''},
        ],
        levelOptions: [ // 等级数据
          {name: 'A', startValue: '', endValue: ''},
          {name: 'B', startValue: '', endValue: ''},
          {name: 'C', startValue: '', endValue: ''},
          {name: 'D', startValue: '', endValue: ''},
        ],
        validScore: 100,
      }
    },

    props: {
      editData: {
        type: Object,
        default () {
          return {}
        }
      },
      stepOneData: {
        type: Object,
        default () {
          return {}
        }
      },
      stepThreeData: {
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

    created () {
      let {id} = this.$route.query
      this.id = id
      this.isEditing = !!id
      this.isEditing && this.initData()
    },

    methods: {
      checkEmptyVal () { // 检查是否有空值
        const arrChecked = [...this.levelOptions, ...this.evaluationTypeOptions]
        const hasEmptyVal = arrChecked.some(item => item.startValue === '' || item.endValue === '' || item.val === '')

        if (hasEmptyVal) {
          this.$message('您还有未填写的内容，请检查')
          return true
        }

        return false
      },
      checkEvaluationTotal () { // 检查权重是否等于100%
        const [self, other] = this.evaluationTypeOptions
        const total = +other.val + +self.val

        if (total !== this.validScore) {
          this.$message('您设置的自评及他评的权重之和不等于100，请调整')
          return true
        }

        return false
      },
      initData () { // 初始数据
        let {egList, hisRatWeight, selfRatWeight} = this.editData
        let [self, other] = this.evaluationTypeOptions
        self.val = selfRatWeight
        other.val = hisRatWeight
        this.levelOptions = egList.length && egList.map(item => {
          let {name, startValue = '', endValue = ''} = item
          return {
            name,
            startValue,
            endValue
          }
        })
      },
      lastStep () { // 上一步
        this.$emit('on-change-step', {step: 3, action: 'back'})
      },
      maxLevelVal (idx) {
        return idx === 0 ? this.validScore : (this.levelOptions[idx - 1].startValue || this.validScore) - 1
      },
      submit () {
        let handler = this.isEditing && editTmpl || addTmpl
        let label = this.isEditing && '修改' || '新增'
        let id = this.isEditing && this.id || undefined
        let [self, other] = this.evaluationTypeOptions

        let hasEmptyVal = this.checkEmptyVal()
        if (hasEmptyVal) return

        let isInValidTotal = this.checkEvaluationTotal()
        if (isInValidTotal) return

        handler({
          ...this.stepOneData,
          id,
          eisList: this.stepThreeData,
          egList: this.levelOptions,
          hisRatWeight: other.val,
          selfRatWeight: self.val,
        }).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: `成功${label}模板`, duration: 1000})
            this.$router.push('/cqe/tmpl')
            return
          }
          this.$message.error(res.data.msg || `${label}模板失败，请重试`)
        }, () => {
          this.$message.error(`${label}模板失败，请重试`)
        })
      },
    }
  }
</script>
<style lang="scss">
  /*.add-tmpl-step.step-4 .content {
    .el-input, .el-select {
      display: inline-block;
      width: 104px;
      font-size: 14px;
    }
    .el-input__inner {
      text-align: center;
    }
  }*/
</style>
<style lang="scss" scoped>
  .step-4 {
    .set-level {
      margin-bottom: 40px;
    }
    .header {
      font-size: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #c9c9c9;
      .tip {
        margin-left: 4px;
        font-size: 12px;
        color: #999;
      }
      .icon-form-tip {
        vertical-align: text-bottom;
        font-size: 16px;
      }
    }
    .content {
      padding-top: 24px;
      .option {
        line-height: 34px;
        margin-right: 60px;
        font-size: 0;
      }
      .set-value {
        line-height: 34px;
        font-size: 0;
      }
      .lists {
        display: inline-block;
        .list-item {
          box-sizing: border-box;
          width: 104px;
          height: 32px;
          vertical-align: top;
          line-height: 30px;
          border: 1px solid #dfdfdf;
          color: #3e3e3e;
          font-size: 14px;
          text-align: center;
        }
        .list-item + .list-item {
          margin-top: 10px;
        }
      }
      .input-group {
        display: inline-block;
        .list-item {
          box-sizing: border-box;
          height: 32px;
        }
        .list-item + .list-item {
          margin-top: 10px;
        }
      }
      .label {
        box-sizing: border-box;
        display: inline-block;
        width: 72px;
        vertical-align: top;
        font-size: 14px;
        padding-right: 16px;
        text-align: right;
      }
      .line {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: top;
        margin: 0 3px;
        font-size: 14px;
      }
      .input-group.is-required .list-item:before {
        display: inline-block;
        vertical-align: top;
        line-height: 32px;
        content: '*';
        color: #ff4949;
        margin-right: 4px;
        font-size: 12px;
      }
    }
  }
</style>
