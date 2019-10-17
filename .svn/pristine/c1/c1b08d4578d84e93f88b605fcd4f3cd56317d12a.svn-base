<template>
  <el-dialog :visible.sync="dialog.isVisible" title="添加" class="add-quota dialog-wrapper">
    <div class="dialog-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item v-if="!isLevelOne" label="一级指标" prop="pId">
          <el-col :span="20">
            <el-select v-model="form.pId" placeholder="请选择一级指标" class="select">
              <el-option v-for="(item, i) in propLevelOneList" :label="item.name" :value="item.id" :key="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item :label="isLevelOne && '一级指标' || '二级指标'" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" :maxlength="20"
                      :placeholder="`请输入${isLevelOne && '一级' || '二级'}指标，最多20字`"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="isLevelOne && '指标说明' || '测评点'" prop="evaluationPoint">
          <el-col :span="20">
            <el-input v-model="form.evaluationPoint" :placeholder="`请输入${isLevelOne && '指标说明' || '测评点'}`"
                      :maxlength="isLevelOne && 50 || 200" type="textarea"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <div class="btn-row">
        <a @click="dialog.isVisible = false" href="javascript:;" class="btn btn-cancel">取消</a>
        <a @click="submit" href="javascript:;" class="btn btn-ok">确定</a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { requestQuotaLevelOne, addQuota, editQuota } from '@/service/admin_evaluation.js'

  export default {
    name: 'addQuota', // 设置日期弹窗
    data () {
      return {
        curEditingId: '',
        isEditing: false,
        items: [],
        form: { // 需要提交的数据
          evaluationPoint: '',
          pId: undefined,
          name: ''
        },
        rules: {
          pId: [
            {required: true, message: '请选择一级指标', trigger: 'change'}
          ],
          name: [
            {required: true, message: this.isLevelOne && '请输入一级指标' || '请输入二级指标', trigger: 'change'}
          ],
          evaluationPoint: [
            {required: true, message: this.isLevelOne && '请输入指标说明' || ' 请输入测评点', trigger: 'change'}
          ]
        },
      }
    },
    props: {
      curEditingItem: {
        type: Object,
        default () {
          return {}
        }
      },
      dialog: {
        type: Object,
        default () {
          return {}
        }
      },
      handleRequest: Function,
      isLevelOne: {
        type: Boolean,
        default: false
      },
      propLevelOneList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () { // 初始弹窗数据
        let {name = '', evaluationPoint = '', pId = '', type, id} = this.curEditingItem
        if (type === 'edit') { // 编辑
          this.form.name = name
          this.form.evaluationPoint = evaluationPoint
          this.curEditingId = id
          this.isEditing = true
          !this.isLevelOne && (this.form.pId = pId)
        }
      },
      submit () { // 添加/修改
        this.$refs.form.validate(valid => {
          if (valid) { // 验证通过
            let handler = this.isEditing && editQuota || addQuota
            let _label = this.isEditing && '修改' || '添加'
            let id = this.isEditing && this.curEditingId || undefined

            handler({
              ...this.form,
              id
            }).then(res => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message(`成功${_label}指标`)
                this.handleRequest()
                this.dialog.isVisible = false
                return
              }
              this.$message.error(res.data.msg || `${_label}指标失败，请稍后重试`)
            }, () => {
              this.$message.error(`${_label}指标失败，请稍后重试`)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .add-quota .el-dialog {
    box-sizing: border-box;
    width: 620px;
    height: 450px;
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner, .el-textarea__inner {
      width: 330px;
    }
    .el-textarea__inner {
      height: 100px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/assets/css/scss/vars.scss";

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .dialog-wrapper .btn-row {
        .btn-ok {
          background-color: $color-value;
        }
        .btn-cancel {
          border: 1px solid $color-value;
          color: $color-value;
        }
      }
    }
  }

  .dialog-wrapper {
    .dialog-content {
      padding-top: 30px;
    }
    .btn-row {
      position: absolute;
      right: 20px;
      bottom: 20px;
      margin-bottom: 0;
      text-align: right;
      font-size: 0;
      .btn {
        display: inline-block;
        box-sizing: border-box;
        width: 62px;
        height: 28px;
        line-height: 26px;
        vertical-align: top;
        text-align: center;
        font-size: 12px;
      }
      .btn-cancel {
        margin-right: 10px;
      }
      .btn-ok {
        color: #fff;
      }
    }
  }
</style>

