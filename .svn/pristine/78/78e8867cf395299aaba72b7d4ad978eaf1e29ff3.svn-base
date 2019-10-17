<template>
  <div class="backend-course__unchecked">
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
          <figure class="pic table-cell pr">
            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(course.cover) || listDefault})` }"></div>
            <!-- <img :src="getFileUrl(course.cover) || listDefault" alt="" width="264" height="172" /> -->
            <figcaption v-if="course.auditStatus === '2'" class="status fail pa">
              <span class="txt-status pa">不通过</span>
            </figcaption>
          </figure>
          <div class="course-info table-cell">
            <!-- <h3 class="course-name"><router-link :to="{path: 'release', query: {id: course.id}}" class="hover">{{course.name}}</router-link></h3> -->
            <h3 class="course-name">{{course.name}}</h3>
            <p class="desc">{{course.content | textOverflow(50, '...')}}</p>
            <p class="other-info">
              <span class="category">分类：{{course.courseTypeName}}</span><span
              class="level">级别：{{course.grade}}</span><span
              class="apply-to">适合学生：{{course.fit}}</span>
            </p>
            <button @click="showRecordDialog(course.id)" class="btn-verify-record pa">审核记录</button>
          </div>
          <operate @on-delete="deleteCourseItem(course.id)" @on-edit="editCourse(course.id)" @on-submit="submit(course.id)"
                   :icon-group="generateIconGroup(course.auditStatus)" label="课程"></operate>
        </li>
      </ul>
      <p v-if="!courses.length" class="no-data">暂无数据</p>
      <pagination :param='pageParam' :change-page="requestListOfTeacher" />
      <verify-record-dialog v-if="dialog.isVisible" v-bind="{api, dialog, curRecordId, moduleId: 'courseId'}" />
    </div>
  </div>
</template>

<script>
  import { requestBackendListOfTeacher, deleteCourse, submitCourse } from '@/service/course.js'
  import pagination from 'components/common/pagination.vue'
  import operate from '../../../../../components/common/operate.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import singleSelect from '@/components/common/select/single_select.vue'
  import verifyRecordDialog from 'components/my/verify_record_dialog.vue'

  export default {
    name: 'backendCourseUnchecked', // 后台待审课程

    data () {
      return {
        api: '/maker/course/audit/selectList',
        category: [], // 分类
        courses: [], // 课程列表
        curRecordId: '', // 当前审核记录ID
        dialog: {isVisible: false},
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          courseType: '',
          grade: null,
          isTeacherAudit: '0', // 审核列表（0.待审核,1.已审核）
          technologyId: null,
          name: ''
        }
      }
    },

    props: {
      keyWords: { // 搜索关键词
        type: String,
        default: ''
      }
    },

    created () {
      this.requestListOfTeacher()
    },

    components: {
      pagination,
      operate,
      multiSelect,
      singleSelect,
      verifyRecordDialog
    },

    methods: {

      async requestListOfTeacher () { // 获取列表数据
        const res = await requestBackendListOfTeacher({
          ...this.pageParam,
          ...this.selected,
          courseType: this.category.join('-'),
        })

        if (res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.courses = resultData || []
          this.pageParam.totalNum = totalNum || 0
          this.$emit('on-set-total', totalNum || 0)
          this.courses.forEach(item => {
            this.dataTranslation(item.grade, 'courseGrade', {key: 'id'}).then(res => item.grade = res)
            this.dataTranslation(item.fit, 'periodKey').then(res => item.fit = res)
          })
        }
      },

      deleteCourseItem (id) { // 删除课程
        const errMsg = '删除课程失败，请重试'

        deleteCourse({id}).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '成功删除课程',
              type: 'success'
            })

            this.requestListOfTeacher()
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },

      editCourse (id) { // 编辑课程
        this.$router.push({path: '/admin/course/release', query: {id}})
      },

      generateIconGroup (status) {
        const edit = status === '-1' || status === '2' ? 'edit' : ''
        const submit = edit && 'submit' || ''
        const del = edit ? 'delete' : ''
        return [edit, submit, del]
      },

      handleFitTo (i) {
        const source = {1: '小学', 2: '初中', 3: '高中'}
        return source[i]
      },

      showRecordDialog (id) { // 显示审核记录弹窗
        this.curRecordId = id
        this.dialog.isVisible = true
      },

      submit (id) { // 提交审核
        const errMsg = '提交审核失败，请重试'

        submitCourse({id}).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({
              message: '成功提交审核',
              type: 'success',
              duration: 1500
            })
            this.requestListOfTeacher()
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },
    },

    watch: {
      category: {
        handler () {
          this.requestListOfTeacher()
        },
        deep: true
      },

      keyWords (val) {
        this.selected.name = val
      },

      selected: {
        handler () {
          this.requestListOfTeacher()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
@import '~@/asset/scss/vars.scss';
  .btn-verify-record {
    box-sizing: border-box;
    right: 0;
    bottom: 60px;
    width: 96px;
    height: 32px;
    line-height: 30px;
    font-size: 14px;
    color: $default-color;
    border: 1px solid $default-color;
    text-align: center;
    padding: 0;
    &:hover {
      color: #fff;
      background-color: $default-color;
    }
  }
</style>
<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
  .mr10 {
    margin-right: 10px;
  }
  .backend-course__unchecked{
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
    position: relative;
    box-sizing: border-box;
    padding: 20px 0;
    border-bottom: 1px dashed #c9c9c9;
    .pic {
      width: 264px;
      height: 172px;
      .bg-img__wrap {
        width: inherit;
        height: inherit;
      }
      .status {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%) rotate(-45deg);
        border: 40px solid transparent;
        border-bottom-color: #46c475;
        &.fail {
          border-bottom-color: #ff4848;
        }
      }
      .txt-status {
        top: 20px;
        left: -40px;
        width: 80px;
        text-align: center;
        color: #fff;
      }
    }
    .course-info {
      padding-left: 20px;
      padding-right: 100px;
    }
    .course-name {
      font-size: 22px;
    }
    .desc {
      width: 500px;
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
  }
.hover:hover {
  color: $default-color;
}
</style>
