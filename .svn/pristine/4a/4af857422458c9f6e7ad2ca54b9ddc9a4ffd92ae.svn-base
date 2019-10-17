<template>
    <component :is="component"></component>
</template>

<script>
    import evaluateOnline from '@/components/manage/evaluate_setting/evaluate_setting_online.vue'
    import evaluateOffline from '@/components/manage/evaluate_setting/evaluate_setting_offline.vue'

    export default {
        name: 'contestManage',
        components: {
            'v-evaluate-online': evaluateOnline,
            'v-evaluate-offline': evaluateOffline,
        },
        data() {
            return {
                component: 'v-evaluate-online'
            }
        },
        methods: {
            changeComponentByRoute() {
                let component = 'v-evaluate-online'
                switch (Number(this.$route.query.type)) {
                    case 2:
                        component = 'v-evaluate-offline'
                        break
                    default:
                        component = 'v-evaluate-online'
                }
                this.component = component
            }
        },
        watch: {
            '$route.params': {
                handler() {
                    this.changeComponentByRoute()
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>