<script>
  import ProjectList from '@/view/space/edu/project/project.vue'

  export default {
    name: 'eduProjectList',

    data () {
      return {}
    },

    beforeRouteLeave (to, from, next) {
      this.$store.commit('edu/setSelectedField', {})
      next()
    },

    render(h) {
      return (
        <div class="edu-project__list">
          <ProjectList/>
        </div>
      )
    }
  }
</script>
<style>
  .edu-project__list {
    // margin-top: 30px;
  }
</style>


