<template>
    <div class="backend-content__middle">
        <el-form :inline="true" :model="search" class="option-box clearfix">
            <el-form-item label="学校名称">
                <el-input class="bs-search-input" v-model="search.identityCode" @keyup.native.enter="changePage(1)" placeholder="请输入学校名称/编码"></el-input>
            </el-form-item>
            <el-form-item label="区域" v-if="identity !== 'school'">
                <v-region-select @region="changeRegion" :rangeItems="rangeItems" :isAdmin="true" :clearable="true"></v-region-select>
            </el-form-item>
            <el-form-item>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            </el-form-item>
        </el-form>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            recommend: doRecommend,
            norecommend: cancelRecommend,
            start: doStart,
            stop: doStart,
            del: delSchool
        }"></v-admin-operate>
        <!-- 学校列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="identityCode" label="编码" width="140" sortable show-overflow-tooltip>
                <template scope="scope">
                    <span class="resource-name">
                        <router-link tag="a" class="item-detail" :to="{ path:'/base/school/detail', query: {id: scope.row.id} }">{{scope.row.identityCode}}</router-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校名称" sortable show-overflow-tooltip>
                <template scope="scope">
                    <el-tag class="__color-success" v-if="Number(scope.row.recommend)">荐</el-tag>
                    <el-tag class="__color-success" v-if="scope.row.isStudio">示</el-tag>
                    {{scope.row.schoolName}}
                </template>
            </el-table-column>
            <el-table-column prop="provinceName" label="省市区" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="主管部门" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.eduAreaName || scope.row.eduCityName || scope.row.eduProvinceName}}
                </template>
            </el-table-column> -->
            <el-table-column prop="linkName" label="联系人" sortable></el-table-column>
            <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fax" label="传真" show-overflow-tooltip></el-table-column>
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
                        recommend: {callback: doRecommend, isActive: isRecommend},
                        norecommend: { callback: cancelRecommend, isActive: isNoRecommend },
                        start: { callback: doStart, isActive: isStart },
                        stop: { callback: doStart, isActive: isStop },
                        avatar: popupAvatar,
                        background: popupBackground,
                        scene: popupScene,
                        del: delSchool,
                        setms: { callback: setModelSchool, isActive: isModelSchool },
                        setnoms: { callback: setModelSchool, isActive: isNoModelSchool }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <!-- 更改标志弹框 -->
        <el-dialog class="dialog-avatar" :visible.sync="avatarVisible" size="small" title="更换标志">
            <v-set-avatar :img="avatar" :close="close" :save="setAvatar" @changeAvatar="changeAvatar"></v-set-avatar>
        </el-dialog>
        <!-- 更改背景弹框 -->
        <el-dialog class="detailsOnStage" :visible.sync="backgroundVisible" size="small" title="更换背景">
            <v-set-bg :background="background" :close="close" :save="setBackground" @changeBackground="changeBackground"></v-set-bg>
        </el-dialog>
        <!-- 更改空间实景 -->
        <el-dialog class="detailsOnStage" :visible.sync="sceneVisible" size="small" title="创客空间图片">
            <v-set-scene :scene="scene" @getSceneList="getSceneList" :businessId="curId" :close="close"></v-set-scene>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { recommend } from '@/mixin/recommend.js'
    import { orgLock } from '@/mixin/lockOrganization.js'
    import { doRecommend, cancelRecommend } from '@/service/common.js'
    import { requestBaseSchool, modifyAvatar, requestSchoolScene, delSchool, delSchoolByIds, setModelSchool } from '@/service/admin_base.js'
    import adminOperate from '@/components/common/operate.vue'
    import setAvatar from '@/components/base/set_avatar.vue'
    import setBG from '@/components/base/set_background.vue'
    import setScene from '@/components/base/set_scene.vue'
    import region from '@/components/common/select/region_select.vue' // 省市区下拉

    export default {
        name: 'schoolManage',
        mixins: [subPermission, recommend, orgLock, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-set-avatar': setAvatar,
            'v-set-bg': setBG,
            'v-set-scene': setScene,
            'v-region-select': region,
        },
        data() {
            return {
                search: {
                    identityCode: ''
                },
                region: {},
                items: [],
                checkedItems: [],           // 选中项
                curIndex: null,             // 当前编辑数据Index
                curId: null,                // 当前编辑数据ID
                avatar: null,               // 当前编辑数据标志图
                background: null,           // 当前编辑数据背景图
                scene: [],                  // 当前编辑数据空间实景
                avatarVisible: false,       // 编辑标志图片弹框是否可见
                backgroundVisible: false,   // 编辑背景图片弹框是否可见
                sceneVisible: false,         // 编辑空间实景弹框是否可见
                identity: '',
                rangeItems: '-1'              //区域范围
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.region, this.pageParam )
            }
        },
        created() {
            this.identity = this.$ls.get('userIdentity')
            if (this.identity === 'education') {
                let edu = this.$ls.get('baseInfo').baseInfo
                this.rangeItems = edu.id
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            // 地区改变
            changeRegion(items) {
                let _region = {}
                let [_province, _city, _area] = items;

                _region.provinceId = _province;
                _region.cityId = _city;
                _region.areaId = _area;
                this.region = _region
            },
            /*
             * 获取学校列表
             */
            getData() {
                requestBaseSchool(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            /*
             * 获取空间实景列表
             */
            getSceneList() {
                requestSchoolScene( { 'businessId': this.curId } ).then( res => {
                    if(res.data.code == 200 && res.data.appendInfo.list != null) {
                        this.scene = res.data.appendInfo.list
                    }
                })
            },
            // 子组件传递改变标志图
            changeAvatar(img) {
                this.avatar = img;
            },
            // 子组件传递改变背景图
            changeBackground(img) {
                this.background = img;
            },
            /*
             * 设置标志
             * orgId: 教育局/学校ID, cover: 标志图片
             */
            setAvatar() {
                if (this.avatar) {
                    modifyAvatar({orgId: this.curId, cover: this.avatar}).then(response => {
                        if (response.data.code == 200) {
                            this.$set(this.$data.items[this.curIndex], 'coverUrl', this.avatar);
                            this.$message({message: '修改成功', type: 'success'});
                            this.close();
                        }
                    })
                }
            },
            /*
             * 设置背景图
             * orgId: 教育局/学校ID, background: 背景图片
             */
            setBackground() {
                if (this.background) {
                    modifyAvatar({orgId: this.curId, background: this.background}).then(response => {
                        if (response.data.code == 200) {
                            this.$set(this.$data.items[this.curIndex], 'backgroundUrl', this.background);
                            this.$message({message: '修改成功', type: 'success'});
                            this.close();
                        }
                    })
                }
            },
            /*
             * 推荐
             * { "relationIds": ["学校ID"] , "recommendType": 5 }
             */
            doRecommend({data: item} = {data}) {
                let params = { relationIds: [], recommendType: 5 },flag = false;
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    for(let i = 0; i < item.length; i++){
                        if(this.isNoRecommend(item[i])){
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        this.showMessage('info','您选择的学校中包含了已推荐的学校')
                    } else {
                        this.recommendOperate(item, params, 5)
                    }
                } else {
                    this.$message({message: '请选择要推荐的学校'});
                }
            },
            /*
            * 取消推荐
            * { relationIds: ['学校id'] }
             */
            cancelRecommend({ data: item } = { data }) {
                let params = { relationIds: [] }, flag = false
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    for(let i = 0; i < item.length; i++){
                        if(this.isRecommend(item[i])){
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        this.showMessage('info','您选择的学校中包含了未推荐的学校')
                    } else {
                        this.recommendOperate(item, params, 5, true)
                    }
                } else {
                    this.$message({ message: '请选择要取消推荐的学校' })
                }
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
                    identity: 'school'
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
            // 弹出更换标志框
            popupAvatar({data = {}, index} = {data, index}) {
                this.avatarVisible = true
                this.curIndex = index
                this.curId = data.id
                this.avatar = data.coverUrl
            },
            // 弹出更换背景框
            popupBackground({data = {}, index} = {data, index}) {
                this.backgroundVisible = true
                this.curIndex = index
                this.curId = data.id
                this.background = data.backgroundUrl
            },
            //弹出更换空间实景
            popupScene({data = {}, index} = {data, index}) {
                this.sceneVisible = true
                this.curIndex = index
                this.curId = data.id
                this.getSceneList( this.curId )
            },
            // 关闭弹框
            close() {
                this.avatarVisible = false
                this.backgroundVisible = false
                this.sceneVisible = false
            },
            /*
             * 删除
             * [{id: 学校ID}]
             */
            delSchool({data: item} = {data}){
                let params = [];
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item];
                if (item.length) {
                    this.$confirm('确定要删除该学校吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delSchoolByIds(params).then((res) => {
                            if (res.data.code === 200) {
                                this.showMessage('success', '删除成功');
                                this.getData()
                            } else {
                                this.showMessage('error', res.data.msg)
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }).catch(() => {});
                } else {
                    this.$message({message: '请选择要删除的学校'});
                }
            },
            // 判断是否可推荐
            isRecommend(item) {
                return !Number(item.recommend)
            },
            //判断是否可取消推荐
            isNoRecommend(item) {
                return Number(item.recommend)
            },
            // 判断是否是示范学校
            isModelSchool({isStudio} = {}) {
                return !isStudio
            },
            // 判断是否是示范学校
            isNoModelSchool({isStudio} = {}) {
                return isStudio
            },

            // 设置示范学校
            setModelSchool ({data: {id: schoolId}, model} = {}) {
                // console.log(model)
                const errMsg = '设置示范学校失败，请重试'
                const status = model == 'setms' ? 1 : 0
                const handlerTxt = model == 'setms' ? '设为' : '取消'

                setModelSchool({schoolId, status}).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.showMessage('success', `成功${handlerTxt}示范校`)
                        this.getData()
                        return
                    }

                    this.showMessage('error', res.data.msg || errMsg)
                }).catch(() => {
                    this.showMessage('error', errMsg)
                })
            },
        }
    }
</script>
<style lang="scss">

.dialog-avatar .el-dialog {
    min-width: 852px;
}
.detailsOnStage .el-dialog{
    min-width: 800px;
}
</style>
