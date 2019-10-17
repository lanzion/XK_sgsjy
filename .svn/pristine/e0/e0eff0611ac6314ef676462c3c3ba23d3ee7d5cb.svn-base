<template>
    <div id="list" :class="{'has-no-data': !items.length}">
        <transition-group class="list" v-if="items.length" name="list-item" tag="ul" mode="out-in">
        <!-- <ul class="list clearfix" v-if="items.length"> -->
            <router-link tag="li" class="list-item__box" :class="{'list-item__shadow': ifShadow}" :style="{width: listWidth}" v-for="(item, index) in items"
                         :key="item.id || index" :to="generateRoute(item)">
                <slot :item="item"></slot>
            </router-link>
        <!-- </ul> -->
        </transition-group>
        <div v-else class="empty-block">暂无数据</div>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: {
        listData: Object,
        items: Array,
        ifAnimation: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // queryParam: null
        }
    },
    computed: {
        listWidth: function() {
            return this.getWidth(this.listData.col)
        }
    },
    mounted() {
        // this.queryParam = Object.assign({}, {this.listData.params.names: item[listData.params.val]})
    },
    methods: {
        generateRoute(item = {}) {
            if(this.$route.path === '/interestsSpace/member') {
                return this.dynamicPath(item)
            } else {
                const {pathUrl: path, params = {}} = this.listData
                const {names, val} = params
                const {id, userId} = item
                const query = {[names]: item[val]}

                if (path === '/claszSpace/homePage') query.spaceId = id

                if (path === '/teacherSpace' || path === '/studentSpace') query.uid = userId

                return {path, query}
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/index_list.scss';
.list-item__shadow:hover {
    box-shadow: 0 3px 5px #D9D9D9;
}
</style>
