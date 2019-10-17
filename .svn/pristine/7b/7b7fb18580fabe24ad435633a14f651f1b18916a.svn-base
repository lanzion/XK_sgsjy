<template>
    <component :is="component"></component>
</template>

<script>
    import contestOnline from '@/components/contest/manage/contestManage-online.vue'
    import contestOffline from '@/components/contest/manage/contestManage-offline.vue'

    export default {
        name: 'contestManage',
        components: {
            'v-contest-online': contestOnline,
            'v-contest-offline': contestOffline,
        },
        data() {
            return {
                component: 'v-contest-online'
            }
        },
        methods: {
            changeComponentByRoute() {
                let component = 'v-contest-online'
                switch(this.$route.params.type) {
                    case 'off':
                        component = 'v-contest-offline'
                        break
                    default:
                        component = 'v-contest-online'
                }
                this.component = component
            }
        },
        watch: {
            '$route.params': {
                handler(val){
                    this.changeComponentByRoute()
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>