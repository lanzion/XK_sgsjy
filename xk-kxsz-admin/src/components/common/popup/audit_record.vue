<template>
	<div class="audit_record">
		<div class="table-box">
            <el-table :data="auditData" style="width: 100%" class="data-table back-stage-table" border>
                <el-table-column prop="auditOrgName" label="审核节点" show-overflow-tooltip>
                    <template scope="scope">
                        {{scope.row.auditOrgName || scope.row.userName}}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="审核人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="auditDate" label="审核时间" show-overflow-tooltip :width="180">
                    <template scope="scope">
                        {{scope.row.auditDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column prop="auditStatus" label="审核结果" show-overflow-tooltip :width="100">
                    <template scope="scope">
                        <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
                            {{scope.row.auditStatus | translate(auditStatusDL)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="审核意见" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <section class="bs-d-btn-group">
            <button class="bs-search-button i-form-button" type="button" @click="close">关闭</button>
        </section>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'Vuex'
	export default {
		name: 'audit_record',
		data () {
			return {
                auditStatusStyle: {
                    '0': 'submit',
                    '1': 'success',
                    '2': 'fail',
                    '3': 'auditing'
                }
            }
        },
        props:{
			auditData:{
				type: Array,
				default () {
					return []
				}
			},
			close: Function
		},
		computed: {
            ...mapState('dictionaryCommon', {
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                }
            }),
        },
	}
</script>

<style lang="scss" scoped>
	.table-box{
        margin: 0px 0 20px;
    }
</style>