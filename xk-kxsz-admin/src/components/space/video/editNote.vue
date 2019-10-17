<template>
  <div class="text-area">
    <textarea v-model.trim="myNote" ref="editNoteArea" placeholder="在此写笔记，最多100字" maxlength="100"></textarea>
    <div class="btn-row">
      <button @click="cancel" class="btn-cancel btn">取消</button>
      <button @click="saveNote" class="btn-ok btn">保存</button>
    </div>
    <p v-if="noteIsEmpty" class="empty-tip">笔记不能为空哦</p>
  </div>
</template>

<script>

  export default {
    name: 'editNote',
    data () {
      return {
        myNote: '',
        noteIsEmpty: false
      }
    },
    props: {
      noteTxt: {
        type: String,
        default: ''
      }
    },
    created () {
      this.myNote = this.noteTxt
      this.$nextTick(() => this.$refs.editNoteArea.focus())
    },
    methods: {
      cancel () {
        this.$emit('on-cancel-edit')
      },
      saveNote () {
        if (this.myNote === '') {
          this.noteIsEmpty = true
          return
        }
        this.$emit('on-save-note', this.myNote)
      },
    }
  }
</script>

<style lang='scss' scoped>
  .text-area {
    padding-bottom: 0 !important;
    border-bottom:0 !important;
    padding-right: 2px;
    textarea {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid #999;
      padding: 6px;
      min-height: 94px;
      background: #000203;
      font-size: 12px;
      color: #fff;
      &:hover, &:focus {
        border-color: #2bbb61;
      }
    }
    .btn-row {
      text-align: right;
      .btn {
        width: 62px;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid #2bbb61;
        text-align: center;
        color: #2bbb61;
        font-size: 12px;
        padding: 0;
        &.btn-ok {
          color: #fff;
          background-color: #2bbb61;
        }
      }
    }
    .empty-tip {
      text-align: center;
      margin-top: 8px;
      color: #2797ed;
    }
  }
</style>
