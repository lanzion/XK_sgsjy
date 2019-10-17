<template>
  <el-dialog :visible.sync="dialog.isVisible" :title="`${label}成果`" class="add-model-achievement dialog-wrapper">
    <div class="dialog-content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name" placeholder="请输入标题，最多20字" :maxlength="20"/>
          </el-col>
        </el-form-item>
        <el-form-item label="所属成果" prop="type">
          <el-col :span="20">
            <el-select v-model="form.type" placeholder="请选择所属成果" class="select">
              <el-option v-for="(item, i) in categoryList" :label="item.name" :value="item.id" :key="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-col :span="22">
            <el-input v-model="form.content" v-show="false"></el-input>
            <div id="editor-trigger" style="height: 220px"></div>
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
  import { editor } from '@/mixin/wangEditor.js'
  import { editAchievement, addAchievement } from '@/service/model_school.js'

  export default {
    name: 'achievementDialog', // 建设成果弹窗
    mixins: [editor],
    data () {
      return {
        curEditingId: '',

        isEditing: false,

        form: {
          content: '',
          name: '',
          type: '',
        },

        label: '新增',

        rules: {
          name: [
            {required: true, message: '请输入成果名称', trigger: 'change'}
          ],

          type: [
            {required: true, message: '请选择成果', trigger: 'change'}
          ],

          content: [
            {required: true, message: '请输入成果内容', trigger: 'change', type: 'string'}
          ],
        },
      }
    },

    props: {
      categoryList: {
        type: Array,
        default: () => []
      },

      curEditingItem: {
        type: Object,
        default: () => {}
      },

      dialog: {
        type: Object,
        default: () => {}
      },

      handleRequest: Function,

      schoolId: String,
    },

    created () {
      this.initData()
      this.$nextTick(this.initEdit)
    },

    methods: {
      // 初始弹窗数据
      initData () {
        const {action, id, content, type, name = '',} = this.curEditingItem

        // 编辑
        if (action === 'edit') {
          this.form = {content, name, type}
          this.isEditing = true
          this.curEditingId = id
          this.label = '修改'
        }
      },

      initEdit() {
        const {form: {content}, isEditing} = this
        let self = this
        this.initEditor()
        this.editor.onchange = function () {
          self.form.content = this.$txt.html();
        }
        isEditing && this.editor.$txt.html(content)
      },

      // 添加/修改
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            const {label, isEditing, schoolId, curEditingId} = this
            const handler = isEditing && editAchievement || addAchievement
            const id = isEditing ? curEditingId : undefined
            const errMsg = `${label}成果失败，请稍后重试`
            const maxContentLen = 1000

            if (this.form.content.length >= maxContentLen) {
              this.$message('特色内容过多，请调整后再提交。。')
              return false
            }

            handler({
              id,
              schoolId,
              ...this.form,
            }).then(res => {
              if (res.status === 200 && res.data.code === 200) {
                this.$message({type: 'success', message: `成功${label}成果`, duration: 1000})
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
  .add-model-achievement .el-dialog {
    box-sizing: border-box;
    width: 660px;
    height: 500px;
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

