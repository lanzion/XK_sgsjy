<template>
    <el-dialog title="勾搭列表" :visible.sync="hookUpWithPopup.isVisible" size="small">
        <el-form :inline="true" class="bs-screening_box">
            <el-form-item>
                <v-search :tips="'勾搭人'" @search="getSearch" class="fl" style="margin-right:20px;"></v-search>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="selected" placeholder="请选择状态" filterable clearable>
                    <el-option v-for="item in hookUpWithStatusOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%; margin-top:20px;" ref="multipleTable">
            <el-table-column prop="linkMan" label="勾搭人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="联系方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seduceDate" label="勾搭时间" show-overflow-tooltip>
                <template scope="scope">
                    {{ scope.row.seduceDate | dateFormat('yyyy.MM.dd') }}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="勾搭备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="状态" width="100" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.status | translate(hookUpWithStatusOptions)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <span class="operation_btn" @click="hookuphookupRevert(scope.row.id, 3)">同意勾搭</span>
                    <span class="operation_btn" @click="hookuphookupRevert(scope.row.id, 4)">拒绝勾搭</span>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage"></v-pagination>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import search from 'Common/search.vue'
import { hookupWithList, hookupWithAudit } from '@/service/service.js'
import pagination from '@/components/common/pagination.vue'  // 分页组件
export default {
    data() {
        return {
            title:'',
            items: [],
            selected: '',
            search: '',
            // 分页参数
            pageParam: {
                pageNum: 1,
                pageSize: 10
            },
        }
    },
    props: {
        curHookId: String,
        hookUpWithPopup: {
            type: Object,
            default: {
                isVisible:false
            }
        },
        type: String
    },
    methods: {
        hookuphookupRevert (id, status) {
            hookupWithAudit({ id, status }).then(res => {
                if(res.data.code === 200) {
                    this.getListData()
                }
            })
        },
        getSearch (val) {
            this.search = val
        },
        getListData () {
            hookupWithList ({ busName: this.search, status: this.selected, busId: this.curHookId, type: this.type }, this.pageParam).then(res => {
                if(res.data.code === 200 && res.data.entity) {
                    this.items = res.data.entity.resultData
                    this.pageParam.totalNum = res.data.entity.totalNum
                }
            })
        },
        // 改变分页
        changePage(pageNum) {
            this.$set(this.pageParam, 'pageNum', pageNum);
            this.getListData()
        },
    },
    components: {
        'v-search': search,
        'v-pagination': pagination
    },
    computed: {
        // 状态
        ...mapState('dictionaryCommon', {
            hookUpWithStatusOptions (state) {
                let dicList = (state['hookUpWithStatusDicList'] || {}).dicList || []
                return dicList
            }
        }),
        params: function() {
            return Object.assign( {}, {selected: this.selected}, {search: this.search}, {curHookId: this.curHookId} )
        }
    },
    mounted() {
    },
    watch:{
        params: {
            handler: function(val,oldVal) {
                this.getListData()
            },
            deep:true
        },
    }
}
</script>

<style lang='scss' scoped>
.operation_btn {
    padding: 0 10px;
    cursor: pointer;
    &:hover {
        color: #d00;
    }
}
</style>

