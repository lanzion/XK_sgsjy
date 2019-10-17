<template>
  <div class="backend-course__checked">
    <div class="options">
      <multi-select class="mr10" :selectData="category" model="course" :ifAll="false" :clearable="true"
                    style="width:175px;display:inline-block;"></multi-select>
      <single-select class="mr10" :selected.sync="selected.technologyId"
                     :single-select-data="{groupCode: 'technicalClassification', placeholder: '选择技术'}"
                     style="width:175px;"></single-select>
      <single-select class="mr10" :selected.sync="selected.grade"
                     :single-select-data="{groupCode: 'courseGrade', placeholder: '选择级别'}"
                     style="width:175px;"></single-select>
    </div>
    <div class="course-wrapper">
      <ul>
        <li v-for="(course, index) in courses" :key="index" class="course-item table-layout">
          <figure class="pic table-cell">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(course.cover) || listDefault})` }"></div>
            <!-- <img :src="getFileUrl(course.cover) || listDefault" alt="" width="264" height="172" /> -->
          </figure>
          <div class="course-info table-cell">
            <h3 class="course-name">
              <router-link :to="{path: '/admin/course/detail', query: {id: course.id}}" class="link"
                           href="javascript:;">{{course.name}}

              </router-link>
            </h3>
            <p class="desc">{{course.content | textOverflow(50, '...')}}</p>
            <p class="other-info">
              <span class="category">分类：{{course.courseTypeName}}</span><span
              class="level">级别：{{course.grade}}</span><span
              class="apply-to">适合学生：{{course.fit}}</span>
            </p>
            <p class="student-num">学员：<em>{{course.num}}</em></p>
          </div>

        </li>
      </ul>
      <p v-if="!courses.length" class="no-data">暂无数据</p>
      <pagination :param='pageParam' :change-page="requestList"></pagination>
    </div>
  </div>

</template>

<script>
  import { requestPubSearch, requestDictComb } from '@/service/common.js'
  import { requestBackendListOfTeacher } from '@/service/course.js'
  import { mapActions, mapState } from 'vuex'
  import pagination from 'components/common/pagination.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import singleSelect from '@/components/common/select/single_select.vue'

  export default {
    name: 'backendCourseChecked', // 后台已审课程
    data () {
      return {
        category: [], // 分类
        courses: [], // 课程列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          courseType: '',
          grade: null,
          isTeacherAudit: '1', // 审核列表（0.待审核,1.已审核）
          technologyId: null,
          name: ''
        },
      }
    },
    components: {
      pagination,
      multiSelect,
      singleSelect
    },
    props: {
      keyWords: { // 搜索关键词
        type: String,
        default: ''
      }
    },
    created () {
      this.requestList()
    },
    methods: {
      async requestList () { // 获取列表数据
        const res = await requestBackendListOfTeacher({
          ...this.pageParam,
          ...this.selected,
          courseType: this.category.join('-'),
        })

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum = 0} = res.data.entity || {}
          this.courses = resultData || []
          this.pageParam.totalNum = totalNum
          this.$emit('on-set-total', totalNum)
          this.courses.forEach(item => {
            this.dataTranslation(item.grade, 'courseGrade', {key: 'id'}).then(res => item.grade = res)
            this.dataTranslation(item.fit, 'periodKey').then(res => item.fit = res)
          })
        }
      },
      handleFitTo (i) {
        const source = {1: '小学', 2: '初中', 3: '高中'}
        return source[i]
      }
    },
    watch: {
      category: {
        handler: function (val) {
          this.requestList()
        },
        deep: true
      },
      keyWords (val) {
        this.selected.name = val
      },
      selected: {
        handler: function (val) {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
  .mr10 {
    margin-right: 10px;
  }
  .backend-course__checked{
    padding: 5px 15px 15px;
  }
  .options {
    // margin-top: 8px;
    .select {
      width: 142px;
      height: 30px;
      margin-right: 14px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .course-wrapper .course-item {
    box-sizing: border-box;
    height: 220px;
    border-bottom: 1px dashed #c9c9c9;
    .pic {
      width: 264px;
      height: 172px;
      .bg-img__wrap {
        width: inherit;
        height: inherit;
      }
    }
    .course-info {
      width: 72%;
      padding-left: 20px;
      padding-right: 100px;
    }
    .link {
      font-size: 22px;
      &:hover {
        color: $default-color;
      }
    }
    .desc {
      line-height: 1.3;
      margin: 20px 0 40px;
      font-size: 14px;
      word-wrap: break-word;
    }
    .other-info {
      font-size: 0;
      span {
        font-size: 14px;
        color: #999;
        padding: 0 16px;
        border-right: 1px solid #c9c9c9;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: 0;
        }
      }
    }
    .student-num {
      margin-top: 16px;
      font-size: 14px;
      em {
        color: #00a0e9;
      }
    }
  }
</style>
