<template>
  <el-dialog :visible.sync="dialog.isVisible" title="上传资源" class="upload-resource__wrapper">
    <div class="upload-resource__content">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="选择资源" prop="selected">
          <el-select v-model="form.selected" :filterable="true" :clearable="true" no-data-text="您的资源库暂无资源，请先上传"
                     popper-class="upload-resource__dropdown" placeholder="请选择资源">
            <el-option v-for="(item, i) in resourceList" :key="i" :label="item.resourceName"
                       :value="item._i"></el-option>
          </el-select>
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
  import { beforeUploadFile } from '@/js/uploadFile.js'
  import { uploadResource } from '@/service/course.js'
  import { requestResourceList } from '@/service/resource.js'

  export default {
    name: 'uploadResource', // 上传资源弹窗
    data () {
      return {
        resourceList: [],
        form: {
          selected: '',
        },
        rules: {
          selected: [
            {required: true, message: '请选择需要共享的资源', trigger: 'change'}
          ]
        }
      }
    },
    props: {
      dialog: {
        type: Object,
        default () {
          return {}
        }
      },
      handleRequest: Function
    },
    created () {
      this.requestList()
    },
    methods: {
      async requestList () { // 获取学员列表
        let res = await requestResourceList({auditStatusTeaOrStu: 1}, {pageSize: 999, pageNum: 1})

        if (res.data.code === 200) {
          let _entity = res.data.entity
          this.resourceList = (_entity.resultData || []).map((item, i) => ({
            resourceId: item.fileId,
            resourceName: item.name,
            _i: i + ''
          }))
        }
      },
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) { // 验证通过
            const errMsg = '上传资源失败，请稍后重试'
            const {resourceId, resourceName} = this.resourceList[this.form.selected] || {}
            uploadResource({
              resourceId,
              resourceName,
              courseId: this.$route.query.id || '',
            }).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '成功上传资源',
                  type: 'success'
                })
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
      },
    }
  }
</script>

<style lang="scss">
  .upload-resource__wrapper .el-dialog {
    box-sizing: border-box;
    width: 476px;
    height: 320px;
    .el-dialog__body {
      padding: 0;
    }
    .el-input__inner {
      box-sizing: border-box;
      width: 200px;
      padding-right: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;

    }
  }
  .upload-resource__dropdown {
    max-width: 226px;
    .el-select-dropdown__empty, .el-select-dropdown__item {
      font-size: 12px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/asset/scss/vars.scss";

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .upload-resource__wrapper .btn-row {
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

  .upload-resource__wrapper {
    .upload-resource__content {
      padding-top: 36px;
      .row {
        margin-bottom: 10px;
      }
      .label {
        display: inline-block;
        height: 38px;
        line-height: 38px;
        margin-right: 12px;
      }
      .cover-uploader {
        display: inline-block;
      }
      .tip {
        font-size: 12px;
        color: #999;
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

