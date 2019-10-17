<template>
    <div class="backend-content__middle">
        <section class="audit-wrap">
            <v-tab :tabs="[{name: '注册安全'}]"></v-tab>
            <el-form ref="form" label-width="150px">
                <el-row>
                    <el-form-item label="注册是否需要审核" prop="account">
                        <el-col :span="8">
                            <el-switch v-model="isCheck.mvalue" on-text="" off-text="" on-value="1" off-value="0" @change="changeAudit"></el-switch>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
    </div>
</template>

<script>
    import { requestSecurity, modifySecurity } from '@/service/admin_configure.js'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import tabs from '@/components/common/tabs.vue'

    export default {
        name: 'safeView',
        mixins: [
            subPermission
        ],
        data() {
            return {
                // 注册是否需要审核
                isCheck: {
                    mvalue: '0'
                }
            }
        },
        components: {
            'v-tab': tabs
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                requestSecurity({ mkey: 'isCheck' }).then(response => {
                    if (response.data.code === 200) {
                        let _data = response.data.entity || {}
                        this.isCheck = _data
                    }
                })
            },
            changeAudit() {
                modifySecurity(this.isCheck).then(response => {
                    if (response.data.code === 200) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang='scss'>
@import '~@/assets/css/scss/table.scss';
@import '~@/assets/css/scss/admin_back-stage_content.scss';
</style>