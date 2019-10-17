<template>
  <div class="note-wrapper">
    <div class="text-area">
      <textarea v-model.trim="myNote" placeholder="在此写笔记，最多100字" maxlength="100"></textarea>
      <div class="btn-row">
        <button @click="myNote = ''" class="btn-cancel btn">取消</button>
        <button @click="addItem" class="btn-ok btn">保存</button>
      </div>
    </div>
    <ul class="note-container">
      <li v-for="(note, index) in notes" :key="index" @mouseenter="mouseEnterItem(index)"
          @mouseleave="mouseLeaveItem(index)" class="note-item table-layout">
        <edit-note-area v-if="(textAreaIsVisible === true) && (curNoteItem === index)" :note-txt="note.content"
                   @on-save-note="saveNote" @on-cancel-edit="hideTextArea" class="table-cell"
                   style="width:100%;"></edit-note-area>
        <div v-else class="note-content table-cell">
          <p class="note-time">
            <i @click="jumpToSpecTime(note.playLength)" class="icon"></i>
            <span class="time">{{handleNoteTime(note.playLength)}}</span></p>
          <p class="note-txt">{{note.content}}</p>
          <div v-show="curNoteItem === index" class="operate">
            <a @click="textAreaIsVisible = true" href="javascript:;" class="btn-edit" title="编辑"><i
              class="icon-btn-edit2"></i></a>
            <a @click="deleteItem(note.id)" href="javascript:;" class="btn-delete" title="删除"><i
              class="icon-btn-delete"></i></a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {requestNoteList, addNote, deleteNote, editNote} from '@/service/course.js'
  import {mapGetters} from 'vuex'
  import editNoteArea from './editNote.vue'

  export default {
    name: 'videoNote',
    data () {
      return {
        curNoteItem: -1,
        myNote: '',
        notes: [],
        pageParam: {
          pageNum: 1,
          pageSize: 99,
          totalNum: 99
        },
        textAreaIsVisible: false,
      }
    },
    props: {
      videoEl: {
        default: null
      }
    },
    computed: {
      ...mapGetters('course', ['videoSrcArr'])
    },
    components: {
      editNoteArea
    },
    created () {
      let {id, sectionId} = this.$route.query
      this.id = id
      this.sectionId = sectionId
      this.requestNoteList()
    },
    methods: {
      async requestNoteList () { // 获取笔记列表
        let res = await requestNoteList({...this.pageParam, courseId: this.id, sectionId: this.sectionId})
        if (res.data.code === 200) {
          let _entity = res.data.entity
          this.notes = _entity && _entity.resultData || []
        }
      },
      addItem (options = {}) { // 添加/修改笔记
        let isEditing = options.type === 'edit'
        let handler = isEditing && editNote || addNote
        let _note = isEditing && options.txt || this.myNote
        let _label = isEditing && '修改' || '添加'
        let id = isEditing ? this.notes[this.curNoteItem].id : undefined
        let _item = this.videoSrcArr.find(item => item.sectionId === this.sectionId)
        let videoCurTime = this.videoEl && +(this.videoEl.currentTime.toFixed(2)) || 0 // 视频当前播放时间点

        if (_note === '') return

        handler({
          id,
          chapterId: _item.chapterId,
          courseId: this.id,
          sectionId: this.sectionId,
          content: _note,
          playLength: isEditing ? this.notes[this.curNoteItem].playLength || 0 : videoCurTime
        }).then(res => {
          if (res.data.code === 200) {
            this.$message(`成功${_label}笔记`)
            this.requestNoteList()
            this.myNote = ''
            return
          }

          this.$message.error(res.data.msg || `${_label}笔记失败，请稍后重试`)
        }).catch(() => {})
      },
      async deleteItem (id) { // 删除笔记
        try {
          let res = await deleteNote({id})
          if (res.data.code === 200) {
            this.$message('成功删除该笔记')
            this.requestNoteList()
            return
          }
          this.$message.error('刪除笔记失败，请重试')
        } catch (e) {
          this.$message.error('刪除笔记失败，请重试')
        }
      },
      handleNoteTime (time = 0) { // 处理笔记的时间点
        let remainder = time % 60
        return ~~(time / 60) + ':' + (remainder < 10 ? '0' + remainder : remainder)
      },
      hideTextArea () { // 隐藏笔记输入框
        this.textAreaIsVisible = false
        this.curNoteItem = -1
      },
      jumpToSpecTime (time) { // 视频跳转到笔记记录的时间点
        if (this.videoEl) {
          this.videoEl.currentTime = time || 0
          this.videoEl.play()
        }
      },
      mouseEnterItem (index) {
        if (this.textAreaIsVisible) return
        this.curNoteItem = index
      },
      mouseLeaveItem (index) {
        if (this.textAreaIsVisible) return
        this.curNoteItem = -1
      },
      saveNote (txt) {  // 保存修改的笔记
        this.addItem({type: 'edit', txt})
        this.hideTextArea()
      }
    }
  }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
  .note-wrapper {
    padding-top: 24px;
    color: #fff;
  }

  .text-area {
    padding-bottom: 24px;
    padding-right: 2px;
    border-bottom: 1px solid #999;
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
      color: $theme_color;
    }
  }

  .note-container {
    max-height: 346px;
    overflow: hidden;
    overflow-y: auto;
    .note-item {
      position: relative;
      min-height: 90px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      padding: 8px;
      font-size: 12px;
      .icon {
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-right: 6px;
        background: url("../../asset/img/course/suspend_small.png") no-repeat;
        vertical-align: middle;
        cursor: pointer;
      }
      .note-txt {
        line-height: 1.3;
        margin-top: 4px;
        word-break: break-word;
      }
      .operate {
        position: absolute;
        top: 10px;
        right: 2px;
        a {
          display: inline-block;
          width: 16px;
          height: 16px;
        }
        i {
          font-size: 14px;
          color: #fff;
        }
        .btn-edit {
          margin-right: 6px;
        }
      }
    }
  }
</style>
