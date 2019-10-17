<template>
    <section class="course-info">
        <el-row class="mb">
            <el-col class="mw100" :span="2">【学习目标】：</el-col>
            <el-col :span="20">{{ courseInfo.target }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【课程内容】：</el-col>
            <el-col :span="20">{{ courseInfo.content }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【授课教师】：</el-col>
            <el-col :span="20">{{ courseInfo.teacher }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【课程分类】：</el-col>
            <el-col :span="20">{{ courseInfo.courseTypeName }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【相关技术】：</el-col>
            <el-col :span="20">{{ courseInfo.technology }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【<span class="w56 text-justify">级别</span>】：</el-col>
            <el-col :span="20">{{ courseInfo.grade }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col class="mw100" :span="2">【适合学生】：</el-col>
            <el-col :span="20">{{ courseInfo.fit }}</el-col>
        </el-row>
    </section>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'courseInfo', // 课程详情
    inheritAttrs: false,
    data () {
      return {}
    },
    computed: {
      ...mapState('course', {courseInfo: 'courseDetail'})
    },
    created () {},
    methods: {}
  }
</script>

<style lang='scss' scoped>
.mw100 {
    width: 100px;
}
.w56 {
    display: inline-block;
    width: 56px;
}
.course-info {
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    .mb {
        margin-bottom: 15px;
    }
    .mt {
        margin-top: 15px;
    }
}
</style>
