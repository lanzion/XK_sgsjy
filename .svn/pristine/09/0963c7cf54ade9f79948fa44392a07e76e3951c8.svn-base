<template>
  <div class="achievement-wrapper">
    <div class="aside backend-content__middle fl">
      <div class="btn-group">
        <button @click="handleCategoryBtnClick" class="bs-search-button btn i-form-button">新增分类</button>
        <button @click="handleCategoryBtnClick({action: 'edit'})" :class="{disabled: editCategoryIsDisabled}"
                class="bs-search-button btn i-form-button is-plain">
          修改分类
        </button>
      </div>
      <ul class="category-list">
        <li v-for="(item, idx) in categoryList" @click="handleCategoryItemClick(idx, item.id)" :key="idx"
            :class="{active: selectedCategoryIdx === idx}" class="category-item">{{item.name}}
        </li>
      </ul>
    </div>
    <div class="main backend-content__middle">
      <section class="option-box clearfix">
        <el-input v-model="selected.name" @keyup.enter.native="requestList" class="fl bs-search-input" placeholder="请输入标题"></el-input>
        <button @click="requestList" class="fl bs-search-button i-form-button is-plain">搜索</button>
      </section>
      <v-admin-operate :items="headBtnGroup" v-bind="{add: showAchievementDialog, del: showMessageBox}"
                       btnType="head"></v-admin-operate>
      <el-table :data="items" @select="handleSelect" @select-all="handleSelect" border
                class="data-table back-stage-table"
                style="width: 100%">
        <el-table-column type="selection" width="50"/>
        <el-table-column prop="name" label="标题" sortable show-overflow-tooltip/>
        <el-table-column prop="type" label="类型" sortable show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.type | translate(categoryList, {key: 'id'})}}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="发布时间" sortable show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="发布人" sortable show-overflow-tooltip/>
        <el-table-column label="操作">
          <template scope="scope">
            <v-admin-operate
              v-bind="{del: deleteItem, edit: editAchievementItem, items: listBtnGroup, data: scope.row}"/>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination v-bind="{param: pageParam, changePage: requestList}"/>
    </div>
    <category-dialog v-if="dialog.isVisible"
                     v-bind="{dialog, schoolId, handleRequest: requestCategoryList, curEditingItem}"/>
    <achievement-dialog v-if="achievementDialog.isVisible"
                        v-bind="{categoryList, schoolId, dialog: achievementDialog, handleRequest: requestList, curEditingItem}"/>
  </div>
</template>

<script>
  import { subPermission } from '@/mixin/getAdminMenu.js'
  import {
    requestBackendAchievementList,
    deleteAchievement,
    requestAchievementCategoryList,
  } from '@/service/model_school.js'

  import adminOperate from '@/components/common/operate.vue'
  import pagination from '@/components/common/admin_pagination.vue'
  import categoryDialog from '@/components/model_school/add_achievement_category.vue'
  import achievementDialog from '@/components/model_school/add_achievement_dialog.vue'

  export default {
    name: 'modelAchievement', // 示范校--建设成果

    mixins: [subPermission],

    data () {
      return {
        achievementDialog: {isVisible: false},

        categoryList: [],

        curEditingItem: {},

        dialog: {isVisible: false},

        items: [],

        pageParam: {
          pageNum: 1,
          pageSize: 20,
          totalNum: 0
        },

        schoolId: '',

        selected: {
          name: '',
          type: null,
        },

        selectedCategoryIdx: -1,

        selectedItems: []
      }
    },

    computed: {
      editCategoryIsDisabled () {
        const defaultCurCategoryIdx = -1
        return this.selectedCategoryIdx === defaultCurCategoryIdx
      }
    },

    created () {
      const loginInfo = this.$ls.get('loginInfo')
      this.schoolId = loginInfo && loginInfo.userInfo.baseId || ''
      this.requestList()
      this.requestCategoryList()
    },

    components: {
      'v-admin-operate': adminOperate,
      'v-pagination': pagination,
      categoryDialog,
      achievementDialog,
    },

    methods: {
      // 获取列表
      async requestList () {
        const res = await requestBackendAchievementList({...this.pageParam, ...this.selected})

        if (res.status === 200 && res.data.code === 200) {
          const {resultData, totalNum} = res.data.entity || {}
          this.items = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },

      // 成果分类列表
      async requestCategoryList () {
        const res = await requestAchievementCategoryList()

        if (res.status === 200 && res.data.code === 200) {
          this.categoryList = res.data.entity || []
        }
      },

      // 删除
      deleteItem ({data = {}} = {}) {
        const errMsg = '删除建设成果失败，请重试'

        deleteAchievement([{id: data.id}]).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: '成功删除建设成果', duration: 1000})
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
        const errMsg = '删除建设成果失败，请重试'

        deleteAchievement(this.selectedItems).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message({type: 'success', message: '成功删除建设成果', duration: 1000})
            this.requestList()
            this.selectedItems.splice(0)
            return
          }

          this.$message.error(res.data.msg || errMsg)
        }).catch(() => {
          this.$message.error(errMsg)
        })
      },

      editAchievementItem ({data = {}} = {}) {
        this.achievementDialog.isVisible = true
        this.curEditingItem = {...data, action: 'edit'}
      },

      handleCategoryBtnClick ({action} = {}) {
        const {selectedCategoryIdx, categoryList, editCategoryIsDisabled} = this

        if (action === 'edit') {
          if (editCategoryIsDisabled) return false

          this.dialog.isVisible = true

          this.curEditingItem = {
            action,
            ...(categoryList[selectedCategoryIdx] || {}),
          }

          return
        }

        this.dialog.isVisible = true
        this.curEditingItem = {}
      },

      handleCategoryItemClick (idx, id) {
        this.selectedCategoryIdx = idx
        this.selected.type = id
        this.requestList()
      },

      // 选中某一行，加入删除的数组
      handleSelect (selectedArr) {
        this.selectedItems = selectedArr.map(item => ({id: item.id}))
      },

      showAchievementDialog () {
        this.achievementDialog.isVisible = true
        this.curEditingItem = {}
      },

      // 显示批量删除提示框
      showMessageBox () {
        if (this.selectedItems.length === 0) {
          this.$message({type: 'info', message: '请先选择需要删除的建设成果', duration: 1500})
          return
        }

        this.$confirm('您确定要删除选中的建设成果吗？', '提示', {
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
  $item-height: 40px;

  .achievement-wrapper {
    .aside {
      box-sizing: border-box;
      width: 292px;
      margin-right: 14px;
      .btn {
        width: 100%;
        height: $item-height;
        line-height: 1;
        margin-left: 0;
        &.disabled {
          cursor: not-allowed;
          pointer-events: none;
        }
      }
      .btn + .btn {
        margin-top: 10px;
      }
    }
    .main {
      overflow: hidden;
    }
    .category-list {
      margin-top: $item-height;
      .category-item {
        height: $item-height;
        line-height: $item-height;
        text-indent: 40px;
        text-align: left;
        font-size: 14px;
        cursor: pointer;
        &.active,
        &:hover {
          background-color: #0594e8;
          color: #fefefe;
        }
      }
    }
  }
</style>
