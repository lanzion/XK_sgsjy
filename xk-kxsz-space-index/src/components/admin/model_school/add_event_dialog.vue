<template>
  <el-dialog :visible.sync="dialog.isVisible" :title="`${label}大事件`" class="add-event dialog-wrapper">
    <div class="dialog-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="时间" prop="eventDate">
          <el-col :span="20">
            <el-date-picker
              v-model="form.eventDate"
              :editable="false"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-col :span="20">
            <el-input v-model="form.content" placeholder="请输入内容" :maxlength="100" type="textarea" resize="none"/>
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
  import { addEvent, editEvent } from '@/service/model_school.js'

  export default {
    name: 'eventDialog', // 创客事件弹窗

    data () {
      return {
        curEditingId: '',

        isEditing: false,

        form: {
          content: '',
          eventDate: '',
        },

        label: '新增',

        rules: {
          eventDate: [
            {required: true, type: 'object', message: '请选择时间', trigger: 'change'}
          ],

          content: [
            {required: true, message: '请输入内容', trigger: 'change'}
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
    },

    created () {
      this.initData()
    },

    methods: {
      // 初始弹窗数据
      initData () {
        const {action, id, content, eventDate} = this.curEditingItem

        // 编辑
        if (action === 'edit') {
          this.form = {content, eventDate: new Date(eventDate)}
          this.isEditing = true
          this.curEditingId = id
          this.label = '修改'
        }
      },

      // 添加/修改
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            const {label, isEditing, curEditingId} = this
            const handler = isEditing && editEvent || addEvent
            const id = isEditing ? curEditingId : undefined
            const errMsg = `${label}事件失败，请稍后重试`

            handler({
              id,
              ...this.form,
            }).then(res => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message({type: 'success', message: `成功${label}事件`, duration: 1000})
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
  .add-event .el-dialog {
    box-sizing: border-box;
    width: 476px;
    height: 330px;
    .el-dialog__body {
      padding: 0;
    }
    .el-date-editor {
      width: 330px;
    }
    .el-textarea__inner {
      width: 348px;
      height: 110px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/asset/scss/vars.scss";

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
      padding-top: 20px;
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

