<template>
  <div id="detail" class="independentDetail">
    <h1 v-text='title' class="title"></h1>
    <time class="date">发布时间 :{{date | dateFormat('yyyy')}}-{{date | dateFormat('MM')}}-{{date | dateFormat('dd')}}</time>
    <div v-html='mes'></div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
        mes: '',
        title: '',
        date: ''
    }
  },
  props: {
    lisId: String
  },
  mounted() {
    this.$http.post('admin/notice/detail/addup', {'id':this.$route.query.id})
        .then(res => {
            this.mes = res.data.entity.content
            this.title = res.data.entity.title
            this.date = res.data.entity.publishDate
        })
  },
  ready() {
  }
}
</script>

<style lang='scss' >
@import './../../../../asset/scss/datails.scss';
</style>
