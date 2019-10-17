<template>
    <div class="backend-content__middle">
        <el-form :inline="true" :model="search" class="option-box clearfix">
            <el-form-item label="链接名称">
                <el-input class="bs-search-input" v-model="search.linkName" @keyup.native.enter="changePage(1)" placeholder="请输入链接名称"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="search.linkType" placeholder="请选择所属栏目" clearable>
                    <el-option v-for="item in linkTypeDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            </el-form-item>
        </el-form>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel
        }"></v-admin-operate>
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="linkName" label="链接名称" width="210" sortable>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/space/link/detail', query: {id: scope.row.id} }">{{scope.row.linkName}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="typeName" label="所属栏目" sortable></el-table-column>
            <el-table-column prop="linkDesc" label="链接说明"></el-table-column>
            <el-table-column prop="linkUrl" label="链接地址">
                <template scope="scope">
                    <a :href="scope.row.linkUrl" target="_blank">{{scope.row.linkUrl}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="发布时间" width="180" sortable>
                <template scope="scope">
                    {{scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="userName" label="发布人"></el-table-column> -->
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        del: doDel
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'Vuex'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import region from '@/components/common/select/region_select.vue'
    import adminOperate from '@/components/common/operate.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { requestLinkList, addLink, modifyLink, delLink } from '@/service/admin_space.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    export default {
        name: 'linkManage',
        mixins: [subPermission, setPage],
        components: {
            'v-region-select': region,
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                search: {
                    linkName: '',
                    linkType: ''
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [],// 选中项
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                linkTypeDL (state) {
                    let dicList = (state['linkTypeDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam )
            }
        },
        created() {
            this.getDictComb('linkType')
            this._search = Object.assign({}, this.search)
            this.getData()
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            /*
             * 获取资讯列表
             */
            getData() {
                requestLinkList(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {};
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum)
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
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                Object.assign(this.search, _region)
            },
            doEdit() {

            },
            /*
             * 删除资讯
             * [{id: "资讯ID"}]
             */
            doDel({data: item} = {data}){
                console.log(item)
                let params = [];
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    this.$confirm('此操作将永久删除该资讯，是否继续？', '删除', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id});
                        });
                        delLink(params).then(response => {
                            if (response.data.code == 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    }).catch(() => {});
                } else {
                    this.$message({message: '请选择要删除的资讯'});
                }
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            }
        }
    }
</script>
