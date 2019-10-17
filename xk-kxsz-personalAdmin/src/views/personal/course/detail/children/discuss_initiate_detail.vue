<template>
  <section class="course-discuss__wrapper dpd15" id="course-discuss__wrapper">
    <div class="title clearfix">
      <div class="title_l fl">
        <router-link :to="{ path: 'discuss', query: { 'id': $route.query.id }}">讨论区 ></router-link>
        <router-link
          :to="{ path: 'discussTheme',query: { 'id': $route.query.id, 'discussType': $route.query.discussType }}">
          {{title}} >
        </router-link>
        <span>主题详情</span>
      </div>
      <div class="discuss-broad-search title_r fr">
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
    <div class="discuss_content">
      <div class="theme report">
        <div class="theme_title">
            <p>
                {{theme.title}}
                <el-tag class="ml10" size="mini" v-if="theme.discussType == '1'">综合讨论区</el-tag>
                <el-tag class="ml10" size="mini" type="success" v-else>教师答疑区</el-tag>
                <v-report class="fr" :report-data="{'url': reportApi, params: {'discussId': theme.id}}" v-if="theme.createId !== loginUserId"></v-report>
            </p>
          <p class="theme_content" v-html="theme.content || '---'"></p>
          <p><span class="theme_author">{{theme.createName}}</span> <span
            class="theme_time">{{theme.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span></p>
        </div>
        <div class="theme_state">
          <a @click="like(theme.id, $event, -1)" title="点赞" class="icon-btn-thumbsup"> ({{theme.praiseNum || 0}}) &nbsp;&nbsp;</a>
          <a @click="isVisible = !isVisible" title="回复" class="icon-i-reply"> ({{theme.replyNum || 0}})</a>
        </div>
        <div class="reply">
          <el-input type="textarea" :rows="2" placeholder="我来说两句。。" v-model="text" resize="none"></el-input>
          <div class="buttonGroup clearfix">
            <button class="psn-confirm-btn fr" @click="reply({pId: $route.query.pId, index: -1})">发表</button>
            <!-- <button class="reply_btn reply_btn2" @click="isVisible = false">取消</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <h3 class="comments_title">共{{totalNum}}条回复</h3>
      <ul class="allTopics_ul" v-if="comments.length">
        <li class="allTopics_list clearfix" v-for="(item, index) in comments" :key="index">
          <div class="avatar-box fl">
            <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
          </div>
          <div class="content-reply">
            <section class="allTopics_list_item report">
              <p class="allTopics_p2 ">
                <span class="user-name">{{item.createName}}</span>
                {{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                <v-report class="fr" :report-data="{'url': reportApi, params: {'discussId': item.id}}" v-if="item.createId !== loginUserId"></v-report>
              </p>
              <p class="allTopics_p1">{{item.content}}</p>
              <div class="allTopics_p3">
                <a @click="like(item.id, $event, index)" title="点赞" class="icon-btn-thumbsup"> ({{item.praiseNum || 0}})</a>&nbsp;&nbsp;
                <a @click="item['_isVisible'] = !(item['_isVisible'])" title="回复" class="icon-i-reply"> ({{item.replyNum || 0}})</a>
                <div class="reply" v-if="item['_isVisible']">
                  <el-input type="textarea" :rows="2" placeholder="我来说两句。。" v-model="item._txt" resize="none"></el-input>
                  <div class="buttonGroup clearfix">
                    <button class="psn-confirm-btn" @click="reply({pId: item.id, _txt: item._txt, index})">发表</button>
                    <button class="psn-cancel-btn" @click="item['_isVisible'] = false">取消</button>
                  </div>
                </div>
              </div>
            </section>
            <ul class="allTopics_ul2" v-if="Array.isArray((item.childBean || {}).resultData)">
              <li v-for="(i,k) in item.childBean.resultData" :key="k" class="allTopics_list2 clearfix report">
                <div class="avatar-box fl">
                  <img :src="getFileUrl(i.url) || faceDefault" width="41" height="41">
                </div>
                <div class="content-reply">
                  <p class="allTopics_p2">
                    <span class="user-name">{{i.createName}}</span> {{i.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                    <v-report class="fr" :report-data="{'url': reportApi, params: {'discussId': i.id}}" v-if="i.createId !== loginUserId"></v-report>
                  </p>
                  <p class="allTopics_p1">{{i.content}}</p>
                  <div class="allTopics_p3">
                    <a @click="like(i.id, $event, index)" title="点赞" class="icon-btn-thumbsup"> ({{i.praiseNum || 0}})</a>&nbsp;&nbsp;
                    <a @click="i['_isVisible'] = !(i['_isVisible'])" title="回复" class="icon-i-reply"> ({{i.replyNum || 0}})</a>
                    <div class="reply" v-if="i['_isVisible']">
                      <el-input type="textarea" :rows="2" placeholder="我来说两句。。" v-model="i._txt" resize="none"></el-input>
                      <div class="buttonGroup clearfix">
                        <button class="psn-confirm-btn" @click="reply({pId: item.id, _txt: i._txt, index})">发表</button>
                        <button class="psn-cancel-btn" @click="i['_isVisible'] = false">取消</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="empty-block" v-else>暂无数据</div>
      <div class="load-more" v-if="totalNum > comments.length" @click="pageNum++; getData(); ">加载更多</div>
    </div>
  </section>
</template>

<script>
  import { requestDiscussDetail, addLikes, addDiscussItem } from '@/service/course.js'
  import report from '../../../../../components/common/report.vue'
  import reply from '../../../../../components/common/reply.vue'

  export default {
    name: 'courseDetailDiscuss',
    inheritAttrs: false,
    data() {
      return {
        reportApi: '/maker/course/discuss/addDiscussReport',
        replyApi: '/maker/course/discuss/addDiscuss',
        search: { input: '', select: '' },
        theme: '',
        title: '',
        comments: [],
        totalNum: '',
        pageNum: 1,
        text: '',
        isVisible: false,
        loginUserId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
      }
    },
    components: {
      'v-report': report,
      'v-reply': reply,
    },
    created() {
      this.getData()
      const o = { 1: '综合讨论区', 2: '教师答疑区' }
      this.title = o[this.$route.query.discussType] || ''
    },
    methods: {
      async getData(index) {
        const isAddingChildComment = typeof index === 'number'
        isAddingChildComment && (this.pageNum = 1)
        const res = await requestDiscussDetail({
          id: this.$route.query.pId,
          pageSize: 5,
          pageNum: this.pageNum,
        })

        if (res.data.code === 200) {
          const entity = res.data.entity || {}
          const _data = entity.resultData || []

          _data.forEach((item) => {
            item._isVisible = false
            item._txt = ''
            const children = (item.childBean || {}).resultData || []
            children.forEach((child) => {
              child._isVisible = false
              child._txt = ''
            })
          })

          this.theme = (res.data.appendInfo || {}).proDiscuss || {}
          this.totalNum = entity.totalNum || 0

          if (isAddingChildComment) {
            // this.comments.splice(index, 1, _data)
            this.comments = _data
            return
          }

          this.comments.push(..._data)
        }
      },
      handleSearch() {
        this.$emit('on-search', this.search)
      },
      like(pId, e, index) {
        const targetObj = e.target || e.srcElement

        addLikes({ discussId: pId }).then((res) => {
          if (res.data.code === 200) {
            this.getData(index)
            if ((res.data.appendInfo || {}).status === 0) {
              targetObj.className = 'thumbUp icon-btn-thumbsup'
            } else {
              targetObj.className = 'icon-btn-thumbsup'
            }
          }
        })
      },
      reply({ pId, _txt, index } = {}) {
        const { discussType, id } = this.$route.query
        const { title } = this.theme
        const content = _txt || this.text
        const param = {
          pId,
          discussType,
          content,
          title,
          courseId: id,
          ttile: title,
        }

        if (content === '') return

        addDiscussItem(param).then((res) => {
          if (res.data.code === 200) {
            this.getData(index)
            this.isVisible = false
            this.text = ''
          }
        })
      }
    }
  }
</script>

<style lang='scss'>
  .discuss-broad-search {
    background-color: #fff;
    .el-input-group > .el-input__inner {
      color: #A6A6A6;
      width: 177px;
      border: none;
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

  .theme_state {
    .el-button {
      color: #9C9C9C;
      &:hover {
        color: #41C36F;
      }
    }
  }

  .course-discuss__wrapper .el-textarea__inner {
    height: 130px;
  }

  .course-discuss__wrapper .allTopics_list .reply {
    height: 123px;
    .el-textarea__inner {
      height: 75px;
    }
  }
  #course-discuss__wrapper {
      .hoverIfshow {
          display: none;
      }
      .report:hover .hoverIfshow {
          display: inline-block;
      }
      .title {
        .el-input-group__append {
          border: 0px;
        }
        .el-input-group__prepend {
          border: 0px;
        }
      }

      .theme_title {
        .el-tag--success {
          background-color: rgba(18, 206, 102, .1);
          border-color: rgba(18, 206, 102, .2);
          color: #13ce66;
        }
      }
  }
</style>
<style lang='scss' scoped>
  @import '~@/assets/css/scss/vars';

  .ml10 {
    margin-left: 10px;
  }

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .thumbUp {
        color: $color-value !important;
      }
      .title a:hover {
        color: $color-value;
      }
      .theme_author {
        color: $color-value;
      }
      .allTopics_p2 {
        span {
          color: $color-value;
        }
      }
      .reply_btn1 {
        color: #fff;
        background-color: $color-value;
        border: 1px solid $color-value;
        &:hover {
          opacity: 0.75;
        }
      }
      .reply_btn2 {
        color: $color-value;
        border: 1px solid $color-value;
        &:hover {
          background-color: $color-value;
          color: #fff;
        }
      }
    }
  }

  .user-name{
    margin-right: 10px;
    font-size: 14px;
  }

  // 头像盒子
  .avatar-box{
      img{
          border-radius: 50%;
      }
  }

  .content-reply{
      padding-left: 51px;
  }

  .title {
    height: 46px;
    line-height: 46px;
    padding: 0 12px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    .title_l {
      span {
        color: #999999;
      }
    }
    .title_r {
      margin-top: 5px;
      line-height: 1;
      border: 1px solid #C9C9C9;
      width: 352px;
    }
  }

  .allTopics_p1 {
    word-wrap: break-word;
    word-break: break-all;
  }

  .discuss_content {
    .theme {
      position: relative;
      .theme_title {
        padding: 20px 0 10px;
        font-size: 14px;
        box-sizing: border-box;
        border-bottom: 1px dashed #CDCDCD;
        p {
          line-height: 2;
        }
        .theme_author, .theme_time, .theme_content {
          font-size: 12px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .theme_state {
        padding: 10px 0;
        box-sizing: border-box;
      }
    }
  }

  .comments {
    .comments_title {
      margin-top: 20px;
      padding: 16px 0;
      font-size: 16px;
      border-bottom: 1px solid #D5D5D5;
    }
    .allTopics_ul {
      font-size: 14px;
      .allTopics_list {
        position: relative;
        padding: 20px 0 10px;
        box-sizing: border-box;
        border-bottom: 1px dashed #CACACA;
        p {
          line-height: 2;
          font-size: 12px;
        }
        .allTopics_p3 {
          text-align: right;
          [class*=icon-] {
            font-size: 12px;
          }
        }
        .allTopics_ul2 {
          .allTopics_list2 {
            position: relative;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px dashed #CACACA;
            .report2 {
              display: none;
              position: absolute;
              top: 30px;
              right: 0;
            }
            &:hover .report2 {
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .reply {
    height: 182px;
    margin-top: 6px;
    transition: height .5s;
    textarea {
      display: block;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-size: 14px;
      height: 130px;
    }
    .buttonGroup {
      margin: 10px 0;
      border: 0;
      .reply_btn {
        display: inline-block;
        width: 62px;
        height: 28px;
        line-height: 26px;
        float: right;
        margin-right: 20px;
        text-align: center;
        padding: 0;
      }
    }
  }

  .allTopics_list2:hover .allTopics_list > .report {
    display: none !important;
  }

  .load-more {
    width: 100%;
    margin-top: -1px;
    font-size: 14px;
    line-height: 3;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
  }
</style>
