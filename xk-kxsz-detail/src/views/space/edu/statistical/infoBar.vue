<template>
  <div class="add-note-wrapper">
    <div class="select-section">
      <span class="select-section__label label">课时：</span>
      <el-select v-model="selected" class="select-section__select" placeholder="请选择课时">
        <el-option label="课时1" value="1"></el-option>
        <el-option label="课时2" value="2"></el-option>
        <el-option label="课时3" value="3"></el-option>
      </el-select>
    </div>
    <div class="add-note-area table-layout">
      <span class="add-note-area__label label table-cell">笔记：</span>
      <textarea v-model="textareaTxt" class="add-note-area__area table-cell" placeholder="请输入笔记内容" maxlength="50"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'courseAddNote', // 添加笔记弹窗content
    data () {
      return {
        selected: '1',
        textareaTxt: ''
      }
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang='scss' scoped>
  .add-note-wrapper {
    padding-left: 12px;
    .label {
      margin-right: 20px;
    }
  }

  .select-section .select-section__select {
    width: 73%;
  }

  .add-note-area {
    margin-top: 12px;
    .add-note-area__label {
      width: 18%;
    }
    .add-note-area__area {
      width: 89%;
      min-height: 80px;
      box-sizing: border-box;
      padding: 8px;
    }
  }

</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <template>
  <el-dialog :visible.sync="showManageDialog" :show-close="false" class="manage-point__wrapper">
    <h3 slot="title" class="manage-point__title">
      管理知识点
      <i @click.stop="hideDialogOfCourse('managePoint')" class="el-dialog__close el-icon el-icon-close"></i>
    </h3>
    <div class="manage-point__content">
      <div class="input-group">
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
      </div>
      <div class="point-wrapper">
        <h4 class="point-title">
          <span class="">知识点名称</span><span class="">操作</span>
        </h4>
        <div class="point-info">
          <el-tree :data="pointList" :props="defaultProps" :render-content="renderContent" node-key="id" accordion
                   class="point-tree">
          </el-tree>
        </div>
      </div>
      <a v-show="!editAreaIsVisible" @click="showEditArea" href="javascript:;" class="btn-add-point"><i
        class="icon-btn-add-circle icon"></i>添加知识点</a>
      <div v-show="editAreaIsVisible" class="edit-point__wrapper">
        <input v-model="editResult" @input="hideEmptyTip" type="text" class="edit-point__input" placeholder="请输入知识点"
               maxlength="30" autofocus>
        <div class="btn-row">
          <button @click.stop="editAreaIsVisible = false;" class="btn-cancel btn">取消</button>
          <button @click.stop="save" class="btn-save btn">保存</button>
        </div>
        <p v-if="emptyTip" class="edit-point__tip">知识点不能为空，请输入</p>
      </div>

    </div>
  </el-dialog>
</template>

<script>
  import {mapMutations} from 'vuex'
  let id = 1000;
  export default {
    name: 'managePoint', // 后台课程，管理知识点
    data () {
      return {
        questionType: '', // 题目类型
        editAreaIsVisible: false,
        emptyTip: false,
        editResult: '',
        pointList: [{
          id: 1,
          label: 'Arduino',
          children: [{
            id: 4,
            label: '创意制造',
            children: [{
              id: 9,
              label: '纽扣DIY'
            }, {
              id: 10,
              label: '纽扣DIY2'
            }]
          }]
        }, {
          id: 2,
          label: '3D打印',
          children: [{
            id: 5,
            label: '3D打印1'
          }, {
            id: 6,
         