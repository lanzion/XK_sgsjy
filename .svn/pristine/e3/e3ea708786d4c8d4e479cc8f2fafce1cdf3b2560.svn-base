<template>
  <el-dialog :visible.sync="dialog.isVisible" :title="`${label}分类`" class="model-achievement-category dialog-wrapper">
    <div class="dialog-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="分类名称" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" placeholder="请输入分类名称，最多10字" :maxlength="10"/>
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
  import { editAchievementCategory, addAchievementCategory } from '@/service/model_school.js'

  export default {
    name: 'categoryDialog', // 建设成果分类弹窗

    data () {
      return {
        curEditingId: '',

        isEditing: false,

        form: {
          name: ''
        },

        label: '新增',

        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'change'}
          ],
        },
      }
    },

    props: {
      curEditingItem: {
        type: Object,
        default: () => {}
      },

      dialog: {
        type: Object,
        default: () => {}
      },

      handleRequest: Function,

      schoolId: String
    },

    created () {
      this.initData()
    },

    methods: {
      // 初始弹窗数据
      initData () {
        const {name = '', action, id} = this.curEditingItem

        // 编辑
        if (action === 'edit') {
          this.form.name = name
          this.isEditing = true
          this.curEditingId = id
          this.label = '修改'
        }
      },

      // 添加/修改
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            const {label, isEditing, schoolId, curEditingId} = this
            const handler = isEditing && editAchievementCategory || addAchievementCategory
            const id = isEditing ? curEditingId : undefined
            const errMsg = `${label}分类失败，请稍后重试`

            handler({
              id,
              schoolId,
              ...this.form,
            }).then(res => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message({type: 'success', message: `成功${label}分类`, duration: 1000})
                this.handleRequest()
                this.dialog.isVisible = false
                return
              }

              this.$message.error(res.data.msg || errMsg)
            }).catch(() => {
              this.$message.error(errMsg)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .model-achievement-category .el-dialog {
    box-sizing: border-box;
    width: 476px;
    height: 292px;
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner {
      width: 330px;
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
      padding-top: 40px;
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

