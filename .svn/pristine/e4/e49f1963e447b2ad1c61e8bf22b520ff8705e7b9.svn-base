<template>
    <section>
        <!-- 管理分组弹窗 -->
        <h3 class="classify_title">分类名称</h3>
        <ul class="classify_list">
            <li v-for="(item, index) in classify.options" class="classify_li">
                <el-input v-model="modifyName" placeholder="请输入内容" v-if='modifyIndex == index' style="width:200px;" @keyup.enter.native="addClassify(item, index)" :maxlength="10"></el-input>
                <span v-else>{{item.groupName}}</span>
                <v-del :delData="delClassify" class="articl_del fr" @click.native="del(item.id)" @callback="getClassifyData" v-if="modifyIndex != index"></v-del>
                <span class="icon-btn-i-edit2 fr" @click="modifyParam( item.id, index, item.groupName )" v-if="modifyIndex != index" style="font-size:14px;"></span>
                <div class="fr" v-if="modifyIndex == index">
                    <span class="psn-confirm-btn fs12" @click="addClassify(item, index)" >确定</span>
                    <span class="psn-cancel-btn fs12" @click="modifyIndex = null">取消</span>
                </div>
            </li>
        </ul>
        <div class="classify_add" @click="add">
            <i class="icon-btn-i-add-circle"> 添加分组 </i>
        </div>
    </section>
</template>

<script>
import { addGroup, groupModify } from '@/service/my.js'
import del from 'Common/del_popover.vue'

export default {
    data() {
        return {
            ifAddStutas: false,
            delClassify: {  // 删除分类
                name: '分类',
                url: '/maker/follow/group/del',
                params: {
                    id: null
                }
            },
            classifyPopup: false, // 分类弹框开关
            modifyIndex: null, // 修改分类信息
            modifyName: null,
            modifyId: null,
            // 设置分组弹框
            setClassifyPopup: false,
            setClassifyString: '',
            setClassifyId: '',
        }
    },
    methods: {
        add() {
            if (!this.ifAddStutas) {
                this.classify.options.unshift({ name: '', id: '' })
                this.modifyIndex = 0
                this.ifAddStutas = true
            } else {
                this.$message('请先确定后再添加')
            }
        },
        del(id) {
            this.delClassify.params.id = id
        },
        // 分类管理 - 添加/修改分类
        addClassify(item, index) {
            if (index === 0 && item.id === '' && item.name === '' && this.modifyName !== '') {
                addGroup({ groupType: this.groupType, groupName: this.modifyName }).then((res) => {
                    if (res.data.code === 200) {
                        this.getClassifyData()
                        this.modifyIndex = null
                        this.ifAddStutas = false
                        this.modifyName = null
                    } else {
                        this.$message({ message: res.data.msg })
                    }
                })
            } else {
                groupModify({ groupType: this.groupType, id: this.modifyId, groupName: this.modifyName }).then((res) => {
                if (res.data.code === 200) {
                    this.getClassifyData()
                    this.modifyName = null
                    this.modifyIndex = null
                    this.modifyId = null
                }
            })
            }
        },
        // 分类管理 - 分类列表
        getClassifyData() {
            this.$emit('getClassifyData')
        },
        // 获取修改焦点
        modifyParam(id, index, name) {
            this.modifyName = name
            this.modifyIndex = index
            this.modifyId = id
        },
        // 分类管理 - 修改分类
        modifyClassify() {
            groupModify({ groupType: this.groupType, id: this.modifyId, groupName: this.modifyName }).then((res) => {
                if (res.data.code === 200) {
                    this.getClassifyData()
                    this.modifyName = null
                    this.modifyIndex = null
                    this.modifyId = null
                }
            })
        }

    },
    mounted() {
        // this.getClassifyData()
    },
    props: {
        groupType: {
            type: Number,
            default: 1
        },
        classify: {
            type: Object,
            default: {}
        }
    },
    components: {
        'v-del': del
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/myAdminFocus.scss';
.fs12 {
    font-size: 12px;
}
</style>