<template>
  <section class="dpd15" id="courseDetailDiscuss">
    <div class="title">
      <div class="title_l fl">
        讨论区
      </div>
      <div class="discuss-broad-search title_r fr">
        <el-input v-model="search.input" @keyup.enter.native="requestList" placeholder="搜索主题">
          <el-select v-model="search.select" slot="prepend" placeholder="全部讨论区">
            <el-option label="全部讨论区" value=""></el-option>
            <el-option label="教师答疑区" value="2"></el-option>
            <el-option label="综合讨论区" value="1"></el-option>
          </el-select>
          <el-button @click="requestList" slot="append" icon="search"></el-button>
        </el-input>
      </div>
    </div>
    <router-link class="initiateTheme" :to="{path: 'initiate', query: {'id': this.$route.query.id}}">
      <i class="i-initiateTheme"></i>发起主题
    </router-link>
    <div class="plate">
      <h3 class="plate_title">板块</h3>
      <ul class="plate_ul">
        <p class="list_p"></p>
        <router-link :to="{path:'discussTheme', query:{'id': $route.query.id, 'discussType': '2'}}">
          <li class="plate_list">
            <i class="icon icon-answer" :style="{'background-image': `url(${answer_bg})`}"></i>
            <p class="list_p1">教师答疑区</p>
            <p class="list_p2">在这里，课程成员可以发表关于课程的相关问题，并得到教师的解答。</p>
          </li>
        </router-link>
        <router-link :to="{path: 'discussTheme', query:{'id': $route.query.id, 'discussType': '1'}}">
          <li class="plate_list">
            <i class="icon icon-discuss" :style="{'background-image': `url(${discuss_bg})`}"></i>
            <p class="list_p1">综合讨论区</p>
            <p class="list_p2">在这里，大家可以一起交流课程经验。</p>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="allTopics">
      <h3 class="allTopics_title">全部主题</h3>
      <ul class="allTopics_ul">
        <li class="allTopics_list clearfix" v-for="(item, index) in data" :key="index">
          <div class="avatar-box fl">
            <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
          </div>
          <div class="content-reply">
            <p class="allTopics_p2">
              <span class="name">{{item.createName}}</span>
              <span class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span>
            </p>
            <router-link :to="{ path: 'discussDetail', query: {'id': $route.query.id, 'pId': item.id, 'discussType': item.discussType}}">
              <p class="allTopics_p1">{{item.title}}</p>
            </router-link>
            <p class="allTopics_p3 clearfix">
              <el-tag class="fl" size="mini" v-if="item.discussType == '1'">综合讨论区</el-tag>
              <el-tag class="fl" size="mini" type="success" v-else>教师答疑区</el-tag>
              <span class="icon-btn-browse table-cell" title="浏览"> {{item.browseNum || 0}}</span>
              <span class="icon-i-reply table-cell" title="回复"> {{item.replyNum || 0}}</span>
              <span class="icon-btn-thumbsup table-cell" title="点赞"> {{item.praiseNum || 0}}</span>
            </p>
          </div>
        </li>
      </ul>
      <p v-if="data.length === 0" class="no-data">暂无数据</p>
      <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; loadMore = true; requestList()">加载更多</div>
    </div>
  </section>
</template>

<script>
  import { requestDiscussList } from '@/service/course.js'
  import answerBg from 'Asset/img/common/answer.png'
  import discussBg from 'Asset/img/common/discuss.png'

  export default {
    name: 'courseDetailDiscuss',
    inheritAttrs: false,
    data() {
      return {
        answer_bg: answerBg,
        discuss_bg: discussBg,
        data: [],
        items: {},
        id: this.$route.query.id,
        loadMore: false,
        pageNum: 1,
        search: { input: '', select: '' },
        totalNum: '',
      }
    },
    mounted() {
      this.search = this.$attrs.discussSearch
      this.requestList()
    },
    methods: {
      async requestList() {
        const { id, pageNum, search: { select, input } } = this
        const res = await requestDiscussList({
          pageNum,
          pageSize: 5,
          courseId: id,
          discussType: select,
          title: input,
          pId: '-1',
        })

        if (res.data.code === 200) {
          const { resultData, totalNum } = res.data.entity || {}
          this.totalNum = totalNum || 0

          if (this.loadMore) {
            this.data.push(...(resultData || []))
            this.loadMore = false
            return false
          }

          this.data = resultData || []
          this.pageNum = 1
        }
      },
    },
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
  // 头像盒子
  .avatar-box {
    img {
      border-radius: 50%;
    }
  }

  .content-reply {
    padding-left: 51px;
  }

  #courseDetailDiscuss {
    .title {
      .el-input-group__append {
        border: 0px;
      }
      .el-input-group__prepend {
        border: 0px;
      }
    }

    .content-reply {
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

  @each $color-key,
  $color-value in $color-data {
    .theme-#{$color-key} {
      .allTopics_ul .allTopics_p2 {
        .name {
          color: $color-value;
        }
      }
      .initiateTheme {
        background: $color-value;
        border-radius: $button-radiu;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }


  .title {
    height: 46px;
    padding: 4px 12px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    .title_r {
      line-height: 1;
      border: 1px solid #C9C9C9;
      width: 352px;
    }
    .title_l {
      line-height: 38px;
      font-size: 16px;
    }
  }

  .initiateTheme {
    position: relative;
    display: inline-block;
    margin-top: 20px;
    width: 214px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    .icon-initiateTheme {
      margin-right: 4px;
    }
  }

  .plate {
    margin-top: 30px;
    font-size: 16px;
    .plate_title {
      padding: 10px 0;
      border-bottom: 1px solid #D6D6D6;
    }
    .plate_list {
      height: 100px;
      padding: 17px 0;
      box-sizing: border-box;
      border-bottom: 1px dashed #CACACA;
      cursor: pointer;
      .icon {
        float: left;
        width: 66px;
        height: 66px;
      }
      // .icon-answer {
      //   background-image: url('../../../../../asset/img/common/answer.png');
      // }
      // .icon-discuss {
      //   background-image: url('../../../../../asset/img/common/discuss.png');
      // }
      .list_p1,
      .list_p2 {
        float: left;
        width: 80%;
        height: 50%;
        line-height: 2;
        text-indent: 20px;
      }
      .list_p1 {
        color: #3e3e3e;
        font-weight: 600;
      }
      .list_p2 {
        font-size: 14px;
      }
    }
  }

  .allTopics {
    margin-top: 30px;
    font-size: 16px;
    .allTopics_title {
      padding: 10px 0;
      border-bottom: 1px solid #CCCCCC;
    }
    .allTopics_ul {
      font-size: 14px;
      .allTopics_list {
        min-height: 100px;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px dashed #CACACA;
        .allTopics_p1,
        .allTopics_p2,
        .allTopics_p3 {
          height: 35%;
          font-size: 14px;
          line-height: 2;
          word-wrap: break-word;
          word-break: break-all;
        }
        .allTopics_p1 {
          &:hover {
            color: #00a0e9;
          }
        }
        .allTopics_p2 {
          font-size: 12px;
          span {
            display: inline-block;
          }
          .time {
            margin-left: 12px;
          }
        }
        .allTopics_p3 {
          font-size: 12px;
          text-align: right;
          color: #AAAAAA;
          span {
            display: inline-block;
            min-width: 50px;
            margin-right: 10px;
            text-align: left;
          }
        }
      }
    }
    .no-data {
      font-size: 12px;
    }
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
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
