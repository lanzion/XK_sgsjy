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
      <div class="btn-row text-center" v-if="!isAdmin">
        <button @click="handleFollow(queryUId, hasFollowed)" :title="hasFollowed ? '取消关注' : '关注'" class="btn-follow active-btn btn">
          <i class="icon-btn-i-follow2" v-if="!hasFollowed">关注</i><span class="btn-txt" v-else>已关注</span>
        </button>
        <button @click="openDialog" class="btn-contact active-btn btn pr" title="发私信">
          <i class="icon-btn-chat"></i><span class="btn-txt">私信</span>
        </button>
        <div v-if="loginIdentity" class="invite-group">
          <button @click="inviteDialog.show = true" class="btn-contact active-btn btn pr" v-if="inviteStatus === 0" title="邀约入驻">
            <i class="icon-btn-follow"></i><span class="btn-txt">邀约入驻</span>
          </button>
          <button @click="openTips(inviteStatus)" class="btn-contact active-btn btn pr" v-else-if="inviteStatus === 6" title="再次邀约">
            <span class="btn-txt">邀约已拒绝</span>
          </button>
          <button class="btn-contact disabled-btn btn pr" v-else>
            <span class="btn-txt">{{memberType[inviteStatus]}}</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isAdmin ? hasAdminVisitor : true" class="visitors div-group">
      <h5 class="title">
        <span class="fl">{{isAdmin ? '我的访客' : 'TA的访客'}}</span>
        <a @click="showMore('visitor')" class="more fr" href="javascript:;">更多></a>
      </h5>
      <ul v-if="visitors.length" class="visitor-wrapper clearfix">
        <li v-for="(item, i) in visitors" :key="i" @click="toPersonSpace(item.identity,item.orgId,item.userId)" class="visitor-item text-center">
          <figure class="avatar pr">
            <img :src="getFileUrl(item.face) || faceDefault" alt="" width="50" height="50">
            <figcaption class="visitor-name ellipsis pa">{{item.name || item.userName || '暂无'}}</figcaption>
          </figure>
          <p class="visit-date">{{item.createDate | dateFormat('M月d日')}}</p>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
    </div>
    <div v-if="isAdmin ? hasAdminInterest : true" class="interests div-group">
      <h5 class="title">
        <span class="fl">{{isAdmin ? '我的兴趣组' : 'TA的兴趣组'}}</span>
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
    <invite-dialog :inviteDialog.sync="inviteDialog" :userId="$route.query.uid" @callback="changeStatus"></invite-dialog>
    <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
  </div>
</template>

<script>
  import { requestDetailOfTeacher } from '@/service/space_teacher.js'
  import { requestDetailOfStudent } from '@/service/space_student.js'
  import { queryHasFollowedORNot, requestUserBaseInfo } from '@/service/common.js'
  import { requestMyInterestList } from '@/service/interest.js'
  import { mapState, mapActions } from 'vuex'
  import { visitor, follow } from '@/mixin/teacherAndStudent.js'
  import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
  import inviteDialog from '@/components/common/popupWindow/invite_dialog.vue'
  import { judgeMultMember } from '@/service/mult.js'

  export default {
    name: 'personMsg', // 教师、学生空间侧边栏

    inheritAttrs: false,

    mixins: [visitor, follow],

    props: ['detailInfo', 'relatedData'],

    data () {
      return {
        inviteDialog: { show: false },  //邀请入驻弹窗显示控制
        dialog: { isVisible: false },
        hasAdminInterest: false, // 个人空间是否有兴趣组权限
        hasAdminVisitor: false, // 个人空间是否有访客权限
        hasFollowed: false, // 是否关注
        interests: [],
        visitors: [],
        loginIdentity: this.$ls.get('userIdentity') === 'mult',    //判断登录用户身份是不是众创空间
        inviteStatus: null,          //判断邀请入驻状态
        memberType: {
          '1': '已申请',
          '2': '已入驻',
          '3': '申请已拒绝',
          '4': '邀请中',
          '5': '已同意',
          '7': '已是成员'
        }
      }
    },

    created () {
      this.initData()
      this.judgeMultMember()
    },

    components: {
      sendPrivateLetter,
      inviteDialog
    },

    methods: {
      ...mapActions('teacherAndStudent', ['requestRelatedData']),

      initData () {
        const {uid} = this.$route.query
        const loginUId = this.$ls.get('loginUId', '')
        const pageOptions = {pageNum: 1, pageSize: 12}
        this.queryUId = uid
        this.loginUId = loginUId
        this.isStudent = this.isAdmin ? this.$ls.get('userIdentity') === 'student' : this.$route.path.includes('student')

        if (this.isAdmin) {
          this.initPanelData()
          this.hasAdminInterest && this.requestInterestList()
          this.hasAdminVisitor && this.requestVisitorList({userId: loginUId}, pageOptions)
        } else {
          loginUId && this.queryHasFollowedORNot()
          this.requestInterestList()
          this.requestVisitorList({userId: uid}, pageOptions)
        }
      },

      async requestInterestList () { // 获取TA的兴趣组数据
        const userId = this.isAdmin ? this.loginUId : this.queryUId
        const auditStatus = 1
        const res = await requestMyInterestList({userId, auditStatus}, {pageSize: 5, pageNum: 1})

        if (res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.interests = resultData || []
        }
      },

      async queryHasFollowedORNot () { // 查询是否关注
        const res = await queryHasFollowedORNot({
          followUser: this.loginUId,
          followedUserId: this.queryUId,
        })

        if (res.data.code === 200) {
          this.hasFollowed = res.data.entity || false // true已关注
        }
      },

      handleFollow (followedUId, hasFollowed) { // 关注、取消关注
        if(this.$ls.get('loginInfo')){
          this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
            if (res) {
              this.requestRelatedData({isStudent: this.isStudent, id: this.queryUId})
              this.queryHasFollowedORNot()
            }
          })
        }else{
          this.$store.commit('toggleLoginModal', true);
        }
      },
      // 打开发私信弹窗
      openDialog(){
        if(this.$ls.get('loginInfo')){
          this.dialog.isVisible = true
        }else{
          this.$store.commit('toggleLoginModal', true);
        }
      },

      initPanelData () { // 个人空间后台，初始化右边栏，是否显示我的访客，我的兴趣组
        const permission = this.$ls.get('permission', {})
        const groupObj = permission[this.isStudent && 'student' || 'teacher'] || {}
        const maxLen = 2
        let count = 0

        Object.keys(groupObj).forEach(group => {
          if (!Array.isArray(groupObj[group])) return false

          groupObj[group].find(item => {
            if (item.url === '/admin/interest') {
              this.hasAdminInterest = true
              count++
            } else if (item.url === '/admin/visitor') {
              this.hasAdminVisitor = true
              count++
            }

            if (count >= maxLen) return true
          })
        })
      },

      showMore (label) { // 展示更多访客、兴趣组
        this.isAdmin ? this.$router.push({path: `/admin/${label}`}) : this.$emit('on-show-more', label)
      },
      /*进入兴趣组*/
      toInterestDetail(id){
        this.$router.push({path:'/interestsSpace/homePage',query:{id:id}});
      },
      /*进入个人空间*/
      toPersonSpace(identity,orgId,uid){
        let routePath,query,id
        switch(identity){
          case '0':
            routePath = '/space/student/dynamic';
            query = {id:orgId,uid:uid};
            break;
          case '1':
            routePath = '/space/teacher/dynamic';
            query = {id:orgId,uid:uid};
            break;
          case '2':
            routePath = '/investor/detail';
            query = {id:orgId};
            break;
          case '3':
            routePath = '/investOrg/detail';
            query = {id:orgId};
            break;
          case '4':
            routePath = '/enterprise/detail';
            query = {id:orgId};
            break;
          case '11':
            routePath = '/multSpace/detail';
            query = {id:orgId};
            break;
        };
        this.$router.push({path:routePath,query:query});
        this.$emit('on-switch-user')
      },
      /*众创空间用户登录时查看其它用户空间时，判断当前查看的用户入驻情况*/
      judgeMultMember () {
          if (this.loginIdentity) {
              const params = { id: this.$ls.get('baseInfo').baseInfo.id, userId: this.$route.query.uid }
              judgeMultMember(params).then((res) => {
                  if (res.data.code === 200) {
                      this.inviteStatus = res.data.entity
                  }
              })
          }
      },
      // 拒绝后再次申请/邀请的提示
      openTips(status) {
          const tips = status == 3 ? '申请' : '邀请'
          this.$confirm(`${tips}入驻已被拒绝, 是否再次${tips}?`, '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              customClass: '__custom-msg-box'
          }).then(() => {
              if (status == 3) {
                  this.ifLogin('applyPopup')
              } else {
                  this.inviteDialog.show = true
              }
          }).catch(() => {
          });
      },
      //邀约成功后改变状态
      changeStatus() {
          this.inviteStatus = 4
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
@import '~@/asset/scss/vars.scss';
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
        color: $default-color;
        i {
          color: $default-color;
        }
      }
      &:hover {
        color: $default-color;
        border-color: $default-color;
        [class^="icon-btn-"] {
          color: $default-color;
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
          color: $default-color;
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
        color: $default-color;
      }
    }
  }

  .no-data {
    height: 152px;
    font-size: 0;
  }
</style>
