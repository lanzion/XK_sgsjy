<script>
  import Requirement from './requirement.vue'
  import Service from './service.vue'

  export default {
    name: 'streetLagouList',

    render(h) {
      const template = <div class="street-lagou__list"></div>
      const {type} = this.$route.params

      template.children.push(type === '1' && <Service/> || <Requirement/>)
      return template
    }
  }
</script>
<style>
  .street-lagou__list {
    // margin-top: 30px;
  }
  /*.stree-works__list #works{
    background-color: #eee;
  }*/
</style>


