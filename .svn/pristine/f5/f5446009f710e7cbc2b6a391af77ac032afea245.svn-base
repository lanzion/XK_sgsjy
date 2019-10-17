<template>
  <div id="myDynamic">
      <div class="fl content-left">
        <aside class="fr">
          <person-msg v-bind="{detailInfo, relatedData}"></person-msg>
        </aside>
        <v-person-dynamic class="dynamic-box fl"></v-person-dynamic>
      </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import tabs from "Common/classificationList/classification/tabs.vue"
  import personMsg from 'Common/side/person_msg.vue'
  import personDynamic from '@/view/space/person/children/dynamic.vue'
  export default {
    name: 'myDynamic',
    components: {
      'v-tab': tabs,
      'person-msg': personMsg,
      'v-person-dynamic': personDynamic
    },
    data () {
      return {}
    },
    created () {
      const isStudent = this.$ls.get('userIdentity') === 'student'
      this.requestRelatedData({isStudent})
    },
    computed: {
      ...mapState('teacherAndStudent', ['detailInfo', 'relatedData'])
    },
    methods: {
      ...mapActions('teacherAndStudent', ['requestRelatedData']),
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .dynamic-box {
    width: 686px;
    margin-right: 20px;
  }
</style>
