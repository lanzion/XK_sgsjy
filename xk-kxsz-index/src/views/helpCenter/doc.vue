<template>
    <div class="doc-wrapper">
        <div class="aside fl">
            <h4 class="aside-title">目录</h4>
            <div class="filter-input-wrapper">
                <el-input v-model="filterText" icon="search" placeholder="请输入关键字"></el-input>
            </div>
            <el-tree ref="tree" :data="directoryList" @node-click="handleNodeClick" :props="defaultProps"
                             :filter-node-method="filterNode" node-key="id" default-expand-all highlight-current class="point-tree">
            </el-tree>
        </div>
        <div class="main">
            <h4 class="title-wrapper">
                <span class="title">帮助文档</span>
            </h4>
            <div class="directory-wrapper">
                <div class="btn-row">
                    <button @click="directoryIsVisible = !directoryIsVisible" class="btn-toggle">
                        {{directoryIsVisible && '隐藏' || '显示目录'}}
                    </button>
                </div>
                <transition name="toggle-slide">
                    <div v-show="directoryIsVisible" class="directory-list">
                        <h4 class="directory-title">章节目录</h4>
                        <ul>
                            <li @click="handleChapterDirClick(idx)" v-for="(item, idx) in items" :key="idx" class="directory-item">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                </transition>
                <div v-if="curDirectoryData.content" class="overview-content" v-html="curDirectoryData.content"></div>
                <ul class="chapter-list">
                    <li v-for="(item, idx) in items" :key="idx" :ref="'chapter' + idx" class="chapter-item">
                        <h5 class="chapter-item__title">{{item.name}}</h5>
                        <div class="chapter-item__content" v-html="item.content"></div>
                    </li>
                    <li v-if="items.length === 0" class="no-data">暂无章节数据</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        requestDocChapterList,
        requestDocDirectoryList
    } from '@/service/help.js'

    export default {
        name: 'docConfig', // 文档配置

        data() {
            return {
                curDirectoryData: {},

                directoryList: [],

                directoryIsVisible: true,

                defaultProps: { // 默认属性
                    children: 'child',
                    label: 'name'
                },

                filterText: '',

                items: [],

                pageParam: {
                    pageNum: 1,
                    pageSize: 999,
                    totalNum: 0
                },

                selected: {
                    parentId: null,
                },
            }
        },

        created() {
            this.requestList()
            this.requestDirectoryList()
        },

        components: {},

        methods: {
            // 获取列表
            async requestList() {
                const res = await requestDocChapterList({ ...this.pageParam, ...this.selected })

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    this.items = resultData || []
                }
            },

            // 目录列表
            async requestDirectoryList() {
                const res = await requestDocDirectoryList()

                if (res.status === 200 && res.data.code === 200) {
                    const { result } = res.data.appendInfo || {}
                    this.directoryList = result || []
                }
            },

            filterNode(value, data) {
                if (!value) return true
                return data.name.indexOf(value) !== -1
            },

            handleChapterDirClick(idx) {
                const defaultOffset = 120
                const top = this.$refs[`chapter${idx}`][0].offsetTop
                document.body.scrollTop = top - defaultOffset
            },

            handleNodeClick({ id, content = '' } = {}) {
                this.selected.parentId = id
                this.curDirectoryData = { id, content }
            },
        },

        watch: {
            'selected.parentId': 'requestList',
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        }
    }
</script>
<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
$item-height: 40px;

.doc-wrapper {
    margin-top: 30px;
    overflow: hidden;
    .aside {
        box-sizing: border-box;
        width: 238px;
        margin-right: 20px;
        background-color: #fff;
        border: 1px solid #c9c9c9;
        padding-bottom: 75px;
        .aside-title {
            height: $item-height;
            line-height: $item-height;
            background: nth($default-color, 1);
            text-indent: 12px;
            font-size: 16px;
            color: #fff;
        }
        .filter-input-wrapper {
            height: 34px;
            margin-top: 14px;
            font-size: 12px;
            padding: 0 14px;
        }
    }
    .el-tree {
        margin-top: 34px;
        border: 0;
        & > .el-tree-node > .el-tree-node__content {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
        .is-current > .el-tree-node__content {
            background-color: nth($default-color, 1) !important;
            color: #fff;
        }
        .el-tree-node__content {
            &:hover {
                background-color: nth($default-color, 1) !important;
                color: #fff;
            }
        }
        .el-tree__empty-block {
            border: 1px solid #ddd;
            border-width: 1px 0;
        }
    }
    .main {
        overflow: hidden;
    }
    .title-wrapper {
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        .title {
            display: inline-block;
            font-size: 16px;
            padding: 20px 24px 10px;
            border-bottom: 2px solid nth($default-color, 1);
            color: nth($default-color, 1);
        }
    }
    .directory-wrapper {
        font-size: 14px;
        .btn-row {
            margin-bottom: 14px;
            text-align: right;
            .btn-toggle {
                color: nth($default-color, 1);
                border: 0;
            }
        }
        .overview-content {
            line-height: 1.4;
            margin-bottom: 40px;
        }
        .directory-list {
            margin-bottom: 20px;
            background-color: #eee;
            padding: 20px;
            &.toggle-slide-enter-active, &.toggle-slide-leave-active {
                transition: all .3s;
            }
            &.toggle-slide-enter, &.toggle-slide-leave-to {
                transform: translateY(-30px);
                opacity: 0;
            }
            .directory-title {
                margin-bottom: 10px;
                font-size: 16px;
            }
            .directory-item {
                padding: 10px 0;
                color: nth($default-color, 1);
                cursor: pointer;
            }
        }
    }
    .chapter-item {
        & + .chapter-item {
            margin-top: 40px;
        }
        .chapter-item__title {
            margin-bottom: 8px;
            font-size: 16px;
        }
        .chapter-item__content {
            line-height: 1.3;
        }
    }
}
</style>
