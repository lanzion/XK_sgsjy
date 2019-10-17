<template>
  <div class="quota-level-one">
    <div class="options">
      一级指标：
      <el-select v-model="selected.pId" placeholder="请选择" class="select">
        <el-option v-for="(item, i) in levelOneList" :label="item.name" :value="item.id" :key="i"></el-option>
      </el-select>
    </div>
    <v-admin-operate :items="headBtnGroup" v-bind="{add: showDialog}" btnType="head" :hierarchy="1"></v-admin-operate>
    <!-- 课程列表 -->
    <el-table :data="items" ref="multipleTable" border class="data-table back-stage-table" style="width: 100%">
      <!--<el-table-column type="selection" width="50"/>-->
      <el-table-column prop="name" label="二级指标" sortable/>
      <el-table-column prop="evaluationPoint" label="测评点" sortable width="400">
        <template scope="scope">
          <p v-html="handleEvaluationPoint(scope.row.evaluationPoint)" class="evaluation-point"></p>
        </template>
      </el-table-column>
      <el-table-column label="省市区" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.eduProvinceId}}{{scope.row.eduCityId}}{{scope.row.areaId}}
        </template>
      </el-table-column>
      <el-table-column prop="schoolId" label="学校"/>
      <el-table-column label="操作">
        <template scope="scope">
          <v-admin-operate
            v-bind="{edit: showDialog, del: deleteItem, items: listBtnGroup, data: scope.row, index: scope.$index}"/>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination v-bind="{param: pageParam, changePage: requestList}"/>
    <add-quota v-if="dialog.isVisible" v-bind="{dialog, handleRequest: requestList, curEditingItem, propLevelOneList}"/>
  </div>
</template>

<script>
  import { subPermission } from '@/mixin/getAdminMenu.js'
  import { requestPlainLevelOneQuota, requestLevelTwoQuota, deleteQuota } from '@/service/admin_evaluation.js'
  import adminOperate from '@/components/common/operate.vue'
  import pagination from '@/components/common/admin_pagination.vue'
  import addQuota from '@/components/evaluation/add_quota_dialog.vue'

  export default {
    name: 'levelTwo', // 二级指标
    mixins: [subPermission],
    data () {
      return {
        curEditingItem: {},
        dialog: {isVisible: false},
        items: [],
        levelOneList: [],
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 0
        },
        propLevelOneList: [],
        selected: {
          pId: undefined,
        }
      }
    },
    created () {
      this.requestList()
      this.requestLevelOneList()
    },
    components: {
      'v-admin-operate': adminOperate,
      'v-pagination': pagination,
      addQuota
    },
    methods: {
      async requestLevelOneList () { // 获取一级指标列表
        let res = await requestPlainLevelOneQuota()
        if (res.status === 200 && res.data.code === 200) {
          let entity = res.data.appendInfo || {}
          this.propLevelOneList = entity.list || []
          this.levelOneList = [{name: '全部', id: null}, ...this.propLevelOneList]
        }
      },
      async requestList () { // 获取二级指标列表
        let res = await requestLevelTwoQuota({...this.pageParam, ...this.selected})
        if (res.status === 200 && res.data.code === 200) {
          let entity = res.data.entity || {}
          this.items = entity.resultData || []
          this.pageParam.totalNum = entity.totalNum || 0
        }
      },
      deleteItem ({data = {}} = options) { // 删除指标
        deleteQuota({id: data.id}).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: '成功删除指标', duration: 1000})
            this.requestList()
            return
          }
          this.$message.error(res.data.msg || '删除指标失败，请重试')
        }, () => {
          this.$message.error('删除指标失败，请重试')
        })
      },
      handleEvaluationPoint (txt) {
        return !txt ? '' : txt.replace(/\n/g, '</br>')
      },
      showDialog (options = {}) {
        this.curEditingItem = options.model === 'edit' ? {...options.data, type: 'edit'} : {}
        this.dialog.isVisible = true
      }
    },
    watch: {
      selected: {
        handler () {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .evaluation-point {
    text-align: left;
    padding: 5px 30px;
  }

  .options {
    margin-bottom: 10px;
    font-size: 14px;
  }
</style>
