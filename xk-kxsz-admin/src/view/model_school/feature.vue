<template>
  <div class="feature-wrapper backend-content__middle">
    <section class="option-box clearfix">
      <el-input v-model="selected.name" @keyup.enter.native="requestList" class="fl bs-search-input"
                placeholder="请输入标题"></el-input>
      <button @click="requestList" class="fl bs-search-button i-form-button is-plain">搜索</button>
    </section>
    <v-admin-operate :items="headBtnGroup" v-bind="{add: showDialog, del: showMessageBox}"
                     btnType="head"></v-admin-operate>
    <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border
              class="data-table back-stage-table"
              style="width: 100%">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="name" label="标题" sortable show-overflow-tooltip/>
      <el-table-column label="主图">
        <template scope="scope">
          <figure class="pic">
            <img :src="getFileUrl(scope.row.cover) || listDefault" class="img" alt="" width="100" height="64">
          </figure>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" sortable show-overflow-tooltip>
        <template scope="scope">
          {{scope.row.createDate | dateFormat('yyyy-MM-dd HH:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="发布人" sortable show-overflow-tooltip/>
      <el-table-column label="操作">
        <template scope="scope">
          <v-admin-operate
            v-bind="{del: deleteItem, edit: editItem, items: listBtnGroup, data: scope.row}"/>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination v-bind="{param: pageParam, changePage: requestList}"/>

    <feature-dialog v-if="dialog.isVisible" v-bind="{dialog, handleRequest: requestList, curEditingItem}"/>
  </div>
</template>

<script>
  import { subPermission } from '@/mixin/getAdminMenu.js'
  import {
    requestBackendFeatureList,
    deleteFeature,
  } from '@/service/model_school.js'

  import adminOperate from '@/components/common/operate.vue'
  import pagination from '@/components/common/admin_pagination.vue'
  import featureDialog from '@/components/model_school/add_feature_dialog.vue'

  export default {
    name: 'modelFeature', // 示范校--教育特色

    mixins: [subPermission],

    data () {
      return {
        curEditingItem: {},

        dialog: {isVisible: false},

        items: [],

        pageParam: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 0
        },

        selected: {
          name: '',
        },

        selectedItems: []
      }
    },

    created () {
      this.requestList()
    },

    components: {
      'v-admin-operate': adminOperate,
      'v-pagination': pagination,
      featureDialog
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestBackendFeatureList({...this.pageParam, ...this.selected})

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.items = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      // 删除
      deleteItem ({data = {}} = {}) {
        const errMsg = '删除教育特色失败，请重试'

        deleteFeature([{id: data.id}]).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: '成功删除教育特色', duration: 1000})
            this.requestList()
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },

      // 批量删除
      deleteItems () {
        const errMsg = '删除教育特色失败，请重试'

        deleteFeature(this.selectedItems).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: '成功删除教育特色', duration: 1000})
            this.requestList()
            this.selectedItems.splice(0)
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },

      editItem ({data = {}} = {}) {
        this.dialog.isVisible = true
        this.curEditingItem = {...data, action: 'edit'}
      },

      // 选中某一行，加入删除的数组
      handleSelect (selectedArr) {
        this.selectedItems = selectedArr.map(item => ({id: item.id}))
      },

      showDialog () {
        this.dialog.isVisible = true
        this.curEditingItem = {}
      },

      // 显示批量删除提示框
      showMessageBox () {
        if (this.selectedItems.length === 0) {
          this.$message({type: 'info', message: '请先选择需要删除的教育特色', duration: 1500})
          return
        }

        this.$confirm('您确定要删除选中的教育特色吗？', '提示', {
          customClass: '__custom-msg-box',
          type: 'warning'
        }).then(() => {
          this.deleteItems()
        }).catch(e => {})
      }
    },
  }
</script>
<style lang="scss" scoped>
  .feature-wrapper {
    .back-stage-table.el-table .cell {
      .pic {
        width: 100px;
        height: 64px;
        margin: 0 auto;
        padding: 5px 0;
        .img {
          width: 100px;
          height: 64px;
          margin: 0;
        }
      }
    }
  }

</style>
