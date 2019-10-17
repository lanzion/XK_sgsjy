<template>
  <div class="street-lagou__list">
    <v-service v-if="type == '1'"></v-service>
    <v-requirement v-else></v-requirement>
  </div>
</template>

<script>
  import requirement from './requirement.vue'
  import service from './service.vue'

  export default {
    name: 'streetLagouList',
    components: {
      'v-requirement': requirement,
      'v-service': service
    },
    data() {
      return {
        type: this.$route.params.type
      }
    }
  }
</script>

<style>
  .street-lagou__list {
    /*margin-top: 30px;*/
  }
</style>


