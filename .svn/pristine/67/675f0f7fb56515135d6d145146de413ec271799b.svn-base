<template>
<div>
    <div v-if="btnType=='head' && items.length" class="bs-btn-group">
        <template v-for="(item, index) in items">
            <router-link v-if="item.url" tag="button" class="bs-search-button i-form-button" :to="{ path: item.url}">{{item.name}}</router-link>
            <button v-else class="bs-search-button i-form-button" @click="doOperate(item.menuId, true)">{{item.name}}</button>
        </template>
    </div>

    <template v-if="btnType=='list'">
        <ul class="cols-list b-gray">
            <template v-for="(item, index) in items">
                <li class="cols-item item-detail" v-if="item.url && $attrs[item.menuId] && checkIsActive(item.menuId)" @click="doLink({item})">{{item.name}}</li>
                <li class="cols-item item-detail" v-else-if="$attrs[item.menuId] && checkIsActive(item.menuId)" @click="doOperate(item.menuId)">{{item.name}}</li>
                <li class="cols-item item-detail not-link" v-else>{{item.name}}</li>
            </template>
        </ul>
    </template>
</div>
</template>
<script>
    export default {
        name: 'adminOperate',
        inheritAttrs: false,
        data() {
            return {
            }
        },
        props: {
            // 按钮类型(head: 顶部, list: 列表内)
            btnType: {
                type: String,
                default: 'list'
            },
            // 按钮数据
            items: {
                type: Array,
                default: []
            },
            /*
             * 按钮对应操作
             * queryKey: route.query的key
             * queryVal: route.query的val
             * callback: 按钮的回调函数
             */
            operate: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 列表行数
            index: {
                type: Number,
                default: null
            },
            // 列表数据
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            // 路由跳转
            doLink({item, item: {url, menuId}} = {item}) {
                let isDirect = this.$attrs[menuId]['isDirect']
                let isChain = this.$attrs[menuId]['isChain']
                    isDirect = isDirect == undefined ? true : false
                    isChain = isChain == undefined ? false : true
                if (isDirect) {
                    const query = this.$attrs[menuId].query || {}
                    let patt = new RegExp("^https?\:\/\/")
                    let isFullpath = patt.test(url)
                        console.log(isChain, menuId, query)
                    if (isChain || isFullpath) {
                        if (this.$attrs[menuId] && query) {

                            let params = Object.keys(query)

                            url = isFullpath ? url : `${location.protocol}//${location.host}${url}`
                            url += params.length ? `?${params.map(x => [x, this.data[query[x]]].join('=')).join('&')}` : ''
                            // let _params = []
                            // for (let key of Object.keys(query)) {
                            //     _params.push(`${key}=${this.data[query[key]]}`)
                            // }
                            // if (_params.length) {
                            //     url += '?' + _params.join('&')
                            // }
                            window.location.href = url
                        }
                    } else {
                        let route = {}
                        route.path = url
                        if (this.$attrs[menuId] && Object.keys(query).length) {
                            let _query = {}
                            for (let key of Object.keys(query)) {
                                _query[key] = this.data[query[key]]
                            }
                            route.query = _query
                        } else if (menuId === 'edit' || menuId === 'detail') {
                            route.query = { id: this.data.id }
                        }
                        this.$router.push(route)
                    }
                } else {
                    this.doOperate(item.menuId)
                }

            },
            // 运行父组件方法
            doOperate(model, isBatch) {
                isBatch = isBatch === undefined ? false : isBatch  // 是否为批量按钮
                /*let callback = this.operate[model]['callback']
                if (callback !== undefined) {
                    let $parent = this.getParent()
                    if (isBatch) {
                        $parent[callback]()
                    } else {
                        $parent[callback](this.index, this.data)
                    }
                }*/
                let defHandler = function () {
                    console.warn(`父组件没有传与该操作对应的回调函数！对应this.$attrs键名是：${model}`)
                }
                let handler = this.$attrs[model]
                if (typeof handler === 'object') {
                    handler = handler.callback
                }
                handler = handler || defHandler
                let options = { data: this.data, model }
                isBatch ? handler(options) : handler({ ...options, index: this.index })
            },
            // 判断按钮是否可用
            checkIsActive(model) {
                let callback = this.$attrs[model]['isActive']
                let flag = callback == undefined ? true : false
                if (!flag) {
                    flag = this.$attrs[model]['isActive'](this.data, { model: model })
                    // let $parent = this.getParent();
                    // flag = $parent[callback](this.data);
                }
                return flag
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/cols.scss';
.back-stage-table.el-table {
    .cols-list {
        .cols-item {
            font-size: inherit;
        }

        .item-detail.not-link {
            color: #999;
            cursor: default;
        }
    }
}
</style>
