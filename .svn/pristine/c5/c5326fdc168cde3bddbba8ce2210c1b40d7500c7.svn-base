<template>
  <el-dialog :visible.sync="dialog.isVisible" :title="title" class="achievement-dialog__wrapper" :lock-scroll="true">
    <div class="achievement-dialog__content">
      <div class="main clearfix">
        <span class="label fl">{{title}}：</span>
        <div class="content-right fl">
          <div class="tag-wrapper">
            <el-tag v-for="(tag, i) in curAchievementArr" :key="i" :closable="tag.id !== 'custom'"
                    :close-transition="false" @close="deleteItem(tag.id)"
            >
              {{tag.worksName}}
            </el-tag>
            <a @click="worksWrapperIsVisible = !worksWrapperIsVisible" class="btn" href="javascript:;"
               title="关联作品">+ 关联</a>
          </div>
          <transition name="move-down">
            <div v-show="worksWrapperIsVisible" class="select-works">
              <div class="search-wrapper">
                <el-input v-model="filterText" icon="search" :maxlength="10" class="search-input" placeholder="搜索关键字">
                </el-input>
              </div>
              <el-tree
                :data="filteredWorks"
                :filter-node-method="filterNode"
                :props="defaultProps"
                default-expand-all
                show-checkbox
                ref="worksTree"
                class="filter-tree">
              </el-tree>
            </div>
          </transition>
        </div>
      </div>
      <div class="btn-row">
        <a @click="dialog.isVisible = false" href="javascript:;" class="psn-cancel-btn">取消</a>
        <a @click="submit" href="javascript:;" class="psn-confirm-btn">确定</a>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { addStudyResult, deleteStudyResult, addPracticeResult, deletePracticeResult } from '@/service/my.js'
import { requestBackendWorksList } from '@/service/works.js'

export default {
    name: 'achievementDialog', // 实践/学习成果弹窗
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            filterText: '', // 过虑作品v-model
            works: [], // 作品列表
            worksWrapperIsVisible: false,
        }
    },
    computed: {
        title() {
            return this.module === 'practice' && '实践成果' || '学习成果'
        },
        filteredWorks() { // 筛选出没有被关联的作品列表
            const idArr = this.curAchievementArr.map(item => item.worksId) || []
            return this.works.filter(item => !idArr.includes(item.id))
        }
    },
    props: {
        curAchievementArr: {
            type: Array,
            default() {
                return []
            }
        },
        dialog: {
            type: Object,
            default() {
                return {}
            }
        },
        id: {
            type: String,
            default: ''
        },
        handleRequest: Function,
        module: {
            type: String,
            default: 'practice'
        }
    },
    created() {
        this.requestWorksList()
    },
    methods: {
        async requestWorksList() { // 获取列表数据
            const res = await requestBackendWorksList({ auditStatus: 1 }, { pageSize: 999, pageNum: 1 })

            if (res.status === 200 && res.data.code === 200) {
                const _entity = res.data.entity || {}
                this.works = (_entity.resultData || []).map(item => ({ id: item.id, label: item.workName })) || []
            }
        },
        async deleteItem(id) { // 删除已经关联的成果
            const handler = this.module === 'practice' && deletePracticeResult || deleteStudyResult
            const res = await handler({ id })
            try {
                if (res.status === 200 && res.data.code === 200) {
                    const source = this.curAchievementArr
                    const curIndex = source.findIndex(item => item.id === id)
                    source.splice(curIndex, 1)
                    this.handleRequest()
                    return
                }
                this.$message.error(res.data.msg || '网络错误，请重试')
            } catch (e) {
                this.$message.error('网络错误，请重试')
            }
        },
        filterNode(value, data) { // 过虑作品列表
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        submit() { // 提交
            const handler = this.module === 'practice' && addPracticeResult || addStudyResult
            // 关联的是作品id
            const selected = this.$refs.worksTree.getCheckedNodes().map(item => item.id) || []
            if (!(this.curAchievementArr.length || selected.length)) {
                this.$message({ message: '请选择至少一个成果', duration: 1000 })
                return
            }
            // 实践和学习的关联接口，数据格式不一致，需单独处理
            const practiceWorksArr = selected.map(item => ({ busId: this.id, worksId: item })) || []
            const options = this.module === 'practice' ? practiceWorksArr : { studyId: this.id, works: selected }
            handler(options).then((res) => {
                if (res.status === 200 && res.data.code === 200) {
                    this.$message({ type: 'success', message: `成功关联${this.title}`, duration: 1500 })
                    this.handleRequest()
                    this.dialog.isVisible = false
                    return
                }
                this.$message.error(res.data.msg || '关联失败，请重试')
            }).catch(() => {
                this.$message.error('关联失败，请重试')
            })
        }
    },
    watch: {
        filterText(val) { // 搜索列表
            this.$refs.worksTree.filter(val)
        }
    },
}
</script>

<style lang='scss'>
  .achievement-dialog__wrapper .el-dialog {
    box-sizing: border-box;
    width: 695px;
    min-height: 520px;
    .el-dialog__body {
      padding: 30px 30px 80px;
    }
    .el-radio-group .el-radio {
      display: block;
      margin: 0 0 12px 0;
    }
    .el-icon-search:before {
      color: #0594e8;
    }
    .el-tag {
      height: 32px;
      line-height: 32px;
      margin-bottom: 4px;
      font-size: 14px;
      color: #0594e8;
      background-color: #e9f6ff;
      border-color: #c0e5ff;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .el-tag__close:hover {
      background-color: #0594e8;
      color: #fff;
    }
  }
</style>
<style lang="scss" scoped>
  @import '~@/assets/css/scss/vars.scss';

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .achievement-dialog__wrapper .btn-row {
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

  .tag-wrapper {
    .btn {
      display: inline-block;
      box-sizing: border-box;
      width: 66px;
      height: 32px;
      line-height: 30px;
      margin-bottom: 4px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #dfdfdf;
      border-radius: 4px;
      padding: 0;
      &:hover {
        background-color: $theme_color;
        color: #fff;
        border-color: $theme_color;
      }
    }
  }

  .select-works {
    &.move-down-enter-active, &.move-down-leave-active {
      transition: all .3s;
    }
    &.move-down-enter, &.move-down-leave-to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  .achievement-dialog__wrapper {
    .label {
      line-height: 32px;
      margin-right: 12px;
    }
    .content-right {
      width: 540px;
    }
    .select-works {
      border: 1px solid #dfdfdf;
      .search-wrapper {
        box-sizing: border-box;
        height: 54px;
        padding: 12px 20px 0;
        background-color: #f6f6f6;
        border-bottom: 1px solid #dfdfdf;
      }
      .search-input {
        width: 170px;
      }
      .el-tree {
        height: 260px;
        overflow: hidden;
        overflow-y: auto;
        border: 0;
      }
    }
    .btn-row {
      position: absolute;
      right: 34px;
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

