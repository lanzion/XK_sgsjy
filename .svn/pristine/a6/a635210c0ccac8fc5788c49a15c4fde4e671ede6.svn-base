<template>
  <el-dialog :visible.sync="dialog.isVisible" title="立即参加" class="register-activity__wrapper">
    <div class="register-activity__content">
      <div class="tips">还可以输入<i>{{countLeft}}</i>字</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            @change="handleChange"
            :autosize="{minRows: 3, maxRows: 4}"
            :maxlength='100'
            type="textarea"
            placeholder="我来说点...">
          </el-input>
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
  import {activityApply} from '@/service/activity.js'

  export default {
    name: 'registerActivity', // 参加活动弹窗
    data () {
      return {
        countLeft: 100,
        form: { // 需要提交的数据
          content: ''
        },
        total: 100,
        rules: {
          content: [
            {required: true, message: '请输入内容', trigger: 'change blur'}
          ]
        }
      }
    },
    props: {
      dialog: {
        type: Object,
        default () {
          return {isVisible: false}
        }
      },
      handleRequest: Function,
      id: String
    },
    created () {
    },
    methods: {
      handleChange () {
        this.countLeft = this.total - this.form.content.length
      },
      submit () { // 参加活动
        this.$refs.form.validate(valid => {
          if (valid) { // 验证通过
            const errMsg = '报名活动失败，请稍后重试'
            activityApply({
              activityId: this.id,
              applyContent: this.form.content
            }).then(res => {
              if (res.data.code === 200) {
                this.$message('成功申请该活动')
                this.handleRequest()
                this.dialog.isVisible = false
                return
              }
              this.$message.error(res.data.msg || errMsg)
            }).catch(() => {})
          }
        })
      }
    }
  }
</script>

<style lang='scss'>
  .register-activity__wrapper .el-dialog {
    /* position: relative; */
    box-sizing: border-box;
    width: 476px;
    height: 280px;
    .el-dialog__body {
      padding: 0;
    }
  }
</style>
<style lang='scss' scoped>
  @import '~@/asset/scss/vars.scss';

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .register-activity__wrapper .btn-row {
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

  .register-activity__wrapper {
    .register-activity__content {
      padding: 18px;
    }
    .tips {
      margin-bottom: 4px;
      text-align: right;
      font-size: 12px;
      color: #999;
      i {
        font-size: 16px;
      }
    }
    .btn-row {
      position: absolute;
      right: 16px;
      bottom: 20px;
      margin-bottom: 0;
      text-align: right;
      font-size: 0;
      .btn {
        display: inline-block;
        box-sizing: border-box;
        width: 62px;
        height: 26px;
        line-height: 24px;
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

