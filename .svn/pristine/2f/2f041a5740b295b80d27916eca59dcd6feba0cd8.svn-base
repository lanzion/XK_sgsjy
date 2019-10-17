<!-- 讨论区视图 -->
<template>
    <section class="dpd15">
        <div class="title">
            <div class="title_l fl">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path, query: $route.query  }" :key="index" >{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="discussinitiate-broad-search title_r fr">
                <el-input placeholder="搜索主题" v-model="title" @keyup.enter.native="search">
                  <el-select v-model="select" slot="prepend" placeholder="全部讨论区">
                    <el-option v-for="(i, index) in selectOptions" :label="i.name" :value="i.value" :key="index"></el-option>
                  </el-select>
                  <el-button slot="append" icon="search" @click="search"></el-button>
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
            selectOptions: [
                { name: '全部讨论区', value: '' },
                { name: '教师答疑区', value: '2' },
                { name: '综合讨论区', value: '1' }
            ],
        }
    },
    mounted() {
        this.analysisPath()
    },
    methods: {
        search () {
            this.$router.push({path:'overview', query: {id: this.$route.query.id} })
            let _this = this
            setTimeout(function () {
                _this.$refs.child.getSearch()
            },0)
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
                } else if (items[i].includes('theme')) {
                    if(this.$route.query.discussType == '1') {
                        _nextPrefix = _itemName = '综合讨论区'
                    }else {
                        _nextPrefix = _itemName = '教师答疑区'
                    }
                }

                if (items[i].includes('detail')) {
                    if(this.$route.query.discussType == '1') {
                        _nextPrefix = _itemName = '综合讨论区'
                    }else {
                        _nextPrefix = _itemName = '教师答疑区'
                    }
                    breadcrumb.push({path: 'theme', title: _nextPrefix})
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
.discuss-broad-search {
    .el-input-group > .el-input__inner {
        height: 32px;
        margin: 0;
        color: #A6A6A6;
        width: 186px;
    }
    .el-input__inner {
        width: 104px;
    }
    .el-button {
        background: #C9C9C9;
        .el-icon-search:before {
            content: '搜索';
        }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #A7A7A7;
    }
}
.discussinitiate-broad-search {
    .el-input__inner {
        border: none !important;
    }
    .el-input-group__append {
        border: 0px;
    }
    .el-input-group__prepend {
        border: 0px;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/projectInitiate.scss';
</style>
