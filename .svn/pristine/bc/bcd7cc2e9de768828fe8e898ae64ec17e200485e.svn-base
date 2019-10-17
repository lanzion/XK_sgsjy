<template>
  <div class="outline-wrapper">
    <ul class="chapters">
      <li v-for="(chapter, index) in courseOutline" :key="index" class="chapter-item">
        <h3 class="chapter ellipsis">{{chapter.name}}</h3>
        <ul class="sections">
          <li v-for="(section, i) in chapter.courseHourSectionList" @click="startStudying(section)"
              :class="{'cur-section': $route.query.sectionId === section.id}" :key="i" class="section-item">
            <a class="section ellipsis fl" href="javascript:;" :title="section.name">{{section.name}}</a>
            <p class="operate fr">
              <a v-if="section.sectionType === '2'" class="link" title="练习">
                <i class="icon-btn-link"></i>
              </a>
              <a v-else-if="section.sectionType === '1'" class="video" href="javascript:;" title="视频">
                <i class="icon-btn-watch"></i>
              </a>
              <span class="time">{{section.duration}}</span>
            </p>
          </li>
        </ul>
      </li>
      <li v-if="courseOutline.length === 0" class="no-data">暂无数据</li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'videoOutline',
    inheritAttrs: false,
    data() {
      return {
        id: this.$route.query.id
      }
    },
    computed: {
      ...mapState('course', ['courseOutline'])
    },
    created() {
    },
    methods: {
      startStudying(section) {
        let option = {id: this.id, sectionId: section.id}
        if (section.sectionType === '1') {
          this.$router.replace({path: '', query: option})
        } else if (section.sectionType === '2') {
          this.$router.push({path: '/education/course/detail/test/q', query: option})
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~@/assets/css/scss/vars.scss';

  .outline-wrapper {
    max-height: 528px;
    overflow-y: auto;
    counter-reset: chapter;
    color: #999;
    font-size: 14px;
    .chapter-item {
      margin: 8px 0;
    }
    .chapter {
      position: relative;
      height: 38px;
      line-height: 38px;
      padding-left: 56px;
      padding-right: 6px;
      &:before {
        position: absolute;
        left: 6px;
        top: 0;
        height: 100%;
        content: '第' counter(chapter, upper-roman) '章';
        content: '第' counter(chapter, cjk-ideographic) '章';
        counter-increment: chapter;
        margin-right: 8px;
      }
    }
    .sections {
      counter-reset: section;
      .section-item {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        padding-right: 4px;
        overflow: hidden;
        cursor: pointer;
        &:hover, &.cur-section {
          background: #2bbb61;
          .section, .time, .link i, .video i {
            color: #fff;
          }
        }
        .section {
          width: 75%;
          color: #999;
          font-size: 12px;
          &:before {
            content: '课时' counter(section);
            counter-increment: section;
            margin-right: 12px;
          }
        }
        .link {
          margin-right: 16px;
          font-size: 14px;
        }
        .video {
          margin-right: 14px;
          font-size: 16px;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .no-data {
      line-height: 8;
      text-align: center;
      font-size: 12px;
    }
  }

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      /*.sections .section-item:hover {
        background: $color-value;
      }*/
    }
  }
</style>
