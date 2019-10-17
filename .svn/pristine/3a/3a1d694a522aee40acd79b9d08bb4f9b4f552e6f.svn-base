<template>
    <div class="backend-content__middle">
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{}"></v-admin-operate>
        <!-- 角色权限 -->
        <el-dialog title="配置角色权限" v-model="dialogVisible" class="role-permission-modal">
            <el-tree show-checkbox accordion ref="rpTree" node-key="id" :check-strictly="isCheckStrictly" :data="permissionList" :props="{label: 'name', children: 'children' }" @check-change="handleCheckChange"></el-tree>
            <section class="bs-d-btn-group">
                <button type="button" class="bs-search-button i-form-button" @click="onSubmit">确定</button>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="dialogVisible=false">取消</button>
            </section>
        </el-dialog>
        <!-- 角色列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable">
            <el-table-column prop="code" label="角色编码">
                <template scope="scope">
                    <a class="item-detail" @click="getRolePermission({data: scope.row})">{{scope.row.code}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="remark" label="描述"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: getRolePermission
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { requestSystemRole, requestSystemPermission, requestSystemRolePermission, addRolePermission } from '@/service/admin_system.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    export default {
        name: 'roleManage',
        mixins: [subPermission],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        data() {
            return {
                search: {       // 搜索参数
                    model: 'makeradmin',
                    code: null, // 角色编码
                    name: null  // 角色名称
                },
                pageParam: {
                    pageNum: 1,
                    pageSize: 20
                },
                items: [],      // 角色列表
                permissionList: [], // 权限列表
                isCheckStrictly: true,
                dialogVisible: false,
                curRoleId: '',
                curRolePermissionList: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            /*
             * 获取角色列表
             */
            getData() {
                let params = Object.assign({}, this.form, this.pageParam);
                requestSystemRole(params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
                        if (_data !== null && _data.length) {
                            _data.forEach(item => {
                                // 状态转译
                                dataTranslation(item.status, 'status').then(res => {
                                    item.status = res;
                                })
                            })
                        }
                        this.items = _data;
                    }
                })
            },
            /*
             * 获取权限列表
             */
            getPermissionData() {
                if (!this.permissionList.length) {
                    return requestSystemPermission({ status: 1 }).then(response => {
                        if (response.data.code == 200) {
                            this.permissionList = response.data.entity;
                        }
                    })
                } else {
                    return Promise.resolve();
                }
            },
            /*
             * 获取角色权限列表
             * roleId: 角色ID
             */
            getRolePermissionData() {
                requestSystemRolePermission({ roleId: this.curRoleId }).then(response => {
                    if (response.data.code == 200) {
                        this.isCheckStrictly = true;
                        let _data = response.data.entity;
                        _data.map(x => {
                            x.id = x.permissionId;
                            delete x.permissionId;
                            delete x.roleId;
                            return x
                        })
                        this.curRolePermissionList = JSON.parse(JSON.stringify(_data));
                        _data.forEach( x => {
                            this.handleCheckChange({ id: x.id }, true, false)
                        })
                        this.isCheckStrictly = !this.isCheckStrictly
                    }
                })
            },
            /*
             * 打开并获取角色权限弹框
             */
            getRolePermission({data: item} = {data}) {
                this.getPermissionData().then(x => {
                    this.$refs.rpTree.setCheckedKeys([]);
                    if (this.curRoleId != item.id) {
                        this.curRoleId = item.id;
                        this.getRolePermissionData();
                    } else {
                        this.curRolePermissionList.forEach( x => {
                            this.handleCheckChange({ id: x.id }, true, false)
                        })
                    }
                })
                this.dialogVisible = !this.dialogVisible;
            },
            /*
             * 选取用户权限
             */
            handleCheckChange(data, checked, indeterminate) {
                this.$refs.rpTree.setChecked(data, checked, indeterminate);
            },
            /*
             * 保存用户权限
             * 格式: [{ roleId: '', permissionId: ''}]
             */
            onSubmit() {
                let permissionList = this.$refs.rpTree.getCheckedNodes();
                let permissions = [];
                if (permissionList.length) {
                    permissionList.forEach(x => {
                        let _permission = {};
                        _permission.permissionId = x.id;
                        _permission.roleId = this.curRoleId;
                        permissions.push(_permission)
                    })
                } else {
                    permissions.push({permissionId: '', roleId: this.curRoleId});
                }
                addRolePermission(permissions).then(response => {
                    if (response.data.code == 200) {
                        this.dialogVisible = false;
                        this.curRolePermissionList = Object.assign([], permissionList);
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            /*
             * 改变分页
             */
            changePage() {

            }
        }
    }
</script>

<style lang="scss">
.role-permission-modal {
    .el-dialog {
        width: 600px;
    }
    .el-tree {
        height: 360px;
        overflow: auto;
    }
}
</style>
<style lang="scss" scoped>
.bs-d-btn-group {
    margin-top: 14px;
}
</style>