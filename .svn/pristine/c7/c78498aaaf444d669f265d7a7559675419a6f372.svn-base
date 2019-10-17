<template>
  <div class="wrapper pr dpd15">
    <div v-if="!isEditing" class="outline-wrapper">
      <ul v-if="courseData.length !== 0" class="chapters">
        <li v-for="(chapter, index) in courseData" :key="index" class="chapter-item">
          <h3 class="chapter">
            {{chapter.name}}
            <span v-if="Array.isArray(chapter.courseHourSectionList) && chapter.courseHourSectionList.length && isAdmin"
                  class="section-num fr">共{{chapter.courseHourSectionList.length}}个课时</span>
          </h3>
          <ul class="sections">
            <li v-if="Array.isArray(chapter.courseHourSectionList)"
                v-for="(section, i) in chapter.courseHourSectionList"
                :key="i" class="section-item">
              <i v-if="section.status !== 0 && !isAdmin" class="icon-has-learned icon-form-correct"></i>
              <a class="section fl" href="javascript:;"><span
                v-if="isAdmin">【{{handleSectionType(section.sectionType)}}】</span>{{section.name}}</a>
              <template v-if="!isAdmin && loginUId != courseInfo.createId">
                <div v-if="!$route.path.startsWith('/space/course')" class="operate fr">
                  <div v-if="section.status === 0" class="operate-has-not-learned">
                    <a v-if="section.sectionType === '2'"
                       @click="goToStudy({sectionId: section.id, type: section.sectionType})"
                       class="link" href="javascript:;" title="练习"><i class="icon-btn-link"></i></a>
                    <a v-else-if="section.sectionType === '1'"
                       @click="goToStudy({sectionId: section.id, type: section.sectionType})"
                       class="video" href="javascript:;" title="视频"><i class="icon-btn-watch"></i></a>
                    <span class="time">{{section.duration}}</span>
                  </div>
                  <div v-else class="operate-has-learned">
                    <p v-if="section.sectionType === '2'" class="can-test-again">
                      <a
                        @click="goToStudy({sectionId: section.id, type: section.sectionType, lastResult: true})"
                        href="javascript:;" class="btn-last-test-result btn">上次结果</a>
                      <a
                        @click="goToStudy({sectionId: section.id, type: section.sectionType})"
                        href="javascript:;" class="btn-test-again" title="再次练习"><i class="icon-btn-link"></i></a>
                    </p>
                    <a v-else-if="section.sectionType === '1'"
                       @click="goToStudy({sectionId: section.id, type: section.sectionType})"
                       href="javascript:;" class="btn-learn-again" title="再次学习"><i class="icon-btn-watch"></i></a>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </li>
      </ul>
      <p v-else class="no-data">暂无数据</p>
    </div>
    <course-release-add v-else @on-cancel-editing="isEditing = false" @on-edit-success="handleEditSuccess"
                        v-bind="{editCourseData, firstStepData}"/>
    <a v-if="isAdmin && !isEditing" @click="isEditing = true" href="javascript:;" class="btn-edit pa">编辑目录</a>
  </div>
</template>

<script>
  import { requestBackendCourseInfo } from '@/service/course.js'
  import { mapState, mapActions } from 'vuex'
  import courseReleaseAdd from 'components/admin/backstage/course/course_release_add.vue'

  export default {
    name: 'courseOutline', // 课程目录
    inheritAttrs: false,
    data () {
      return {
        editCourseData: {},
        firstStepData: {},
        id: this.$route.query.id,
        isEditing: false,
        isAdmin: this.$route.path.startsWith('/admin'), // 个人后台
        loginUId: ''
      }
    },
    props: {
      hasRegistered: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState('course', {courseData: 'courseOutline'}),
      ...mapState('course', {courseInfo: 'courseDetail'})
    },
    created () {
      this.loginUId = this.$ls.get('loginUId') ? this.$ls.get('loginUId') : ''
      this.isAdmin && this.requestCourseDetail()
    },
    components: {
      courseReleaseAdd
    },
    methods: {
      ...mapActions('course', ['requestOutline']),

      async requestCourseDetail () { // 修改目录，获取对应id课程的数据
        const id = this.id
        if (id) {
          let res = await requestBackendCourseInfo({id})
          if (res.data.code === 200) {
            this.editCourseData = res.data.entity || {}
            this.initData()
          }
        }
      },
      checkRegisteredOrNot () { // 检查是否报名了该课程
        if (this.hasRegistered) return true

        this.$message('您还未报名该课程，请先报名')
        return false
      },
      goToStudy ({type, sectionId, lastResult} = {}) { // 去学习
        window.scrollTo(0, 0)
        // console.log(location.href)
        const isBackAdmin = location.href.includes('admin.html')
        if (isBackAdmin || this.checkRegisteredOrNot()) {
          let _path = '/'+(isBackAdmin ? 'space' : 'education')+'/course/detail' + (type === '1' ? '/video/outline' : '/test')
          lastResult && (_path += '/a')
          this.$router.push({path: _path, query: {id: this.id, sectionId}})
        }
      },
      handleEditSuccess () { // 成功修改课程目录，重置数据
        this.requestOutline({courseId: this.id, userId: this.$ls.get('loginUId')})
        this.isEditing = false
        this.requestCourseDetail()
      },
      handleSectionType (i) { // 处理课时类型
        let source = {1: '录播', 2: '练习', 3: '直播'}
        return source[i]
      },
      initData () { // 修改目录，课程基本信息
        let _data = this.editCourseData
        if (_data.id) {
          const obj = {}
          obj.name = _data.name || ''
          obj.teacherId = _data.teacherId || ''
          obj.target = _data.target || ''
          obj.content = _data.content || ''
          obj.cover = _data.cover || ''
          obj.courseType = (_data.courseType || '').split('-')
          obj.technologyRelationList = (_data.technologyRelationList || []).map(item => item.technologyId)
          obj.grade = _data.grade || ''
          obj.fit = (_data.fit || '').split(',')
          obj.isFree = _data.isFree === null ? '' : _data.isFree
          this.firstStepData = obj
        }
      },
    }
  }
</script>

<style lang='scss' scoped>
  @import '../../../../../asset/scss/vars';

  $theme-color: #41C36F;
  .outline-wrapper {
    counter-reset: chapter;
    color: #3e3e3e;
    font-size: 14px;
    .chapter {
      position: relative;
      height: 38px;
      line-height: 38px;
      padding-left: 70px;
      background: #f0f0f0;
      font-weight: bold;
      padding-right: 12px;
      &:before {
        position: absolute;
        left: 12px;
        top: 0;
        height: 100%;
        content: '第' counter(chapter, upper-roman) '章';
        content: '第' counter(chapter, cjk-ideographic) '章';
        counter-increment: chapter;
        margin-right: 20px;
        letter-spacing: 1px;
      }
    }
    .sections {
      counter-reset: section;
      .section-item {
        position: relative;
        height: 38px;
        line-height: 38px;
        padding-left: 70px;
        &:hover {
          background: #e2fadd;
        }
        .icon-has-learned {
          position: absolute;
          left: 42px;
          top: 10px;
          font-size: 18px;
        }
        .section {
          cursor: default;
          &:before {
            content: '课时' counter(section);
            counter-increment: section;
            margin-right: 12px;
          }
        }
        .operate {
          height: 38px;
          .operate-has-learned .btn {
            display: inline-block;
            width: 68px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            padding: 2px 4px;
          }
          .operate-has-learned,.operate-has-not-learned {
            padding-right: 18px;
          }
          .btn-last-test-result {
            margin-right: 6px;
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
    }
    .no-data {
      font-size: 12px;
    }
  }

  .is-admin .outline-wrapper .section-item:hover {
    background: #ffefef;
  }

  .is-admin .btn-edit {
    box-sizing: border-box;
    right: 15px;
    top: -56px;
    width: 90px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
  }

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .operate-has-learned .btn {
        border: 1px solid $color-value;
        color: $color-value;
      }
      .is-admin .btn-edit {
        border: 1px solid $color-value;
        color: $color-value;
        &:hover{
          color: #fff;
          background-color: $color-value;
        }
      }
    }
  }
</style>
