<template>
  <el-dialog :visible.sync="dialog.isVisible" title="评价范围" class="select-range__wrapper">
    <div class="select-range__content">
      <el-radio-group v-model="range">
        <el-radio v-for="item in options" :label="item.val" :key="item.val">
          {{item.name}}
        </el-radio>
      </el-radio-group>

      <div class="btn-row">
        <a @click="dialog.isVisible = false" href="javascript:;" class="psn-cancel-btn">取消</a>
        <a @click="submit" href="javascript:;" class="psn-confirm-btn">确定</a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { setOpenRange } from '@/service/my.js'

export default {
    name: 'setRange', // 设置公开范围弹窗
    data() {
        return {
            range: '',
            options: [
                { name: '仅本人可评', val: '1' },
                { name: '本班可评', val: '2' },
                { name: '本校可评', val: '3' },
                { name: '本区县可评', val: '4' },
                { name: '本市可评', val: '5' },
                { name: '本省可评', val: '6' },
                { name: '所有可评', val: '7' },
            ]
        }
    },
    props: {
        api: {
            type: String,
            default: '/maker/study/updateOpenRange'
        },
        curRange: {
            type: String,
            default: ''
        },
        dialog: {
            type: Object,
            default() {
                return {}
            }
        },
        handleRequest: Function,
        id: {
            type: String,
            default: ''
        },
    },
    created() {
        this.range = this.curRange
    },
    methods: {
        submit() { // 提交
            setOpenRange(this.api, { id: this.id, openRange: this.range }).then((res) => {
                if (res.status === 200 && res.data.code === 200) {
                    this.$message({ type: 'success', message: '成功设置公开范围', duration: 1500 })
                    this.handleRequest()
                    this.dialog.isVisible = false
                    return
                }
                this.$message.error(res.data.msg || '设置公开范围失败，请重试')
            }, () => {
                this.$message.error('设置公开范围失败，请重试')
            })
        }
    }
}
</script>

<style lang='scss'>
  .select-range__wrapper .el-dialog {
    /* position: relative; */
    box-sizing: border-box;
    width: 476px;
    height: 416px;
    .el-dialog__body {
      padding: 0;
    }
    .el-radio-group .el-radio {
      display: block;
      margin: 0 0 12px 0;
    }
  }
</style>
<style lang='scss' scoped>
  @import '~@/assets/css/scss/vars.scss';

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .select-range__wrapper .btn-row {
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

  .select-range__wrapper {
    .select-range__content {
      padding-top: 35px;
      padding-left: 85px;
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

