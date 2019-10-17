<template>
  <el-dialog :visible.sync="dialog.isVisible" title="记笔记" class="add-note__wrapper">
    <div class="add-note__content">
      <el-form ref="addNote" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="课时" prop="sectionId">
          <el-col :span="20">
            <el-select v-model="form.sectionId" placeholder="请选择课时" style="width:100%;">
              <el-option v-for="item in sections" :key="item.code" :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="笔记" prop="content">
          <el-col :span="20">
            <el-input v-model="form.content" :maxlength="100" type="textarea" placeholder="请输入笔记内容，不超过100字"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      
      <div class="btn-row">
        <a @click="dialog.isVisible = false" href="javascript:;" class="psn-cancel-btn">取消</a>
        <a @click="submit" href="javascript:;" class="psn-confirm-btn">确定</a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { addNote, editNote } from '@/service/course.js'

export default {
    name: 'addNote', // 新增笔记弹窗
    data() {
        return {
            form: { // 需要提交的数据
                sectionId: '',
                content: ''
            },
            rules: {
                sectionId: [
                    { required: true, message: '请选择课时', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入笔记', trigger: 'change blur' }
                ]
            }
        }
    },
    props: {
        curEditingNote: {
            type: Object,
            default() {
                return {}
            }
        },
        dialog: {
            type: Object,
            default() {
                return {}
            }
        },
        handleRequest: Function,
        sections: Array
    },
    created() {
        this.initData()
    },
    methods: {
        initData() { // 初始添加笔记弹窗数据
            if (this.curEditingNote.type === 'edit') { // 编辑笔记
                const { sectionId, content } = this.curEditingNote
                this.form.sectionId = sectionId
                this.form.content = content
            }
        },
        submit() { // 添加/修改笔记
            this.$refs.addNote.validate((valid) => {
                if (valid) { // 验证通过
                    let handle = addNote
                    let _label = '添加'
                    let id = ''
                    const { sectionId, content } = this.form
                    const item = this.sections.find(i => i.id === sectionId)
                    const chapterId = item && item.chapterId || ''
      
                    if (this.curEditingNote.type === 'edit') {
                        handle = editNote
                        _label = '修改'
                        id = this.curEditingNote.id
                    }
      
                    handle({
                        courseId: this.$route.query.id || '',
                        content,
                        chapterId,
                        id,
                        sectionId
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message(`成功${_label}笔记`)
                            this.handleRequest()
                            this.dialog.isVisible = false
                            return
                        }
                        this.$message.error(res.data.msg || `${_label}笔记失败，请稍后重试`)
                    }, () => {
                        this.$message.error(`${_label}笔记失败，请稍后重试`)
                    })
                }
            })
        }
    }
}
</script>

<style lang='scss'>
  .add-note__wrapper .el-dialog {
    box-sizing: border-box;
    width: 476px;
    height: 320px;
    .el-dialog__body {
      padding: 0;
    }
  }
</style>
<style lang='scss' scoped>
  @import '~@/assets/css/scss/vars.scss';
  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .add-note__wrapper .btn-row {
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
  .add-note__wrapper {
    .add-note__content {
      padding-top: 40px;
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

