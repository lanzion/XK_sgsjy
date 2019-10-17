<template>
  <div class="note-wrapper">
    <div class="note-header">
      <el-select v-model="selected" :clearable="true" class="select" placeholder="请选择课时">
        <el-option v-for="(section, i) in sections" :label="section.name" :value="section.id" :key="i"></el-option>
      </el-select>
      <a @click="showNoteDialog" class="btn-write-note fr" href="javascript:;">记笔记</a>
    </div>
    <div class="note-main">
      <ul class="notes">
        <li v-for="(note, index) in notes" :key="index" class="note-item table-layout pr">
          <div class="note-content table-cell">
            <h5 class="note-item-title">{{note.sectionName}}</h5>
            <p class="note-item-txt"><span>{{note.content}}</span></p>
            <p class="note-item-date">{{note.createDate | dateFormat('yyyy.MM.dd HH:mm:ss')}}</p>
          </div>
          <operate @on-delete="deleteItem(note.id)" @on-edit="editItem(note)" label="笔记"></operate>
        </li>
      </ul>
      <p v-if="notes.length === 0" class="no-data">暂无数据</p>
      <pagination :param.sync="pageParam" :change-page="requestNoteList"></pagination>
      <add-note-dialog v-if="dialog.isVisible" :dialog="dialog" :sections="sections"
                       :handle-request="requestNoteList" :cur-editing-note="curEditingNote"></add-note-dialog>
    </div>
  </div>
</template>

<script>
  import { requestNoteList, requestSectionList, deleteNote } from '@/service/course.js'
  import pagination from 'components/common/pagination.vue'
  import addNoteDialog from 'components/course/add_note_dialog.vue'
  import operate from 'components/common/operate.vue'

  export default {
    name: 'courseNote', // 课程笔记
    inheritAttrs: false,
    data() {
      return {
        curEditingNote: {},
        dialog: {
          isVisible: false
        },
        id: this.$route.query.id || '',
        pageParam: {
          pageNum: 1,
          pageSize: 4,
          totalNum: 0
        },
        sections: [],
        selected: '',
        notes: []
      }
    },
    components: {
      pagination,
      addNoteDialog,
      operate
    },
    created() {
      this.requestSectionList()
      this.requestNoteList()
    },
    methods: {
      async requestSectionList() { // 获取课时列表
        const res = await requestSectionList({ courseId: this.id })
        if (res.data.code === 200) {
          this.sections = res.data.appendInfo && res.data.appendInfo.list || []
        }
      },
      async requestNoteList() { // 获取笔记列表
        const res = await requestNoteList({ ...this.pageParam, courseId: this.id, sectionId: this.selected })
        if (res.data.code === 200) {
          const { resultData, totalNum } = res.data.entity || {}
          this.notes = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },
      async deleteItem(id) { // 删除笔记
        try {
          const res = await deleteNote({ id })
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
      editItem(note) { // 编辑课时
        this.curEditingNote = { ...note, type: 'edit' }
        this.dialog.isVisible = true
      },
      showNoteDialog() { // 添加笔记，初始数据
        this.dialog.isVisible = true
        this.curEditingNote = {}
      }
    },
    watch: {
      selected() {
        this.requestNoteList()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/scss/vars";

  .note-wrapper {
    padding: 15px;
  }
  .note-header {
    margin-bottom: 20px;
    .select {
      width: 235px;
    }
    .btn-write-note {
      width: 90px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      background-color: $theme_color;
      color: #fff;
      border-radius: $button-radiu;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  .note-item {
    box-sizing: border-box;
    min-height: 92px;
    border: 1px solid #c9c9c9;
    font-size: 14px;
    padding: 20px 10px;
    .note-content {
      width: 80%;
    }
    .note-item-title {
      font-weight: bold;
    }
    .note-item-txt {
      width: 660px;
      line-height: 1.3;
      margin: 12px 0;
      word-wrap: break-word;
      word-break: break-all;
    }
    .note-item-date {
      color: #999;
      font-size: 12px;
    }
    .operate {
      right: 26px;
      top: 30%;
    }
  }

  .note-item + .note-item {
    margin-top: 14px;
  }

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .note-header .btn-write-note {
        background-color: $color-value;
      }
    }
  }
</style>
