<template>
    <section class="course-info">
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">学习目标</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.target }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">课程内容</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.content }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">授课教师</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.teacher }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">课程分类</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.courseTypeName }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">相关技术</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.technology }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">级别</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.grade }}</el-col>
        </el-row>
        <el-row class="mb">
            <el-col :span="3">【<span class="item-tit text-justify">适合学生</span>】:</el-col>
            <el-col :span="20" class="item-content">{{ courseInfo.fit }}</el-col>
        </el-row>
    </section>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        name: 'courseInfo', // 课程详情
        inheritAttrs: false,
        data() {
            return {}
        },
        computed: {
            ...mapState('course', { courseInfo: 'courseDetail' })
        },
        created() {},
        methods: {}
    }
</script>

<style lang='scss' scoped>
.item-tit {
    display: inline-block;
    width: 66px;
    font-size: 16px;
}
.course-info {
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    .item-content {
        line-height: 1.5;
    }
    .mb {
        margin-bottom: 15px;
    }
    .mt {
        margin-top: 15px;
    }
}
</style>
