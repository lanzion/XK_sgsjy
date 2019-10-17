<template>
  <el-dialog :visible.sync="showManageDialog" :show-close="false" class="manage-point__wrapper">
    <h3 slot="title" class="manage-point__title">
      管理知识点
      <i @click.stop="hideDialog('managePoint')" class="el-dialog__close el-icon el-icon-close"></i>
    </h3>
    <div class="manage-point__content">
      <!--<div class="input-group">
        <span class="label">名称</span>
        <input class="question-input" type="text" placeholder="请输入题目名称，最多20字" maxlength="20">
      </div>
      <div class="input-group">
        <span class="label">类型</span>
        <el-select v-model="questionType" @change="radioBox(firstCheckBoxIndex)" placeholder="请选择题目类型" class="select">
          <el-option label="单选" :value="1"></el-option>
          <el-option label="多选" :value="2"></el-option>
          <el-option label="判断" :value="3"></el-option>
        </el-select>
      </div>-->
      <div class="point-wrapper">
        <h4 class="point-title">
          <span class="">知识点名称</span><span class="">操作</span>
        </h4>
        <div class="point-info">
          <el-tree :data="points" @node-click="handleNodeClick" :props="defaultProps" :render-content="renderContent"
                   node-key="id" accordion highlight-current class="point-tree">
          </el-tree>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <a v-if="!editAreaIsVisible" @click="showEditArea" href="javascript:;" class="btn-add-point transition-group"><i
          class="icon-btn-add-circle icon"></i>添加知识点</a>
        <div v-else class="edit-point__wrapper transition-group">
          <input @input="hideEmptyTip" v-model.trim="editResult" ref="pointInput" class="el-input__inner" placeholder="请输入知识点" maxlength="15" autofocus>
          <div class="btn-row">
            <button @click.stop="cancelEditing" class="psn-cancel-btn">取消</button>
            <button @click.stop="save" class="psn-confirm-btn">保存</button>
          </div>
          <transition name="fade-translate">
            <p v-if="emptyTip" class="edit-point__tip">知识点不能为空，请输入</p>
          </transition>
        </div>
      </transition>
    </div>
  </el-dialog>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { addPoint, deletePoint, editPoint } from '@/service/course.js'

  export default {
    name: 'managePoint', // 后台课程，管理知识点
    data() {
      return {
        curPoint: {}, // 当前编辑的知识点
        defaultProps: { // 默认属性
          children: 'subs',
          label: 'name'
        },
        editAreaIsVisible: false, // 是否显示知识点输入框
        editResult: '', // 知识点输入框内容
        emptyTip: false, // 知识点输入框空值提示
      }
    },
    props: {
      points: { // 父组件知识点数据
        type: Array,
        default() {
          return []
        }
      },
      handleRequest: { // 父组件获取知识点方法
        type: Function,
        required: true
      }
    },
    computed: {
      showManageDialog() {
        return this.$store.state.course.backend.managePointDialogIsVisible
      },
      firstCheckBoxIndex() { // 获取第一个选择题被选中的序号
        return this.multipleChoice.findIndex(val => val.isChecked === true)
      }
    },
    methods: {
      ...mapMutations('course/backend', ['hideDialog']),
      append(store, data) { // 添加子知识点，data可以访问到当前节点数据，作为子知识点的父级数据
        const _curPoint = { name: '请输入知识点', subs: [], parentId: data.id }
        const MAXLENGTH = 3
        if (data._ids.length >= MAXLENGTH) {
          this.$message(`知识点最多只有${MAXLENGTH}级，不能再添加了`)
          return
        }
        this.curPoint = _curPoint
        this.showEditArea()
      },
      cancelEditing() { // 取消编辑知识点
        this.emptyTip = false
        this.editAreaIsVisible = false
        this.curPoint = {}
      },
      editPoint(store, data) {
        this.curPoint = { ...data, isEditing: true }
        this.showEditArea()
      },
      handleNodeClick() {

      },
      hideEmptyTip() { // 是否显示知识点输入框空值提示
        this.emptyTip = this.editResult === ''
      },
      remove(store, data) { // 删除知识点
        deletePoint({ id: data.id }).then((res) => {
          if (res.data.code === 200) {
            this.handleRequest()
            this.$message({
              message: '成功删除该知识点',
              type: 'success'
            })
            return
          }
          this.$message.error(res.data.msg || '删除知识点失败，请重试')
        }).catch(() => {
          this.$message.error('删除知识点失败，请重试')
        })
      },
      renderContent(h, { node, data, store }) { // 渲染自定义el-tree内容
        return (
          <span>
            <span> {node.label}</span>
            <p style = "position: absolute; right: 45px; top:0;">
              <a class="btn" title="添加子知识点">
                <i class="icon-btn-add-circle icon" on-click = {() => this.append(store, data)}></i>
              </a>
              <a class="btn" title="编辑">
                <i class="icon-btn-edit icon" on-click={() => this.editPoint(store, data)}></i>
              </a>
              <a class="btn" title="删除">
                <i class="icon-btn-delete icon" on-click={() => this.remove(store, data)}></i>
              </a>
            </p>
          </span>
        )
      },
      save() { // 保存知识点新增，修改
        if (this.editResult === '') {
          this.emptyTip = true
          this.setFocus()
          return false
        }
        let handler = addPoint
        let _label = '添加'
        let _key = 'parentId'
        let _id = ''
        if (this.curPoint.isEditing) { // 编辑知识点
          handler = editPoint
          _key = 'id'
          _label = '修改'
        }
        _id = this.curPoint[_key] || ''
        handler({
          name: this.editResult,
          [_key]: _id
        }).then((res) => {
          if (res.data.code === 200) {
            this.handleRequest()
            this.$message({
              message: `成功${_label}知识点`,
              type: 'success'
            })
            this.editAreaIsVisible = false
            this.curPoint = {}
            return
          }
          this.$message.error(res.data.msg || `${_label}知识点失败，请重试`)
        }).catch(() => {
          this.$message.error(`${_label}知识点失败，请重试`)
        })
      },
      setFocus() { // 设置焦点
        setTimeout(() => {
          this.$refs.pointInput.focus()
        }, 500)
      },
      showEditArea() { // 显示知识点输入框
        this.editAreaIsVisible = true
        this.editResult = this.curPoint.isEditing && this.curPoint.name || ''
        this.setFocus()
      }
    }
  }
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
  .manage-point__wrapper .el-dialog {
    width: 600px;
    min-height: 550px;
    box-sizing: border-box;
    .el-icon-close {
      font-size: 18px;
      top: 18px;
      right: 18px;
    }
    .el-dialog__body {
      padding: 20px 20px 40px 20px;
      .el-input__icon {
        width: 10%;
      }
      .el-input__inner {
        height: 38px;
        &:hover, &:focus {
          border-color: $theme_color;
        }
      }
    }
    .el-radio + .el-radio {
      margin-left: 24px;
    }
    .el-tree-node__content {
      position: relative;
    }
    .el-tree-node .btn {
      margin-right: 16px;
      font-size: 16px;
    }
  }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
  .manage-point__wrapper {
    .manage-point__title {
      position: relative;
      font-size: 16px;
      i {
        position: absolute;
        right: 0;
      }
    }
    .input-group {
      padding-left: 38px;
      &:first-child {
        margin-bottom: 20px;
      }
      .label {
        margin-right: 16px;
      }
      .question-input {
        box-sizing: border-box;
        width: 372px;
        height: 38px;
        border: 1px solid #dfdfdf;
        padding: 4px 10px;
        &:focus {
          border-color: $theme_color;
        }
      }
    }
    .point-wrapper {
      margin-top: 20px;
      font-size: 0;
      .point-title {
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        span {
          display: inline-block;
          font-size: 14px;
          &:first-child {
            box-sizing: border-box;
            width: 60%;
            padding-left: 30px;
          }
          &:last-child {
            width: 40%;
            text-align: center;
          }
        }
      }
      .point-info {
        border: 1px solid #eee;
        border-top: 0;
        padding-left: 22px;
      }
      .point-tree {
        display: inline-block;
        width: 100%;
        max-height: 400px;
        min-height: 200px;
        overflow: hidden;
        overflow-y: auto;
        border: 0;
        font-size: 14px;
      }
      .btn {
        margin-left: 12px;
        font-size: 16px;
      }
    }
    .btn-add-point {
      display: block;
      height: 38px;
      line-height: 38px;
      margin-top: 20px;
      margin-bottom: 44px;
      background-color: #def5ff;
      border: 1px dashed $theme_color;
      text-align: center;
      font-size: 14px;
      .icon {
        margin-right: 6px;
        font-size: 18px;
      }
      &:hover {
        color: $theme_color;
        .icon {
          color: $theme_color
        }
      }
    }
    .edit-point__wrapper {
      position: relative;
      margin-top: 20px;
    }
    .transition-group {
      &.fade-enter-active, &.fade-leave-active {
        transition: all .3s
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
    .edit-point__input {
      box-sizing: border-box;
      width: 100%;
      height: 38px;
      border: 1px solid #dfdfdf;
      padding: 10px 12px;
      &:hover, &:focus {
        border-color: $theme_color;
      }
    }
    .btn-row {
      margin-top: 20px;
      text-align: right;
      .btn {
        box-sizing: border-box;
        width: 62px;
        height: 26px;
        line-height: 26px;
        margin-left: 10px;
        text-align: center;
        border: 1px solid $theme_color;
        font-size: 12px;
        padding: 0;
      }
      .btn-cancel {
        color: $theme_color;
      }
      .btn-save {
        background-color: $theme_color;
        color: #fff;
      }
    }
    .edit-point__tip {
      position: absolute;
      left: 0;
      bottom: 28px;
      width: 100%;
      font-size: 12px;
      color: $theme_color;
      text-align: center;
      &.fade-translate-enter-active, &.fade-translate-leave-active {
        transition: all .2s
      }
      &.fade-translate-enter, &.fade-translate-leave-to {
        opacity: 0;
        transform: translateY(40px);
      }
    }
  }
</style>

