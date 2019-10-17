<template>
  <div class="person-list-wrapper">
    <ul id="personList" class="tabs-person-list" v-if="datas.length > 0">
      <li v-for="(item, index) in datas" :key="index" class="tabs-person-item clearfix">
        <router-link :to="{ path: pathUrl, query: { id: isGlory ? item.id : item.teacherId || item.studentId, uid: item.userId} }" class="head-face circle" :style='{backgroundImage: "url(" + (getFileUrl(item.userImage) || getFileUrl(item.cover) || faceDefault) + ")"}'></router-link>
        <article class="person-content">
          <router-link :to="{ path: pathUrl, query: { id: isGlory ? item.id : item.teacherId || item.studentId, uid: item.userId} }" class="person-title">
            {{item.userName || item.teacherName || item.name}}（{{item.schoolName || '无学校名称'}}）
          </router-link>
          <ul class="cols-list b-gray">
            <li class="cols-item">
              <dd class="cols-item-title">作品</dd>
              <dt class="cols-item-result">{{item.workNum || item.worksCount || 0}}</dt>
            </li>
            <li class="cols-item">
              <dd class="cols-item-title">学习</dd>
              <dt class="cols-item-result">{{item.studyNum || item.studyCount || 0}}</dt>
            </li>
            <li class="cols-item">
              <dd class="cols-item-title">实践</dd>
              <dt class="cols-item-result">{{item.practiceNum || item.practiceCount || 0}}</dt>
            </li>
            <li class="cols-item">
              <dd class="cols-item-title">资源</dd>
              <dt class="cols-item-result">{{item.collectionNum || item.resourceCount || 0}}</dt>
            </li>
          </ul>
          <div class="btn-group">
            <a @click.stop="handleFollow(item.userId, !!item.follow, !!item.studentId)" class="btn-red i-button fl">
              <i class="icon-btn-i-follow"></i>{{item.follow && '取消' || ''}}关注
            </a>
            <a @click="showPrivateLetterDialog(item.userId)" class="btn-red i-button">
              <i class="icon-btn-i-prichat"></i>私信
            </a>
          </div>
        </article>
      </li>
    </ul>
    <div v-else class="isNull-list">
      暂无推荐
    </div>
    <send-private-letter v-if="dialog.isVisible" :dialog="dialog" />
  </div>
</template>

<script>
  import { queryHasFollowedORNot } from '@/service/common.js'
  import {follow, privateLetter} from '@/mixin/teacherAndStudent.js'
  import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'

export default {
    name : 'personList',
    mixins: [follow, privateLetter], // 关注和私信，公共mixins
    data() {
        return{
            dialog: {isVisible: false},
            items: []
        }
    },
    props: {
        datas: {
            type: Array,
            default: []
        },
        pathUrl: {
            type: String,
            default: 'studentSpace'
        },
        handleRequest: {
            type: Function
        },
        isGlory: {
            type: Boolean,
            default: false
        }
    },
    components: {
      sendPrivateLetter,
    },
    mounted() {
    },
    methods: {
      handleFollow (followedUId, hasFollowed, isStudent) { // 关注、取消关注
        this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
          // 关注、取消关注成功后，重新获取列表
          res && this.handleRequest(isStudent ? '0' : '1')
        })
      },
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/tabs.scss';
@import '~@/assets/css/scss/cols.scss';
$head-size: 60px;
$list-item-padding: 8px;
$box-padding: 10px;
.isNull-list {
    margin: 0 #{$box-padding};
    border: none;
}
.tabs-person-list {
    margin: -#{$list-item-padding} 0 -1px;
    .tabs-person-item {
        padding: $list-item-padding 0;
        & + .tabs-person-item {
            border-top: 1px dashed #c9c9c9;
        }

    }
    .head-face {
        float: left;
        display: inline-block;
        width: $head-size;
        height: $head-size;
        margin: 10px 12px 0 0;
    }

    .person-content {
        overflow: hidden;

        .person-title {
            display: inherit;
            font-size: 14px;
            line-height: 2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .cols-item {
            line-height: 1.2;
            color: #999;
        }
    }

    .btn-group {
        line-height: 2;

        a.btn-red {
            margin-right: 16px;
            vertical-align: baseline;

            &:hover {
                color: $theme_color;
            }
        }
    }
}
</style>
