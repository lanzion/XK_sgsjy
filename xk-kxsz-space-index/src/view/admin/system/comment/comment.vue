<template>
    <div class="backend-content__middle" id="systemComment">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.userName" @keyup.native.enter="changePage(1)" placeholder="请输入发表人"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="状态">
                        <el-select v-model="search.status" placeholder="状态" filterable clearable>
                            <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <!-- 评论列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" >
            <el-table-column prop="userName" label="发表人" show-overflow-tooltip></el-table-column>
            <el-table-column label="内容" show-overflow-tooltip prop="content" align="left"></el-table-column>
            <el-table-column prop="createDate" label="发表时间" sortable show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy.MM.dd HH:mm')}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.status | translate(commentStatusDL)}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        unlock: { callback: doLock, isActive: isLock },
                        lock: { callback: doLock, isActive: isUnlock }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { commentList, commentFunc } from '@/service/admin_system.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'systemComment',
        components: {
            'v-pagination': pagination,
            'del-popover': delPopover,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                screeningDropdown: false,
                stateSelect: [
                    { label: '启用', value: 1 },
                    { label: '禁用', value: 0 }
                ],
                search: {
                    userName: '',
                    status: ''
                },
                _search: {},
                items: [],
                checkedItems: []
            }
        },
        mounted() {
            this._search = Object.assign({}, this.search)
            this.getData()
        },
        computed: {
            ...mapState('dictionaryCommon', {
                commentStatusDL (state) {
                    let dicList = (state['commentStatusDicList'] || {}).dicList || []
                    return dicList
                }
            })
        },
        methods: {
            /*
             * 获取项目列表
             */
            getData() {
                commentList( this.search, this.pageParam ).then(response => {
                    if (response.data.entity) {
                        this.items= response.data.entity.resultData;
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum);
                    }
                })
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            // 启用/禁用
            doLock({data: item} = {data}) {
                // console.log(arguments)
                // return;
                let status = item.status === 0 ? 1 : 0;
                let msg = item.status === 0 ? '启用成功' : '禁用成功';
                commentFunc({ status: status, id: item.id, type: item.type }).then(res => {
                    if(res.data.code === 200) {
                        item.status = status;
                        this.showMessage('success',msg)
                    }else{
                        this.showMessage('error',res.data.msg)
                    }
                })
            },
            // 判断是否可推荐
            isLock(item) {
                let flag = item.status === 0
                return flag
            },
            isUnlock(item) {
                let flag = item.status === 1
                return flag
            },
            // 重置搜索表单
            resetSearchForm() {
                this.search = Object.assign({}, this._search, {name: this.search.userName})
                this.screeningDropdown = false
            }
        }
    }
</script>
