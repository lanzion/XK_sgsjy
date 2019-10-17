<template>
    <div>
        <v-project-intro :projectDetail="projectDetail" :status.sync="status" style="borderRadius: .5em;"></v-project-intro>
        <v-repertoire style="marginTop:20px;borderRadius: .5em;"></v-repertoire>
    </div>
</template>

<script>
import intro from 'components/project/project_intro.vue'
import { detailProject } from '@/service/project.js'
import repertoire from 'components/project/projectDetail_repertoire.vue'
export default {
    data () {
        return {
            projectDetail: {},
            status: {num:''},
        }
    },
    components: {
        'v-project-intro': intro,
        'v-repertoire': repertoire
    },
    created() {
        this.getDate()
        // this.router.query = this.$route.query;
    },
    methods: {
        // 请求数据
        getDate () {
            detailProject({ 'id': this.$route.query.id }).then( res => {
                if(res.data.code === 200){
                    this.projectDetail = res.data.entity
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>