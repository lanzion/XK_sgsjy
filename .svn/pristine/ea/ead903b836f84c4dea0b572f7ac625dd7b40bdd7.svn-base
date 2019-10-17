<template>
    <div class="table-layout">
        <!-- 菜单列表 -->
        <section class="backend-content__middle table-cell menu-cell menu-tree">
            <div class="menu-title">菜单列表</div>
                <v-admin-operate class="type-btn-group" :items="headBtnGroup" btnType="head" v-bind="{
                    add: { callback: addPermission },
                    edit: { callback: editPermission },
                    del: { callback: delPermission }
                }"></v-admin-operate>
            <el-tree show-checkbox ref="rpTree" node-key="id" :auto-expand-parent="false" :data="permissionList" :props="{label: 'name', children: 'children' }" :check-strictly="isCheckStrictly" @check-change="handleCheckChange" :render-content="renderContent" :default-expanded-keys="expandList" @node-expand="handleNodeExpand" @node-collapse="handleNodeCollapse"></el-tree>
        </section>
        <!-- 菜单详情 -->
        <div class="menu-content table-cell menu-cell">
            <section class="backend-content__middle submit-form">
                <v-tabs :tabs="[{name: '菜单详情'}]" ></v-tabs>
                <el-form ref="form" label-position="right" label-width="114px" :model="form" :rules="rules">
                    <el-row>
                        <el-form-item label="菜单名称" prop="name">
                            <el-col :span="9">
                                <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="模块" prop="model">
                            <el-col :span="9">
                                <el-select v-model="form.model" placeholder="请选择模块">
                                    <el-option v-for="item in modelList" :label="item.label" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="父级菜单" prop="pid">
                            <el-col :span="9">
                                <el-cascader :options="permissionList" v-model="pIdList" :props="{value: 'id', label: 'name', children: 'children'}" change-on-select clearable placeholder="请选择父级菜单" @change="permissionChange"></el-cascader>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="URL" prop="url">
                            <el-col :span="9">
                                <el-input v-model="form.url" placeholder="请输入URL地址"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="状态" prop="status">
                            <el-col :span="9">
                                <el-switch v-model="form.status" on-text="" off-text="" on-value="1" off-value="0"></el-switch>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="序号" prop="sort">
                            <el-col :span="9">
                                <el-input-number v-model="form.sort" placeholder="请输入序号"></el-input-number>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="menuID" prop="menuId">
                            <el-col :span="9">
                                <el-input v-model="form.menuId" placeholder="请输入菜单标识"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="菜单类型" prop="permissType">
                            <el-col :span="9">
                                <el-select v-model="permissType" placeholder="请选择菜单类型" clearable>
                                    <el-option v-for="item in permissTypeList" :label="item.label" :value="item.id" :key="item.label"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="permissType && (permissType!=='1' ||  permissType!=='5')">
                        <el-form-item label="菜单位置" prop="permissPosition">
                            <el-col :span="9">
                                <el-radio-group v-model="permissPosition">
                                    <el-radio v-for="item in permissPositionList" :label="item.id" :key="item.label">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-form-item>
                        <button class="bs-form-button i-form-button" type="button" @click.prevent="onSubmit('form')">{{handle=='add'?'保存':'修改'}}</button>
                    </el-form-item>
                </el-form>
            </section>
        </div>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { requestConfigPermission, addMenu, modifyMenu, delMenu } from '@/service/admin_configure.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import tabs from '@/components/common/classificationList/classification/tabs.vue'
    export default {
        name: 'menuManage',
        mixins: [subPermission],
        components: {
            'v-admin-operate': adminOperate,
            'v-tabs': tabs
        },
        data() {
            return {
                isCheckStrictly: false,
                permissionList: [],
                form: {
                    name: '',
                    model: null,
                    url: null,
                    sort: null,
                    menuId: null,
                    status: '1',
                    pid: null,
                    permissType: null
                },
                _form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ]
                },
                pIdList: [],
                modelList: [
                    { id: 'makeradmin', label: '后台管理'},
                    { id: 'makermanage', label: '个人空间后台'}
                ],
                permissType: '',
                permissPosition: '',
                permissTypeList: [
                    { id: '1', label: '菜单'},
                    { id: '2', label: '按钮'},
                    { id: '3', label: '弹窗'},
                    { id: '4', label: '分类'},
                    { id: '5', label: '外链'}
                ],
                permissPositionList: [
                    { id: '', label: '全部'},
                    { id: '1', label: '头部'},
                    { id: '2', label: '列表'}
                ],
                handle: 'add',
                expandList: [],
                checkedPids: [],
                store: null,
                data: null
            }
        },
        watch: {
            pIdList(val) {
                this.$set(this.form, 'pid', val.length ? val[val.length - 1] : null)
            }
        },
        mounted() {
            this._form = Object.assign({}, this.form)
            this.getData()
        },
        methods: {
            /*
             * 获取权限列表
             */
            getData() {
                requestConfigPermission().then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || []
                        this.permissionList = this.filterList(_data)
                    }
                })
            },
            // 过滤子集为空的对象
            filterList(list) {
                if (list) {
                    list.forEach(x => {
                        let _x = x
                        if (_x.children && _x.children.length) {
                            return this.filterList(_x.children)
                        } else {
                            delete _x.children
                            return _x
                        }
                    })
                }
                return list
            },
            // 查找遍历父级菜单
            getParentsList(pId, param) {
                if (pId && pId !== '') {
                    let currentNode = null,
                        list = this.store._getAllNodes()

                    currentNode = list.find((x) => x.data.id.toString() == pId.toString())
                    if (currentNode) {
                        this[param].unshift(currentNode.data.id.toString())
                        this.getParentsList(currentNode.data.pid, param)
                    }
                }
            },
            // 渲染树形菜单按钮
            renderContent(h, { node, data, store }) {
                let icons = { add: 'follow2', edit: 'edit', del: 'close2'}
                this.store = store
                var lisTmpl = this.listBtnGroup.map((btn) => {
                    return  (
                        <i class={'icon-btn-' + icons[btn.menuId]} on-click={ (e) => {
                            window.event ? window.event.cancelBubble = true : e.stopPropagation()
                            this[btn.menuId + 'Permission']({data}, store)
                        } }></i>
                    );
                });
                return (
                    <span>
                        <span class={'el-tree-node__label' + (data.status=='0' ? ' unActive' : '')}>{node.label}</span>
                        <span class="pa-r">{lisTmpl}</span>
                    </span>);
            },
            addPermission({data = {}} = {data}, store) {
                let isFromList = JSON.stringify(data) === '{}' ? false : true
                this.handle = 'add'
                this.pIdList = isFromList ? [data.id.toString()]: []
                this.form = Object.assign({}, this._form)
                if (isFromList) {
                    Object.assign(this.form, { model: data.model, url: data.url})
                    this.getParentsList(data.pid, 'pIdList')
                    this.data = data
                }
            },
            editPermission({data = {}} = {data}, store) {
                this.handle = 'modify'
                let _form = {
                    id: data.id,
                    name: data.label,
                    model: data.model,
                    url: data.url,
                    sort: data.sort,
                    menuId: data.menuId,
                    status: data.status,
                    pid: data.pid
                }
                if (data.permissType !== '') {
                    let _permiss = data.permissType ? data.permissType.split('-') : []
                    this.permissType = _permiss[0] || ''
                    this.permissPosition = _permiss[1] || ''
                }
                this.form = _form
                this.getParentsList(data.pid, 'pIdList')
                this.data = data
            },
            delPermission({data = {}} = {data}, store) {
                let isFromList = JSON.stringify(data) === '{}' ? false : true
                console.log(data)
                if (isFromList) {
                    this.isCheckStrictly = true
                    this.handleCheckChange(data.id, true, true)
                    this.data = data

                    this.isCheckStrictly = !this.isCheckStrictly
                    this.getParentsList(data.pid, 'checkedPids')
                    this.checkedPids.forEach(x => {
                        this.$refs.rpTree.setChecked(x, false, false)
                    })
                    this.checkedPids = []
                } else {
                    this.data = null
                }
                let items = this.$refs.rpTree.getCheckedKeys()
                console.log(items)

                if (items.length) {
                    this.$confirm('确定要删除该菜单及其子级菜单吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        this.doDel({ids: items.join(',')}).then(() => {
                            this.getData()
                        })
                    }).catch(() => {})
                    this.$refs.rpTree.setCheckedKeys([]);
                } else {
                    this.$message({message: '请选择要删除的菜单'})
                }
            },
            /*
             * 批量删除菜单
             * { ids: 'x, x, x'}
             */
            doDel(params) {
                return delMenu(params).then((response) => {
                    if (response.data.code === 200) {
                        this.$message({message: '删除成功', type: 'success'})
                        return Promise.resolve()
                    } else {
                        this.$message.error({ message: response.data.msg })
                        return Promise.reject()
                    }
                })
            },
            // 节点被展开时记录展开节点
            handleNodeExpand(data) {
                this.expandList.push(data.id)
            },
            // 节点被关闭时记录展开节点
            handleNodeCollapse(data) {
                this.expandList = this.expandList.filter(x => x != data.id)
            },
            /*
             * 选取菜单
             */
            handleCheckChange(key, checked, indeterminate) {
                this.$refs.rpTree.setChecked(key, checked, indeterminate)
            },
            /*
             * 保存菜单
             */
            onSubmit() {
                let flag = this.handle == 'add',
                    handler = flag ? addMenu : modifyMenu,
                    handleText = flag ? '添加' : '修改'
                this.getPermissType()
                handler(this.form).then((response) => {
                    if (response.data.code === 200) {
                        this.$message({message: `${handleText}成功`, type: 'success'})
                        Object.assign(this.data, this.form)
                        this.form = Object.assign({}, this._form)
                        this.getData()
                        this.pIdList = []
                        this.handle = 'add'
                    } else {
                        this.$message.error({ message: response.data.msg })
                    }
                })
            },
            permissionChange(value) {
                let _index = value.findIndex((x) => x == this.form.id)
                if (this.form.id && _index >= 0) {
                    this.pIdList.splice(_index)
                    this.$message.error('不能选择他自身及其子级作为父级菜单')
                }
            },
            getPermissType() {
                let _pt = this.permissType,
                    _pp = this.permissPosition,
                    result = null
                if (_pt == '' || _pt == '1' || _pp == '') {
                    result = _pt
                } else {
                    result = [_pt, _pp].join('-')
                }
                this.$set(this.form, 'permissType', result)
            }
        }
    }
</script>