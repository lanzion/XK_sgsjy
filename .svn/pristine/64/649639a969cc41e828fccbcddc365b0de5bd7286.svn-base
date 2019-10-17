<template>
    <div id="list" :class="{'has-no-data': !items.length}">
        <transition-group class="list" v-if="items.length" name="list-item" tag="ul" mode="out-in">
        <!-- <ul class="list clearfix" v-if="items.length"> -->
            <!-- <template v-if="Number($route.query.type) == 2">
                <li class="list-item__box" :class="{'list-item__shadow': ifShadow}" :style="{width: listWidth}" v-for="(item, index) in items" :key="item.id || index">
                    <slot :item="item"></slot>
                </li>
            </template> -->
            <template>
                <router-link tag="li" class="list-item__box" :class="{'list-item__shadow': ifShadow}" :style="{width: listWidth}" v-for="(item, index) in items" :key="item.id || index" :to="generateRoute(item)">
                    <slot :item="item"></slot>
                </router-link>
            </template>
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
        },
        ifShadow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // queryParam: null
        }
    },
    computed: {
        listWidth: function () {
            return this.getWidth(this.listData.col)
        }
    },
    mounted() {
        // this.queryParam = Object.assign({}, {this.listData.params.names: item[listData.params.val]})
    },
    methods: {
        generateRoute(item = {}) {
            const { pathUrl: path, paramsArr: arr } = this.listData
            const query = {}
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].val === 'route') {
                    this.$set(query, arr[i].name, this.$route.query[arr[i].key])
                } else {
                    this.$set(query, arr[i].name, item[arr[i].val])
                }
            }
            this.$set(query, 'type', this.$route.query.type)
            return { path, query }
            // if (this.$route.path.includes('/contest/review')) {
            //     const { pathUrl: path, params = {} } = this.listData
            //     const { names, val } = params
            //     const query = { id: this.$route.query.id, [names]: item[val], reviewId: item.id }
            //     return { path, query }
            // } else if (this.$route.path === '/contest/works' || this.$route.path.includes('/contest/awards')) {
            //     const { pathUrl: path, params = {} } = this.listData
            //     const { names, val } = params
            //     const query = { id: this.$route.query.id, [names]: item[val] }
            //     return { path, query }
            // }
            // const { pathUrl: path, params = {} } = this.listData
            // const { names, val } = params
            // const query = { [names]: item[val] }
            // return { path, query }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/index_list.scss';
.list-item__shadow:hover {
    box-shadow: 0 3px 5px #D9D9D9;
}
</style>
