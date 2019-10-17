<template>
    <component :is="component"></component>
</template>

<script>
    import onlineAdd from '@/components/contest/manage/contestManage-online_add.vue'
    import offlineAdd from '@/components/contest/manage/contestManage-offline_add.vue'

    export default {
        name: 'contestManageAdd',
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
            console.log('状态：', this.$route.params.type)
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
