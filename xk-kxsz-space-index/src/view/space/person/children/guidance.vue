<template>
  <div class="guidance">
    <div class="sub-nav">
      <span class="total">指导总量：<i class="num blue">{{relatedData.guidanceNum || 0}}</i></span>
      <el-radio-group v-model="selectedType">
        <el-radio v-for="(item, i) in options" :label="item.type" :key="i">{{item.name}}（{{item.num}}）</el-radio>
      </el-radio-group>
    </div>
    <div class="options-and-search clearfix">
      <div class="options fl">
        <multi-select :selectData="category" :key="selectedType"
                      :model="selectedType === '1' && 'course' ||  selectedType === '2' && 'project' || 'activity'"
                      :ifAll='false' style="width:130px;display:inline-block;" :clearable='true'></multi-select>
        <single-select v-if="selectedType === '1' || selectedType === '2'" :selected.sync="selected.technologyId"
                       :single-select-data="{groupCode: 'technicalClassification', placeholder: '选择技术'}"
                       style="width:130px;"></single-select>
        <single-select v-if="selectedType === '1'" :selected.sync="selected.grade" :key="selectedType"
                       :single-select-data="{groupCode: 'courseGrade', placeholder: '选择级别'}"
                       style="width:130px;"></single-select>
        <single-select v-if="selectedType === '2'" :selected.sync="selected.applyScopeId" :key="selectedType"
                       :single-select-data="{groupCode: 'periodKey', placeholder: '选择学段'}"
                       style="width:130px;"></single-select>
        <template v-if="selectedType === '3'">
          <single-select :selected.sync="selected.enrollStatus" :key="selectedType"
                         :single-select-data="{groupCode: 'activityRegister', placeholder: '报名状态'}"
                         style="width:130px;"></single-select>
          <single-select :selected.sync="selected.status" :key="selectedType"
                         :single-select-data="{groupCode: 'activeState', placeholder: '活动状态'}"
                         style="width:130px;"></single-select>
        </template>
      </div>
      <search class="fr" @search="setKeyWords"></search>
    </div>
    <div class="list-wrapper">
      <ul>
        <list-row v-for="(item, index) in lists" :item="item" :key="index">
          <figcaption v-if="selectedType === '3'" slot="status"
                      :class="{ing: item.isApply !== -1 && item.isApply !== 6 && Number(item.startDate) < Number(nowTime), end: item.isApply === 6}" class="status pa">
            <span class="txt pa">{{handleActivityStatus(item.startDate,item.isApply)}}</span>
          </figcaption>
          <h3 slot="title" class="name ellipsis">
            <router-link :to="{path: detailPath, query: {id: item.id}}" :title="item.name || item.title" class="link">
              {{item.name || item.title || '暂无'}}
            </router-link>
          </h3>
          <p class="other-info">
            <span class="category">
              分类：{{item.courseTypeName || item.projectTypeName || item.activityTypeName || '无'}}
            </span>
            <span v-if="selectedType === '1'" class="level">级别：{{item.grade}}</span>
            <span v-if="selectedType === '2'" class="level">年级：{{item.applyScopeId}}</span>
            <span v-if="selectedType === '3'" class="duration">活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}}—{{item.endDate | dateFormat('yyyy-MM-dd')}}</span>
            <span class="member">成员：<i class="num blue">{{item.currNum || 0}}</i>人</span>
            <span v-if="selectedType === '2'" class="level">有效时间：{{item.endDate | dateFormat('yyyy-MM-dd')}}</span>
            <span v-if="selectedType === '3'" class="member">报名截止：{{item.stopDate | dateFormat('yyyy-MM-dd')}}</span>
          </p>
          <!--<p v-if="selectedType === '2'" class="dead-line gray">
            活动时间：{{item.startDate | dateFormat('yyyy-MM-dd')}}—{{item.endDate | dateFormat('yyyy-MM-dd')}}
          </p>
          <p v-if="selectedType === '3'" class="dead-line gray">
            活动时间：{{item.startDate}}—{{item.endDate}}&nbsp;&nbsp;&nbsp;&nbsp;报名截止：{{item.stopDate}}
          </p>-->
          <div slot="operate" class="operate pa">
            <template v-if="selectedType === '3'">
              <template v-if="$ls.get('userIdentity') === 'student' && !isNaN(item.isApply)">
                <a v-if="item.isApply === 0 || item.isApply === 3"
                   @click="dialog.isVisible = true; activityId = item.id" href="javascript:;"
                   class="btn">立即参加</a>
                <a v-else class="btn disabled" href="javascript:;">{{handleActivityApply(item.isApply)}}</a>
              </template>
            </template>
            <template v-else>
              <router-link :to="{path: detailPath, query: {id: item.id}}" class="btn">
                {{selectedType === '1' && '去学习' || '去参加'}}
              </router-link>
            </template>
          </div>
        </list-row>
      </ul>
      <p v-if="!lists.length" class="no-data">暂无数据</p>
      <register-activity-dialog v-if="dialog.isVisible" :dialog="dialog" :handle-request="requestList" :id="activityId"/>
      <pagination :param="pageParam" :change-page="requestList"></pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { requestFrontendList } from '@/service/course.js'
  import { projectList } from '@/service/project.js'
  import { requestActivityFrontendList } from '@/service/activity.js'
  import pagination from 'components/common/pagination.vue'
  import multiSelect from '@/components/common/select/multi_select.vue'
  import singleSelect from '@/components/common/select/single_select.vue'
  import search from 'components/common/search.vue'
  import listRow from 'components/common/classificationList/list/list_row.vue'
  import registerActivityDialog from 'components/teacher/register_activity_dialog.vue'

  export default {
    name: 'teacherGuidance', // 教师空间-指导
    data () {
      return {
        activityId: '',
        category: [], // 分类
        dialog: {
          isVisible: false
        },
        lists: [], // 列表
        pageParam: { // 分页数据
          pageSize: 5,
          pageNum: 1,
          totalNum: 0
        },
        selected: { // 接口所需数据
          applyScopeId: undefined, // 适应范围，年级
          enrollStatus: undefined, // 报名状态
          grade: '', // 级别
          orgId: this.$route.query.id || '', // 机构id
          status: undefined, // 活动状态
          technologyId: '', // 技术分类
        },
        selectedType: '1',
        searchKeyWords: '',
        userId:'',//当前登录人id
        nowTime: new Date().getTime()
      }
    },
    computed: {
      ...mapState('teacherAndStudent', ['relatedData']),
      detailPath () {
        const source = {
          1: '/education/course/detail',
          2: '/education/project/detail',
          3: '/space/activity/details'
        }
        return source[this.selectedType]
      },
      options () {
        let {coursesNum = 0, projectsNum = 0, activityNum = 0} = this.relatedData
        return [
          {name: '课程', type: '1', num: coursesNum},
          {name: '项目', type: '2', num: projectsNum},
          {name: '活动', type: '3', num: activityNum}
        ]
      }
    },
    created () {
      if(this.$ls.get('loginInfo')){
        this.userId = this.$ls.get('loginInfo').userInfo.id;
      }
      this.requestList()
    },
    components: {
      pagination,
      multiSelect,
      singleSelect,
      search,
      listRow,
      registerActivityDialog
    },
    methods: {
      async requestList (page) { // 获取列表数据
        page !== undefined && (this.pageParam.pageNum = page)

        let handler = requestFrontendList
        let type = 'courseType'
        let name = 'name'
        let userId = undefined
        let spaceType = undefined

        if (this.selectedType === '2') {
          handler = projectList
          type = 'projectType'
        } else if (this.selectedType === '3') {
          handler = requestActivityFrontendList
          type = 'activityType'
          name = 'title'
          userId = this.userId
          spaceType = '2'
        }

        let res = await handler({
          userId,
          spaceType,
          ...this.pageParam,
          ...this.selected,
          [name]: this.searchKeyWords,
          [type]: this.category.join('-')
        }, {...this.pageParam})

        if (res.data.code === 200) {
          let _entity = res.data.entity || {}
          this.lists = _entity.resultData || []
          this.pageParam.totalNum = _entity.totalNum || 0
          this.lists.forEach(item => {
            this.dataTranslation(item.grade, 'courseGrade', {key: 'id'}).then(res => item.grade = res || '无')
            this.dataTranslation(item.applyScopeId, 'periodKey', {key: 'id'}).then(res => item.applyScopeId = res || '无')
          })
        }
      },
      handleActivityStatus (startDate,status) {
        if (Number(startDate) > Number(this.nowTime)) {
          return '未开始'
        } else {
          const source = {
            '-1': '未开始',
            6: '已结束'
          }
          return source[status] || '进行中'
        }
      },
      handleActivityApply (status) {
        const source = {
          '-5': '报名未开始',
          '-1': '未开始',
          1: '报名待审核',
          2: '已报名',
          3: '审核不通过',
          4: '人数已满',
          5: '报名结束',
          6: '活动结束',
        }

        return status ? source[status] : ''
      },
      setKeyWords (str) {
        this.searchKeyWords = str
        this.requestList()
      }
    },
    watch: {
      category: {
        handler () {
          this.requestList()
        },
        deep: true
      },
      selectedType () {
        this.requestList()
      },
      selected: {
        handler (val) {
          this.requestList()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-wrapper {
    margin-top: 10px;
    border-top: 1px solid #c9c9c9;
  }

  .list-wrapper .list-item {
    .dead-line {
      margin-top: 8px;
      font-size: 12px;
    }
  }
</style>
