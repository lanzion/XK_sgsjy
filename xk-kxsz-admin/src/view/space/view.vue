<template>
    <div class="backend-content__middle">
        <v-tab :tabs="tabs" :router="tabRouter" :cur_tab="curTab"></v-tab>
        <router-view></router-view>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setTabs } from '@/mixin/setTabs.js'
    import tabs from '@/components/common/tabs.vue'
    export default {
        name: 'view',
        mixins: [
            subPermission,
            setTabs
        ],
        components: {
            'v-tab': tabs
        },
        data() {
            return {
                tabs: [],
                tabRouter: {
                    path: ''
                },
                curTab: 0
            }
        },
        created() {
            this.setTabs({ num: 2 })
        },
        methods: {
            routeChange () {
                this.setTabs({ num: 2 })
            }
        },
        watch: {
            "$route": 'routeChange'
        }
    }
</script>
