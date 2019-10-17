<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.title" @keyup.native.enter="changePage(1)" placeholder="请输入资讯标题"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="分类">
                        <el-select v-model="search.noticeTypeId" placeholder="请选择分类" clearable>
                            <el-option v-for="item in noticeTypeDL" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" v-show="!isSchool">
                        <v-region-select @region="changeRegion" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel,
            top: handleTop,
            notop: handleTop
        }"></v-admin-operate>
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="title" label="标题" width="210">
                <template scope="scope">
                    <el-tag class="__color-hot" v-if="scope.row.hot=='1'">TOP</el-tag>
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="分类" prop="noticeTypeId" sortable>
                <template scope="scope">
                    {{scope.row.noticeTypeId | translate(noticeTypeDL, {key: 'id'})}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="发布人"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="180">
                <template scope="scope">
                    {{scope.row.publishDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="发布组织" show-overflow-tooltip>
                <template scope="scope" v-if="identity=='school'">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" v-if="identity!=='education'"></el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        top: {callback: handleTop, isActive: isTop},
                        notop: {callback: handleTop, isActive: isNoTop},
                        del: doDel,
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
    import { requestInfoList, topInfo, delInfo } from '@/service/admin_space.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    export default {
        name: 'infoManage',
        mixins: [subPermission, setPage],
        components: {
            'v-region-select': region,
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                // 是否学校
                isSchool: false,
                identity: this.$ls.get('userIdentity'),
                screeningDropdown: false,
                search: {
                    title: '',
                    noticeTypeId: '',
                    provinceId: null,
                    cityId: null,
                    areaId: null
                },
                _search: {},
                region: {},
                items: [],
                checkedItems: [] // 选中项
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                noticeTypeDL (state) {
                    let dicList = (state['noticeTypeDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            params: function() {
                return Object.assign( {}, { orgId: this.identity === 'admin' ? 5 : this.$ls.get('loginInfo').userInfo.space.orgId }, this.search, this.region, this.pageParam );
            }
        },
        created() {
            this.getDictComb('noticeType')
            this._search = Object.assign({}, this.search)
            this.getData();
            // 判断登陆账号是不是学校
            this.isSchool = this.$ls.get('userIdentity') == 'school' ? true : false
        },
        methods: {
            ...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
            /*
             * 获取资讯列表
             */
            getData() {
                requestInfoList(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {};
                        this.items = _data.resultData || [];
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
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.$set(this.$data, 'region', _region)
            },
            /*
             * 删除资讯
             * [{id: "资讯ID"}]
             */
            doDel({data: item} = {data}){
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
                        delInfo(params).then(response => {
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
            /*
             * 置顶资讯
             * [{id: "资讯ID"}]
             */
            handleTop({data: item, model} = {data, model}){
                let params = [],
                    flag = model === 'top' ? true : false,
                    handleTxt = flag ? '置顶' : '取消置顶',
                    value = flag ? 1 : 0
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm(`此操作将${handleTxt}该资讯，是否继续？`, `${handleTxt}`, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        topInfo(params).then(response => {
                            if (response.data.code == 200) {
                                item.forEach(x => {
                                    x.hot = value
                                })
                                this.$message({message: `${handleTxt}成功`, type: 'success'})
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }).catch(() => {})
                } else {
                    this.$message({message: `请选择要${handleTxt}的资讯`})
                }
            },
            // 判断是否已设为热门
            isTop(item) {
                return Number(item.hot) !== 1
            },
            // 判断是否未设为热门
            isNoTop(item) {
                return Number(item.hot) === 1
            },
            // 改变选中项
            changeSelection(checked) {
                this.checkedItems = checked
            },
            // 重置搜索表单
            resetSearchForm() {
                this.$refs.region.checkedItems = []
                this.search = Object.assign({}, this._search, {name: this.search.title})
                this.screeningDropdown = false
            }
        }
    }
</script>
