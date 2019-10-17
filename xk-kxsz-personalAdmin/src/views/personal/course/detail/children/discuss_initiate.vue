<template>
  <section id="courseDetailDiscussInitiate" class="dpd15">
    <div class="title">
      <div class="title_l fl">
        <router-link :to="{ path: 'discuss', query: { 'id': $route.query.id }}">讨论区</router-link>
        >

        <router-link :to="{ path: 'discussTheme', query: $route.query}"
                     v-if='this.$route.query.discussType'>{{title}} >

        </router-link>
        <span>发起新主题</span>
      </div>
      <div class="discussinitiate-broad-search title_r fr">
        <el-input v-model="search.input" @keyup.enter.native="handleSearch" placeholder="搜索主题">
          <el-select v-model="search.select" slot="prepend" placeholder="全部讨论区">
            <el-option label="全部讨论区" value=""></el-option>
            <el-option label="教师答疑区" value="2"></el-option>
            <el-option label="综合讨论区" value="1"></el-option>
          </el-select>
          <el-button @click="handleSearch" slot="append" icon="search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="discussinitiate-form-select">
      <template v-if="this.$route.query.discussType === undefined">
        <h3 class="form_title">所属板块</h3>
        <div class="select_box">
          <el-select v-model="select.value" placeholder="请选择所属板块">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
          </el-select>
          <i v-if="select.value !== ''" class="el-icon-circle-check" style="color:#41C36F;"></i>
        </div>
      </template>

      <h2 class="form_title">主题</h2>
      <div class="select_box">
        <el-input v-model="select.input" placeholder="请输入主题，最多30字"></el-input>
      </div>
      <i v-if="select.input.length > 30" class="el-icon-circle-cross" style="color:#23b8ff;"> 超过30个字符</i>
      <i v-else-if="select.input !== ''" class="el-icon-circle-check" style="color:#41C36F;"></i>

      <h2 class="form_title">内容</h2>
      <div class="iscussinitiate-form-editor">
        <div id="editor-container">
          <div id="editor-trigger"></div>
        </div>
      </div>
      <i v-if="select.content.length > 1000" class="el-icon-circle-cross" style="color:#23b8ff;"> 超过1000个字符</i>
      <i v-else-if="select.content !== ''" class="el-icon-circle-check" style="display: block;margin-top: 6px;color:#41C36F;"></i>
      <div class="select_box">
        <h3 class="form_title">关联课时</h3>
        <el-select v-model="select.sectionId" class="select" placeholder="请选择关联课时">
          <el-option v-for="(section, i) in sections" :label="section.name" :value="section.id" :key="i"></el-option>
        </el-select>
        <i v-if="select.sectionId !== ''" class="el-icon-circle-check" style="color:#41C36F;"></i>
      </div>

      <div class="buttonGroup clearfix">
        <a class="psn-confirm-btn" @click="submit">发表</a>
        <a class="psn-cancel-btn" @click="$router.go(-1)">取消</a>
      </div>
    </div>
  </section>
</template>

<script>
  import { editor } from '@/mixin/wangEditor.js'
  import { addDiscussItem, requestSectionList } from '@/service/course.js'

  export default {
    name: 'courseDetailDiscussInitiate',
    mixins: [editor],
    inheritAttrs: false,
    data() {
      return {
        options: [{ value: '1', label: '综合讨论区' }, { value: '2', label: '教师答疑区' }],
        search: { input: '', select: '' },
        sections: [],
        select: {
          value: '',
          input: '',
          content: '',
          sectionId: '',
        },
        title: ''
      }
    },
    mounted() {
      this.init()
      this.requestSectionList()
    },
    methods: {
      async requestSectionList() { // 获取课时列表
        const res = await requestSectionList({ courseId: this.$route.query.id })
        if (res.data.code === 200) {
          this.sections = res.data.appendInfo && res.data.appendInfo.list || []
        }
      },

      init() {
        const o = { 1: '综合讨论区', 2: '教师答疑区' }
        const _this = this
        this.title = o[this.$route.query.discussType] || ''
        this.initEditor()
        this.editor.onchange = () => {
          _this.select.content = this.editor.$txt.html()
        }
      },
      submit() {
        const { discussType, id: courseId } = this.$route.query
        if (discussType !== undefined) {
          this.select.value = discussType
        }

        const { content, input, value, sectionId } = this.select
        if (value !== '' && input !== '' && content !== '' && sectionId !== '' && input.length <= 30 && content.length <= 1000) {
          addDiscussItem({
            courseId,
            sectionId,
            discussType: value,
            title: input,
            content: content,
            pId: '-1',
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '发表成功'
              })
              this.$router.push({ path: 'discuss', query: { id: courseId } })
            } else {
              this.$message.error('发表失败')
            }
          })
        } else {
          this.$message('请按要求填写完整再提交')
        }
      },
      handleSearch() {
        this.$emit('on-search', this.search)
      },
    }
  }
</script>
<style lang='scss'>
  .discussinitiate-broad-search {
    background-color: #fff;
    .el-input-group > .el-input__inner {
      color: #A6A6A6;
      width: 177px;
    }
    .el-input__inner {
      width: 114px;
      border: none;
    }
    .el-button {
      background: #C9C9C9;
      .el-icon-search:before {
        content: '搜索';
      }
    }
    .el-input__icon.is-reverse + .el-input__inner {
      border-color: #eee;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #A7A7A7;
    }
  }

  .discussinitiate-form-select {
    .select_box {
      border: none;
      .el-input__icon {
        width: 15%;
      }
      .el-input__inner {
        width: 290px;
      }
    }
    i {
      font-size: 12px;
    }
  }

  .iscussinitiate-form-editor {
    .ql-container {
      min-height: 150px;
    }
  }

  .el-input__inner:focus {
    /* border: 1px solid red; */
  }
  #courseDetailDiscussInitiate {
    .title {
      .el-input-group__append {
        border: 0px;
      }
      .el-input-group__prepend {
        border: 0px;
      }
    }
  }
</style>
<style lang='scss' scoped>
  #editor-trigger {
    height: 200px;
  }

  $theme-color: #41C36F;
  .title {
    height: 46px;
    line-height: 38px;
    padding: 4px 12px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    .title_r {
      line-height: 1;
      border: 1px solid #C9C9C9;
      width: 352px;
    }
  }

  .discussinitiate-form-select {
    margin-top: 50px;
    font-size: 16px;
    .form_title {
      margin: 20px 0 10px;
    }
    .select_box {
      display: inline-block;
      height: 32px;
      /* border: 1px solid #ECECEC; */
      line-height: 32px;
    }
    .buttonGroup {
      height: 30px;
      margin-top: 30px;
      text-align: left;
      .reply_btn {
        display: inline-block;
        width: 62px;
        height: 28px;
        line-height: 28px;
        text-align: center;
      }
      .reply_btn1 {
        background-color: $theme-color;
        color: #fff;
      }
      .reply_btn2 {
        border: 1px solid $theme-color;
        color: $theme-color;
        margin-left: 10px;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }

  .iscussinitiate-form-editor {
    min-height: 200px;
  }
</style>
