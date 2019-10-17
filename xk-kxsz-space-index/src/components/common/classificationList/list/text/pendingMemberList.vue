<template>
    <div>
        <section class="pending-member-list">
            <p class="empty-block" v-if="personList.length==0">暂无成员申请</p>
            <el-checkbox-group class="pending-member-item table-layout" v-model="checkedPerson" v-for="item in personList" :key="item.applyId">
                <router-link :to="dynamicPath(item)" class="head-item table-cell">
                    <img :src="getFileUrl(item.headImageUrl) || faceDefault" alt="" class="pending-member-item-head circle">
                </router-link>
                <div class="table-cell">
                    <p class="pending-member-item-info">
                        <router-link :to="dynamicPath(item)">{{item.applyName}}</router-link>
                        <span class="pending-member-item-ascription">（{{item.schoolName}}）</span>
                    </p>
                    <p class="pending-member-item-applying">{{item.auditOpinion}}</p>
                    <time class="applying-time">{{item.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                </div>
                <section class="btn-group table-cell">
                    <button class="i-button" @click="send(item, 2)">不通过</button>
                    <button class="i-button" @click="send(item, 1)">通过 {{item.createName}}</button>
                </section>
            </el-checkbox-group>
        </section>
        <v-pagination :param.sync="pagParam" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
import pagination from './../../../pagination.vue'
import {adminProjectMemberApply, adminMembersApplyThrough} from '@/service/project.js'
export default {
    name : 'pendingMemberList',
    data() {
        return {
            checkedPerson: [],
            personList: [],
            pagParam: {totalNum: 100, pageSize: 10, pageNum: 1}
        }
    },
    components: {
        'v-pagination': pagination
    },
    mounted() {
        this.getData({"projectId": this.$route.query.id}, this.param)
    },
    watch: {
    },
    computed: {
    },
    methods: {
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData()
        },
        getData (){
            adminProjectMemberApply({"projectId": this.$route.query.id}, this.pagParam).then(res => {
                this.personList = res.data.entity.resultData
                this.pagParam.totalNum = res.data.entity.totalNum
            })
        },
        send (param, auditStatus) {
            let option
            if(auditStatus == 1){
                option = "审核通过"
            }else{
                option = "审核不通过"
            }
            adminMembersApplyThrough({
                "id": param.id,
                "auditStatus": auditStatus,
                "auditOpinion": option,
                "applyId": param.applyId,
                "projectId": param.projectId
            }).then(res => {
                if(res.data.code === 200) {
                    this.getData()
                }else {
                    this.$message(res.data.msg)
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
@import './../../../../../asset/scss/vars.scss';
$head-face-size: 72px;
.pending-member-list {
    padding: 0 20px;

    .pending-member-item {
        padding: 20px 0;
        border-bottom: 1px dashed #c9c9c9;

        .checked-item {
            width: 14px;
        }
        .head-item {
            width: $head-face-size + 40;
            text-align: center;
        }
        .btn-group {
            width: 14em;
            text-align: right;
            .i-button {
                border: 0;
            }
        }

        .pending-member-item-head {
            width: $head-face-size;
            height: $head-face-size;
        }
        .pending-member-item-info {
            font-size: 18px;
            line-height: 2;
            .pending-member-item-ascription {
                font-size: 14px;
                color: #999;
            }
            a:hover{
                color: #2797ed;
            }
        }
        .pending-member-item-applying {
            font-size: 14px;
        }
        .applying-time {
            color: #999;
            line-height: 2;
        }
    }
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .pending-member-list {
            .btn-group {
                .i-button:hover {
                    color: $color-value;
                }
            }
        }
    }
}
</style>