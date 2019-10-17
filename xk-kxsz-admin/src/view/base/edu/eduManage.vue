<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.eduName" @keyup.native.enter="changePage(1)" placeholder="请输入机构名称/编码"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="区域">
                        <v-region-select @region="changeRegion" :rangeItems="rangeItems" ref="region" :isAdmin="true" :clearable="true"></v-region-select>
                    </el-form-item>
                    <el-form-item label="级别">
                        <el-select v-model="search.eduType" placeholder="请选择级别" filterable clearable>
                            <el-option v-for="(value, key) in levelList" :key="key" :label="value" :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            start: doStart,
            stop: doStart,
            initialize: popupInitial
        }"></v-admin-operate>
        <!-- 教育局列表 -->
        <el-table class="data-table back-stage-table"  border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="编码" width="130" sortable>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/edu/detail', query: {id: scope.row.id} }">{{scope.row.id}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="eduName" label="机构名称" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="provinceName" label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <el-table-column prop="eduTypeName" label="级别" width="120" sortable></el-table-column>
            <!-- <el-table-column prop="parentName" label="上级机构" sortable show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="linkName" label="联系人" sortable></el-table-column>
            <el-table-column prop="phone" label="联系电话" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="fax" label="传真" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="电子邮件" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" width="100" show-overflow-tooltip>
                <template scope="scope">
                    <el-switch v-model="scope.row.status" on-text="启用" off-text="停用" on-value="1" off-value="0" :disabled="!switchBtnGroup.some(x => x.menuId==='start')" @change="doStart({data: scope.row, model: scope.row.status==='1'?'start':'stop'})"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        start: { callback: doStart, isActive: isStart },
                        stop: { callback: doStart, isActive: isStop },
                        avatar: popupAvatar,
                        background: popupBackground
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="dialog-initial" :visible.sync="initialVisible" size="tiny" title="初始化" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="请稍后，正在初始化...">
            <p class="initial-tip"><i class="icon-form-tip"></i>此功能用于批量生成机构(教育局)数据</p>
            <el-form ref="initialForm" label-width="80px">
                <el-row>
                    <el-form-item label="级别">
                        <el-col :span="22">
                            <el-radio-group v-model="initType">
                                <el-radio v-for="(value, key) in levelList" :label="key" :key="key">{{value}}</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row v-if="initType!=4">
                    <el-form-item label="所在区域">
                        <el-col :span="22">
                            <v-region-pub-select :level="initType" @region="changeInitialRegion"></v-region-pub-select>
                        </el-col>
                    </el-form-item>
                </el-row>
                <section class="bs-d-btn-group">
                    <button type="button" class="bs-search-button i-form-button" @click="initial('initialForm')">确定</button>
                    <button type="button" class="bs-search-button i-form-button is-plain" @click="initialVisible=false">取消</button>
                </section>
            </el-form>
        </el-dialog>
        <el-dialog class="dialog-avatar" :visible.sync="avatarVisible" size="small" title="更换标志">
            <v-set-avatar :img="avatar" :close="close" :save="setAvatar" @changeAvatar="changeAvatar"></v-set-avatar>
        </el-dialog>
        <el-dialog class="dialog-background" :visible.sync="backgroundVisible" size="small" title="更换背景">
            <v-set-bg :background="background" :save="setBackground" @changeBackground="changeBackground" :close="close"></v-set-bg>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import region_pub from '@/components/common/select/region_pub_select.vue' // 省市区下拉
    import region from '@/components/common/select/region_select.vue' // 省市区下拉
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { orgLock } from '@/mixin/lockOrganization.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { initSystem, requestBaseEdu, requestEduDetail, modifyAvatar } from '@/service/admin_base.js'
    import { initProConfig } from '@/service/common.js'
    import adminOperate from '@/components/common/operate.vue'
    import setAvatar from '@/components/base/set_avatar.vue'
    import setBG from '@/components/base/set_background.vue'

    export default {
        name: 'eduManage',
        mixins: [subPermission, setPage, orgLock],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-region-select': region,
            'v-region-pub-select': region_pub,
            'v-set-avatar': setAvatar,
            'v-set-bg': setBG
        },
        data() {
            return {
                fullscreenLoading: false,
                _search: {},
                // 高级筛选开关
                screeningDropdown: false,
                search: {
                    eduName: '',
                    eduType: ''
                },
                region: {},
                items: [],
                levelList: {
                    '1': '省级',
                    '2': '市级',
                    '3': '县级',
                    '4': '全国'
                },
                checkedItems: [],           // 选中项
                curIndex: null,             // 当前编辑数据Index
                curId: null,                // 当前编辑数据ID
                avatar: null,               // 当前编辑数据标志图
                background: null,           // 当前编辑数据背景图
                initType: 1,            // 初始化级别(1 - 省级, 2 - 市级, 3 - 区级)
                initialRegion: {},          // 初始化地区数据
                avatarVisible: false,       // 编辑标志图片弹框是否可见
                backgroundVisible: false,   // 编辑背景图片弹框是否可见
                initialVisible: false,      // 初始化弹框是否可见
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam );
            }
        },
        created() {
            if (this.$ls.get('userIdentity') === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this._search = Object.assign({}, this.search)
            this.getData()
        },
        methods: {
            resetSearchForm() {
                this.search = Object.assign({}, this._search, { name: this.search.eduName })
                this.screeningDropdown = false
                this.$refs.region.checkedItems = []
            },
            /*
             * 获取学校列表
             */
            getData() {
                requestBaseEdu(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity
                        this.items = _data.resultData || []
                        this.$set(this.pageParam, 'totalNum', _data.totalNum)
                    } else {
                        this.showMessage('error', response.data.msg)
                    }
                })
            },
            // 启用/停用
            doStart({ data: item, model } = { data, model }) {
                const flag = !!Object.keys(item).length
                if (flag) {
                    item.status = model === 'start' ? '0' : '1'
                    item = [item]
                } else {
                    item = this.checkedItems
                }
                this.startOperate({
                    item: item,
                    model: model,
                    identity: 'edu'
                })
            },
            // 改变初始化选取地区
            changeInitialRegion(region) {
                let _region = {};

                let [_province, _city, _area] = region
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.initialRegion = _region
            },
            // 地区改变
            changeRegion(region) {
                let _region = {}
                let [_province, _city, _area] = region
                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                this.region = _region
            },
            // 子组件传递改变标志图
            changeAvatar(img) {
                this.avatar = img
            },
            // 子组件传递改变背景图
            changeBackground(img) {
                this.background = img
            },
            /*
             * 设置标志
             * orgId: 教育局/学校ID, cover: 标志图片
             */
            setAvatar() {
                if (this.avatar) {
                    modifyAvatar({orgId: this.curId, cover: this.avatar}).then(response => {
                        if (response.data.code == 200) {
                            this.$set(this.$data.items[this.curIndex], 'coverUrl', this.avatar)
                            this.$message({message: '修改成功', type: 'success'})
                            this.close()
                        }
                    })
                }
            },
            /*
             * 设置标志
             * orgId: 教育局/学校ID, background: 背景图片
             */
            setBackground() {
                if (this.background) {
                    modifyAvatar({orgId: this.curId, background: this.background}).then(response => {
                        if (response.data.code == 200) {
                            this.$set(this.$data.items[this.curIndex], 'backgroundUrl', this.background);
                            this.$message({message: '修改成功', type: 'success'})
                            this.close()
                        }
                    })
                }
            },
            /*
             * 初始化
             * province: 省, city: 市, area: 区
             */
            initial() {
                let params = Object.assign({}, this.initialRegion, {initType: this.initType})
                let regionLen = Number(this.initType) == 4 ? 0 : Number(this.initType)
                if (Object.values(this.initialRegion).filter(x => x).length >= regionLen) {
                    this.initialVisible = false
                    this.fullscreenLoading = true
                    initSystem(params).then(response => {
                        if (response.data.code == 200) {
                            this.$message({message: '初始化成功', type: 'success'})
                            initProConfig()
                            this.getData()
                        } else {
                            this.$message.error({message: response.data.msg})
                        }
                    }).finally(() => {
                        this.fullscreenLoading = false
                    })
                } else {
                    this.$message('请选择完整初始化所在地区');
                }
            },
            // 分页改变
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
            // 显示初始化弹窗
            popupInitial() {
                this.initialVisible = true
            },
            // 显示更换标志弹窗
            popupAvatar({data = {}, index} = {data, index}) {
                this.avatarVisible = true
                this.curIndex = index
                this.curId = data.id
                this.avatar = data.coverUrl
            },
            // 显示更换背景弹窗
            popupBackground({data = {}, index} = {data, index}) {
                this.backgroundVisible = true
                this.curIndex = index
                this.curId = data.id
                this.background = data.backgroundUrl
            },
            //显示编辑弹窗
            popupEdit({data = {}, index} = {data, index}){
                this.curId = data.id
                this.curIndex = index
            },
            // 关闭弹框
            close() {
                this.avatarVisible = false
                this.backgroundVisible = false
            }
        }
    }
</script>

<style lang="scss">
.dialog-initial .el-dialog {
    width: 480px;
}
.dialog-avatar .el-dialog {
    min-width: 852px;
}
.dialog-edit .el-dialog{
    min-width: 620px;
}
</style>
<style lang="scss" scoped>
.dialog-initial {
    .initial-tip {
        margin: 0 30px 20px;
        color: #999;
        font-size: 12px;

        .icon-form-tip {
            margin-right: .5em;
            font-size: 16px;
            vertical-align: text-bottom;
        }
    }
}
</style>