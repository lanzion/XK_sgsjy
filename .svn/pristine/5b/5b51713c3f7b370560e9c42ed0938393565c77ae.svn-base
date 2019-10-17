<template>
  <div id="person_msg">
    <div class="person-info text-center">
      <figure class="head" :style="{backgroundImage: `url(${bgDefault})`}">
        <img class="avatar" :src="getFileUrl(detailInfo.face) || faceDefault" width="50" height="50">
      </figure>
      <h5 class="person-name">{{detailInfo.name || '暂无'}}（{{isStudent && '学生' || '教师'}}）</h5>
      <!--<p class="teaching">{{detailInfo.teaching}}</p>-->
      <p class="school-name">{{detailInfo.schoolName || '暂无学校名称'}}</p>
      <p class="fans">关注：{{relatedData.attentionNum || 0}}  |  粉丝：{{relatedData.fansNum || 0}}</p>
      <ul class="other-info clearfix">
        <li class="info-item">
          <p class="ti">学习</p>
          <p class="num">{{relatedData.studyNum || 0}}</p>
        </li>
        <li v-if="isStudent" class="info-item">
          <p class="ti">实践</p>
          <p class="num">{{relatedData.practiceNum || 0}}</p>
        </li>
        <li v-else class="info-item">
          <p class="ti">指导</p>
          <p class="num">{{relatedData.guidanceNum || 0}}</p>
        </li>
        <li class="info-item">
          <p class="ti">作品</p>
          <p class="num">{{relatedData.productionNum || 0}}</p>
        </li>
        <li class="info-item">
          <p class="ti">资源</p>
          <p class="num">{{relatedData.resouceNum || 0}}</p>
        </li>
      </ul>
    </div>
    <div class="visitors div-group">
      <h5 class="title">
        <span class="fl">我的访客</span>
        <a @click="showMore('visitor')" class="more fr" href="javascript:;">更多></a>
      </h5>
      <ul v-if="visitors.length" class="visitor-wrapper clearfix">
        <li v-for="(item, i) in visitors" :key="i" @click="toPersonDetail(item)" class="visitor-item text-center">
          <figure class="avatar pr">
            <img :src="getFileUrl(item.face) || faceDefault" alt="" width="50" height="50">
            <figcaption class="visitor-name ellipsis pa">{{item.name || item.userName || '暂无'}}</figcaption>
          </figure>
          <p class="visit-date">{{item.createDate | dateFormat('M月d日')}}</p>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
    </div>
    <div class="interests div-group">
      <h5 class="title">
        <span class="fl">我的兴趣组</span>
        <a @click="showMore('interest')" class="more fr" href="javascript:;">更多></a>
      </h5>
      <ul v-if="interests.length" class="interest-wrapper">
        <li v-for="(item, i) in interests" :key="i" class="interest-item table-layout">
          <figure class="avatar table-cell">
            <img :src="getFileUrl(item.cover) || listDefault" alt="" width="60" height="60" @click="toInterestDetail(item.id)">
          </figure>
          <p class="interest-name table-cell" @click="toInterestDetail(item.id)" :title="item.name">{{item.name || '暂无名称'}}</p>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
    </div>
  </div>
</template>

<script>
import { requestMyInterestList } from '@/service/interest.js'
import { visitor, follow } from '@/mixin/teacherAndStudent.js'

export default {
    name: 'personMsg', // 教师、学生空间侧边栏
    inheritAttrs: false,
    mixins: [visitor, follow],
    props: ['detailInfo', 'relatedData'],
    data() {
        return {
            hasAdminInterest: false, // 个人空间是否有兴趣组权限
            hasAdminVisitor: false, // 个人空间是否有访客权限
            hasFollowed: false, // 是否关注
            interests: [],
            visitors: [],
        }
    },
    created() {
        this.initData()
    },
    components: {},
    methods: {
        initData() {
            const { uid } = this.$route.query
            const loginUId = this.$ls.get('loginUId', '')
            const pageOptions = { pageNum: 1, pageSize: 12 }
            this.queryUId = uid
            this.loginUId = loginUId
            this.isStudent = this.$ls.get('userIdentity') === 'student'
            this.initPanelData()
            this.hasAdminInterest && this.requestInterestList()
            this.hasAdminVisitor && this.requestVisitorList({ userId: loginUId }, pageOptions)
        },
        async requestInterestList() { // 获取TA的兴趣组数据
            const userId = this.loginUId
            const auditStatus = 1
            const res = await requestMyInterestList({ userId, auditStatus }, { pageSize: 5, pageNum: 1 })
            if (res.data.code === 200) {
                const { resultData } = res.data.entity || {}
                this.interests = resultData || []
            }
        },
        initPanelData() { // 个人空间后台，初始化右边栏，是否显示我的访客，我的兴趣组
            const permission = this.$ls.get('permission', {})
            const groupObj = permission[this.isStudent && 'student' || 'teacher'] || {}
            const maxLen = 2
            let count = 0
            Object.keys(groupObj).forEach((group) => {
                if (!Array.isArray(groupObj[group])) return false
                groupObj[group].find((item) => {
                    if (item.url === '/admin/interest') {
                        this.hasAdminInterest = true
                        count++
                    } else if (item.url === '/admin/visitor') {
                        this.hasAdminVisitor = true
                        count++
                    }
                    if (count >= maxLen) return true
                    return false
                })
            })
        },
        showMore(label) { // 展示更多访客、兴趣组
            this.$router.push({ path: `/admin/${label}` })
        },
        // 进入兴趣组
        toInterestDetail(id) {
            this.redirect(this.pages.detail.interest, { query: { id: id } })
        }
    }
}
</script>

<style lang="scss">
  #person_msg {
    .el-dialog {
      width: 560px;
    }
  }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
  * {
    box-sizing: border-box;
  }

  #person_msg {
    width: 274px;
  }

  .text-center {
    text-align: center;
  }

  .person-info {
    font-size: 12px;
    background-color: #fff;
    padding-bottom: 14px;
    margin-bottom: 20px;
    .head {
      height: 64px;
      background-repeat: no-repeat;
      background-size: 100% 64px;
      // background-color: #4191b4;
      // background-image: linear-gradient(to top, #3a85ad, #4fa9c2);
      padding-top: 26px;
      margin-bottom: 18px;
      .avatar {
        margin: 0 auto;
        border-radius: 50%;
      }
    }
    .person-name {
      font-size: 14px;
      margin-bottom: 4px;
    }
    .fans {
      color: #999;
      margin-top: 4px;
    }
    .other-info {
      width: 240px;
      margin: 14px auto;
    }
    .info-item {
      float: left;
      line-height: 1;
      width: 60px;
      padding: 0 8px;
      border-right: 1px solid #c9c9c9;
      text-align: center;
      .num {
        color: #999;
      }
    }
    .info-item:last-child {
      border: 0;
    }
    .btn-row {
    }
    .invite-group {
      display: inline-block;
      margin-left: 4px;
    }
    .disabled-btn {
      cursor: no-drop;
      .btn-txt {
        line-height: 26px;
        vertical-align: top;
        display: inline-block;
      }
    }
    .btn {
      width: 75px;
      height: 26px;
      font-size: 12px;
      background: #fff;
      border: 1px solid #c9c9c9;
      padding: 0;
      color: #3e3e3e;
    }
    .active-btn {
      &.has-followed {
        color: $theme_color;
        i {
          color: $theme_color;
        }
      }
      &:hover {
        color: $theme_color;
        border-color: $theme_color;
        [class^="icon-btn-"] {
          color: $theme_color;
        }
      }
      [class^="icon-btn-"] {
        margin-right: 4px;
      }
      i, .btn-txt {
        line-height: 26px;
        vertical-align: top;
        display: inline-block;
      }
      .icon-btn-chat {
        margin-right: 4px;
      }
    }
    .btn + .btn {
      margin-left: 4px;
    }
  }

  .div-group {
    background: #fff;
    .title {
      height: 38px;
      line-height: 38px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
      padding: 0 14px;
      color: #333;
      .more {
        color: #999;
        &:hover {
          color: $theme_color;
        }
      }
    }
    .avatar img {
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .div-group + .div-group {
    margin-top: 20px;
  }
  .visitor-wrapper, .interest-wrapper {
    padding: 12px 14px;
  }

  .visitor-item {
    float: left;
    width: 25%;
    margin: 5px 0px 6px 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .avatar {
      height: 50px;
    }
    .visitor-name {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      background: rgba(0, 0, 0, .5);
      font-size: 12px;
      color: #fff;
      display: none;
      cursor: pointer;
    }
    .visit-date {
      margin-top: 4px;
      font-size: 12px;
    }
  }

  .visitor-item:hover .visitor-name {
    display: block;
  }

  .interests {
    .interest-item {
      display: table;
      margin-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .interest-name {
      width: 184px;
      line-height: 1.3;
      padding-left: 10px;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
      cursor: pointer;
      &:hover{
        color: $theme_color;
      }
    }
  }

  .no-data {
    height: 152px;
    font-size: 0;
  }
</style>
