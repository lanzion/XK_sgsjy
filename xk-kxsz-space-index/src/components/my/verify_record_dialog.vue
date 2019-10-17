<template>
  <el-dialog :visible.sync="dialog.isVisible" title="审核记录" class="verify-record__wrapper">
    <div class="verify-record__content">
      <el-table :data="recordList" class="data-table" border>
        <el-table-column property="auditOrgName" label="审核节点" show-overflow-tooltip></el-table-column>
        <el-table-column property="userName" label="审核人" show-overflow-tooltip></el-table-column>
        <el-table-column property="auditDate" label="审核时间" width="180">
          <template scope="scope">
            {{scope.row.auditDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column property="auditStatus" label="审核结果">
          <template scope="scope">
            <el-tag :class="['__color-'+auditStatusStyle[scope.row.auditStatus]]">
              {{scope.row.auditStatus | translate(auditStatusDL)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="remarks" label="审核意见" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  import { requestVerifyRecordList } from '@/service/common.js'
  import {mapState} from 'vuex'

  export default {
    name: 'verifyRecord', // 审核记录弹窗
    data () {
      return {
        auditStatusStyle: {
          '-1': 'pending',
          '0': 'submit',
          '1': 'success',
          '2': 'fail',
          '3': 'auditing'
        },
        recordList: []
      }
    },
    computed: {
      ...mapState('dictionaryCommon', {
        auditStatusDL: state => (state.auditStatusDicList || {}).dicList || []
      })
    },
    props: {
      api: {
        type: String,
        default: ''
      },
      curRecordId: {
        type: String,
        default: ''
      },
      dialog: {
        type: Object,
        default () {
          return {}
        }
      },
      moduleId: { // 请求接口的模块ID
        type: String,
        default: 'courseId'
      },
    },
    created () {
      this.requestList()
    },
    methods: {
      requestList () { // 获取记录列表
        requestVerifyRecordList(
          this.api,
          {[this.moduleId]: this.curRecordId}
        ).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            const _data = res.data.appendInfo || {}
            this.recordList = _data.list || []
          }
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss">
  .verify-record__wrapper .el-dialog {
    box-sizing: border-box;
    min-width: 800px;
    .el-dialog__body {
      padding: 20px;
    }
    .el-table .cell {
      text-align: center;
      white-space: nowrap;
    }
  }
</style>

