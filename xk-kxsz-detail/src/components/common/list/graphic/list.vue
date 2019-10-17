<template>
    <div id="list" :class="{'has-no-data': !items.length}">
        <!-- <transition-group class="list" v-if="items.length" name="list-item" tag="ul" mode="out-in"> -->
        <ul class="list clearfix" v-if="items.length">
            <li class="list-item__box" :class="{'list-item__shadow': ifShadow}" :style="{width: listWidth}" v-for="(item, index) in items" :key="item.id || index">
                <router-link :to="generateRoute(item)" :targrt="target">
                    <slot :item="item"></slot>
                </router-link>
            </li>
        </ul>
        <!-- </transition-group> -->
        <div v-else class="empty-block">暂无数据</div>
    </div>
</template>

<script>
export default {
    props: {
        listData: Object,
        items: Array,
        ifAnimation: {
            type: Boolean,
            default: true
        },
        ifShadow: {
            type: Boolean,
            default: true
        },
        target: {
            type: String,
            default: '_blank'
        }
    },
    computed: {
        listWidth: function () {
            return this.getWidth(this.listData.col)
        }
    },
    methods: {
        generateRoute(item = {}) {
            // console.log(this.$route.path)
            if (this.$route.path.includes('member')) {
                return this.dynamicPath(item)
            } else {
                const { pathUrl: path, params = {} } = this.listData
                const { names, val } = params
                const { id, userId } = item
                const query = { [names]: item[val] }

                if (path.includes('clasz')) query.spaceId = id

                if (path.includes('teacher') || path.includes('student')) query.uid = userId

                return { path, query }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/index_list.scss';
.list-item__shadow:hover {
    box-shadow: 0 3px 5px #D9D9D9;
}
.list-item__box {
    border-radius: 5px;
    overflow: hidden;
}
</style>
