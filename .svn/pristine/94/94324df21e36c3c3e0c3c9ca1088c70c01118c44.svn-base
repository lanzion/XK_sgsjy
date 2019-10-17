<template>
  <section class="course-share-wrapper dpd15">
    <div class="btn-row">
      <button @click="dialog.isVisible = true" class="btn-upload">上传资源</button>
    </div>
    <el-table class="data-table" :data="resourceList" style="width: 100%" border>
      <el-table-column prop="resourceName" label="资源名称" sortable></el-table-column>
      <el-table-column prop="userName" label="上传人" align="center" sortable></el-table-column>
      <el-table-column prop="createDate" label="上传时间" width="180" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <operate @on-delete="delResource(scope.row.id)" @on-edit="editItem(index)" :icon-group="generateIcons()" :download-resource="{'id': scope.row.resourceId, 'name': scope.row.resourceName}" label="资源"></operate>
        </template>
      </el-table-column>
    </el-table>
    <pagination :param="pageParam" :change-page="getResourceList"></pagination>
    <upload-resource v-if="dialog.isVisible" :dialog="dialog" :handle-request="getResourceList"></upload-resource>
  </section>
</template>

<script>
  import { requestResourceList, deleteResource } from '@/service/course.js'
  import { mapState } from 'vuex'
  import operate from 'components/common/operate.vue'
  import pagination from 'components/common/pagination.vue'
  import uploadResource from 'components/course/upload_resource_dialog.vue'

  export default {
    name: 'courseDetailShare', // 课程详情-资源共享
    inheritAttrs: false,

    data() {
      return {
        dialog: {
          isVisible: false
        },
        pageParam: {
          pageSize: 8,
          pageNum: 1,
          totalNum: 0
        },
        resourceList: [],
      }
    },

    computed: {
      ...mapState('course', ['courseDetail'])
    },

    created() {
      this.getResourceList()
    },

    components: {
      operate,
      pagination,
      uploadResource
    },

    methods: {
      async getResourceList() { // 获取资源列表
        const res = await requestResourceList({
          ...this.pageParam,
          courseId: this.$route.query.id || ''
        })

        if (res.data.code === 200) {
          const { resultData, totalNum } = res.data.entity || {}
          this.resourceList = resultData || []
          this.pageParam.totalNum = totalNum || 0
        }
      },
      delResource(id) { // 删除共享资源
        deleteResource({ id }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '成功删除资源',
              type: 'success'
            })
            this.getResourceList()
          }
        })
      },
      generateIcons() {
        const loginUId = this.$ls.get('loginUId')
        const { createId } = this.courseDetail || {}
        const del = loginUId === createId ? 'delete' : ''
        return [del, 'download']
      },
    }
  }
</script>
<style lang="scss">
  @import "~@/assets/css/scss/vars.scss";

  @each $color-key,
  $color-value in $color-data {
    .theme-#{$color-key} {
      .course-share-wrapper .btn-upload {
        background-color: $color-value;
      }
    }
  }

  .course-share-wrapper {
    .btn-row {
      margin-bottom: 10px;
      text-align: right;
      .btn-upload {
        box-sizing: border-box;
        width: 90px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        padding: 0;
        border: 0;
        border-radius: $button-radiu;
        &:hover {
          opacity: 0.75;
        }
      }
    }
    .el-table {
      overflow: visible;
      .cell {
        overflow: visible;
      }
    }
    .el-table__body-wrapper {
      overflow: visible;
      .operate {
        position: static;
        font-size: 0px;
        .icon {
          font-size: 16px;
        }
      }
    }
  }
</style>
