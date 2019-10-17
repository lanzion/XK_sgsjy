<script>
  import StoryList from './story.vue'

  export default {
    name: 'streetStoryList',

    render(h) {
      return (
        <div class="stree-story__list">
          <StoryList/>
        </div>
      )
    }
  }
</script>
<style>
  .stree-story__list {
    margin-top: 30px;
  }
  /*.stree-works__list #works{
    background-color: #eee;
  }*/
</style>


