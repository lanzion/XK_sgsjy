<!-- 讨论区视图 -->
<template>
    <section class="dpd15 trainDiscuss_view">
        <div class="title">
            <div class="title_l fl">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path, query: $route.query  }" :key="index" >{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="discussinitiate-broad-search title_r fr">
                <el-input placeholder="搜索主题" v-model="title" @keyup.enter.native="search">
                  <el-button slot="append" icon="search" @click="search" ></el-button>
                </el-input>
            </div>
        </div>
        <router-view :title="title" :select="select" ref="child"></router-view>
    </section>
</template>

<script>
export default {
    data() {
        return{
            items: [],
            title: '',
            select: '',
        }
    },
    mounted() {
        this.analysisPath()
    },
    methods: {
        search () {
            this.$router.push({path:'index', query: {id: this.$route.query.id} })
            setTimeout(() => {
                this.$refs.child.getSearch()
            }, 0)
        },
        analysisPath () {
            let path = this.$route.path;
            let query = this.$route.query;
            let items = path.match(/\/\w+/g);
            let breadcrumb = [], _nextPrefix = '', _lastPath = items[0]+items[1]+items[2], _lastItem = '';
            for (let i = 3; i < items.length; i++) {
                let _breadcrumb = {}, _path = '', _itemName = '';
                _lastPath += items[i];

                if (items[i].includes('discuss')) {
                    _itemName = '讨论区';
                    _path = _lastPath;
                } else if (items[i].includes('publish')) {
                    _nextPrefix = _itemName = '发起新主题';
                } else if (items[i].includes('detail')) {
                    _nextPrefix = _itemName = '主题详情';
                }

                _path = _lastPath;

                if (_itemName !== '') {
                    if (i == items.length - 1) {
                        _breadcrumb.path = '';
                    } else {
                        _breadcrumb.path = _path;
                    }
                    _breadcrumb.title = _itemName;
                    breadcrumb.push(_breadcrumb);
                }
                _lastItem = items[i];
            }
            this.items = breadcrumb;
        }
    },
    watch: {
        '$route': 'analysisPath'
    },
}
</script>

<style lang='scss'>
.trainDiscuss_view {
    .el-input-group__append {
        border: none;
        background: transparent;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/projectInitiate.scss';
</style>
