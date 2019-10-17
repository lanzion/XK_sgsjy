<script>
  import CourseList from '@/view/space/edu/course/course.vue'

  export default {
    name: 'eduCourseList',

    data () {
      return {}
    },

    beforeRouteLeave (to, from, next) {
      this.$store.commit('edu/setSelectedField', {})
      next()
    },

    render(h) {
      return (
        <div class="edu-course__list">
          <CourseList/>
        </div>
      )
    }
  }
</script>
<style>
  .edu-course__list {
    // margin-top: 30px;
  }
</style>


