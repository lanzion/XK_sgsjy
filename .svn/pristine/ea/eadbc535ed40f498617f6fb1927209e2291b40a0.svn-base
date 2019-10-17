<script>
  import BusPlan from './business_plan.vue'
  import FinancingCase from './financing_case.vue'

  export default {
    name: 'streetCooperationList',

    render(h) {
      const {type} = this.$route.params

      return (
        <div class="street-cooperation__list">
          {type === 'plan' ? <BusPlan/> : <FinancingCase/>}
        </div>
      )
    }
  }
</script>
<style>
  .street-cooperation__list {
    margin-top: 30px;
  }
  /*.stree-works__list #works{
    background-color: #eee;
  }*/
</style>


