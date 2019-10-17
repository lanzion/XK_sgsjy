<template>
    <div class="table-layout">
        <!-- 导航列表 -->
        <section class="backend-content__middle table-cell menu-cell menu-tree">
            <div class="menu-title">导航列表</div>
                <v-admin-operate class="type-btn-group" :items="headBtnGroup" btnType="head" v-bind="{
                    add: { callback: addNav },
                    edit: { callback: editNav },
                    del: { callback: delNav }
                }"></v-admin-operate>
            <el-tree show-checkbox ref="rpTree" node-key="id" :auto-expand-parent="false" :data="navList" :props="{label: 'name', children: 'children' }" :check-strictly="isCheckStrictly" @check-change="handleCheckChange" :render-content="renderContent" :default-expanded-keys="expandList" @node-expand="handleNodeExpand" @node-collapse="handleNodeCollapse"></el-tree>
        </section>
        <!-- 导航详情 -->
        <div class="menu-content table-cell menu-cell">
            <section class="backend-content__middle submit-form">
                <v-tabs :tabs="[{name: '导航详情'}]" ></v-tabs>
                <el-form ref="form" label-position="right" label-width="114px" :model="form" :rules="rules">
                    <el-row>
                        <el-form-item label="导航名称" prop="name">
                            <el-col :span="10">
                                <el-input v-model.trim="form.name" placeholder="请输入导航名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="父级导航" prop="pid">
                            <el-col :span="10">
                                <el-cascader :options="navList" v-model="pIdList" :props="{value: 'id', label: 'name', children: 'children'}" change-on-select clearable placeholder="请选择父级导航" @change="navChange"></el-cascader>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="URL" prop="url">
                            <el-col :span="10">
                                <el-input v-model="form.url" placeholder="请输入URL地址"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="状态" prop="status">
                            <el-col :span="10">
                                <el-switch v-model="form.status" on-text="" off-text="" on-value="1" off-value="0"></el-switch>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="序号" prop="sort">
                            <el-col :span="10">
                                <el-input-number v-model="form.sort" placeholder="请输入序号"></el-input-number>
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
    import { requestNavList, addNav, modifyNav, delNav } from '@/service/admin_configure.js'
    import adminOperate from '@/components/common/operate.vue'
    import tabs from '@/components/common/tabs.vue'
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
                navList: [],
                form: {
                    name: '',
                    model: 'makerIndex',
                    url: null,
                    sort: null,
                    status: '1',
                    pid: '-1',
                    permissType: '1'
                },
                _form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入导航名称', trigger: 'blur' }
                    ]
                },
                pIdList: [],
                handle: 'add',
                expandList: [],
                checkedPids: [],
                store: null,
                data: null
            }
        },
        watch: {
            pIdList(val) {
                this.$set(this.form, 'pid', val.length ? val[val.length - 1] : '-1')
            }
        },
        mounted() {
            this._form = Object.assign({}, this.form)
            this.getData()
        },
        methods: {
            /*
             * 获取导航列表
             */
            getData() {
                requestNavList().then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.appendInfo.list || []
                        this.navList = this.filterList(_data)
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
            // 查找遍历父级导航
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
            // 渲染树形导航按钮
            renderContent(h, { node, data, store }) {
                let icons = { add: 'follow2', edit: 'edit', del: 'close2'}
                this.store = store
                var lisTmpl = this.listBtnGroup.map((btn) => {
                    return (
                        <i class={'icon-btn-' + icons[btn.menuId]} on-click={ () => {
                            window.event ? window.event.cancelBubble = true : e.stopPropagation()
                            this[btn.menuId + 'Nav']({data}, store)
                        } }></i>
                    )
                })
                return (
                    <span>
                        <span class={'el-tree-node__label' + (data.status=='0' ? ' unActive' : '')}>{node.label}</span>
                        <span class="pa-r">{lisTmpl}</span>
                    </span>);
            },
            addNav({data = {}} = {data}, store) {
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
            editNav({data = {}} = {data}, store) {
                this.handle = 'edit'
                this.pIdList = []
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
                this.form = _form
                this.getParentsList(data.pid, 'pIdList')
                this.data = data
            },
            delNav({data = {}} = {data}, store) {
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
                    let params = []
                    items.forEach(x => {
                        params.push({ id: x })
                    })
                    this.$confirm('确定要删除该导航及其子级导航吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        this.doDel(params).then(() => {
                            this.getData()
                        })
                    }).catch(() => {})
                    this.$refs.rpTree.setCheckedKeys([]);
                } else {
                    this.$message({message: '请选择要删除的导航'})
                }
            },
            /*
             * 批量删除导航
             * { ids: 'x, x, x'}
             */
            doDel(params) {
                return delNav(params).then((response) => {
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
             * 选取导航
             */
            handleCheckChange(key, checked, indeterminate) {
                this.$refs.rpTree.setChecked(key, checked, indeterminate)
            },
            /*
             * 保存导航
             */
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let flag = this.handle == 'add',
                            handler = flag ? addNav : modifyNav,
                            handleText = flag ? '添加' : '修改'
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
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            navChange(value) {
                let _index = value.findIndex((x) => x == this.form.id)
                if (this.form.id && _index >= 0) {
                    this.pIdList.splice(_index)
                    this.$message.error('不能选择他自身及其子级作为父级导航')
                }
            }
        }
    }
</script>