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
      ma