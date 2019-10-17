<template>
    <div class="doc-wrapper">
        <div class="aside fl">
            <v-admin-operate v-bind="{add: showDirectoryDialog, edit: editItem, del: deleteItem, items: typeHeadBtnGroup, btnType: 'head', data: curDirectoryData}"/>
            <el-tree :data="directoryList" @node-click="handleNodeClick" :props="defaultProps" :expand-on-click-node="false" node-key="id" default-expand-all highlight-current class="point-tree">
            </el-tree>
        </div>
        <div class="main backend-content__middle">
            <div v-if="curDirectoryData.content" class="overview">
                <h4 class="title-wrapper">
                    <span class="title">概述</span>
                </h4>
                <div class="overview-content" v-html="curDirectoryData.content"></div>
            </div>
            <h4 class="title-wrapper">
                    <span class="title">章节</span>
                </h4>
            <section class="option-box clearfix">
                <el-input v-model="selected.name" @keyup.enter.native="requestList" class="fl bs-search-input" placeholder="请输入章节名称"></el-input>
                <button @click="requestList" class="fl bs-search-button i-form-button is-plain">搜索</button>
            </section>
            <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
                add: showDialog,
                del: showMessageBox
            }"></v-admin-operate>
            <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border
                                class="data-table back-stage-table" style="width: 100%">
                <el-table-column type="selection" width="50"/>
                <el-table-column prop="name" label="章节" show-overflow-tooltip/>
                <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip>
                    <template scope="scope">
                        <div v-html="scope.row.content"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="updateDate" label="最后更新时间" show-overflow-tooltip>
                    <template scope="scope">
                        {{scope.row.updateDate | dateFormat('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column prop="updateName" label="最后更新人" show-overflow-tooltip/>
                <el-table-column label="操作" width="160">
                    <template scope="scope">
                        <v-admin-operate v-bind="{del: deleteItem, edit: editItem, items: listBtnGroup, data: scope.row}"/>
                    </template>
                </el-table-column>
            </el-table>
            <v-pagination v-bind="{param: pageParam, changePage: requestList}"/>
        </div>
        <chapter-dialog v-if="directoryDialog.isVisible" v-bind="{dialog: directoryDialog, directoryList, handleRequest: requestDirectoryList, curEditingItem, type: '1'}"/>
        <chapter-dialog v-if="dialog.isVisible" v-bind="{dialog, directoryList, handleRequest: requestList, curEditingItem, type: '2'}"/>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import {
        requestDocChapterList,
        requestDocDirectoryList,
        delDoc,
        delDocItems,
    } from '@/service/admin_configure.js'

    import adminOperate from '@/components/common/operate.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import chapterDialog from '@/components/config/add_doc_chapter.vue'

    export default {
        name: 'docConfig', // 文档配置

        mixins: [subPermission],

        data () {
            return {
                curEditingItem: {},

                curDirectoryData: {
                    type: '1',
                },

                directoryList: [],

                dialog: {isVisible: false},

                directoryDialog: {isVisible: false},

                defaultProps: { // 默认属性
                    children: 'child',
                    label: 'name'
                },

                items: [],

                pageParam: {
                    pageNum: 1,
                    pageSize: 20,
                    totalNum: 0
                },

                selected: {
                    name: '',
                    parentId: null,
                },

                selectedItems: []
            }
        },

        created () {
            this.requestList()
            this.requestDirectoryList()
        },

        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            chapterDialog,
        },

        methods: {
            // 获取列表
            async requestList () {
                const res = await requestDocChapterList({...this.pageParam, ...this.selected})

                if (res.status === 200 && res.data.code === 200) {
                    const {resultData, totalNum} = res.data.entity || {}
                    this.items = resultData || []
                    this.pageParam.totalNum = totalNum || 0
                }
            },

            // 目录列表
            async requestDirectoryList ({action} = {}) {
                if (action === 'edit') {
                    this.selected.parentId = null
                    this.curDirectoryData = {type: '1'}
                }

                const res = await requestDocDirectoryList()

                // 初始化目录，删除每项的空child，并设置每项由父级id组成的数组属性
                const initDirectoryData = (data = [], children = 'child', _ids = []) => {
                    if (!Array.isArray(data)) return

                    data.forEach(item => {
                        const CHILDREN = item[children]
                        if (!Array.isArray(CHILDREN)) return false

                        item._ids = _ids.concat([item.id])

                        if (CHILDREN.length === 0) {
                            delete item[children]
                            return true
                        }

                        initDirectoryData(CHILDREN, children, item._ids)
                    })
                }

                if (res.status === 200 && res.data.code === 200) {
                    const result = (res.data.appendInfo || {}).result || []
                    initDirectoryData(result)
                    this.directoryList = result
                }
            },

            // 删除
            deleteItem ({data = {}} = {}) {
                const msgType = data.type === '1' ? '目录' : '章节'

                this.$confirm(`您确定要删除选中的${msgType}吗？`, '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    delDoc({id: data.id}).then(res => {
                        if (res.status === 200 && res.data.code === 200) {
                            this.$message({type: 'success', message: `成功删除${msgType}`, duration: 1000})
                            if (data.type === '1') {
                                this.requestDirectoryList()
                                this.requestList()
                            } else {
                                this.requestList()
                            }
                            return
                        }

                        this.$message.error(res.data.msg || `删除${msgType}失败，请重试`)
                    }).catch(() => {
                        this.$message.error(`删除${msgType}失败，请重试`)
                    })
                }).catch(e => {})
            },

            // 批量删除
            deleteItems () {
                const errMsg = '删除章节失败，请重试'

                delDocItems(this.selectedItems).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({type: 'success', message: '成功删除章节', duration: 1000})
                        this.requestList()
                        this.selectedItems.splice(0)
                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },

            editItem ({data = {}} = {}) {
                const directoryType = '1'
                const {type} = data
                // console.log(data)
                this.curEditingItem = {...data, action: 'edit'}

                if (type === directoryType) {
                    this.selected.parentId !== null && (this.directoryDialog.isVisible = true)
                    return false
                }

                this.dialog.isVisible = true
            },

            handleNodeClick ({id, content = '', name, type, parentId} = {}) {
                this.selected.parentId = id
                this.curDirectoryData = {id, content, name, type, parentId}
            },

            // 选中某一行，加入批量删除的数组
            handleSelect (selectedArr) {
                this.selectedItems = selectedArr.map(item => ({id: item.id}))
            },

            showDialog () {
                this.dialog.isVisible = true
                this.curEditingItem = {}
            },

            showDirectoryDialog () {
                this.directoryDialog.isVisible = true
                this.curEditingItem = {type: '1'}
            },

            // 显示批量删除提示框
            showMessageBox () {
                if (this.selectedItems.length === 0) {
                    this.$message({type: 'info', message: '请先选择需要删除的章节', duration: 1500})
                    return
                }

                this.$confirm('您确定要删除选中的章节吗？', '提示', {
                    customClass: '__custom-msg-box',
                    type: 'warning'
                }).then(() => {
                    this.deleteItems()
                }).catch(e => {})
            }
        },

        watch: {
            'selected.parentId': 'requestList'
        }
    }
</script>
<style lang="scss">
    $theme-color: #0594e8;
    $item-height: 40px;

    .doc-wrapper {
        .aside {
            box-sizing: border-box;
            width: 292px;
            margin-right: 14px;
            border-radius: 5px;
            background-color: #fff;
            .bs-btn-group {
                margin-bottom: 1px;
                border: 0;
                border-bottom: 1px solid #ddd;
                padding: 20px 14px;
                .bs-search-button {
                    display: block;
                    width: 100%;
                    height: $item-height;
                    line-height: $item-height;
                    margin: 0;
                    padding: 0;
                    &.disabled {
                        cursor: not-allowed;
                        pointer-events: none;
                    }
                }
                .bs-search-button + .bs-search-button {
                    margin-top: 10px;
                }
            }
        }
        .el-tree {
            border: 0;
            padding: 0 14px 14px;
            border-radius: 0 0 5px 5px;
            .is-current > .el-tree-node__content {
                background-color: $theme-color !important;
                color: #fff;
            }
            .el-tree-node__content {
                &:hover {
                    background-color: $theme-color !important;
                    color: #fff;
                }
            }
            .el-tree-node__label {
                font-size: 12px;
            }
            .el-tree__empty-block {
                border: 1px solid #ddd;
            }
        }
        .main {
            overflow: hidden;
        }
        .overview {
            margin-bottom: 80px;
            .overview-content {
                font-size: 14px;
            }
        }
        .title-wrapper {
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            .title {
                display: inline-block;
                font-size: 16px;
                padding: 0 12px 10px;
                border-bottom: 2px solid $theme-color;
            }
        }
    }
</style>
