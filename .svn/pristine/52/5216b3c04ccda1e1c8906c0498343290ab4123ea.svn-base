<template>
    <component :is="component"></component>
</template>

<script>
    import onlineAdd from '@/components/contest/event/eventManage-online_add.vue'
    import offlineAdd from '@/components/contest/event/eventManage-offline_add.vue'

    export default {
        name: 'eventManageAdd',
        components: {
            'v-online-add': onlineAdd,
            'v-offline-add': offlineAdd,
        },
        data() {
            return {
                component: 'v-online-add'
            }
        },
        created() {
            let component = 'v-online-add'
            switch(this.$route.params.type) {
                case 'off':
                    component = 'v-offline-add'
                    break
                default:
                    component = 'v-online-add'
            }
            this.component = component
        }
    }
</script>