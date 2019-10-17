<template>
    <component :is="component"></component>
</template>

<script>
    import eventOnline from '@/components/contest/event/eventManage-online.vue'
    import eventOffline from '@/components/contest/event/eventManage-offline.vue'

    export default {
        name: 'eventManage',
        components: {
            'v-event-online': eventOnline,
            'v-event-offline': eventOffline,
        },
        data() {
            return {
                component: 'v-event-online'
            }
        },
        methods: {
            changeComponentByRoute() {
                let component = 'v-event-online'
                switch(this.$route.params.type) {
                    case 'off':
                        component = 'v-event-offline'
                        break
                    default:
                        component = 'v-event-online'
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